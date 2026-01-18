"use client";

import { useEffect, Suspense } from "react";
import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";

function InviteLoginContent() {
    const searchParams = useSearchParams();
    const email = searchParams.get("email");

    useEffect(() => {
        if (email) {
            // Automatically sign in the user with credentials
            signIn("credentials", {
                email,
                callbackUrl: "/dashboard",
            });
        }
    }, [email]);

    return (
        <div style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "100vh",
            flexDirection: "column",
            gap: "1rem"
        }}>
            <div style={{ fontSize: "1.5rem", fontWeight: "600" }}>
                Logging you in...
            </div>
            <div style={{ fontSize: "1rem", color: "#666" }}>
                Please wait while we authenticate your account.
            </div>
        </div>
    );
}

export default function InviteLoginPage() {
    return (
        <Suspense fallback={
            <div style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                minHeight: "100vh"
            }}>
                Loading...
            </div>
        }>
            <InviteLoginContent />
        </Suspense>
    );
}
