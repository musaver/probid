import React from "react";
import ContentPage from "@/components/content/ContentPage";

const section = { marginTop: 28, marginBottom: 10, fontSize: 20, fontWeight: 700, color: "#1F2937" } as React.CSSProperties;

// NOTE: placeholder legal copy — replace with the client's final Terms of Service text.
export default function TermsPage() {
  return (
    <ContentPage title="Terms of Service" subtitle="Please review these terms for using BidBridge.">
      <p style={{ color: "#6B7280" }}><em>This is placeholder text and will be replaced with the official Terms of Service.</em></p>

      <h3 style={section}>1. Using BidBridge</h3>
      <p>BidBridge provides a record of tax-sale results supplied by participating counties. It is not an auction platform and does not facilitate bidding.</p>

      <h3 style={section}>2. Accounts &amp; Verification</h3>
      <p>Bidders must register and have their claims verified before property results appear in their account. You are responsible for the accuracy of the information you submit, including your county bidder number.</p>

      <h3 style={section}>3. Accuracy of Information</h3>
      <p>Results are provided by the counties. While we work to keep information accurate and current, BidBridge is not responsible for errors originating from source records.</p>

      <h3 style={section}>4. Contact</h3>
      <p>Questions about these terms can be sent through the Contact page.</p>
    </ContentPage>
  );
}
