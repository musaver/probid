"use client";
import React, { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import DashboardNav from "@/components/dashboard/DashboardNav";
import Footer from "@/components/footer/Footer";
import BidderDocumentsManager from "@/components/bidder/BidderDocumentsManager";

const AddBidderContent = () => {
  const router = useRouter();
  const [linkedProperties, setLinkedProperties] = useState([]);
  const [availableProperties, setAvailableProperties] = useState([]);
  const [loadingProps, setLoadingProps] = useState(true);
  const [propSearch, setPropSearch] = useState("");
  const docsRef = useRef(null);

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    notes: "",
  });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const loadProps = async () => {
      setLoadingProps(true);
      try {
        const res = await fetch("/api/properties");
        if (!res.ok) {
          console.error("Failed to load properties:", await res.text().catch(() => ""));
          setAvailableProperties([]);
          return;
        }
        const data = await res.json();
        const props = Array.isArray(data) ? data : [];
        setAvailableProperties(
          props.map((p) => ({
            id: p.id,
            address: p.address || p.title || "Property",
            parcelId: p.parcelId || "",
            city: p.city || "",
          }))
        );
      } catch (e) {
        console.error("Failed to load properties:", e);
        setAvailableProperties([]);
      } finally {
        setLoadingProps(false);
      }
    };
    loadProps();
  }, []);

  const filteredAvailable = useMemo(() => {
    const q = propSearch.trim().toLowerCase();
    if (!q) return availableProperties;
    return availableProperties.filter((p) => {
      const hay = `${p.address || ""} ${p.parcelId || ""} ${p.city || ""}`.toLowerCase();
      return hay.includes(q);
    });
  }, [availableProperties, propSearch]);

  const handleLinkProperty = (property) => {
    if (!linkedProperties.find((p) => p.id === property.id)) {
      setLinkedProperties([...linkedProperties, property]);
    }
  };

  const handleUnlinkProperty = (propertyId) => {
    setLinkedProperties(linkedProperties.filter((p) => p.id !== propertyId));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.email.trim()) {
      alert("Email is required");
      return;
    }
    setSubmitting(true);
    try {
      const res = await fetch("/api/users/bidders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: form.firstName,
          lastName: form.lastName,
          email: form.email,
          phone: form.phone,
          address: form.address,
          city: form.city,
          state: form.state,
          zipCode: form.zipCode,
          notes: form.notes,
        }),
      });
      if (!res.ok) {
        const text = await res.text().catch(() => "");
        alert(text || "Failed to create bidder");
        return;
      }
      const data = await res.json();
      const bidderId = data?.bidderId;

      // Upload identity documents (with progress) before redirect
      if (bidderId && docsRef.current?.uploadQueuedFiles) {
        try {
          await docsRef.current.uploadQueuedFiles(bidderId);
          docsRef.current.clearQueue?.();
        } catch (e) {
          console.error("Failed to upload identity documents:", e);
        }
      }

      if (bidderId && linkedProperties.length > 0) {
        for (const p of linkedProperties) {
          try {
            await fetch(`/api/properties/${p.id}/linked-bidders`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ bidderId }),
            });
          } catch (e) {
            console.error("Failed linking property:", p.id, e);
          }
        }
      }

      if (bidderId) {
        router.push(`/edit-bidder/${bidderId}`);
      } else {
        router.push("/bidders");
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <div className="dashboard-wrapper">
        <DashboardNav activeTab="bidders" />

        {/* Main Content */}
        <div className="dashboard-content">
          <div className="container">
            <div className="property-header">
              <div />
              <Link href="/bidders" className="add-property-btn" style={{ background: "#f3f4f6", color: "#111827" }}>
                <i className="bi bi-people"></i> Back to Bidders
              </Link>
            </div>

            <div className="dashboard-grid">
              {/* Left Column - Add New Bidder Form */}
              <div className="dashboard-main">
                <div className="property-modal">
                  <div className="modal-header">
                    <h3>Add New Bidder</h3>
                    <Link href="/dashboard?tab=bidders" className="close-btn">
                      <i className="bi bi-x"></i>
                    </Link>
                  </div>
                  <div className="modal-body">
                    <form onSubmit={handleSubmit}>
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
                          <input
                            type="text"
                            placeholder="62701"
                            value={form.zipCode}
                            onChange={(e) => setForm((p) => ({ ...p, zipCode: e.target.value }))}
                          />
                        </div>
                      </div>
                      <div className="form-group full-width">
                        <label>Identity Documents</label>
                        <BidderDocumentsManager ref={docsRef} />
                      </div>
                      <div className="form-group full-width">
                        <label>Additional Notes</label>
                        <textarea
                          placeholder="Enter any additional information about this bidder..."
                          rows="4"
                          value={form.notes}
                          onChange={(e) => setForm((p) => ({ ...p, notes: e.target.value }))}
                        ></textarea>
                      </div>
                      <div className="form-actions">
                        <button type="submit" className="btn-submit" disabled={submitting}>
                          {submitting ? "Adding..." : "Add Bidder"}
                        </button>
                        <Link href="/bidders" className="btn-cancel">
                          Cancel
                        </Link>
                      </div>
                    </form>
                  </div>
                </div>
              </div>

              {/* Right Column - Link Properties */}
              <div className="dashboard-sidebar">
                <div className="sidebar-card">
                  <h4>Link Properties</h4>
                  <p className="settings-subtitle">Select which properties this bidder can access and bid on</p>
                  
                  {/* Linked Properties */}
                  <div className="linked-properties-section">
                    <h5>Linked Properties ({linkedProperties.length})</h5>
                    {linkedProperties.length === 0 ? (
                      <div className="empty-state" style={{ background: '#f9fafb' }}>
                        <i className="bi bi-building"></i>
                        <p>No properties linked yet</p>
                      </div>
                    ) : (
                      <div className="properties-list">
                        {linkedProperties.map((property, index) => (
                          <div key={index} className="property-item">
                            <div className="property-info">
                              <h6>{property.address}</h6>
                              <p>{property.parcelId}</p>
                            </div>
                            <button
                              className="link-btn linked"
                              onClick={() => handleUnlinkProperty(property.id)}
                              type="button"
                            >
                              <i className="bi bi-x"></i>
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Available Properties */}
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
                      {loadingProps ? (
                        <div style={{ padding: "10px", color: "#6B7280" }}>Loading...</div>
                      ) : filteredAvailable.length === 0 ? (
                        <div style={{ padding: "10px", color: "#6B7280" }}>No properties found.</div>
                      ) : (
                        filteredAvailable.map((property, index) => (
                        <div key={index} className="property-item">
                          <div className="property-info">
                            <h6>{property.address}</h6>
                            <p>{property.parcelId}</p>
                          </div>
                          <button
                            className="link-btn available"
                            onClick={() => handleLinkProperty(property)}
                            type="button"
                            disabled={linkedProperties.some((p) => p.id === property.id)}
                          >
                            <i className="bi bi-plus"></i>
                          </button>
                        </div>
                      ))
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default AddBidderContent;


