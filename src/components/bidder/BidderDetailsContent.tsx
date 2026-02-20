"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import DashboardNav from "@/components/dashboard/DashboardNav";
import Footer from "@/components/footer/Footer";

const avatarFallback = "/assets/img/avatar-placeholder.svg";

type BidderDetail = {
    id: string;
    name: string | null;
    email: string;
    phone: string | null;
    address: string | null;
    city: string | null;
    state: string | null;
    aboutMe: string | null;
    bidderNumber: string | null;
    image?: string | null;
    createdAt?: string | null;
};

type LinkedProperty = {
    id: string;
    address: string | null;
    parcelId: string | null;
    city: string | null;
};

function formatMemberSince(dateStr?: string | null): string {
    if (!dateStr) return "—";
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return "—";
    return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

function buildAddress(bidder: BidderDetail): string {
    const parts = [bidder.address, bidder.city, bidder.state].filter(Boolean);
    return parts.join(", ") || "—";
}

export default function BidderDetailsContent({ id }: { id: string }) {
    const [activeTab, setActiveTab] = useState<"overview" | "properties" | "communication">("overview");
    const [bidder, setBidder] = useState<BidderDetail | null>(null);
    const [loading, setLoading] = useState(true);
    const [linkedProperties, setLinkedProperties] = useState<LinkedProperty[]>([]);
    const [loadingProps, setLoadingProps] = useState(false);

    // Message modal
    const [showMsgModal, setShowMsgModal] = useState(false);
    const [selectedPropertyId, setSelectedPropertyId] = useState("");
    const [msgSubject, setMsgSubject] = useState("");
    const [msgBody, setMsgBody] = useState("");
    const [sendingMsg, setSendingMsg] = useState(false);

    useEffect(() => {
        const fetchBidder = async () => {
            try {
                const res = await fetch(`/api/users/bidders/${id}`);
                if (res.ok) {
                    const data = await res.json();
                    setBidder(data);
                }
            } catch (e) {
                console.error("Error fetching bidder:", e);
            } finally {
                setLoading(false);
            }
        };
        fetchBidder();
    }, [id]);

    useEffect(() => {
        const fetchLinkedProps = async () => {
            setLoadingProps(true);
            try {
                const res = await fetch(`/api/users/bidders/${id}/linked-properties`);
                if (res.ok) {
                    const data = await res.json();
                    setLinkedProperties(Array.isArray(data) ? data : []);
                }
            } catch (e) {
                console.error("Error fetching linked properties:", e);
            } finally {
                setLoadingProps(false);
            }
        };
        fetchLinkedProps();
    }, [id]);

    const openMessageModal = () => {
        setShowMsgModal(true);
        setSelectedPropertyId(linkedProperties.length === 1 ? linkedProperties[0].id : "");
        setMsgSubject(linkedProperties.length === 1 ? `Alert for ${linkedProperties[0].address || "Property"}` : "");
        setMsgBody("");
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
                    bidderIds: [id],
                }),
            });
            if (!res.ok) throw new Error(await res.text());
            alert("Message sent!");
            setShowMsgModal(false);
        } catch (e) {
            alert("Failed to send message");
        } finally {
            setSendingMsg(false);
        }
    };

    if (loading) {
        return (
            <div className="dashboard-wrapper">
                <DashboardNav activeTab="bidders" />
                <div className="bp-main-content">
                    <div className="container">
                        <div style={{ padding: "40px", color: "#6B7280", textAlign: "center" }}>Loading bidder details...</div>
                    </div>
                </div>
                <Footer />
            </div>
        );
    }

    if (!bidder) {
        return (
            <div className="dashboard-wrapper">
                <DashboardNav activeTab="bidders" />
                <div className="bp-main-content">
                    <div className="container">
                        <div style={{ padding: "40px", color: "#B91C1C", textAlign: "center" }}>Bidder not found.</div>
                    </div>
                </div>
                <Footer />
            </div>
        );
    }

    const fullAddress = buildAddress(bidder);
    const memberSince = formatMemberSince((bidder as any).createdAt);

    return (
        <div className="dashboard-wrapper">
            <DashboardNav activeTab="bidders" />

            <div className="bp-main-content">
                <div className="container">
                    {/* Back Link */}
                    <Link href="/bidders" className="bp-back-link">
                        <i className="bi bi-arrow-left"></i>
                        Back to Bidders
                    </Link>

                    {/* Profile Header Card */}
                    <div className="bp-profile-card">
                        {/* Status Badge */}
                        <span className="bp-status-badge active">Active</span>

                        <div className="bp-profile-header">
                            <div className="bp-avatar-section">
                                {/* Avatar */}
                                <div className="bp-avatar">
                                    <img
                                        src={bidder.image || avatarFallback}
                                        alt={bidder.name || "Bidder"}
                                        onError={(e) => {
                                            (e.currentTarget as HTMLImageElement).src = avatarFallback;
                                        }}
                                    />
                                </div>

                                <div className="bp-basic-info">
                                    <h1 className="bp-name">{bidder.name || "—"}</h1>
                                    <p className="bp-bidder-id">
                                        {bidder.bidderNumber ? `Bidder ID: ${bidder.bidderNumber}` : `ID: ${bidder.id}`}
                                    </p>

                                    {/* Contact Icons */}
                                    <div className="bp-contact-icons">
                                        <div className="bp-contact-icon-item">
                                            <div className="bp-icon-box email">
                                                <i className="bi bi-envelope"></i>
                                            </div>
                                            <div className="bp-icon-text">
                                                <span className="bp-label">Email</span>
                                                <span className="bp-value">{bidder.email}</span>
                                            </div>
                                        </div>
                                        {bidder.phone && (
                                            <div className="bp-contact-icon-item">
                                                <div className="bp-icon-box phone">
                                                    <i className="bi bi-telephone"></i>
                                                </div>
                                                <div className="bp-icon-text">
                                                    <span className="bp-label">Phone</span>
                                                    <span className="bp-value">{bidder.phone}</span>
                                                </div>
                                            </div>
                                        )}
                                        <div className="bp-contact-icon-item">
                                            <div className="bp-icon-box calendar">
                                                <i className="bi bi-calendar"></i>
                                            </div>
                                            <div className="bp-icon-text">
                                                <span className="bp-label">Member Since</span>
                                                <span className="bp-value">{memberSince}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Divider */}
                            <div className="bp-divider"></div>

                            {/* Address */}
                            {fullAddress !== "—" && (
                                <div className="bp-address">
                                    <i className="bi bi-geo-alt"></i>
                                    {fullAddress}
                                </div>
                            )}

                            {/* Action Buttons */}
                            <div className="bp-action-buttons" style={{ marginTop: "16px" }}>
                                {linkedProperties.length > 0 && (
                                    <button className="bp-btn primary" onClick={openMessageModal}>
                                        <i className="bi bi-chat-dots"></i>
                                        Send Message
                                    </button>
                                )}
                                <Link href={`/edit-bidder/${bidder.id}`} className="bp-btn secondary">
                                    <i className="bi bi-pencil"></i>
                                    Edit Profile
                                </Link>
                                
                            </div>
                        </div>
                    </div>

                    {/* Stats Grid */}
                    <div className="bp-stats-grid">
                        <div className="bp-stat-card purple">
                            <div className="bp-stat-icon">
                                <i className="bi bi-building"></i>
                            </div>
                            <div className="bp-stat-content">
                                <div className="bp-stat-number">{linkedProperties.length}</div>
                                <div className="bp-stat-label">Linked Properties</div>
                            </div>
                            <div className="bp-stat-badge">Active</div>
                        </div>
                        <div className="bp-stat-card green">
                            <div className="bp-stat-icon">
                                <i className="bi bi-hammer"></i>
                            </div>
                            <div className="bp-stat-content">
                                <div className="bp-stat-number">—</div>
                                <div className="bp-stat-label">Total Bids</div>
                            </div>
                            <div className="bp-stat-badge">Total</div>
                        </div>
                        <div className="bp-stat-card red">
                            <div className="bp-stat-icon">
                                <i className="bi bi-trophy"></i>
                            </div>
                            <div className="bp-stat-content">
                                <div className="bp-stat-number">—</div>
                                <div className="bp-stat-label">Winning Bids</div>
                            </div>
                            <div className="bp-stat-badge">Winning</div>
                        </div>
                        <div className="bp-stat-card orange">
                            <div className="bp-stat-icon">
                                <i className="bi bi-bell"></i>
                            </div>
                            <div className="bp-stat-content">
                                <div className="bp-stat-number">—</div>
                                <div className="bp-stat-label">Alerts Sent</div>
                            </div>
                            <div className="bp-stat-badge">Total</div>
                        </div>
                    </div>

                    {/* Tabs */}
                    <div className="bp-tabs">
                        <button
                            className={`bp-tab ${activeTab === "overview" ? "active" : ""}`}
                            onClick={() => setActiveTab("overview")}
                        >
                            Overview
                        </button>
                        <button
                            className={`bp-tab ${activeTab === "properties" ? "active" : ""}`}
                            onClick={() => setActiveTab("properties")}
                        >
                            Properties &amp; Bids
                        </button>
                        <button
                            className={`bp-tab ${activeTab === "communication" ? "active" : ""}`}
                            onClick={() => setActiveTab("communication")}
                        >
                            Communication Log
                        </button>
                    </div>

                    {/* Overview Tab */}
                    {activeTab === "overview" && (
                        <div className="bp-content-grid">
                            {/* Contact Information */}
                            <div className="bp-info-card">
                                <h3>Contact Information</h3>
                                <div className="bp-info-list">
                                    <div className="bp-info-item">
                                        <div className="bp-info-icon email">
                                            <i className="bi bi-envelope"></i>
                                        </div>
                                        <div className="bp-info-details">
                                            <span className="bp-info-label">Email Address</span>
                                            <span className="bp-info-value">{bidder.email}</span>
                                        </div>
                                    </div>
                                    <div className="bp-info-item">
                                        <div className="bp-info-icon phone">
                                            <i className="bi bi-telephone"></i>
                                        </div>
                                        <div className="bp-info-details">
                                            <span className="bp-info-label">Phone Number</span>
                                            <span className="bp-info-value">{bidder.phone || "—"}</span>
                                        </div>
                                    </div>
                                    <div className="bp-info-item">
                                        <div className="bp-info-icon location">
                                            <i className="bi bi-geo-alt"></i>
                                        </div>
                                        <div className="bp-info-details">
                                            <span className="bp-info-label">Mailing Address</span>
                                            <span className="bp-info-value">{fullAddress}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Recent Activity (linked properties as activity) */}
                            <div className="bp-info-card">
                                <h3>Recent Activity</h3>
                                <div className="bp-activity-list">
                                    {loadingProps ? (
                                        <div style={{ color: "#6B7280", padding: "12px 0" }}>Loading...</div>
                                    ) : linkedProperties.length === 0 ? (
                                        <div style={{ color: "#6B7280", padding: "12px 0" }}>No linked properties yet.</div>
                                    ) : (
                                        linkedProperties.slice(0, 5).map((p, idx) => (
                                            <div className="bp-activity-item" key={p.id}>
                                                <div className={`bp-activity-dot ${idx % 3 === 0 ? "bid" : idx % 3 === 1 ? "payment" : "link"}`}></div>
                                                <div className="bp-activity-content">
                                                    <h4>Linked to property</h4>
                                                    <p>{p.address || "Property"}{p.parcelId ? ` • ${p.parcelId}` : ""}</p>
                                                    <span className="bp-activity-time">
                                                        <Link
                                                            href={`/property-details/${p.id}`}
                                                            style={{ color: "#6EA500", textDecoration: "none", fontWeight: 600 }}
                                                        >
                                                            View property →
                                                        </Link>
                                                    </span>
                                                </div>
                                            </div>
                                        ))
                                    )}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Properties & Bids Tab */}
                    {activeTab === "properties" && (
                        <div>
                            <h3 style={{ fontSize: "18px", fontWeight: "700", color: "#1A1A1A", marginBottom: "20px" }}>
                                Associated Properties
                            </h3>
                            {loadingProps ? (
                                <div style={{ padding: "40px", color: "#6B7280", textAlign: "center" }}>Loading properties...</div>
                            ) : linkedProperties.length === 0 ? (
                                <div style={{ padding: "40px", color: "#6B7280", textAlign: "center" }}>No linked properties found.</div>
                            ) : (
                                <div className="bp-properties-table-wrapper">
                                    <table className="bp-properties-table">
                                        <thead>
                                            <tr>
                                                <th>Address</th>
                                                <th>Parcel ID</th>
                                                <th>City</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {linkedProperties.map((p) => (
                                                <tr key={p.id}>
                                                    <td>
                                                        <div className="bp-address-cell">
                                                            <div className="bp-address-main">{p.address || "—"}</div>
                                                        </div>
                                                    </td>
                                                    <td>{p.parcelId || "—"}</td>
                                                    <td>{p.city || "—"}</td>
                                                    <td>
                                                        <Link
                                                            href={`/property-details/${p.id}`}
                                                            style={{
                                                                display: "inline-flex",
                                                                alignItems: "center",
                                                                gap: "6px",
                                                                padding: "8px 16px",
                                                                background: "#6EA500",
                                                                color: "#fff",
                                                                borderRadius: "8px",
                                                                fontWeight: 700,
                                                                fontSize: "13px",
                                                                textDecoration: "none",
                                                            }}
                                                        >
                                                            View <i className="bi bi-arrow-right"></i>
                                                        </Link>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            )}
                        </div>
                    )}

                    {/* Communication Log Tab */}
                    {activeTab === "communication" && (
                        <div className="bp-communication-container">
                            <div className="bp-communication-wrapper">
                                <div className="bp-communication-header">
                                    <div>
                                        <h3 className="bp-communication-title">Communication Log</h3>
                                        <p className="bp-communication-subtitle">All communications with this bidder</p>
                                    </div>
                                    {linkedProperties.length > 0 && (
                                        <button className="bp-new-message-btn" onClick={openMessageModal}>
                                            <i className="bi bi-send"></i>
                                            Send Alert
                                        </button>
                                    )}
                                </div>
                                <div style={{ padding: "24px 0", color: "#6B7280", textAlign: "center" }}>
                                    No communication history available.
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <Footer />

            {/* Message Modal */}
            {showMsgModal && (
                <div className="app-modal-overlay" onClick={() => setShowMsgModal(false)}>
                    <div
                        className="app-modal"
                        onClick={(e) => e.stopPropagation()}
                        style={{ maxWidth: "600px" }}
                    >
                        <div className="app-modal-header">
                            <div>
                                <h2 className="app-modal-title">Send Message</h2>
                                <p style={{ fontSize: "13px", color: "#6B7280", marginTop: "4px" }}>
                                    To: <strong>{bidder.name || bidder.email}</strong>
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
                            {linkedProperties.length === 0 ? (
                                <div style={{ padding: "10px 0", color: "#B91C1C" }}>
                                    No linked properties found. Cannot send message.
                                </div>
                            ) : (
                                <>
                                    <div style={{ marginBottom: "16px" }}>
                                        <label style={{ display: "block", marginBottom: "6px", fontWeight: 700 }}>About Property</label>
                                        {linkedProperties.length === 1 ? (
                                            <div style={{ padding: "12px", border: "1px solid #E5E7EB", borderRadius: "10px", background: "#F9FAFB", color: "#374151" }}>
                                                {linkedProperties[0].address || "Property"}{linkedProperties[0].parcelId ? ` (${linkedProperties[0].parcelId})` : ""}
                                            </div>
                                        ) : (
                                            <select
                                                value={selectedPropertyId}
                                                onChange={(e) => {
                                                    const pid = e.target.value;
                                                    setSelectedPropertyId(pid);
                                                    const p = linkedProperties.find((x) => x.id === pid);
                                                    if (p) setMsgSubject(`Alert for ${p.address || "Property"}`);
                                                    else setMsgSubject("");
                                                }}
                                                style={{
                                                    width: "100%",
                                                    padding: "12px",
                                                    border: "1px solid #E5E7EB",
                                                    borderRadius: "10px",
                                                    fontSize: "14px",
                                                }}
                                            >
                                                <option value="">Select a property...</option>
                                                {linkedProperties.map((p) => (
                                                    <option key={p.id} value={p.id}>
                                                        {p.address || "Property"} {p.parcelId ? `(${p.parcelId})` : ""}
                                                    </option>
                                                ))}
                                            </select>
                                        )}
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
                                                fontSize: "14px",
                                                resize: "vertical",
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
                                                cursor: sendingMsg || !selectedPropertyId ? "not-allowed" : "pointer",
                                                fontWeight: 800,
                                                opacity: sendingMsg || !selectedPropertyId ? 0.7 : 1,
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
