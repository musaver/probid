import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { bidderDocuments, user } from "@/lib/schema";
import { and, desc, eq } from "drizzle-orm";
import { v4 as uuidv4 } from "uuid";
import { put, del } from "@vercel/blob";

function getBlobToken() {
  return process.env.BLOB_READ_WRITE_TOKEN || process.env.VERCEL_BLOB_READ_WRITE_TOKEN;
}

async function assertCounty(sessionUserId: string) {
  const [acting] = await db.select({ type: user.type }).from(user).where(eq(user.id, sessionUserId)).limit(1);
  return acting?.type === "county";
}

export async function GET(req: Request, props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  try {
    const session = await getServerSession(authOptions);
    if (!session) return new NextResponse("Unauthorized", { status: 401 });
    if (!(await assertCounty(session.user.id))) return new NextResponse("Forbidden", { status: 403 });

    const docs = await db
      .select()
      .from(bidderDocuments)
      .where(eq(bidderDocuments.bidderId, params.id))
      .orderBy(desc(bidderDocuments.uploadedAt));

    return NextResponse.json(docs);
  } catch (e) {
    console.error("[BIDDER_DOCUMENTS_GET]", e);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function POST(req: Request, props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  try {
    const session = await getServerSession(authOptions);
    if (!session) return new NextResponse("Unauthorized", { status: 401 });
    if (!(await assertCounty(session.user.id))) return new NextResponse("Forbidden", { status: 403 });

    const token = getBlobToken();
    if (!token) {
      return new NextResponse("Missing BLOB_READ_WRITE_TOKEN (or VERCEL_BLOB_READ_WRITE_TOKEN)", { status: 500 });
    }

    const [b] = await db.select({ id: user.id, type: user.type }).from(user).where(eq(user.id, params.id)).limit(1);
    if (!b || b.type !== "bidder") return new NextResponse("Bidder not found", { status: 404 });

    const formData = await req.formData();
    const files = formData.getAll("files") as File[];
    if (!files || files.length === 0) {
      return new NextResponse("No files uploaded", { status: 400 });
    }

    const created: any[] = [];
    for (const file of files) {
      if (!file || typeof (file as any).arrayBuffer !== "function") continue;
      const arrayBuffer = await file.arrayBuffer();
      const uploaded = await put(`bidders/${params.id}/${file.name}`, arrayBuffer, {
        access: "public",
        addRandomSuffix: true,
        contentType: file.type || undefined,
        token,
      });

      const docId = uuidv4();
      await db.insert(bidderDocuments).values({
        id: docId,
        bidderId: params.id,
        name: file.name || null,
        url: uploaded.url,
        pathname: uploaded.pathname,
        type: file.type || null,
        size: file.size ? String(file.size) : null,
        uploadedAt: new Date(),
      } as any);

      created.push({
        id: docId,
        bidderId: params.id,
        name: file.name || null,
        url: uploaded.url,
        pathname: uploaded.pathname,
        type: file.type || null,
        size: file.size ? String(file.size) : null,
        uploadedAt: new Date().toISOString(),
      });
    }

    return NextResponse.json({ documents: created }, { status: 201 });
  } catch (e) {
    console.error("[BIDDER_DOCUMENTS_POST]", e);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function DELETE(req: Request, props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  try {
    const session = await getServerSession(authOptions);
    if (!session) return new NextResponse("Unauthorized", { status: 401 });
    if (!(await assertCounty(session.user.id))) return new NextResponse("Forbidden", { status: 403 });

    const token = getBlobToken();
    if (!token) {
      return new NextResponse("Missing BLOB_READ_WRITE_TOKEN (or VERCEL_BLOB_READ_WRITE_TOKEN)", { status: 500 });
    }

    const { searchParams } = new URL(req.url);
    const documentId = searchParams.get("documentId");
    if (!documentId) return new NextResponse("documentId is required", { status: 400 });

    const [doc] = await db
      .select()
      .from(bidderDocuments)
      .where(and(eq(bidderDocuments.id, documentId), eq(bidderDocuments.bidderId, params.id)))
      .limit(1);
    if (!doc) return new NextResponse("Document not found", { status: 404 });

    if ((doc as any).url) {
      await del((doc as any).url as string, { token });
    }

    await db
      .delete(bidderDocuments)
      .where(and(eq(bidderDocuments.id, documentId), eq(bidderDocuments.bidderId, params.id)));

    return NextResponse.json({ success: true });
  } catch (e) {
    console.error("[BIDDER_DOCUMENTS_DELETE]", e);
    return new NextResponse("Internal Error", { status: 500 });
  }
}


