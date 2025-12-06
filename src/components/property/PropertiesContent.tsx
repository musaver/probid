"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import DashboardNav from "@/components/dashboard/DashboardNav";
import Footer from "@/components/footer/Footer";

const PropertiesContent = () => {
    const router = useRouter();
    const [properties, setProperties] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProperties = async () => {
            try {
                const response = await fetch("/api/properties");
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
    }, []);

    const handleViewProperty = (id: string) => {
        router.push(`/property-details/${id}`);
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
                                <input type="text" placeholder="Search properties..." />
                            </div>
                            <button className="filter-btn">
                                Filter <i className="bi bi-chevron-down"></i>
                            </button>
                        </div>
                        <Link href="/add-property" className="add-property-btn">
                            <i className="bi bi-plus-circle"></i> Add Property
                        </Link>
                    </div>

                    <div className="properties-table-section">
                        <h3>All Properties</h3>
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
                                                        <button className="action-btn edit" title="Edit Property">
                                                            <i className="bi bi-pencil"></i>
                                                        </button>
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
        </div>
    );
};

export default PropertiesContent;
