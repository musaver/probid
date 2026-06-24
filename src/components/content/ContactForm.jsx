"use client";
import React, { useState } from "react";

const inputStyle = {
  width: "100%",
  padding: "10px 12px",
  border: "1px solid #D1D5DB",
  borderRadius: 8,
  fontSize: 15,
  fontFamily: "inherit",
  color: "#1F2937",
  outline: "none",
};

const labelStyle = { display: "block", fontWeight: 600, color: "#374151", marginBottom: 6, fontSize: 14 };

export default function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [status, setStatus] = useState("idle"); // idle | sending | ok | error
  const [error, setError] = useState("");

  const update = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus("sending");
    setError("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(data.error || "Something went wrong. Please try again.");
        setStatus("error");
        return;
      }
      setStatus("ok");
      setForm({ name: "", email: "", subject: "", message: "" });
    } catch {
      setError("Network error. Please check your connection and try again.");
      setStatus("error");
    }
  }

  if (status === "ok") {
    return (
      <div style={{ border: "1px solid #BBF7D0", background: "#F0FDF4", borderRadius: 12, padding: "20px 22px" }}>
        <p style={{ margin: 0, color: "#166534", fontWeight: 600 }}>Thanks — your message has been sent.</p>
        <p style={{ margin: "8px 0 0", color: "#15803D" }}>
          We&apos;ll get back to you as soon as we can. You can send another message below if you need to.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          style={{ marginTop: 14, padding: "9px 18px", background: "#4d7400", color: "#fff", border: "none", borderRadius: 8, fontWeight: 600, cursor: "pointer" }}
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
        <div style={{ flex: "1 1 220px" }}>
          <label style={labelStyle} htmlFor="cf-name">Name *</label>
          <input id="cf-name" style={inputStyle} value={form.name} onChange={update("name")} required maxLength={120} />
        </div>
        <div style={{ flex: "1 1 220px" }}>
          <label style={labelStyle} htmlFor="cf-email">Email *</label>
          <input id="cf-email" type="email" style={inputStyle} value={form.email} onChange={update("email")} required maxLength={160} />
        </div>
      </div>
      <div>
        <label style={labelStyle} htmlFor="cf-subject">Subject</label>
        <input id="cf-subject" style={inputStyle} value={form.subject} onChange={update("subject")} maxLength={160} placeholder="e.g. Question about a claim" />
      </div>
      <div>
        <label style={labelStyle} htmlFor="cf-message">Message *</label>
        <textarea id="cf-message" style={{ ...inputStyle, minHeight: 130, resize: "vertical" }} value={form.message} onChange={update("message")} required maxLength={5000} placeholder="How can we help? If it's about a property, include the county and Sale ID or parcel number." />
      </div>

      {status === "error" && (
        <p style={{ margin: 0, color: "#B91C1C", background: "#FEF2F2", border: "1px solid #FECACA", borderRadius: 8, padding: "10px 14px" }}>
          {error}
        </p>
      )}

      <div>
        <button
          type="submit"
          disabled={status === "sending"}
          style={{ padding: "11px 26px", background: status === "sending" ? "#86a64d" : "#4d7400", color: "#fff", border: "none", borderRadius: 8, fontWeight: 600, fontSize: 15, cursor: status === "sending" ? "default" : "pointer" }}
        >
          {status === "sending" ? "Sending…" : "Send message"}
        </button>
      </div>
    </form>
  );
}
