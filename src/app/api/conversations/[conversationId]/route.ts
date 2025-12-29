import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { conversations, user } from "@/lib/schema";
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

        // Fetch conversation
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

        // Fetch other participant details
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

        return NextResponse.json({
            ...conv,
            otherUser: otherUser[0],
        });
    } catch (error) {
        console.error("[CONVERSATION_GET]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
