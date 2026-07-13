import type { Metadata } from "next";
import { dmsans, playfair_display, arimo } from "@/fonts/font";
import "./globals.css";
import ClientLayout from "./ClientLayout";

export const metadata: Metadata = {
  title: "BidBridge — Connecting County Auctions and Bidders",
  description:
    "BidBridge connects county tax-sale auctions with bidders. Track properties, place bids, and manage county auctions in one place.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${playfair_display.variable} ${dmsans.variable} ${arimo.variable}`}>
      <body>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
