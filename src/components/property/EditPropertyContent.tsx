"use client";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import DashboardNav from "@/components/dashboard/DashboardNav";
import Footer from "@/components/footer/Footer";
import PropertyDocumentsManager, { type PropertyDocumentsManagerHandle } from "@/components/property/PropertyDocumentsManager";

export default function EditPropertyContent({ propertyId }: { propertyId: string }) {
    const router = useRouter();
    const avatarFallback = "/assets/img/avatar-placeholder.svg";

    const [loadingProperty, setLoadingProperty] = useState(true);
    const [saving, setSaving] = useState(false);
    const [loadError, setLoadError] = useState<string | null>(null);

    const defaultVisibilitySettings = useMemo(
        () => ({
            minBid: true,
            currentBid: true,
            bidHistory: false,
            propertyStatus: true,
            bidderList: false,
            documents: false,
        }),
        []
    );

    const normalizeVisibilitySettings = (raw: unknown) => {
        let parsed: any = raw;
        if (parsed === null || parsed === undefined) return { ...defaultVisibilitySettings };
        if (typeof parsed === "string") {
            try {
                parsed = JSON.parse(parsed);
            } catch {
                return { ...defaultVisibilitySettings };
            }
        }
        if (Array.isArray(parsed) || typeof parsed !== "object") {
            return { ...defaultVisibilitySettings };
        }
        const out: any = { ...defaultVisibilitySettings };
        for (const key of Object.keys(defaultVisibilitySettings)) {
            const v = (parsed as any)[key];
            if (typeof v === "boolean") out[key] = v;
            else if (v === 1 || v === "1" || v === "true") out[key] = true;
            else if (v === 0 || v === "0" || v === "false") out[key] = false;
        }
        return out;
    };

    const [visibilitySettings, setVisibilitySettings] = useState({
        minBid: true,
        currentBid: true,
        bidHistory: false,
        propertyStatus: true,
        bidderList: false,
        documents: false,
    });

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

    const [linkedBidders, setLinkedBidders] = useState<any[]>([]);
    const [loadingBidders, setLoadingBidders] = useState(false);

    // Bidder search (email-based)
    const [bidderQuery, setBidderQuery] = useState("");
    const [bidderResults, setBidderResults] = useState<any[]>([]);
    const [loadingBidderSearch, setLoadingBidderSearch] = useState(false);
    const bidderSearchTimer = useRef<number | null>(null);

    const selectedPropertyAddress = useMemo(() => formData.address || "", [formData.address]);

    useEffect(() => {
        const fetchProperty = async () => {
            setLoadingProperty(true);
            setLoadError(null);
            try {
                if (!propertyId) {
                    throw new Error("Missing property id");
                }
                const res = await fetch(`/api/properties/${propertyId}`);
                if (!res.ok) {
                    const text = await res.text().catch(() => "");
                    throw new Error(text || "Failed to fetch property");
                }
                const p = await res.json();

                setFormData({
                    title: p.title || "",
                    parcelId: p.parcelId || "",
                    address: p.address || "",
                    city: p.city || "",
                    zipCode: p.zipCode || "",
                    minBid: p.minBid !== null && p.minBid !== undefined ? String(p.minBid) : "",
                    status: p.status || "active",
                    description: p.description || "",
                    squareFeet: p.squareFeet !== null && p.squareFeet !== undefined ? String(p.squareFeet) : "",
                    yearBuilt: p.yearBuilt !== null && p.yearBuilt !== undefined ? String(p.yearBuilt) : "",
                    lotSize: p.lotSize || "",
                    auctionEnd: p.auctionEnd ? new Date(p.auctionEnd).toISOString().slice(0, 16) : "",
                });

                setVisibilitySettings(
                    normalizeVisibilitySettings(p.visibilitySettings)
                );
            } catch (e) {
                console.error("Error fetching property:", e);
                setLoadError(e instanceof Error ? e.message : "Failed to fetch property");
            } finally {
                setLoadingProperty(false);
            }
        };
        fetchProperty();
    }, [propertyId]);

    useEffect(() => {
        const fetchLinkedBidders = async () => {
            setLoadingBidders(true);
            try {
                const response = await fetch(`/api/properties/${propertyId}/linked-bidders`);
                if (response.ok) {
                    setLinkedBidders(await response.json());
                } else {
                    setLinkedBidders([]);
                }
            } catch (error) {
                console.error("Error fetching linked bidders:", error);
                setLinkedBidders([]);
            } finally {
                setLoadingBidders(false);
            }
        };
        fetchLinkedBidders();
    }, [propertyId]);

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

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const toggleSetting = (setting: keyof typeof visibilitySettings) => {
        setVisibilitySettings((prev) => ({ ...prev, [setting]: !prev[setting] }));
    };

    const handleLinkBidder = async (bidderId: string) => {
        try {
            const response = await fetch(`/api/properties/${propertyId}/linked-bidders`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ bidderId }),
            });
            if (!response.ok) {
                const text = await response.text();
                alert(text || "Failed to link bidder");
                return;
            }
            const refresh = await fetch(`/api/properties/${propertyId}/linked-bidders`);
            if (refresh.ok) setLinkedBidders(await refresh.json());
        } catch (error) {
            console.error("Error linking bidder:", error);
            alert("Failed to link bidder");
        }
    };

    const handleUnlinkBidder = async (bidderId: string) => {
        if (!confirm("Are you sure you want to unlink this bidder?")) return;
        try {
            const response = await fetch(
                `/api/properties/${propertyId}/linked-bidders?bidderId=${encodeURIComponent(bidderId)}`,
                { method: "DELETE" }
            );
            if (response.ok) {
                setLinkedBidders((prev) => prev.filter((b) => b.bidderId !== bidderId));
            } else {
                alert("Failed to unlink bidder");
            }
        } catch (error) {
            console.error("Error unlinking bidder:", error);
            alert("Failed to unlink bidder");
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);
        try {
            const response = await fetch(`/api/properties/${propertyId}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ ...formData, visibilitySettings }),
            });

            if (!response.ok) {
                const text = await response.text();
                alert(text || "Failed to save property");
                return;
            }

            // Upload queued documents with progress before leaving page
            try {
                if (docsRef.current) {
                    await docsRef.current.uploadQueuedFiles(propertyId);
                    docsRef.current.clearQueue();
                }
            } catch (err) {
                console.error("Failed to upload documents:", err);
            }

            router.push(`/property-details/${propertyId}`);
        } catch (error) {
            console.error("Error saving property:", error);
            alert("Failed to save property");
        } finally {
            setSaving(false);
        }
    };

    const availableBidders = useMemo(() => {
        const linkedIds = new Set(linkedBidders.map((b) => b.bidderId));
        return bidderResults.filter((b) => !linkedIds.has(b.id));
    }, [bidderResults, linkedBidders]);

    if (loadingProperty) {
        return <div style={{ padding: "40px", textAlign: "center" }}>Loading...</div>;
    }
    if (loadError) {
        return (
            <div style={{ padding: "40px", textAlign: "center" }}>
                <div style={{ color: "#B91C1C", fontWeight: 600, marginBottom: "8px" }}>
                    {loadError}
                </div>
                <button className="add-property-btn" onClick={() => router.push("/properties")}>
                    <i className="bi bi-arrow-left"></i> Back to Properties
                </button>
            </div>
        );
    }

    return (
        <div className="dashboard-wrapper">
            <DashboardNav activeTab="properties" />

            <div className="dashboard-content" style={{ background: "#FFFFFF" }}>
                <div className="container">
                    <div className="property-header">
                        <div className="search-filter-area" />
                        <button className="add-property-btn" onClick={() => router.push("/properties")}>
                            <i className="bi bi-arrow-left"></i> Back
                        </button>
                    </div>

                    <div className="dashboard-grid">
                        <div className="dashboard-main">
                            <div className="property-modal">
                                <div className="modal-header">
                                    <h3>Edit Property</h3>
                                </div>
                                <div className="modal-body">
                                    <form id="edit-property-form" onSubmit={handleSubmit}>
                                        <div className="form-row">
                                            <div className="form-group">
                                                <label>Property Title</label>
                                                <input
                                                    type="text"
                                                    name="title"
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
                                                    value={formData.city}
                                                    onChange={handleInputChange}
                                                />
                                            </div>
                                            <div className="form-group">
                                                <label>ZIP Code</label>
                                                <input
                                                    type="text"
                                                    name="zipCode"
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
                                                        padding: "12px 15px",
                                                        border: "1px solid #ddd",
                                                        borderRadius: "23px",
                                                        fontSize: "14px",
                                                        backgroundColor: "#FFFFFF",
                                                        width: "100%",
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
                                                rows={4}
                                                value={formData.description}
                                                onChange={handleInputChange}
                                            ></textarea>
                                        </div>

                                        <div className="form-row">
                                            <div className="form-group">
                                                <label>Square Feet</label>
                                                <input
                                                    type="number"
                                                    name="squareFeet"
                                                    value={formData.squareFeet}
                                                    onChange={handleInputChange}
                                                />
                                            </div>
                                            <div className="form-group">
                                                <label>Year Built</label>
                                                <input
                                                    type="number"
                                                    name="yearBuilt"
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
                                            <PropertyDocumentsManager ref={docsRef} propertyId={propertyId} />
                                        </div>
                                    </form>
                                </div>
                            </div>

                            <div className="visibility-settings">
                                <h3>Bidder Visibility Settings</h3>
                                <p className="settings-subtitle">
                                    Control what information bidders can see for this property
                                </p>
                                <div className="settings-grid">
                                    {Object.entries(visibilitySettings).map(([key, value]) => (
                                        <div className="setting-item" key={key}>
                                            <div className="setting-info">
                                                <h5>
                                                    {key
                                                        .replace(/([A-Z])/g, " $1")
                                                        .replace(/^./, (str) => str.toUpperCase())}
                                                </h5>
                                                <p>Show {key.replace(/([A-Z])/g, " $1").toLowerCase()}</p>
                                            </div>
                                            <label className="toggle-switch">
                                                <input
                                                    type="checkbox"
                                                    checked={value}
                                                    onChange={() =>
                                                        toggleSetting(key as keyof typeof visibilitySettings)
                                                    }
                                                />
                                                <span className="slider"></span>
                                            </label>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="form-actions">
                                <button
                                    type="submit"
                                    form="edit-property-form"
                                    className="btn-submit"
                                    disabled={saving}
                                >
                                    {saving ? "Saving..." : "Save Changes"}
                                </button>
                            </div>
                        </div>

                        <div className="dashboard-sidebar">
                            <div className="sidebar-card">
                                <h4>Linked Bidders</h4>
                                {selectedPropertyAddress && (
                                    <div style={{ padding: "0 0 10px 0", color: "#6B7280", fontSize: "12px" }}>
                                        Selected: {selectedPropertyAddress}
                                    </div>
                                )}
                                <div className="bidders-list">
                                    {loadingBidders ? (
                                        <div style={{ padding: "12px", color: "#6B7280" }}>Loading bidders...</div>
                                    ) : linkedBidders.length === 0 ? (
                                        <div style={{ padding: "12px", color: "#6B7280" }}>No bidders linked yet.</div>
                                    ) : (
                                        linkedBidders.map((bidder, index) => (
                                            <div key={index} className="bidder-item">
                                                <div className="bidder-avatar">
                                                    <img
                                                        src={bidder.image || avatarFallback}
                                                        alt={bidder.name || "Bidder"}
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
                                                    className="link-btn linked"
                                                    onClick={() => handleUnlinkBidder(bidder.bidderId)}
                                                    title="Unlink bidder"
                                                >
                                                    <i className="bi bi-x-lg"></i>
                                                </button>
                                            </div>
                                        ))
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
                                    ) : availableBidders.length === 0 ? (
                                        <div style={{ padding: "12px", color: "#6B7280" }}>No bidders found.</div>
                                    ) : (
                                        availableBidders.map((bidder, index) => (
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
                                                    onClick={() => handleLinkBidder(bidder.id)}
                                                    title="Link bidder"
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
}


