import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { property, propertyLinkedBidders, user } from "@/lib/schema";
import { eq, and } from "drizzle-orm";

export async function GET(req: Request, props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  try {
    const session = await getServerSession(authOptions);
    if (!session) return new NextResponse("Unauthorized", { status: 401 });

    // County-only
    const [acting] = await db
      .select({ id: user.id, type: user.type })
      .from(user)
      .where(eq(user.id, session.user.id))
      .limit(1);
    if (acting?.type !== "county") return new NextResponse("Forbidden", { status: 403 });

    // Ensure target is a bidder
    const [target] = await db
      .select({ id: user.id, type: user.type })
      .from(user)
      .where(eq(user.id, params.id))
      .limit(1);
    if (!target || target.type !== "bidder") return new NextResponse("Bidder not found", { status: 404 });

    const rows = await db
      .select({
        propertyId: property.id,
        address: property.address,
        parcelId: property.parcelId,
        city: property.city,
      })
      .from(propertyLinkedBidders)
      .leftJoin(property, eq(propertyLinkedBidders.propertyId, property.id))
      .where(and(eq(propertyLinkedBidders.bidderId, params.id), eq(property.createdBy, session.user.id)));

    const linked = rows
      .filter((r) => !!r.propertyId)
      .map((r) => ({ id: r.propertyId!, address: r.address, parcelId: r.parcelId, city: r.city }));

    return NextResponse.json(linked);
  } catch (e) {
    console.error("[BIDDER_LINKED_PROPERTIES_GET]", e);
    return new NextResponse("Internal Error", { status: 500 });
  }
}


