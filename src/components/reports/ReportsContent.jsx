"use client";
import React, { useCallback, useMemo, useState, useEffect } from "react";
import DashboardNav from "@/components/dashboard/DashboardNav";
import Footer from "@/components/footer/Footer";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const ReportsContent = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") router.push("/register");
  }, [status, router]);

  const isCounty = session?.user?.type === "county";

  const reportsData = useMemo(
    () => [
      {
        id: "property",
        title: "Property Report",
        description: "Export all property data with filters",
        buttonText: "Download CSV",
        format: "csv",
      },
      {
        id: "bidder",
        title: "Bidder Report",
        description: "Export bidder information and activity",
        buttonText: "Download Excel",
        format: "xlsx",
      },
      {
        id: "auction",
        title: "Auction Report",
        description: "Export auction results and bids",
        buttonText: "Download PDF",
        format: "pdf",
      },
    ],
    []
  );

  const [downloadingById, setDownloadingById] = useState({});

  const handleDownload = useCallback(async (reportId, format) => {
    try {
      setDownloadingById((prev) => ({ ...prev, [reportId]: true }));

      const res = await fetch(
        `/api/reports/export?report=${encodeURIComponent(reportId)}&format=${encodeURIComponent(format)}`
      );
      if (!res.ok) {
        const text = await res.text().catch(() => "");
        alert(text || "Failed to download report");
        return;
      }

      const blob = await res.blob();
      const contentDisposition = res.headers.get("content-disposition") || "";
      const match = contentDisposition.match(/filename=\"?([^\";]+)\"?/i);
      const filename =
        (match && match[1]) ||
        `${reportId}-report.${format === "xlsx" ? "xlsx" : format}`;

      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (e) {
      console.error("Download failed:", e);
      alert(e instanceof Error ? e.message : "Failed to download report");
    } finally {
      setDownloadingById((prev) => ({ ...prev, [reportId]: false }));
    }
  }, []);

  return (
    <div className="dashboard-wrapper">
      <DashboardNav activeTab="reports" />

      {/* Reports Content */}
      <div className="dashboard-content" style={{ background: "#FFFFFF" }}>
      <div className="reports-section">
        <div className="container">
          {status === "loading" ? (
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "240px" }}>
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          ) : !session ? null : !isCounty ? (
            <div style={{ padding: "24px 0" }}>
              <div style={{ padding: "16px", border: "1px solid rgba(17,24,39,0.12)", borderRadius: "12px" }}>
                Only county users can export reports.
              </div>
            </div>
          ) : (
          <div className="reports-grid">
            {reportsData.map((report) => (
              <div key={report.id} className="report-card">
                <div className="report-icon">
                  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M24.9993 3.33594H9.99935C9.11529 3.33594 8.26745 3.68713 7.64233 4.31225C7.0172 4.93737 6.66602 5.78522 6.66602 6.66927V33.3359C6.66602 34.22 7.0172 35.0678 7.64233 35.693C8.26745 36.3181 9.11529 36.6693 9.99935 36.6693H29.9993C30.8834 36.6693 31.7312 36.3181 32.3564 35.693C32.9815 35.0678 33.3327 34.22 33.3327 33.3359V11.6693L24.9993 3.33594Z" stroke="#6EA500" strokeWidth="3.33333" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M23.334 3.33594V10.0026C23.334 10.8867 23.6852 11.7345 24.3103 12.3596C24.9354 12.9847 25.7833 13.3359 26.6673 13.3359H33.334" stroke="#6EA500" strokeWidth="3.33333" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M16.6673 15H13.334" stroke="#6EA500" strokeWidth="3.33333" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M26.6673 21.6641H13.334" stroke="#6EA500" strokeWidth="3.33333" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M26.6673 28.3359H13.334" stroke="#6EA500" strokeWidth="3.33333" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <h3 className="report-title">{report.title}</h3>
                <p className="report-description">{report.description}</p>
                <button
                  className="report-download-btn"
                  onClick={() => handleDownload(report.id, report.format)}
                  disabled={!!downloadingById[report.id]}
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M14 10V12.6667C14 13.0203 13.8595 13.3594 13.6095 13.6095C13.3594 13.8595 13.0203 14 12.6667 14H3.33333C2.97971 14 2.64057 13.8595 2.39052 13.6095C2.14048 13.3594 2 13.0203 2 12.6667V10M4.66667 6.66667L8 10M8 10L11.3333 6.66667M8 10V2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span>{downloadingById[report.id] ? "Downloading..." : report.buttonText}</span>
                </button>
              </div>
            ))}
          </div>
          )}
        </div>
      </div>
      </div>

      <Footer />
    </div>
  );
};

export default ReportsContent;
