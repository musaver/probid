"use client";
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import DashboardNav from "@/components/dashboard/DashboardNav";
import Footer from "@/components/footer/Footer";

const AddPropertyContent = () => {
    const router = useRouter();
    const [showModal, setShowModal] = useState(true);
    const [visibilitySettings, setVisibilitySettings] = useState({
        minBid: true,
        currentBid: true,
        bidHistory: false,
        propertyStatus: true,
        bidderList: false,
        documents: false,
    });

    const [formData, setFormData] = useState({
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

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const toggleSetting = (setting: keyof typeof visibilitySettings) => {
        setVisibilitySettings((prev) => ({
            ...prev,
            [setting]: !prev[setting],
        }));
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
                router.push(`/property-details/${data.propertyId}`);
            } else {
                console.error("Failed to add property");
            }
        } catch (error) {
            console.error("Error adding property:", error);
        }
    };

    // Placeholder data for UI
    const linkedBidders = [
        { name: "John Doe", email: "johndoe@example.com", avatar: "/assets/img/avatar.png", isImage: true },
    ];

    const availableBidders = [
        { name: "Michael Brown", email: "michael@example.com", avatar: "/assets/img/avatar.png", isImage: true },
    ];

    const properties = [
        {
            parcelId: "123-456-789",
            address: "123 Main Street",
            city: "Springfield",
            minBid: "$50,000",
            currentBid: "$52,000",
            status: "Active",
        },
    ];

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
                        <button className="add-property-btn" onClick={() => setShowModal(true)}>
                            <i className="bi bi-plus-circle"></i> Add Property
                        </button>
                    </div>

                    <div className="dashboard-grid">
                        <div className="dashboard-main">
                            {showModal && (
                                <div className="property-modal">
                                    <div className="modal-header">
                                        <h3>Add New Property</h3>
                                        <button className="close-btn" onClick={() => setShowModal(false)}>
                                            <i className="bi bi-x"></i>
                                        </button>
                                    </div>
                                    <div className="modal-body">
                                        <form onSubmit={handleSubmit}>
                                            <div className="form-row">
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
                                            </div>
                                            <div className="form-row">
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
                                                <div className="file-upload-area">
                                                    <div className="upload-icon">
                                                        <i className="bi bi-upload"></i>
                                                    </div>
                                                    <p className="upload-text">Click to upload files</p>
                                                    <p className="upload-info">PDF, DOC, DOCX, JPG, PNG (Max 10MB each)</p>
                                                </div>
                                            </div>
                                            <div className="form-actions">
                                                <button type="submit" className="btn-submit">
                                                    Add Property
                                                </button>
                                                <button type="button" className="btn-cancel" onClick={() => setShowModal(false)}>
                                                    Cancel
                                                </button>
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
                                            {properties.map((property, index) => (
                                                <tr key={index}>
                                                    <td data-label="Parcel ID">{property.parcelId}</td>
                                                    <td data-label="Address">{property.address}</td>
                                                    <td data-label="City">{property.city}</td>
                                                    <td data-label="Min Bid">{property.minBid}</td>
                                                    <td data-label="Current Bid">{property.currentBid}</td>
                                                    <td data-label="Status">
                                                        <span className={`status-badge ${property.status.toLowerCase()}`}>
                                                            {property.status}
                                                        </span>
                                                    </td>
                                                    <td data-label="Actions">
                                                        <div className="action-buttons">
                                                            <button className="action-btn edit">
                                                                <i className="bi bi-pencil"></i>
                                                            </button>
                                                            <button className="action-btn delete">
                                                                <i className="bi bi-trash"></i>
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>

                        <div className="dashboard-sidebar">
                            <div className="sidebar-card">
                                <h4>Linked Bidders</h4>
                                <div className="bidders-list">
                                    {linkedBidders.map((bidder, index) => (
                                        <div key={index} className="bidder-item">
                                            <div className="bidder-avatar">
                                                <img src={bidder.avatar} alt={bidder.name} />
                                            </div>
                                            <div className="bidder-info">
                                                <h5>{bidder.name}</h5>
                                                <p>{bidder.email}</p>
                                            </div>
                                            <button className="link-btn linked">
                                                <i className="bi bi-check-lg"></i>
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="sidebar-card">
                                <h4>Link New Bidder</h4>
                                <div className="search-bidder">
                                    <i className="bi bi-search"></i>
                                    <input type="text" placeholder="Search bidders by name or email..." />
                                </div>
                                <div className="bidders-list">
                                    {availableBidders.map((bidder, index) => (
                                        <div key={index} className="bidder-item">
                                            <div className="bidder-avatar">
                                                <img src={bidder.avatar} alt={bidder.name} />
                                            </div>
                                            <div className="bidder-info">
                                                <h5>{bidder.name}</h5>
                                                <p>{bidder.email}</p>
                                            </div>
                                            <button className="link-btn available">
                                                <i className="bi bi-plus"></i>
                                            </button>
                                        </div>
                                    ))}
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
