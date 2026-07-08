// POST /api/bidder-claims/upload — bidder uploads an optional bid receipt (PDF or image)
// as proof for a claim. Stores it in DigitalOcean Spaces and returns the public URL, which
// the client then includes as `receiptUrl` when submitting the claim.

import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { uploadToSpaces, isSpacesConfigured } from '@/lib/spaces';
import { authOptions } from '@/lib/auth';

const ALLOWED = ['application/pdf', 'image/png', 'image/jpeg', 'image/jpg', 'image/webp', 'image/heic'];
const MAX_BYTES = 10 * 1024 * 1024; // 10 MB

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return new NextResponse('Unauthorized', { status: 401 });

  if (!isSpacesConfigured()) {
    return NextResponse.json({ error: 'File storage is not configured.' }, { status: 500 });
  }

  let formData: FormData;
  try { formData = await req.formData(); } catch { return NextResponse.json({ error: 'Invalid upload.' }, { status: 400 }); }

  const file = formData.get('file');
  if (!file || typeof (file as File).arrayBuffer !== 'function') {
    return NextResponse.json({ error: 'No file provided.' }, { status: 400 });
  }
  const f = file as File;

  if (f.type && !ALLOWED.includes(f.type)) {
    return NextResponse.json({ error: 'Please upload a PDF or an image (PNG/JPG).' }, { status: 400 });
  }
  if (f.size > MAX_BYTES) {
    return NextResponse.json({ error: 'File is too large (max 10 MB).' }, { status: 400 });
  }

  try {
    const arrayBuffer = await f.arrayBuffer();
    const safeName = (f.name || 'receipt').replace(/[^a-zA-Z0-9._-]/g, '_');
    const uploaded = await uploadToSpaces(`claims/${session.user.id}/${safeName}`, arrayBuffer, {
      addRandomSuffix: true,
      contentType: f.type || undefined,
    });
    return NextResponse.json({ url: uploaded.url });
  } catch (e) {
    console.error('[bidder-claim receipt upload]', e);
    return NextResponse.json({ error: 'Upload failed. Please try again.' }, { status: 500 });
  }
}
