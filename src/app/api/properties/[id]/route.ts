import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { notifications, property, propertyBids, propertyDocuments, propertyLinkedBidders, user } from "@/lib/schema";
import { eq } from "drizzle-orm";
import { sql } from "drizzle-orm";
import { v4 as uuidv4 } from "uuid";

const defaultVisibilitySettings = {
    minBid: true,
    currentBid: true,
    propertyStatus: true,
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

        if (typeof p.owners === "string") {
            try {
                p.owners = JSON.parse(p.owners);
            } catch {
                p.owners = [];
            }
        }

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
            .select({ id: property.id, createdBy: property.createdBy, status: property.status, countyStatus: property.countyStatus, address: property.address, title: property.title })
            .from(property)
            .where(eq(property.id, params.id))
            .limit(1);

        if (!existing) return new NextResponse("Property not found", { status: 404 });
        if (existing.createdBy !== session.user.id) {
            return new NextResponse("Forbidden", { status: 403 });
        }

        const body = await req.json();

        // Helper to check if property exists in body
        const has = (key: string) => Object.prototype.hasOwnProperty.call(body, key);

        const updateData: any = {
            updatedAt: new Date(),
        };

        if (has("description")) updateData.description = body.description;
        if (has("parcelId")) updateData.parcelId = body.parcelId;
        if (has("city")) updateData.city = body.city;
        if (has("zipCode")) updateData.zipCode = body.zipCode;
        if (has("owners")) updateData.owners = body.owners;
        if (has("winningBidderId")) updateData.winningBidderId = body.winningBidderId;

        if (has("saleId")) {
            if (String(body.saleId).trim() === "") {
                return new NextResponse("Sale ID cannot be empty", { status: 400 });
            }
            updateData.saleId = body.saleId;
        }

        if (has("address")) updateData.address = body.address;

        // Title update logic - preserve "safe title" behavior but only if relevant fields change
        // or if title is explicitly cleared
        if (has("title") || has("address")) {
            const rawTitle = has("title") ? body.title : existing.title;
            const rawAddress = has("address") ? body.address : existing.address;

            updateData.title =
                String(rawTitle || "").trim() ||
                String(rawAddress || "").trim() ||
                String(existing.title || "").trim() ||
                String(existing.address || "").trim();
        }

        if (has("yearBuilt")) {
            updateData.yearBuilt = body.yearBuilt ? parseInt(body.yearBuilt) : null;
        }

        if (has("auctionEnd")) {
            updateData.auctionEnd = body.auctionEnd ? new Date(body.auctionEnd) : null;
        }

        if (has("minBid")) {
            updateData.minBid =
                body.minBid === undefined || body.minBid === null || `${body.minBid}`.trim() === ""
                    ? null
                    : parseFloat(`${body.minBid}`.replace(/[^0-9.]/g, "")).toFixed(2);
        }

        if (has("winningBid")) {
            updateData.winningBid =
                body.winningBid === undefined || body.winningBid === null || `${body.winningBid}`.trim() === ""
                    ? null
                    : parseFloat(`${body.winningBid}`.replace(/[^0-9.]/g, "")).toFixed(2);
        }

        if (has("visibilitySettings")) {
            updateData.visibilitySettings = normalizeVisibilitySettings(body.visibilitySettings);
        }

        // Status logic
        const nextStatus = has("status") && body.status ? body.status : existing.status;
        if (has("status")) {
            updateData.status = nextStatus;
        }

        // County-only status (set by county, shown to bidders, NOT synced to OwnMidwest).
        // Empty string clears it back to null.
        const nextCountyStatus = has("countyStatus")
            ? (body.countyStatus || null)
            : existing.countyStatus;
        if (has("countyStatus")) {
            updateData.countyStatus = nextCountyStatus;
        }

        await db
            .update(property)
            .set(updateData)
            .where(eq(property.id, params.id));

        // Notify on status OR county-status change (linked bidders + county)
        const statusChanged = existing.status !== nextStatus;
        const countyStatusChanged = existing.countyStatus !== nextCountyStatus;
        if (statusChanged || countyStatusChanged) {
            const linked = await db
                .select({ bidderId: propertyLinkedBidders.bidderId })
                .from(propertyLinkedBidders)
                .where(eq(propertyLinkedBidders.propertyId, params.id));

            const targetIds = new Set<string>();
            linked.forEach((l) => targetIds.add(l.bidderId));
            targetIds.add(existing.createdBy);

            // "redemption_letter_sent" -> "Redemption Letter Sent"
            const pretty = (v: string | null) =>
                v ? v.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()) : "none";

            const href = `/property-details/${params.id}`;
            const createdAt = new Date();
            const msg = countyStatusChanged
                ? `${existing.address || "Property"} county status changed to ${pretty(nextCountyStatus)}.`
                : `${existing.address || "Property"} status changed to ${nextStatus}.`;
            const title = countyStatusChanged ? `County status updated` : `Property status updated`;

            for (const userId of Array.from(targetIds)) {
                await db.insert(notifications).values({
                    id: uuidv4(),
                    userId,
                    type: "status",
                    title,
                    message: msg,
                    href,
                    metadata: { propertyId: params.id, status: nextStatus, countyStatus: nextCountyStatus },
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

export async function DELETE(
    _req: Request,
    props: { params: Promise<{ id: string }> }
) {
    const params = await props.params;
    try {
        const session = await getServerSession(authOptions);
        if (!session) return new NextResponse("Unauthorized", { status: 401 });

        const [existing] = await db
            .select({ id: property.id, createdBy: property.createdBy })
            .from(property)
            .where(eq(property.id, params.id))
            .limit(1);

        if (!existing) return new NextResponse("Property not found", { status: 404 });
        if (existing.createdBy !== session.user.id) {
            return new NextResponse("Forbidden", { status: 403 });
        }

        // Best-effort cleanup of related records
        await db.delete(propertyDocuments).where(eq(propertyDocuments.propertyId, params.id));
        await db.delete(propertyBids).where(eq(propertyBids.propertyId, params.id));
        await db.delete(propertyLinkedBidders).where(eq(propertyLinkedBidders.propertyId, params.id));
        await db.delete(property).where(eq(property.id, params.id));

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("[PROPERTY_DELETE]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
