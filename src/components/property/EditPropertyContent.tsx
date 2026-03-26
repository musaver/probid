"use client";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import DashboardNav from "@/components/dashboard/DashboardNav";
import Footer from "@/components/footer/Footer";
import PropertyDocumentsManager, { type PropertyDocumentsManagerHandle } from "@/components/property/PropertyDocumentsManager";
import DatePicker from "react-datepicker";
import { formatDateWithTime } from "@/lib/dateFormatter";
import { formatCurrency } from "@/lib/format";
import "react-datepicker/dist/react-datepicker.css";
import "@/app/datepicker-custom.css";

export default function EditPropertyContent({ propertyId }: { propertyId: string }) {
    const router = useRouter();
    const avatarFallback = "/assets/img/avatar-placeholder.svg";

    const [loadingProperty, setLoadingProperty] = useState(true);
    const [saving, setSaving] = useState(false);
    const [loadError, setLoadError] = useState<string | null>(null);
    const [isButtonsFloating, setIsButtonsFloating] = useState(false);
    const floatTriggerRef = useRef<HTMLDivElement>(null);
    const actionsBarRef = useRef<HTMLDivElement>(null);
    const [actionsBarHeight, setActionsBarHeight] = useState(0);

    const FLOAT_TOP_PX = 0;

    const defaultVisibilitySettings = useMemo(
        () => ({
            minBid: true,
            currentBid: true,
            propertyStatus: true,
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
        propertyStatus: true,
        documents: false,
    });

    const [formData, setFormData] = useState({
        saleId: "",
        parcelId: "",
        address: "",
        city: "",
        zipCode: "",
        minBid: "",
        winningBid: "",
        winningBidderId: "",
        status: "active",
    });

    const [auctionEndDate, setAuctionEndDate] = useState<Date | null>(null);
    const [owners, setOwners] = useState<string[]>([""]);
    const [showMoreFields, setShowMoreFields] = useState(false);

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
        // Keep placeholder height in sync to avoid layout jump when the bar becomes fixed
        // (Edit page initially renders a loading state, so we need to re-run after content mounts)
        if (loadingProperty || loadError) return;

        const updateHeight = () => {
            setActionsBarHeight(actionsBarRef.current?.offsetHeight || 0);
        };
        updateHeight();

        window.addEventListener("resize", updateHeight);
        return () => window.removeEventListener("resize", updateHeight);
    }, [loadingProperty, loadError]);

    useEffect(() => {
        // Float only once we reach `.dashboard-content`.
        // (Edit page initially renders a loading state, so we need to attach the observer after content mounts)
        if (loadingProperty || loadError) return;

        const el = floatTriggerRef.current;
        if (!el) return;

        const obs = new IntersectionObserver(
            (entries) => {
                const entry = entries[0];
                setIsButtonsFloating(!entry.isIntersecting);
            },
            {
                root: null,
                threshold: 0,
                rootMargin: `-${FLOAT_TOP_PX}px 0px 0px 0px`,
            }
        );

        obs.observe(el);
        return () => obs.disconnect();
    }, [loadingProperty, loadError]);

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
                    saleId: p.saleId || "",
                    parcelId: p.parcelId || "",
                    address: p.address || "",
                    city: p.city || "",
                    zipCode: p.zipCode || "",
                    minBid: formatCurrency(p.minBid),
                    winningBid: formatCurrency(p.winningBid),
                    winningBidderId: p.winningBidderId || "",
                    status: p.status || "active",
                });

                if (Array.isArray(p.owners) && p.owners.length > 0) {
                    setOwners(p.owners);
                } else {
                    setOwners([""]);
                }

                // Set auction end date if available
                if (p.auctionEnd) {
                    setAuctionEndDate(new Date(p.auctionEnd));
                }

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
                    (u: any) =>
                        String(u?.name || "").toLowerCase().includes(qLower) ||
                        String(u?.email || "").toLowerCase().includes(qLower) ||
                        String(u?.phone || "").toLowerCase().includes(qLower) ||
                        String(u?.bidderNumber || "").toLowerCase().includes(qLower)
                );
                setBidderResults(filtered.slice(0, 10));
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

        let finalValue = value;
        if (name === "minBid" || name === "winningBid") {
            const clean = value.replace(/[^0-9.]/g, "");
            const parts = clean.split(".");
            if (parts.length > 2) return;
            finalValue = formatCurrency(clean);
        }

        setFormData((prev) => ({
            ...prev,
            [name]: finalValue,
        }));
    };

    const toggleSetting = (setting: keyof typeof visibilitySettings) => {
        setVisibilitySettings((prev) => ({ ...prev, [setting]: !prev[setting] }));
    };

    const handleOwnerChange = (index: number, value: string) => {
        const newOwners = [...owners];
        newOwners[index] = value;
        setOwners(newOwners);
    };

    const addOwner = () => {
        setOwners([...owners, ""]);
    };

    const removeOwner = (index: number) => {
        const newOwners = owners.filter((_, i) => i !== index);
        setOwners(newOwners);
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
                body: JSON.stringify({
                    ...formData,
                    owners: owners.filter(o => o.trim() !== ""),
                    auctionEnd: auctionEndDate ? auctionEndDate.toISOString() : "",
                    visibilitySettings
                }),
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
                {/* Trigger: once this reaches the 140px top offset, the actions bar starts floating */}
                <div
                    ref={floatTriggerRef}
                    className="js-actions-float-trigger"
                    style={{ height: 1, width: 1 }}
                />
                <div className="container">
                    {/* Placeholder when buttons are floating to prevent content jump */}
                    {isButtonsFloating && <div style={{ height: actionsBarHeight }} />}

                    {/* Action Buttons - Floating when scrolled */}
                    <div
                        ref={actionsBarRef}
                        className="js-actions-bar"
                        style={{
                            position: isButtonsFloating ? "fixed" : "static",
                            top: isButtonsFloating ? `${FLOAT_TOP_PX}px` : undefined,
                            left: isButtonsFloating ? 0 : undefined,
                            right: isButtonsFloating ? 0 : undefined,
                            width: isButtonsFloating ? "100%" : "auto",
                            backgroundColor: "#FFFFFF",
                            zIndex: 1000,
                            boxShadow: isButtonsFloating ? "0 2px 8px rgba(0, 0, 0, 0.15)" : "none",
                            borderBottom: isButtonsFloating ? "1px solid #E5E7EB" : "none",
                            transition: "box-shadow 0.2s ease, border 0.2s ease",
                            paddingBottom: "10px",
                        }}
                    >
                        <div className="container">
                            <div className="form-actions" style={{
                                display: 'flex',
                                gap: '12px',
                                justifyContent: 'flex-start',
                            }}>
                                <button
                                    type="submit"
                                    form="edit-property-form"
                                    className="btn-submit"
                                    disabled={saving}
                                >
                                    {saving ? "Saving..." : "Save Changes"}
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
                    </div>

                    <div className="dashboard-grid">
                        <div className="dashboard-main">

                            <div className="property-modal">
                                <div className="modal-header">
                                    <h3>Edit Property</h3>
                                </div>

                                <div className="modal-body">
                                    <form id="edit-property-form" onSubmit={handleSubmit}>
                                        {/* Section 1: Property & Ownership Info */}
                                        <div className="form-section">
                                            <h4 style={{ marginBottom: '5px', color: '#111827', fontWeight: 600 }}>Property & Ownership Info</h4>

                                            <div className="form-row">
                                                <div className="form-group">
                                                    <label htmlFor="saleId" style={{ fontWeight: 700, cursor: 'pointer' }}>Sale ID <span style={{ color: '#DC2626' }}>*</span></label>
                                                    <input
                                                        id="saleId"
                                                        type="text"
                                                        name="saleId"
                                                        placeholder="e.g. 2023-001"
                                                        value={formData.saleId}
                                                        onChange={handleInputChange}
                                                        required
                                                        style={{
                                                            fontWeight: 600
                                                        }}
                                                    />
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="parcelId" style={{ cursor: 'pointer' }}>Parcel Number</label>
                                                    <input
                                                        id="parcelId"
                                                        type="text"
                                                        name="parcelId"
                                                        placeholder="123-456-789"
                                                        value={formData.parcelId}
                                                        onChange={handleInputChange}
                                                        required
                                                    />
                                                </div>
                                            </div>

                                            <div className="form-group full-width">
                                                <label htmlFor="owner-0" style={{ cursor: 'pointer' }}>Owner Name(s) <span style={{ fontSize: '12px', color: '#666', fontWeight: 'normal' }}>(Last name first)</span></label>
                                                {owners.map((owner, index) => (
                                                    <div key={index} style={{ display: 'flex', gap: '10px', marginBottom: '5px' }}>
                                                        <input
                                                            id={`owner-${index}`}
                                                            type="text"
                                                            placeholder="Doe, John"
                                                            value={owner}
                                                            onChange={(e) => handleOwnerChange(index, e.target.value)}
                                                            style={{
                                                                flex: 1,
                                                                borderRadius: '23px',
                                                                border: '1px solid #ddd',
                                                                padding: '12px 15px',
                                                                fontSize: '14px',
                                                                outline: 'none'
                                                            }}
                                                        />
                                                        {owners.length > 1 && (
                                                            <button
                                                                type="button"
                                                                onClick={() => removeOwner(index)}
                                                                style={{ padding: '0 10px', color: '#EF4444', border: '1px solid #EF4444', borderRadius: '6px', background: 'white' }}
                                                            >
                                                                <i className="bi bi-trash"></i>
                                                            </button>
                                                        )}
                                                    </div>
                                                ))}
                                                <button
                                                    type="button"
                                                    onClick={addOwner}
                                                    style={{ fontSize: '13px', color: '#2563EB', background: 'none', border: 'none', padding: 0, fontWeight: 500, cursor: 'pointer' }}
                                                >
                                                    + Add another owner
                                                </button>
                                            </div>

                                            <div>
                                                <button
                                                    type="button"
                                                    onClick={() => setShowMoreFields(!showMoreFields)}
                                                    style={{
                                                        color: '#2563EB',
                                                        background: 'none',
                                                        border: 'none',
                                                        padding: 0,
                                                        fontSize: '14px',
                                                        fontWeight: 600,
                                                        cursor: 'pointer',
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        gap: '5px'
                                                    }}
                                                >
                                                    {showMoreFields ? (
                                                        <>Less Property Details <i className="bi bi-chevron-up"></i></>
                                                    ) : (
                                                        <>More Property Details (Address, City, ZIP) <i className="bi bi-chevron-down"></i></>
                                                    )}
                                                </button>
                                            </div>

                                            {showMoreFields && (
                                                <div className="form-row">
                                                    <div className="form-group">
                                                        <label htmlFor="address" style={{ cursor: 'pointer' }}>Property Address</label>
                                                        <input
                                                            id="address"
                                                            type="text"
                                                            name="address"
                                                            placeholder="123 Main Street"
                                                            value={formData.address}
                                                            onChange={handleInputChange}
                                                        />
                                                    </div>
                                                    <div className="form-group">
                                                        <label htmlFor="city" style={{ cursor: 'pointer' }}>City</label>
                                                        <input
                                                            id="city"
                                                            type="text"
                                                            name="city"
                                                            placeholder="City Name"
                                                            value={formData.city}
                                                            onChange={handleInputChange}
                                                        />
                                                    </div>
                                                    <div className="form-group">
                                                        <label htmlFor="zipCode" style={{ cursor: 'pointer' }}>ZIP Code</label>
                                                        <input
                                                            id="zipCode"
                                                            type="text"
                                                            name="zipCode"
                                                            placeholder="12345"
                                                            value={formData.zipCode}
                                                            onChange={handleInputChange}
                                                        />
                                                    </div>
                                                </div>
                                            )}
                                        </div>

                                        <div className="form-section">
                                            <h4 style={{ marginBottom: '5px', color: '#111827', fontWeight: 600 }}>Auction Info</h4>

                                            <div className="form-row">
                                                <div className="form-group">
                                                    <label htmlFor="minBid" style={{ cursor: 'pointer' }}>Minimum Bid</label>
                                                    <input
                                                        id="minBid"
                                                        type="text"
                                                        name="minBid"
                                                        placeholder="$50,000"
                                                        value={formData.minBid}
                                                        onChange={handleInputChange}
                                                    />
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="winningBid" style={{ cursor: 'pointer' }}>Winning Bid</label>
                                                    <input
                                                        id="winningBid"
                                                        type="text"
                                                        name="winningBid"
                                                        placeholder="$0"
                                                        value={formData.winningBid}
                                                        onChange={handleInputChange}
                                                    />
                                                </div>
                                            </div>

                                            <div className="form-row">
                                                <div className="form-group" style={{ position: 'relative' }}>
                                                    <label htmlFor="winningBidderSearch" style={{ cursor: 'pointer' }}>Winning Bidder <span style={{ fontSize: '12px', color: '#666', fontWeight: 'normal' }}>(Search by name, email, or bidder number)</span></label>
                                                    <input
                                                        id="winningBidderSearch"
                                                        type="text"
                                                        placeholder="Search to link bidder..."
                                                        value={bidderQuery}
                                                        onChange={(e) => setBidderQuery(e.target.value)}
                                                        autoComplete="off"
                                                    />
                                                    {loadingBidderSearch && <div style={{ fontSize: '12px', color: '#666', marginTop: '80px', top: '0px' }}>Searching...</div>}

                                                    {/* Search Results Dropdown */}
                                                    {bidderQuery.trim() && (
                                                        <div className="dropdown-results" style={{
                                                            position: 'absolute',
                                                            top: '0px',
                                                            left: 0,
                                                            right: 0,
                                                            backgroundColor: 'white',
                                                            border: '1px solid #ddd',
                                                            borderRadius: '8px',
                                                            zIndex: 10,
                                                            marginTop: '80px',
                                                            boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
                                                        }}>
                                                            {availableBidders.map((bidder) => (
                                                                <div
                                                                    key={bidder.id}
                                                                    onClick={() => {
                                                                        handleLinkBidder(bidder.id);
                                                                        setBidderQuery("");
                                                                        setBidderResults([]);
                                                                    }}
                                                                    style={{
                                                                        padding: '10px',
                                                                        cursor: 'pointer',
                                                                        borderBottom: '1px solid #eee',
                                                                        display: 'flex',
                                                                        alignItems: 'center',
                                                                        gap: '10px'
                                                                    }}
                                                                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f9fafb'}
                                                                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'white'}
                                                                >
                                                                    <img
                                                                        src={bidder.image || avatarFallback}
                                                                        alt={bidder.name}
                                                                        style={{ width: '24px', height: '24px', borderRadius: '50%' }}
                                                                        onError={(e) => (e.currentTarget as HTMLImageElement).src = avatarFallback}
                                                                    />
                                                                    <div>
                                                                        <div style={{ fontWeight: 500, fontSize: '14px' }}>{bidder.name || "Unknown"}</div>
                                                                        <div style={{ fontSize: '12px', color: '#666' }}>
                                                                            {bidder.email} {bidder.phone && `• ${bidder.phone}`} {bidder.bidderNumber && `• #${bidder.bidderNumber}`}
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            ))}
                                                            {availableBidders.length === 0 && !loadingBidderSearch && (
                                                                <div style={{ padding: '10px', fontSize: '14px', color: '#666', textAlign: 'center' }}>
                                                                    No bidder found
                                                                </div>
                                                            )}
                                                        </div>
                                                    )}

                                                    {/* Linked Bidders List */}
                                                    {linkedBidders.length > 0 && (
                                                        <div className="selected-bidders-list" style={{ marginTop: '5px' }}>
                                                            {loadingBidders && <div style={{ fontSize: '12px', color: '#666', marginBottom: '4px' }}>Updating list...</div>}
                                                            {linkedBidders.map((bidder) => (
                                                                <div key={bidder.bidderId} style={{
                                                                    display: 'flex',
                                                                    alignItems: 'center',
                                                                    justifyContent: 'space-between',
                                                                    padding: '8px 12px',
                                                                    backgroundColor: 'white',
                                                                    borderRadius: '6px',
                                                                    marginBottom: '6px'
                                                                }}>
                                                                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                                                        <img
                                                                            src={bidder.image || avatarFallback}
                                                                            alt={bidder.name}
                                                                            style={{ width: '24px', height: '24px', borderRadius: '50%' }}
                                                                            onError={(e) => (e.currentTarget as HTMLImageElement).src = avatarFallback}
                                                                        />
                                                                        <div>
                                                                            <div style={{ fontWeight: 500, fontSize: '13px' }}>{bidder.name || "Unknown"}</div>
                                                                            <div style={{ fontSize: '11px', color: '#666' }}>
                                                                                {bidder.email} {bidder.phone && `• ${bidder.phone}`} {bidder.bidderNumber && `• #${bidder.bidderNumber}`}
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <button
                                                                        type="button"
                                                                        onClick={() => handleUnlinkBidder(bidder.bidderId)}
                                                                        style={{
                                                                            border: 'none',
                                                                            background: 'none',
                                                                            color: '#EF4444',
                                                                            cursor: 'pointer',
                                                                            fontSize: '16px'
                                                                        }}
                                                                        title="Unlink"
                                                                    >
                                                                        &times;
                                                                    </button>
                                                                </div>
                                                            )
                                                            )}
                                                        </div>
                                                    )}
                                                </div>
                                                <div className="form-group">
                                                    <label
                                                        htmlFor="status"
                                                        style={{ cursor: 'pointer' }}
                                                        onClick={(e) => {
                                                            const el = document.getElementById('status');
                                                            if (el && 'showPicker' in el) {
                                                                // @ts-ignore
                                                                el.showPicker();
                                                            }
                                                        }}
                                                    >
                                                        Property Status
                                                    </label>
                                                    <select
                                                        id="status"
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
                                                        <option value="on_list">On List</option>
                                                        <option value="sold_at_tax_sale">Sold At Tax Sale</option>
                                                        <option value="redeemed">Redeemed</option>
                                                        <option value="voided">Voided</option>
                                                        <option value="cancelled">Cancelled</option>
                                                        <option value="deed_in_progress">Deed in Progress</option>
                                                        <option value="deed_issued">Deed Issued</option>
                                                        <option value="redeemed_check_issued">Redeemed Check Issued</option>
                                                    </select>
                                                </div>
                                            </div>

                                            <div className="form-row">
                                                <div className="form-group">
                                                    <label htmlFor="auctionEndDate" style={{ cursor: 'pointer' }}>Auction End Date</label>
                                                    <DatePicker
                                                        id="auctionEndDate"
                                                        selected={auctionEndDate}
                                                        onChange={(date: Date | null) => setAuctionEndDate(date)}
                                                        showTimeSelect={false}
                                                        dateFormat="MM/dd/yyyy"
                                                        placeholderText="MM/DD/YYYY"
                                                        className="date-picker-input"
                                                        wrapperClassName="date-picker-wrapper"
                                                    />
                                                </div>
                                                <div className="form-group">
                                                    {/* Spacer or additional field if needed */}
                                                </div>
                                            </div>
                                        </div>
                                    </form>
                                </div>

                                {/* Bottom Action Buttons */}
                                <div style={{ display: 'flex', gap: '12px' }}>
                                    <button
                                        type="submit"
                                        form="edit-property-form"
                                        className="btn-submit"
                                        disabled={saving}
                                    >
                                        {saving ? "Saving..." : "Save Changes"}
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

                        </div>

                        <div className="dashboard-sidebar">

                            {/* Document Attachments in Sidebar */}
                            <div className="sidebar-widget" style={{ background: 'white', padding: '20px', borderRadius: '12px', border: '1px solid #E5E7EB', marginBottom: '20px' }}>
                                <h3 style={{ fontSize: '18px', fontWeight: 600, marginBottom: '15px' }}>Document Attachments</h3>
                                <PropertyDocumentsManager ref={docsRef} propertyId={propertyId} />
                            </div>

                            {/* Visibility Settings in Sidebar */}
                            <div className="visibility-settings" style={{ background: 'white', padding: '20px', borderRadius: '12px', border: '1px solid #E5E7EB' }}>
                                <h3>Bidder Visibility Settings</h3>
                                <p className="settings-subtitle">
                                    Control what information bidders can see for this property
                                </p>
                                <div className="settings-grid" style={{ gridTemplateColumns: '1fr' }}>
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
                        </div>
                    </div>
                </div>
            </div >
            <Footer />
        </div >
    );
}


