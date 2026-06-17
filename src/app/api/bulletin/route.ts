// GET /api/bulletin — published bulletin posts visible to the current user (bidder/county).
// Returns posts targeted to "all" or to the user's type, pinned first, newest first.

import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { and, desc, eq, inArray } from 'drizzle-orm';
import { authOptions } from '@/lib/auth';
import { db } from '@/lib/db';
import { bulletinPost } from '@/lib/schema';

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return new NextResponse('Unauthorized', { status: 401 });

  const userType = session.user.type === 'county' ? 'county' : 'bidder';

  const posts = await db
    .select()
    .from(bulletinPost)
    .where(and(eq(bulletinPost.published, 1), inArray(bulletinPost.audience, ['all', userType])))
    .orderBy(desc(bulletinPost.pinned), desc(bulletinPost.createdAt));

  return NextResponse.json({ posts });
}
