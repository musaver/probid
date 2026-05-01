"use client";

import React, { useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import DashboardNav from "@/components/dashboard/DashboardNav";
import Footer from "@/components/footer/Footer";
import { formatNumber, formatPhoneNumber } from "@/lib/format";

type BidderRow = {
  id: string;
  name: string | null;
  email: string;
  phone?: string | null;
  image?: string | null;
  linkedPropertyCount?: number;
  creatorName?: string | null;
  bidderNumber?: string | null;
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

  // Message Modal State
  const [showMsgModal, setShowMsgModal] = useState(false);
  const [msgBidder, setMsgBidder] = useState<BidderRow | null>(null);
  const [msgProperties, setMsgProperties] = useState<LinkedPropertyRow[]>([]);
  const [msgLoadingProps, setMsgLoadingProps] = useState(false);
  const [selectedPropertyId, setSelectedPropertyId] = useState("");
  const [msgSubject, setMsgSubject] = useState("");
  const [msgBody, setMsgBody] = useState("");
  const [sendingMsg, setSendingMsg] = useState(false);

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

  const openMessageModal = async (bidder: BidderRow) => {
    setMsgBidder(bidder);
    setShowMsgModal(true);
    setMsgLoadingProps(true);
    setMsgProperties([]);
    setSelectedPropertyId("");
    setMsgSubject("");
    setMsgBody("");

    try {
      const res = await fetch(`/api/users/bidders/${bidder.id}/linked-properties`);
      if (res.ok) {
        const data = await res.json();
        const props = Array.isArray(data) ? data : [];
        setMsgProperties(props);
        if (props.length === 1) {
          setSelectedPropertyId(props[0].id);
          setMsgSubject(`Alert for ${props[0].address || "Property"}`);
        }
      }
    } catch (e) {
      console.error("Error loading linked properties for msg:", e);
    } finally {
      setMsgLoadingProps(false);
    }
  };

  const sendMessage = async () => {
    if (!selectedPropertyId) return alert("Please select a property");
    if (!msgBody.trim()) return alert("Message is required");

    setSendingMsg(true);
    try {
      const res = await fetch(`/api/properties/${selectedPropertyId}/alerts`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          subject: msgSubject || "Message",
          message: msgBody,
          bidderIds: [msgBidder?.id]
        }),
      });
      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || "Failed to send message");
      }
      alert("Message sent!");
      setShowMsgModal(false);
    } catch (e) {
      console.error("Send message error:", e);
      alert("Failed to send message");
    } finally {
      setSendingMsg(false);
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
                    <th>Name</th>
                    <th>Email</th>
                    <th>Bidder #</th>
                    <th>Phone</th>
                    <th>Added By</th>
                    <th>Linked Properties</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr>
                      <td colSpan={7} style={{ padding: "16px", color: "#6B7280" }}>
                        Loading...
                      </td>
                    </tr>
                  ) : filtered.length === 0 ? (
                    <tr>
                      <td colSpan={7} style={{ padding: "16px", color: "#6B7280" }}>
                        No bidders found.
                      </td>
                    </tr>
                  ) : (
                    filtered.map((b) => (
                      <tr key={b.id}>
                        <td data-label="Name">{b.name || "—"}</td>
                        <td data-label="Email">{b.email}</td>
                        <td data-label="Bidder #">{b.bidderNumber || "—"}</td>
                        <td data-label="Phone">{formatPhoneNumber(b.phone) || "—"}</td>
                        <td data-label="Added By">{b.creatorName || "—"}</td>
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
                              View properties ({formatNumber(b.linkedPropertyCount)})
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
                              aria-label="View bidder"
                              style={{ background: "transparent", border: "none" }}
                              onClick={() => router.push(`/user-details/${b.id}`)}
                              title="View Bidder"
                            >
                              <i className="bi bi-eye" style={{ color: "#6EA500" }}></i>
                            </button>
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
                            {typeof b.linkedPropertyCount === "number" && b.linkedPropertyCount > 0 && (
                              <button
                                className="action-btn table-action"
                                type="button"
                                aria-label="Send Message"
                                style={{ background: "transparent", border: "none" }}
                                onClick={() => openMessageModal(b)}
                                title="Send Message"
                              >
                                <i className="bi bi-chat-left-text" style={{ color: "#6EA500" }}></i>
                              </button>
                            )}
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

      {showMsgModal && msgBidder && (
        <div
          className="app-modal-overlay"
          onClick={() => setShowMsgModal(false)}
        >
          <div
            className="app-modal"
            onClick={(e) => e.stopPropagation()}
            style={{ maxWidth: '600px' }}
          >
            <div className="app-modal-header">
              <div>
                <h2 className="app-modal-title">Send Message</h2>
                <p style={{ fontSize: "13px", color: "#6B7280", marginTop: "4px" }}>
                  To: <strong>{msgBidder.name || msgBidder.email}</strong>
                </p>
              </div>
              <button
                type="button"
                onClick={() => setShowMsgModal(false)}
                className="app-modal-close"
                aria-label="Close"
              >
                ×
              </button>
            </div>

            <div style={{ marginTop: "16px" }}>
              {msgLoadingProps ? (
                <div style={{ padding: "10px 0", color: "#6B7280" }}>Loading assigned properties...</div>
              ) : msgProperties.length === 0 ? (
                <div style={{ padding: "10px 0", color: "#B91C1C" }}>No linked properties found for this bidder. Cannot send message.</div>
              ) : (
                <>
                  <div style={{ marginBottom: "16px" }}>
                    <label style={{ display: "block", marginBottom: "6px", fontWeight: 700 }}>About Property</label>
                    {msgProperties.length === 1 ? (
                      <div style={{
                        padding: "12px",
                        border: "1px solid #E5E7EB",
                        borderRadius: "10px",
                        background: "#F9FAFB",
                        color: "#374151"
                      }}>
                        {msgProperties[0].address || "Property"} <span style={{ fontSize: "0.9em", color: "#6B7280" }}>({msgProperties[0].parcelId})</span>
                      </div>
                    ) : (
                      <select
                        value={selectedPropertyId}
                        onChange={(e) => {
                          const pid = e.target.value;
                          setSelectedPropertyId(pid);
                          const p = msgProperties.find(x => x.id === pid);
                          if (p) setMsgSubject(`Alert for ${p.address || "Property"}`);
                          else setMsgSubject("");
                        }}
                        style={{
                          width: "100%",
                          padding: "12px",
                          border: "1px solid #E5E7EB",
                          borderRadius: "10px",
                          appearance: "none",
                          backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
                          backgroundPosition: 'right 0.5rem center',
                          backgroundRepeat: 'no-repeat',
                          backgroundSize: '1.5em 1.5em'
                        }}
                      >
                        <option value="">Select a property...</option>
                        {msgProperties.map(p => (
                          <option key={p.id} value={p.id}>{p.address || "Property"} ({p.parcelId || "No ID"})</option>
                        ))}
                      </select>
                    )}
                  </div>

                  {/* Hidden Subject Field */}
                  <div style={{ marginTop: "16px", display: "none" }}>
                    <label style={{ display: "block", marginBottom: "6px", fontWeight: 700 }}>Subject</label>
                    <input
                      value={msgSubject}
                      onChange={(e) => setMsgSubject(e.target.value)}
                      style={{
                        width: "100%",
                        padding: "12px",
                        border: "1px solid #E5E7EB",
                        borderRadius: "10px",
                      }}
                    />
                  </div>

                  <div>
                    <label style={{ display: "block", marginBottom: "6px", fontWeight: 700 }}>Message</label>
                    <textarea
                      value={msgBody}
                      onChange={(e) => setMsgBody(e.target.value)}
                      rows={5}
                      placeholder="Type your message here..."
                      style={{
                        width: "100%",
                        padding: "12px",
                        border: "1px solid #E5E7EB",
                        borderRadius: "10px",
                      }}
                    />
                  </div>

                  <div style={{ display: "flex", gap: "10px", marginTop: "16px" }}>
                    <button
                      disabled={sendingMsg || !selectedPropertyId}
                      onClick={sendMessage}
                      style={{
                        flex: 1,
                        padding: "12px 16px",
                        background: "#6EA500",
                        color: "#fff",
                        border: "none",
                        borderRadius: "10px",
                        cursor: (sendingMsg || !selectedPropertyId) ? "not-allowed" : "pointer",
                        fontWeight: 800,
                        opacity: (sendingMsg || !selectedPropertyId) ? 0.7 : 1
                      }}
                    >
                      {sendingMsg ? "Sending..." : "Send Message"}
                    </button>
                    <button
                      onClick={() => setShowMsgModal(false)}
                      style={{
                        padding: "12px 16px",
                        background: "#F3F4F6",
                        color: "#111827",
                        border: "1px solid #E5E7EB",
                        borderRadius: "10px",
                        cursor: "pointer",
                        fontWeight: 800,
                      }}
                    >
                      Cancel
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}


