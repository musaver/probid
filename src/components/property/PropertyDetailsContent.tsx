"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import DashboardNav from "@/components/dashboard/DashboardNav";
import Footer from "@/components/footer/Footer";

const PropertyDetailsContent = ({ id }: { id: string }) => {
    const [activeTab, setActiveTab] = useState("overview");
    const [property, setProperty] = useState<any>(null);
    const [loading, setLoading] = useState(true);

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

    const biddingActivity = [
        {
            bidder: "John Doe",
            amount: "$52,000",
            status: "Current High",
            date: "Oct 14, 2024 10:30 AM",
        },
        {
            bidder: "Jane Smith",
            amount: "$51,500",
            status: "Outbid",
            date: "Oct 13, 2024 3:45 PM",
        },
    ];

    const [linkedBidders, setLinkedBidders] = useState<any[]>([]);
    const [loadingBidders, setLoadingBidders] = useState(false);
    const [showLinkModal, setShowLinkModal] = useState(false);
    const [searchEmail, setSearchEmail] = useState("");
    const [searchResults, setSearchResults] = useState<any[]>([]);
    const [searchingUsers, setSearchingUsers] = useState(false);

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

    const documents = [
        {
            name: "Property_Deed.pdf",
            size: "2.4 MB",
            type: "Deed",
            uploadDate: "Oct 1, 2024",
        },
    ];

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="dashboard-wrapper">
            <DashboardNav activeTab="properties" />

            <div className="property-details-content">
                <div className="container">
                    <Link href="/add-property" className="back-link">
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
                            <button className="action-btn-1 primary">
                                <i className="bi bi-pencil-square"></i> Edit Property
                            </button>
                            <button className="action-btn-1 secondary">
                                <i className="bi bi-people"></i> Manage Bidders
                            </button>
                            <button className="action-btn-1 secondary">
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
                                            <p>Ends: {property.auctionEnd}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="bidding-section">
                                <h3>Recent Bidding Activity</h3>
                                <div className="bidding-card">
                                    <div className="bidding-list">
                                        {biddingActivity.map((bid, index) => (
                                            <div key={index} className="bid-item">
                                                <div className="bid-left">
                                                    <div className="bidder-dot"></div>
                                                    <div className="bid-info">
                                                        <h5>{bid.bidder}</h5>
                                                        <p className="bid-amount">{bid.amount}</p>
                                                        <p className="bid-date">{bid.date}</p>
                                                    </div>
                                                </div>
                                                <div className="bid-right">
                                                    <span className={`bid-status ${bid.status === "Current High" ? "current" : "outbid"}`}>
                                                        {bid.status}
                                                    </span>
                                                </div>
                                            </div>
                                        ))}
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
                                <button className="link-bidder-btn" onClick={() => setShowLinkModal(true)}>
                                    <i className="bi bi-plus-circle"></i> Link Bidder
                                </button>
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
                                                        src={bidder.image || "/assets/img/avatar.png"}
                                                        alt={bidder.name || "Bidder"}
                                                        width={48}
                                                        height={48}
                                                        style={{ borderRadius: '50%', objectFit: 'cover' }}
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
                                <div style={{
                                    position: 'fixed',
                                    top: 0,
                                    left: 0,
                                    right: 0,
                                    bottom: 0,
                                    background: 'rgba(0, 0, 0, 0.5)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    zIndex: 1000
                                }}>
                                    <div style={{
                                        background: '#fff',
                                        borderRadius: '16px',
                                        padding: '32px',
                                        maxWidth: '500px',
                                        width: '90%',
                                        maxHeight: '80vh',
                                        overflow: 'auto'
                                    }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                                            <h2 style={{ margin: 0 }}>Link Bidder</h2>
                                            <button
                                                onClick={() => {
                                                    setShowLinkModal(false);
                                                    setSearchEmail("");
                                                    setSearchResults([]);
                                                }}
                                                style={{ background: 'none', border: 'none', fontSize: '24px', cursor: 'pointer' }}
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

                            <div className="document-upload-area">
                                <div className="upload-icon-circle">
                                    <i className="bi bi-download"></i>
                                </div>
                                <h3>Click to upload or drag and drop</h3>
                                <p>PDF, DOC, DOCX, JPG, PNG (Max 10MB)</p>
                            </div>

                            <div className="documents-list">
                                {documents.map((doc, index) => (
                                    <div key={index} className="document-item">
                                        <div className="document-icon">
                                            <i className="bi bi-file-earmark-pdf"></i>
                                        </div>
                                        <div className="document-info">
                                            <h4>{doc.name}</h4>
                                            <p>{doc.size} • {doc.type} • Uploaded: {doc.uploadDate}</p>
                                        </div>
                                        <div className="document-actions">
                                            <button className="doc-action-btn download">
                                                <i className="bi bi-download"></i>
                                            </button>
                                            <button className="doc-action-btn view">
                                                <i className="bi bi-eye"></i>
                                            </button>
                                            <button className="doc-action-btn delete">
                                                <i className="bi bi-trash"></i>
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default PropertyDetailsContent;
