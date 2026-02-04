import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { property, propertyLinkedBidders, user as userTable } from "@/lib/schema";
import { v4 as uuidv4 } from "uuid";
import { inArray } from "drizzle-orm";

interface ImportedProperty {
    Title: string;
    "Sale ID"?: string;
    "Parcel ID"?: string;
    Address?: string;
    City?: string;
    "Zip Code"?: number | string;
    "Minimum Bid"?: number;
    "Winning Bid"?: number;
    "Bidder Email"?: string;
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

        // 1. Collect all unique emails to look up
        const emails = Array.from(new Set(
            properties
                .map((p: ImportedProperty) => p["Bidder Email"]?.trim())
                .filter(Boolean)
        )) as string[];

        // 2. Lookup Users
        const userMap = new Map<string, string>(); // email -> id
        if (emails.length > 0) {
            const users = await db
                .select({ id: userTable.id, email: userTable.email })
                .from(userTable)
                .where(inArray(userTable.email, emails));

            users.forEach(u => userMap.set(u.email.toLowerCase(), u.id));
        }

        const linkedBiddersToInsert: any[] = [];

        const valuesToInsert = properties.map((p: ImportedProperty) => {
            // Basic validation: Title is required
            if (!p.Title) {
                throw new Error("Missing required field: Title");
            }

            // Use Sale ID if provided, otherwise fallback to Parcel ID or generate one
            const saleId = (p["Sale ID"] ? String(p["Sale ID"]).trim() : null)
                || (p["Parcel ID"] ? String(p["Parcel ID"]).trim() : null)
                || uuidv4().slice(0, 8).toUpperCase();

            // Handle Owners
            let ownersArr: string[] = [];
            if (p.Owners) {
                ownersArr = p.Owners.split(/[;,]/).map(o => o.trim()).filter(Boolean);
            }

            // Valid statuses
            const validStatuses = [
                'active', 'sold', 'withdrawn', 'on_list', 'sold_at_tax_sale',
                'redeemed', 'voided', 'cancelled', 'deed_in_progress',
                'deed_issued', 'redeemed_check_issued'
            ];
            const status = (p.Status && validStatuses.includes(p.Status.toLowerCase()))
                ? p.Status.toLowerCase() as any
                : "active";

            const propertyId = uuidv4();
            const bidderEmail = p["Bidder Email"]?.trim().toLowerCase();
            const bidderId = bidderEmail ? userMap.get(bidderEmail) : null;

            if (bidderId) {
                linkedBiddersToInsert.push({
                    id: uuidv4(),
                    propertyId,
                    bidderId,
                    status: "invited",
                    linkedAt: new Date(),
                });
            }

            return {
                id: propertyId,
                title: p.Title,
                address: p.Address || null,
                city: p.City || null,
                zipCode: p["Zip Code"] ? String(p["Zip Code"]) : null,
                parcelId: p["Parcel ID"] || null,
                saleId: saleId,
                minBid: p["Minimum Bid"] ? String(p["Minimum Bid"]) : "0.00",
                winningBid: p["Winning Bid"] ? String(p["Winning Bid"]) : "0.00",
                winningBidderId: bidderId || null,
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
                },
            };
        });

        // Bulk insert
        await db.transaction(async (tx) => {
            await tx.insert(property).values(valuesToInsert);
            if (linkedBiddersToInsert.length > 0) {
                await tx.insert(propertyLinkedBidders).values(linkedBiddersToInsert);
            }
        });

        return NextResponse.json({ count: valuesToInsert.length });
    } catch (error: any) {
        console.error("Bulk upload error:", error);
        return new NextResponse(error.message || "Internal Server Error", { status: 500 });
    }
}
