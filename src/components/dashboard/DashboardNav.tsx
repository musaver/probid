"use client";
import React from "react";
import Link from "next/link";
import { signOut } from "next-auth/react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination, Mousewheel, FreeMode } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/free-mode";

interface DashboardNavProps {
    activeTab: string;
}

const DashboardNav: React.FC<DashboardNavProps> = ({ activeTab }) => {
    const handleLogout = () => {
        signOut({ callbackUrl: "/" });
    };

    return (
        <div className="dashboard-nav">
            <div className="container">
                {/* 
            Wrapping Swiper in dashboard-menu to ensure .dashboard-menu .nav-item styles apply.
            Overriding display to block to prevent flexbox interference with Swiper.
        */}
                <div className="dashboard-menu position-relative" style={{ display: "block" }}>
                    <Swiper
                        modules={[Autoplay, Navigation, Pagination, Mousewheel, FreeMode]}
                        spaceBetween={0}
                        slidesPerView="auto"
                        className="dashboard-swiper"
                        mousewheel={true}
                        freeMode={true}
                        navigation={{
                            nextEl: ".dashboard-nav-next",
                            prevEl: ".dashboard-nav-prev",
                        }}
                    >
                        <SwiperSlide style={{ width: "auto" }}>
                            <Link href="/dashboard" className={`nav-item ${activeTab === 'overview' ? 'active' : ''}`}>
                                <i className="bi bi-grid"></i>
                                <span>Dashboard</span>
                            </Link>
                        </SwiperSlide>
                        <SwiperSlide style={{ width: "auto" }}>
                            <Link
                                className={`nav-item ${activeTab === "properties" ? "active" : ""}`}
                                href="/properties"
                            >
                                <i className="bi bi-house"></i>
                                <span>Properties</span>
                            </Link>
                        </SwiperSlide>
                        <SwiperSlide style={{ width: "auto" }}>
                            <Link className="nav-item" href="/bid-management">
                                <i className="bi bi-clipboard-check"></i>
                                <span>Bid Management</span>
                            </Link>
                        </SwiperSlide>
                        <SwiperSlide style={{ width: "auto" }}>
                            <Link
                                className={`nav-item ${activeTab === "bidders" ? "active" : ""}`}
                                href="/dashboard?tab=bidders"
                            >
                                <i className="bi bi-people"></i>
                                <span>Bidders</span>
                            </Link>
                        </SwiperSlide>
                        <SwiperSlide style={{ width: "auto" }}>
                            <Link className="nav-item" href="/visibility-control">
                                <i className="bi bi-eye"></i>
                                <span>Visibility Control</span>
                            </Link>
                        </SwiperSlide>
                        <SwiperSlide style={{ width: "auto" }}>
                            <Link className="nav-item" href="/notifications">
                                <i className="bi bi-bell"></i>
                                <span>Notifications</span>
                            </Link>
                        </SwiperSlide>
                        <SwiperSlide style={{ width: "auto" }}>
                            <Link className={`nav-item ${activeTab === 'messaging' ? 'active' : ''}`} href="/messaging">
                                <i className="bi bi-chat-left-dots"></i>
                                <span>Messaging</span>
                            </Link>
                        </SwiperSlide>
                        <SwiperSlide style={{ width: "auto" }}>
                            <Link className="nav-item" href="/reports">
                                <i className="bi bi-file-text"></i>
                                <span>Reports</span>
                            </Link>
                        </SwiperSlide>
                        <SwiperSlide style={{ width: "auto" }}>
                            <Link className="nav-item" href="/subscription">
                                <i className="bi bi-wallet2"></i>
                                <span>Subscription</span>
                            </Link>
                        </SwiperSlide>
                        <SwiperSlide style={{ width: "auto" }}>
                            <Link className="nav-item" href="/audit-log">
                                <i className="bi bi-clock-history"></i>
                                <span>Audit Log</span>
                            </Link>
                        </SwiperSlide>
                        <SwiperSlide style={{ width: "auto" }}>
                            <Link className={`nav-item ${activeTab === 'profile' ? 'active' : ''}`} href="/profile">
                                <i className="bi bi-person"></i>
                                <span>Profile</span>
                            </Link>
                        </SwiperSlide>
                        <SwiperSlide style={{ width: "auto" }}>
                            <button className="nav-item" onClick={handleLogout} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                                <i className="bi bi-box-arrow-right"></i>
                                <span>Logout</span>
                            </button>
                        </SwiperSlide>
                    </Swiper>
                    <div className="dashboard-nav-prev"><i className="bi bi-chevron-left"></i></div>
                    <div className="dashboard-nav-next"><i className="bi bi-chevron-right"></i></div>
                </div>
            </div>
        </div>
    );
};

export default DashboardNav;
