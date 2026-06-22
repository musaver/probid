import React from "react";
import Link from "next/link";
import ContentPage from "@/components/content/ContentPage";
import { SITE } from "@/lib/site";

const h3 = { marginTop: 26, marginBottom: 8, fontSize: 18, fontWeight: 700, color: "#1F2937" } as React.CSSProperties;

export default function SupportPage() {
  return (
    <ContentPage title="Help & Support" subtitle="We're glad to help you get the most out of BidBridge.">
      <p>
        Need a hand with BidBridge? Most questions are answered on our{" "}
        <Link href="/faq" style={{ color: "#4d7400", fontWeight: 600 }}>FAQ page</Link>. If you can&apos;t find
        what you&apos;re looking for, we&apos;re glad to help.
      </p>

      <h3 style={h3}>Common topics</h3>
      <p style={{ margin: 0 }}><strong>Claiming the properties you won</strong> — Go to My Bids, choose the county, enter your bidder number, and list your properties by Sale ID or parcel number. A county administrator reviews and approves the claim before it appears in your account.</p>
      <p><strong>Tracking status</strong> — Once a claim is approved, the property shows up in your account and updates as the county or BidBridge records changes. Statuses are for tracking only — always confirm anything important with the county.</p>
      <p><strong>Updating your contact information</strong> — Edit your profile any time. Keeping your mailing address current helps make sure the county can reach you with notices and redemption checks.</p>
      <p><strong>Messaging a county</strong> — Use the Messages section to reach the county staff linked to your properties.</p>

      <h3 style={h3}>Still need help?</h3>
      <p style={{ margin: 0 }}>
        Email us at{" "}
        <a href={`mailto:${SITE.supportEmail}`} style={{ color: "#4d7400", fontWeight: 600 }}>{SITE.supportEmail}</a>{" "}
        and include your account email and, if your question is about a specific property, the county and
        Sale ID or parcel number. We&apos;ll get back to you as soon as we can.
      </p>
      <p>
        For anything official — legal deadlines, redemption amounts, refunds, or deeds — contact the
        county directly. BidBridge isn&apos;t a government office and can&apos;t make those determinations.
      </p>
    </ContentPage>
  );
}
