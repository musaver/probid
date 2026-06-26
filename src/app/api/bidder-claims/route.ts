// Bidder claims — a bidder asserts "I'm bidder #N in <county> and won these properties".
//   POST  /api/bidder-claims   submit a claim (one county) → auto-matches each property
//   GET   /api/bidder-claims   list the current bidder's own claims (+ items)
//
// No bidding happens here — this records which auction results a bidder won, pending admin
// verification. Match: a claimed property matches when its winning_bidder_number equals the
// claimed number (and county agrees). "results not uploaded yet" stays not_found until synced.

import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { and, desc, eq, or } from 'drizzle-orm';
import { v4 as uuidv4 } from 'uuid';
import { authOptions } from '@/lib/auth';
import { db } from '@/lib/db';
import { bidderClaim, bidderClaimItem, property, syncStatusMap } from '@/lib/schema';

type Match = 'matched' | 'mismatch' | 'not_found';

async function matchOne(enteredValue: string, omCountyId: number, bidderNumber: string): Promise<{ resolvedPropertyId: string | null; matchStatus: Match }> {
  const [prop] = await db
    .select({ id: property.id, num: property.winningBidderNumber, county: syncStatusMap.omCountyId })
    .from(property)
    .leftJoin(syncStatusMap, eq(syncStatusMap.propertyId, property.id))
    .where(or(eq(property.parcelId, enteredValue), eq(property.saleId, enteredValue)))
    .limit(1);

  if (!prop) return { resolvedPropertyId: null, matchStatus: 'not_found' };
  // Results not uploaded yet (no winner recorded) — can't match yet.
  if (prop.num == null || prop.num === '') return { resolvedPropertyId: prop.id, matchStatus: 'not_found' };

  const numberMatches = String(prop.num) === String(bidderNumber);
  const countyMatches = prop.county == null || prop.county === omCountyId; // null county = can't check, don't block
  return { resolvedPropertyId: prop.id, matchStatus: numberMatches && countyMatches ? 'matched' : 'mismatch' };
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return new NextResponse('Unauthorized', { status: 401 });

  let body: Record<string, unknown>;
  try { body = await req.json(); } catch { return NextResponse.json(['Invalid JSON body.'], { status: 400 }); }

  const omCountyId = Number(body.omCountyId);
  const bidderNumber = typeof body.bidderNumber === 'string' ? body.bidderNumber.trim() : '';
  const receiptUrl = typeof body.receiptUrl === 'string' && body.receiptUrl.trim() ? body.receiptUrl.trim() : null;
  const rawProps = Array.isArray(body.properties) ? body.properties : [];
  // Accept an array, or a newline/comma separated string; strip spaces/dashes per client.
  const entered = rawProps
    .map((v) => String(v).replace(/[\s-]/g, '').trim())
    .filter((v) => v.length > 0);

  const errors: string[] = [];
  if (!omCountyId) errors.push('County is required.');
  if (!bidderNumber) errors.push('Bidder number is required.');
  if (entered.length === 0) errors.push('Enter at least one property (Sale ID or Map Number).');
  if (errors.length) return NextResponse.json(errors, { status: 400 });

  const claimId = uuidv4();
  const now = new Date();
  await db.insert(bidderClaim).values({
    id: claimId,
    bidderUserId: session.user.id,
    omCountyId,
    bidderNumber,
    status: 'pending',
    receiptUrl,
    createdAt: now,
  });

  const items = [];
  for (const value of entered) {
    const { resolvedPropertyId, matchStatus } = await matchOne(value, omCountyId, bidderNumber);
    const itemId = uuidv4();
    await db.insert(bidderClaimItem).values({
      id: itemId,
      claimId,
      enteredValue: value,
      resolvedPropertyId,
      matchStatus,
      createdAt: now,
    });
    items.push({ id: itemId, enteredValue: value, matchStatus });
  }

  return NextResponse.json({ success: true, claimId, items }, { status: 201 });
}

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return new NextResponse('Unauthorized', { status: 401 });

  const claims = await db
    .select()
    .from(bidderClaim)
    .where(eq(bidderClaim.bidderUserId, session.user.id))
    .orderBy(desc(bidderClaim.createdAt));

  const withItems = await Promise.all(
    claims.map(async (c) => {
      const its = await db.select().from(bidderClaimItem).where(eq(bidderClaimItem.claimId, c.id));
      return { ...c, items: its };
    }),
  );

  return NextResponse.json({ claims: withItems });
}
