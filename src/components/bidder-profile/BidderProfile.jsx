"use client";
import React, { useState } from "react";
import Link from "next/link";

const BidderProfile = () => {
  const [activeTab, setActiveTab] = useState("overview");

  const bidderData = {
    id: "BD001",
    name: "John Smith",
    email: "john@email.com",
    phone: "555-0101",
    memberSince: "Jan 15, 2024",
    address: "123 Main St, Springfield, IL 62701",
    status: "Active",
    avatar: "/assets/img/bidders/john-doe.png",
    stats: {
      linkedProperties: 3,
      totalBids: 5,
      winningBids: 2,
      messages: 3,
    },
    recentActivity: [
      {
        type: "bid",
        title: "Placed bid on 123 Main St",
        description: "Bid amount: $245,000",
        time: "2 days ago",
      },
      {
        type: "payment",
        title: "Read payment reminder",
        description: "Payment notification opened",
        time: "3 days ago",
      },
      {
        type: "link",
        title: "Linked to new property",
        description: "789 Pine Road added",
        time: "5 days ago",
      },
    ],
    properties: [
      {
        id: "PO01",
        address: "123 Main Street",
        addressDetail: "123-456-789",
        currentBid: "$245,000",
        myBid: "$245,000",
        status: "Winning",
        bidDate: "Oct 10, 2024",
        auctionEnds: "Oct 20, 2024",
      },
      {
        id: "PO02",
        address: "456 Oak Avenue",
        addressDetail: "234-567-890",
        currentBid: "$180,000",
        myBid: "$175,000",
        status: "Outbid",
        bidDate: "Oct 8, 2024",
        auctionEnds: "Oct 18, 2024",
      },
      {
        id: "PO03",
        address: "789 Pine Road",
        addressDetail: "345-678-901",
        currentBid: "$320,000",
        myBid: "$320,000",
        status: "Winning",
        bidDate: "Oct 12, 2024",
        auctionEnds: "Oct 22, 2024",
      },
    ],
    communications: [
      {
        type: "email",
        title: "Payment Reminder",
        description: "Reminder: Payment due for property 123 Main St",
        date: "Oct 14, 2024 10:30 AM",
        sentBy: "County Admin",
        status: "Read",
      },
      {
        type: "question",
        title: "Question about property",
        description: "Bidder asked about property details for 456 Oak Ave",
        date: "Oct 12, 2024 2:15 PM",
        sentBy: "John Smith",
        status: "Replied",
      },
      {
        type: "notification",
        title: "Bid Confirmation",
        description: "Your bid of $245,000 has been placed successfully",
        date: "Oct 10, 2024 9:45 AM",
        sentBy: "System",
        status: "Read",
      },
      {
        type: "email",
        title: "Auction Closing Soon",
        description: "Auction for 789 Pine Road closes in 24 hours",
        date: "Oct 9, 2024 8:00 AM",
        sentBy: "County Admin",
        status: "Read",
      },
    ],
  };

  return (
    <div className="bp-page-wrapper">
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
            <Link href="/add-property" className="nav-item">
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
            <Link href="/add-bidder" className="nav-item active">
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
      <div className="bp-main-content">
        <div className="container">
          {/* Back Button */}
          <Link href="/add-bidder" className="bp-back-link">
            <i className="bi bi-arrow-left"></i>
            Back to Bidders
          </Link>

          {/* Profile Header Card */}
          <div className="bp-profile-card">
            {/* Status Badge - Top Right */}
            <span className="bp-status-badge active">{bidderData.status}</span>

            <div className="bp-profile-header">
              <div className="bp-avatar-section">
                <div className="bp-avatar">
                  <img src={bidderData.avatar} alt={bidderData.name} />
                </div>
                <div className="bp-basic-info">
                  <h1 className="bp-name">{bidderData.name}</h1>
                  <p className="bp-bidder-id">Bidder ID: {bidderData.id}</p>

                  {/* Contact Info Icons */}
                  <div className="bp-contact-icons">
                    <div className="bp-contact-icon-item">
                      <div className="bp-icon-box email">
                        <i className="bi bi-envelope"></i>
                      </div>
                      <div className="bp-icon-text">
                        <span className="bp-label">Email</span>
                        <span className="bp-value">{bidderData.email}</span>
                      </div>
                    </div>
                    <div className="bp-contact-icon-item">
                      <div className="bp-icon-box phone">
                        <i className="bi bi-telephone"></i>
                      </div>
                      <div className="bp-icon-text">
                        <span className="bp-label">Phone</span>
                        <span className="bp-value">{bidderData.phone}</span>
                      </div>
                    </div>
                    <div className="bp-contact-icon-item">
                      <div className="bp-icon-box calendar">
                        <i className="bi bi-calendar"></i>
                      </div>
                      <div className="bp-icon-text">
                        <span className="bp-label">Member Since</span>
                        <span className="bp-value">{bidderData.memberSince}</span>
                      </div>
                    </div>
                  </div>

                  {/* Address */}
                  
                </div>
              </div>

              {/* Horizontal Line */}
              <div className="bp-divider"></div>
              <div className="bp-address">
                    <i className="bi bi-geo-alt"></i>
                    {bidderData.address}
                  </div>

              {/* Action Buttons */}
              <div className="bp-action-buttons">
                <button className="bp-btn primary">
                  <i className="bi bi-chat-dots"></i>
                  Send Message
                </button>
                <button className="bp-btn secondary">
                  <i className="bi bi-pencil"></i>
                  Edit Profile
                </button>
                <button className="bp-btn secondary">
                  <i className="bi bi-building"></i>
                  Manage Properties
                </button>
              </div>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="bp-stats-grid">
            <div className="bp-stat-card purple">
              <div className="bp-stat-icon">
                <svg width="24" height="24" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <g clipPath="url(#clip0_221_28067)">
                    <path d="M4.7168 16.2895V3.16176C4.7168 2.77491 4.8672 2.40389 5.13492 2.13035C5.40264 1.85681 5.76575 1.70312 6.14436 1.70312H11.8546C12.2332 1.70312 12.5963 1.85681 12.8641 2.13035C13.1318 2.40389 13.2822 2.77491 13.2822 3.16176V16.2895H4.7168Z" stroke="white" strokeWidth="1.44301" strokeLinecap="round" strokeLinejoin="round"/>
                  </g>
                  <g clipPath="url(#clip1_221_28067)">
                    <path d="M4.34609 9.14844H2.9914C2.63212 9.14844 2.28755 9.29092 2.0335 9.54453C1.77945 9.79814 1.63672 10.1421 1.63672 10.5008V14.5578C1.63672 14.9165 1.77945 15.2605 2.0335 15.5141C2.28755 15.7677 2.63212 15.9102 2.9914 15.9102H4.34609" stroke="white" strokeWidth="1.35352" strokeLinecap="round" strokeLinejoin="round"/>
                  </g>
                  <g clipPath="url(#clip2_221_28067)">
                    <path d="M13.6523 6.9375H15.007C15.3663 6.9375 15.7109 7.08587 15.9649 7.34995C16.219 7.61404 16.3617 7.97223 16.3617 8.3457V14.6826C16.3617 15.0561 16.219 15.4143 15.9649 15.6784C15.7109 15.9425 15.3663 16.0908 15.007 16.0908H13.6523" stroke="white" strokeWidth="1.38119" strokeLinecap="round" strokeLinejoin="round"/>
                  </g>
                  <g clipPath="url(#clip3_221_28067)">
                    <path d="M7.65039 4.5H10.3504" stroke="white" strokeWidth="1.23238" strokeLinecap="round" strokeLinejoin="round"/>
                  </g>
                  <g clipPath="url(#clip4_221_28067)">
                    <path d="M7.65039 7.50781H10.3504" stroke="white" strokeWidth="1.23878" strokeLinecap="round" strokeLinejoin="round"/>
                  </g>
                  <g clipPath="url(#clip5_221_28067)">
                    <path d="M7.65039 10.4922H10.3504" stroke="white" strokeWidth="1.23878" strokeLinecap="round" strokeLinejoin="round"/>
                  </g>
                  <g clipPath="url(#clip6_221_28067)">
                    <path d="M7.65039 13.5H10.3504" stroke="white" strokeWidth="1.23238" strokeLinecap="round" strokeLinejoin="round"/>
                  </g>
                  <defs>
                    <clipPath id="clip0_221_28067">
                      <rect width="10.4688" height="16.5312" fill="white" transform="translate(3.76562 0.734375)"/>
                    </clipPath>
                    <clipPath id="clip1_221_28067">
                      <rect width="4.51562" height="9.01562" fill="white" transform="translate(0.734375 8.25)"/>
                    </clipPath>
                    <clipPath id="clip2_221_28067">
                      <rect width="4.51562" height="11.2656" fill="white" transform="translate(12.75 6)"/>
                    </clipPath>
                    <clipPath id="clip3_221_28067">
                      <rect width="4.5" height="1.5" fill="white" transform="translate(6.75 3.75)"/>
                    </clipPath>
                    <clipPath id="clip4_221_28067">
                      <rect width="4.5" height="1.51562" fill="white" transform="translate(6.75 6.75)"/>
                    </clipPath>
                    <clipPath id="clip5_221_28067">
                      <rect width="4.5" height="1.51562" fill="white" transform="translate(6.75 9.73438)"/>
                    </clipPath>
                    <clipPath id="clip6_221_28067">
                      <rect width="4.5" height="1.5" fill="white" transform="translate(6.75 12.75)"/>
                    </clipPath>
                  </defs>
                </svg>
              </div>
              <div className="bp-stat-content">
                <div className="bp-stat-number">{bidderData.stats.linkedProperties}</div>
                <div className="bp-stat-label">Linked Properties</div>
              </div>
              <div className="bp-stat-badge">Active</div>
            </div>
            <div className="bp-stat-card green">
              <div className="bp-stat-icon">
                <svg width="24" height="24" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M10.5004 9.75075L4.21468 16.0357C4.06694 16.1835 3.89154 16.3008 3.69849 16.3808C3.50545 16.4608 3.29853 16.502 3.08957 16.502C2.66754 16.5021 2.26277 16.3345 1.9643 16.0361C1.66583 15.7378 1.49812 15.333 1.49805 14.911C1.49798 14.489 1.66556 14.0842 1.96393 13.7857L8.25193 7.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M12 12L16.5 7.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M16.125 7.875L10.125 1.875" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M6 6L10.5 1.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M6.375 5.625L12.375 11.625" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div className="bp-stat-content">
                <div className="bp-stat-number">{bidderData.stats.totalBids}</div>
                <div className="bp-stat-label">Total Bids</div>
              </div>
              <div className="bp-stat-badge">Total</div>
            </div>
            <div className="bp-stat-card red">
              <div className="bp-stat-icon">
                <i className="bi bi-currency-dollar"></i>
              </div>
              <div className="bp-stat-content">
                <div className="bp-stat-number">{bidderData.stats.winningBids}</div>
                <div className="bp-stat-label">Winning Bids</div>
              </div>
              <div className="bp-stat-badge">Winning</div>
            </div>
            <div className="bp-stat-card orange">
              <div className="bp-stat-icon">
                <i className="bi bi-bell"></i>
              </div>
              <div className="bp-stat-content">
                <div className="bp-stat-number">{bidderData.stats.messages}</div>
                <div className="bp-stat-label">Messages</div>
              </div>
              <div className="bp-stat-badge">Unread</div>
            </div>
          </div>

          {/* Tabs */}
          <div className="bp-tabs">
            <button
              className={`bp-tab ${activeTab === "overview" ? "active" : ""}`}
              onClick={() => setActiveTab("overview")}
            >
              Overview
            </button>
            <button
              className={`bp-tab ${activeTab === "properties" ? "active" : ""}`}
              onClick={() => setActiveTab("properties")}
            >
              Properties & Bids
            </button>
            <button
              className={`bp-tab ${activeTab === "communication" ? "active" : ""}`}
              onClick={() => setActiveTab("communication")}
            >
              Communication Log
            </button>
          </div>

          {/* Tab Content */}
          {activeTab === "overview" && (
            <div className="bp-content-grid">
              {/* Contact Information */}
              <div className="bp-info-card">
                <h3>Contact Information</h3>
                <div className="bp-info-list">
                  <div className="bp-info-item">
                    <div className="bp-info-icon email">
                      <i className="bi bi-envelope"></i>
                    </div>
                    <div className="bp-info-details">
                      <span className="bp-info-label">Email Address</span>
                      <span className="bp-info-value">{bidderData.email}</span>
                    </div>
                  </div>
                  <div className="bp-info-item">
                    <div className="bp-info-icon phone">
                      <i className="bi bi-telephone"></i>
                    </div>
                    <div className="bp-info-details">
                      <span className="bp-info-label">Phone Number</span>
                      <span className="bp-info-value">{bidderData.phone}</span>
                    </div>
                  </div>
                  <div className="bp-info-item">
                    <div className="bp-info-icon location">
                      <i className="bi bi-geo-alt"></i>
                    </div>
                    <div className="bp-info-details">
                      <span className="bp-info-label">Mailing Address</span>
                      <span className="bp-info-value">{bidderData.address}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Recent Activity */}
              <div className="bp-info-card">
                <h3>Recent Activity</h3>
                <div className="bp-activity-list">
                  {bidderData.recentActivity.map((activity, index) => (
                    <div className="bp-activity-item" key={index}>
                      <div className={`bp-activity-dot ${activity.type}`}></div>
                      <div className="bp-activity-content">
                        <h4>{activity.title}</h4>
                        <p>{activity.description}</p>
                        <span className="bp-activity-time">{activity.time}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Properties & Bids Tab */}
          {activeTab === "properties" && (
            <div>
              <h3 style={{ fontSize: '18px', fontWeight: '700', color: '#1A1A1A', marginBottom: '20px' }}>
                Associated Properties & Bids
              </h3>
              <div className="bp-properties-table-wrapper">
                <table className="bp-properties-table">
                  <thead>
                    <tr>
                      <th>Property ID</th>
                      <th>Address</th>
                      <th>Current Bid</th>
                      <th>My Bid</th>
                      <th>Status</th>
                      <th>Bid Date</th>
                      <th>Auction Ends</th>
                    </tr>
                  </thead>
                  <tbody>
                    {bidderData.properties.map((property, index) => (
                      <tr key={index}>
                        <td>{property.id}</td>
                        <td>
                          <div className="bp-address-cell">
                            <div className="bp-address-main">{property.address}</div>
                            <div className="bp-address-detail">{property.addressDetail}</div>
                          </div>
                        </td>
                        <td>{property.currentBid}</td>
                        <td className="bp-my-bid">{property.myBid}</td>
                        <td>
                          <span className={`bp-status-tag ${property.status.toLowerCase()}`}>
                            {property.status}
                          </span>
                        </td>
                        <td>{property.bidDate}</td>
                        <td>{property.auctionEnds}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Communication Log Tab */}
          {activeTab === "communication" && (
            <div className="bp-communication-container">
              <div className="bp-communication-wrapper">
                <div className="bp-communication-header">
                  <div>
                    <h3 className="bp-communication-title">Communication Log</h3>
                    <p className="bp-communication-subtitle">All communications with this bidder</p>
                  </div>
                  <button className="bp-new-message-btn">
                    <i className="bi bi-send"></i>
                    New Message
                  </button>
                </div>

                <div className="bp-communication-list">
                  {bidderData.communications.map((comm, index) => (
                    <div className="bp-communication-item" key={index}>
                      <div className={`bp-comm-icon ${comm.type}`}>
                        {comm.type === "email" && <i className="bi bi-envelope"></i>}
                        {comm.type === "question" && <i className="bi bi-chat-left-text"></i>}
                        {comm.type === "notification" && <i className="bi bi-bell"></i>}
                      </div>
                      <div className="bp-comm-content">
                        <h4 className="bp-comm-title">{comm.title}</h4>
                        <p className="bp-comm-description">{comm.description}</p>
                        <div className="bp-comm-meta">
                          <span className="bp-comm-date">
                            <i className="bi bi-clock"></i>
                            {comm.date}
                          </span>
                          <span className="bp-comm-sender">• Sent by: {comm.sentBy}</span>
                        </div>
                      </div>
                      <span className={`bp-comm-status ${comm.status.toLowerCase()}`}>
                        {comm.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BidderProfile;
