import React from "react";
import ContentPage from "@/components/content/ContentPage";
import { SITE } from "@/lib/site";

const h3 = { marginTop: 26, marginBottom: 8, fontSize: 18, fontWeight: 700, color: "#1F2937" } as React.CSSProperties;

const SECTIONS: { t: string; b: string }[] = [
  { t: "1. About the Service", b: `BidBridge is an informational platform that helps participating South Carolina counties share property and tax sale status information with registered bidders, and helps bidders track properties they have won and communicate with county staff. Property statuses shown in the Service may be entered by counties or determined by BidBridge using its own data sources. The Service is for tracking and communication only. It does not host live auctions or accept bids, and no bidding, payments for properties, or sale transactions occur through the Service.` },
  { t: "2. Not a Government Entity", b: `BidBridge is an independent service. We are not a government agency and are not affiliated with, endorsed by, or acting on behalf of any county, the State of South Carolina, or any tax authority. Official records, legal deadlines, redemption determinations, and refunds are handled by the relevant county and governed by South Carolina law.` },
  { t: "3. Eligibility and Accounts", b: `You must be at least 18 years old to use the Service. You agree to provide accurate, current information when you register and to keep it updated. You are responsible for maintaining the confidentiality of your login credentials and for all activity under your account. Notify us promptly of any unauthorized use. We may offer sign-in through third-party providers (such as Google); your use of those providers is also subject to their terms.` },
  { t: "4. Claims and Verification", b: `When you submit a claim to link properties to your account, you represent that you are the bidder of record for those properties in the county indicated. County administrators verify claims, and we may decline or remove any claim or account information that cannot be verified or appears inaccurate or fraudulent.` },
  { t: "5. Accuracy of Information", b: `Property details, lien and redemption statuses, and other data displayed in the Service may be entered by participating counties or determined by BidBridge using its own data sources and methods. We do not guarantee that any information in the Service — whether county-provided or determined by us — is accurate, complete, current, or error-free, and statuses may change or lag behind official records. The Service is provided for informational and tracking purposes only and is not a substitute for the county's official records, court records, a title search, or professional legal or financial advice. You should independently confirm any important information with the county and should not make legal, financial, or other decisions in reliance on the Service without doing so.` },
  { t: "6. No Legal or Financial Advice", b: `Nothing in the Service constitutes legal, financial, tax, or investment advice. Tax sale and redemption rules are governed by South Carolina law and vary by situation. Consult the county and a qualified professional regarding your specific circumstances.` },
  { t: "7. Acceptable Use", b: `You agree not to: misuse or attempt to gain unauthorized access to the Service or other users' data; submit false or fraudulent claims or information; use the Service to harass, abuse, or harm others; interfere with the operation or security of the Service; scrape, copy, or redistribute data except as the Service allows; or use the Service for any unlawful purpose.` },
  { t: "8. Communications", b: `The Service may include messaging between bidders and county staff and may send you notifications and emails about your account and your properties. You can manage notification preferences in your account where available. Messages and platform communications should be used for matters related to the Service.` },
  { t: "9. Fees", b: `Tracking the properties you have won is provided to bidders free of charge. We may offer optional paid features in the future; any fees will be disclosed to you before you incur them, and using a paid feature means you accept its charges. We may change our fee structure at any time, with notice as required by law.` },
  { t: "10. Intellectual Property", b: `The Service, including its software, design, and content (excluding county-provided data and user content), is owned by ${SITE.entity} and protected by applicable laws. We grant you a limited, non-exclusive, non-transferable license to use the Service for its intended purpose. You retain rights to information you submit, and you grant us the rights needed to operate the Service and to share your contact information with the counties you are linked to.` },
  { t: "11. Privacy", b: `Our handling of personal information is described in our Privacy Policy, which is incorporated into these Terms by reference.` },
  { t: "12. Disclaimers", b: `The Service is provided "as is" and "as available," without warranties of any kind, express or implied, including warranties of merchantability, fitness for a particular purpose, accuracy, and non-infringement. We do not warrant that the Service will be uninterrupted, secure, or error-free, or that data displayed is accurate or current.` },
  { t: "13. Limitation of Liability", b: `To the maximum extent permitted by law, ${SITE.entity} and its owners, officers, and staff will not be liable for any indirect, incidental, special, consequential, or punitive damages, or for any loss of profits, data, or goodwill, arising from your use of or inability to use the Service, reliance on information in the Service, or any missed deadline, redemption, refund, or other outcome. Our total liability for any claim relating to the Service will not exceed [a nominal amount, e.g., $100], given the Service is free to bidders.` },
  { t: "14. Indemnification", b: `You agree to indemnify and hold harmless ${SITE.entity} from claims, damages, and expenses arising out of your use of the Service, your content or claims, or your violation of these Terms or any law.` },
  { t: "15. Termination", b: `You may stop using the Service at any time. We may suspend or terminate your access if you violate these Terms or for any reason at our discretion, and we may retain records as described in the Privacy Policy and as required by law.` },
  { t: "16. Changes", b: `We may modify the Service or these Terms. If we make material changes to these Terms, we will update the effective date and may notify you. Continued use after changes take effect means you accept the updated Terms.` },
  { t: "17. Governing Law", b: `These Terms are governed by the laws of the State of ${SITE.governingState}, without regard to its conflict-of-laws rules. Any dispute will be resolved in the state or federal courts located in ${SITE.venue}, and you consent to that jurisdiction.` },
  { t: "18. General", b: `If any provision of these Terms is found unenforceable, the remaining provisions stay in effect. These Terms, together with the Privacy Policy, are the entire agreement between you and us regarding the Service. Our failure to enforce a provision is not a waiver of it. You may not assign these Terms without our consent; we may assign them in connection with a merger, acquisition, or sale of assets. You agree to receive communications and disclosures from us electronically.` },
  { t: "19. Contact", b: `Questions about these Terms: ${SITE.supportEmail} / ${SITE.mailingAddress}.` },
];

export default function TermsPage() {
  return (
    <ContentPage title="Terms of Service" subtitle={`Effective date: ${SITE.effectiveDate}`}>
      <p style={{ color: "#92400E", background: "#FFFBEB", border: "1px solid #FDE68A", borderRadius: 8, padding: "10px 14px" }}>
        <strong>Draft for attorney review. Not legal advice.</strong>
      </p>
      <p>
        These Terms of Service (&quot;Terms&quot;) govern your access to and use of the BidBridge platform and
        website at {SITE.websiteUrl} (the &quot;Service&quot;), operated by {SITE.entity} (&quot;BidBridge,&quot; &quot;we,&quot; &quot;us,&quot;
        or &quot;our&quot;). By creating an account or using the Service, you agree to these Terms. If you do not
        agree, do not use the Service.
      </p>
      {SECTIONS.map((s) => (
        <div key={s.t}>
          <h3 style={h3}>{s.t}</h3>
          <p style={{ margin: 0 }}>{s.b}</p>
        </div>
      ))}
    </ContentPage>
  );
}
