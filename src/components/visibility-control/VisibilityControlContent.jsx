"use client";
import React, { useEffect, useRef, useState } from "react";
import DashboardNav from "@/components/dashboard/DashboardNav";
import Footer from "@/components/footer/Footer";

const VisibilityControlContent = () => {
  const [visibilitySettings, setVisibilitySettings] = useState({
    minBid: true,
    currentBid: true,
    bidHistory: false,
    propertyStatus: true,
    bidderList: false,
    documents: false,
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const saveSeq = useRef(0);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const res = await fetch("/api/profile");
        if (!res.ok) return;
        const data = await res.json();
        const vc = data?.user?.visibilityControl;
        if (vc && typeof vc === "object") {
          setVisibilitySettings({
            minBid: !!vc.minBid,
            currentBid: !!vc.currentBid,
            bidHistory: !!vc.bidHistory,
            propertyStatus: !!vc.propertyStatus,
            bidderList: !!vc.bidderList,
            documents: !!vc.documents,
          });
        }
      } catch (e) {
        console.error("Failed to load visibility settings:", e);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const persist = async (next) => {
    const seq = ++saveSeq.current;
    setSaving(true);
    try {
      const res = await fetch("/api/profile", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ visibilityControl: next }),
      });
      if (!res.ok) {
        const text = await res.text().catch(() => "");
        throw new Error(text || "Failed to save visibility settings");
      }
    } catch (e) {
      // best-effort: only rollback if this is the latest save attempt
      if (seq === saveSeq.current) {
        alert(e instanceof Error ? e.message : "Failed to save visibility settings");
        // Reload server truth
        try {
          const res = await fetch("/api/profile");
          if (res.ok) {
            const data = await res.json();
            const vc = data?.user?.visibilityControl;
            if (vc && typeof vc === "object") {
              setVisibilitySettings({
                minBid: !!vc.minBid,
                currentBid: !!vc.currentBid,
                bidHistory: !!vc.bidHistory,
                propertyStatus: !!vc.propertyStatus,
                bidderList: !!vc.bidderList,
                documents: !!vc.documents,
              });
            }
          }
        } catch {}
      }
    } finally {
      if (seq === saveSeq.current) setSaving(false);
    }
  };

  const toggleSetting = (setting) => {
    setVisibilitySettings((prev) => {
      const next = { ...prev, [setting]: !prev[setting] };
      // Persist optimistically
      persist(next);
      return next;
    });
  };

  return (
    <div className="dashboard-wrapper">
      <DashboardNav activeTab="visibility-control" />

      {/* Main Content */}
      <div className="dashboard-content" style={{ background: '#FFFFFF' }}>
        <div className="container">
          <div className="visibility-control-wrapper">
            <div className="visibility-card">
              <h2 className="visibility-title">Data Visibility Settings</h2>
              {(loading || saving) && (
                <div style={{ color: "#6B7280", fontSize: "12px", marginTop: "6px" }}>
                  {loading ? "Loading settings..." : "Saving..."}
                </div>
              )}

              <div className="visibility-settings-list">
                <div className="visibility-setting-item">
                  <div className="visibility-setting-info">
                    <h3 className="setting-name">Min Bid</h3>
                    <p className="setting-description">Show min bid</p>
                  </div>
                  <label className="toggle-switch">
                    <input
                      type="checkbox"
                      checked={visibilitySettings.minBid}
                      onChange={() => toggleSetting("minBid")}
                      disabled={loading}
                    />
                    <span className="toggle-slider"></span>
                  </label>
                </div>

                <div className="visibility-setting-item">
                  <div className="visibility-setting-info">
                    <h3 className="setting-name">Current Bid</h3>
                    <p className="setting-description">Show current bid</p>
                  </div>
                  <label className="toggle-switch">
                    <input
                      type="checkbox"
                      checked={visibilitySettings.currentBid}
                      onChange={() => toggleSetting("currentBid")}
                      disabled={loading}
                    />
                    <span className="toggle-slider"></span>
                  </label>
                </div>

                <div className="visibility-setting-item">
                  <div className="visibility-setting-info">
                    <h3 className="setting-name">Bid History</h3>
                    <p className="setting-description">Show bid history</p>
                  </div>
                  <label className="toggle-switch">
                    <input
                      type="checkbox"
                      checked={visibilitySettings.bidHistory}
                      onChange={() => toggleSetting("bidHistory")}
                      disabled={loading}
                    />
                    <span className="toggle-slider"></span>
                  </label>
                </div>

                <div className="visibility-setting-item">
                  <div className="visibility-setting-info">
                    <h3 className="setting-name">Property Status</h3>
                    <p className="setting-description">Show property status</p>
                  </div>
                  <label className="toggle-switch">
                    <input
                      type="checkbox"
                      checked={visibilitySettings.propertyStatus}
                      onChange={() => toggleSetting("propertyStatus")}
                      disabled={loading}
                    />
                    <span className="toggle-slider"></span>
                  </label>
                </div>

                <div className="visibility-setting-item">
                  <div className="visibility-setting-info">
                    <h3 className="setting-name">Bidder List</h3>
                    <p className="setting-description">Show bidder list</p>
                  </div>
                  <label className="toggle-switch">
                    <input
                      type="checkbox"
                      checked={visibilitySettings.bidderList}
                      onChange={() => toggleSetting("bidderList")}
                      disabled={loading}
                    />
                    <span className="toggle-slider"></span>
                  </label>
                </div>

                <div className="visibility-setting-item">
                  <div className="visibility-setting-info">
                    <h3 className="setting-name">Documents</h3>
                    <p className="setting-description">Show documents</p>
                  </div>
                  <label className="toggle-switch">
                    <input
                      type="checkbox"
                      checked={visibilitySettings.documents}
                      onChange={() => toggleSetting("documents")}
                      disabled={loading}
                    />
                    <span className="toggle-slider"></span>
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default VisibilityControlContent;
