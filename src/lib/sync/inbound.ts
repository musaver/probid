// Shared helpers for the inbound sync API (OwnMidwest -> BidBridge).
// Used by all /api/sync/* route handlers.

import crypto from 'node:crypto';
import { and, eq } from 'drizzle-orm';
import { db } from '@/lib/db';
import { property, syncInbox, syncLookup, syncStatusMap } from '@/lib/schema';

const SYNC_TOKEN = process.env.SYNC_INBOUND_TOKEN;

/** Verify the X-Sync-Token header. Returns an error string, or null if OK. */
export function checkAuth(req: Request): string | null {
  if (!SYNC_TOKEN) return 'Server missing SYNC_INBOUND_TOKEN config';
  const token = req.headers.get('x-sync-token');
  if (!token) return 'No Sync Token';
  if (token !== SYNC_TOKEN) return 'Invalid Sync Token';
  return null;
}

export function getEventId(req: Request): string | null {
  return req.headers.get('x-idempotency-key');
}

export function getEventTime(req: Request, bodyVal?: string): Date | null {
  const raw = req.headers.get('x-event-time') ?? bodyVal;
  if (!raw) return null;
  const d = new Date(raw);
  return isNaN(d.getTime()) ? null : d;
}

/** Has this event id already been processed? */
export async function alreadyProcessed(eventId: string): Promise<boolean> {
  const rows = await db
    .select({ id: syncInbox.id })
    .from(syncInbox)
    .where(eq(syncInbox.eventId, eventId))
    .limit(1);
  return rows.length > 0;
}

/** Find the BidBridge property for an OwnMidwest mapId (matched on parcelId). */
export async function resolveProperty(mapId: string) {
  const rows = await db
    .select()
    .from(property)
    .where(eq(property.parcelId, mapId))
    .limit(1);
  return rows[0] ?? null;
}

/** Translate an OwnMidwest taxSalesStatusId into a BidBridge status enum value (or null if unmapped). */
export async function mapTaxStatus(omId: number): Promise<string | null> {
  const rows = await db
    .select({ bbValue: syncLookup.bbValue })
    .from(syncLookup)
    .where(and(eq(syncLookup.kind, 'tax_status'), eq(syncLookup.omId, omId)))
    .limit(1);
  return rows[0]?.bbValue ?? null;
}

export function sha256(value: unknown): string {
  return crypto.createHash('sha256').update(JSON.stringify(value)).digest('hex');
}

type InboxStatus = 'processed' | 'duplicate' | 'unmatched' | 'failed';

/**
 * Record the result of an inbound event in sync_inbox.
 * The UNIQUE constraint on event_id is what makes this safe against duplicate
 * deliveries: a concurrent retry that loses the race throws ER_DUP_ENTRY,
 * which we report back as a duplicate.
 */
export async function recordInbox(args: {
  eventId: string;
  operation: string;
  mapId?: string | null;
  countyId?: number | null;
  status: InboxStatus;
  payload?: unknown;
  result?: string;
}): Promise<{ duplicate: boolean }> {
  try {
    await db.insert(syncInbox).values({
      id: crypto.randomUUID(),
      eventId: args.eventId,
      operation: args.operation,
      mapId: args.mapId ?? null,
      countyId: args.countyId ?? null,
      status: args.status,
      payload: args.payload ?? null,
      result: args.result ?? null,
      receivedAt: new Date(),
    });
    return { duplicate: false };
  } catch (err: unknown) {
    // Duplicate event id (unique constraint) => already processed by a racing request.
    if (err && typeof err === 'object' && 'code' in err && (err as { code?: string }).code === 'ER_DUP_ENTRY') {
      return { duplicate: true };
    }
    throw err;
  }
}

/**
 * Upsert the identity-map / echo-suppression row for a property.
 * omSaleId: OwnMidwest's saleID for this record (when known from the inbound payload).
 * It's stored so outbound UpdateTaxSale can send the matching, immutable saleID.
 */
export async function recordInboundHash(
  propertyId: string,
  omMapId: string,
  omCountyId: number,
  hash: string,
  omSaleId?: string | null,
) {
  const existing = await db
    .select({ propertyId: syncStatusMap.propertyId })
    .from(syncStatusMap)
    .where(eq(syncStatusMap.propertyId, propertyId))
    .limit(1);

  if (existing.length > 0) {
    await db
      .update(syncStatusMap)
      .set({
        lastInboundHash: hash,
        lastSyncedAt: new Date(),
        ...(omSaleId ? { omSaleId } : {}),
      })
      .where(eq(syncStatusMap.propertyId, propertyId));
  } else {
    await db.insert(syncStatusMap).values({
      propertyId,
      omMapId,
      omCountyId,
      omSaleId: omSaleId ?? null,
      omExists: 1,
      lastInboundHash: hash,
      lastSyncedAt: new Date(),
    });
  }
}
