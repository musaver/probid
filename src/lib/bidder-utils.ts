import { db } from '@/lib/db';
import { user } from '@/lib/schema';
import { eq } from 'drizzle-orm';

export async function generateUniqueBidderNumber(): Promise<string> {
    for (let i = 0; i < 10; i++) {
        const candidate = `BID-${String(Math.floor(10000 + Math.random() * 90000))}`;
        const existing = await db
            .select({ id: user.id })
            .from(user)
            .where(eq(user.bidderNumber, candidate))
            .limit(1);
        if (existing.length === 0) return candidate;
    }
    return `BID-${Date.now().toString().slice(-6)}`;
}
