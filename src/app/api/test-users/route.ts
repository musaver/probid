import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { user } from "@/lib/schema";

export async function GET(req: Request) {
    try {
        // Get all users from database
        const users = await db.select().from(user);

        return NextResponse.json({
            success: true,
            count: users.length,
            users: users.map(u => ({
                id: u.id,
                email: u.email,
                name: u.name,
                type: u.type
            }))
        });
    } catch (error) {
        console.error("[TEST_USERS]", error);
        return NextResponse.json({
            success: false,
            error: error instanceof Error ? error.message : "Unknown error"
        }, { status: 500 });
    }
}
