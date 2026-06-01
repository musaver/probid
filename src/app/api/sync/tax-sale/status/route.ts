// POST /api/sync/tax-sale/status
// Inbound from OwnMidwest: update ONLY the tax sale status by mapId.
// Mirror of OwnMidwest's UpdateTaxSaleStatus.

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

const OPERATION = 'tax_sale.status';

export async function POST(req: Request) {
  const authErr = checkAuth(req);
  if (authErr) return NextResponse.json(authErr, { status: 401 });

  const eventId = getEventId(req);
  if (!eventId) return NextResponse.json(['X-Idempotency-Key header is required.'], { status: 400 });

  if (await alreadyProcessed(eventId)) {
    return NextResponse.json({ success: true, applied: false, status: 'duplicate', eventId });
  }

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
  if (body.taxSalesStatusId == null) errors.push('taxSalesStatusId is required.');
  if (errors.length) return NextResponse.json(errors, { status: 400 });

  try {
    const prop = await resolveProperty(mapId);
    if (!prop) {
      await recordInbox({ eventId, operation: OPERATION, mapId, countyId, status: 'unmatched', payload: body });
      return NextResponse.json({ success: false, status: 'unmatched', reason: `No property found for mapId=${mapId}` });
    }

    const eventTime = getEventTime(req, body.sourceUpdatedAt as string | undefined);
    if (eventTime && prop.updatedAt && eventTime < prop.updatedAt) {
      await recordInbox({ eventId, operation: OPERATION, mapId, countyId, status: 'processed', payload: body, result: 'skipped: stale' });
      return NextResponse.json({ success: true, applied: false, status: 'stale', eventId });
    }

    const mapped = await mapTaxStatus(Number(body.taxSalesStatusId));
    if (!mapped) {
      await recordInbox({
        eventId, operation: OPERATION, mapId, countyId, status: 'processed',
        payload: body, result: `status ${body.taxSalesStatusId} not mapped in sync_lookup`,
      });
      return NextResponse.json({ success: false, status: 'unmapped_status', reason: `taxSalesStatusId ${body.taxSalesStatusId} not mapped` });
    }

    const updates = { status: mapped as typeof property.$inferInsert.status, updatedAt: new Date() };
    await db.update(property).set(updates).where(eq(property.id, prop.id));

    await recordInboundHash(prop.id, mapId, countyId, sha256(updates));
    const { duplicate } = await recordInbox({ eventId, operation: OPERATION, mapId, countyId, status: 'processed', payload: body, result: 'applied' });
    if (duplicate) return NextResponse.json({ success: true, applied: false, status: 'duplicate', eventId });

    return NextResponse.json({ success: true, applied: true, eventId });
  } catch (err) {
    console.error('[sync/tax-sale/status] error', err);
    try { await recordInbox({ eventId, operation: OPERATION, mapId, countyId, status: 'failed', payload: body, result: String(err) }); } catch {}
    return NextResponse.json('Internal Server Error', { status: 500 });
  }
}
