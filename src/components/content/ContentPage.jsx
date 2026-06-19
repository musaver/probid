"use client";
import React from "react";
import Header from "@/components/header/Header";
import Footer from "@/components/footer/Footer";

/**
 * Shared layout for static footer pages (About, FAQ, Terms, Privacy, Contact, Support).
 * Header + on-brand title band + centered content + Footer.
 */
export default function ContentPage({ title, subtitle, children }) {
  return (
    <>
      <Header />

      <section style={{ background: "linear-gradient(180deg,#F3F7EC 0%,#FFFFFF 100%)", padding: "56px 0 40px", borderBottom: "1px solid #EEF2E6" }}>
        <div className="container">
          <h1 style={{ fontSize: 34, fontWeight: 800, margin: 0, color: "#1F2937" }}>{title}</h1>
          {subtitle && <p style={{ color: "#6B7280", marginTop: 8, marginBottom: 0, fontSize: 16 }}>{subtitle}</p>}
        </div>
      </section>

      <section style={{ padding: "48px 0 64px" }}>
        <div className="container" style={{ maxWidth: 880, margin: "0 auto" }}>
          <div style={{ color: "#374151", lineHeight: 1.75, fontSize: 16 }}>{children}</div>
        </div>
      </section>

      <Footer />
    </>
  );
}
