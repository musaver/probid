"use client";
import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import DashboardNav from "@/components/dashboard/DashboardNav";
import Footer from "@/components/footer/Footer";
import PropertyDocumentsManager, { type PropertyDocumentsManagerHandle } from "@/components/property/PropertyDocumentsManager";

const AddPropertyContent = () => {
    const router = useRouter();
    const avatarFallback = "/assets/img/avatar-placeholder.svg";
    const [showModal, setShowModal] = useState(true);

    const [visibilitySettings, setVisibilitySettings] = useState({
        minBid: true,
        currentBid: true,
        bidHistory: false,
        propertyStatus: true,
        bidderList: false,
        documents: false,
    });
    const visibilityTouchedRef = useRef(false);

    const [formData, setFormData] = useState({
        title: "",
        parcelId: "",
        address: "",
        city: "",
        zipCode: "",
        minBid: "",
        status: "active",
        description: "",
        squareFeet: "",
        yearBuilt: "",
        lotSize: "",
        auctionEnd: "",
    });

    const docsRef = useRef<PropertyDocumentsManagerHandle | null>(null);

    // Bidder search (email-based)
    const [bidderQuery, setBidderQuery] = useState("");
    const [bidderResults, setBidderResults] = useState<any[]>([]);
    const [loadingBidderSearch, setLoadingBidderSearch] = useState(false);
    const bidderSearchTimer = useRef<number | null>(null);
    
    // Track bidders selected for new property (before creation)
    const [selectedBidderIds, setSelectedBidderIds] = useState<string[]>([]);
    const [selectedBidderById, setSelectedBidderById] = useState<Record<string, any>>({});

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const toggleSetting = (setting: keyof typeof visibilitySettings) => {
        visibilityTouchedRef.current = true;
        setVisibilitySettings((prev) => ({
            ...prev,
            [setting]: !prev[setting],
        }));
    };

    useEffect(() => {
        // Initialize visibility toggles from logged-in user's defaults (user.visibility_* columns)
        const loadUserVisibilityDefaults = async () => {
            try {
                const res = await fetch("/api/profile", { method: "GET" });
                if (!res.ok) return;
                const data = await res.json().catch(() => null);
                const vc = data?.user?.visibilityControl;
                if (!vc || typeof vc !== "object") return;

                // Don't overwrite if the user already toggled something while the request was in-flight
                if (visibilityTouchedRef.current) return;

                setVisibilitySettings({
                    minBid: !!vc.minBid,
                    currentBid: !!vc.currentBid,
                    bidHistory: !!vc.bidHistory,
                    propertyStatus: !!vc.propertyStatus,
                    bidderList: !!vc.bidderList,
                    documents: !!vc.documents,
                });
            } catch (e) {
                console.error("Failed to load user visibility defaults:", e);
            }
        };
        loadUserVisibilityDefaults();
    }, []);

    useEffect(() => {
        // Search bidders by email (do not show all by default)
        if (bidderSearchTimer.current) window.clearTimeout(bidderSearchTimer.current);
        const q = bidderQuery.trim();
        if (!q) {
            setBidderResults([]);
            setLoadingBidderSearch(false);
            return;
        }
        bidderSearchTimer.current = window.setTimeout(async () => {
            setLoadingBidderSearch(true);
            try {
                const res = await fetch(`/api/users/bidders?q=${encodeURIComponent(q)}`);
                if (!res.ok) {
                    setBidderResults([]);
                    return;
                }
                const data = await res.json();
                const list = Array.isArray(data) ? data : [];
                // Exact email match only (start-to-end)
                const qLower = q.toLowerCase();
                const filtered = list.filter(
                    (u: any) => String(u?.email || "").toLowerCase() === qLower
                );
                setBidderResults(filtered.slice(0, 1));
            } catch (e) {
                console.error("Error searching bidders:", e);
                setBidderResults([]);
            } finally {
                setLoadingBidderSearch(false);
            }
        }, 350);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [bidderQuery]);

    const handleSelectBidder = (bidderId: string, bidder?: any) => {
        // Add to selection for new property
        setSelectedBidderIds((prev) => (prev.includes(bidderId) ? prev : [...prev, bidderId]));
        if (bidder) {
            setSelectedBidderById((prev) => ({ ...prev, [bidderId]: bidder }));
        }
    };

    const handleUnselectBidder = (bidderId: string) => {
        // Remove from selection
        setSelectedBidderIds((prev) => prev.filter((id) => id !== bidderId));
        setSelectedBidderById((prev) => {
            const next = { ...prev };
            delete next[bidderId];
            return next;
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await fetch("/api/properties", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    ...formData,
                    visibilitySettings,
                }),
            });

            if (response.ok) {
                const data = await response.json();
                const newPropertyId = data.propertyId as string;

                // Link selected bidders to the new property
                if (selectedBidderIds.length > 0) {
                    for (const bidderId of selectedBidderIds) {
                        try {
                            await fetch(`/api/properties/${newPropertyId}/linked-bidders`, {
                                method: "POST",
                                headers: { "Content-Type": "application/json" },
                                body: JSON.stringify({ bidderId }),
                            });
                        } catch (err) {
                            console.error("Failed to link bidder:", err);
                        }
                    }
                    setSelectedBidderIds([]);
                }

                // Upload queued documents with progress before redirect
                try {
                    if (docsRef.current) {
                        await docsRef.current.uploadQueuedFiles(newPropertyId);
                        docsRef.current.clearQueue();
                    }
                } catch (err) {
                    console.error("Failed to upload documents:", err);
                }

                router.push(`/property-details/${newPropertyId}`);
            } else {
                console.error("Failed to add property");
            }
        } catch (error) {
            console.error("Error adding property:", error);
        }
    };

    return (
        <div className="dashboard-wrapper">
            <DashboardNav activeTab="properties" />

            <div className="dashboard-content" style={{ background: '#FFFFFF' }}>
                <div className="container">
                    <div className="property-header">
                        <div />
                        <button className="add-property-btn" type="button" onClick={() => router.push("/properties")}>
                            <i className="bi bi-arrow-left"></i> Back
                        </button>
                    </div>

                    <div className="dashboard-grid">
                        <div className="dashboard-main">
                            {showModal && (
                                <div className="property-modal">
                                    <div className="modal-header">
                                        <h3>Add New Property</h3>
                                        <button className="close-btn" type="button" onClick={() => router.push("/properties")}>
                                            <i className="bi bi-x"></i>
                                        </button>
                                    </div>
                                    <div className="modal-body">
                                        <form id="add-property-form" onSubmit={handleSubmit}>
                                            <div className="form-row">
                                                <div className="form-group">
                                                    <label>Property Title</label>
                                                    <input
                                                        type="text"
                                                        name="title"
                                                        placeholder="e.g. 3BR Single Family Home"
                                                        value={formData.title}
                                                        onChange={handleInputChange}
                                                        required
                                                    />
                                                </div>
                                                <div className="form-group">
                                                    <label>Parcel ID</label>
                                                    <input
                                                        type="text"
                                                        name="parcelId"
                                                        placeholder="123-456-789"
                                                        value={formData.parcelId}
                                                        onChange={handleInputChange}
                                                        required
                                                    />
                                                </div>
                                            </div>
                                            <div className="form-row">
                                                <div className="form-group">
                                                    <label>Property Address</label>
                                                    <input
                                                        type="text"
                                                        name="address"
                                                        placeholder="123 Main Street"
                                                        value={formData.address}
                                                        onChange={handleInputChange}
                                                        required
                                                    />
                                                </div>
                                                <div className="form-group">
                                                    <label>City</label>
                                                    <input
                                                        type="text"
                                                        name="city"
                                                        placeholder="City Name"
                                                        value={formData.city}
                                                        onChange={handleInputChange}
                                                    />
                                                </div>
                                                <div className="form-group">
                                                    <label>ZIP Code</label>
                                                    <input
                                                        type="text"
                                                        name="zipCode"
                                                        placeholder="12345"
                                                        value={formData.zipCode}
                                                        onChange={handleInputChange}
                                                    />
                                                </div>
                                            </div>
                                            <div className="form-row">
                                                <div className="form-group">
                                                    <label>Minimum Bid</label>
                                                    <input
                                                        type="text"
                                                        name="minBid"
                                                        placeholder="$50,000"
                                                        value={formData.minBid}
                                                        onChange={handleInputChange}
                                                    />
                                                </div>
                                                <div className="form-group">
                                                    <label>Property Status</label>
                                                    <select
                                                        name="status"
                                                        value={formData.status}
                                                        onChange={handleInputChange}
                                                        style={{
                                                            padding: '12px 15px',
                                                            border: '1px solid #ddd',
                                                            borderRadius: '23px',
                                                            fontSize: '14px',
                                                            backgroundColor: '#FFFFFF',
                                                            width: '100%'
                                                        }}
                                                    >
                                                        <option value="active">Active</option>
                                                        <option value="sold">Sold</option>
                                                        <option value="withdrawn">Withdrawn</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div className="form-group full-width">
                                                <label>Property Description</label>
                                                <textarea
                                                    name="description"
                                                    placeholder="Enter detailed property description..."
                                                    rows={4}
                                                    value={formData.description}
                                                    onChange={handleInputChange}
                                                ></textarea>
                                            </div>

                                            {/* Additional Fields */}
                                            <div className="form-row">
                                                <div className="form-group">
                                                    <label>Square Feet</label>
                                                    <input
                                                        type="number"
                                                        name="squareFeet"
                                                        placeholder="2400"
                                                        value={formData.squareFeet}
                                                        onChange={handleInputChange}
                                                    />
                                                </div>
                                                <div className="form-group">
                                                    <label>Year Built</label>
                                                    <input
                                                        type="number"
                                                        name="yearBuilt"
                                                        placeholder="1985"
                                                        value={formData.yearBuilt}
                                                        onChange={handleInputChange}
                                                    />
                                                </div>
                                            </div>
                                            <div className="form-row">
                                                <div className="form-group">
                                                    <label>Lot Size</label>
                                                    <input
                                                        type="text"
                                                        name="lotSize"
                                                        placeholder="0.25 acres"
                                                        value={formData.lotSize}
                                                        onChange={handleInputChange}
                                                    />
                                                </div>
                                                <div className="form-group">
                                                    <label>Auction End Date</label>
                                                    <input
                                                        type="datetime-local"
                                                        name="auctionEnd"
                                                        value={formData.auctionEnd}
                                                        onChange={handleInputChange}
                                                    />
                                                </div>
                                            </div>

                                            <div className="form-group full-width">
                                                <label>Document Attachments</label>
                                                <PropertyDocumentsManager ref={docsRef} />
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            )}

                            <div className="visibility-settings">
                                <h3>Bidder Visibility Settings</h3>
                                <p className="settings-subtitle">Control what information bidders can see for this property</p>
                                <div className="settings-grid">
                                    {Object.entries(visibilitySettings).map(([key, value]) => (
                                        <div className="setting-item" key={key}>
                                            <div className="setting-info">
                                                <h5>{key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}</h5>
                                                <p>Show {key.replace(/([A-Z])/g, ' $1').toLowerCase()}</p>
                                            </div>
                                            <label className="toggle-switch">
                                                <input
                                                    type="checkbox"
                                                    checked={value}
                                                    onChange={() => toggleSetting(key as keyof typeof visibilitySettings)}
                                                />
                                                <span className="slider"></span>
                                            </label>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="form-actions">
                                <button type="submit" form="add-property-form" className="btn-submit">
                                    Add Property
                                </button>
                                <button
                                    type="button"
                                    className="btn-cancel"
                                    onClick={() => router.push("/properties")}
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>

                        <div className="dashboard-sidebar">
                            <div className="sidebar-card">
                                <h4>Linked Bidders</h4>
                                <div className="bidders-list">
                                    {selectedBidderIds.length === 0 ? (
                                        <div style={{ padding: "12px", color: "#6B7280" }}>
                                            No bidders selected yet. Select from below.
                                        </div>
                                    ) : (
                                        selectedBidderIds.map((id, index) => {
                                            const bidder = selectedBidderById[id];
                                            return (
                                                <div key={index} className="bidder-item">
                                                    <div className="bidder-avatar">
                                                        <img
                                                            src={(bidder?.image as string) || avatarFallback}
                                                            alt={bidder?.name || "User"}
                                                            onError={(e) => {
                                                                (e.currentTarget as HTMLImageElement).src = avatarFallback;
                                                            }}
                                                        />
                                                    </div>
                                                    <div className="bidder-info">
                                                        <h5>{bidder?.name || "Unknown"}</h5>
                                                        <p>{bidder?.email || id}</p>
                                                    </div>
                                                    <button
                                                        className="link-btn linked"
                                                        onClick={() => handleUnselectBidder(id)}
                                                        title="Remove selection"
                                                    >
                                                        <i className="bi bi-x-lg"></i>
                                                    </button>
                                                </div>
                                            );
                                        })
                                    )}
                                </div>
                            </div>

                            <div className="sidebar-card">
                                <h4>Link New Bidder</h4>
                                <div style={{ marginBottom: "10px" }}>
                                    <input
                                        type="email"
                                        placeholder="Search bidder by email..."
                                        value={bidderQuery}
                                        onChange={(e) => setBidderQuery(e.target.value)}
                                        style={{
                                            width: "100%",
                                            padding: "10px 12px",
                                            borderRadius: "10px",
                                            border: "1px solid rgba(17,24,39,0.12)",
                                        }}
                                    />
                                </div>
                                <div className="bidders-list">
                                    {!bidderQuery.trim() ? (
                                        <div style={{ padding: "12px", color: "#6B7280" }}>
                                            Search by email to find a bidder.
                                        </div>
                                    ) : loadingBidderSearch ? (
                                        <div style={{ padding: "12px", color: "#6B7280" }}>Searching...</div>
                                    ) : bidderResults.length === 0 ? (
                                        <div style={{ padding: "12px", color: "#6B7280" }}>No bidders found.</div>
                                    ) : (
                                        bidderResults
                                            .filter((b) => !selectedBidderIds.includes(b.id))
                                            .map((bidder, index) => (
                                        <div key={index} className="bidder-item">
                                            <div className="bidder-avatar">
                                                        <img
                                                            src={bidder.image || avatarFallback}
                                                            alt={bidder.name || "User"}
                                                            onError={(e) => {
                                                                (e.currentTarget as HTMLImageElement).src = avatarFallback;
                                                            }}
                                                        />
                                            </div>
                                            <div className="bidder-info">
                                                        <h5>{bidder.name || "Unknown"}</h5>
                                                <p>{bidder.email}</p>
                                            </div>
                                                    <button
                                                        className="link-btn available"
                                                        onClick={() => handleSelectBidder(bidder.id, bidder)}
                                                        title="Select bidder"
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
            <Footer />
        </div>
    );
};

export default AddPropertyContent;
