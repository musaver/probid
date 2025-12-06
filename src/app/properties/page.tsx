"use client";
import React, { useEffect } from "react";
import Header from "@/components/header/Header";
import PropertiesContent from "@/components/property/PropertiesContent";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function PropertiesPage() {
    const { data: session, status } = useSession();
    const router = useRouter();

    useEffect(() => {
        if (status === "unauthenticated") {
            router.push("/register");
        }
    }, [status, router]);

    if (status === "loading") {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        );
    }

    if (!session) {
        return null;
    }

    return (
        <>
            <Header />
            <PropertiesContent />
        </>
    );
}
