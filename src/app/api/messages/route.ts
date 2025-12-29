import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { messages, conversations } from "@/lib/schema";
import { eq, asc } from "drizzle-orm";
import { v4 as uuidv4 } from "uuid";

export async function GET(req: Request) {
    try {
        const session = await getServerSession(authOptions);
        if (!session) return new NextResponse("Unauthorized", { status: 401 });

        const { searchParams } = new URL(req.url);
        const conversationId = searchParams.get("conversationId");

        if (!conversationId) {
            return new NextResponse("Missing conversationId", { status: 400 });
        }

        // Verify user is part of conversation
        const conv = await db
            .select()
            .from(conversations)
            .where(eq(conversations.id, conversationId))
            .limit(1);

        if (conv.length === 0) return new NextResponse("Conversation not found", { status: 404 });

        if (conv[0].participant1Id !== session.user.id && conv[0].participant2Id !== session.user.id) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const msgs = await db
            .select()
            .from(messages)
            .where(eq(messages.conversationId, conversationId))
            .orderBy(asc(messages.createdAt));

        return NextResponse.json(msgs);
    } catch (error) {
        console.error("[MESSAGES_GET]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        const session = await getServerSession(authOptions);
        if (!session) return new NextResponse("Unauthorized", { status: 401 });

        const { conversationId, content } = await req.json();

        if (!conversationId || !content) {
            return new NextResponse("Missing data", { status: 400 });
        }

        // Verify user is part of conversation
        const conv = await db
            .select()
            .from(conversations)
            .where(eq(conversations.id, conversationId))
            .limit(1);

        if (conv.length === 0) return new NextResponse("Conversation not found", { status: 404 });

        if (conv[0].participant1Id !== session.user.id && conv[0].participant2Id !== session.user.id) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        await db.insert(messages).values({
            id: uuidv4(),
            conversationId,
            senderId: session.user.id,
            content, // This is already encrypted by the client
            createdAt: new Date(),
            isRead: 0,
        });

        // Update conversation last message time
        await db
            .update(conversations)
            .set({ lastMessageAt: new Date() })
            .where(eq(conversations.id, conversationId));

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("[MESSAGES_POST]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
