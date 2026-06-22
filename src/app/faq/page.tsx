import React from "react";
import ContentPage from "@/components/content/ContentPage";
import { SITE } from "@/lib/site";

type Faq = { q: string; a: string; list?: string[]; after?: string };

const FAQS: Faq[] = [
  { q: "What is BidBridge?", a: "BidBridge is a secure online platform where South Carolina tax sale bidders track the properties they won, keep their contact details current, and communicate with county staff — all from one account. Counties take part voluntarily; for counties that participate, their staff keep property statuses up to date, and for counties that haven't joined, BidBridge maintains the statuses from its own data sources." },
  { q: "Is BidBridge a government website?", a: "No. BidBridge is an independent platform and is not a government agency or official county website. We are not affiliated with or endorsed by any county or the State of South Carolina. The property information you see comes from participating counties and from BidBridge's own data sources, and official matters are always handled through the county itself." },
  { q: "Does it cost anything to use?", a: "It's free to register, claim the properties you've won, and track their status." },
  { q: "Does my county have to be on BidBridge?", a: "Counties join BidBridge voluntarily, so not every county takes part. If your county participates, its staff update your properties' status and decide what information you can see. If your county hasn't joined, BidBridge maintains the status from its own data sources. In both cases, statuses are for tracking only and aren't guaranteed — confirm anything important with the county." },
  { q: "How do I add the properties I won?", a: "Go to your My Bids page and submit a claim: choose the county, enter your bidder number for that county, and list the properties you won by Sale ID or parcel/map number (one per line). A county administrator verifies the claim, and once it's approved the properties appear in your account so you can track them." },
  { q: "Why does a claim need to be verified?", a: "Verification confirms that you really are the bidder of record for those properties in that county. It protects everyone's information and makes sure status updates only reach the rightful winner." },
  { q: "What if my claim isn't approved?", a: "If a county can't match your claim — for example, the bidder number or property identifier doesn't line up with their records — it won't be approved, and those properties won't appear in your account. Double-check the details against your county paperwork and resubmit, or message the county if you think there's an error." },
  {
    q: "What do the property statuses mean?",
    a: "Statuses follow the South Carolina tax sale and redemption process. Depending on what your county uses, you may see:",
    list: [
      "On List — the property is on the delinquent tax sale list.",
      "Sold at Tax Sale — you won the property at the sale; the redemption period has begun.",
      "Redemption Notice Sent / Processing — the county is processing a redemption by the prior owner.",
      "Redeemed — the prior owner redeemed the property; your bid will be refunded with interest per county and state rules.",
      "Redeemed — Check Issued — your redemption refund has been issued.",
      "Deed in Progress — the redemption period passed without redemption and the county is preparing a tax deed.",
      "Deed Issued — a tax deed has been issued to you.",
      "Voided / Cancelled — the sale of this property was voided or cancelled by the county.",
    ],
    after: "Which statuses appear, and when they change, depends on your county and on BidBridge's own data.",
  },
  { q: "Where do the statuses come from, and are they guaranteed to be accurate?", a: "A property's status may be set by the county directly or determined by BidBridge using its own data sources. We work to keep statuses current, but we cannot guarantee they are accurate, complete, or up to date at any given moment, and a status may change or lag behind the county's official records. Always confirm a property's status with the county before acting on it. BidBridge is a tracking tool — not a substitute for the county's official records, a title search, or legal advice." },
  { q: "How long does the redemption period last, and how much interest will I earn?", a: "Redemption periods, interest, and deadlines are governed by South Carolina law and administered by each county — not by BidBridge. BidBridge shows you the status available in your account; it isn't a substitute for the county's official records or for legal advice. For exact figures and dates, contact the county office or consult the South Carolina Code." },
  { q: "Does BidBridge handle my refund or any money?", a: "No. No money changes hands through BidBridge. Redemption refunds, deed fees, and any payments are handled entirely by the county under South Carolina law. BidBridge only shows you where things stand and helps you communicate with the county." },
  { q: "Can I track properties in more than one county?", a: "Yes. If you bid in several South Carolina counties, you can claim and track all of those properties from one BidBridge account, and download a single report covering every county." },
  { q: "Why can't I see certain details on a property?", a: "For counties that participate, the county controls which fields are shared with bidders; for counties that haven't joined, BidBridge sets this. If something isn't visible, it hasn't been enabled for display. If you need that information, contact the county office." },
  { q: "How do I keep my contact information up to date?", a: "Update your profile any time from your account. Your current mailing address and contact details are visible to the counties you're linked to, which helps make sure redemption checks and notices reach you." },
  { q: "Will I be notified when something changes?", a: "When a county updates a property you're tracking, BidBridge can show the change in your activity feed and notifications and, where enabled, send you an email. You can manage which updates you receive in your account." },
  { q: "Can I download my information?", a: "Yes. You can export your properties and their status to CSV/Excel, including wins across multiple counties, for your own records." },
  { q: "Is my information secure?", a: "Yes. BidBridge uses encrypted connections, verified accounts, restricted role-based access, and encrypted messaging. Counties value confidentiality, and protecting this information is central to how the platform is built. See our Privacy Policy for details." },
  { q: "How do I contact a county?", a: "If your county participates, use the Messages section to reach its staff. For official or urgent matters — or if your county hasn't joined BidBridge — contact the county office directly." },
  { q: "Who do I contact for help with BidBridge?", a: `Reach our team at ${SITE.supportEmail} or through the Help & Support page.` },
];

export default function FaqPage() {
  return (
    <ContentPage title="Frequently Asked Questions" subtitle="Answers to common questions about BidBridge.">
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        {FAQS.map((f, i) => (
          <div key={i} style={{ border: "1px solid #E5E7EB", borderRadius: 12, padding: "18px 20px" }}>
            <h3 style={{ margin: 0, fontSize: 17, fontWeight: 700, color: "#1F2937" }}>{f.q}</h3>
            <p style={{ margin: "8px 0 0", color: "#4B5563" }}>{f.a}</p>
            {f.list && (
              <ul style={{ margin: "10px 0 0", paddingLeft: 20, color: "#4B5563" }}>
                {f.list.map((item, j) => {
                  const [label, ...rest] = item.split(" — ");
                  return (
                    <li key={j} style={{ marginBottom: 6 }}>
                      <strong style={{ color: "#1F2937" }}>{label}</strong>
                      {rest.length > 0 && <> — {rest.join(" — ")}</>}
                    </li>
                  );
                })}
              </ul>
            )}
            {f.after && <p style={{ margin: "10px 0 0", color: "#6B7280" }}>{f.after}</p>}
          </div>
        ))}
      </div>
    </ContentPage>
  );
}
