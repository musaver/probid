import Header from "@/components/header/Header";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import DashboardNav from "@/components/dashboard/DashboardNav";
import Footer from "@/components/footer/Footer";
import { db } from "@/lib/db";
import { user } from "@/lib/schema";
import { eq } from "drizzle-orm";

export const metadata = {
  icons: {
    icon: "/assets/img/fav-icon.svg",
  },
};



const biddersListingData = [
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

const DashboardPage = async ({ searchParams }: { searchParams: Promise<{ tab?: string }> }) => {
  const resolvedSearchParams = await searchParams;
  const tabParam = resolvedSearchParams?.tab;
  const activeTab = tabParam === "bidders" ? tabParam : "overview";
  const session = await getServerSession(authOptions);

  // Redirect to register if not authenticated
  if (!session) {
    redirect("/register");
  }

  // Fetch user data from database
  let userData = null;
  if (session?.user?.email) {
    const [dbUser] = await db
      .select()
      .from(user)
      .where(eq(user.email, session.user.email))
      .limit(1);
    userData = dbUser;
  }

  return (
    <>
      <Header />

      {/* Dashboard Navigation */}
      <DashboardNav activeTab={activeTab} />

      {/* Dashboard Content */}
      {activeTab === "bidders" ? (
        <BiddersListingSection />
      ) : (
        <DashboardOverviewSection session={session} userData={userData} />
      )}


      {/* Footer */}
      <Footer />
    </>
  );
};

export default DashboardPage;

const DashboardOverviewSection = ({ session, userData }: { session: any; userData: any }) => {
  const displayName = userData?.name || session?.user?.name || "User";
  const displayEmail = userData?.email || session?.user?.email || "No Email";
  
  return (
    <div className="dashboard-content">
      <div className="container">
        {/* User Profile Section */}
        <div className="user-profile-section">
          <div className="user-avatar">
            {session?.user?.image ? (
              <img src={session.user.image} alt={displayName} />
            ) : (
              <div style={{
                width: '100%',
                height: '100%',
                backgroundColor: '#6ea500',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '28px',
                fontWeight: '600',
                color: '#ffffff'
              }}>
                {displayName.charAt(0).toUpperCase()}
              </div>
            )}
          </div>
          <div className="user-info">
            <h1>Hi, {displayName}</h1>
            <p>{displayEmail}</p>
          </div>
        </div>

      {/* Stats Cards */}
      <div className="stats-grid">
        <div className="stat-card stat-card-purple">
          <div className="stat-content">
            <h3>Total Properties</h3>
            <h2>280</h2>
          </div>
          <div className="stat-mask">
            <img src="/assets/img/stat-card-mask.svg" alt="" aria-hidden="true" />
          </div>
        </div>

        <div className="stat-card stat-card-green">
          <div className="stat-content">
            <h3>Active Bidders</h3>
            <h2>50</h2>
          </div>
          <div className="stat-mask">
            <img src="/assets/img/stat-card-mask.svg" alt="" aria-hidden="true" />
          </div>
        </div>

        <div className="stat-card stat-card-red">
          <div className="stat-content">
            <h3>Won Auctions</h3>
            <h2>25</h2>
          </div>
          <div className="stat-mask">
            <img src="/assets/img/stat-card-mask.svg" alt="" aria-hidden="true" />
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="recent-activity-section">
        <h2>Recent Activity</h2>
        <div className="activity-table-container">
          <table className="activity-table">
            <thead>
              <tr>
                <th>Activity</th>
                <th>Property/Name</th>
                <th>Time</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>New property added</td>
                <td>123 Main St</td>
                <td>2 mins ago</td>
              </tr>
              <tr>
                <td>Bid placed</td>
                <td>456 Oak Ave</td>
                <td>15 mins ago</td>
              </tr>
              <tr>
                <td>Auction won</td>
                <td>789 Pine Rd</td>
                <td>1 hour ago</td>
              </tr>
              <tr>
                <td>New bidder registered</td>
                <td>John Smith</td>
                <td>2 hours ago</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="action-buttons-section">
        <button className="action-btn action-btn-primary">
          <i className="bi bi-plus"></i>
          <span>Add Property</span>
        </button>
        <button className="action-btn action-btn-secondary">
          <i className="bi bi-person-plus"></i>
          <span>Add Bidder</span>
        </button>
        <button className="action-btn action-btn-secondary">
          <i className="bi bi-bell"></i>
          <span>Send Notice</span>
        </button>
        <button className="action-btn action-btn-secondary">
          <i className="bi bi-download"></i>
          <span>Export Data</span>
        </button>
      </div>

      {/* Notification Banner */}
      <div className="notification-banner">
        <div className="notification-icon">
          <i className="bi bi-exclamation-triangle-fill"></i>
        </div>
        <div className="notification-content">
          <h4>3 Upcoming Auction Deadlines</h4>
          <p>Properties closing in the next 48 hours require your attention</p>
        </div>
        <button className="notification-btn">View All</button>
      </div>
    </div>
  </div>
  );
};



const BiddersListingSection = () => (
  <div className="dashboard-content">
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
        <Link href="/add-bidder" className="add-property-btn">
          <i className="bi bi-plus-circle"></i>
          <span>Add Bidder</span>
        </Link>
      </div>

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
              {biddersListingData.map((bidder) => (
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
                          <g clipPath="url(#clip0_221_28067)">
                            <path d="M4.7168 16.2895V3.16176C4.7168 2.77491 4.8672 2.40389 5.13492 2.13035C5.40264 1.85681 5.76575 1.70312 6.14436 1.70312H11.8546C12.2332 1.70312 12.5963 1.85681 12.8641 2.13035C13.1318 2.40389 13.2822 2.77491 13.2822 3.16176V16.2895H4.7168Z" stroke="#6EA500" strokeWidth="1.44301" strokeLinecap="round" strokeLinejoin="round" />
                          </g>
                          <g clipPath="url(#clip1_221_28067)">
                            <path d="M4.34609 9.14844H2.9914C2.63212 9.14844 2.28755 9.29092 2.0335 9.54453C1.77945 9.79814 1.63672 10.1421 1.63672 10.5008V14.5578C1.63672 14.9165 1.77945 15.2605 2.0335 15.5141C2.28755 15.7677 2.63212 15.9102 2.9914 15.9102H4.34609" stroke="#6EA500" strokeWidth="1.35352" strokeLinecap="round" strokeLinejoin="round" />
                          </g>
                          <g clipPath="url(#clip2_221_28067)">
                            <path d="M13.6523 6.9375H15.007C15.3663 6.9375 15.7109 7.08587 15.9649 7.34995C16.219 7.61404 16.3617 7.97223 16.3617 8.3457V14.6826C16.3617 15.0561 16.219 15.4143 15.9649 15.6784C15.7109 15.9425 15.3663 16.0908 15.007 16.0908H13.6523" stroke="#6EA500" strokeWidth="1.38119" strokeLinecap="round" strokeLinejoin="round" />
                          </g>
                          <g clipPath="url(#clip3_221_28067)">
                            <path d="M7.65039 4.5H10.3504" stroke="#6EA500" strokeWidth="1.23238" strokeLinecap="round" strokeLinejoin="round" />
                          </g>
                          <g clipPath="url(#clip4_221_28067)">
                            <path d="M7.65039 7.50781H10.3504" stroke="#6EA500" strokeWidth="1.23878" strokeLinecap="round" strokeLinejoin="round" />
                          </g>
                          <g clipPath="url(#clip5_221_28067)">
                            <path d="M7.65039 10.4922H10.3504" stroke="#6EA500" strokeWidth="1.23878" strokeLinecap="round" strokeLinejoin="round" />
                          </g>
                          <g clipPath="url(#clip6_221_28067)">
                            <path d="M7.65039 13.5H10.3504" stroke="#6EA500" strokeWidth="1.23238" strokeLinecap="round" strokeLinejoin="round" />
                          </g>
                          <defs>
                            <clipPath id="clip0_221_28067">
                              <rect width="10.4688" height="16.5312" fill="white" transform="translate(3.76562 0.734375)" />
                            </clipPath>
                            <clipPath id="clip1_221_28067">
                              <rect width="4.51562" height="9.01562" fill="white" transform="translate(0.734375 8.25)" />
                            </clipPath>
                            <clipPath id="clip2_221_28067">
                              <rect width="4.51562" height="11.2656" fill="white" transform="translate(12.75 6)" />
                            </clipPath>
                            <clipPath id="clip3_221_28067">
                              <rect width="4.5" height="1.5" fill="white" transform="translate(6.75 3.75)" />
                            </clipPath>
                            <clipPath id="clip4_221_28067">
                              <rect width="4.5" height="1.51562" fill="white" transform="translate(6.75 6.75)" />
                            </clipPath>
                            <clipPath id="clip5_221_28067">
                              <rect width="4.5" height="1.51562" fill="white" transform="translate(6.75 9.73438)" />
                            </clipPath>
                            <clipPath id="clip6_221_28067">
                              <rect width="4.5" height="1.5" fill="white" transform="translate(6.75 12.75)" />
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
);
