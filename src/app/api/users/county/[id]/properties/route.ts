import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { property, user } from "@/lib/schema";
import { eq } from "drizzle-orm";

export async function GET(req: Request, props: { params: Promise<{ id: string }> }) {
    const params = await props.params;
    try {
        const session = await getServerSession(authOptions);
        if (!session) return new NextResponse("Unauthorized", { status: 401 });

        // Verify the target user exists and is a county user
        const [target] = await db
            .select({ id: user.id, type: user.type })
            .from(user)
            .where(eq(user.id, params.id))
            .limit(1);

        if (!target) return new NextResponse("User not found", { status: 404 });
        if (target.type !== "county") return new NextResponse("Not a county user", { status: 400 });

        const rows = await db
            .select({
                id: property.id,
                title: property.title,
                address: property.address,
                parcelId: property.parcelId,
                city: property.city,
                status: property.status,
            })
            .from(property)
            .where(eq(property.createdBy, params.id));

        return NextResponse.json(rows);
    } catch (e) {
        console.error("[COUNTY_PROPERTIES_GET]", e);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
