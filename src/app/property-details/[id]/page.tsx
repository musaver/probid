import React from "react";
import Header from "@/components/header/Header";
import PropertyDetailsContent from "@/components/property/PropertyDetailsContent";

export default async function PropertyDetailsPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    return (
        <>
            <Header />
            <PropertyDetailsContent id={id} />
        </>
    );
}
