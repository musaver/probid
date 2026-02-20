import React from "react";
import Header from "@/components/header/Header";
import UserDetailsContent from "@/components/user/UserDetailsContent";

export default async function UserDetailsPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    return (
        <>
            <Header />
            <UserDetailsContent id={id} />
        </>
    );
}
