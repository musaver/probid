import React from "react";
import ContentPage from "@/components/content/ContentPage";

const section = { marginTop: 28, marginBottom: 10, fontSize: 20, fontWeight: 700, color: "#1F2937" } as React.CSSProperties;

// NOTE: placeholder policy copy — replace with the client's final Privacy Policy text.
export default function PrivacyPolicyPage() {
  return (
    <ContentPage title="Our Policy" subtitle="How we handle your information.">
      <p style={{ color: "#6B7280" }}><em>This is placeholder text and will be replaced with the official Privacy Policy.</em></p>

      <h3 style={section}>Information we collect</h3>
      <p>When you sign up we collect your name, email, and address, and the bidder numbers and property claims you submit for verification.</p>

      <h3 style={section}>How we use it</h3>
      <p>We use your information to verify your bidder claims, show you the properties you won, and send you account-related emails (such as verification updates).</p>

      <h3 style={section}>Sharing</h3>
      <p>Property and result data is shared with the relevant county systems as part of keeping records in sync. We do not sell your personal information.</p>

      <h3 style={section}>Contact</h3>
      <p>For privacy questions, reach us through the Contact page.</p>
    </ContentPage>
  );
}
