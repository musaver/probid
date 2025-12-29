import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { user } from "@/lib/schema";
import { like, eq, or } from "drizzle-orm";

export async function GET(req: Request) {
    try {
        const session = await getServerSession(authOptions);

        if (!session) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const { searchParams } = new URL(req.url);
        const query = searchParams.get("email") || searchParams.get("query");

        if (!query) {
            return new NextResponse("Query parameter is required", { status: 400 });
        }

        // Search for users by email or name
        const users = await db
            .select({
                id: user.id,
                name: user.name,
                email: user.email,
                image: user.image,
                type: user.type,
            })
            .from(user)
            .where(
                or(
                    like(user.email, `%${query}%`),
                    like(user.name, `%${query}%`)
                )
            )
            .limit(10);

        // Filter out current user and return all users (not just bidders)
        const filteredUsers = users.filter((u) => u.id !== session.user.id);

        return NextResponse.json(filteredUsers);
    } catch (error) {
        console.error("[USERS_SEARCH]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
