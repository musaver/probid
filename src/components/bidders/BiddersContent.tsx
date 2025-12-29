"use client";

import React, { useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import DashboardNav from "@/components/dashboard/DashboardNav";
import Footer from "@/components/footer/Footer";

type BidderRow = {
  id: string;
  name: string | null;
  email: string;
  phone?: string | null;
  image?: string | null;
  linkedPropertyCount?: number;
};

type LinkedPropertyRow = {
  id: string;
  address?: string | null;
  parcelId?: string | null;
  city?: string | null;
  zipCode?: string | null;
  status?: string | null;
  auctionEnd?: string | null;
};

export default function BiddersContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [rows, setRows] = useState<BidderRow[]>([]);
  const [search, setSearch] = useState(searchParams.get("q") || "");

  const [showPropsModal, setShowPropsModal] = useState(false);
  const [propsBidder, setPropsBidder] = useState<BidderRow | null>(null);
  const [propsLoading, setPropsLoading] = useState(false);
  const [propsRows, setPropsRows] = useState<LinkedPropertyRow[]>([]);
  const [propsError, setPropsError] = useState<string | null>(null);

  const q = useMemo(() => search.trim(), [search]);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `/api/users/bidders?includeCounts=1&linkedToMyProperties=1${q ? `&q=${encodeURIComponent(q)}` : ""}`
        );
        if (!res.ok) {
          console.error("Failed to fetch bidders:", await res.text().catch(() => ""));
          setRows([]);
          return;
        }
        const data = await res.json();
        setRows(Array.isArray(data) ? data : []);
      } catch (e) {
        console.error("Failed to fetch bidders:", e);
        setRows([]);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [q]);

  const openLinkedProperties = async (bidder: BidderRow) => {
    setPropsBidder(bidder);
    setShowPropsModal(true);
    setPropsLoading(true);
    setPropsError(null);
    setPropsRows([]);
    try {
      const res = await fetch(`/api/users/bidders/${bidder.id}/linked-properties`);
      if (!res.ok) {
        const text = await res.text().catch(() => "");
        throw new Error(text || "Failed to load linked properties");
      }
      const data = await res.json();
      setPropsRows(Array.isArray(data) ? data : []);
    } catch (e) {
      setPropsError(e instanceof Error ? e.message : "Failed to load linked properties");
      setPropsRows([]);
    } finally {
      setPropsLoading(false);
    }
  };

  const filtered = rows;

  return (
    <div className="dashboard-wrapper">
      <DashboardNav activeTab="bidders" />

      <div className="dashboard-content" style={{ background: "#FFFFFF" }}>
        <div className="container">
          <div className="property-header">
            <div className="search-filter-area">
              <div className="search-input-wrapper">
                <i className="bi bi-search"></i>
                <input
                  type="text"
                  placeholder="Search bidders..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      const next = search.trim();
                      router.push(`/bidders${next ? `?q=${encodeURIComponent(next)}` : ""}`);
                    }
                  }}
                />
              </div>
            </div>

            <Link href="/add-bidder" className="add-property-btn">
              <i className="bi bi-plus-circle"></i> Add Bidder
            </Link>
          </div>

          <div
            className="properties-table-section"
            style={{
              background: "#ffffff",
              borderRadius: "12px",
              padding: "0",
              marginTop: "20px",
              overflow: "hidden",
            }}
          >
            <div className="table-responsive">
              <table className="properties-table">
                <thead>
                  <tr>
                    <th>Bidder ID</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Linked Properties</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr>
                      <td colSpan={6} style={{ padding: "16px", color: "#6B7280" }}>
                        Loading...
                      </td>
                    </tr>
                  ) : filtered.length === 0 ? (
                    <tr>
                      <td colSpan={6} style={{ padding: "16px", color: "#6B7280" }}>
                        No bidders found.
                      </td>
                    </tr>
                  ) : (
                    filtered.map((b) => (
                      <tr key={b.id}>
                        <td data-label="Bidder ID">{b.id}</td>
                        <td data-label="Name">{b.name || "—"}</td>
                        <td data-label="Email">{b.email}</td>
                        <td data-label="Phone">{b.phone || "—"}</td>
                        <td data-label="Linked Properties" className="linked-properties">
                          {typeof b.linkedPropertyCount === "number" ? (
                            <button
                              type="button"
                              onClick={() => openLinkedProperties(b)}
                              disabled={b.linkedPropertyCount === 0}
                              style={{
                                background: b.linkedPropertyCount === 0 ? "#F3F4F6" : "#fff",
                                border: "1px solid rgba(17,24,39,0.12)",
                                color: b.linkedPropertyCount === 0 ? "#9CA3AF" : "#111827",
                                fontWeight: 800,
                                cursor: b.linkedPropertyCount === 0 ? "not-allowed" : "pointer",
                                padding: "8px 12px",
                                borderRadius: "999px",
                              }}
                              title="View linked properties"
                            >
                              View properties ({b.linkedPropertyCount})
                            </button>
                          ) : (
                            <span style={{ color: "#6B7280" }}>—</span>
                          )}
                        </td>
                        <td data-label="Actions">
                          <div className="action-buttons">
                            <button
                              className="action-btn table-action"
                              type="button"
                              aria-label="Edit bidder"
                              style={{ background: "transparent", border: "none" }}
                              onClick={() => router.push(`/edit-bidder/${b.id}`)}
                              title="Edit Bidder"
                            >
                              <i className="bi bi-pencil" style={{ color: "#3B82F6" }}></i>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <Footer />

      {showPropsModal && (
        <div
          className="app-modal-overlay"
          onClick={() => setShowPropsModal(false)}
        >
          <div
            className="app-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="app-modal-header">
              <div style={{ minWidth: 0 }}>
                <h2 className="app-modal-title">Linked Properties</h2>
                <div className="app-modal-subtitle" style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                  {propsBidder?.name || propsBidder?.email || "Bidder"}
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowPropsModal(false)}
                className="app-modal-close"
                aria-label="Close"
              >
                ×
              </button>
            </div>

            <div style={{ marginTop: "14px" }}>
              {propsLoading ? (
                <div style={{ padding: "16px 0", color: "#6B7280" }}>Loading properties...</div>
              ) : propsError ? (
                <div style={{ padding: "16px 0", color: "#B91C1C", fontWeight: 700 }}>{propsError}</div>
              ) : propsRows.length === 0 ? (
                <div style={{ padding: "16px 0", color: "#6B7280" }}>No linked properties.</div>
              ) : (
                <div style={{ display: "grid", gap: "10px" }}>
                  {propsRows.map((p) => (
                    <div
                      key={p.id}
                      style={{
                        border: "1px solid rgba(17,24,39,0.12)",
                        borderRadius: "14px",
                        padding: "12px 14px",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        gap: "12px",
                      }}
                    >
                      <div style={{ minWidth: 0 }}>
                        <div style={{ fontWeight: 900, color: "#111827", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                          {p.address || "Property"}
                        </div>
                        <div style={{ color: "#6B7280", fontSize: "12px", marginTop: "4px" }}>
                          {(p.city || "-") + (p.parcelId ? ` • ${p.parcelId}` : "") + (p.status ? ` • ${p.status}` : "")}
                        </div>
                      </div>
                      <Link
                        href={`/property-details/${p.id}`}
                        onClick={() => setShowPropsModal(false)}
                        className="filter-btn"
                        style={{
                          padding: "10px 14px",
                          borderRadius: "999px",
                          textDecoration: "none",
                          background: "#6EA500",
                          color: "#fff",
                          fontWeight: 800,
                          border: "none",
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "8px",
                          flexShrink: 0,
                        }}
                      >
                        View <i className="bi bi-arrow-right"></i>
                      </Link>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}


