import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { property, propertyDocuments } from "@/lib/schema";
import { eq, and } from "drizzle-orm";
import { v4 as uuidv4 } from "uuid";
import { put } from "@vercel/blob";

function getBlobToken() {
  return process.env.BLOB_READ_WRITE_TOKEN || process.env.VERCEL_BLOB_READ_WRITE_TOKEN;
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) return new NextResponse("Unauthorized", { status: 401 });

    const token = getBlobToken();
    if (!token) {
      return new NextResponse(
        "Missing BLOB_READ_WRITE_TOKEN (or VERCEL_BLOB_READ_WRITE_TOKEN)",
        { status: 500 }
      );
    }

    const formData = await req.formData();
    const propertyId = formData.get("propertyId");
    if (!propertyId || typeof propertyId !== "string") {
      return new NextResponse("propertyId is required", { status: 400 });
    }

    const [p] = await db
      .select()
      .from(property)
      .where(and(eq(property.id, propertyId), eq(property.createdBy, session.user.id)))
      .limit(1);

    if (!p) return new NextResponse("Property not found", { status: 404 });

    const files = formData.getAll("files") as File[];
    if (!files || files.length === 0) {
      return new NextResponse("No files uploaded", { status: 400 });
    }

    const created: Array<{
      id: string;
      propertyId: string;
      name: string | null;
      url: string;
      pathname: string;
      type: string | null;
      size: string | null;
      uploadedAt: string;
    }> = [];

    for (const file of files) {
      if (!file || typeof file.arrayBuffer !== "function") continue;

      const arrayBuffer = await file.arrayBuffer();
      const uploaded = await put(
        `properties/${propertyId}/${file.name}`,
        arrayBuffer,
        {
          access: "public",
          addRandomSuffix: true,
          contentType: file.type || undefined,
          token,
        }
      );

      const docId = uuidv4();
      await db.insert(propertyDocuments).values({
        id: docId,
        propertyId,
        name: file.name || null,
        url: uploaded.url,
        pathname: uploaded.pathname,
        type: file.type || null,
        size: file.size ? String(file.size) : null,
        uploadedAt: new Date(),
      });

      created.push({
        id: docId,
        propertyId,
        name: file.name || null,
        url: uploaded.url,
        pathname: uploaded.pathname,
        type: file.type || null,
        size: file.size ? String(file.size) : null,
        uploadedAt: new Date().toISOString(),
      });
    }

    return NextResponse.json({ documents: created }, { status: 201 });
  } catch (error) {
    console.error("[BLOB_UPLOAD_POST]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}


