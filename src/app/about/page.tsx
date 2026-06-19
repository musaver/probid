import React from "react";
import ContentPage from "@/components/content/ContentPage";

// NOTE: placeholder copy — replace with the client's final text when provided.
export default function AboutPage() {
  return (
    <ContentPage title="About Us" subtitle="Tracking tax-sale results, simply.">
      <p>
        BidBridge is where winning bidders keep track of the properties they’ve won at county
        tax sales. We work directly with participating counties to record official auction
        results, so bidders have one clear, reliable place to review what they won and follow
        each property’s status.
      </p>
      <h3 style={{ marginTop: 28, marginBottom: 10, fontSize: 20, fontWeight: 700, color: "#1F2937" }}>What we do</h3>
      <p>
        After each physical auction, counties provide the results. BidBridge organizes those
        results by county and bidder number, verifies each bidder, and keeps the details — sale
        date, bid amounts, owner and property information, and current status — up to date.
      </p>
      <h3 style={{ marginTop: 28, marginBottom: 10, fontSize: 20, fontWeight: 700, color: "#1F2937" }}>Note</h3>
      <p>
        BidBridge does not host live bidding or auctions. It is a record-keeping and status-tracking
        platform for results from in-person tax sales.
      </p>
    </ContentPage>
  );
}
