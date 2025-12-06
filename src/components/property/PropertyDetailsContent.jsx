"use client";
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";


const PropertyDetailsContent = () => {
  const [activeTab, setActiveTab] = useState("overview");

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
    {
      bidder: "John Doe",
      amount: "$51,000",
      status: "Outbid",
      date: "Oct 12, 2024 2:15 PM",
    },
    {
      bidder: "Michael Brown",
      amount: "$50,500",
      status: "Outbid",
      date: "Oct 11, 2024 9:20 AM",
    },
  ];

  const linkedBidders = [
    {
      id: "80002",
      name: "John Doe",
      email: "johndoe@example.com",
      avatar: "/images/Image (John Doe).png",
    },
    {
      id: "80003",
      name: "Jane Smith",
      email: "janesmith@example.com",
      avatar: "/images/Image (John Doe).png",
    },
  ];

  const [visibilitySettings, setVisibilitySettings] = useState({
    minBid: true,
    currentBid: true,
    bidHistory: false,
    propertyStatus: true,
    bidderList: false,
    documents: true,
  });

  const toggleVisibility = (setting) => {
    setVisibilitySettings(prev => ({
      ...prev,
      [setting]: !prev[setting]
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
    {
      name: "Tax_Certificate.pdf",
      size: "1.2 MB",
      type: "Tax Document",
      uploadDate: "Oct 1, 2024",
    },
    {
      name: "Survey_Report.pdf",
      size: "3.8 MB",
      type: "Survey",
      uploadDate: "Oct 2, 2024",
    },
  ];

  return (
    <>
      <div className="dashboard-wrapper">
        {/* Dashboard Navigation */}
        <div className="dashboard-nav">
          <div className="container">
            <nav className="dashboard-menu">
              <Link href="/dashboard" className="nav-item">
                <svg width="18" height="18" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M7.5 2.5H3.33333C2.8731 2.5 2.5 2.8731 2.5 3.33333V9.16667C2.5 9.6269 2.8731 10 3.33333 10H7.5C7.96024 10 8.33333 9.6269 8.33333 9.16667V3.33333C8.33333 2.8731 7.96024 2.5 7.5 2.5Z" stroke="currentColor" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M16.6673 2.5H12.5007C12.0404 2.5 11.6673 2.8731 11.6673 3.33333V5.83333C11.6673 6.29357 12.0404 6.66667 12.5007 6.66667H16.6673C17.1276 6.66667 17.5007 6.29357 17.5007 5.83333V3.33333C17.5007 2.8731 17.1276 2.5 16.6673 2.5Z" stroke="currentColor" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M16.6673 10H12.5007C12.0404 10 11.6673 10.3731 11.6673 10.8333V16.6667C11.6673 17.1269 12.0404 17.5 12.5007 17.5H16.6673C17.1276 17.5 17.5007 17.1269 17.5007 16.6667V10.8333C17.5007 10.3731 17.1276 10 16.6673 10Z" stroke="currentColor" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M7.5 13.332H3.33333C2.8731 13.332 2.5 13.7051 2.5 14.1654V16.6654C2.5 17.1256 2.8731 17.4987 3.33333 17.4987H7.5C7.96024 17.4987 8.33333 17.1256 8.33333 16.6654V14.1654C8.33333 13.7051 7.96024 13.332 7.5 13.332Z" stroke="currentColor" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span>Dashboard</span>
              </Link>
              <Link href="/add-property" className="nav-item active">
                <svg width="18" height="18" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M5 18.3307V3.33073C5 2.8887 5.17559 2.46478 5.48816 2.15222C5.80072 1.83966 6.22464 1.66406 6.66667 1.66406H13.3333C13.7754 1.66406 14.1993 1.83966 14.5118 2.15222C14.8244 2.46478 15 2.8887 15 3.33073V18.3307H5Z" stroke="currentColor" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M4.99935 10H3.33268C2.89065 10 2.46673 10.1756 2.15417 10.4882C1.84161 10.8007 1.66602 11.2246 1.66602 11.6667V16.6667C1.66602 17.1087 1.84161 17.5326 2.15417 17.8452C2.46673 18.1577 2.89065 18.3333 3.33268 18.3333H4.99935" stroke="currentColor" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M15 7.5H16.6667C17.1087 7.5 17.5326 7.6756 17.8452 7.98816C18.1577 8.30072 18.3333 8.72464 18.3333 9.16667V16.6667C18.3333 17.1087 18.1577 17.5326 17.8452 17.8452C17.5326 18.1577 17.1087 18.3333 16.6667 18.3333H15" stroke="currentColor" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M8.33398 5H11.6673" stroke="currentColor" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M8.33398 8.33594H11.6673" stroke="currentColor" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M8.33398 11.6641H11.6673" stroke="currentColor" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M8.33398 15H11.6673" stroke="currentColor" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span>Properties</span>
              </Link>
              <Link href="/bid-management" className="nav-item">
                <svg width="18" height="18" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M11.6667 10.8368L4.68254 17.8201C4.51839 17.9843 4.3235 18.1146 4.109 18.2035C3.89451 18.2924 3.6646 18.3381 3.43242 18.3382C2.9635 18.3382 2.51376 18.152 2.18212 17.8205C1.85049 17.489 1.66414 17.0393 1.66406 16.5704C1.66398 16.1015 1.85019 15.6517 2.18171 15.3201L9.16837 8.33594" stroke="currentColor" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M13.334 13.3359L18.334 8.33594" stroke="currentColor" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M17.9167 8.7526L11.25 2.08594" stroke="currentColor" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M6.66602 6.66406L11.666 1.66406" stroke="currentColor" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M7.08398 6.25L13.7507 12.9167" stroke="currentColor" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span>Bid Management</span>
              </Link>
              <Link href="#" className="nav-item">
                <Image src={peopleIcon} alt="Bidders" width={18} height={18} />
                <span>Bidders</span>
              </Link>
              <Link href="/visibility-control" className="nav-item">
                <svg width="18" height="18" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="2.5" y="5" width="15" height="11.6667" stroke="currentColor" strokeWidth="1.66667" strokeLinejoin="round" />
                  <path d="M13.334 10.832C13.334 12.3068 12.1421 13.4987 10.6673 13.4987C9.19255 13.4987 8.00065 12.3068 8.00065 10.832C8.00065 9.35726 9.19255 8.16536 10.6673 8.16536C12.1421 8.16536 13.334 9.35726 13.334 10.832Z" stroke="currentColor" strokeWidth="1.66667" strokeLinejoin="round" />
                  <path d="M5.83398 5V3.33333" stroke="currentColor" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M10.834 5V3.33333" stroke="currentColor" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M15.834 5V3.33333" stroke="currentColor" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span>Visibility Control</span>
              </Link>
              <Link href="/notifications" className="nav-item">
                <i className="bi bi-bell"></i>
                <span>Notifications</span>
              </Link>
              <Link href="/messaging" className="nav-item">
                <svg width="18" height="18" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M17.5 12.5C17.5 13.163 17.2366 13.7989 16.7678 14.2678C16.2989 14.7366 15.663 15 15 15H5L2.5 17.5V5C2.5 4.33696 2.76339 3.70107 3.23223 3.23223C3.70107 2.76339 4.33696 2.5 5 2.5H15C15.663 2.5 16.2989 2.76339 16.7678 3.23223C17.2366 3.70107 17.5 4.33696 17.5 5V12.5Z" stroke="currentColor" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span>Messaging</span>
              </Link>
              <Link href="/reports" className="nav-item">
                <svg width="18" height="18" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12.5007 1.66406H5.00065C4.55862 1.66406 4.1347 1.83966 3.82214 2.15222C3.50958 2.46478 3.33398 2.8887 3.33398 3.33073V16.6641C3.33398 17.1061 3.50958 17.53 3.82214 17.8426C4.1347 18.1551 4.55862 18.3307 5.00065 18.3307H15.0007C15.4427 18.3307 15.8666 18.1551 16.1792 17.8426C16.4917 17.53 16.6673 17.1061 16.6673 16.6641V5.83073L12.5007 1.66406Z" stroke="currentColor" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M11.666 1.66406V4.9974C11.666 5.43942 11.8416 5.86335 12.1542 6.17591C12.4667 6.48847 12.8907 6.66406 13.3327 6.66406H16.666" stroke="currentColor" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M8.33268 7.5H6.66602" stroke="currentColor" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M13.3327 10.8359H6.66602" stroke="currentColor" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M13.3327 14.1641H6.66602" stroke="currentColor" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span>Reports</span>
              </Link>
              <Link href="/subscription" className="nav-item">
                <svg width="18" height="16" viewBox="0 0 19 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="0.833984" y="0.835938" width="16.6667" height="11.6667" stroke="currentColor" strokeWidth="1.66667" strokeLinejoin="round" />
                  <path d="M2.22266 5.69531H16.1115" stroke="currentColor" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span>Subscription</span>
              </Link>
              <Link href="/audit-log" className="nav-item">
                <svg width="18" height="18" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M11.666 1.66406V4.9974C11.666 5.43942 11.8416 5.86335 12.1542 6.17591C12.4667 6.48847 12.8907 6.66406 13.3327 6.66406H16.666" stroke="currentColor" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M3.55732 17.4974C3.70324 17.7501 3.91297 17.9601 4.16554 18.1064C4.4181 18.2526 4.70464 18.33 4.99648 18.3307H15.0007C15.4427 18.3307 15.8666 18.1551 16.1792 17.8426C16.4917 17.53 16.6673 17.1061 16.6673 16.6641V5.83073L12.5007 1.66406H5.00065C4.55862 1.66406 4.1347 1.83966 3.82214 2.15222C3.50958 2.46478 3.33398 2.8887 3.33398 3.33073V5.83073" stroke="currentColor" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M7.5 15L6.25 13.75" stroke="currentColor" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M4.16602 14.1641C5.54673 14.1641 6.66602 13.0448 6.66602 11.6641C6.66602 10.2834 5.54673 9.16406 4.16602 9.16406C2.7853 9.16406 1.66602 10.2834 1.66602 11.6641C1.66602 13.0448 2.7853 14.1641 4.16602 14.1641Z" stroke="currentColor" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span>Audit Log</span>
              </Link>
              <Link href="/profile" className="nav-item">
                <svg width="17" height="19" viewBox="0 0 17 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="0.833984" y="0.835938" width="14.9273" height="16.6368" stroke="currentColor" strokeWidth="1.66667" strokeLinejoin="round" />
                  <path d="M8.29755 11.2373C9.32806 11.2373 10.1635 10.3063 10.1635 9.15772C10.1635 8.00919 9.32806 7.07812 8.29755 7.07812C7.26704 7.07812 6.43164 8.00919 6.43164 9.15772C6.43164 10.3063 7.26704 11.2373 8.29755 11.2373Z" stroke="currentColor" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span>Profile</span>
              </Link>
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <div className="property-details-content">
          <div className="container">
            {/* Back to Properties */}
            <Link href="/add-property" className="back-link">
              <i className="bi bi-arrow-left"></i> Back to Properties
            </Link>

            {/* Property Header */}
            <div className="property-header-card">
              <div className="property-title-section">
                <div className="property-icon">
                  <Image src="/images/brands/Icon.svg" alt="Property" width={32} height={32} />
                </div>
                <div className="property-title-info">
                  <h1>123 Main Street</h1>
                  <p className="property-location">Springfield, IL 62701</p>
                  <p className="property-parcel">Parcel ID: 123-456-789</p>
                </div>
                <span className="status-badge-large active">Active</span>
              </div>

              {/* Stats Cards */}
              <div className="property-stats-grid">
                <div className="stat-card-1">
                  <div className="stat-icon-1">
                    <Image src="/images/brands/dolContainer.png" alt="Dollar" width={48} height={48} />
                  </div>
                  <div className="stat-info-1">
                    <p className="stat-label-1">Minimum Bid</p>
                    <p className="stat-value-1">$50,000</p>
                  </div>
                </div>
                <div className="stat-card-1">
                  <div className="stat-icon">
                    <Image src="/images/brands/auContainer (1).png" alt="Gavel" width={48} height={48} />
                  </div>
                  <div className="stat-info-1">
                    <p className="stat-label-1">Current Bid</p>
                    <p className="stat-value-1">$52,000</p>
                  </div>
                </div>
                <div className="stat-card-1">
                  <div className="stat-icon-1">
                    <Image src="/images/brands/Container (2).png" alt="Ruler" width={48} height={48} />
                  </div>
                  <div className="stat-info-1">
                    <p className="stat-label">Square Feet</p>
                    <p className="stat-value-1">2,400</p>
                  </div>
                </div>
                <div className="stat-card-1">
                  <div className="stat-icon-1">
                    <Image src="/images/brands/Container (3).png" alt="Calendar" width={48} height={48} />
                  </div>
                  <div className="stat-info-1">
                    <p className="stat-label-1">Auction Ends</p>
                    <p className="stat-value-1">Oct</p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="property-actions">
                <button className="action-btn-1 primary">
                  <i className="bi bi-pencil-square"></i> Edit Property
                </button>
                <button className="action-btn-1 secondary">
                  <Image src="/images/Icon.svg" alt="People" width={18} height={18} /> Manage Bidders
                </button>
                <button className="action-btn-1 secondary">
                  <i className="bi bi-bell"></i> Send Alert
                </button>
              </div>
            </div>

            {/* Tabs Navigation */}
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

            {/* Tab Content */}
            {activeTab === "overview" && (
              <div className="property-details-grid">
                {/* Property Details */}
                <div className="details-section">
                  <div className="details-card">
                    <h3>Property Details</h3>
                    <div className="detail-group">
                      <h4>Description</h4>
                      <p>
                        Beautiful residential property with 3 bedrooms, 2 bathrooms.
                        Recently renovated kitchen and hardwood floors throughout.
                      </p>
                    </div>
                    <div className="detail-row">
                      <div className="detail-item">
                        <h4>Lot Size</h4>
                        <p>0.25 acres</p>
                      </div>
                      <div className="detail-item">
                        <h4>Year Built</h4>
                        <p>1985</p>
                      </div>
                    </div>
                    <div className="auction-timeline">
                      <div className="timeline-icon">
                        <i className="bi bi-clock"></i>
                      </div>
                      <div className="timeline-info">
                        <h4>Auction Timeline</h4>
                        <p>Ends: Oct 20, 2024 5:00 PM</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Recent Bidding Activity */}
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
                  <button className="link-bidder-btn">
                    <i className="bi bi-plus-circle"></i> Link Bidder
                  </button>
                </div>

                <div className="bidders-grid">
                  {linkedBidders.map((bidder, index) => (
                    <div key={index} className="linked-bidder-card">
                      <div className="bidder-details">
                        <div className="bidder-avatar-large">
                          <Image
                            src={bidder.avatar}
                            alt={bidder.name}
                            width={48}
                            height={48}
                            style={{ borderRadius: '50%', objectFit: 'cover' }}
                          />
                        </div>
                        <div className="bidder-info-text">
                          <h3>{bidder.name}</h3>
                          <p className="bidder-email">{bidder.email}</p>
                          <p className="bidder-id">ID {bidder.id}</p>
                        </div>
                      </div>
                      <div className="bidder-actions">
                        <button className="btn-view-profile">View Profile</button>
                        <button className="btn-unlink">Unlink</button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "visibility" && (
              <div className="visibility-control-section">
                <div className="visibility-header">
                  <h2>Bidder Visibility Settings</h2>
                  <p>Control what information bidders can see for this property</p>
                </div>

                <div className="visibility-settings-grid">
                  <div className="visibility-item">
                    <div className="visibility-info">
                      <div className="visibility-icon" style={{ color: '#3B82F6' }}>
                        <i className="bi bi-currency-dollar"></i>
                      </div>
                      <div className="visibility-text">
                        <h4>Min Bid</h4>
                        <p>Show minimum bid amount to all bidders</p>
                      </div>
                    </div>
                    <label className="toggle-switch">
                      <input
                        type="checkbox"
                        checked={visibilitySettings.minBid}
                        onChange={() => toggleVisibility('minBid')}
                      />
                      <span className="slider"></span>
                    </label>
                  </div>

                  <div className="visibility-item">
                    <div className="visibility-info">
                      <div className="visibility-icon" style={{ color: '#10B981' }}>
                        <Image src="/images/icons/Auction icon.svg" alt="Auction" width={20} height={20} />
                      </div>
                      <div className="visibility-text">
                        <h4>Current Bid</h4>
                        <p>Show current highest bid to all bidders</p>
                      </div>
                    </div>
                    <label className="toggle-switch">
                      <input
                        type="checkbox"
                        checked={visibilitySettings.currentBid}
                        onChange={() => toggleVisibility('currentBid')}
                      />
                      <span className="slider"></span>
                    </label>
                  </div>

                  <div className="visibility-item">
                    <div className="visibility-info">
                      <div className="visibility-icon" style={{ color: '#8B5CF6' }}>
                        <i className="bi bi-clock-history"></i>
                      </div>
                      <div className="visibility-text">
                        <h4>Bid History</h4>
                        <p>Show complete bidding history</p>
                      </div>
                    </div>
                    <label className="toggle-switch">
                      <input
                        type="checkbox"
                        checked={visibilitySettings.bidHistory}
                        onChange={() => toggleVisibility('bidHistory')}
                      />
                      <span className="slider"></span>
                    </label>
                  </div>

                  <div className="visibility-item">
                    <div className="visibility-info">
                      <div className="visibility-icon" style={{ color: '#F59E0B' }}>
                        <i className="bi bi-info-circle"></i>
                      </div>
                      <div className="visibility-text">
                        <h4>Property Status</h4>
                        <p>Show property status/state</p>
                      </div>
                    </div>
                    <label className="toggle-switch">
                      <input
                        type="checkbox"
                        checked={visibilitySettings.propertyStatus}
                        onChange={() => toggleVisibility('propertyStatus')}
                      />
                      <span className="slider"></span>
                    </label>
                  </div>

                  <div className="visibility-item">
                    <div className="visibility-info">
                      <div className="visibility-icon" style={{ color: '#EC4899' }}>
                        <i className="bi bi-people"></i>
                      </div>
                      <div className="visibility-text">
                        <h4>Bidder List</h4>
                        <p>Show list of other bidders</p>
                      </div>
                    </div>
                    <label className="toggle-switch">
                      <input
                        type="checkbox"
                        checked={visibilitySettings.bidderList}
                        onChange={() => toggleVisibility('bidderList')}
                      />
                      <span className="slider"></span>
                    </label>
                  </div>

                  <div className="visibility-item">
                    <div className="visibility-info">
                      <div className="visibility-icon" style={{ color: '#6366F1' }}>
                        <i className="bi bi-file-earmark-text"></i>
                      </div>
                      <div className="visibility-text">
                        <h4>Documents</h4>
                        <p>Allow bidders to download attachments</p>
                      </div>
                    </div>
                    <label className="toggle-switch">
                      <input
                        type="checkbox"
                        checked={visibilitySettings.documents}
                        onChange={() => toggleVisibility('documents')}
                      />
                      <span className="slider"></span>
                    </label>
                  </div>
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
      </div>
    </>
  );
};

export default PropertyDetailsContent;
