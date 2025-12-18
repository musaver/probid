import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { notifications, property, propertyBids, propertyLinkedBidders, user } from "@/lib/schema";
import { eq } from "drizzle-orm";
import { sql } from "drizzle-orm";
import { v4 as uuidv4 } from "uuid";

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

export async function GET(
    req: Request,
    props: { params: Promise<{ id: string }> }
) {
    const params = await props.params;
    try {
        const session = await getServerSession(authOptions);

        if (!session) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const propertyData = await db
            .select()
            .from(property)
            .where(eq(property.id, params.id))
            .limit(1);

        if (!propertyData || propertyData.length === 0) {
            return new NextResponse("Property not found", { status: 404 });
        }

        const p: any = propertyData[0];

        const maxBidRows = await db
            .select({
                maxAmount: sql<number>`max(${propertyBids.amount})`.as("maxAmount"),
            })
            .from(propertyBids)
            .where(eq(propertyBids.propertyId, params.id));

        const maxBid = maxBidRows?.[0]?.maxAmount;
        const currentBid =
            maxBid !== undefined && maxBid !== null ? Number(maxBid) : p.minBid ?? null;

        return NextResponse.json({
            ...p,
            currentBid,
            visibilitySettings: normalizeVisibilitySettings(p.visibilitySettings),
        });
    } catch (error) {
        console.error("[PROPERTY_GET]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}

export async function PATCH(
    req: Request,
    props: { params: Promise<{ id: string }> }
) {
    const params = await props.params;
    try {
        const session = await getServerSession(authOptions);

        if (!session) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        // Only property creator can edit; also capture old status/address for notifications
        const [existing] = await db
            .select({ id: property.id, createdBy: property.createdBy, status: property.status, address: property.address, title: property.title })
            .from(property)
            .where(eq(property.id, params.id))
            .limit(1);

        if (!existing) return new NextResponse("Property not found", { status: 404 });
        if (existing.createdBy !== session.user.id) {
            return new NextResponse("Forbidden", { status: 403 });
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

        const nextStatus = status || "active";
        const safeTitle =
            String(title || "").trim() ||
            String(address || "").trim() ||
            String(existing.title || "").trim() ||
            String(existing.address || "").trim();

        await db
            .update(property)
            .set({
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
                status: nextStatus,
                updatedAt: new Date(),
            })
            .where(eq(property.id, params.id));

        // Notify on status change (linked bidders + county)
        if (existing.status !== nextStatus) {
            const linked = await db
                .select({ bidderId: propertyLinkedBidders.bidderId })
                .from(propertyLinkedBidders)
                .where(eq(propertyLinkedBidders.propertyId, params.id));

            const targetIds = new Set<string>();
            linked.forEach((l) => targetIds.add(l.bidderId));
            targetIds.add(existing.createdBy);

            const href = `/property-details/${params.id}`;
            const title = `Property status updated`;
            const msg = `${existing.address || "Property"} status changed to ${nextStatus}.`;
            const createdAt = new Date();

            for (const userId of Array.from(targetIds)) {
                await db.insert(notifications).values({
                    id: uuidv4(),
                    userId,
                    type: "status",
                    title,
                    message: msg,
                    href,
                    metadata: { propertyId: params.id, status: nextStatus },
                    isRead: 0,
                    createdAt,
                });
            }
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("[PROPERTY_PATCH]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
