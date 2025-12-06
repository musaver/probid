import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { property } from "@/lib/schema";
import { eq } from "drizzle-orm";

export async function GET(
    req: Request,
    props: { params: Promise<{ id: string }> }
) {
    const params = await props.params;
    try {
        const session = await getServerSession(authOptions);

        if (!session) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const propertyData = await db
            .select()
            .from(property)
            .where(eq(property.id, params.id))
            .limit(1);

        if (!propertyData || propertyData.length === 0) {
            return new NextResponse("Property not found", { status: 404 });
        }

        return NextResponse.json(propertyData[0]);
    } catch (error) {
        console.error("[PROPERTY_GET]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
