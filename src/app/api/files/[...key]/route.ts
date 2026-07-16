// GET /api/files/<key...> — streams a private object from DigitalOcean Spaces.
// Files are stored private (this Space has object ACLs disabled), so they are served
// back through this proxy. Access requires a valid session AND a permission check:
//   bidders/<id>/...  and  claims/<id>/...  are private to that user (the owning bidder,
//   or a county user whose roster includes that bidder). Everything else (property
//   photos/documents, profile images) is readable by any authenticated user.

import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { eq } from "drizzle-orm";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { user } from "@/lib/schema";
import { getObjectFromSpaces } from "@/lib/spaces";

type SessionUser = { id: string; type?: "bidder" | "county" };

async function canAccess(objectKey: string, sessionUser: SessionUser): Promise<boolean> {
  const [prefix, ownerId] = objectKey.split("/");

  // Per-user private files: bidder identity documents and claim receipts.
  if (prefix === "bidders" || prefix === "claims") {
    if (!ownerId) return false;
    if (ownerId === sessionUser.id) return true; // the owner themself

    // A county user may view files of a bidder that belongs to their county.
    if (sessionUser.type === "county") {
      const [owner] = await db
        .select({ countyId: user.countyId })
        .from(user)
        .where(eq(user.id, ownerId))
        .limit(1);
      return !!owner && owner.countyId === sessionUser.id;
    }
    return false;
  }

  // Property files and anything else: any authenticated user.
  return true;
}

export async function GET(_req: Request, props: { params: Promise<{ key: string[] }> }) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return new NextResponse("Unauthorized", { status: 401 });

  const { key } = await props.params;
  const objectKey = (key || []).join("/");
  if (!objectKey) return new NextResponse("Not found", { status: 404 });

  const allowed = await canAccess(objectKey, session.user as SessionUser);
  if (!allowed) return new NextResponse("Forbidden", { status: 403 });

  const obj = await getObjectFromSpaces(objectKey);
  if (!obj) return new NextResponse("Not found", { status: 404 });

  // Private files must never be stored by shared/CDN caches. Non-sensitive files
  // (property photos etc.) may sit in the private browser cache briefly.
  const isPrivate = objectKey.startsWith("bidders/") || objectKey.startsWith("claims/");
  const cacheControl = isPrivate ? "private, no-store" : "private, max-age=3600";

  return new NextResponse(Buffer.from(obj.body), {
    status: 200,
    headers: {
      "Content-Type": obj.contentType || "application/octet-stream",
      "Cache-Control": cacheControl,
    },
  });
}
