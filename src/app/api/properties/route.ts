import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { property } from "@/lib/schema";
import { v4 as uuidv4 } from "uuid";
import { eq } from "drizzle-orm";

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

        const propertyId = uuidv4();

        await db.insert(property).values({
            id: propertyId,
            title: address, // Using address as title for now as per UI
            description,
            address,
            parcelId,
            city,
            zipCode,
            squareFeet: squareFeet ? parseInt(squareFeet) : null,
            yearBuilt: yearBuilt ? parseInt(yearBuilt) : null,
            lotSize,
            auctionEnd: auctionEnd ? new Date(auctionEnd) : null,
            visibilitySettings,
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

        const properties = await db.select().from(property);

        return NextResponse.json(properties);
    } catch (error) {
        console.error("[PROPERTIES_GET]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
