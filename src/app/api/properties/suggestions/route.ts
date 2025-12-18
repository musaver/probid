import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { property, propertyLinkedBidders, user as userTable } from "@/lib/schema";
import { and, desc, eq, like, or } from "drizzle-orm";

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
          city: property.city,
          status: property.status,
          updatedAt: property.updatedAt,
        })
        .from(property)
        .where(
          and(
            eq(property.createdBy, session.user.id),
            or(
              like(property.address, q),
              like(property.parcelId, q),
              like(property.city, q),
              like(property.zipCode, q)
            )
          )
        )
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
        city: property.city,
        status: property.status,
        updatedAt: property.updatedAt,
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
            like(property.zipCode, q)
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


