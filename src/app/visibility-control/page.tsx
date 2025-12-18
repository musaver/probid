import Header from "@/components/header/Header";
import VisibilityControlContent from "@/components/visibility-control/VisibilityControlContent";
import React from "react";

export const metadata = {
  icons: {
    icon: "/assets/img/fav-icon.svg",
  },
};

export default function VisibilityControlPage() {
  return (
    <>
      <Header />
      <VisibilityControlContent />
    </>
  );
}


