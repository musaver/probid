import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { propertyLinkedBidders, user } from "@/lib/schema";
import { eq, and } from "drizzle-orm";
import { v4 as uuidv4 } from "uuid";

// GET linked bidders for a property
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

        const linkedBidders = await db
            .select({
                linkId: propertyLinkedBidders.id,
                bidderId: propertyLinkedBidders.bidderId,
                status: propertyLinkedBidders.status,
                linkedAt: propertyLinkedBidders.linkedAt,
                name: user.name,
                email: user.email,
                image: user.image,
            })
            .from(propertyLinkedBidders)
            .leftJoin(user, eq(propertyLinkedBidders.bidderId, user.id))
            .where(eq(propertyLinkedBidders.propertyId, params.id));

        return NextResponse.json(linkedBidders);
    } catch (error) {
        console.error("[LINKED_BIDDERS_GET]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}

// POST - Link a bidder to a property
export async function POST(
    req: Request,
    props: { params: Promise<{ id: string }> }
) {
    const params = await props.params;
    try {
        const session = await getServerSession(authOptions);

        if (!session) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const body = await req.json();
        const { bidderId, status = "invited" } = body;

        if (!bidderId) {
            return new NextResponse("Bidder ID is required", { status: 400 });
        }

        // Check if already linked
        const existing = await db
            .select()
            .from(propertyLinkedBidders)
            .where(
                and(
                    eq(propertyLinkedBidders.propertyId, params.id),
                    eq(propertyLinkedBidders.bidderId, bidderId)
                )
            )
            .limit(1);

        if (existing.length > 0) {
            return new NextResponse("Bidder already linked", { status: 400 });
        }

        const linkId = uuidv4();

        await db.insert(propertyLinkedBidders).values({
            id: linkId,
            propertyId: params.id,
            bidderId,
            status,
            linkedAt: new Date(),
        });

        return NextResponse.json({ linkId }, { status: 201 });
    } catch (error) {
        console.error("[LINK_BIDDER_POST]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}

// DELETE - Unlink a bidder from a property
export async function DELETE(
    req: Request,
    props: { params: Promise<{ id: string }> }
) {
    const params = await props.params;
    try {
        const session = await getServerSession(authOptions);

        if (!session) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const { searchParams } = new URL(req.url);
        const bidderId = searchParams.get("bidderId");

        if (!bidderId) {
            return new NextResponse("Bidder ID is required", { status: 400 });
        }

        await db
            .delete(propertyLinkedBidders)
            .where(
                and(
                    eq(propertyLinkedBidders.propertyId, params.id),
                    eq(propertyLinkedBidders.bidderId, bidderId)
                )
            );

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("[UNLINK_BIDDER_DELETE]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
