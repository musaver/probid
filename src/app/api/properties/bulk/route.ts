import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { property } from "@/lib/schema";
import { v4 as uuidv4 } from "uuid";

interface ImportedProperty {
    Title: string;
    Address?: string;
    City?: string;
    "Zip Code"?: number | string;
    "Parcel ID"?: string;
    "Minimum Bid"?: number;
    Description?: string;
    "Year Built"?: number;
    "Auction End Date"?: string; // YYYY-MM-DD
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

            // Generate a Sale ID if not provided (simple collision avoidance)
            // For now, we'll assume the system generates one or uses Parcel ID as fallback
            const saleId = p["Parcel ID"] || uuidv4().slice(0, 8).toUpperCase();

            return {
                id: uuidv4(),
                title: p.Title,
                address: p.Address || null,
                city: p.City || null,
                zipCode: p["Zip Code"] ? String(p["Zip Code"]) : null,
                parcelId: p["Parcel ID"] || null,
                saleId: saleId,
                minBid: p["Minimum Bid"] ? String(p["Minimum Bid"]) : "0.00",
                description: p.Description || null,
                yearBuilt: p["Year Built"] ? Number(p["Year Built"]) : null,
                auctionEnd: p["Auction End Date"] ? new Date(p["Auction End Date"]) : null,
                createdBy: session.user.id,
                createdAt: new Date(),
                updatedAt: new Date(),
                status: "active" as const, // Default status
                visibilitySettings: {}, // Default empty settings
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
