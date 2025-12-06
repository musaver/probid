"use client";
import { useEffect } from "react";
import { SessionProvider } from "next-auth/react";
import "../../public/assets/css/bootstrap-icons.css";
import "../../public/assets/css/boxicons.min.css";
import "../../public/assets/css/swiper-bundle.min.css";
import "react-modal-video/css/modal-video.css";
import "../../public/assets/css/slick-theme.css";
import "../../public/assets/css/animate.min.css";
import "../../public/assets/css/nice-select.css";
import "../../public/assets/css/slick.css";
import "../../public/assets/css/bootstrap.min.css";
import "../../public/assets/css/style.css";
import "../../public/assets/css/property-dashboard.css";
import "../../public/assets/css/bidder-profile-page.css";
import "../../public/assets/css/bid-management.css";
import "../../public/assets/css/visibility-control.css";
import "../../public/assets/css/notifications.css";
import "../../public/assets/css/messaging.css";
import "../../public/assets/css/reports.css";
import "../../public/assets/css/subscription.css";
import "../../public/assets/css/audit-log.css";
import "../../public/assets/css/profile.css";
import "../../public/assets/css/login.css";

import ScrollTopBtn from "@/components/common/ScrollTopBtn";
import useWow from "@/customHooks/useWow";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
    useWow();
    useEffect(() => {
        require("bootstrap/dist/js/bootstrap.bundle.min.js");
    }, []);
    return (
        <SessionProvider>
            {children}
            <ScrollTopBtn />
        </SessionProvider>
    );
}
