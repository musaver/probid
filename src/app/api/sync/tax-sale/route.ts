// POST /api/sync/tax-sale
// Inbound from OwnMidwest: create/update a tax sale by mapId.
// Mirror of OwnMidwest's AddTaxSale + UpdateTaxSale (combined upsert).

import { NextResponse } from 'next/server';
import { eq } from 'drizzle-orm';
import { db } from '@/lib/db';
import { property } from '@/lib/schema';
import {
  checkAuth,
  getEventId,
  getEventTime,
  alreadyProcessed,
  resolveProperty,
  mapTaxStatus,
  recordInbox,
  recordInboundHash,
  sha256,
} from '@/lib/sync/inbound';

const OPERATION = 'tax_sale';

export async function POST(req: Request) {
  // 1. Auth
  const authErr = checkAuth(req);
  if (authErr) return NextResponse.json(authErr, { status: 401 });

  // 2. Idempotency key required
  const eventId = getEventId(req);
  if (!eventId) {
    return NextResponse.json(['X-Idempotency-Key header is required.'], { status: 400 });
  }

  // 3. Parse + validate body
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json(['Invalid JSON body.'], { status: 400 });
  }

  const errors: string[] = [];
  const mapId = typeof body.mapId === 'string' ? body.mapId : '';
  const countyId = typeof body.countyId === 'number' ? body.countyId : Number(body.countyId);
  if (!mapId) errors.push('mapId is required.');
  if (!countyId && countyId !== 0) errors.push('countyId is required.');
  if (errors.length) return NextResponse.json(errors, { status: 400 });

  // Everything that touches the DB lives inside this try, so a transient DB
  // error returns a clean 500 (and is logged) instead of crashing the route.
  try {
    // 4. Duplicate check
    if (await alreadyProcessed(eventId)) {
      return NextResponse.json({ success: true, applied: false, status: 'duplicate', eventId });
    }

    // 5. Match property
    const prop = await resolveProperty(mapId);
    if (!prop) {
      await recordInbox({ eventId, operation: OPERATION, mapId, countyId, status: 'unmatched', payload: body });
      return NextResponse.json({ success: false, status: 'unmatched', reason: `No property found for mapId=${mapId}` });
    }

    // 6. Conflict check (most-recent-wins)
    const eventTime = getEventTime(req, body.sourceUpdatedAt as string | undefined);
    if (eventTime && prop.updatedAt && eventTime < prop.updatedAt) {
      await recordInbox({
        eventId, operation: OPERATION, mapId, countyId, status: 'processed',
        payload: body, result: 'skipped: incoming change older than current record',
      });
      return NextResponse.json({ success: true, applied: false, status: 'stale', eventId });
    }

    // 7. Build the update from whatever fields are present
    const updates: Partial<typeof property.$inferInsert> = { updatedAt: new Date() };

    if (body.minimumBid != null) updates.minBid = String(body.minimumBid);
    if (body.maximumBid != null) updates.winningBid = String(body.maximumBid);
    // OwnMidwest's bidderInfo is the winning bidder's county-issued number — store it so
    // we can verify bidder claims ("I'm #34 in Greenville and won this property").
    if (body.bidderInfo != null && String(body.bidderInfo).trim() !== '') {
      updates.winningBidderNumber = String(body.bidderInfo).trim();
    }
    if (typeof body.notes === 'string') updates.description = body.notes;
    if (typeof body.saleId === 'string' && body.saleId) updates.saleId = body.saleId;
    if (body.taxSaleDate) {
      const d = new Date(body.taxSaleDate as string);
      if (!isNaN(d.getTime())) updates.auctionEnd = d;
    }

    // status: translate via sync_lookup; skip (and note) if unmapped
    let statusNote = '';
    if (body.taxSalesStatusId != null) {
      const mapped = await mapTaxStatus(Number(body.taxSalesStatusId));
      if (mapped) {
        updates.status = mapped as typeof property.$inferInsert.status;
      } else {
        statusNote = `status ${body.taxSalesStatusId} not mapped in sync_lookup; left unchanged`;
      }
    }

    // 8. Apply
    await db.update(property).set(updates).where(eq(property.id, prop.id));

    // 9. Record echo-suppression hash + the inbox event
    const hash = sha256(updates);
    const omSaleId = typeof body.saleId === 'string' && body.saleId ? body.saleId : null;
    await recordInboundHash(prop.id, mapId, countyId, hash, omSaleId);
    const { duplicate } = await recordInbox({
      eventId, operation: OPERATION, mapId, countyId, status: 'processed',
      payload: body, result: statusNote || 'applied',
    });
    if (duplicate) {
      return NextResponse.json({ success: true, applied: false, status: 'duplicate', eventId });
    }

    return NextResponse.json({ success: true, applied: true, eventId, note: statusNote || undefined });
  } catch (err) {
    console.error('[sync/tax-sale] error', err);
    return NextResponse.json('Internal Server Error', { status: 500 });
  }
}
