import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { property, propertyDocuments } from "@/lib/schema";
import { eq, and } from "drizzle-orm";
import { v4 as uuidv4 } from "uuid";
import { uploadToSpaces, isSpacesConfigured } from "@/lib/spaces";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) return new NextResponse("Unauthorized", { status: 401 });

    if (!isSpacesConfigured()) {
      return new NextResponse("File storage (Spaces) is not configured", { status: 500 });
    }

    const formData = await req.formData();
    const propertyId = formData.get("propertyId");
    if (!propertyId || typeof propertyId !== "string") {
      return new NextResponse("propertyId is required", { status: 400 });
    }

    // Verify property exists and user has permission
    // County users can upload to any property, others must be the creator
    const isCounty = session.user.type === "county";
    const [p] = await db
      .select()
      .from(property)
      .where(
        isCounty
          ? eq(property.id, propertyId)
          : and(eq(property.id, propertyId), eq(property.createdBy, session.user.id))
      )
      .limit(1);

    if (!p) return new NextResponse("Property not found or access denied", { status: 404 });

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
      const uploaded = await uploadToSpaces(
        `properties/${propertyId}/${file.name}`,
        arrayBuffer,
        {
          addRandomSuffix: true,
          contentType: file.type || undefined,
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


