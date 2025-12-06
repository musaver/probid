"use client";
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";

const AddBidderContent = () => {
  const router = useRouter();
  const [linkedProperties, setLinkedProperties] = useState([]);

  const availableProperties = [
    { address: "123 Main Street", parcelId: "123-456-789" },
    { address: "456 Oak Avenue", parcelId: "234-567-890" },
    { address: "789 Pine Road", parcelId: "345-678-901" },
    { address: "321 Elm Street", parcelId: "456-789-012" },
  ];

  const biddersData = [
    {
      bidderId: "BD001",
      name: "John Smith",
      email: "john@email.com",
      phone: "555-0101",
      linkedProperties: "3 properties",
      status: "Active",
    },
    {
      bidderId: "BD002",
      name: "Jane Doe",
      email: "jane@email.com",
      phone: "555-0102",
      linkedProperties: "5 properties",
      status: "Active",
    },
    {
      bidderId: "BD003",
      name: "Bob Johnson",
      email: "bob@email.com",
      phone: "555-0103",
      linkedProperties: "2 properties",
      status: "Active",
    },
  ];

  const handleLinkProperty = (property) => {
    if (!linkedProperties.find((p) => p.parcelId === property.parcelId)) {
      setLinkedProperties([...linkedProperties, property]);
    }
  };

  const handleUnlinkProperty = (parcelId) => {
    setLinkedProperties(linkedProperties.filter((p) => p.parcelId !== parcelId));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Redirect to bidder-profile page
    router.push("/bidder-profile");
  };

  return (
    <>
      <div className="dashboard-wrapper">
        {/* Dashboard Navigation */}
        <div className="dashboard-nav">
          <div className="container">
            <nav className="dashboard-menu">
              <Link href="/dashboard" className="nav-item">
                <svg width="18" height="18" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M7.5 2.5H3.33333C2.8731 2.5 2.5 2.8731 2.5 3.33333V9.16667C2.5 9.6269 2.8731 10 3.33333 10H7.5C7.96024 10 8.33333 9.6269 8.33333 9.16667V3.33333C8.33333 2.8731 7.96024 2.5 7.5 2.5Z" stroke="currentColor" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M16.6673 2.5H12.5007C12.0404 2.5 11.6673 2.8731 11.6673 3.33333V5.83333C11.6673 6.29357 12.0404 6.66667 12.5007 6.66667H16.6673C17.1276 6.66667 17.5007 6.29357 17.5007 5.83333V3.33333C17.5007 2.8731 17.1276 2.5 16.6673 2.5Z" stroke="currentColor" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M16.6673 10H12.5007C12.0404 10 11.6673 10.3731 11.6673 10.8333V16.6667C11.6673 17.1269 12.0404 17.5 12.5007 17.5H16.6673C17.1276 17.5 17.5007 17.1269 17.5007 16.6667V10.8333C17.5007 10.3731 17.1276 10 16.6673 10Z" stroke="currentColor" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M7.5 13.332H3.33333C2.8731 13.332 2.5 13.7051 2.5 14.1654V16.6654C2.5 17.1256 2.8731 17.4987 3.33333 17.4987H7.5C7.96024 17.4987 8.33333 17.1256 8.33333 16.6654V14.1654C8.33333 13.7051 7.96024 13.332 7.5 13.332Z" stroke="currentColor" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span>Dashboard</span>
              </Link>
              <Link href="/dashboard?tab=properties" className="nav-item">
                <svg width="18" height="18" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M5 18.3307V3.33073C5 2.8887 5.17559 2.46478 5.48816 2.15222C5.80072 1.83966 6.22464 1.66406 6.66667 1.66406H13.3333C13.7754 1.66406 14.1993 1.83966 14.5118 2.15222C14.8244 2.46478 15 2.8887 15 3.33073V18.3307H5Z" stroke="currentColor" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M4.99935 10H3.33268C2.89065 10 2.46673 10.1756 2.15417 10.4882C1.84161 10.8007 1.66602 11.2246 1.66602 11.6667V16.6667C1.66602 17.1087 1.84161 17.5326 2.15417 17.8452C2.46673 18.1577 2.89065 18.3333 3.33268 18.3333H4.99935" stroke="currentColor" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M15 7.5H16.6667C17.1087 7.5 17.5326 7.6756 17.8452 7.98816C18.1577 8.30072 18.3333 8.72464 18.3333 9.16667V16.6667C18.3333 17.1087 18.1577 17.5326 17.8452 17.8452C17.5326 18.1577 17.1087 18.3333 16.6667 18.3333H15" stroke="currentColor" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M8.33398 5H11.6673" stroke="currentColor" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M8.33398 8.33594H11.6673" stroke="currentColor" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M8.33398 11.6641H11.6673" stroke="currentColor" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M8.33398 15H11.6673" stroke="currentColor" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span>Properties</span>
              </Link>
              <Link href="/bid-management" className="nav-item">
                <svg width="18" height="18" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M11.6667 10.8368L4.68254 17.8201C4.51839 17.9843 4.3235 18.1146 4.109 18.2035C3.89451 18.2924 3.6646 18.3381 3.43242 18.3382C2.9635 18.3382 2.51376 18.152 2.18212 17.8205C1.85049 17.489 1.66414 17.0393 1.66406 16.5704C1.66398 16.1015 1.85019 15.6517 2.18171 15.3201L9.16837 8.33594" stroke="currentColor" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M13.334 13.3359L18.334 8.33594" stroke="currentColor" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M17.9167 8.7526L11.25 2.08594" stroke="currentColor" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M6.66602 6.66406L11.666 1.66406" stroke="currentColor" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M7.08398 6.25L13.7507 12.9167" stroke="currentColor" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span>Bid Management</span>
              </Link>
              <Link href="/dashboard?tab=bidders" className="nav-item active">
                <i className="bi bi-people"></i>
                <span>Bidders</span>
              </Link>
              <Link href="/visibility-control" className="nav-item">
                <svg width="18" height="18" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="2.5" y="5" width="15" height="11.6667" stroke="currentColor" strokeWidth="1.66667" strokeLinejoin="round"/>
                  <path d="M13.334 10.832C13.334 12.3068 12.1421 13.4987 10.6673 13.4987C9.19255 13.4987 8.00065 12.3068 8.00065 10.832C8.00065 9.35726 9.19255 8.16536 10.6673 8.16536C12.1421 8.16536 13.334 9.35726 13.334 10.832Z" stroke="currentColor" strokeWidth="1.66667" strokeLinejoin="round"/>
                  <path d="M5.83398 5V3.33333" stroke="currentColor" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M10.834 5V3.33333" stroke="currentColor" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M15.834 5V3.33333" stroke="currentColor" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span>Visibility Control</span>
              </Link>
              <Link href="/notifications" className="nav-item">
                <i className="bi bi-bell"></i>
                <span>Notifications</span>
              </Link>
              <Link href="/messaging" className="nav-item">
                <svg width="18" height="18" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M17.5 12.5C17.5 13.163 17.2366 13.7989 16.7678 14.2678C16.2989 14.7366 15.663 15 15 15H5L2.5 17.5V5C2.5 4.33696 2.76339 3.70107 3.23223 3.23223C3.70107 2.76339 4.33696 2.5 5 2.5H15C15.663 2.5 16.2989 2.76339 16.7678 3.23223C17.2366 3.70107 17.5 4.33696 17.5 5V12.5Z" stroke="currentColor" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span>Messaging</span>
              </Link>
              <Link href="/reports" className="nav-item">
                <svg width="18" height="18" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12.5007 1.66406H5.00065C4.55862 1.66406 4.1347 1.83966 3.82214 2.15222C3.50958 2.46478 3.33398 2.8887 3.33398 3.33073V16.6641C3.33398 17.1061 3.50958 17.53 3.82214 17.8426C4.1347 18.1551 4.55862 18.3307 5.00065 18.3307H15.0007C15.4427 18.3307 15.8666 18.1551 16.1792 17.8426C16.4917 17.53 16.6673 17.1061 16.6673 16.6641V5.83073L12.5007 1.66406Z" stroke="currentColor" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M11.666 1.66406V4.9974C11.666 5.43942 11.8416 5.86335 12.1542 6.17591C12.4667 6.48847 12.8907 6.66406 13.3327 6.66406H16.666" stroke="currentColor" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M8.33268 7.5H6.66602" stroke="currentColor" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M13.3327 10.8359H6.66602" stroke="currentColor" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M13.3327 14.1641H6.66602" stroke="currentColor" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span>Reports</span>
              </Link>
              <Link href="/subscription" className="nav-item">
                <svg width="18" height="16" viewBox="0 0 19 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="0.833984" y="0.835938" width="16.6667" height="11.6667" stroke="currentColor" strokeWidth="1.66667" strokeLinejoin="round"/>
                  <path d="M2.22266 5.69531H16.1115" stroke="currentColor" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span>Subscription</span>
              </Link>
              <Link href="/audit-log" className="nav-item">
                <svg width="18" height="18" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M11.666 1.66406V4.9974C11.666 5.43942 11.8416 5.86335 12.1542 6.17591C12.4667 6.48847 12.8907 6.66406 13.3327 6.66406H16.666" stroke="currentColor" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M3.55732 17.4974C3.70324 17.7501 3.91297 17.9601 4.16554 18.1064C4.4181 18.2526 4.70464 18.33 4.99648 18.3307H15.0007C15.4427 18.3307 15.8666 18.1551 16.1792 17.8426C16.4917 17.53 16.6673 17.1061 16.6673 16.6641V5.83073L12.5007 1.66406H5.00065C4.55862 1.66406 4.1347 1.83966 3.82214 2.15222C3.50958 2.46478 3.33398 2.8887 3.33398 3.33073V5.83073" stroke="currentColor" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M7.5 15L6.25 13.75" stroke="currentColor" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M4.16602 14.1641C5.54673 14.1641 6.66602 13.0448 6.66602 11.6641C6.66602 10.2834 5.54673 9.16406 4.16602 9.16406C2.7853 9.16406 1.66602 10.2834 1.66602 11.6641C1.66602 13.0448 2.7853 14.1641 4.16602 14.1641Z" stroke="currentColor" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span>Audit Log</span>
              </Link>
              <Link href="/profile" className="nav-item">
                <svg width="17" height="19" viewBox="0 0 17 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="0.833984" y="0.835938" width="14.9273" height="16.6368" stroke="currentColor" strokeWidth="1.66667" strokeLinejoin="round"/>
                  <path d="M8.29755 11.2373C9.32806 11.2373 10.1635 10.3063 10.1635 9.15772C10.1635 8.00919 9.32806 7.07812 8.29755 7.07812C7.26704 7.07812 6.43164 8.00919 6.43164 9.15772C6.43164 10.3063 7.26704 11.2373 8.29755 11.2373Z" stroke="currentColor" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span>Profile</span>
              </Link>
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <div className="dashboard-content">
          <div className="container">
            {/* Search and Add Bidder Button */}
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
              <Link href="/add-bidder" className="add-property-btn">
                <i className="bi bi-plus-circle"></i> Add Bidder
              </Link>
            </div>

            <div className="dashboard-grid">
              {/* Left Column - Add New Bidder Form */}
              <div className="dashboard-main">
                <div className="property-modal">
                  <div className="modal-header">
                    <h3>Add New Bidder</h3>
                    <Link href="/dashboard?tab=bidders" className="close-btn">
                      <i className="bi bi-x"></i>
                    </Link>
                  </div>
                  <div className="modal-body">
                    <form onSubmit={handleSubmit}>
                      <div className="form-row">
                        <div className="form-group">
                          <label>First Name</label>
                          <input type="text" placeholder="John" defaultValue="John" />
                        </div>
                        <div className="form-group">
                          <label>Last Name</label>
                          <input type="text" placeholder="Doe" defaultValue="Doe" />
                        </div>
                      </div>
                      <div className="form-row">
                        <div className="form-group">
                          <label>Email Address</label>
                          <input type="email" placeholder="john@example.com" defaultValue="john@example.com" />
                        </div>
                        <div className="form-group">
                          <label>Phone Number</label>
                          <input type="tel" placeholder="+1 (555) 123-4567" defaultValue="+1 (555) 123-4567" />
                        </div>
                      </div>
                      <div className="form-row">
                        <div className="form-group">
                          <label>Address</label>
                          <input type="text" placeholder="123 Main Street" defaultValue="123 Main Street" />
                        </div>
                        <div className="form-group">
                          <label>City</label>
                          <input type="text" placeholder="Springfield" defaultValue="Springfield" />
                        </div>
                      </div>
                      <div className="form-row">
                        <div className="form-group">
                          <label>State</label>
                          <input type="text" placeholder="IL" defaultValue="IL" />
                        </div>
                        <div className="form-group">
                          <label>ZIP Code</label>
                          <input type="text" placeholder="62701" defaultValue="62701" />
                        </div>
                      </div>
                      <div className="form-group full-width">
                        <label>Identity Documents</label>
                        <div className="file-upload-area">
                          <div className="upload-icon">
                            <i className="bi bi-upload"></i>
                          </div>
                          <p className="upload-text">Upload ID, Driver's License, or Passport</p>
                          <p className="upload-info">PDF, DOC, DOCX, JPG, PNG (Max 10MB each)</p>
                        </div>
                      </div>
                      <div className="form-group full-width">
                        <label>Additional Notes</label>
                        <textarea placeholder="Enter any additional information about this bidder..." rows="4"></textarea>
                      </div>
                      <div className="form-actions">
                        <button type="submit" className="btn-submit">
                          Add Bidder
                        </button>
                        <Link href="/dashboard?tab=bidders" className="btn-cancel">
                          Cancel
                        </Link>
                      </div>
                    </form>
                  </div>
                </div>
              </div>

              {/* Right Column - Link Properties */}
              <div className="dashboard-sidebar">
                <div className="sidebar-card">
                  <h4>Link Properties</h4>
                  <p className="settings-subtitle">Select which properties this bidder can access and bid on</p>
                  
                  {/* Linked Properties */}
                  <div className="linked-properties-section">
                    <h5>Linked Properties ({linkedProperties.length})</h5>
                    {linkedProperties.length === 0 ? (
                      <div className="empty-state" style={{ background: '#f9fafb' }}>
                        <i className="bi bi-building"></i>
                        <p>No properties linked yet</p>
                      </div>
                    ) : (
                      <div className="properties-list">
                        {linkedProperties.map((property, index) => (
                          <div key={index} className="property-item">
                            <div className="property-info">
                              <h6>{property.address}</h6>
                              <p>{property.parcelId}</p>
                            </div>
                            <button
                              className="link-btn linked"
                              onClick={() => handleUnlinkProperty(property.parcelId)}
                              type="button"
                            >
                              <i className="bi bi-x"></i>
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Available Properties */}
                  <div className="available-properties-section">
                    <h5>Available Properties</h5>
                    <div className="search-bidder">
                      <i className="bi bi-search"></i>
                      <input type="text" placeholder="Search properties..." />
                    </div>
                    <div className="properties-list">
                      {availableProperties.map((property, index) => (
                        <div key={index} className="property-item">
                          <div className="property-info">
                            <h6>{property.address}</h6>
                            <p>{property.parcelId}</p>
                          </div>
                          <button
                            className="link-btn available"
                            onClick={() => handleLinkProperty(property)}
                            type="button"
                            disabled={linkedProperties.some((p) => p.parcelId === property.parcelId)}
                          >
                            <i className="bi bi-plus"></i>
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Bidders Table */}
            <div className="properties-table-section" style={{
              background: '#ffffff',
              borderRadius: '12px',
              padding: '0',
              marginTop: '20px',
              overflow: 'hidden'
            }}>
              <div className="table-responsive">
                <table className="properties-table">
                  <thead>
                    <tr>
                      <th>Bidder ID</th>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Phone</th>
                      <th>Linked Properties</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {biddersData.map((bidder) => (
                      <tr key={bidder.bidderId}>
                        <td data-label="Bidder ID">{bidder.bidderId}</td>
                        <td data-label="Name">{bidder.name}</td>
                        <td data-label="Email">{bidder.email}</td>
                        <td data-label="Phone">{bidder.phone}</td>
                        <td data-label="Linked Properties" className="linked-properties">
                          <span style={{ color: "#6EA500" }}>{bidder.linkedProperties}</span>
                        </td>
                        <td data-label="Status">
                          <span className="status-badge active" style={{
                            backgroundColor: '#E9F1D9',
                            color: '#6EA500'
                          }}>{bidder.status}</span>
                        </td>
                        <td data-label="Actions">
                          <div className="action-buttons">
                            <button className="action-btn table-action" type="button" aria-label="Edit bidder" style={{ background: 'transparent', border: 'none' }}>
                              <i className="bi bi-pencil" style={{ color: '#3B82F6' }}></i>
                            </button>
                            <button className="action-btn table-action" type="button" aria-label="Delete bidder" style={{ background: 'transparent', border: 'none' }}>
                              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <g clipPath="url(#clip0_addbidder_28067)">
                                  <path d="M4.7168 16.2895V3.16176C4.7168 2.77491 4.8672 2.40389 5.13492 2.13035C5.40264 1.85681 5.76575 1.70312 6.14436 1.70312H11.8546C12.2332 1.70312 12.5963 1.85681 12.8641 2.13035C13.1318 2.40389 13.2822 2.77491 13.2822 3.16176V16.2895H4.7168Z" stroke="#6EA500" strokeWidth="1.44301" strokeLinecap="round" strokeLinejoin="round"/>
                                </g>
                                <g clipPath="url(#clip1_addbidder_28067)">
                                  <path d="M4.34609 9.14844H2.9914C2.63212 9.14844 2.28755 9.29092 2.0335 9.54453C1.77945 9.79814 1.63672 10.1421 1.63672 10.5008V14.5578C1.63672 14.9165 1.77945 15.2605 2.0335 15.5141C2.28755 15.7677 2.63212 15.9102 2.9914 15.9102H4.34609" stroke="#6EA500" strokeWidth="1.35352" strokeLinecap="round" strokeLinejoin="round"/>
                                </g>
                                <g clipPath="url(#clip2_addbidder_28067)">
                                  <path d="M13.6523 6.9375H15.007C15.3663 6.9375 15.7109 7.08587 15.9649 7.34995C16.219 7.61404 16.3617 7.97223 16.3617 8.3457V14.6826C16.3617 15.0561 16.219 15.4143 15.9649 15.6784C15.7109 15.9425 15.3663 16.0908 15.007 16.0908H13.6523" stroke="#6EA500" strokeWidth="1.38119" strokeLinecap="round" strokeLinejoin="round"/>
                                </g>
                                <g clipPath="url(#clip3_addbidder_28067)">
                                  <path d="M7.65039 4.5H10.3504" stroke="#6EA500" strokeWidth="1.23238" strokeLinecap="round" strokeLinejoin="round"/>
                                </g>
                                <g clipPath="url(#clip4_addbidder_28067)">
                                  <path d="M7.65039 7.50781H10.3504" stroke="#6EA500" strokeWidth="1.23878" strokeLinecap="round" strokeLinejoin="round"/>
                                </g>
                                <g clipPath="url(#clip5_addbidder_28067)">
                                  <path d="M7.65039 10.4922H10.3504" stroke="#6EA500" strokeWidth="1.23878" strokeLinecap="round" strokeLinejoin="round"/>
                                </g>
                                <g clipPath="url(#clip6_addbidder_28067)">
                                  <path d="M7.65039 13.5H10.3504" stroke="#6EA500" strokeWidth="1.23238" strokeLinecap="round" strokeLinejoin="round"/>
                                </g>
                                <defs>
                                  <clipPath id="clip0_addbidder_28067">
                                    <rect width="10.4688" height="16.5312" fill="white" transform="translate(3.76562 0.734375)"/>
                                  </clipPath>
                                  <clipPath id="clip1_addbidder_28067">
                                    <rect width="4.51562" height="9.01562" fill="white" transform="translate(0.734375 8.25)"/>
                                  </clipPath>
                                  <clipPath id="clip2_addbidder_28067">
                                    <rect width="4.51562" height="11.2656" fill="white" transform="translate(12.75 6)"/>
                                  </clipPath>
                                  <clipPath id="clip3_addbidder_28067">
                                    <rect width="4.5" height="1.5" fill="white" transform="translate(6.75 3.75)"/>
                                  </clipPath>
                                  <clipPath id="clip4_addbidder_28067">
                                    <rect width="4.5" height="1.51562" fill="white" transform="translate(6.75 6.75)"/>
                                  </clipPath>
                                  <clipPath id="clip5_addbidder_28067">
                                    <rect width="4.5" height="1.51562" fill="white" transform="translate(6.75 9.73438)"/>
                                  </clipPath>
                                  <clipPath id="clip6_addbidder_28067">
                                    <rect width="4.5" height="1.5" fill="white" transform="translate(6.75 12.75)"/>
                                  </clipPath>
                                </defs>
                              </svg>
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
        </div>
      </div>
    </>
  );
};

export default AddBidderContent;

