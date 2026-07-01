"use client";

import React, { useEffect, useState, useRef, useCallback } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Header from "@/components/header/Header";
import Footer from "@/components/footer/Footer";
import DashboardNav from "@/components/dashboard/DashboardNav";

type Msg = { id: number; senderRole: "user" | "admin"; body: string; createdAt: string };

export default function SupportPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [messages, setMessages] = useState<Msg[]>([]);
  const [text, setText] = useState("");
  const [sending, setSending] = useState(false);
  const boxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (status === "unauthenticated") router.push("/register");
  }, [status, router]);

  const load = useCallback(async () => {
    try {
      const r = await fetch("/api/support");
      const d = await r.json();
      setMessages(d.messages || []);
    } catch { /* ignore */ }
  }, []);

  // Load + poll every 5s for admin replies.
  useEffect(() => {
    if (!session) return;
    load();
    const t = setInterval(load, 5000);
    return () => clearInterval(t);
  }, [session, load]);

  // Scroll only the chat box to its bottom — NOT the whole page (which would jump to the footer).
  useEffect(() => {
    if (boxRef.current) boxRef.current.scrollTop = boxRef.current.scrollHeight;
  }, [messages]);

  const send = async (e: React.FormEvent) => {
    e.preventDefault();
    const b = text.trim();
    if (!b) return;
    setSending(true);
    try {
      const r = await fetch("/api/support", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ body: b }),
      });
      if (r.ok) { setText(""); await load(); }
    } finally {
      setSending(false);
    }
  };

  if (status === "loading") {
    return (
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh" }}>
        <div className="spinner-border text-primary" role="status"><span className="visually-hidden">Loading...</span></div>
      </div>
    );
  }
  if (!session) return null;

  return (
    <>
      <Header />
      <div className="dashboard-wrapper">
        <DashboardNav activeTab="support" />

        <div className="profile-section">
          <div className="container">
            <div className="profile-content">
              <div className="profile-card">
                <h2 className="profile-card-title">Contact Admin</h2>
                <p style={{ color: "#6B7280", marginTop: -8, marginBottom: 16 }}>
                  Message the BidBridge team directly. We&apos;ll reply here, and you&apos;ll also get any updates in this thread.
                </p>

                <div ref={boxRef} style={{ border: "1px solid #E5E7EB", borderRadius: 10, padding: 16, height: 380, overflowY: "auto", display: "flex", flexDirection: "column", gap: 10, background: "#FAFAFA" }}>
                  {messages.length === 0 ? (
                    <p style={{ color: "#9CA3AF", margin: "auto" }}>No messages yet — send us a message below.</p>
                  ) : (
                    messages.map((m) => {
                      const mine = m.senderRole === "user";
                      return (
                        <div key={m.id} style={{ alignSelf: mine ? "flex-end" : "flex-start", maxWidth: "78%" }}>
                          <div style={{
                            background: mine ? "#4d7400" : "#FFFFFF",
                            color: mine ? "#FFFFFF" : "#1F2937",
                            border: mine ? "none" : "1px solid #E5E7EB",
                            borderRadius: 12, padding: "8px 12px", fontSize: 14, whiteSpace: "pre-wrap", wordBreak: "break-word",
                          }}>
                            {m.body}
                          </div>
                          <div style={{ fontSize: 11, color: "#9CA3AF", marginTop: 2, textAlign: mine ? "right" : "left" }}>
                            {mine ? "You" : "BidBridge Admin"} · {new Date(m.createdAt).toLocaleString()}
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>

                <form onSubmit={send} style={{ display: "flex", gap: 8, marginTop: 12 }}>
                  <textarea
                    className="profile-input"
                    rows={2}
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Type your message…"
                    style={{ resize: "vertical", flex: 1 }}
                    onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(e); } }}
                  />
                  <button type="submit" className="profile-btn" disabled={sending || !text.trim()} style={{ alignSelf: "flex-end" }}>
                    {sending ? "Sending…" : "Send"}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
