import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { conversations, user, property } from "@/lib/schema";
import { eq, and, or } from "drizzle-orm";

export async function GET(
    req: Request,
    { params }: { params: Promise<{ conversationId: string }> }
) {
    try {
        const session = await getServerSession(authOptions);
        if (!session) return new NextResponse("Unauthorized", { status: 401 });

        const { conversationId } = await params;
        const userId = session.user.id;

        const conversation = await db
            .select()
            .from(conversations)
            .where(
                and(
                    eq(conversations.id, conversationId),
                    or(
                        eq(conversations.participant1Id, userId),
                        eq(conversations.participant2Id, userId)
                    )
                )
            )
            .limit(1);

        if (conversation.length === 0) {
            return new NextResponse("Conversation not found", { status: 404 });
        }

        const conv = conversation[0];

        const otherUserId =
            conv.participant1Id === userId
                ? conv.participant2Id
                : conv.participant1Id;

        const otherUser = await db
            .select({
                id: user.id,
                name: user.name,
                image: user.image,
                email: user.email,
            })
            .from(user)
            .where(eq(user.id, otherUserId))
            .limit(1);

        let propertyInfo = null;
        if (conv.propertyId) {
            const [prop] = await db
                .select({
                    id: property.id,
                    title: property.title,
                    address: property.address,
                    saleId: property.saleId,
                })
                .from(property)
                .where(eq(property.id, conv.propertyId))
                .limit(1);
            propertyInfo = prop || null;
        }

        return NextResponse.json({
            ...conv,
            otherUser: otherUser[0],
            property: propertyInfo,
        });
    } catch (error) {
        console.error("[CONVERSATION_GET]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
