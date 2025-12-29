"use client";
import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import CryptoJS from "crypto-js";
import { useRouter } from "next/navigation";

const SingleChatContent = ({ conversationId }) => {
    const { data: session } = useSession();
    const router = useRouter();
    const [conversation, setConversation] = useState(null);
    const [messages, setMessages] = useState([]);
    const [messageInput, setMessageInput] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const messagesEndRef = useRef(null);
    const previousMessageCountRef = useRef(0);
    const isInitialLoadRef = useRef(true);

    // Fetch conversation details
    useEffect(() => {
        if (session?.user && conversationId) {
            fetchConversation();
        }
    }, [session, conversationId]);

    const fetchConversation = async () => {
        try {
            const res = await fetch(`/api/conversations/${conversationId}`);
            if (res.ok) {
                const data = await res.json();
                setConversation(data);
            } else {
                console.error("Failed to fetch conversation");
                // router.push("/messaging"); // Redirect if not found?
            }
        } catch (error) {
            console.error("Error fetching conversation:", error);
        }
    };

    // Poll for messages
    useEffect(() => {
        let interval;
        if (conversation) {
            fetchMessages();
            markMessagesAsRead(); // Mark as read when opening chat
            interval = setInterval(() => {
                fetchMessages();
            }, 3000);
        }
        return () => clearInterval(interval);
    }, [conversation]);

    const markMessagesAsRead = async () => {
        if (!conversation) return;
        try {
            await fetch("/api/messages/read", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ conversationId: conversation.id }),
            });
        } catch (error) {
            console.error("Error marking messages as read:", error);
        }
    };

    const fetchMessages = async () => {
        if (!conversation) return;
        try {
            const res = await fetch(`/api/messages?conversationId=${conversation.id}`);
            if (res.ok) {
                const data = await res.json();
                const decryptedMessages = data.map((msg) => {
                    try {
                        if (conversation.sharedKey) {
                            const bytes = CryptoJS.AES.decrypt(msg.content, conversation.sharedKey);
                            const originalText = bytes.toString(CryptoJS.enc.Utf8);
                            return { ...msg, text: originalText || "[Error decrypting]" };
                        }
                        return { ...msg, text: msg.content };
                    } catch (e) {
                        return { ...msg, text: "[Encrypted Message]" };
                    }
                });
                setMessages(decryptedMessages);
                setIsLoading(false);
            }
        } catch (error) {
            console.error("Error fetching messages:", error);
        }
    };

    // Scroll to bottom only on initial load or when new messages arrive
    useEffect(() => {
        if (messagesEndRef.current) {
            // Scroll if it's the initial load or if new messages were added
            if (isInitialLoadRef.current || messages.length > previousMessageCountRef.current) {
                messagesEndRef.current.scrollIntoView({ behavior: "auto" });
                isInitialLoadRef.current = false;
            }
            // Update the previous message count
            previousMessageCountRef.current = messages.length;
        }
    }, [messages]);

    const handleSendMessage = async (e) => {
        e.preventDefault();
        if (!messageInput.trim() || !conversation) return;

        try {
            const encryptedContent = CryptoJS.AES.encrypt(messageInput, conversation.sharedKey).toString();
            const res = await fetch("/api/messages", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    conversationId: conversation.id,
                    content: encryptedContent,
                }),
            });

            if (res.ok) {
                setMessageInput("");
                fetchMessages();
            }
        } catch (error) {
            console.error("Error sending message:", error);
        }
    };

    if (!conversation) {
        return (
            <div className="messaging-page-wrapper" style={{ justifyContent: 'center', alignItems: 'center' }}>
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        );
    }

    return (
        <div className="messaging-page-wrapper">
            <div className="messaging-header-bar">
                <Link href="/messaging" className="back-btn">
                    <i className="bi bi-arrow-left"></i> <span>Back to Messages</span>
                </Link>
            </div>

            <div className="messaging-container-full">
                <div className="chat-window" style={{ width: '100%', display: 'flex' }}>
                    {/* Chat Header */}
                    <div className="chat-header">
                        <div className="chat-user-info">
                            <img
                                src={conversation.otherUser?.image || "/images/Image (John Doe).png"}
                                alt={conversation.otherUser?.name}
                                className="chat-avatar"
                            />
                            <div className="chat-user-details">
                                <h3 className="chat-user-name">{conversation.otherUser?.name || conversation.otherUser?.email}</h3>
                                <span className="chat-user-status">Encrypted Chat</span>
                            </div>
                        </div>
                        <button className="chat-menu-btn">
                            <i className="bi bi-three-dots-vertical"></i>
                        </button>
                    </div>

                    {/* Messages Area */}
                    <div className="messages-area">
                        {isLoading ? (
                            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                                <div className="spinner-border text-primary" role="status">
                                    <span className="visually-hidden">Loading...</span>
                                </div>
                            </div>
                        ) : (
                            <>
                                {messages.map((message) => (
                                    <div key={message.id} className={`message-bubble ${message.senderId === session?.user?.id ? 'user' : 'admin'}`}>
                                        <div className="message-content">
                                            <p className="message-text">{message.text}</p>
                                            <span className="message-time">
                                                {new Date(message.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                                <div ref={messagesEndRef} />
                            </>
                        )}
                    </div>

                    {/* Message Input */}
                    <div className="message-input-wrapper">
                        <form onSubmit={handleSendMessage} className="message-input-form">
                            <button type="button" className="attach-btn">
                                <i className="bi bi-paperclip"></i>
                            </button>
                            <input
                                type="text"
                                placeholder="Type your message..."
                                value={messageInput}
                                onChange={(e) => setMessageInput(e.target.value)}
                                className="message-input"
                            />
                            <button type="submit" className="send-btn" disabled={!messageInput.trim()}>
                                <i className="bi bi-send-fill"></i>
                                Send
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SingleChatContent;
