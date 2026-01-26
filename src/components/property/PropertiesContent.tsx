"use client";
import React, { useMemo, useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react";
import DashboardNav from "@/components/dashboard/DashboardNav";
import Footer from "@/components/footer/Footer";
import { formatDateWithTime } from "@/lib/dateFormatter";
import { formatCurrency, formatDisplayCurrency } from "@/lib/format";
import BulkUploadModal from "./BulkUploadModal";

const getStatusStyles = (status: string) => {
    switch (status) {
        case 'active': return { backgroundColor: '#dcfce7', color: '#166534', borderColor: '#bbf7d0' };
        case 'sold': return { backgroundColor: '#dbeafe', color: '#1e40af', borderColor: '#bfdbfe' };
        case 'withdrawn': return { backgroundColor: '#f3f4f6', color: '#1f2937', borderColor: '#e5e7eb' };
        case 'on_list': return { backgroundColor: '#fef9c3', color: '#854d0e', borderColor: '#fde047' };
        case 'sold_at_tax_sale': return { backgroundColor: '#f3e8ff', color: '#6b21a8', borderColor: '#e9d5ff' };
        case 'redeemed': return { backgroundColor: '#e0e7ff', color: '#3730a3', borderColor: '#c7d2fe' };
        case 'voided':
        case 'cancelled': return { backgroundColor: '#fee2e2', color: '#991b1b', borderColor: '#fecaca' };
        case 'deed_in_progress': return { backgroundColor: '#cffafe', color: '#155f75', borderColor: '#a5f3fc' };
        case 'deed_issued': return { backgroundColor: '#ccfbf1', color: '#115e59', borderColor: '#99f6e4' };
        case 'redeemed_check_issued': return { backgroundColor: '#e0e7ff', color: '#3730a3', borderColor: '#c7d2fe' };
        default: return { backgroundColor: '#ffffff', color: '#374151', borderColor: '#d1d5db' };
    }
};

const PropertiesContent = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const { data: session } = useSession();
    const isCounty = session?.user?.type === "county";
    const [properties, setProperties] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState(searchParams.get("q") || "");
    const endingSoon = searchParams.get("endingSoon") === "1";
    const [deletingId, setDeletingId] = useState<string | null>(null);

    // Sorting & Filtering State
    const [sortConfig, setSortConfig] = useState<{ key: string | null; direction: 'asc' | 'desc' }>({ key: null, direction: 'asc' });
    const [statusFilter, setStatusFilter] = useState<string>("all");

    // Inline Status Editing State
    const [editingStatusId, setEditingStatusId] = useState<string | null>(null);
    const [updatingStatus, setUpdatingStatus] = useState(false);

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

    // Alert Modal State
    const [showAlertModal, setShowAlertModal] = useState(false);
    const [alertProperty, setAlertProperty] = useState<any>(null);
    const [alertSubject, setAlertSubject] = useState("");
    const [alertMessage, setAlertMessage] = useState("");
    const [sendingAlert, setSendingAlert] = useState(false);
    const [alertBidderIds, setAlertBidderIds] = useState<string[]>([]);
    const [loadingAlertBidders, setLoadingAlertBidders] = useState(false);

    // Bulk Upload State
    const [showBulkUpload, setShowBulkUpload] = useState(false);

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

    const handleSort = (key: string) => {
        setSortConfig((prev) => ({
            key,
            direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc',
        }));
    };

    const handleStatusUpdate = async (id: string, newStatus: string) => {
        if (!newStatus) return;
        setUpdatingStatus(true);
        try {
            const res = await fetch(`/api/properties/${id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ status: newStatus }),
            });
            if (!res.ok) {
                alert("Failed to update status");
                return;
            }
            // Update local state
            setProperties((prev) =>
                prev.map((p) => (p.id === id ? { ...p, status: newStatus } : p))
            );
            setEditingStatusId(null);
        } catch (e) {
            console.error("Status update error:", e);
            alert("Failed to update status");
        } finally {
            setUpdatingStatus(false);
        }
    };

    const processedProperties = useMemo(() => {
        let filtered = [...properties];

        // Filter by status
        if (statusFilter !== "all") {
            filtered = filtered.filter((p) => p.status === statusFilter);
        }

        // Sort
        if (sortConfig.key) {
            filtered.sort((a, b) => {
                let aVal = a[sortConfig.key!];
                let bVal = b[sortConfig.key!];

                // Handle dates
                if (sortConfig.key === 'createdAt') {
                    aVal = new Date(aVal).getTime();
                    bVal = new Date(bVal).getTime();
                }

                // Handle numbers (stripping currency symbols if needed, but data seems raw or numbers)
                if (typeof aVal === 'string' && !isNaN(Number(aVal))) aVal = Number(aVal);
                if (typeof bVal === 'string' && !isNaN(Number(bVal))) bVal = Number(bVal);

                // Handle nulls
                if (aVal === null || aVal === undefined) return 1;
                if (bVal === null || bVal === undefined) return -1;

                if (aVal < bVal) return sortConfig.direction === 'asc' ? -1 : 1;
                if (aVal > bVal) return sortConfig.direction === 'asc' ? 1 : -1;
                return 0;
            });
        }

        return filtered;
    }, [properties, sortConfig, statusFilter]);

    const handleViewProperty = (id: string) => {
        router.push(`/property-details/${id}`);
    };

    const handleEditProperty = (id: string) => {
        router.push(`/edit-property/${id}`);
    };

    const handleDeleteProperty = async (id: string) => {
        if (!isCounty) return;
        if (!confirm("Are you sure you want to delete this property? This cannot be undone.")) return;
        setDeletingId(id);
        try {
            const res = await fetch(`/api/properties/${id}`, { method: "DELETE" });
            if (!res.ok) {
                const text = await res.text().catch(() => "");
                alert(text || "Failed to delete property");
                return;
            }
            // Optimistic update
            setProperties((prev) => prev.filter((p) => p.id !== id));
        } catch (e) {
            console.error("Delete property error:", e);
            alert("Failed to delete property");
        } finally {
            setDeletingId(null);
        }
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

    const openAlertModal = async (property: any) => {
        setAlertProperty(property);
        setAlertSubject(`Update: ${property.address}`);
        setAlertMessage("");
        setShowAlertModal(true);
        setLoadingAlertBidders(true);
        setLinkedBidders([]);
        setAlertBidderIds([]);

        try {
            const res = await fetch(`/api/properties/${property.id}/linked-bidders`);
            if (res.ok) {
                const data = await res.json();
                setLinkedBidders(data);
                setAlertBidderIds(data.map((b: any) => b.bidderId));
            }
        } catch (e) {
            console.error("Error loading linked bidders:", e);
        } finally {
            setLoadingAlertBidders(false);
        }
    };

    const sendAlert = async () => {
        if (!alertMessage.trim()) return alert("Message is required");
        setSendingAlert(true);
        try {
            const subject = alertSubject.trim() || `Update: ${alertProperty?.address || "Property"}`;
            const res = await fetch(`/api/properties/${alertProperty.id}/alerts`, {
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
                            <div className="filter-dropdown-wrapper" style={{ marginLeft: '12px' }}>
                                <select
                                    value={statusFilter}
                                    onChange={(e) => setStatusFilter(e.target.value)}
                                    style={{
                                        padding: '10px 24px 10px 14px',
                                        borderRadius: '999px',
                                        border: '1px solid rgba(17,24,39,0.12)',
                                        fontSize: '14px',
                                        cursor: 'pointer',
                                        backgroundColor: '#fff',
                                        outline: 'none',
                                        paddingRight: '32px', // Space for arrow
                                        backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
                                        backgroundPosition: 'right 0.5rem center',
                                        backgroundRepeat: 'no-repeat',
                                        backgroundSize: '1.5em 1.5em',
                                        appearance: 'none',
                                        WebkitAppearance: 'none'
                                    }}
                                >
                                    <option value="all">All Statuses</option>
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
                            <div className="filter-dropdown-wrapper" style={{ marginLeft: '12px' }}>
                                <select
                                    value={sortConfig.key ? `${sortConfig.key}_${sortConfig.direction}` : ""}
                                    onChange={(e) => {
                                        const val = e.target.value;
                                        if (!val) {
                                            setSortConfig({ key: null, direction: 'asc' });
                                            return;
                                        }
                                        const [key, direction] = val.split('_');
                                        setSortConfig({ key, direction: direction as 'asc' | 'desc' });
                                    }}
                                    style={{
                                        padding: '10px 24px 10px 14px',
                                        borderRadius: '999px',
                                        border: '1px solid rgba(17,24,39,0.12)',
                                        fontSize: '14px',
                                        cursor: 'pointer',
                                        backgroundColor: '#fff',
                                        outline: 'none',
                                        paddingRight: '32px', // Space for arrow
                                        backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
                                        backgroundPosition: 'right 0.5rem center',
                                        backgroundRepeat: 'no-repeat',
                                        backgroundSize: '1.5em 1.5em',
                                        appearance: 'none',
                                        WebkitAppearance: 'none'
                                    }}
                                >
                                    <option value="">Sort By...</option>
                                    <option value="createdAt_desc">Date Added (Newest)</option>
                                    <option value="createdAt_asc">Date Added (Oldest)</option>
                                    <option value="currentBid_desc">Current Bid (High to Low)</option>
                                    <option value="currentBid_asc">Current Bid (Low to High)</option>
                                    <option value="parcelId_asc">Parcel ID (A-Z)</option>
                                    <option value="address_asc">Address (A-Z)</option>
                                </select>
                            </div>
                        </div>

                        {isCounty && (
                            <div style={{ display: "flex", gap: "10px" }}>
                                <button
                                    onClick={() => setShowBulkUpload(true)}
                                    className="add-property-btn"
                                    style={{ background: "#2563EB" }} // Different color for distinction
                                >
                                    <i className="bi bi-file-earmark-spreadsheet"></i> Import Properties
                                </button>
                                <Link href="/add-property" className="add-property-btn">
                                    <i className="bi bi-plus-circle"></i> Add Property
                                </Link>
                            </div>
                        )}

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
                                            Showing auctions ending in the next 10 days.
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
                                        {[
                                            { label: 'Parcel ID', key: 'parcelId' },
                                            { label: 'Owner Name(s)', key: 'owners' },
                                            { label: 'Added', key: 'createdAt' },
                                            { label: 'Min Bid', key: 'minBid' },
                                            { label: 'Current Bid', key: 'currentBid' },
                                            { label: 'Winning Bid', key: 'winningBid' },
                                            { label: 'Status', key: 'status' },
                                        ].map((head) => (
                                            <th
                                                key={head.key}
                                                onClick={() => handleSort(head.key)}
                                                style={{ cursor: 'pointer', whiteSpace: 'nowrap' }}
                                            >
                                                {head.label}
                                                {sortConfig.key === head.key && (
                                                    <i className={`bi bi-sort-${sortConfig.direction === 'asc' ? 'down' : 'up'}`} style={{ marginLeft: '6px' }}></i>
                                                )}
                                            </th>
                                        ))}
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {loading ? (
                                        <tr>
                                            <td colSpan={8} style={{ textAlign: "center", padding: "20px" }}>
                                                Loading properties...
                                            </td>
                                        </tr>
                                    ) : processedProperties.length === 0 ? (
                                        <tr>
                                            <td colSpan={8} style={{ textAlign: "center", padding: "20px" }}>
                                                No properties found.
                                            </td>
                                        </tr>
                                    ) : (
                                        processedProperties.map((property) => (
                                            <tr key={property.id}>
                                                <td data-label="Parcel ID">{property.parcelId || "-"}</td>
                                                <td data-label="Owner Name(s)">
                                                    <div>{Array.isArray(property.owners) ? property.owners.join(", ") : property.owners || "-"}</div>
                                                    <div style={{ fontSize: '11px', color: '#666' }}>ID: {property.saleId}</div>
                                                </td>
                                                <td data-label="Added">{formatDateWithTime(property.createdAt) || "-"}</td>
                                                <td data-label="Min Bid">{formatDisplayCurrency(property.minBid) || "-"}</td>
                                                <td data-label="Current Bid">
                                                    {(property.currentBid && Number(property.currentBid) > Number(property.minBid))
                                                        ? formatDisplayCurrency(property.currentBid)
                                                        : "-"}
                                                </td>
                                                <td data-label="Winning Bid">{formatDisplayCurrency(property.winningBid) || "-"}</td>

                                                <td data-label="Actions">
                                                    <div className="action-buttons">
                                                        <button
                                                            className="action-btn view"
                                                            onClick={() => handleViewProperty(property.id)}
                                                            title="View Property"
                                                        >
                                                            <i className="bi bi-eye"></i>
                                                        </button>
                                                        {isCounty && (
                                                            <button
                                                                className="action-btn edit"
                                                                title="Edit Property"
                                                                onClick={() => handleEditProperty(property.id)}
                                                            >
                                                                <i className="bi bi-pencil"></i>
                                                            </button>
                                                        )}
                                                        {/* 
                                                        {isCounty && (
                                                            <button
                                                                className="action-btn"
                                                                title="Add Bid (County)"
                                                                onClick={() => openBidModal(property)}
                                                            >
                                                                <i className="bi bi-hammer"></i>
                                                            </button>
                                                        )}
                                                        */}
                                                        {isCounty && Number(property.linkedBiddersCount) > 0 && (
                                                            <button
                                                                className="action-btn"
                                                                title="Send Alert"
                                                                onClick={() => openAlertModal(property)}
                                                            >
                                                                <i className="bi bi-bell"></i>
                                                            </button>
                                                        )}
                                                        {isCounty && (
                                                            <button
                                                                className="action-btn delete"
                                                                title="Delete Property"
                                                                onClick={() => handleDeleteProperty(property.id)}
                                                                disabled={deletingId === property.id}
                                                                style={
                                                                    deletingId === property.id
                                                                        ? { opacity: 0.6, cursor: "not-allowed" }
                                                                        : undefined
                                                                }
                                                            >
                                                                <i className="bi bi-trash"></i>
                                                            </button>
                                                        )}
                                                    </div>
                                                </td>

                                                <td data-label="Status">
                                                    {isCounty ? (
                                                        <select
                                                            value={property.status}
                                                            onChange={(e) => handleStatusUpdate(property.id, e.target.value)}
                                                            disabled={updatingStatus}
                                                            style={{
                                                                padding: '6px 10px',
                                                                borderRadius: '6px',
                                                                fontSize: '13px',
                                                                width: '100%',
                                                                cursor: 'pointer',
                                                                ...getStatusStyles(property.status)
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
                                                    ) : (
                                                        <span
                                                            className={`status-badge ${property.status?.toLowerCase()}`}
                                                        >
                                                            {property.status}
                                                        </span>
                                                    )}
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

            {
                showBidModal && (
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
                                            placeholder="$50,000"
                                            value={bidAmount}
                                            onChange={(e) => {
                                                const clean = e.target.value.replace(/[^0-9.]/g, "");
                                                const parts = clean.split(".");
                                                if (parts.length > 2) return;
                                                setBidAmount(formatCurrency(clean));
                                            }}
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
                                                                {formatDateWithTime(bid.createdAt)}
                                                            </div>
                                                        </div>
                                                        <div style={{ fontWeight: 800, color: "#6EA500" }}>
                                                            {formatDisplayCurrency(bid.amount)}
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
                )
            }

            {showBulkUpload && <BulkUploadModal onClose={() => setShowBulkUpload(false)} />}

            {showAlertModal && (
                <div
                    className="app-modal-overlay"
                    onClick={() => setShowAlertModal(false)}
                >
                    <div
                        className="app-modal"
                        onClick={(e) => e.stopPropagation()}
                        style={{ maxWidth: '600px' }}
                    >
                        <div className="app-modal-header">
                            <div>
                                <h2 className="app-modal-title">Send Alert</h2>
                                <p style={{ fontSize: "13px", color: "#6B7280", marginTop: "4px" }}>
                                    This will email all linked bidders and also send a copy to the county.
                                </p>
                            </div>
                            <button
                                onClick={() => setShowAlertModal(false)}
                                className="app-modal-close"
                                aria-label="Close"
                            >
                                ×
                            </button>
                        </div>

                        <div style={{ marginTop: "16px" }}>
                            <div
                                style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                    marginBottom: "10px",
                                }}
                            >
                                <label style={{ fontWeight: 700 }}>Recipients</label>
                                <button
                                    onClick={() => {
                                        if (alertBidderIds.length === linkedBidders.length) {
                                            setAlertBidderIds([]);
                                        } else {
                                            setAlertBidderIds(linkedBidders.map((b) => b.bidderId));
                                        }
                                    }}
                                    style={{
                                        background: "none",
                                        border: "none",
                                        color: "#6EA500",
                                        cursor: "pointer",
                                        fontWeight: 600,
                                        fontSize: "12px",
                                        padding: 0,
                                    }}
                                >
                                    {alertBidderIds.length === linkedBidders.length ? "Uncheck all" : "Check all"}
                                </button>
                            </div>

                            {loadingAlertBidders ? (
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
                                placeholder={`Update: ${alertProperty?.address || "Property"}`}
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
                                onClick={sendAlert}
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

        </div >
    );
};

export default PropertiesContent;
