import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { conversations, user, messages } from "@/lib/schema";
import { eq, or, and, desc } from "drizzle-orm";
import { v4 as uuidv4 } from "uuid";
import crypto from "crypto";

export async function GET(req: Request) {
    try {
        const session = await getServerSession(authOptions);
        if (!session) return new NextResponse("Unauthorized", { status: 401 });

        const userId = session.user.id;

        // Fetch conversations where current user is participant
        const userConversations = await db
            .select()
            .from(conversations)
            .where(
                or(
                    eq(conversations.participant1Id, userId),
                    eq(conversations.participant2Id, userId)
                )
            )
            .orderBy(desc(conversations.lastMessageAt));

        // Enrich with other participant details and unread count
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

                // Count unread messages (messages sent by other user that are not read)
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

                return {
                    ...conv,
                    otherUser: otherUser[0],
                    unreadCount: unreadMessages.length,
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

        const { otherUserId } = await req.json();
        const userId = session.user.id;

        if (!otherUserId) {
            return new NextResponse("Missing otherUserId", { status: 400 });
        }

        // Check if conversation already exists
        const existingConv = await db
            .select()
            .from(conversations)
            .where(
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
            .limit(1);

        if (existingConv.length > 0) {
            return NextResponse.json(existingConv[0]);
        }

        // Create new conversation
        // Generate a simple shared key (AES-256 compatible, 32 bytes hex)
        const sharedKey = crypto.randomBytes(32).toString("hex");

        const newConvId = uuidv4();
        await db.insert(conversations).values({
            id: newConvId,
            participant1Id: userId,
            participant2Id: otherUserId,
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
