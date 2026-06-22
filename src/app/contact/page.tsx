import React from "react";
import ContentPage from "@/components/content/ContentPage";
import { SITE } from "@/lib/site";

const h3 = { marginTop: 26, marginBottom: 8, fontSize: 18, fontWeight: 700, color: "#1F2937" } as React.CSSProperties;

export default function ContactPage() {
  return (
    <ContentPage title="Contact Us" subtitle="We'd love to hear from you.">
      <div style={{ border: "1px solid #E5E7EB", borderRadius: 12, padding: "18px 20px", marginBottom: 24 }}>
        <p style={{ margin: 0 }}>
          <strong>General questions and support:</strong>{" "}
          <a href={`mailto:${SITE.supportEmail}`} style={{ color: "#4d7400", fontWeight: 600 }}>{SITE.supportEmail}</a>
        </p>
        <p style={{ margin: "8px 0 0" }}><strong>Mailing address:</strong> {SITE.mailingAddress}</p>
      </div>

      <h3 style={h3}>For bidders</h3>
      <p style={{ margin: 0 }}>
        If your question is about a property you won, please include the county and the Sale ID or parcel
        number so we can help faster. For official matters — redemption, refunds, deadlines, or deeds —
        contact the relevant county office directly.
      </p>

      <h3 style={h3}>For counties</h3>
      <p style={{ margin: 0 }}>
        Interested in bringing your county&apos;s tax sale data onto BidBridge, or have a question about your
        account? Reach us at{" "}
        <a href={`mailto:${SITE.supportEmail}`} style={{ color: "#4d7400", fontWeight: 600 }}>{SITE.supportEmail}</a>{" "}
        and we&apos;ll follow up with details on getting set up.
      </p>

      <p style={{ marginTop: 24, color: "#6B7280" }}>
        We typically respond within {SITE.responseTime}. BidBridge is an independent service and is not a
        government agency or county office.
      </p>
    </ContentPage>
  );
}
