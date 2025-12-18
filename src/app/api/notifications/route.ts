import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { notifications } from "@/lib/schema";
import { and, count, desc, eq, inArray } from "drizzle-orm";

export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) return new NextResponse("Unauthorized", { status: 401 });

    const { searchParams } = new URL(req.url);
    const limit = Math.min(parseInt(searchParams.get("limit") || "15", 10) || 15, 50);

    const items = await db
      .select()
      .from(notifications)
      .where(eq(notifications.userId, session.user.id))
      .orderBy(desc(notifications.createdAt))
      .limit(limit);

    const unreadRow = await db
      .select({ c: count() })
      .from(notifications)
      .where(and(eq(notifications.userId, session.user.id), eq(notifications.isRead, 0)));

    return NextResponse.json({
      unreadCount: Number(unreadRow?.[0]?.c || 0),
      notifications: items,
    });
  } catch (error) {
    console.error("[NOTIFICATIONS_GET]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function PATCH(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) return new NextResponse("Unauthorized", { status: 401 });

    const body = await req.json().catch(() => ({}));
    const ids = body?.ids as string[] | undefined;
    const markAll = body?.all === true;

    if (!markAll && (!ids || ids.length === 0)) {
      return new NextResponse("Provide ids[] or all=true", { status: 400 });
    }

    if (markAll) {
      await db
        .update(notifications)
        .set({ isRead: 1 })
        .where(eq(notifications.userId, session.user.id));
    } else {
      await db
        .update(notifications)
        .set({ isRead: 1 })
        .where(and(eq(notifications.userId, session.user.id), inArray(notifications.id, ids!)));
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[NOTIFICATIONS_PATCH]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}


