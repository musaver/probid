import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { property, propertyBids, propertyLinkedBidders, user as userTable } from "@/lib/schema";
import { v4 as uuidv4 } from "uuid";
import { and, eq, inArray, like, or } from "drizzle-orm";
import { sql } from "drizzle-orm";

const defaultVisibilitySettings = {
    minBid: true,
    currentBid: true,
    bidHistory: false,
    propertyStatus: true,
    bidderList: false,
    documents: false,
};

function normalizeVisibilitySettings(raw: unknown) {
    let parsed: any = raw;
    if (parsed === null || parsed === undefined) return { ...defaultVisibilitySettings };

    // MySQL JSON can come back as string depending on driver config
    if (typeof parsed === "string") {
        try {
            parsed = JSON.parse(parsed);
        } catch {
            return { ...defaultVisibilitySettings };
        }
    }

    if (Array.isArray(parsed) || typeof parsed !== "object") {
        return { ...defaultVisibilitySettings };
    }

    const out: any = { ...defaultVisibilitySettings };
    for (const key of Object.keys(defaultVisibilitySettings)) {
        const v = (parsed as any)[key];
        if (typeof v === "boolean") out[key] = v;
        else if (v === 1 || v === "1" || v === "true") out[key] = true;
        else if (v === 0 || v === "0" || v === "false") out[key] = false;
    }
    return out;
}

export async function POST(req: Request) {
    try {
        const session = await getServerSession(authOptions);

        if (!session) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const body = await req.json();
        const {
            title,
            description,
            address,
            parcelId,
            city,
            zipCode,
            squareFeet,
            yearBuilt,
            lotSize,
            auctionEnd,
            minBid,
            status,
            visibilitySettings,
        } = body;

        const safeTitle = String(title || "").trim() || String(address || "").trim();
        if (!safeTitle) {
            return new NextResponse("Property title is required", { status: 400 });
        }

        const propertyId = uuidv4();

        await db.insert(property).values({
            id: propertyId,
            title: safeTitle,
            description,
            address,
            parcelId,
            city,
            zipCode,
            squareFeet: squareFeet ? parseInt(squareFeet) : null,
            yearBuilt: yearBuilt ? parseInt(yearBuilt) : null,
            lotSize,
            auctionEnd: auctionEnd ? new Date(auctionEnd) : null,
            minBid:
                minBid === undefined || minBid === null || `${minBid}`.trim() === ""
                    ? null
                    : parseInt(`${minBid}`.replace(/[^0-9]/g, ""), 10),
            visibilitySettings: normalizeVisibilitySettings(visibilitySettings),
            status: status || "active",
            createdBy: session.user.id,
            createdAt: new Date(),
            updatedAt: new Date(),
        });

        return NextResponse.json({ propertyId }, { status: 201 });
    } catch (error) {
        console.error("[PROPERTIES_POST]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}

export async function GET(req: Request) {
    try {
        const session = await getServerSession(authOptions);

        if (!session) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const { searchParams } = new URL(req.url);
        const qRaw = (searchParams.get("q") || "").trim();
        const q = qRaw.length ? `%${qRaw}%` : null;
        const endingSoon = searchParams.get("endingSoon") === "1";
        const now = new Date();
        const end = new Date(now.getTime() + 48 * 60 * 60 * 1000);

        // Determine user type (from session if present, otherwise DB)
        let userType = (session.user as any)?.type as "bidder" | "county" | undefined;
        if (!userType) {
            const [u] = await db
                .select({ type: userTable.type })
                .from(userTable)
                .where(eq(userTable.id, session.user.id))
                .limit(1);
            userType = (u?.type as any) || "bidder";
        }

        let properties: any[] = [];
        if (userType === "county") {
            const baseClause = q
                ? and(
                      eq(property.createdBy, session.user.id),
                      or(
                          like(property.address, q),
                          like(property.parcelId, q),
                          like(property.city, q),
                          like(property.zipCode, q)
                      )
                  )
                : eq(property.createdBy, session.user.id);

            const whereClause = endingSoon
                ? and(
                      baseClause as any,
                      sql`${property.auctionEnd} is not null and ${property.auctionEnd} >= ${now} and ${property.auctionEnd} <= ${end}`
                  )
                : baseClause;

            properties = await db.select().from(property).where(whereClause);
        } else {
            // bidder: only properties linked to this bidder
            // Drizzle join w/ search
            const baseClause = q
                ? and(
                      eq(propertyLinkedBidders.bidderId, session.user.id),
                      or(
                          like(property.address, q),
                          like(property.parcelId, q),
                          like(property.city, q),
                          like(property.zipCode, q)
                      )
                  )
                : eq(propertyLinkedBidders.bidderId, session.user.id);

            const whereClause = endingSoon
                ? and(
                      baseClause as any,
                      sql`${property.auctionEnd} is not null and ${property.auctionEnd} >= ${now} and ${property.auctionEnd} <= ${end}`
                  )
                : baseClause;

            properties = await db
                .select({
                    id: property.id,
                    title: property.title,
                    description: property.description,
                    address: property.address,
                    parcelId: property.parcelId,
                    city: property.city,
                    zipCode: property.zipCode,
                    squareFeet: property.squareFeet,
                    yearBuilt: property.yearBuilt,
                    lotSize: property.lotSize,
                    auctionEnd: property.auctionEnd,
                    minBid: property.minBid,
                    visibilitySettings: property.visibilitySettings,
                    status: property.status,
                    createdBy: property.createdBy,
                    createdAt: property.createdAt,
                    updatedAt: property.updatedAt,
                })
                .from(propertyLinkedBidders)
                .leftJoin(property, eq(propertyLinkedBidders.propertyId, property.id))
                .where(whereClause as any);
        }

        const propertyIds = properties.map((p) => p.id).filter(Boolean);

        const maxBids =
            propertyIds.length === 0
                ? []
                : await db
                      .select({
                          propertyId: propertyBids.propertyId,
                          maxAmount: sql<number>`max(${propertyBids.amount})`.as("maxAmount"),
                      })
                      .from(propertyBids)
                      .where(inArray(propertyBids.propertyId, propertyIds))
                      .groupBy(propertyBids.propertyId);

        const maxBidByPropertyId = new Map<string, number>();
        for (const row of maxBids) {
            if (row.propertyId) maxBidByPropertyId.set(row.propertyId, Number(row.maxAmount));
        }

        const enriched = properties.map((p: any) => {
            const maxBid = maxBidByPropertyId.get(p.id);
            const currentBid =
                maxBid !== undefined && !Number.isNaN(maxBid)
                    ? maxBid
                    : p.minBid ?? null;
            return { ...p, currentBid, visibilitySettings: normalizeVisibilitySettings(p.visibilitySettings) };
        });

        return NextResponse.json(enriched);
    } catch (error) {
        console.error("[PROPERTIES_GET]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
