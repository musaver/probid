// Minimal in-memory rate limiter (fixed window).
//
// State lives in this process only. For a single long-running Node server this is an
// effective brake on abuse; in a multi-instance / serverless deployment, move this to a
// shared store (e.g. Redis / Upstash) so limits are enforced across instances.

type Bucket = { count: number; resetAt: number };

const buckets = new Map<string, Bucket>();

/**
 * Records a hit for `key` and reports whether it is within `limit` per `windowMs`.
 * Returns { ok, retryAfter } where retryAfter is seconds until the window resets.
 */
export function rateLimit(
  key: string,
  limit: number,
  windowMs: number
): { ok: boolean; retryAfter: number } {
  const now = Date.now();
  const bucket = buckets.get(key);

  if (!bucket || now >= bucket.resetAt) {
    // Occasionally prune expired buckets so the map can't grow unbounded.
    if (buckets.size > 5000) {
      for (const [k, b] of buckets) if (now >= b.resetAt) buckets.delete(k);
    }
    buckets.set(key, { count: 1, resetAt: now + windowMs });
    return { ok: true, retryAfter: 0 };
  }

  if (bucket.count >= limit) {
    return { ok: false, retryAfter: Math.ceil((bucket.resetAt - now) / 1000) };
  }

  bucket.count += 1;
  return { ok: true, retryAfter: 0 };
}
