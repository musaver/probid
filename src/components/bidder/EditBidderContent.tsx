"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import DashboardNav from "@/components/dashboard/DashboardNav";
import Footer from "@/components/footer/Footer";
import BidderDocumentsManager from "@/components/bidder/BidderDocumentsManager";

type PropertyLite = { id: string; address?: string; parcelId?: string; city?: string };

export default function EditBidderContent({ bidderId }: { bidderId: string }) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [propSearch, setPropSearch] = useState("");
  const [availableProps, setAvailableProps] = useState<PropertyLite[]>([]);
  const [linkedProps, setLinkedProps] = useState<PropertyLite[]>([]);
  const refreshSeq = useRef(0);

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    notes: "",
  });

  useEffect(() => {
    const load = async () => {
      const seq = ++refreshSeq.current;
      setLoading(true);
      try {
        const [bidderRes, propsRes, linkedRes] = await Promise.all([
          fetch(`/api/users/bidders/${bidderId}`),
          fetch(`/api/properties`),
          fetch(`/api/users/bidders/${bidderId}/linked-properties`),
        ]);

        if (!bidderRes.ok) throw new Error((await bidderRes.text().catch(() => "")) || "Failed to load bidder");
        const bidder = await bidderRes.json();

        const fullName = `${bidder?.name || ""}`.trim();
        const [fn, ...rest] = fullName.split(" ").filter(Boolean);
        const ln = rest.join(" ");

        if (seq !== refreshSeq.current) return;
        setForm({
          firstName: fn || "",
          lastName: ln || "",
          email: bidder?.email || "",
          phone: bidder?.phone || "",
          address: bidder?.address || "",
          city: bidder?.city || "",
          state: bidder?.state || "",
          notes: bidder?.aboutMe || "",
        });

        if (propsRes.ok) {
          const data = await propsRes.json();
          const props = Array.isArray(data) ? data : [];
          setAvailableProps(
            props.map((p: any) => ({
              id: p.id,
              address: p.address || p.title || "Property",
              parcelId: p.parcelId || "",
              city: p.city || "",
            }))
          );
        } else {
          setAvailableProps([]);
        }

        if (linkedRes.ok) {
          const data = await linkedRes.json();
          const props = Array.isArray(data) ? data : [];
          setLinkedProps(
            props.map((p: any) => ({
              id: p.id,
              address: p.address || "Property",
              parcelId: p.parcelId || "",
              city: p.city || "",
            }))
          );
        } else {
          setLinkedProps([]);
        }
      } catch (e) {
        console.error("Failed to load bidder:", e);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [bidderId]);

  const filteredAvailable = useMemo(() => {
    const q = propSearch.trim().toLowerCase();
    if (!q) return availableProps;
    return availableProps.filter((p) => {
      const hay = `${p.address || ""} ${p.parcelId || ""} ${p.city || ""}`.toLowerCase();
      return hay.includes(q);
    });
  }, [availableProps, propSearch]);

  const linkProperty = async (p: PropertyLite) => {
    if (linkedProps.some((x) => x.id === p.id)) return;
    setLinkedProps((prev) => [...prev, p]); // optimistic
    try {
      const res = await fetch(`/api/properties/${p.id}/linked-bidders`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ bidderId }),
      });
      if (!res.ok) {
        const text = await res.text().catch(() => "");
        throw new Error(text || "Failed to link property");
      }
    } catch (e) {
      console.error("Failed to link property:", e);
      setLinkedProps((prev) => prev.filter((x) => x.id !== p.id));
      alert(e instanceof Error ? e.message : "Failed to link property");
    }
  };

  const unlinkProperty = async (propertyId: string) => {
    const prev = linkedProps;
    setLinkedProps((p) => p.filter((x) => x.id !== propertyId)); // optimistic
    try {
      const res = await fetch(`/api/properties/${propertyId}/linked-bidders?bidderId=${encodeURIComponent(bidderId)}`, {
        method: "DELETE",
      });
      if (!res.ok) {
        const text = await res.text().catch(() => "");
        throw new Error(text || "Failed to unlink property");
      }
    } catch (e) {
      console.error("Failed to unlink property:", e);
      setLinkedProps(prev);
      alert(e instanceof Error ? e.message : "Failed to unlink property");
    }
  };

  const save = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.email.trim()) {
      alert("Email is required");
      return;
    }
    setSaving(true);
    try {
      const res = await fetch(`/api/users/bidders/${bidderId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: form.firstName,
          lastName: form.lastName,
          email: form.email,
          phone: form.phone,
          address: form.address,
          city: form.city,
          state: form.state,
          notes: form.notes,
        }),
      });
      if (!res.ok) {
        const text = await res.text().catch(() => "");
        alert(text || "Failed to save bidder");
        return;
      }
      alert("Saved");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="dashboard-wrapper">
      <DashboardNav activeTab="bidders" />

      <div className="dashboard-content">
        <div className="container">
          <div className="property-header">
            <div />
            <Link href="/bidders" className="add-property-btn" style={{ background: "#f3f4f6", color: "#111827" }}>
              <i className="bi bi-people"></i> Back to Bidders
            </Link>
          </div>

          {loading ? (
            <div style={{ padding: "16px", color: "#6B7280" }}>Loading bidder...</div>
          ) : (
            <div className="dashboard-grid">
              <div className="dashboard-main">
                <div className="property-modal">
                  <div className="modal-header">
                    <h3>Edit Bidder</h3>
                    <button
                      type="button"
                      className="close-btn"
                      onClick={() => router.push("/bidders")}
                      aria-label="Close"
                    >
                      <i className="bi bi-x"></i>
                    </button>
                  </div>
                  <div className="modal-body">
                    <form onSubmit={save}>
                      <div className="form-row">
                        <div className="form-group">
                          <label>First Name</label>
                          <input
                            type="text"
                            placeholder="John"
                            value={form.firstName}
                            onChange={(e) => setForm((p) => ({ ...p, firstName: e.target.value }))}
                          />
                        </div>
                        <div className="form-group">
                          <label>Last Name</label>
                          <input
                            type="text"
                            placeholder="Doe"
                            value={form.lastName}
                            onChange={(e) => setForm((p) => ({ ...p, lastName: e.target.value }))}
                          />
                        </div>
                      </div>
                      <div className="form-row">
                        <div className="form-group">
                          <label>Email Address</label>
                          <input
                            type="email"
                            placeholder="john@example.com"
                            value={form.email}
                            onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
                            required
                          />
                        </div>
                        <div className="form-group">
                          <label>Phone Number</label>
                          <input
                            type="tel"
                            placeholder="+1 (555) 123-4567"
                            value={form.phone}
                            onChange={(e) => setForm((p) => ({ ...p, phone: e.target.value }))}
                          />
                        </div>
                      </div>
                      <div className="form-row">
                        <div className="form-group">
                          <label>Address</label>
                          <input
                            type="text"
                            placeholder="123 Main Street"
                            value={form.address}
                            onChange={(e) => setForm((p) => ({ ...p, address: e.target.value }))}
                          />
                        </div>
                        <div className="form-group">
                          <label>City</label>
                          <input
                            type="text"
                            placeholder="Springfield"
                            value={form.city}
                            onChange={(e) => setForm((p) => ({ ...p, city: e.target.value }))}
                          />
                        </div>
                      </div>
                      <div className="form-row">
                        <div className="form-group">
                          <label>State</label>
                          <input
                            type="text"
                            placeholder="IL"
                            value={form.state}
                            onChange={(e) => setForm((p) => ({ ...p, state: e.target.value }))}
                          />
                        </div>
                        <div className="form-group">
                          <label>ZIP Code</label>
                          {/* zip is not stored separately in current schema; keep UI consistent */}
                          <input type="text" placeholder="62701" disabled value={"—"} />
                        </div>
                      </div>
                      <div className="form-group full-width">
                        <label>Additional Notes</label>
                        <textarea
                          placeholder="Enter any additional information about this bidder..."
                          rows={4}
                          value={form.notes}
                          onChange={(e) => setForm((p) => ({ ...p, notes: e.target.value }))}
                        ></textarea>
                      </div>

                      <div className="form-group full-width">
                        <label>Identity Documents</label>
                        <BidderDocumentsManager bidderId={bidderId} />
                      </div>

                      <div className="form-actions">
                        <button type="submit" className="btn-submit" disabled={saving}>
                          {saving ? "Saving..." : "Save Changes"}
                        </button>
                        <Link href="/bidders" className="btn-cancel">
                          Cancel
                        </Link>
                      </div>
                    </form>
                  </div>
                </div>
              </div>

              <div className="dashboard-sidebar">
                <div className="sidebar-card">
                  <h4>Link Properties</h4>
                  <p className="settings-subtitle">Select which properties this bidder can access and bid on</p>

                  <div className="linked-properties-section">
                    <h5>Linked Properties ({linkedProps.length})</h5>
                    {linkedProps.length === 0 ? (
                      <div className="empty-state" style={{ background: "#f9fafb" }}>
                        <i className="bi bi-building"></i>
                        <p>No properties linked yet</p>
                      </div>
                    ) : (
                      <div className="properties-list">
                        {linkedProps.map((p) => (
                          <div key={p.id} className="property-item">
                            <div className="property-info">
                              <h6>{p.address}</h6>
                              <p>{p.parcelId}</p>
                            </div>
                            <button className="link-btn linked" onClick={() => unlinkProperty(p.id)} type="button">
                              <i className="bi bi-x"></i>
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="available-properties-section">
                    <h5>Available Properties</h5>
                    <div className="search-bidder">
                      <i className="bi bi-search"></i>
                      <input
                        type="text"
                        placeholder="Search properties..."
                        value={propSearch}
                        onChange={(e) => setPropSearch(e.target.value)}
                      />
                    </div>
                    <div className="properties-list">
                      {filteredAvailable.map((p) => (
                        <div key={p.id} className="property-item">
                          <div className="property-info">
                            <h6>{p.address}</h6>
                            <p>{p.parcelId}</p>
                          </div>
                          <button
                            className="link-btn available"
                            onClick={() => linkProperty(p)}
                            type="button"
                            disabled={linkedProps.some((x) => x.id === p.id)}
                          >
                            <i className="bi bi-plus"></i>
                          </button>
                        </div>
                      ))}
                      {filteredAvailable.length === 0 && (
                        <div style={{ padding: "10px", color: "#6B7280" }}>No properties found.</div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}


