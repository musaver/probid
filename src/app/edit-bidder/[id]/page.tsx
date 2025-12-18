"use client";

import React, { useEffect } from "react";
import Header from "@/components/header/Header";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import EditBidderContent from "@/components/bidder/EditBidderContent";

export default function EditBidderPage({ params }: { params: Promise<{ id: string }> }) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const { id } = React.use(params);

  useEffect(() => {
    if (status === "unauthenticated") router.push("/register");
  }, [status, router]);

  if (status === "loading") {
    return (
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh" }}>
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (!session) return null;

  const isCounty = session?.user?.type === "county";
  if (!isCounty) {
    return (
      <>
        <Header />
        <div className="dashboard-content" style={{ background: "#fff" }}>
          <div className="container" style={{ padding: "24px 0" }}>
            <div style={{ padding: "16px", border: "1px solid rgba(17,24,39,0.12)", borderRadius: "12px" }}>
              Only county users can edit bidders.
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Header />
      <EditBidderContent bidderId={id} />
    </>
  );
}


