"use client";
import React from "react";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
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
    const { data: session } = useSession();
    const isCounty = session?.user?.type === "county";

    const handleLogout = () => {
        signOut({ callbackUrl: "/login" });
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
                        key={isCounty ? 'county' : 'bidder'}
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
                        {!isCounty && (
                            <SwiperSlide style={{ width: "auto" }}>
                                <Link href="/my-claims" className={`nav-item ${activeTab === 'my-claims' ? 'active' : ''}`}>
                                    <i className="bi bi-trophy"></i>
                                    <span>My Bids</span>
                                </Link>
                            </SwiperSlide>
                        )}
                        {isCounty && (
                            <SwiperSlide style={{ width: "auto" }}>
                                <Link
                                    className={`nav-item ${activeTab === "bidders" ? "active" : ""}`}
                                    href="/bidders"
                                >
                                    <i className="bi bi-people"></i>
                                    <span>Bidders</span>
                                </Link>
                            </SwiperSlide>
                        )}
                        {isCounty && (
                            <SwiperSlide style={{ width: "auto" }}>
                                <Link
                                    className={`nav-item ${activeTab === "visibility-control" ? "active" : ""}`}
                                    href="/visibility-control"
                                >
                                    <i className="bi bi-eye"></i>
                                    <span>Visibility Control</span>
                                </Link>
                            </SwiperSlide>
                        )}

                        {isCounty && (
                            <SwiperSlide style={{ width: "auto" }}>
                                <Link
                                    className={`nav-item ${activeTab === "reports" ? "active" : ""}`}
                                    href="/reports"
                                >
                                    <i className="bi bi-file-text"></i>
                                    <span>Reports</span>
                                </Link>
                            </SwiperSlide>
                        )}

                        <SwiperSlide style={{ width: "auto" }}>
                            <Link
                                className={`nav-item ${activeTab === "messaging" ? "active" : ""}`}
                                href="/messaging"
                            >
                                <i className="bi bi-chat-text"></i>
                                <span>Messages</span>
                            </Link>
                        </SwiperSlide>

                        <SwiperSlide style={{ width: "auto" }}>
                            <Link
                                className={`nav-item ${activeTab === "news" ? "active" : ""}`}
                                href="/news"
                            >
                                <i className="bi bi-megaphone"></i>
                                <span>News</span>
                            </Link>
                        </SwiperSlide>

                        <SwiperSlide style={{ width: "auto" }}>
                            <Link
                                className={`nav-item ${activeTab === "support" ? "active" : ""}`}
                                href="/support"
                            >
                                <i className="bi bi-headset"></i>
                                <span>Contact Admin</span>
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