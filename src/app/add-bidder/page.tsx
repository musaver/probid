"use client";

import React, { useEffect } from "react";
import Header from "@/components/header/Header";
import AddBidderContent from "@/components/bidder/AddBidderContent";
import DashboardNav from "@/components/dashboard/DashboardNav";
import Footer from "@/components/footer/Footer";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function AddBidderPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

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
        <div className="dashboard-wrapper">
          <DashboardNav activeTab="bidders" />
          <div className="dashboard-content" style={{ background: "#fff" }}>
            <div className="container" style={{ padding: "24px 0" }}>
              <div style={{ padding: "16px", border: "1px solid rgba(17,24,39,0.12)", borderRadius: "12px" }}>
                Only county users can add bidders.
              </div>
            </div>
          </div>
          <Footer />
        </div>
      </>
    );
  }

  return (
    <>
      <Header />
      <AddBidderContent />
    </>
  );
}


