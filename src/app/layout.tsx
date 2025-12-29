import type { Metadata } from "next";
import { dmsans, playfair_display, arimo } from "@/fonts/font";
import "./globals.css";
import ClientLayout from "./ClientLayout";

export const metadata: Metadata = {
  title: "Probid- Multi Vendor Auction and Bidding Next js Template.",
  description: "Your description here",
  icons: {
    icon: "/assets/img/fav-icon.svg",
  },
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
