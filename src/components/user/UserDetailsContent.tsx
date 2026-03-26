"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import DashboardNav from "@/components/dashboard/DashboardNav";
import Footer from "@/components/footer/Footer";
import { formatPhoneNumber } from "@/lib/format";

const avatarFallback = "/assets/img/avatar-placeholder.svg";

type UserDetail = {
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
    type: "bidder" | "county" | null;
    createdAt?: string | null;
};

type LinkedProperty = {
    id: string;
    address: string | null;
    parcelId: string | null;
    city: string | null;
};

type CountyProperty = {
    id: string;
    title: string | null;
    address: string | null;
    parcelId: string | null;
    city: string | null;
    status: string | null;
};

function formatMemberSince(dateStr?: string | null): string {
    if (!dateStr) return "—";
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return "—";
    return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

function buildAddress(u: UserDetail): string {
    const parts = [u.address, u.city, u.state].filter(Boolean);
    return parts.join(", ") || "—";
}

export default function UserDetailsContent({ id }: { id: string }) {
    const [activeTab, setActiveTab] = useState<"overview" | "properties">("overview");
    const [userData, setUserData] = useState<UserDetail | null>(null);
    const [loading, setLoading] = useState(true);
    const [linkedProperties, setLinkedProperties] = useState<LinkedProperty[]>([]);
    const [countyProperties, setCountyProperties] = useState<CountyProperty[]>([]);
    const [loadingProps, setLoadingProps] = useState(false);

    // Message modal
    const [showMsgModal, setShowMsgModal] = useState(false);
    const [selectedPropertyId, setSelectedPropertyId] = useState("");
    const [msgSubject, setMsgSubject] = useState("");
    const [msgBody, setMsgBody] = useState("");
    const [sendingMsg, setSendingMsg] = useState(false);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await fetch(`/api/users/${id}`);
                if (res.ok) {
                    const data = await res.json();
                    setUserData(data);
                }
            } catch (e) {
                console.error("Error fetching user:", e);
            } finally {
                setLoading(false);
            }
        };
        fetchUser();
    }, [id]);

    // Fetch linked properties for bidders
    useEffect(() => {
        if (!userData || userData.type !== "bidder") return;
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
    }, [id, userData]);

    // Fetch created properties for county users
    useEffect(() => {
        if (!userData || userData.type !== "county") return;
        const fetchCountyProps = async () => {
            setLoadingProps(true);
            try {
                const res = await fetch(`/api/users/county/${id}/properties`);
                if (res.ok) {
                    const data = await res.json();
                    setCountyProperties(Array.isArray(data) ? data : []);
                }
            } catch (e) {
                console.error("Error fetching county properties:", e);
            } finally {
                setLoadingProps(false);
            }
        };
        fetchCountyProps();
    }, [id, userData]);

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

    const isBidder = userData?.type === "bidder";
    const isCounty = userData?.type === "county";

    if (loading) {
        return (
            <div className="dashboard-wrapper">
                <DashboardNav activeTab="bidders" />
                <div className="bp-main-content">
                    <div className="container">
                        <div style={{ padding: "40px", color: "#6B7280", textAlign: "center" }}>
                            Loading user details...
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        );
    }

    if (!userData) {
        return (
            <div className="dashboard-wrapper">
                <DashboardNav activeTab="bidders" />
                <div className="bp-main-content">
                    <div className="container">
                        <div style={{ padding: "40px", color: "#B91C1C", textAlign: "center" }}>User not found.</div>
                    </div>
                </div>
                <Footer />
            </div>
        );
    }

    const fullAddress = buildAddress(userData);
    const memberSince = formatMemberSince(userData.createdAt);

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
                        {/* User type badge – top right */}
                        <span
                            className="bp-status-badge active"
                            style={
                                isCounty
                                    ? { background: "#DBEAFE", color: "#1D4ED8" }
                                    : {}
                            }
                        >
                            {isCounty ? "County" : "Active"}
                        </span>

                        <div className="bp-profile-header">
                            <div className="bp-avatar-section">
                                {/* Avatar */}
                                <div className="bp-avatar">
                                    <img
                                        src={userData.image || avatarFallback}
                                        alt={userData.name || "User"}
                                        onError={(e) => {
                                            (e.currentTarget as HTMLImageElement).src = avatarFallback;
                                        }}
                                    />
                                </div>

                                <div className="bp-basic-info">
                                    <h1 className="bp-name">{userData.name || "—"}</h1>
                                    {isCounty && (
                                        <p className="bp-bidder-id">County Official</p>
                                    )}

                                    {/* Contact Icons */}
                                    <div className="bp-contact-icons">
                                        <div className="bp-contact-icon-item">
                                            <div className="bp-icon-box email">
                                                <i className="bi bi-envelope"></i>
                                            </div>
                                            <div className="bp-icon-text">
                                                <span className="bp-label">Email</span>
                                                <span className="bp-value">{userData.email}</span>
                                            </div>
                                        </div>
                                        {userData.phone && (
                                            <div className="bp-contact-icon-item">
                                                <div className="bp-icon-box phone">
                                                    <i className="bi bi-telephone"></i>
                                                </div>
                                                <div className="bp-icon-text">
                                                    <span className="bp-label">Phone</span>
                                                    <span className="bp-value">{formatPhoneNumber(userData.phone)}</span>
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
                                        {isBidder && (
                                            <div className="bp-contact-icon-item">
                                                <div className="bp-icon-box" style={{ background: "#EDE9FE" }}>
                                                    <i className="bi bi-building" style={{ color: "#7C3AED" }}></i>
                                                </div>
                                                <div className="bp-icon-text">
                                                    <span className="bp-label">Linked Properties</span>
                                                    <span className="bp-value">{loadingProps ? "…" : linkedProperties.length}</span>
                                                </div>
                                            </div>
                                        )}
                                        {isCounty && (
                                            <div className="bp-contact-icon-item">
                                                <div className="bp-icon-box" style={{ background: "#EDE9FE" }}>
                                                    <i className="bi bi-building" style={{ color: "#7C3AED" }}></i>
                                                </div>
                                                <div className="bp-icon-text">
                                                    <span className="bp-label">Properties Added</span>
                                                    <span className="bp-value">{loadingProps ? "…" : countyProperties.length}</span>
                                                </div>
                                            </div>
                                        )}
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
                                {isBidder && linkedProperties.length > 0 && (
                                    <button className="bp-btn primary" onClick={openMessageModal}>
                                        <i className="bi bi-chat-dots"></i>
                                        Send Message
                                    </button>
                                )}
                                {isBidder && (
                                    <Link href={`/edit-bidder/${userData.id}`} className="bp-btn secondary">
                                        <i className="bi bi-pencil"></i>
                                        Edit Profile
                                    </Link>
                                )}
                                
                            </div>
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
                        {(isBidder || isCounty) && (
                            <button
                                className={`bp-tab ${activeTab === "properties" ? "active" : ""}`}
                                onClick={() => setActiveTab("properties")}
                            >
                                Properties
                            </button>
                        )}
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
                                            <span className="bp-info-value">{userData.email}</span>
                                        </div>
                                    </div>
                                    <div className="bp-info-item">
                                        <div className="bp-info-icon phone">
                                            <i className="bi bi-telephone"></i>
                                        </div>
                                        <div className="bp-info-details">
                                            <span className="bp-info-label">Phone Number</span>
                                            <span className="bp-info-value">{formatPhoneNumber(userData.phone) || "—"}</span>
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

                            {/* Recent Activity */}
                            <div className="bp-info-card">
                                <h3>Recent Activity</h3>
                                <div className="bp-activity-list">
                                    {loadingProps ? (
                                        <div style={{ color: "#6B7280", padding: "12px 0" }}>Loading...</div>
                                    ) : isBidder ? (
                                        linkedProperties.length === 0 ? (
                                            <div style={{ color: "#6B7280", padding: "12px 0" }}>
                                                No linked properties yet.
                                            </div>
                                        ) : (
                                            linkedProperties.slice(0, 5).map((p, idx) => (
                                                <div className="bp-activity-item" key={p.id}>
                                                    <div
                                                        className={`bp-activity-dot ${idx % 3 === 0 ? "bid" : idx % 3 === 1 ? "payment" : "link"}`}
                                                    ></div>
                                                    <div className="bp-activity-content">
                                                        <h4>Linked to property</h4>
                                                        <p>
                                                            {p.address || "Property"}
                                                            {p.parcelId ? ` • ${p.parcelId}` : ""}
                                                        </p>
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
                                        )
                                    ) : isCounty ? (
                                        countyProperties.length === 0 ? (
                                            <div style={{ color: "#6B7280", padding: "12px 0" }}>
                                                No properties added yet.
                                            </div>
                                        ) : (
                                            countyProperties.slice(0, 5).map((p, idx) => (
                                                <div className="bp-activity-item" key={p.id}>
                                                    <div
                                                        className={`bp-activity-dot ${idx % 3 === 0 ? "bid" : idx % 3 === 1 ? "payment" : "link"}`}
                                                    ></div>
                                                    <div className="bp-activity-content">
                                                        <h4>{p.title || "Property"}</h4>
                                                        <p>
                                                            {p.address || "—"}
                                                            {p.parcelId ? ` • ${p.parcelId}` : ""}
                                                        </p>
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
                                        )
                                    ) : (
                                        <div style={{ color: "#6B7280", padding: "12px 0" }}>No activity.</div>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Properties Tab */}
                    {activeTab === "properties" && (isBidder || isCounty) && (
                        <div>
                            <h3 style={{ fontSize: "18px", fontWeight: "700", color: "#1A1A1A", marginBottom: "20px" }}>
                                {isCounty ? "Added Properties" : "Associated Properties"}
                            </h3>
                            {loadingProps ? (
                                <div style={{ padding: "40px", color: "#6B7280", textAlign: "center" }}>
                                    Loading properties...
                                </div>
                            ) : isCounty ? (
                                countyProperties.length === 0 ? (
                                    <div style={{ padding: "40px", color: "#6B7280", textAlign: "center" }}>
                                        No properties added yet.
                                    </div>
                                ) : (
                                    <div className="bp-properties-table-wrapper">
                                        <table className="bp-properties-table">
                                            <thead>
                                                <tr>
                                                    <th>Title</th>
                                                    <th>Address</th>
                                                    <th>Parcel ID</th>
                                                    <th>City</th>
                                                    <th>Status</th>
                                                    <th>Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {countyProperties.map((p) => (
                                                    <tr key={p.id}>
                                                        <td>{p.title || "—"}</td>
                                                        <td>
                                                            <div className="bp-address-cell">
                                                                <div className="bp-address-main">{p.address || "—"}</div>
                                                            </div>
                                                        </td>
                                                        <td>{p.parcelId || "—"}</td>
                                                        <td>{p.city || "—"}</td>
                                                        <td>
                                                            <span style={{
                                                                display: "inline-block",
                                                                padding: "2px 10px",
                                                                borderRadius: "12px",
                                                                fontSize: "12px",
                                                                fontWeight: 600,
                                                                background: p.status === "active" ? "#DCFCE7" : "#F3F4F6",
                                                                color: p.status === "active" ? "#16A34A" : "#6B7280",
                                                                textTransform: "capitalize",
                                                            }}>
                                                                {p.status?.replace(/_/g, " ") || "—"}
                                                            </span>
                                                        </td>
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
                                )
                            ) : linkedProperties.length === 0 ? (
                                <div style={{ padding: "40px", color: "#6B7280", textAlign: "center" }}>
                                    No linked properties found.
                                </div>
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
                                    To: <strong>{userData.name || userData.email}</strong>
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
                                        <label style={{ display: "block", marginBottom: "6px", fontWeight: 700 }}>
                                            About Property
                                        </label>
                                        {linkedProperties.length === 1 ? (
                                            <div
                                                style={{
                                                    padding: "12px",
                                                    border: "1px solid #E5E7EB",
                                                    borderRadius: "10px",
                                                    background: "#F9FAFB",
                                                    color: "#374151",
                                                }}
                                            >
                                                {linkedProperties[0].address || "Property"}
                                                {linkedProperties[0].parcelId ? ` (${linkedProperties[0].parcelId})` : ""}
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
