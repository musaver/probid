import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { property, propertyLinkedBidders, user as userTable } from "@/lib/schema";
import { and, desc, eq, like, or, sql } from "drizzle-orm";

export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) return new NextResponse("Unauthorized", { status: 401 });

    const { searchParams } = new URL(req.url);
    const qRaw = (searchParams.get("q") || "").trim();
    const limit = Math.min(parseInt(searchParams.get("limit") || "8", 10) || 8, 20);

    if (qRaw.length < 2) {
      return NextResponse.json([]);
    }

    const q = `%${qRaw}%`;

    let userType = (session.user as any)?.type as "bidder" | "county" | undefined;
    if (!userType) {
      const [u] = await db
        .select({ type: userTable.type })
        .from(userTable)
        .where(eq(userTable.id, session.user.id))
        .limit(1);
      userType = (u?.type as any) || "bidder";
    }

    if (userType === "county") {
      const items = await db
        .select({
          id: property.id,
          address: property.address,
          parcelId: property.parcelId,
          saleId: property.saleId,
          city: property.city,
          status: property.status,
          updatedAt: property.updatedAt,
          minBid: property.minBid,
          winningBid: property.winningBid,
        })
        .from(property)
        .leftJoin(propertyLinkedBidders, eq(property.id, propertyLinkedBidders.propertyId))
        .leftJoin(userTable, eq(propertyLinkedBidders.bidderId, userTable.id))
        .where(
          and(
            eq(property.createdBy, session.user.id),
            or(
              like(property.address, q),
              like(property.parcelId, q),
              like(property.city, q),
              like(property.zipCode, q),
              like(property.saleId, q),
              like(property.winningBidderId, q),
              sql`CAST(${property.owners} AS CHAR) LIKE ${q}`,
              sql`CAST(${property.minBid} AS CHAR) LIKE ${q}`,
              sql`CAST(${property.winningBid} AS CHAR) LIKE ${q}`,
              like(userTable.email, q)
            )
          )
        )
        .groupBy(property.id)
        .orderBy(desc(property.updatedAt))
        .limit(limit);

      return NextResponse.json(items);
    }

    // bidder: only linked properties
    const items = await db
      .select({
        id: property.id,
        address: property.address,
        parcelId: property.parcelId,
        saleId: property.saleId,
        city: property.city,
        status: property.status,
        updatedAt: property.updatedAt,
        minBid: property.minBid,
        winningBid: property.winningBid,
      })
      .from(propertyLinkedBidders)
      .leftJoin(property, eq(propertyLinkedBidders.propertyId, property.id))
      .where(
        and(
          eq(propertyLinkedBidders.bidderId, session.user.id),
          or(
            like(property.address, q),
            like(property.parcelId, q),
            like(property.city, q),
            like(property.zipCode, q),
            like(property.saleId, q),
            like(property.winningBidderId, q),
            sql`CAST(${property.owners} AS CHAR) LIKE ${q}`,
            sql`CAST(${property.minBid} AS CHAR) LIKE ${q}`,
            sql`CAST(${property.winningBid} AS CHAR) LIKE ${q}`
          )
        ) as any
      )
      .orderBy(desc(property.updatedAt))
      .limit(limit);

    return NextResponse.json(items);
  } catch (error) {
    console.error("[PROPERTIES_SUGGESTIONS_GET]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
