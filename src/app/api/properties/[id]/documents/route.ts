import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { property, propertyDocuments } from "@/lib/schema";
import { and, desc, eq } from "drizzle-orm";
import { deleteFromSpaces } from "@/lib/spaces";

export async function GET(
  req: Request,
  props: { params: Promise<{ id: string }> }
) {
  const params = await props.params;
  try {
    const session = await getServerSession(authOptions);
    if (!session) return new NextResponse("Unauthorized", { status: 401 });

    const docs = await db
      .select()
      .from(propertyDocuments)
      .where(eq(propertyDocuments.propertyId, params.id))
      .orderBy(desc(propertyDocuments.uploadedAt));

    return NextResponse.json(docs);
  } catch (error) {
    console.error("[PROPERTY_DOCUMENTS_GET]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  props: { params: Promise<{ id: string }> }
) {
  const params = await props.params;
  try {
    const session = await getServerSession(authOptions);
    if (!session) return new NextResponse("Unauthorized", { status: 401 });

    const { searchParams } = new URL(req.url);
    const documentId = searchParams.get("documentId");
    if (!documentId) {
      return new NextResponse("documentId is required", { status: 400 });
    }

    // Only allow the property creator to delete documents
    const [p] = await db
      .select()
      .from(property)
      .where(and(eq(property.id, params.id), eq(property.createdBy, session.user.id)))
      .limit(1);

    if (!p) return new NextResponse("Property not found", { status: 404 });

    const [doc] = await db
      .select()
      .from(propertyDocuments)
      .where(
        and(
          eq(propertyDocuments.id, documentId),
          eq(propertyDocuments.propertyId, params.id)
        )
      )
      .limit(1);

    if (!doc) return new NextResponse("Document not found", { status: 404 });

    // Delete from Spaces first (best-effort), then DB record
    const ref = (doc as any).pathname || (doc as any).url;
    if (ref) {
      await deleteFromSpaces(ref as string);
    }

    await db
      .delete(propertyDocuments)
      .where(
        and(
          eq(propertyDocuments.id, documentId),
          eq(propertyDocuments.propertyId, params.id)
        )
      );

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[PROPERTY_DOCUMENTS_DELETE]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}


