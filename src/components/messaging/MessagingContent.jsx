"use client";
import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import DashboardNav from "@/components/dashboard/DashboardNav";

const MessagingContent = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const [conversations, setConversations] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Property picker state
  const [selectedUser, setSelectedUser] = useState(null);
  const [showPropertyPicker, setShowPropertyPicker] = useState(false);
  const [properties, setProperties] = useState([]);
  const [loadingProperties, setLoadingProperties] = useState(false);

  // Collapsible groups
  const [collapsedGroups, setCollapsedGroups] = useState({});

  useEffect(() => {
    if (session?.user) {
      fetchConversations();
    }
  }, [session]);

  const fetchConversations = async () => {
    try {
      setIsLoading(true);
      const res = await fetch("/api/conversations");
      if (res.ok) {
        const data = await res.json();
        setConversations(data);
      }
    } catch (error) {
      console.error("Error fetching conversations:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const grouped = useMemo(() => {
    const groups = {};
    for (const conv of conversations) {
      const propId = conv.property?.id || "unknown";
      if (!groups[propId]) {
        groups[propId] = {
          property: conv.property,
          conversations: [],
          totalUnread: 0,
        };
      }
      groups[propId].conversations.push(conv);
      groups[propId].totalUnread += conv.unreadCount || 0;
    }
    return Object.values(groups);
  }, [conversations]);

  const toggleGroup = (propId) => {
    setCollapsedGroups((prev) => ({ ...prev, [propId]: !prev[propId] }));
  };

  const handleSearch = async (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (query.length > 2) {
      setIsSearching(true);
      try {
        const res = await fetch(`/api/users/search?email=${encodeURIComponent(query)}`);
        if (res.ok) {
          const data = await res.json();
          const filtered = data.filter((u) => u.id !== session?.user?.id);
          setSearchResults(filtered);
        } else {
          setSearchResults([]);
        }
      } catch (error) {
        console.error("Error searching users:", error);
        setSearchResults([]);
      }
      setIsSearching(false);
    } else {
      setSearchResults([]);
    }
  };

  const handleUserSelect = async (user) => {
    setSelectedUser(user);
    setSearchQuery("");
    setSearchResults([]);
    setShowPropertyPicker(true);
    setLoadingProperties(true);

    try {
      const res = await fetch("/api/properties");
      if (res.ok) {
        const data = await res.json();
        setProperties(Array.isArray(data) ? data : []);
      }
    } catch (error) {
      console.error("Error fetching properties:", error);
    } finally {
      setLoadingProperties(false);
    }
  };

  const startConversation = async (propertyId) => {
    if (!selectedUser || !propertyId) return;
    try {
      const res = await fetch("/api/conversations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ otherUserId: selectedUser.id, propertyId }),
      });
      if (res.ok) {
        const newConv = await res.json();
        setShowPropertyPicker(false);
        setSelectedUser(null);
        router.push(`/messaging/${newConv.id}`);
      }
    } catch (error) {
      console.error("Error starting conversation:", error);
    }
  };

  const cancelPropertyPicker = () => {
    setShowPropertyPicker(false);
    setSelectedUser(null);
  };

  return (
    <div className="messaging-page-wrapper">
      <div className="messaging-header-bar">
        <Link href="/dashboard" className="back-btn">
          <i className="bi bi-arrow-left"></i> <span>Back to Dashboard</span>
        </Link>
      </div>

      <div className="messaging-container-full">
        <div className="conversations-sidebar" style={{ width: "100%", display: "flex" }}>
          <div className="conversation-search" style={{ position: "relative" }}>
            <div style={{ display: "flex", alignItems: "center", width: "100%" }}>
              <i
                className="bi bi-search"
                style={{ position: "absolute", right: "0px", color: "#888", width: "15px" }}
              ></i>
              <input
                type="text"
                placeholder="Search users by name or email..."
                value={searchQuery}
                onChange={handleSearch}
                style={{ paddingLeft: "35px", flex: 1 }}
              />
            </div>
            {searchResults.length > 0 && (
              <div
                className="search-results-dropdown"
                style={{
                  position: "absolute",
                  top: "100%",
                  left: 0,
                  right: 0,
                  background: "white",
                  border: "1px solid #ddd",
                  zIndex: 10,
                  maxHeight: "200px",
                  overflowY: "auto",
                }}
              >
                {searchResults.map((user) => (
                  <div
                    key={user.id}
                    className="search-result-item"
                    style={{
                      padding: "10px",
                      cursor: "pointer",
                      borderBottom: "1px solid #eee",
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                    }}
                    onClick={() => handleUserSelect(user)}
                  >
                    <img
                      src={user.image || "/assets/img/avatar-placeholder.svg"}
                      alt={user.name || user.email}
                      onError={(e) => {
                        e.currentTarget.src = "/assets/img/avatar-placeholder.svg";
                      }}
                      style={{
                        width: "36px",
                        height: "36px",
                        borderRadius: "50%",
                        objectFit: "cover",
                        flexShrink: 0,
                      }}
                    />
                    <div>
                      <div style={{ fontWeight: "bold" }}>{user.name || user.email}</div>
                      <div style={{ fontSize: "0.8em", color: "#666" }}>{user.email}</div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Property Picker Modal */}
          {showPropertyPicker && (
            <div
              style={{
                position: "fixed",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: "rgba(0,0,0,0.5)",
                zIndex: 100,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
              onClick={cancelPropertyPicker}
            >
              <div
                style={{
                  background: "#fff",
                  borderRadius: "12px",
                  padding: "24px",
                  width: "90%",
                  maxWidth: "480px",
                  maxHeight: "70vh",
                  overflow: "hidden",
                  display: "flex",
                  flexDirection: "column",
                }}
                onClick={(e) => e.stopPropagation()}
              >
                <h3 style={{ margin: "0 0 4px 0", fontSize: "18px", fontWeight: "600" }}>
                  Select a Property
                </h3>
                <p style={{ margin: "0 0 16px 0", color: "#6B7280", fontSize: "14px" }}>
                  Chat with <strong>{selectedUser?.name || selectedUser?.email}</strong> about:
                </p>

                {loadingProperties ? (
                  <div style={{ textAlign: "center", padding: "24px 0" }}>
                    <div className="spinner-border text-primary" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </div>
                  </div>
                ) : properties.length === 0 ? (
                  <p style={{ color: "#9CA3AF", textAlign: "center", padding: "24px 0" }}>
                    No properties found.
                  </p>
                ) : (
                  <div style={{ overflowY: "auto", flex: 1 }}>
                    {properties.map((p) => (
                      <div
                        key={p.id}
                        onClick={() => startConversation(p.id)}
                        style={{
                          padding: "12px 16px",
                          borderRadius: "8px",
                          cursor: "pointer",
                          borderBottom: "1px solid #f3f4f6",
                          transition: "background 0.15s",
                        }}
                        onMouseEnter={(e) => (e.currentTarget.style.background = "#f3f4f6")}
                        onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                      >
                        <div style={{ fontWeight: "600", fontSize: "14px", color: "#1A1A1A" }}>
                          {p.title || p.address || `Property ${p.saleId}`}
                        </div>
                        <div style={{ fontSize: "12px", color: "#6B7280", marginTop: "2px" }}>
                          {p.address && <span>{p.address}</span>}
                          {p.saleId && (
                            <span style={{ marginLeft: p.address ? "8px" : "0" }}>
                              Sale #{p.saleId}
                            </span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                <div style={{ marginTop: "16px", textAlign: "right" }}>
                  <button
                    onClick={cancelPropertyPicker}
                    style={{
                      padding: "8px 20px",
                      border: "1px solid #E5E7EB",
                      borderRadius: "8px",
                      background: "#fff",
                      cursor: "pointer",
                      fontSize: "14px",
                      fontWeight: "500",
                    }}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}

          <div className="conversations-list">
            {isLoading ? (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  padding: "40px 0",
                }}
              >
                <div className="spinner-border text-primary" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </div>
            ) : grouped.length === 0 ? (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  padding: "40px 20px",
                  color: "#6B7280",
                }}
              >
                <i
                  className="bi bi-chat-dots"
                  style={{ fontSize: "48px", marginBottom: "16px", opacity: 0.5 }}
                ></i>
                <p style={{ margin: 0, fontSize: "14px" }}>No conversations yet</p>
                <p style={{ margin: "4px 0 0 0", fontSize: "12px", opacity: 0.7 }}>
                  Search for users to start chatting
                </p>
              </div>
            ) : (
              grouped.map((group) => {
                const propId = group.property?.id || "unknown";
                const isCollapsed = collapsedGroups[propId];
                return (
                  <div key={propId}>
                    {/* Property group header */}
                    <div
                      onClick={() => toggleGroup(propId)}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        padding: "12px 20px",
                        background: "#f0f2f5",
                        cursor: "pointer",
                        borderBottom: "1px solid #E5E7EB",
                        userSelect: "none",
                      }}
                    >
                      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                        <i
                          className="bi bi-building"
                          style={{ color: "#6EA500", fontSize: "16px" }}
                        ></i>
                        <div>
                          <div
                            style={{
                              fontWeight: "600",
                              fontSize: "13px",
                              color: "#1A1A1A",
                            }}
                          >
                            {group.property?.title ||
                              group.property?.address ||
                              "Unknown Property"}
                          </div>
                          {group.property?.saleId && (
                            <div style={{ fontSize: "11px", color: "#6B7280" }}>
                              Sale #{group.property.saleId}
                            </div>
                          )}
                        </div>
                      </div>
                      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                        {group.totalUnread > 0 && (
                          <span className="unread-badge">{group.totalUnread}</span>
                        )}
                        <i
                          className={`bi bi-chevron-${isCollapsed ? "down" : "up"}`}
                          style={{ fontSize: "12px", color: "#9CA3AF" }}
                        ></i>
                      </div>
                    </div>

                    {/* Conversation sub-list */}
                    {!isCollapsed &&
                      group.conversations.map((conv) => (
                        <Link
                          href={`/messaging/${conv.id}`}
                          key={conv.id}
                          className="conversation-item"
                          style={{ textDecoration: "none", color: "inherit", paddingLeft: "36px" }}
                        >
                          <div className="conv-avatar-wrapper">
                            <img
                              src={
                                conv.otherUser?.image || "/assets/img/avatar-placeholder.svg"
                              }
                              alt={conv.otherUser?.name || "User"}
                              className="conv-avatar"
                              onError={(e) => {
                                e.currentTarget.src = "/assets/img/avatar-placeholder.svg";
                              }}
                            />
                          </div>
                          <div className="conv-details">
                            <div className="conv-header">
                              <h4 className="conv-name">
                                {conv.otherUser?.name ||
                                  conv.otherUser?.email ||
                                  "Unknown User"}
                              </h4>
                              <span className="conv-time">
                                {new Date(conv.lastMessageAt).toLocaleString([], {
                                  month: "short",
                                  day: "numeric",
                                  hour: "2-digit",
                                  minute: "2-digit",
                                })}
                              </span>
                            </div>
                            <div className="conv-preview-row">
                              <p className="conv-preview">Click to view messages</p>
                              {conv.unreadCount > 0 && (
                                <span className="unread-badge">{conv.unreadCount}</span>
                              )}
                            </div>
                          </div>
                        </Link>
                      ))}
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessagingContent;
