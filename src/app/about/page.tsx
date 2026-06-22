import React from "react";
import ContentPage from "@/components/content/ContentPage";

const h3 = { marginTop: 28, marginBottom: 10, fontSize: 20, fontWeight: 700, color: "#1F2937" } as React.CSSProperties;

export default function AboutPage() {
  return (
    <ContentPage title="About Us" subtitle="One secure place to track what happens after the tax sale.">
      <p>
        BidBridge connects South Carolina county delinquent tax sale offices with the bidders who
        win property at their auctions — and gives both sides one secure place to keep track of what
        happens after the sale.
      </p>
      <p>
        Winning a property at a tax sale isn&apos;t the end of the process. Under South Carolina law, the
        previous owner has a period to redeem the property, and while that window is open you&apos;re
        waiting on status changes, redemption notices, and ultimately either a refund of your bid plus
        interest or a tax deed. For bidders active in more than one county, that has traditionally meant
        calling each county office, checking a different website for every county, and keeping your own
        notes to remember where each property stands.
      </p>
      <p>
        BidBridge replaces that scramble with a single account. Counties join the platform voluntarily.
        When a county participates, its staff post and update each property&apos;s status and choose what
        information is shared with bidders. When a county hasn&apos;t joined, BidBridge maintains the status
        from its own data sources. Either way, you see every property you&apos;ve won in one place, follow
        each one from listing through redemption or deed issuance, keep your mailing and contact
        information current, and — where your county participates — message its staff directly.
      </p>
      <p>
        Tracking the properties you&apos;ve won is free for bidders — you never pay to register, claim a
        property, or follow its status. And because this information is sensitive, security is built in
        from the ground up: encrypted connections, verified accounts, role-based access, and encrypted
        messaging between you and the county.
      </p>

      <h3 style={h3}>A note on what BidBridge is — and isn&apos;t</h3>
      <p>
        BidBridge is an independent service. We are not a government agency, and we are not affiliated
        with, endorsed by, or acting on behalf of any county, the State of South Carolina, or any tax
        authority. The property and status information shown in BidBridge may come from the county or be
        determined by BidBridge using its own data sources, and it is provided for tracking and
        convenience only — we can&apos;t guarantee it is accurate, complete, or current. For official records,
        legal deadlines, redemption amounts, and binding determinations, the county&apos;s own office and
        South Carolina law are always the final authority.
      </p>
    </ContentPage>
  );
}
