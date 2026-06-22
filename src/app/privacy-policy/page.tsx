import React from "react";
import ContentPage from "@/components/content/ContentPage";
import { SITE } from "@/lib/site";

const h3 = { marginTop: 26, marginBottom: 8, fontSize: 18, fontWeight: 700, color: "#1F2937" } as React.CSSProperties;

export default function PrivacyPolicyPage() {
  return (
    <ContentPage title='Our Policy (Privacy Policy)' subtitle={`Effective date: ${SITE.effectiveDate}`}>
      <p style={{ color: "#92400E", background: "#FFFBEB", border: "1px solid #FDE68A", borderRadius: 8, padding: "10px 14px" }}>
        <strong>Draft for attorney review. Not legal advice.</strong>
      </p>
      <p>
        This Privacy Policy explains how {SITE.entity} (&quot;BidBridge,&quot; &quot;we,&quot; &quot;us&quot;) collects, uses, shares,
        and protects information when you use the BidBridge platform at {SITE.websiteUrl}. By using the
        Service, you agree to this Policy.
      </p>

      <h3 style={h3}>1. Information We Collect</h3>
      <ul style={{ margin: 0, paddingLeft: 20 }}>
        <li><strong>Account information:</strong> your email address and login credentials (including information from a third-party sign-in provider such as Google, if you use one).</li>
        <li><strong>Profile and contact information:</strong> your name, mailing address, and phone number, which you provide and can update.</li>
        <li><strong>Bidder and property information:</strong> the counties you are linked to, your bidder numbers, the properties you claim, and the status of those properties.</li>
        <li><strong>Communications:</strong> messages you exchange with county staff through the Service, and notifications sent to you.</li>
        <li><strong>Automatically collected information:</strong> log and usage data, including login and activity records, device and browser information, and IP address, which we use for security and audit purposes.</li>
      </ul>

      <h3 style={h3}>2. How We Use Information</h3>
      <p style={{ margin: 0 }}>We use your information to operate and secure the Service; verify claims and link you to the correct counties and properties; display property statuses and send you updates and notifications; enable messaging with counties; maintain activity and audit logs; respond to support requests; and comply with legal obligations.</p>

      <h3 style={h3}>3. Information Visible to Counties</h3>
      <p style={{ margin: 0 }}>To make the Service work, the counties you are linked to can see your contact information (such as your name, mailing address, and phone number) and the properties you have claimed with them. This helps counties send redemption checks and notices to the right person. Counties do not see information for properties or counties you are not linked to.</p>

      <h3 style={h3}>4. How We Share Information</h3>
      <p style={{ margin: 0 }}>We share information with the participating counties you are linked to, as described above. We may also share information with service providers who help us run the Service (such as hosting and email delivery), under appropriate confidentiality terms; when required by law or to respond to lawful requests; and to protect the rights, safety, and security of users, the public, or the Service. We do not sell your personal information.</p>

      <h3 style={h3}>5. Data Retention</h3>
      <p style={{ margin: 0 }}>We retain account, property, claim, communication, and activity records for as long as your account is active and as needed to operate the Service, maintain historical and audit records, and comply with legal obligations. Because tax sale records are reference information that counties and bidders may need over time, we may retain records after an account is closed. [Confirm your final retention approach with counsel; your scope notes indicate you intend to keep historical records long-term.]</p>

      <h3 style={h3}>6. Security</h3>
      <p style={{ margin: 0 }}>We protect information using encrypted connections (SSL/TLS), encrypted messaging, restricted role-based access, account verification, and other safeguards. No system is perfectly secure, but protecting this information is central to how the Service is built. If we become aware of a breach affecting your information, we will notify you and the relevant parties as required by law.</p>

      <h3 style={h3}>7. Your Choices and Rights</h3>
      <p style={{ margin: 0 }}>You can review and update your profile information at any time in your account, and manage notification preferences where available. You may request that we deactivate your account or delete information, though we may retain certain records as described in Section 5 and as required by law. To make a request, contact {SITE.supportEmail}. [If you have users in states with specific privacy laws, your attorney may add the required state-specific rights and disclosures here.]</p>

      <h3 style={h3}>8. Cookies and Sessions</h3>
      <p style={{ margin: 0 }}>We use cookies and similar technologies to keep you signed in, remember preferences, and maintain security. You can control cookies through your browser, though some features may not work without them.</p>

      <h3 style={h3}>9. Third-Party Sign-In</h3>
      <p style={{ margin: 0 }}>If you sign in using a third-party provider such as Google, that provider shares limited account information with us (such as your email and name) so we can create or access your account. Your use of that provider is governed by its own privacy policy.</p>

      <h3 style={h3}>10. Children&apos;s Privacy</h3>
      <p style={{ margin: 0 }}>The Service is intended for adults (18+) and is not directed to children. We do not knowingly collect information from anyone under 18.</p>

      <h3 style={h3}>11. Changes to This Policy</h3>
      <p style={{ margin: 0 }}>We may update this Policy from time to time. We will revise the effective date and, for material changes, may notify you. Continued use after changes take effect means you accept the updated Policy.</p>

      <h3 style={h3}>12. Contact</h3>
      <p style={{ margin: 0 }}>Questions or requests about this Policy: {SITE.supportEmail} / {SITE.mailingAddress}.</p>
    </ContentPage>
  );
}
