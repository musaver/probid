import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { user } from "@/lib/schema";
import { eq } from "drizzle-orm";

export async function GET(req: Request, props: { params: Promise<{ id: string }> }) {
    const params = await props.params;
    try {
        const session = await getServerSession(authOptions);
        if (!session) return new NextResponse("Unauthorized", { status: 401 });

        const [u] = await db
            .select({
                id: user.id,
                name: user.name,
                email: user.email,
                phone: user.phone,
                address: user.address,
                city: user.city,
                state: user.state,
                aboutMe: user.aboutMe,
                bidderNumber: user.bidderNumber,
                image: user.image,
                type: user.type,
                createdAt: user.createdAt,
            })
            .from(user)
            .where(eq(user.id, params.id))
            .limit(1);

        if (!u) return new NextResponse("User not found", { status: 404 });
        return NextResponse.json(u);
    } catch (e) {
        console.error("[USER_GET]", e);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
