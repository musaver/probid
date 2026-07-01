// Bidder / county ↔ admin support thread.
//   GET  /api/support   → the current user's thread (marks admin replies as read)
//   POST /api/support   → the user sends a message to admin
// One thread per user. senderRole 'user' = this user; 'admin' = the platform admin.

import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { and, asc, eq } from 'drizzle-orm';
import { authOptions } from '@/lib/auth';
import { db } from '@/lib/db';
import { supportMessage } from '@/lib/schema';

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return new NextResponse('Unauthorized', { status: 401 });
  const uid = session.user.id;

  const messages = await db
    .select()
    .from(supportMessage)
    .where(eq(supportMessage.userId, uid))
    .orderBy(asc(supportMessage.createdAt));

  // The user is viewing the thread now → mark admin replies as read.
  await db
    .update(supportMessage)
    .set({ isRead: 1 })
    .where(and(eq(supportMessage.userId, uid), eq(supportMessage.senderRole, 'admin'), eq(supportMessage.isRead, 0)));

  return NextResponse.json({ messages });
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return new NextResponse('Unauthorized', { status: 401 });

  let body: { body?: string };
  try { body = await req.json(); } catch { return NextResponse.json({ error: 'Invalid request.' }, { status: 400 }); }

  const text = (body.body || '').trim();
  if (!text) return NextResponse.json({ error: 'Message is required.' }, { status: 400 });
  if (text.length > 5000) return NextResponse.json({ error: 'Message is too long.' }, { status: 400 });

  await db.insert(supportMessage).values({
    userId: session.user.id,
    senderRole: 'user',
    body: text,
    isRead: 0,
    createdAt: new Date(),
  });

  return NextResponse.json({ ok: true });
}
