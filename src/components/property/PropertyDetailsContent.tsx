"use client";
import React, { useMemo, useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import DashboardNav from "@/components/dashboard/DashboardNav";
import Footer from "@/components/footer/Footer";
import { useSession } from "next-auth/react";
import PropertyDocumentsManager from "@/components/property/PropertyDocumentsManager";

const PropertyDetailsContent = ({ id }: { id: string }) => {
    const { data: session } = useSession();
    const isCounty = session?.user?.type === "county";
    const avatarFallback = "/assets/img/avatar-placeholder.svg";
    const [activeTab, setActiveTab] = useState("overview");
    const [property, setProperty] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [bids, setBids] = useState<any[]>([]);
    const [loadingBids, setLoadingBids] = useState(false);

    // Add Bid (county-only)
    const [showBidModal, setShowBidModal] = useState(false);
    const [bidAmount, setBidAmount] = useState<string>("");
    const [selectedBidderId, setSelectedBidderId] = useState<string>("");
    const [loadingBidData, setLoadingBidData] = useState(false);
    const [submittingBid, setSubmittingBid] = useState(false);

    const [showAlertModal, setShowAlertModal] = useState(false);
    const [alertSubject, setAlertSubject] = useState("");
    const [alertMessage, setAlertMessage] = useState("");
    const [sendingAlert, setSendingAlert] = useState(false);
    const [alertBidderIds, setAlertBidderIds] = useState<string[]>([]);

    useEffect(() => {
        if (!showAlertModal) return;
        // Initialize selection when opening (default: all linked bidders)
        setAlertBidderIds(linkedBidders.map((b) => b.bidderId));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [showAlertModal]);

    useEffect(() => {
        const fetchProperty = async () => {
            try {
                const response = await fetch(`/api/properties/${id}`);
                if (response.ok) {
                    const data = await response.json();
                    setProperty(data);
                } else {
                    console.error("Failed to fetch property");
                }
            } catch (error) {
                console.error("Error fetching property:", error);
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchProperty();
        }
    }, [id]);

    // Fetch bid history
    useEffect(() => {
        const fetchBids = async () => {
            if (!id) return;
            setLoadingBids(true);
            try {
                const response = await fetch(`/api/properties/${id}/bids`);
                if (response.ok) {
                    const data = await response.json();
                    setBids(data);
                } else {
                    setBids([]);
                }
            } catch (error) {
                console.error("Error fetching bids:", error);
                setBids([]);
            } finally {
                setLoadingBids(false);
            }
        };
        fetchBids();
    }, [id]);

    const [linkedBidders, setLinkedBidders] = useState<any[]>([]);
    const [loadingBidders, setLoadingBidders] = useState(false);
    const [showLinkModal, setShowLinkModal] = useState(false);
    const [searchEmail, setSearchEmail] = useState("");
    const [searchResults, setSearchResults] = useState<any[]>([]);
    const [searchingUsers, setSearchingUsers] = useState(false);

    const refreshProperty = async () => {
        try {
            const res = await fetch(`/api/properties/${id}`);
            if (res.ok) setProperty(await res.json());
        } catch { }
    };

    const refreshBids = async () => {
        try {
            const res = await fetch(`/api/properties/${id}/bids`);
            if (res.ok) setBids(await res.json());
            else setBids([]);
        } catch {
            setBids([]);
        }
    };

    const refreshLinkedBidders = async () => {
        try {
            const res = await fetch(`/api/properties/${id}/linked-bidders`);
            if (res.ok) setLinkedBidders(await res.json());
            else setLinkedBidders([]);
        } catch {
            setLinkedBidders([]);
        }
    };

    const openBidModal = async () => {
        if (!isCounty) return;
        setShowBidModal(true);
        setBidAmount("");
        setLoadingBidData(true);
        try {
            const [bidsRes, linkedRes] = await Promise.all([
                fetch(`/api/properties/${id}/bids`),
                fetch(`/api/properties/${id}/linked-bidders`),
            ]);
            if (bidsRes.ok) setBids(await bidsRes.json());
            if (linkedRes.ok) {
                const linked = await linkedRes.json();
                setLinkedBidders(linked);
                if (Array.isArray(linked) && linked.length) setSelectedBidderId(linked[0].bidderId);
                else setSelectedBidderId("");
            }
            await refreshProperty();
        } catch (e) {
            console.error("Error loading bid data:", e);
        } finally {
            setLoadingBidData(false);
        }
    };

    const submitBid = async () => {
        if (!isCounty) return;
        if (!selectedBidderId) {
            alert("Select a linked bidder first.");
            return;
        }
        setSubmittingBid(true);
        try {
            const res = await fetch(`/api/properties/${id}/bids`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ amount: bidAmount, bidderId: selectedBidderId }),
            });
            if (!res.ok) {
                const text = await res.text();
                alert(text || "Failed to add bid");
                return;
            }
            await Promise.all([refreshBids(), refreshProperty()]);
            setBidAmount("");
        } catch (e) {
            console.error("Error submitting bid:", e);
            alert("Failed to add bid");
        } finally {
            setSubmittingBid(false);
        }
    };

    // Fetch linked bidders
    useEffect(() => {
        const fetchLinkedBidders = async () => {
            if (!id) return;

            setLoadingBidders(true);
            try {
                const response = await fetch(`/api/properties/${id}/linked-bidders`);
                if (response.ok) {
                    const data = await response.json();
                    setLinkedBidders(data);
                }
            } catch (error) {
                console.error("Error fetching linked bidders:", error);
            } finally {
                setLoadingBidders(false);
            }
        };

        if (id) {
            fetchLinkedBidders();
        }
    }, [id]);

    // Search users by email
    const handleSearchUsers = async () => {
        if (!searchEmail.trim()) {
            setSearchResults([]);
            return;
        }

        setSearchingUsers(true);
        try {
            const response = await fetch(`/api/users/search?email=${encodeURIComponent(searchEmail)}`);
            if (response.ok) {
                const data = await response.json();
                setSearchResults(data);
            }
        } catch (error) {
            console.error("Error searching users:", error);
        } finally {
            setSearchingUsers(false);
        }
    };

    // Link bidder to property
    const handleLinkBidder = async (bidderId: string) => {
        try {
            const response = await fetch(`/api/properties/${id}/linked-bidders`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ bidderId }),
            });

            if (response.ok) {
                // Refresh linked bidders
                const refreshResponse = await fetch(`/api/properties/${id}/linked-bidders`);
                if (refreshResponse.ok) {
                    const data = await refreshResponse.json();
                    setLinkedBidders(data);
                }
                setShowLinkModal(false);
                setSearchEmail("");
                setSearchResults([]);
            } else {
                const errorText = await response.text();
                alert(errorText || "Failed to link bidder");
            }
        } catch (error) {
            console.error("Error linking bidder:", error);
            alert("Failed to link bidder");
        }
    };

    // Unlink bidder from property
    const handleUnlinkBidder = async (bidderId: string) => {
        if (!confirm("Are you sure you want to unlink this bidder?")) return;

        try {
            const response = await fetch(`/api/properties/${id}/linked-bidders?bidderId=${bidderId}`, {
                method: "DELETE",
            });

            if (response.ok) {
                setLinkedBidders(linkedBidders.filter((b) => b.bidderId !== bidderId));
            } else {
                alert("Failed to unlink bidder");
            }
        } catch (error) {
            console.error("Error unlinking bidder:", error);
            alert("Failed to unlink bidder");
        }
    };


    const [visibilitySettings, setVisibilitySettings] = useState({
        minBid: true,
        currentBid: true,
        bidHistory: false,
        propertyStatus: true,
        bidderList: false,
        documents: true,
    });

    const toggleVisibility = (setting: keyof typeof visibilitySettings) => {
        setVisibilitySettings((prev) => ({
            ...prev,
            [setting]: !prev[setting],
        }));
    };

    const getVisibleCount = () => {
        return Object.values(visibilitySettings).filter(Boolean).length;
    };

    const auctionEndInfo = useMemo(() => {
        const raw = property?.auctionEnd;
        if (!raw) return { label: "Not set", relative: "" };
        const dt = new Date(raw);
        if (Number.isNaN(dt.getTime())) return { label: String(raw), relative: "" };

        const label = dt.toLocaleString(undefined, {
            weekday: "short",
            month: "short",
            day: "2-digit",
            year: "numeric",
            hour: "numeric",
            minute: "2-digit",
        });

        const diffMs = dt.getTime() - Date.now();
        if (!Number.isFinite(diffMs)) return { label, relative: "" };
        if (diffMs <= 0) return { label, relative: "Ended" };

        const totalMinutes = Math.floor(diffMs / 60000);
        const days = Math.floor(totalMinutes / (60 * 24));
        const hours = Math.floor((totalMinutes - days * 60 * 24) / 60);
        const minutes = Math.max(0, totalMinutes - days * 60 * 24 - hours * 60);

        const parts = [];
        if (days) parts.push(`${days}d`);
        if (hours || days) parts.push(`${hours}h`);
        parts.push(`${minutes}m`);

        return { label, relative: `Ends in ${parts.join(" ")}` };
    }, [property?.auctionEnd]);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="dashboard-wrapper">
            <DashboardNav activeTab="properties" />

            <div className="property-details-content">
                <div className="container">
                    <Link href="/properties" className="back-link">
                        <i className="bi bi-arrow-left"></i> Back to Properties
                    </Link>

                    <div className="property-header-card">
                        <div className="property-title-section">
                            <div className="property-icon">
                                <i className="bi bi-building" style={{ fontSize: '32px' }}></i>
                            </div>
                            <div className="property-title-info">
                                <h1>{property.title}</h1>
                                <p className="property-location">{property.city}, {property.zipCode}</p>
                                <p className="property-parcel">Parcel ID: {property.parcelId}</p>
                            </div>
                            <span className="status-badge-large active">{property.status}</span>
                        </div>

                        <div className="property-stats-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px', marginTop: '24px' }}>
                            <div className="stat-card-new" style={{
                                background: '#fff',
                                borderRadius: '16px',
                                padding: '24px',
                                display: 'flex',
                                alignItems: 'center',
                                border: '1px solid #E5E7EB',
                                boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)'
                            }}>
                                <div className="stat-icon-wrapper" style={{
                                    width: '56px',
                                    height: '56px',
                                    borderRadius: '50%',
                                    background: '#EEF2FF',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    marginRight: '16px',
                                    color: '#6EA500',
                                    flexShrink: 0
                                }}>
                                    <i className="bi bi-currency-dollar" style={{ fontSize: '28px' }}></i>
                                </div>
                                <div>
                                    <p style={{ fontSize: '12px', fontWeight: '700', textTransform: 'uppercase', color: '#111827', marginBottom: '4px', letterSpacing: '0.5px' }}>MINIMUM BID</p>
                                    <p style={{ fontSize: '24px', fontWeight: '700', color: '#6EA500', margin: 0 }}>{property.minBid}</p>
                                </div>
                            </div>

                            <div className="stat-card-new" style={{
                                background: '#fff',
                                borderRadius: '16px',
                                padding: '24px',
                                display: 'flex',
                                alignItems: 'center',
                                border: '1px solid #E5E7EB',
                                boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)'
                            }}>
                                <div className="stat-icon-wrapper" style={{
                                    width: '56px',
                                    height: '56px',
                                    borderRadius: '50%',
                                    background: '#EEF2FF',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    marginRight: '16px',
                                    color: '#6EA500',
                                    flexShrink: 0
                                }}>
                                    <i className="bi bi-hammer" style={{ fontSize: '24px' }}></i>
                                </div>
                                <div>
                                    <p style={{ fontSize: '12px', fontWeight: '700', textTransform: 'uppercase', color: '#111827', marginBottom: '4px', letterSpacing: '0.5px' }}>CURRENT BID</p>
                                    <p style={{ fontSize: '24px', fontWeight: '700', color: '#6EA500', margin: 0 }}>{property.currentBid}</p>
                                </div>
                            </div>

                            <div className="stat-card-new" style={{
                                background: '#fff',
                                borderRadius: '16px',
                                padding: '24px',
                                display: 'flex',
                                alignItems: 'center',
                                border: '1px solid #E5E7EB',
                                boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)'
                            }}>
                                <div className="stat-icon-wrapper" style={{
                                    width: '56px',
                                    height: '56px',
                                    borderRadius: '50%',
                                    background: '#EEF2FF',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    marginRight: '16px',
                                    color: '#6EA500',
                                    flexShrink: 0
                                }}>
                                    <i className="bi bi-building" style={{ fontSize: '24px' }}></i>
                                </div>
                                <div>
                                    <p style={{ fontSize: '12px', fontWeight: '700', textTransform: 'uppercase', color: '#111827', marginBottom: '4px', letterSpacing: '0.5px' }}>SQUARE FEET</p>
                                    <p style={{ fontSize: '24px', fontWeight: '700', color: '#6EA500', margin: 0 }}>{property.squareFeet}</p>
                                </div>
                            </div>

                            <div className="stat-card-new" style={{
                                background: '#fff',
                                borderRadius: '16px',
                                padding: '24px',
                                display: 'flex',
                                alignItems: 'center',
                                border: '1px solid #E5E7EB',
                                boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)'
                            }}>
                                <div className="stat-icon-wrapper" style={{
                                    width: '56px',
                                    height: '56px',
                                    borderRadius: '50%',
                                    background: '#EEF2FF',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    marginRight: '16px',
                                    color: '#6EA500',
                                    flexShrink: 0
                                }}>
                                    <i className="bi bi-calendar" style={{ fontSize: '24px' }}></i>
                                </div>
                                <div>
                                    <p style={{ fontSize: '12px', fontWeight: '700', textTransform: 'uppercase', color: '#111827', marginBottom: '4px', letterSpacing: '0.5px' }}>AUCTION ENDS</p>
                                    <p style={{ fontSize: '24px', fontWeight: '700', color: '#6EA500', margin: 0 }}>
                                        {property.auctionEnd ? new Date(property.auctionEnd).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : '-'}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="property-actions">
                            {isCounty && (
                                <Link href={`/edit-property/${id}`} className="action-btn-1 primary">
                                    <i className="bi bi-pencil-square"></i> Edit Property
                                </Link>
                            )}
                            {isCounty && (
                                <button className="action-btn-1 secondary" onClick={openBidModal}>
                                    <i className="bi bi-hammer"></i> Add Bid
                                </button>
                            )}
                            <button
                                className="action-btn-1 secondary"
                                onClick={() => {
                                    setShowAlertModal(true);
                                    setAlertSubject(`Update: ${property?.address || "Property"}`);
                                }}
                            >
                                <i className="bi bi-bell"></i> Send Alert
                            </button>
                        </div>
                    </div>

                    <div className="property-tabs">
                        <button
                            className={`tab-btn ${activeTab === "overview" ? "active" : ""}`}
                            onClick={() => setActiveTab("overview")}
                        >
                            Overview
                        </button>
                        <button
                            className={`tab-btn ${activeTab === "bidders" ? "active" : ""}`}
                            onClick={() => setActiveTab("bidders")}
                        >
                            Linked Bidders
                        </button>
                        <button
                            className={`tab-btn ${activeTab === "visibility" ? "active" : ""}`}
                            onClick={() => setActiveTab("visibility")}
                        >
                            Visibility Control
                        </button>
                        <button
                            className={`tab-btn ${activeTab === "documents" ? "active" : ""}`}
                            onClick={() => setActiveTab("documents")}
                        >
                            Documents
                        </button>
                    </div>

                    {activeTab === "overview" && (
                        <div className="property-details-grid">
                            <div className="details-section">
                                <div className="details-card">
                                    <h3>Property Details</h3>
                                    <div className="detail-group">
                                        <h4>Description</h4>
                                        <p>{property.description}</p>
                                    </div>
                                    <div className="detail-row">
                                        <div className="detail-item">
                                            <h4>Lot Size</h4>
                                            <p>{property.lotSize}</p>
                                        </div>
                                        <div className="detail-item">
                                            <h4>Year Built</h4>
                                            <p>{property.yearBuilt}</p>
                                        </div>
                                    </div>
                                    <div className="auction-timeline">
                                        <div className="timeline-icon">
                                            <i className="bi bi-clock"></i>
                                        </div>
                                        <div className="timeline-info">
                                            <h4>Auction Timeline</h4>
                                            <p>
                                                <span className="timeline-meta">Ends:</span>{" "}
                                                <span className="timeline-value">{auctionEndInfo.label}</span>
                                            </p>
                                            {auctionEndInfo.relative && (
                                                <div className="timeline-relative">{auctionEndInfo.relative}</div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="bidding-section">
                                <h3>Recent Bidding Activity</h3>
                                <div className="bidding-card">
                                    <div className="bidding-list">
                                        {loadingBids ? (
                                            <div style={{ padding: "20px", color: "#6B7280" }}>Loading bids...</div>
                                        ) : bids.length === 0 ? (
                                            <div style={{ padding: "20px", color: "#6B7280" }}>No bids yet.</div>
                                        ) : (
                                            bids.map((bid, index) => {
                                                const isHigh = index === 0;
                                                return (
                                                    <div key={bid.id || index} className="bid-item">
                                                <div className="bid-left">
                                                    <div className="bidder-dot"></div>
                                                    <div className="bid-info">
                                                                <h5>{bid.bidderName || bid.bidderEmail || bid.bidderId}</h5>
                                                                <p className="bid-amount">${bid.amount?.toLocaleString?.() ?? bid.amount}</p>
                                                                <p className="bid-date">
                                                                    {bid.createdAt ? new Date(bid.createdAt).toLocaleString() : ""}
                                                                </p>
                                                    </div>
                                                </div>
                                                <div className="bid-right">
                                                            <span className={`bid-status ${isHigh ? "current" : "outbid"}`}>
                                                                {isHigh ? "Current High" : "Outbid"}
                                                    </span>
                                                </div>
                                            </div>
                                                );
                                            })
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === "bidders" && (
                        <div className="linked-bidders-section">
                            <div className="linked-bidders-header">
                                <div className="header-text">
                                    <h2>Linked Bidders</h2>
                                    <p>Bidders who have access to this property</p>
                                </div>
                            </div>

                            {loadingBidders ? (
                                <div style={{ textAlign: "center", padding: "40px" }}>Loading bidders...</div>
                            ) : linkedBidders.length === 0 ? (
                                <div style={{ textAlign: "center", padding: "40px", color: "#6B7280" }}>
                                    No bidders linked to this property yet.
                                </div>
                            ) : (
                                <div className="bidders-grid">
                                    {linkedBidders.map((bidder, index) => (
                                        <div key={index} className="linked-bidder-card">
                                            <div className="bidder-details">
                                                <div className="bidder-avatar-large">
                                                    <img
                                                        src={bidder.image || avatarFallback}
                                                        alt={bidder.name || "Bidder"}
                                                        width={48}
                                                        height={48}
                                                        style={{ borderRadius: '50%', objectFit: 'cover' }}
                                                        onError={(e) => {
                                                            (e.currentTarget as HTMLImageElement).src = avatarFallback;
                                                        }}
                                                    />
                                                </div>
                                                <div className="bidder-info-text">
                                                    <h3>{bidder.name || "Unknown"}</h3>
                                                    <p className="bidder-email">{bidder.email}</p>
                                                    <p className="bidder-id">Status: {bidder.status}</p>
                                                </div>
                                            </div>
                                            <div className="bidder-actions">
                                                <button className="btn-view-profile">View Profile</button>
                                                <button
                                                    className="btn-unlink"
                                                    onClick={() => handleUnlinkBidder(bidder.bidderId)}
                                                >
                                                    Unlink
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {/* Link Bidder Modal */}
                            {showLinkModal && (
                                <div
                                    className="app-modal-overlay"
                                    onClick={() => {
                                        setShowLinkModal(false);
                                        setSearchEmail("");
                                        setSearchResults([]);
                                    }}
                                >
                                    <div
                                        className="app-modal app-modal--sm"
                                        onClick={(e) => e.stopPropagation()}
                                    >
                                        <div className="app-modal-header">
                                            <h2 className="app-modal-title">Link Bidder</h2>
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    setShowLinkModal(false);
                                                    setSearchEmail("");
                                                    setSearchResults([]);
                                                }}
                                                className="app-modal-close"
                                                aria-label="Close"
                                            >
                                                ×
                                            </button>
                                        </div>

                                        <div style={{ marginBottom: '20px' }}>
                                            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>
                                                Search by Email
                                            </label>
                                            <div style={{ display: 'flex', gap: '8px' }}>
                                                <input
                                                    type="email"
                                                    value={searchEmail}
                                                    onChange={(e) => setSearchEmail(e.target.value)}
                                                    onKeyPress={(e) => e.key === 'Enter' && handleSearchUsers()}
                                                    placeholder="Enter bidder email..."
                                                    style={{
                                                        flex: 1,
                                                        padding: '12px',
                                                        border: '1px solid #E5E7EB',
                                                        borderRadius: '8px',
                                                        fontSize: '14px'
                                                    }}
                                                />
                                                <button
                                                    onClick={handleSearchUsers}
                                                    disabled={searchingUsers}
                                                    style={{
                                                        padding: '12px 24px',
                                                        background: '#6EA500',
                                                        color: '#fff',
                                                        border: 'none',
                                                        borderRadius: '8px',
                                                        cursor: 'pointer',
                                                        fontWeight: '600'
                                                    }}
                                                >
                                                    {searchingUsers ? "Searching..." : "Search"}
                                                </button>
                                            </div>
                                        </div>

                                        {searchResults.length > 0 && (
                                            <div>
                                                <h3 style={{ fontSize: '14px', fontWeight: '600', marginBottom: '12px' }}>
                                                    Search Results
                                                </h3>
                                                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                                    {searchResults.map((user) => (
                                                        <div
                                                            key={user.id}
                                                            style={{
                                                                display: 'flex',
                                                                justifyContent: 'space-between',
                                                                alignItems: 'center',
                                                                padding: '12px',
                                                                border: '1px solid #E5E7EB',
                                                                borderRadius: '8px'
                                                            }}
                                                        >
                                                            <div>
                                                                <div style={{ fontWeight: '600' }}>{user.name || "Unknown"}</div>
                                                                <div style={{ fontSize: '12px', color: '#6B7280' }}>{user.email}</div>
                                                            </div>
                                                            <button
                                                                onClick={() => handleLinkBidder(user.id)}
                                                                style={{
                                                                    padding: '8px 16px',
                                                                    background: '#3B82F6',
                                                                    color: '#fff',
                                                                    border: 'none',
                                                                    borderRadius: '6px',
                                                                    cursor: 'pointer',
                                                                    fontSize: '14px'
                                                                }}
                                                            >
                                                                Link
                                                            </button>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        )}

                                        {searchEmail && searchResults.length === 0 && !searchingUsers && (
                                            <div style={{ textAlign: 'center', padding: '20px', color: '#6B7280' }}>
                                                No bidders found with that email.
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>
                    )}

                    {activeTab === "visibility" && (
                        <div className="visibility-control-section">
                            <div className="visibility-header">
                                <h2>Bidder Visibility Settings</h2>
                                <p>Control what information bidders can see for this property</p>
                            </div>

                            <div className="visibility-settings-grid">
                                {Object.entries(visibilitySettings).map(([key, value]) => (
                                    <div className="visibility-item" key={key}>
                                        <div className="visibility-info">
                                            <div className="visibility-icon" style={{ color: '#3B82F6' }}>
                                                <i className="bi bi-eye"></i>
                                            </div>
                                            <div className="visibility-text">
                                                <h4>{key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}</h4>
                                                <p>Show {key.replace(/([A-Z])/g, ' $1').toLowerCase()}</p>
                                            </div>
                                        </div>
                                        <label className="toggle-switch">
                                            <input
                                                type="checkbox"
                                                checked={value}
                                                onChange={() => toggleVisibility(key as keyof typeof visibilitySettings)}
                                            />
                                            <span className="slider"></span>
                                        </label>
                                    </div>
                                ))}
                            </div>

                            <div className="visibility-preview">
                                <span>
                                    <i className="bi bi-eye"></i>
                                    Visibility Preview
                                </span>
                                <p>Currently visible to bidders: <strong>{getVisibleCount()} of 6 items</strong></p>
                            </div>
                        </div>
                    )}

                    {activeTab === "documents" && (
                        <div className="documents-section">
                            <div className="documents-header">
                                <h2>Property Documents</h2>
                                <p>Upload and manage property documents (deeds, certificates, surveys, etc.)</p>
                            </div>
                            {!isCounty && (
                                <div style={{ marginBottom: "12px", color: "#6B7280", fontSize: "13px" }}>
                                    You can view documents here. Only the county that created this property can upload or delete documents.
                                </div>
                            )}
                            <PropertyDocumentsManager propertyId={id} readOnly={!isCounty} />
                        </div>
                    )}
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
                                    {property?.address || "Property"}
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
                                    {bids.length === 0 ? (
                                        <div style={{ padding: "12px", color: "#6B7280" }}>No bids yet.</div>
                                    ) : (
                                        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                                            {bids.map((bid) => (
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

            {showAlertModal && (
                <div
                    className="app-modal-overlay"
                    onClick={() => setShowAlertModal(false)}
                >
                    <div
                        className="app-modal app-modal--sm"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="app-modal-header">
                            <h2 className="app-modal-title">Send Alert</h2>
                            <button
                                onClick={() => setShowAlertModal(false)}
                                className="app-modal-close"
                                aria-label="Close"
                            >
                                ×
                            </button>
                        </div>
                        <div style={{ color: "#6B7280", fontSize: "13px", marginTop: "6px" }}>
                            This will email all linked bidders and also send a copy to the county.
                        </div>

                        <div style={{ marginTop: "14px" }}>
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                <div style={{ fontWeight: 800 }}>Recipients</div>
                                <button
                                    type="button"
                                    onClick={() => {
                                        const allIds = linkedBidders.map((b) => b.bidderId);
                                        if (alertBidderIds.length === allIds.length) setAlertBidderIds([]);
                                        else setAlertBidderIds(allIds);
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
                                >
                                    {alertBidderIds.length === linkedBidders.length ? "Uncheck all" : "Check all"}
                                </button>
                            </div>

                            {loadingBidders ? (
                                <div style={{ padding: "10px 0", color: "#6B7280" }}>Loading linked bidders...</div>
                            ) : linkedBidders.length === 0 ? (
                                <div style={{ padding: "10px 0", color: "#6B7280" }}>
                                    No linked bidders to notify. County copy will still be sent.
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
                                    {linkedBidders.map((b) => {
                                        const checked = alertBidderIds.includes(b.bidderId);
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
                                                        setAlertBidderIds((prev) =>
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
                                    Selected: <strong>{alertBidderIds.length}</strong> / {linkedBidders.length} bidders
                                </div>
                            )}
                        </div>

                        <div style={{ marginTop: "16px" }}>
                            <label style={{ display: "block", marginBottom: "6px", fontWeight: 700 }}>Subject</label>
                            <input
                                value={alertSubject}
                                onChange={(e) => setAlertSubject(e.target.value)}
                                placeholder={`Update: ${property?.address || "Property"}`}
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
                                value={alertMessage}
                                onChange={(e) => setAlertMessage(e.target.value)}
                                rows={5}
                                placeholder="Write your alert..."
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
                                disabled={sendingAlert}
                                onClick={async () => {
                                    if (!alertMessage.trim()) return alert("Message is required");
                                    setSendingAlert(true);
                                    try {
                                        const subject =
                                            alertSubject.trim() || `Update: ${property?.address || "Property"}`;
                                        const res = await fetch(`/api/properties/${id}/alerts`, {
                                            method: "POST",
                                            headers: { "Content-Type": "application/json" },
                                            body: JSON.stringify({
                                                subject,
                                                message: alertMessage,
                                                bidderIds: alertBidderIds,
                                            }),
                                        });
                                        if (!res.ok) {
                                            const text = await res.text();
                                            alert(text || "Failed to send alert");
                                            return;
                                        }
                                        setShowAlertModal(false);
                                        setAlertSubject("");
                                        setAlertMessage("");
                                        alert("Alert sent!");
                                    } catch (e) {
                                        console.error("Send alert error:", e);
                                        alert("Failed to send alert");
                                    } finally {
                                        setSendingAlert(false);
                                    }
                                }}
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
                                {sendingAlert ? "Sending..." : "Send Alert"}
                            </button>
                            <button
                                onClick={() => setShowAlertModal(false)}
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
        </div>
    );
};

export default PropertyDetailsContent;
