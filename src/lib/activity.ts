// Records a bidder/county activity event in user_activity_log.
// Retained on BidBridge only — never synced to OwnMidwest.

import { db } from "@/lib/db";
import { userActivityLog } from "@/lib/schema";
import { v4 as uuidv4 } from "uuid";

export type ActivityEvent =
  | "login"
  | "logout"
  | "bid_submitted"
  | "suggestion_submitted"
  | "profile_updated"
  | "property_viewed";

export async function logActivity(
  userId: string | null | undefined,
  eventType: ActivityEvent,
  metadata?: Record<string, unknown>,
): Promise<void> {
  if (!userId) return;
  try {
    await db.insert(userActivityLog).values({
      id: uuidv4(),
      userId,
      eventType,
      metadata: metadata ?? null,
      createdAt: new Date(),
    });
  } catch (err) {
    console.error(`[activity] failed to log ${eventType} for ${userId}`, err);
  }
}
