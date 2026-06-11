// Change requests (bidder/county → admin review).
//   POST  /api/change-requests   create a request for one field
//   GET   /api/change-requests   list the current user's own requests
//
// Bidders and county users never edit the 10 data fields directly — they submit a
// request here that lands in the Admin Review Center for approval.

import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { desc, eq } from 'drizzle-orm';
import { v4 as uuidv4 } from 'uuid';
import { authOptions } from '@/lib/auth';
import { db } from '@/lib/db';
import { property, propertyChangeRequests } from '@/lib/schema';

// The reviewable fields → human label. Keys are property columns so we can snapshot old value.
const EDITABLE_FIELDS: Record<string, string> = {
  parcelId: 'Map Number',
  saleId: 'Sale ID',
  minBid: 'Minimum Bid',
  winningBid: 'Maximum Bid',
  status: 'Tax Sale Status',
  address: 'Property Address',
  owners: 'Owner Name',
  auctionEnd: 'Tax Sale Date',
};

function snapshot(value: unknown): string {
  if (value == null) return '';
  if (value instanceof Date) return value.toISOString();
  if (typeof value === 'object') return JSON.stringify(value);
  return String(value);
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return new NextResponse('Unauthorized', { status: 401 });

  const role = session.user.type;
  if (role !== 'bidder' && role !== 'county') {
    return new NextResponse('Only bidders or county users can submit change requests', { status: 403 });
  }

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json(['Invalid JSON body.'], { status: 400 });
  }

  const propertyId = typeof body.propertyId === 'string' ? body.propertyId : '';
  const fieldName = typeof body.fieldName === 'string' ? body.fieldName : '';
  const newValueRaw = body.newValue;
  const reason = typeof body.reason === 'string' ? body.reason : null;

  const errors: string[] = [];
  if (!propertyId) errors.push('propertyId is required.');
  if (!fieldName || !(fieldName in EDITABLE_FIELDS)) errors.push('fieldName is missing or not editable.');
  if (newValueRaw == null || String(newValueRaw).trim() === '') errors.push('newValue is required.');
  if (errors.length) return NextResponse.json(errors, { status: 400 });

  const [prop] = await db.select().from(property).where(eq(property.id, propertyId)).limit(1);
  if (!prop) return new NextResponse('Property not found', { status: 404 });

  const oldValue = snapshot((prop as Record<string, unknown>)[fieldName]);
  const newValue = snapshot(newValueRaw);

  // Ignore no-op requests (new value identical to current).
  if (oldValue === newValue) {
    return NextResponse.json({ error: 'New value is the same as the current value.' }, { status: 400 });
  }

  const row = {
    id: uuidv4(),
    propertyId,
    requestedByUserId: session.user.id,
    requestedByRole: role,
    fieldName,
    oldValue,
    newValue,
    reason,
    status: 'pending' as const,
    createdAt: new Date(),
  };
  await db.insert(propertyChangeRequests).values(row);

  return NextResponse.json({ success: true, request: { ...row, label: EDITABLE_FIELDS[fieldName] } }, { status: 201 });
}

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return new NextResponse('Unauthorized', { status: 401 });

  const rows = await db
    .select()
    .from(propertyChangeRequests)
    .where(eq(propertyChangeRequests.requestedByUserId, session.user.id))
    .orderBy(desc(propertyChangeRequests.createdAt));

  const withLabels = rows.map((r) => ({ ...r, label: EDITABLE_FIELDS[r.fieldName] ?? r.fieldName }));
  return NextResponse.json({ requests: withLabels });
}
