"use client";

import Link from "next/link";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

const availableProperties = [
  { id: "PR001", name: "123 Main Street", parcelId: "123-456-789" },
  { id: "PR002", name: "456 Oak Avenue", parcelId: "234-567-890" },
  { id: "PR003", name: "789 Pine Road", parcelId: "345-678-901" },
  { id: "PR004", name: "321 Elm Street", parcelId: "456-789-012" },
];

const bidderTableData = [
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

const AddBidderContent = () => {
  const [linkedProps] = useState([]);
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, you would save the bidder data here
    // For now, we'll just redirect to the first bidder's profile
    router.push("/bidder/BD001");
  };

  return (
    <div className="dashboard-wrapper">
      <div className="dashboard-nav">
        <div className="container">
          <nav className="dashboard-menu">
            <Link href="/dashboard" className="nav-item">
              <i className="bi bi-speedometer2"></i>
              <span>Dashboard</span>
            </Link>
            <Link href="/dashboard?tab=properties" className="nav-item">
              <i className="bi bi-building"></i>
              <span>Properties</span>
            </Link>
            <Link href="#" className="nav-item">
              <i className="bi bi-clipboard-data"></i>
              <span>Bid Management</span>
            </Link>
            <Link href="/dashboard?tab=bidders" className="nav-item active">
              <i className="bi bi-people"></i>
              <span>Bidders</span>
            </Link>
            <Link href="#" className="nav-item">
              <i className="bi bi-eye"></i>
              <span>Visibility Control</span>
            </Link>
            <Link href="#" className="nav-item">
              <i className="bi bi-bell"></i>
              <span>Notifications</span>
            </Link>
            <Link href="#" className="nav-item">
              <i className="bi bi-chat-dots"></i>
              <span>Messaging</span>
            </Link>
          </nav>
        </div>
      </div>

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
            <button className="add-property-btn" type="button">
              <i className="bi bi-plus-circle"></i>
              <span>Add Bidder</span>
            </button>
          </div>

          <div className="bidder-management-grid">
            <div className="bidder-form-card">
              <div className="card-header">
                <h3>Add New Bidder</h3>
                <button className="icon-btn" type="button" aria-label="Close form">
                  <i className="bi bi-x"></i>
                </button>
              </div>

              <form className="bidder-form" onSubmit={handleSubmit}>
                <div className="form-row">
                  <div className="form-group">
                    <label>First Name</label>
                    <input type="text" placeholder="John" />
                  </div>
                  <div className="form-group">
                    <label>Last Name</label>
                    <input type="text" placeholder="Doe" />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Email Address</label>
                    <input type="email" placeholder="john@example.com" />
                  </div>
                  <div className="form-group">
                    <label>Phone Number</label>
                    <input type="text" placeholder="+1 (555) 123-4567" />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Address</label>
                    <input type="text" placeholder="123 Main Street" />
                  </div>
                  <div className="form-group">
                    <label>City</label>
                    <input type="text" placeholder="Springfield" />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>State</label>
                    <input type="text" placeholder="IL" />
                  </div>
                  <div className="form-group">
                    <label>ZIP Code</label>
                    <input type="text" placeholder="62701" />
                  </div>
                </div>

                <div className="form-group full-width">
                  <label>Identity Documents</label>
                  <div className="file-upload-area primary">
                    <div className="upload-icon">
                      <i className="bi bi-upload"></i>
                    </div>
                    <p className="upload-text">Upload ID, Driver’s License, or Passport</p>
                    <p className="upload-info">PDF, DOC, DOCX, JPG, PNG (Max 10MB each)</p>
                  </div>
                </div>

                <div className="form-group full-width">
                  <label>Additional Notes</label>
                  <textarea placeholder="Enter any additional information about this bidder..." rows="3"></textarea>
                </div>

                <div className="form-actions">
                  <button type="submit" className="btn-submit">
                    Add Bidder
                  </button>
                  <button type="button" className="btn-cancel">
                    Cancel
                  </button>
                </div>
              </form>
            </div>

            <div className="link-properties-card">
              <div className="card-header">
                <h3>Link Properties</h3>
                <p>Select which properties this bidder can access and bid on</p>
              </div>

              <div className="linked-properties-panel">
                <div className="panel-header">
                  <h4>Linked Properties ({linkedProps.length})</h4>
                </div>
                <div className="linked-properties-empty">No properties linked yet.</div>
              </div>

              <div className="available-properties-panel">
                <div className="panel-header">
                  <h4>Available Properties</h4>
                  <div className="search-input-wrapper compact">
                    <i className="bi bi-search"></i>
                    <input type="text" placeholder="Search properties..." />
                  </div>
                </div>
                <div className="properties-list">
                  {availableProperties.map((property) => (
                    <div className="property-item" key={property.id}>
                      <div>
                        <h5>{property.name}</h5>
                        <p>{property.parcelId}</p>
                      </div>
                      <button className="icon-btn" type="button" aria-label="Link property">
                        <i className="bi bi-plus-circle"></i>
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="properties-table-section bidder-table" style={{
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
                  {bidderTableData.map((bidder) => (
                    <tr key={bidder.bidderId}>
                      <td data-label="Bidder ID">{bidder.bidderId}</td>
                      <td data-label="Name">
                        <Link href={`/bidder/${bidder.bidderId}`} style={{ color: '#3B82F6', textDecoration: 'none', fontWeight: 500, cursor: 'pointer' }}>
                          {bidder.name}
                        </Link>
                      </td>
                      <td data-label="Email">{bidder.email}</td>
                      <td data-label="Phone">{bidder.phone}</td>
                      <td data-label="Linked Properties" className="linked-properties">
                        <span style={{ color: '#6EA500' }}>{bidder.linkedProperties}</span>
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
                              <g clipPath="url(#clip0_addbid_28067)">
                                <path d="M4.7168 16.2895V3.16176C4.7168 2.77491 4.8672 2.40389 5.13492 2.13035C5.40264 1.85681 5.76575 1.70312 6.14436 1.70312H11.8546C12.2332 1.70312 12.5963 1.85681 12.8641 2.13035C13.1318 2.40389 13.2822 2.77491 13.2822 3.16176V16.2895H4.7168Z" stroke="#6EA500" strokeWidth="1.44301" strokeLinecap="round" strokeLinejoin="round"/>
                              </g>
                              <g clipPath="url(#clip1_addbid_28067)">
                                <path d="M4.34609 9.14844H2.9914C2.63212 9.14844 2.28755 9.29092 2.0335 9.54453C1.77945 9.79814 1.63672 10.1421 1.63672 10.5008V14.5578C1.63672 14.9165 1.77945 15.2605 2.0335 15.5141C2.28755 15.7677 2.63212 15.9102 2.9914 15.9102H4.34609" stroke="#6EA500" strokeWidth="1.35352" strokeLinecap="round" strokeLinejoin="round"/>
                              </g>
                              <g clipPath="url(#clip2_addbid_28067)">
                                <path d="M13.6523 6.9375H15.007C15.3663 6.9375 15.7109 7.08587 15.9649 7.34995C16.219 7.61404 16.3617 7.97223 16.3617 8.3457V14.6826C16.3617 15.0561 16.219 15.4143 15.9649 15.6784C15.7109 15.9425 15.3663 16.0908 15.007 16.0908H13.6523" stroke="#6EA500" strokeWidth="1.38119" strokeLinecap="round" strokeLinejoin="round"/>
                              </g>
                              <g clipPath="url(#clip3_addbid_28067)">
                                <path d="M7.65039 4.5H10.3504" stroke="#6EA500" strokeWidth="1.23238" strokeLinecap="round" strokeLinejoin="round"/>
                              </g>
                              <g clipPath="url(#clip4_addbid_28067)">
                                <path d="M7.65039 7.50781H10.3504" stroke="#6EA500" strokeWidth="1.23878" strokeLinecap="round" strokeLinejoin="round"/>
                              </g>
                              <g clipPath="url(#clip5_addbid_28067)">
                                <path d="M7.65039 10.4922H10.3504" stroke="#6EA500" strokeWidth="1.23878" strokeLinecap="round" strokeLinejoin="round"/>
                              </g>
                              <g clipPath="url(#clip6_addbid_28067)">
                                <path d="M7.65039 13.5H10.3504" stroke="#6EA500" strokeWidth="1.23238" strokeLinecap="round" strokeLinejoin="round"/>
                              </g>
                              <defs>
                                <clipPath id="clip0_addbid_28067">
                                  <rect width="10.4688" height="16.5312" fill="white" transform="translate(3.76562 0.734375)"/>
                                </clipPath>
                                <clipPath id="clip1_addbid_28067">
                                  <rect width="4.51562" height="9.01562" fill="white" transform="translate(0.734375 8.25)"/>
                                </clipPath>
                                <clipPath id="clip2_addbid_28067">
                                  <rect width="4.51562" height="11.2656" fill="white" transform="translate(12.75 6)"/>
                                </clipPath>
                                <clipPath id="clip3_addbid_28067">
                                  <rect width="4.5" height="1.5" fill="white" transform="translate(6.75 3.75)"/>
                                </clipPath>
                                <clipPath id="clip4_addbid_28067">
                                  <rect width="4.5" height="1.51562" fill="white" transform="translate(6.75 6.75)"/>
                                </clipPath>
                                <clipPath id="clip5_addbid_28067">
                                  <rect width="4.5" height="1.51562" fill="white" transform="translate(6.75 9.73438)"/>
                                </clipPath>
                                <clipPath id="clip6_addbid_28067">
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
  );
};

export default AddBidderContent;

