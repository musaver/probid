"use client";
import React, { useMemo, useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react";
import DashboardNav from "@/components/dashboard/DashboardNav";
import Footer from "@/components/footer/Footer";

const PropertiesContent = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const { data: session } = useSession();
    const isCounty = session?.user?.type === "county";
    const [properties, setProperties] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState(searchParams.get("q") || "");
    const endingSoon = searchParams.get("endingSoon") === "1";

    const buildQueryString = () => {
        const params = new URLSearchParams();
        const q = search.trim();
        if (q) params.set("q", q);
        if (endingSoon) params.set("endingSoon", "1");
        const qs = params.toString();
        return qs ? `?${qs}` : "";
    };

    const [showBidModal, setShowBidModal] = useState(false);
    const [bidProperty, setBidProperty] = useState<any>(null);
    const [bidHistory, setBidHistory] = useState<any[]>([]);
    const [linkedBidders, setLinkedBidders] = useState<any[]>([]);
    const [selectedBidderId, setSelectedBidderId] = useState<string>("");
    const [bidAmount, setBidAmount] = useState<string>("");
    const [loadingBidData, setLoadingBidData] = useState(false);
    const [submittingBid, setSubmittingBid] = useState(false);

    useEffect(() => {
        const fetchProperties = async () => {
            try {
                const response = await fetch(`/api/properties${buildQueryString()}`);
                if (response.ok) {
                    const data = await response.json();
                    setProperties(data);
                } else {
                    console.error("Failed to fetch properties");
                }
            } catch (error) {
                console.error("Error fetching properties:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchProperties();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [search, endingSoon]);

    const refreshProperties = async () => {
        try {
            const response = await fetch(`/api/properties${buildQueryString()}`);
            if (response.ok) setProperties(await response.json());
        } catch (e) {
            console.error("Error refreshing properties:", e);
        }
    };

    const handleViewProperty = (id: string) => {
        router.push(`/property-details/${id}`);
    };

    const handleEditProperty = (id: string) => {
        router.push(`/edit-property/${id}`);
    };

    const openBidModal = async (property: any) => {
        setBidProperty(property);
        setShowBidModal(true);
        setBidAmount("");
        setBidHistory([]);
        setLinkedBidders([]);
        setSelectedBidderId("");
        setLoadingBidData(true);
        try {
            const [bidsRes, linkedRes] = await Promise.all([
                fetch(`/api/properties/${property.id}/bids`),
                fetch(`/api/properties/${property.id}/linked-bidders`),
            ]);

            if (bidsRes.ok) setBidHistory(await bidsRes.json());
            if (linkedRes.ok) {
                const linked = await linkedRes.json();
                setLinkedBidders(linked);
                if (linked?.length) setSelectedBidderId(linked[0].bidderId);
            }
        } catch (e) {
            console.error("Error loading bid data:", e);
        } finally {
            setLoadingBidData(false);
        }
    };

    const submitBid = async () => {
        if (!bidProperty?.id) return;
        if (!selectedBidderId) {
            alert("Select a linked bidder first.");
            return;
        }
        setSubmittingBid(true);
        try {
            const res = await fetch(`/api/properties/${bidProperty.id}/bids`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ amount: bidAmount, bidderId: selectedBidderId }),
            });
            if (!res.ok) {
                const text = await res.text();
                alert(text || "Failed to add bid");
                return;
            }
            // refresh history + currentBid
            const [bidsRes] = await Promise.all([fetch(`/api/properties/${bidProperty.id}/bids`)]);
            if (bidsRes.ok) setBidHistory(await bidsRes.json());
            await refreshProperties();
            setBidAmount("");
        } catch (e) {
            console.error("Error submitting bid:", e);
            alert("Failed to add bid");
        } finally {
            setSubmittingBid(false);
        }
    };

    return (
        <div className="dashboard-wrapper">
            <DashboardNav activeTab="properties" />

            <div className="dashboard-content" style={{ background: '#FFFFFF' }}>
                <div className="container">
                    <div className="property-header">
                        <div className="search-filter-area">
                            <div className="search-input-wrapper">
                                <i className="bi bi-search"></i>
                                <input
                                    type="text"
                                    placeholder="Search properties..."
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                />
                            </div>
                        </div>
                        <Link href="/add-property" className="add-property-btn">
                            <i className="bi bi-plus-circle"></i> Add Property
                        </Link>
                    </div>

                    <div className="properties-table-section">
                        <h3>All Properties</h3>
                        {endingSoon && (
                            <div
                                style={{
                                    marginTop: "12px",
                                    border: "1px solid rgba(245, 158, 11, 0.35)",
                                    background: "rgba(245, 158, 11, 0.10)",
                                    borderRadius: "14px",
                                    padding: "12px 14px",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "space-between",
                                    gap: "12px",
                                }}
                            >
                                <div style={{ display: "flex", alignItems: "center", gap: "10px", minWidth: 0 }}>
                                    <div
                                        style={{
                                            width: "36px",
                                            height: "36px",
                                            borderRadius: "999px",
                                            background: "rgba(245, 158, 11, 0.18)",
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            flexShrink: 0,
                                        }}
                                    >
                                        <i className="bi bi-clock-history" style={{ color: "#B45309", fontSize: "18px" }} />
                                    </div>
                                    <div style={{ minWidth: 0 }}>
                                        <div style={{ fontWeight: 900, color: "#111827", fontSize: "14px" }}>
                                            Ending soon filter
                                        </div>
                                        <div style={{ color: "#6B7280", fontSize: "13px", marginTop: "2px" }}>
                                            Showing auctions ending in the next 48 hours.
                                        </div>
                                    </div>
                                </div>

                                <button
                                    type="button"
                                    onClick={() => router.push("/properties")}
                                    style={{
                                        background: "#fff",
                                        border: "1px solid rgba(17, 24, 39, 0.12)",
                                        color: "#111827",
                                        fontWeight: 800,
                                        cursor: "pointer",
                                        padding: "10px 14px",
                                        borderRadius: "999px",
                                        display: "flex",
                                        alignItems: "center",
                                        gap: "8px",
                                        flexShrink: 0,
                                    }}
                                    aria-label="Clear ending soon filter"
                                >
                                    Clear <i className="bi bi-x-lg" style={{ fontSize: "12px" }} />
                                </button>
                            </div>
                        )}
                        <div className="table-responsive">
                            <table className="properties-table">
                                <thead>
                                    <tr>
                                        <th>Parcel ID</th>
                                        <th>Address</th>
                                        <th>City</th>
                                        <th>Min Bid</th>
                                        <th>Current Bid</th>
                                        <th>Status</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {loading ? (
                                        <tr>
                                            <td colSpan={7} style={{ textAlign: "center", padding: "20px" }}>
                                                Loading properties...
                                            </td>
                                        </tr>
                                    ) : properties.length === 0 ? (
                                        <tr>
                                            <td colSpan={7} style={{ textAlign: "center", padding: "20px" }}>
                                                No properties found.
                                            </td>
                                        </tr>
                                    ) : (
                                        properties.map((property) => (
                                            <tr key={property.id}>
                                                <td data-label="Parcel ID">{property.parcelId || "-"}</td>
                                                <td data-label="Address">{property.address}</td>
                                                <td data-label="City">{property.city || "-"}</td>
                                                <td data-label="Min Bid">{property.minBid || "-"}</td>
                                                <td data-label="Current Bid">{property.currentBid || "-"}</td>
                                                <td data-label="Status">
                                                    <span className={`status-badge ${property.status?.toLowerCase()}`}>
                                                        {property.status}
                                                    </span>
                                                </td>
                                                <td data-label="Actions">
                                                    <div className="action-buttons">
                                                        <button
                                                            className="action-btn view"
                                                            onClick={() => handleViewProperty(property.id)}
                                                            title="View Property"
                                                        >
                                                            <i className="bi bi-eye"></i>
                                                        </button>
                                                        <button
                                                            className="action-btn edit"
                                                            title="Edit Property"
                                                            onClick={() => handleEditProperty(property.id)}
                                                        >
                                                            <i className="bi bi-pencil"></i>
                                                        </button>
                                                        {isCounty && (
                                                            <button
                                                                className="action-btn"
                                                                title="Add Bid (County)"
                                                                onClick={() => openBidModal(property)}
                                                            >
                                                                <i className="bi bi-hammer"></i>
                                                            </button>
                                                        )}
                                                        <button className="action-btn delete" title="Delete Property">
                                                            <i className="bi bi-trash"></i>
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

            {showBidModal && (
                <div
                    className="app-modal-overlay"
                    onClick={() => setShowBidModal(false)}
                >
                    <div
                        className="app-modal app-modal--md"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="app-modal-header">
                            <div style={{ minWidth: 0 }}>
                                <h2 className="app-modal-title">Add Bid</h2>
                                <div className="app-modal-subtitle" style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                                    {bidProperty?.address || "Property"}
                                </div>
                            </div>
                            <button
                                onClick={() => setShowBidModal(false)}
                                className="app-modal-close"
                                aria-label="Close"
                            >
                                ×
                            </button>
                        </div>

                        {loadingBidData ? (
                            <div style={{ padding: "20px", color: "#6B7280" }}>Loading...</div>
                        ) : (
                            <>
                                <div style={{ marginTop: "16px" }}>
                                    <label style={{ display: "block", marginBottom: "8px", fontWeight: 600 }}>
                                        Linked Bidder
                                    </label>
                                    {linkedBidders.length === 0 ? (
                                        <div style={{ padding: "12px", background: "#F9FAFB", borderRadius: "10px", color: "#6B7280" }}>
                                            No linked bidders. Link a bidder to this property first.
                                        </div>
                                    ) : (
                                        <select
                                            value={selectedBidderId}
                                            onChange={(e) => setSelectedBidderId(e.target.value)}
                                            style={{
                                                width: "100%",
                                                padding: "12px",
                                                border: "1px solid #E5E7EB",
                                                borderRadius: "10px",
                                            }}
                                        >
                                            {linkedBidders.map((b) => (
                                                <option key={b.bidderId} value={b.bidderId}>
                                                    {(b.name || "Unknown") + " — " + b.email}
                                                </option>
                                            ))}
                                        </select>
                                    )}
                                </div>

                                <div style={{ marginTop: "16px" }}>
                                    <label style={{ display: "block", marginBottom: "8px", fontWeight: 600 }}>
                                        Bid Amount
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="50000"
                                        value={bidAmount}
                                        onChange={(e) => setBidAmount(e.target.value)}
                                        style={{
                                            width: "100%",
                                            padding: "12px",
                                            border: "1px solid #E5E7EB",
                                            borderRadius: "10px",
                                        }}
                                    />
                                </div>

                                <div style={{ marginTop: "16px", display: "flex", gap: "10px" }}>
                                    <button
                                        onClick={submitBid}
                                        disabled={submittingBid || linkedBidders.length === 0}
                                        style={{
                                            padding: "12px 16px",
                                            background: "#6EA500",
                                            color: "#fff",
                                            border: "none",
                                            borderRadius: "10px",
                                            cursor: "pointer",
                                            fontWeight: 700,
                                            flex: 1,
                                        }}
                                    >
                                        {submittingBid ? "Adding..." : "Add Bid"}
                                    </button>
                                    <button
                                        onClick={() => setShowBidModal(false)}
                                        style={{
                                            padding: "12px 16px",
                                            background: "#F3F4F6",
                                            color: "#111827",
                                            border: "1px solid #E5E7EB",
                                            borderRadius: "10px",
                                            cursor: "pointer",
                                            fontWeight: 700,
                                        }}
                                    >
                                        Close
                                    </button>
                                </div>

                                <div style={{ marginTop: "22px" }}>
                                    <h3 style={{ margin: "0 0 10px 0" }}>Bid History</h3>
                                    {bidHistory.length === 0 ? (
                                        <div style={{ padding: "12px", color: "#6B7280" }}>No bids yet.</div>
                                    ) : (
                                        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                                            {bidHistory.map((bid) => (
                                                <div
                                                    key={bid.id}
                                                    style={{
                                                        display: "flex",
                                                        justifyContent: "space-between",
                                                        alignItems: "center",
                                                        padding: "12px",
                                                        border: "1px solid #E5E7EB",
                                                        borderRadius: "12px",
                                                    }}
                                                >
                                                    <div>
                                                        <div style={{ fontWeight: 700 }}>
                                                            {bid.bidderName || bid.bidderEmail || bid.bidderId}
                                                        </div>
                                                        <div style={{ fontSize: "12px", color: "#6B7280" }}>
                                                            {bid.createdAt ? new Date(bid.createdAt).toLocaleString() : ""}
                                                        </div>
                                                    </div>
                                                    <div style={{ fontWeight: 800, color: "#6EA500" }}>
                                                        ${Number(bid.amount).toLocaleString()}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default PropertiesContent;
