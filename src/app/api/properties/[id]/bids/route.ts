import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { notifications, property, propertyBids, propertyLinkedBidders, user } from "@/lib/schema";
import { and, desc, eq, sql } from "drizzle-orm";
import { v4 as uuidv4 } from "uuid";

export async function GET(
  req: Request,
  props: { params: Promise<{ id: string }> }
) {
  const params = await props.params;
  try {
    const session = await getServerSession(authOptions);
    if (!session) return new NextResponse("Unauthorized", { status: 401 });

    const bids = await db
      .select({
        id: propertyBids.id,
        propertyId: propertyBids.propertyId,
        bidderId: propertyBids.bidderId,
        amount: propertyBids.amount,
        createdAt: propertyBids.createdAt,
        bidderName: user.name,
        bidderEmail: user.email,
        bidderImage: user.image,
      })
      .from(propertyBids)
      .leftJoin(user, eq(propertyBids.bidderId, user.id))
      .where(eq(propertyBids.propertyId, params.id))
      .orderBy(desc(propertyBids.createdAt));

    return NextResponse.json(bids);
  } catch (error) {
    console.error("[PROPERTY_BIDS_GET]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function POST(
  req: Request,
  props: { params: Promise<{ id: string }> }
) {
  const params = await props.params;
  try {
    const session = await getServerSession(authOptions);
    if (!session) return new NextResponse("Unauthorized", { status: 401 });

    const body = await req.json();
    const amountRaw = body?.amount;
    const amount = parseInt(`${amountRaw}`.replace(/[^0-9]/g, ""), 10);
    const bidderId = body?.bidderId as string | undefined;

    // County-only: only county users can create bid records
    const [actingUser] = await db
      .select({ type: user.type })
      .from(user)
      .where(eq(user.id, session.user.id))
      .limit(1);

    if (actingUser?.type !== "county") {
      return new NextResponse("Only county users can add bids", { status: 403 });
    }

    if (!Number.isFinite(amount) || amount <= 0) {
      return new NextResponse("Valid bid amount is required", { status: 400 });
    }

    if (!bidderId) {
      return new NextResponse("bidderId is required", { status: 400 });
    }

    const [p] = await db
      .select()
      .from(property)
      .where(eq(property.id, params.id))
      .limit(1);

    if (!p) return new NextResponse("Property not found", { status: 404 });

    // Ensure bidder is linked to this property
    const [link] = await db
      .select({ id: propertyLinkedBidders.id })
      .from(propertyLinkedBidders)
      .where(
        and(
          eq(propertyLinkedBidders.propertyId, params.id),
          eq(propertyLinkedBidders.bidderId, bidderId)
        )
      )
      .limit(1);

    if (!link) {
      return new NextResponse("Bidder must be linked to this property", { status: 400 });
    }

    const maxBidRows = await db
      .select({
        maxAmount: sql<number>`max(${propertyBids.amount})`.as("maxAmount"),
      })
      .from(propertyBids)
      .where(eq(propertyBids.propertyId, params.id));

    const currentBid =
      maxBidRows?.[0]?.maxAmount !== undefined && maxBidRows?.[0]?.maxAmount !== null
        ? Number(maxBidRows[0].maxAmount)
        : (p as any).minBid ?? 0;

    if (amount <= currentBid) {
      return new NextResponse("Bid must be greater than current bid", { status: 400 });
    }

    const bidId = uuidv4();
    await db.insert(propertyBids).values({
      id: bidId,
      propertyId: params.id,
      bidderId,
      amount,
      createdAt: new Date(),
    });

    // Create in-app notifications: bidder + property owner (county)
    const href = `/property-details/${params.id}`;
    const title = `Bid recorded: $${amount.toLocaleString()}`;
    const msg = `A bid was recorded for ${p.address || "this property"}.`;
    const createdAt = new Date();

    await db.insert(notifications).values({
      id: uuidv4(),
      userId: bidderId,
      type: "bid",
      title,
      message: msg,
      href,
      metadata: { propertyId: params.id, bidId },
      isRead: 0,
      createdAt,
    });

    if ((p as any).createdBy) {
      await db.insert(notifications).values({
        id: uuidv4(),
        userId: (p as any).createdBy,
        type: "bid",
        title,
        message: msg,
        href,
        metadata: { propertyId: params.id, bidId },
        isRead: 0,
        createdAt,
      });
    }

    return NextResponse.json({ bidId }, { status: 201 });
  } catch (error) {
    console.error("[PROPERTY_BIDS_POST]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}


