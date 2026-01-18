import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { invite_tokens, user } from "@/lib/schema";
import { eq } from "drizzle-orm";
import { signIn } from "next-auth/react";

export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const token = searchParams.get("token");

        if (!token) {
            return NextResponse.redirect(new URL("/register?error=invalid_token", req.url));
        }

        // Look up the invite token
        const [inviteToken] = await db
            .select()
            .from(invite_tokens)
            .where(eq(invite_tokens.token, token))
            .limit(1);

        if (!inviteToken) {
            return NextResponse.redirect(new URL("/register?error=invalid_token", req.url));
        }

        // Check if token has expired
        if (new Date() > new Date(inviteToken.expires)) {
            // Clean up expired token
            await db.delete(invite_tokens).where(eq(invite_tokens.token, token));
            return NextResponse.redirect(new URL("/register?error=expired_token", req.url));
        }

        // Verify the user exists
        const [existingUser] = await db
            .select()
            .from(user)
            .where(eq(user.id, inviteToken.userId))
            .limit(1);

        if (!existingUser) {
            return NextResponse.redirect(new URL("/register?error=user_not_found", req.url));
        }

        // Delete the used token
        await db.delete(invite_tokens).where(eq(invite_tokens.token, token));

        // Create a callback URL that will trigger the sign-in
        const callbackUrl = `/api/auth/callback/credentials?email=${encodeURIComponent(existingUser.email)}`;

        // Redirect to a page that will handle the auto-login
        return NextResponse.redirect(
            new URL(`/auth/invite-login?email=${encodeURIComponent(existingUser.email)}`, req.url)
        );
    } catch (error) {
        console.error("[INVITE_LINK_ERROR]", error);
        return NextResponse.redirect(new URL("/register?error=server_error", req.url));
    }
}
