import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { user } from "@/lib/schema";
import { eq } from "drizzle-orm";

export async function GET(req: Request, props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  try {
    const session = await getServerSession(authOptions);
    if (!session) return new NextResponse("Unauthorized", { status: 401 });

    const [acting] = await db
      .select({ id: user.id, type: user.type })
      .from(user)
      .where(eq(user.id, session.user.id))
      .limit(1);
    if (acting?.type !== "county") return new NextResponse("Forbidden", { status: 403 });

    const [b] = await db
      .select({
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address,
        city: user.city,
        state: user.state,
        aboutMe: user.aboutMe,
        type: user.type,
      })
      .from(user)
      .where(eq(user.id, params.id))
      .limit(1);

    if (!b || b.type !== "bidder") return new NextResponse("Bidder not found", { status: 404 });
    return NextResponse.json(b);
  } catch (e) {
    console.error("[BIDDER_GET]", e);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function PATCH(req: Request, props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  try {
    const session = await getServerSession(authOptions);
    if (!session) return new NextResponse("Unauthorized", { status: 401 });

    const [acting] = await db
      .select({ id: user.id, type: user.type })
      .from(user)
      .where(eq(user.id, session.user.id))
      .limit(1);
    if (acting?.type !== "county") return new NextResponse("Forbidden", { status: 403 });

    const body = await req.json();
    const firstName = `${body?.firstName || ""}`.trim();
    const lastName = `${body?.lastName || ""}`.trim();
    const email = body?.email !== undefined ? `${body.email || ""}`.trim().toLowerCase() : undefined;
    const phone = body?.phone !== undefined ? `${body.phone || ""}`.trim() : undefined;
    const address = body?.address !== undefined ? `${body.address || ""}`.trim() : undefined;
    const city = body?.city !== undefined ? `${body.city || ""}`.trim() : undefined;
    const state = body?.state !== undefined ? `${body.state || ""}`.trim() : undefined;
    const notes = body?.notes !== undefined ? `${body.notes || ""}`.trim() : undefined;

    const updateData: Record<string, any> = {};
    const name = `${firstName} ${lastName}`.trim();
    if (firstName || lastName) updateData.name = name || null;
    if (email !== undefined) {
      if (!email) return new NextResponse("Email is required", { status: 400 });
      updateData.email = email;
    }
    if (phone !== undefined) updateData.phone = phone || null;
    if (address !== undefined) updateData.address = address || null;
    if (city !== undefined) updateData.city = city || null;
    if (state !== undefined) updateData.state = state || null;
    if (notes !== undefined) updateData.aboutMe = notes || null;

    if (Object.keys(updateData).length === 0) {
      return new NextResponse("No fields to update", { status: 400 });
    }

    await db.update(user).set(updateData as any).where(eq(user.id, params.id));
    return NextResponse.json({ success: true });
  } catch (e: any) {
    const msg = e?.message ? String(e.message) : "";
    if (msg.toLowerCase().includes("duplicate") || msg.toLowerCase().includes("unique")) {
      return new NextResponse("A user with this email already exists", { status: 409 });
    }
    console.error("[BIDDER_PATCH]", e);
    return new NextResponse("Internal Error", { status: 500 });
  }
}


