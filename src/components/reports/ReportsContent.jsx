"use client";
import React from "react";
import Link from "next/link";

const ReportsContent = () => {
  const reportsData = [
    {
      id: 1,
      title: "Property Report",
      description: "Export all property data with filters",
      buttonText: "Download CSV",
      format: "csv"
    },
    {
      id: 2,
      title: "Bidder Report",
      description: "Export bidder information and activity",
      buttonText: "Download Excel",
      format: "excel"
    },
    {
      id: 3,
      title: "Auction Report",
      description: "Export auction results and bids",
      buttonText: "Download PDF",
      format: "pdf"
    }
  ];

  const handleDownload = (format) => {
    // Handle download logic here
    console.log(`Downloading ${format} report...`);
  };

  return (
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
            <Link href="/add-bidder" className="nav-item">
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
            <Link href="/reports" className="nav-item active">
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

      {/* Reports Content */}
      <div className="reports-section">
        <div className="container">
          <div className="reports-grid">
            {reportsData.map((report) => (
              <div key={report.id} className="report-card">
                <div className="report-icon">
                  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M24.9993 3.33594H9.99935C9.11529 3.33594 8.26745 3.68713 7.64233 4.31225C7.0172 4.93737 6.66602 5.78522 6.66602 6.66927V33.3359C6.66602 34.22 7.0172 35.0678 7.64233 35.693C8.26745 36.3181 9.11529 36.6693 9.99935 36.6693H29.9993C30.8834 36.6693 31.7312 36.3181 32.3564 35.693C32.9815 35.0678 33.3327 34.22 33.3327 33.3359V11.6693L24.9993 3.33594Z" stroke="#6EA500" strokeWidth="3.33333" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M23.334 3.33594V10.0026C23.334 10.8867 23.6852 11.7345 24.3103 12.3596C24.9354 12.9847 25.7833 13.3359 26.6673 13.3359H33.334" stroke="#6EA500" strokeWidth="3.33333" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M16.6673 15H13.334" stroke="#6EA500" strokeWidth="3.33333" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M26.6673 21.6641H13.334" stroke="#6EA500" strokeWidth="3.33333" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M26.6673 28.3359H13.334" stroke="#6EA500" strokeWidth="3.33333" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <h3 className="report-title">{report.title}</h3>
                <p className="report-description">{report.description}</p>
                <button
                  className="report-download-btn"
                  onClick={() => handleDownload(report.format)}
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M14 10V12.6667C14 13.0203 13.8595 13.3594 13.6095 13.6095C13.3594 13.8595 13.0203 14 12.6667 14H3.33333C2.97971 14 2.64057 13.8595 2.39052 13.6095C2.14048 13.3594 2 13.0203 2 12.6667V10M4.66667 6.66667L8 10M8 10L11.3333 6.66667M8 10V2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span>{report.buttonText}</span>
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportsContent;
