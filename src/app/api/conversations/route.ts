import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { conversations, user, messages, property } from "@/lib/schema";
import { eq, or, and, desc, isNotNull, inArray, sql } from "drizzle-orm";
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

        if (userConversations.length === 0) {
            return NextResponse.json([]);
        }

        // Batch-load everything in a fixed number of queries (no per-conversation N+1):
        const otherUserIds = Array.from(new Set(
            userConversations.map((c) => (c.participant1Id === userId ? c.participant2Id : c.participant1Id))
        ));
        const propertyIds = Array.from(new Set(
            userConversations.map((c) => c.propertyId).filter((id): id is string => !!id)
        ));
        const conversationIds = userConversations.map((c) => c.id);

        const [otherUsers, props, unreadRows] = await Promise.all([
            otherUserIds.length
                ? db.select({ id: user.id, name: user.name, image: user.image, email: user.email })
                    .from(user).where(inArray(user.id, otherUserIds))
                : Promise.resolve([] as { id: string; name: string | null; image: string | null; email: string }[]),
            propertyIds.length
                ? db.select({ id: property.id, title: property.title, address: property.address, saleId: property.saleId })
                    .from(property).where(inArray(property.id, propertyIds))
                : Promise.resolve([] as { id: string; title: string | null; address: string | null; saleId: string }[]),
            // Unread counts per conversation (messages the OTHER side sent that I haven't read).
            db.select({
                conversationId: messages.conversationId,
                senderId: messages.senderId,
                count: sql<number>`count(*)`,
            })
                .from(messages)
                .where(and(inArray(messages.conversationId, conversationIds), eq(messages.isRead, 0)))
                .groupBy(messages.conversationId, messages.senderId),
        ]);

        const userMap = new Map(otherUsers.map((u) => [u.id, u]));
        const propMap = new Map(props.map((p) => [p.id, p]));

        const enrichedConversations = userConversations.map((conv) => {
            const otherUserId = conv.participant1Id === userId ? conv.participant2Id : conv.participant1Id;
            // Unread = messages in this conversation, sent by the other user, that are unread.
            const unreadCount = unreadRows
                .filter((r) => r.conversationId === conv.id && r.senderId === otherUserId)
                .reduce((sum, r) => sum + Number(r.count), 0);

            return {
                ...conv,
                otherUser: userMap.get(otherUserId) || null,
                unreadCount,
                property: conv.propertyId ? (propMap.get(conv.propertyId) || null) : null,
            };
        });

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
