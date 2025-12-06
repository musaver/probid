import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { messages, conversations } from "@/lib/schema";
import { eq, and, ne, or } from "drizzle-orm";

export async function POST(req: Request) {
    try {
        const session = await getServerSession(authOptions);
        if (!session) return new NextResponse("Unauthorized", { status: 401 });

        const { conversationId } = await req.json();
        const userId = session.user.id;

        if (!conversationId) {
            return new NextResponse("Missing conversationId", { status: 400 });
        }

        // Verify user is part of this conversation
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

        // Mark all messages in this conversation as read (except those sent by current user)
        await db
            .update(messages)
            .set({ isRead: 1 })
            .where(
                and(
                    eq(messages.conversationId, conversationId),
                    ne(messages.senderId, userId),
                    eq(messages.isRead, 0)
                )
            );

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("[MESSAGES_READ_POST]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
