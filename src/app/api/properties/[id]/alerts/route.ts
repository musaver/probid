import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { notifications, property, propertyAlerts, propertyLinkedBidders, user } from "@/lib/schema";
import { and, eq } from "drizzle-orm";
import { v4 as uuidv4 } from "uuid";
import { sendTextEmail } from "@/lib/email";

export async function POST(
  req: Request,
  props: { params: Promise<{ id: string }> }
) {
  const params = await props.params;
  try {
    const session = await getServerSession(authOptions);
    if (!session) return new NextResponse("Unauthorized", { status: 401 });

    // County-only
    const [actingUser] = await db
      .select({ id: user.id, type: user.type, email: user.email, name: user.name })
      .from(user)
      .where(eq(user.id, session.user.id))
      .limit(1);

    if (actingUser?.type !== "county") {
      return new NextResponse("Only county users can send alerts", { status: 403 });
    }

    const body = await req.json();
    const subject = (body?.subject || "").toString().trim();
    const message = (body?.message || "").toString().trim();
    const bidderIds = (body?.bidderIds || null) as string[] | null;

    if (!subject) return new NextResponse("subject is required", { status: 400 });
    if (!message) return new NextResponse("message is required", { status: 400 });

    const [p] = await db
      .select({
        id: property.id,
        address: property.address,
        createdBy: property.createdBy,
      })
      .from(property)
      .where(eq(property.id, params.id))
      .limit(1);

    if (!p) return new NextResponse("Property not found", { status: 404 });

    // Fetch linked bidder emails
    const linked = await db
      .select({
        bidderId: propertyLinkedBidders.bidderId,
        email: user.email,
        name: user.name,
      })
      .from(propertyLinkedBidders)
      .leftJoin(user, eq(propertyLinkedBidders.bidderId, user.id))
      .where(eq(propertyLinkedBidders.propertyId, params.id));

    const recipients = linked
      .filter((r) => !!r.email)
      .map((r) => ({ bidderId: r.bidderId, email: r.email!, name: r.name }));

    // If bidderIds is provided, restrict to that subset (must be linked)
    let filteredRecipients = recipients;
    if (Array.isArray(bidderIds)) {
      const linkedSet = new Set(recipients.map((r) => r.bidderId));
      for (const id of bidderIds) {
        if (!linkedSet.has(id)) {
          return new NextResponse("All bidderIds must be linked to this property", { status: 400 });
        }
      }
      const allow = new Set(bidderIds);
      filteredRecipients = recipients.filter((r) => allow.has(r.bidderId));
    }

    // County copy (property creator email if present, else acting user email)
    const [countyOwner] = await db
      .select({ email: user.email })
      .from(user)
      .where(eq(user.id, p.createdBy))
      .limit(1);

    const countyEmail = countyOwner?.email || actingUser?.email;
    const allEmails = new Set<string>();
    filteredRecipients.forEach((r) => allEmails.add(r.email));
    if (countyEmail) allEmails.add(countyEmail);

    // Send emails (best-effort)
    const emailText = `Property: ${p.address || params.id}\n\n${message}\n\nView: ${process.env.NEXTAUTH_URL}/property-details/${params.id}`;
    const sendResults: { email: string; ok: boolean; error?: string }[] = [];
    for (const email of Array.from(allEmails)) {
      try {
        await sendTextEmail(email, subject, emailText);
        sendResults.push({ email, ok: true });
      } catch (e) {
        sendResults.push({
          email,
          ok: false,
          error: e instanceof Error ? e.message : "Failed",
        });
      }
    }

    // Audit row
    const alertId = uuidv4();
    await db.insert(propertyAlerts).values({
      id: alertId,
      propertyId: params.id,
      sentByUserId: session.user.id,
      subject,
      message,
      recipientCount: allEmails.size,
      createdAt: new Date(),
    });

    // Create in-app notifications for linked bidders + county owner (if exists)
    const href = `/property-details/${params.id}`;
    const notifTitle = `Alert: ${p.address || "Property update"}`;
    const notifMessage = message.length > 160 ? message.slice(0, 157) + "..." : message;

    const notifTargets = new Set<string>();
    filteredRecipients.forEach((r) => notifTargets.add(r.bidderId));
    if (p.createdBy) notifTargets.add(p.createdBy);

    for (const userId of Array.from(notifTargets)) {
      await db.insert(notifications).values({
        id: uuidv4(),
        userId,
        type: "alert",
        title: notifTitle,
        message: notifMessage,
        href,
        metadata: { propertyId: params.id, alertId },
        isRead: 0,
        createdAt: new Date(),
      });
    }

    const failed = sendResults.filter((r) => !r.ok);
    return NextResponse.json({
      success: failed.length === 0,
      sent: sendResults.filter((r) => r.ok).length,
      failed,
      alertId,
    });
  } catch (error) {
    console.error("[PROPERTY_ALERTS_POST]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}


