import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { property, propertyLinkedBidders, user } from "@/lib/schema";
import { and, eq, like, or, inArray, sql, desc } from "drizzle-orm";
import { v4 as uuidv4 } from "uuid";
import { sendBidderInviteEmail } from "@/lib/email";

export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) return new NextResponse("Unauthorized", { status: 401 });

    const { searchParams } = new URL(req.url);
    const includeCounts = searchParams.get("includeCounts") === "1";
    const qRaw = (searchParams.get("q") || "").trim();
    const q = qRaw.length ? `%${qRaw}%` : null;
    const linkedToMyProperties = searchParams.get("linkedToMyProperties") === "1";

    // If requested, scope bidders to those linked to this county's properties only
    if (linkedToMyProperties) {
      const [acting] = await db
        .select({ type: user.type })
        .from(user)
        .where(eq(user.id, session.user.id))
        .limit(1);
      if (acting?.type !== "county") {
        return new NextResponse("Only county users can list linked bidders", { status: 403 });
      }

      const bidderWhere = q
        ? and(
          eq(user.type, "bidder"),
          or(like(user.name, q), like(user.email, q), like(user.phone, q))
        )
        : eq(user.type, "bidder");

      const rows = await db
        .select({
          id: user.id,
          name: user.name,
          email: user.email,
          phone: user.phone,
          image: user.image,
          type: user.type,
        })
        .from(propertyLinkedBidders)
        .innerJoin(property, eq(property.id, propertyLinkedBidders.propertyId))
        .innerJoin(user, eq(user.id, propertyLinkedBidders.bidderId))
        .where(and(eq(property.createdBy, session.user.id), bidderWhere))
        .groupBy(user.id)
        .orderBy(desc(user.createdAt))
        .limit(200);

      const filtered = rows.filter((u) => u.id !== session.user.id);
      if (!includeCounts) return NextResponse.json(filtered);

      const bidderIds = filtered.map((u) => u.id).filter(Boolean) as string[];
      const counts =
        bidderIds.length === 0
          ? []
          : await db
            .select({
              bidderId: propertyLinkedBidders.bidderId,
              count: sql<number>`count(*)`.as("count"),
            })
            .from(propertyLinkedBidders)
            .innerJoin(property, eq(property.id, propertyLinkedBidders.propertyId))
            .where(and(eq(property.createdBy, session.user.id), inArray(propertyLinkedBidders.bidderId, bidderIds)))
            .groupBy(propertyLinkedBidders.bidderId);

      const countByBidderId = new Map<string, number>();
      for (const row of counts as any[]) {
        if (row?.bidderId) countByBidderId.set(row.bidderId, Number(row.count || 0));
      }

      return NextResponse.json(
        filtered.map((b) => ({
          ...b,
          linkedPropertyCount: countByBidderId.get(b.id) ?? 0,
        }))
      );
    }

    // List all bidder-type users (excluding current user)
    const whereClause = q
      ? and(
        eq(user.type, "bidder"),
        or(like(user.name, q), like(user.email, q), like(user.phone, q))
      )
      : eq(user.type, "bidder");

    const users = await db
      .select({
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        image: user.image,
        type: user.type,
      })
      .from(user)
      .where(whereClause)
      .orderBy(desc(user.createdAt))
      .limit(200);

    const filtered = users.filter((u) => u.id !== session.user.id);

    if (!includeCounts) return NextResponse.json(filtered);

    const bidderIds = filtered.map((u) => u.id).filter(Boolean) as string[];
    const counts =
      bidderIds.length === 0
        ? []
        : await db
          .select({
            bidderId: propertyLinkedBidders.bidderId,
            count: sql<number>`count(*)`.as("count"),
          })
          .from(propertyLinkedBidders)
          .where(inArray(propertyLinkedBidders.bidderId, bidderIds))
          .groupBy(propertyLinkedBidders.bidderId);

    const countByBidderId = new Map<string, number>();
    for (const row of counts as any[]) {
      if (row?.bidderId) countByBidderId.set(row.bidderId, Number(row.count || 0));
    }

    return NextResponse.json(
      filtered.map((b) => ({
        ...b,
        linkedPropertyCount: countByBidderId.get(b.id) ?? 0,
      }))
    );
  } catch (error) {
    console.error("[BIDDERS_LIST]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) return new NextResponse("Unauthorized", { status: 401 });

    // County-only
    const [acting] = await db
      .select({ id: user.id, type: user.type })
      .from(user)
      .where(eq(user.id, session.user.id))
      .limit(1);
    if (acting?.type !== "county") {
      return new NextResponse("Only county users can add bidders", { status: 403 });
    }

    const body = await req.json();
    const firstName = `${body?.firstName || ""}`.trim();
    const lastName = `${body?.lastName || ""}`.trim();
    const email = `${body?.email || ""}`.trim().toLowerCase();
    const phone = `${body?.phone || ""}`.trim();
    const address = `${body?.address || ""}`.trim();
    const city = `${body?.city || ""}`.trim();
    const state = `${body?.state || ""}`.trim();
    const zipCode = `${body?.zipCode || ""}`.trim();
    const notes = `${body?.notes || ""}`.trim();

    if (!email) return new NextResponse("Email is required", { status: 400 });

    const name = `${firstName} ${lastName}`.trim() || null;
    const bidderId = uuidv4();

    try {
      await db.insert(user).values({
        id: bidderId,
        email,
        name,
        phone: phone || null,
        address: address || null,
        city: city || null,
        state: state || null,
        aboutMe: notes || null,
        type: "bidder",
        countyId: session.user.id, // Save the county user who invited this bidder
        createdAt: new Date(),
        updatedAt: new Date(),
      } as any);
    } catch (e: any) {
      // MySQL duplicate key → 409
      const msg = e?.message ? String(e.message) : "";
      if (msg.toLowerCase().includes("duplicate") || msg.toLowerCase().includes("unique")) {
        return new NextResponse("A user with this email already exists", { status: 409 });
      }
      throw e;
    }

    // Generate invite token for magic link authentication
    const inviteToken = `${uuidv4()}-${Date.now()}`;
    const tokenExpires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 days

    // Store the invite token
    const { invite_tokens } = await import("@/lib/schema");
    await db.insert(invite_tokens).values({
      id: uuidv4(),
      email,
      token: inviteToken,
      userId: bidderId,
      expires: tokenExpires,
      createdAt: new Date(),
    } as any);

    // Invite email using Brevo template (best-effort)
    const baseUrl = process.env.NEXTAUTH_URL || "";
    const registerUrl = baseUrl ? `${baseUrl}/register` : "/register";
    const inviteLink = baseUrl ? `${baseUrl}/api/auth/invite?token=${inviteToken}` : `/api/auth/invite?token=${inviteToken}`;

    let inviteSent = false;
    let inviteError: string | null = null;
    try {
      await sendBidderInviteEmail(email, name, registerUrl, inviteLink);
      inviteSent = true;
    } catch (e: any) {
      inviteError = e instanceof Error ? e.message : "Failed to send invite";
      console.error("[BIDDER_INVITE_EMAIL_FAILED]", inviteError);
    }

    return NextResponse.json({ bidderId, inviteSent, inviteError }, { status: 201 });
  } catch (error) {
    console.error("[BIDDERS_POST]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}


