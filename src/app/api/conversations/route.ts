import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { conversations, user, messages, property } from "@/lib/schema";
import { eq, or, and, desc, isNotNull } from "drizzle-orm";
import { v4 as uuidv4 } from "uuid";
import crypto from "crypto";

export async function GET(req: Request) {
    try {
        const session = await getServerSession(authOptions);
        if (!session) return new NextResponse("Unauthorized", { status: 401 });

        const userId = session.user.id;

        const userConversations = await db
            .select()
            .from(conversations)
            .where(
                and(
                    or(
                        eq(conversations.participant1Id, userId),
                        eq(conversations.participant2Id, userId)
                    ),
                    isNotNull(conversations.propertyId)
                )
            )
            .orderBy(desc(conversations.lastMessageAt));

        const enrichedConversations = await Promise.all(
            userConversations.map(async (conv) => {
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

                const unreadMessages = await db
                    .select()
                    .from(messages)
                    .where(
                        and(
                            eq(messages.conversationId, conv.id),
                            eq(messages.senderId, otherUserId),
                            eq(messages.isRead, 0)
                        )
                    );

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

                return {
                    ...conv,
                    otherUser: otherUser[0],
                    unreadCount: unreadMessages.length,
                    property: propertyInfo,
                };
            })
        );

        return NextResponse.json(enrichedConversations);
    } catch (error) {
        console.error("[CONVERSATIONS_GET]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        const session = await getServerSession(authOptions);
        if (!session) return new NextResponse("Unauthorized", { status: 401 });

        const { otherUserId, propertyId } = await req.json();
        const userId = session.user.id;

        if (!otherUserId) {
            return new NextResponse("Missing otherUserId", { status: 400 });
        }
        if (!propertyId) {
            return new NextResponse("Missing propertyId", { status: 400 });
        }

        // Check if conversation already exists for this user pair + property
        const existingConv = await db
            .select()
            .from(conversations)
            .where(
                and(
                    eq(conversations.propertyId, propertyId),
                    or(
                        and(
                            eq(conversations.participant1Id, userId),
                            eq(conversations.participant2Id, otherUserId)
                        ),
                        and(
                            eq(conversations.participant1Id, otherUserId),
                            eq(conversations.participant2Id, userId)
                        )
                    )
                )
            )
            .limit(1);

        if (existingConv.length > 0) {
            return NextResponse.json(existingConv[0]);
        }

        const sharedKey = crypto.randomBytes(32).toString("hex");

        const newConvId = uuidv4();
        await db.insert(conversations).values({
            id: newConvId,
            participant1Id: userId,
            participant2Id: otherUserId,
            propertyId,
            createdAt: new Date(),
            lastMessageAt: new Date(),
            sharedKey: sharedKey,
        });

        const newConv = await db
            .select()
            .from(conversations)
            .where(eq(conversations.id, newConvId))
            .limit(1);

        return NextResponse.json(newConv[0]);
    } catch (error) {
        console.error("[CONVERSATIONS_POST]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
