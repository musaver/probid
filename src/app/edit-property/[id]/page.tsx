"use client";
import React, { use, useEffect } from "react";
import Header from "@/components/header/Header";
import EditPropertyContent from "@/components/property/EditPropertyContent";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function EditPropertyPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { data: session, status } = useSession();
    const router = useRouter();
    const { id } = use(params);

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
            <EditPropertyContent propertyId={id} />
        </>
    );
}
