import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { property } from "@/lib/schema";
import { v4 as uuidv4 } from "uuid";

interface ImportedProperty {
    Title: string;
    "Sale ID"?: string;
    "Parcel ID"?: string;
    Address?: string;
    City?: string;
    "Zip Code"?: number | string;
    "Minimum Bid"?: number;
    "Winning Bid"?: number;
    "Bidder Number"?: string;
    "Auction End Date"?: string; // YYYY-MM-DD
    "Owners"?: string; // Comma or semicolon separated
    "Status"?: string;
}

export async function POST(req: Request) {
    try {
        const session = await getServerSession(authOptions);
        if (!session || session.user.type !== "county") {
            return new NextResponse("Unauthorized", { status: 403 });
        }

        const { properties } = await req.json();

        if (!Array.isArray(properties) || properties.length === 0) {
            return new NextResponse("No properties provided", { status: 400 });
        }

        const valuesToInsert = properties.map((p: ImportedProperty) => {
            // Basic validation: Title is required
            if (!p.Title) {
                throw new Error("Missing required field: Title");
            }

            // Use Sale ID if provided, otherwise fallback to Parcel ID or generate one
            // Convert to string first in case Excel imported as number
            const saleId = (p["Sale ID"] ? String(p["Sale ID"]).trim() : null)
                || (p["Parcel ID"] ? String(p["Parcel ID"]).trim() : null)
                || uuidv4().slice(0, 8).toUpperCase();

            // Handle Owners (split by comma or semicolon)
            let ownersArr: string[] = [];
            if (p.Owners) {
                ownersArr = p.Owners.split(/[;,]/).map(o => o.trim()).filter(Boolean);
            }

            // Valid statuses from schema
            const validStatuses = [
                'active', 'sold', 'withdrawn', 'on_list', 'sold_at_tax_sale',
                'redeemed', 'voided', 'cancelled', 'deed_in_progress',
                'deed_issued', 'redeemed_check_issued'
            ];
            const status = (p.Status && validStatuses.includes(p.Status.toLowerCase()))
                ? p.Status.toLowerCase() as any
                : "active";

            return {
                id: uuidv4(),
                title: p.Title,
                address: p.Address || null,
                city: p.City || null,
                zipCode: p["Zip Code"] ? String(p["Zip Code"]) : null,
                parcelId: p["Parcel ID"] || null,
                saleId: saleId,
                minBid: p["Minimum Bid"] ? String(p["Minimum Bid"]) : "0.00",
                winningBid: p["Winning Bid"] ? String(p["Winning Bid"]) : "0.00",
                winningBidderId: p["Bidder Number"] ? String(p["Bidder Number"]) : null,
                owners: ownersArr.length > 0 ? ownersArr : null,
                auctionEnd: p["Auction End Date"] ? new Date(p["Auction End Date"]) : null,
                createdBy: session.user.id,
                createdAt: new Date(),
                updatedAt: new Date(),
                status: status,
                visibilitySettings: {
                    minBid: true,
                    currentBid: true,
                    bidHistory: false,
                    propertyStatus: true,
                    bidderList: false,
                    documents: true,
                }, // Default visibility settings
            };
        });

        // Bulk insert
        await db.insert(property).values(valuesToInsert);

        return NextResponse.json({ count: valuesToInsert.length });
    } catch (error: any) {
        console.error("Bulk upload error:", error);
        return new NextResponse(error.message || "Internal Server Error", { status: 500 });
    }
}
