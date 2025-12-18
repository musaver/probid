"use client";

import Link from "next/link";
import React, { useEffect, useMemo, useState } from "react";

type PropertyLite = { id: string; address?: string; city?: string; parcelId?: string };

export default function DashboardQuickActions({ isCounty }: { isCounty: boolean }) {
  const [open, setOpen] = useState(false);
  const [loadingProps, setLoadingProps] = useState(false);
  const [properties, setProperties] = useState<PropertyLite[]>([]);
  const [propertyId, setPropertyId] = useState<string>("");

  const [loadingBidders, setLoadingBidders] = useState(false);
  const [linkedBidders, setLinkedBidders] = useState<any[]>([]);
  const [recipientIds, setRecipientIds] = useState<string[]>([]);

  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);

  const selectedProperty = useMemo(
    () => properties.find((p) => p.id === propertyId) || null,
    [properties, propertyId]
  );

  useEffect(() => {
    if (!open) return;
    const loadProps = async () => {
      setLoadingProps(true);
      try {
        const res = await fetch("/api/properties");
        if (!res.ok) {
          setProperties([]);
          return;
        }
        const data = await res.json();
        const list = Array.isArray(data) ? data : [];
        setProperties(
          list.map((p: any) => ({
            id: p.id,
            address: p.address || p.title || "Property",
            city: p.city || "",
            parcelId: p.parcelId || "",
          }))
        );
      } catch {
        setProperties([]);
      } finally {
        setLoadingProps(false);
      }
    };
    loadProps();
  }, [open]);

  useEffect(() => {
    if (!open) return;
    if (!propertyId) {
      setLinkedBidders([]);
      setRecipientIds([]);
      return;
    }
    const loadBidders = async () => {
      setLoadingBidders(true);
      try {
        const res = await fetch(`/api/properties/${propertyId}/linked-bidders`);
        if (!res.ok) {
          setLinkedBidders([]);
          setRecipientIds([]);
          return;
        }
        const data = await res.json();
        const list = Array.isArray(data) ? data : [];
        setLinkedBidders(list);
        setRecipientIds(list.map((b: any) => b.bidderId).filter(Boolean));
      } catch {
        setLinkedBidders([]);
        setRecipientIds([]);
      } finally {
        setLoadingBidders(false);
      }
    };
    loadBidders();
  }, [open, propertyId]);

  useEffect(() => {
    if (!open) return;
    if (!selectedProperty?.address) return;
    setSubject((prev) => prev || `Update: ${selectedProperty.address}`);
  }, [open, selectedProperty?.address]);

  const sendNotice = async () => {
    if (!propertyId) return alert("Select a property first.");
    if (!message.trim()) return alert("Message is required");
    setSending(true);
    try {
      const res = await fetch(`/api/properties/${propertyId}/alerts`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          subject: subject.trim() || `Update: ${selectedProperty?.address || "Property"}`,
          message,
          bidderIds: recipientIds,
        }),
      });
      if (!res.ok) {
        const text = await res.text().catch(() => "");
        alert(text || "Failed to send notice");
        return;
      }
      setOpen(false);
      setPropertyId("");
      setLinkedBidders([]);
      setRecipientIds([]);
      setSubject("");
      setMessage("");
      alert("Notice sent!");
    } finally {
      setSending(false);
    }
  };

  if (!isCounty) return null;

  return (
    <>
      <div className="action-buttons-section">
        <Link href="/add-property" className="action-btn action-btn-primary">
          <i className="bi bi-plus"></i>
          <span>Add Property</span>
        </Link>
        <Link href="/add-bidder" className="action-btn action-btn-secondary">
          <i className="bi bi-person-plus"></i>
          <span>Add Bidder</span>
        </Link>
        <button className="action-btn action-btn-secondary" type="button" onClick={() => setOpen(true)}>
          <i className="bi bi-bell"></i>
          <span>Send Notice</span>
        </button>
        <a className="action-btn action-btn-secondary" href="/api/reports/export">
          <i className="bi bi-download"></i>
          <span>Export Data</span>
        </a>
      </div>

      {open && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "rgba(0,0,0,0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
            padding: "14px",
          }}
          onClick={() => setOpen(false)}
        >
          <div
            style={{
              background: "#fff",
              borderRadius: "16px",
              padding: "22px",
              maxWidth: "720px",
              width: "100%",
              maxHeight: "85vh",
              overflow: "auto",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "10px" }}>
              <div>
                <h2 style={{ margin: 0 }}>Send Notice</h2>
                <div style={{ color: "#6B7280", fontSize: "13px", marginTop: "4px" }}>
                  Choose a property, then select recipients (linked bidders).
                </div>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                style={{ background: "none", border: "none", fontSize: "24px", cursor: "pointer" }}
                aria-label="Close"
              >
                ×
              </button>
            </div>

            <div style={{ marginTop: "16px" }}>
              <label style={{ display: "block", marginBottom: "8px", fontWeight: 700 }}>Property</label>
              {loadingProps ? (
                <div style={{ padding: "10px 0", color: "#6B7280" }}>Loading properties...</div>
              ) : properties.length === 0 ? (
                <div style={{ padding: "10px 0", color: "#6B7280" }}>No properties found.</div>
              ) : (
                <select
                  value={propertyId}
                  onChange={(e) => setPropertyId(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "12px",
                    border: "1px solid #E5E7EB",
                    borderRadius: "10px",
                  }}
                >
                  <option value="">Select a property...</option>
                  {properties.map((p) => (
                    <option key={p.id} value={p.id}>
                      {(p.address || "Property") + (p.city ? ` — ${p.city}` : "") + (p.parcelId ? ` • ${p.parcelId}` : "")}
                    </option>
                  ))}
                </select>
              )}
            </div>

            <div style={{ marginTop: "14px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div style={{ fontWeight: 800 }}>Recipients</div>
                <button
                  type="button"
                  onClick={() => {
                    const allIds = linkedBidders.map((b: any) => b.bidderId);
                    if (recipientIds.length === allIds.length) setRecipientIds([]);
                    else setRecipientIds(allIds);
                  }}
                  style={{
                    background: "none",
                    border: "none",
                    color: "#6EA500",
                    cursor: "pointer",
                    fontWeight: 800,
                    fontSize: "12px",
                    padding: 0,
                  }}
                  disabled={loadingBidders || !propertyId}
                >
                  {recipientIds.length === linkedBidders.length ? "Uncheck all" : "Check all"}
                </button>
              </div>

              {!propertyId ? (
                <div style={{ padding: "10px 0", color: "#6B7280" }}>Select a property to load linked bidders.</div>
              ) : loadingBidders ? (
                <div style={{ padding: "10px 0", color: "#6B7280" }}>Loading linked bidders...</div>
              ) : linkedBidders.length === 0 ? (
                <div style={{ padding: "10px 0", color: "#6B7280" }}>
                  No linked bidders. County copy will still be sent.
                </div>
              ) : (
                <div
                  style={{
                    marginTop: "10px",
                    border: "1px solid #E5E7EB",
                    borderRadius: "12px",
                    overflow: "hidden",
                    maxHeight: "180px",
                    overflowY: "auto",
                  }}
                >
                  {linkedBidders.map((b: any) => {
                    const checked = recipientIds.includes(b.bidderId);
                    return (
                      <label
                        key={b.bidderId}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "10px",
                          padding: "10px 12px",
                          borderBottom: "1px solid rgba(17,24,39,0.06)",
                          cursor: "pointer",
                        }}
                      >
                        <input
                          type="checkbox"
                          checked={checked}
                          onChange={() => {
                            setRecipientIds((prev) =>
                              prev.includes(b.bidderId)
                                ? prev.filter((id) => id !== b.bidderId)
                                : [...prev, b.bidderId]
                            );
                          }}
                        />
                        <div style={{ display: "flex", flexDirection: "column" }}>
                          <div style={{ fontWeight: 700, fontSize: "13px", color: "#111827" }}>
                            {b.name || "Unknown"}
                          </div>
                          <div style={{ fontSize: "12px", color: "#6B7280" }}>{b.email}</div>
                        </div>
                      </label>
                    );
                  })}
                </div>
              )}

              {linkedBidders.length > 0 && (
                <div style={{ marginTop: "8px", fontSize: "12px", color: "#6B7280" }}>
                  Selected: <strong>{recipientIds.length}</strong> / {linkedBidders.length} bidders
                </div>
              )}
            </div>

            <div style={{ marginTop: "16px" }}>
              <label style={{ display: "block", marginBottom: "6px", fontWeight: 700 }}>Subject</label>
              <input
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder={`Update: ${selectedProperty?.address || "Property"}`}
                style={{
                  width: "100%",
                  padding: "12px",
                  border: "1px solid #E5E7EB",
                  borderRadius: "10px",
                }}
              />
            </div>

            <div style={{ marginTop: "14px" }}>
              <label style={{ display: "block", marginBottom: "6px", fontWeight: 700 }}>Message</label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={5}
                placeholder="Write your notice..."
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
                type="button"
                disabled={sending}
                onClick={sendNotice}
                style={{
                  flex: 1,
                  padding: "12px 16px",
                  background: "#6EA500",
                  color: "#fff",
                  border: "none",
                  borderRadius: "10px",
                  cursor: "pointer",
                  fontWeight: 800,
                }}
              >
                {sending ? "Sending..." : "Send Notice"}
              </button>
              <button
                type="button"
                onClick={() => setOpen(false)}
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
          </div>
        </div>
      )}
    </>
  );
}


