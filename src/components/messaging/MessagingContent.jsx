"use client";
import React, { useState, useEffect } from "react";
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

  // Fetch conversations on load
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

  const handleSearch = async (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (query.length > 2) {
      setIsSearching(true);
      try {
        const res = await fetch(`/api/users/search?email=${encodeURIComponent(query)}`);
        if (res.ok) {
          const data = await res.json();
          const filtered = data.filter(u => u.id !== session?.user?.id);
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

  const startConversation = async (otherUserId) => {
    try {
      const res = await fetch("/api/conversations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ otherUserId }),
      });
      if (res.ok) {
        const newConv = await res.json();
        router.push(`/messaging/${newConv.id}`);
      }
    } catch (error) {
      console.error("Error starting conversation:", error);
    }
  };

  return (
    <div className="messaging-page-wrapper">
      <div className="messaging-header-bar">
        <Link href="/dashboard" className="back-btn">
          <i className="bi bi-arrow-left"></i> <span>Back to Dashboard</span>
        </Link>
      </div>

      <div className="messaging-container-full">
        {/* Conversations List - Full Width */}
        <div className="conversations-sidebar" style={{ width: '100%', display: 'flex' }}>
          <div className="conversation-search" style={{ position: 'relative' }}>
            <div style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
              <i className="bi bi-search" style={{ position: 'absolute', right: '0px', color: '#888', width: '15px' }}></i>
              <input
                type="text"
                placeholder="Search users by name or email..."
                value={searchQuery}
                onChange={handleSearch}
                style={{ paddingLeft: '35px', flex: 1 }}
              />
            </div>
            {/* Search Results Dropdown */}
            {searchResults.length > 0 && (
              <div className="search-results-dropdown" style={{
                position: 'absolute',
                top: '100%',
                left: 0,
                right: 0,
                background: 'white',
                border: '1px solid #ddd',
                zIndex: 10,
                maxHeight: '200px',
                overflowY: 'auto'
              }}>
                {searchResults.map(user => (
                  <div
                    key={user.id}
                    className="search-result-item"
                    style={{ padding: '10px', cursor: 'pointer', borderBottom: '1px solid #eee' }}
                    onClick={() => startConversation(user.id)}
                  >
                    <div style={{ fontWeight: 'bold' }}>{user.name || user.email}</div>
                    <div style={{ fontSize: '0.8em', color: '#666' }}>{user.email}</div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="conversations-list">
            {isLoading ? (
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '40px 0' }}>
                <div className="spinner-border text-primary" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </div>
            ) : conversations.length === 0 ? (
              <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: '40px 20px', color: '#6B7280' }}>
                <i className="bi bi-chat-dots" style={{ fontSize: '48px', marginBottom: '16px', opacity: 0.5 }}></i>
                <p style={{ margin: 0, fontSize: '14px' }}>No conversations yet</p>
                <p style={{ margin: '4px 0 0 0', fontSize: '12px', opacity: 0.7 }}>Search for users to start chatting</p>
              </div>
            ) : (
              conversations.map((conv) => (
                <Link
                  href={`/messaging/${conv.id}`}
                  key={conv.id}
                  className="conversation-item"
                  style={{ textDecoration: 'none', color: 'inherit' }}
                >
                  <div className="conv-avatar-wrapper">
                    <img
                      src={conv.otherUser?.image || "/images/Image (John Doe).png"}
                      alt={conv.otherUser?.name}
                      className="conv-avatar"
                    />
                  </div>
                  <div className="conv-details">
                    <div className="conv-header">
                      <h4 className="conv-name">{conv.otherUser?.name || conv.otherUser?.email || "Unknown User"}</h4>
                      <span className="conv-time">
                        {new Date(conv.lastMessageAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
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
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessagingContent;
