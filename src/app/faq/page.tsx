import React from "react";
import ContentPage from "@/components/content/ContentPage";

// NOTE: placeholder Q&A — replace with the client's final text when provided.
const FAQS = [
  {
    q: "What is BidBridge?",
    a: "BidBridge is a place to track the properties you won at a county tax sale. Counties provide the official results and we keep them organized for you. There is no live bidding on the site.",
  },
  {
    q: "How do I see the properties I won?",
    a: "Sign up, then go to “My Bids” and submit a claim: choose the county, enter your county-issued bidder number, and list the properties you won (by Sale ID or Map Number). Once an admin verifies your claim, those properties appear in your account.",
  },
  {
    q: "Why don’t my properties show up yet?",
    a: "Your claim is reviewed by an admin before properties appear. If the county hasn’t uploaded results yet, your claim waits until they do, then it’s verified.",
  },
  {
    q: "I have a different bidder number in each county.",
    a: "That’s expected — bidder numbers are issued per county. Submit a separate claim for each county with the correct number for that county.",
  },
  {
    q: "How do I get help?",
    a: "Use the Contact / Help & Support link in the footer to reach our team.",
  },
];

export default function FaqPage() {
  return (
    <ContentPage title="Frequently Asked Questions" subtitle="Answers to common questions about BidBridge.">
      <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
        {FAQS.map((f, i) => (
          <div key={i} style={{ border: "1px solid #E5E7EB", borderRadius: 12, padding: "18px 20px" }}>
            <h3 style={{ margin: 0, fontSize: 17, fontWeight: 700, color: "#1F2937" }}>{f.q}</h3>
            <p style={{ margin: "8px 0 0", color: "#4B5563" }}>{f.a}</p>
          </div>
        ))}
      </div>
    </ContentPage>
  );
}
