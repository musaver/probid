"use client";

import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Header from "@/components/header/Header";
import Footer from "@/components/footer/Footer";
import DashboardNav from "@/components/dashboard/DashboardNav";

type Post = { id: string; title: string; body: string; pinned: number; createdAt: string };

export default function NewsPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => { if (status === "unauthenticated") router.push("/register"); }, [status, router]);

  useEffect(() => {
    if (!session) return;
    fetch("/api/bulletin").then((r) => r.json()).then((d) => setPosts(d.posts || [])).catch(() => setPosts([])).finally(() => setLoading(false));
  }, [session]);

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
        <DashboardNav activeTab="news" />
        <div className="profile-section">
          <div className="container">
            <div className="profile-content">
              <div className="profile-card">
                <h2 className="profile-card-title">News &amp; Updates</h2>
                {loading ? (
                  <p style={{ color: "#6B7280" }}>Loading…</p>
                ) : posts.length === 0 ? (
                  <p style={{ color: "#6B7280" }}>No announcements yet.</p>
                ) : (
                  <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                    {posts.map((p) => (
                      <div key={p.id} style={{ border: "1px solid #E5E7EB", borderRadius: 10, padding: 16, background: p.pinned ? "#FFFBEB" : "#fff" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
                          {p.pinned === 1 && <i className="bi bi-pin-angle-fill" style={{ color: "#D97706" }}></i>}
                          <strong style={{ fontSize: 16 }}>{p.title}</strong>
                        </div>
                        <p style={{ color: "#374151", whiteSpace: "pre-wrap", margin: 0 }}>{p.body}</p>
                        <p style={{ color: "#9CA3AF", fontSize: 12, marginTop: 10, marginBottom: 0 }}>
                          {new Date(p.createdAt).toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" })}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
