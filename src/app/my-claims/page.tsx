"use client";

import React, { useEffect, useState, useCallback } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Header from "@/components/header/Header";
import Footer from "@/components/footer/Footer";
import DashboardNav from "@/components/dashboard/DashboardNav";

type County = { omId: number; name: string };
type ClaimItem = { id: string; enteredValue: string; matchStatus: string };
type Claim = {
  id: string; omCountyId: number; bidderNumber: string; status: string;
  note: string | null; receiptUrl: string | null; createdAt: string; items: ClaimItem[];
};

const statusStyle: Record<string, React.CSSProperties> = {
  pending: { background: "#FEF3C7", color: "#92400E" },
  verified: { background: "#DCFCE7", color: "#166534" },
  rejected: { background: "#FEE2E2", color: "#991B1B" },
};
const matchLabel: Record<string, { text: string; color: string }> = {
  matched: { text: "✓ Matches", color: "#166534" },
  mismatch: { text: "✗ Doesn't match", color: "#991B1B" },
  not_found: { text: "Awaiting results", color: "#92400E" },
};

export default function MyClaimsPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [counties, setCounties] = useState<County[]>([]);
  const [claims, setClaims] = useState<Claim[]>([]);
  const [countyId, setCountyId] = useState("");
  const [bidderNumber, setBidderNumber] = useState("");
  const [propsText, setPropsText] = useState("");
  const [receiptFile, setReceiptFile] = useState<File | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [msg, setMsg] = useState<{ type: "ok" | "err"; text: string } | null>(null);

  useEffect(() => {
    if (status === "unauthenticated") router.push("/register");
  }, [status, router]);

  const load = useCallback(async () => {
    try {
      const [c, cl] = await Promise.all([
        fetch("/api/counties").then((r) => r.json()),
        fetch("/api/bidder-claims").then((r) => r.json()),
      ]);
      setCounties(c.counties || []);
      setClaims(cl.claims || []);
    } catch { /* ignore */ }
  }, []);

  useEffect(() => { if (session) load(); }, [session, load]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMsg(null);
    const properties = propsText.split(/[\n,]+/).map((s) => s.trim()).filter(Boolean);
    if (!countyId || !bidderNumber.trim() || properties.length === 0) {
      setMsg({ type: "err", text: "Choose a county, enter your bidder number, and at least one property." });
      return;
    }
    setSubmitting(true);
    try {
      // Optional: upload the bid receipt first, then attach its URL to the claim.
      let receiptUrl: string | null = null;
      if (receiptFile) {
        const fd = new FormData();
        fd.append("file", receiptFile);
        const up = await fetch("/api/bidder-claims/upload", { method: "POST", body: fd });
        if (!up.ok) {
          const e2 = await up.json().catch(() => null);
          setMsg({ type: "err", text: e2?.error || "Receipt upload failed." });
          return;
        }
        receiptUrl = (await up.json()).url;
      }

      const res = await fetch("/api/bidder-claims", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ omCountyId: Number(countyId), bidderNumber: bidderNumber.trim(), properties, receiptUrl }),
      });
      if (!res.ok) {
        const e2 = await res.json().catch(() => null);
        setMsg({ type: "err", text: (Array.isArray(e2) ? e2.join(" ") : e2?.error) || "Failed to submit claim." });
        return;
      }
      setMsg({ type: "ok", text: "Claim submitted — your properties will appear once an admin verifies it." });
      setBidderNumber(""); setPropsText(""); setCountyId(""); setReceiptFile(null);
      await load();
    } finally {
      setSubmitting(false);
    }
  };

  if (status === "loading") {
    return (
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh" }}>
        <div className="spinner-border text-primary" role="status"><span className="visually-hidden">Loading...</span></div>
      </div>
    );
  }
  if (!session) return null;

  const countyName = (id: number) => counties.find((c) => c.omId === id)?.name || `County ${id}`;

  return (
    <>
      <Header />
      <div className="dashboard-wrapper">
        <DashboardNav activeTab="my-claims" />

        <div className="profile-section">
          <div className="container">
            <div className="profile-content">

              {/* Submit a claim */}
              <div className="profile-card" style={{ marginBottom: 24 }}>
                <h2 className="profile-card-title">Claim Your Winning Bids</h2>
                <p style={{ color: "#6B7280", marginTop: -8, marginBottom: 20 }}>
                  Enter the county, your bidder number for that county, and the properties you won.
                  An admin verifies them, then they appear in your account.
                </p>

                {msg && (
                  <div style={{
                    padding: "12px 16px", borderRadius: 8, marginBottom: 16, fontWeight: 600,
                    ...(msg.type === "ok"
                      ? { background: "#d4edda", color: "#155724", border: "1px solid #c3e6cb" }
                      : { background: "#f8d7da", color: "#721c24", border: "1px solid #f5c6cb" }),
                  }}>
                    {msg.text}
                  </div>
                )}

                <form onSubmit={submit}>
                  <div className="profile-form-group">
                    <label className="profile-label">County</label>
                    <select className="profile-input" value={countyId} onChange={(e) => setCountyId(e.target.value)}>
                      <option value="">Select a county…</option>
                      {counties.map((c) => <option key={c.omId} value={c.omId}>{c.name}</option>)}
                    </select>
                  </div>

                  <div className="profile-form-group">
                    <label className="profile-label">Your Bidder Number</label>
                    <input className="profile-input" value={bidderNumber} onChange={(e) => setBidderNumber(e.target.value)} placeholder="e.g. 34" />
                  </div>

                  <div className="profile-form-group">
                    <label className="profile-label">Properties You Won (Sale ID or Map Number — one per line)</label>
                    <textarea className="profile-input" rows={4} value={propsText} onChange={(e) => setPropsText(e.target.value)}
                      placeholder={"SALE1001\n0604060101310"} style={{ resize: "vertical" }} />
                  </div>

                  <div className="profile-form-group">
                    <label className="profile-label">Bid Receipt (optional — PDF or photo, helps us verify faster)</label>
                    <input
                      type="file"
                      className="profile-input"
                      accept=".pdf,image/*"
                      onChange={(e) => setReceiptFile(e.target.files?.[0] || null)}
                    />
                    {receiptFile && (
                      <p style={{ color: "#6B7280", fontSize: 13, marginTop: 6 }}>
                        Selected: {receiptFile.name}{" "}
                        <button type="button" onClick={() => setReceiptFile(null)}
                          style={{ background: "none", border: "none", color: "#991B1B", cursor: "pointer", textDecoration: "underline" }}>
                          remove
                        </button>
                      </p>
                    )}
                  </div>

                  <button type="submit" className="profile-btn" disabled={submitting}>
                    {submitting ? "Submitting…" : "Submit Claim"}
                  </button>
                </form>
              </div>

              {/* Your claims */}
              <div className="profile-card">
                <h2 className="profile-card-title">Your Claims</h2>

                <div style={{ background: "#F3F7EC", border: "1px solid #E2ECD0", borderRadius: 10, padding: "12px 16px", marginBottom: 16, fontSize: 13, color: "#4B5563" }}>
                  <strong style={{ color: "#1F2937" }}>How verification works:</strong> You submit a claim → a county admin reviews it → once approved, your properties appear in your{" "}
                  <strong style={{ color: "#1F2937" }}>Properties</strong> page and you get an email.
                  <div style={{ marginTop: 8, display: "flex", flexDirection: "column", gap: 3 }}>
                    <span><strong style={{ color: "#92400E" }}>Pending</strong> — waiting for an admin to review your claim.</span>
                    <span><strong style={{ color: "#166534" }}>Verified</strong> — approved; your properties are now in your account.</span>
                    <span><strong style={{ color: "#991B1B" }}>Rejected</strong> — not approved (the reason is shown on the claim).</span>
                    <span><strong>&quot;Awaiting results&quot;</strong> next to a property means the county hasn&apos;t recorded the winning bidder number yet — an admin will still review your claim.</span>
                  </div>
                </div>

                {claims.length === 0 ? (
                  <p style={{ color: "#6B7280" }}>You haven&apos;t submitted any claims yet.</p>
                ) : (
                  <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                    {claims.map((c) => (
                      <div key={c.id} style={{ border: "1px solid #E5E7EB", borderRadius: 10, padding: 16 }}>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
                          <strong style={{ fontSize: 15 }}>{countyName(c.omCountyId)} — Bidder #{c.bidderNumber}</strong>
                          <span style={{ ...statusStyle[c.status], padding: "3px 10px", borderRadius: 999, fontSize: 12, fontWeight: 700, textTransform: "capitalize" }}>
                            {c.status}
                          </span>
                        </div>
                        {c.status === "rejected" && c.note && (
                          <div style={{ color: "#991B1B", fontSize: 13, marginBottom: 8 }}>Reason: {c.note}</div>
                        )}
                        {c.receiptUrl && (
                          <div style={{ marginBottom: 8 }}>
                            <a href={c.receiptUrl} target="_blank" rel="noopener noreferrer"
                              style={{ color: "#4d7400", fontSize: 13, fontWeight: 600 }}>
                              View attached receipt
                            </a>
                          </div>
                        )}
                        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                          {c.items.map((it) => {
                            // Once the claim is verified, the per-item auto-match label ("Awaiting
                            // results" etc.) is no longer relevant — show it as in the bidder's account.
                            const m = c.status === "verified"
                              ? { text: "✓ In your account", color: "#166534" }
                              : c.status === "rejected"
                                ? { text: "—", color: "#9CA3AF" }
                                : (matchLabel[it.matchStatus] || { text: it.matchStatus, color: "#6B7280" });
                            return (
                              <div key={it.id} style={{ display: "flex", justifyContent: "space-between", fontSize: 14 }}>
                                <span style={{ fontFamily: "monospace" }}>{it.enteredValue}</span>
                                <span style={{ color: m.color, fontWeight: 600 }}>{m.text}</span>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
