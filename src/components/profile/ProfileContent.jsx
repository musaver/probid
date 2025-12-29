"use client";
import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import DashboardNav from "@/components/dashboard/DashboardNav";

const ProfileContent = () => {
  const { data: session } = useSession();
  const [loading, setLoading] = useState(false);
  const [profileLoading, setProfileLoading] = useState(true);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const [profileData, setProfileData] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    aboutMe: ""
  });

  // Fetch user profile data on mount
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch('/api/profile');
        const data = await response.json();
        
        if (data.success) {
          setProfileData({
            fullName: data.user.name || "",
            email: data.user.email || "",
            phone: data.user.phone || "",
            address: data.user.address || "",
            aboutMe: data.user.aboutMe || ""
          });
        }
      } catch (error) {
        console.error('Error fetching profile:', error);
      } finally {
        setProfileLoading(false);
      }
    };

    if (session) {
      fetchProfile();
    }
  }, [session]);

  const handleProfileChange = (e) => {
    setProfileData({
      ...profileData,
      [e.target.name]: e.target.value
    });
  };

  const handleSaveChanges = async (e) => {
    if (e) {
    e.preventDefault();
      e.stopPropagation();
    }
    
    setLoading(true);
    setSuccessMessage("");
    setErrorMessage("");

    try {
      const response = await fetch('/api/profile', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fullName: profileData.fullName,
          phone: profileData.phone,
          address: profileData.address,
          aboutMe: profileData.aboutMe
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setSuccessMessage(data.message || "Profile updated successfully!");
        // Clear success message after 5 seconds
        setTimeout(() => setSuccessMessage(""), 5000);
      } else {
        setErrorMessage(data.error || "Failed to update profile");
        setTimeout(() => setErrorMessage(""), 5000);
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      setErrorMessage("An error occurred while updating profile");
      setTimeout(() => setErrorMessage(""), 5000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="dashboard-wrapper">
      <DashboardNav activeTab="profile" />

      {/* Profile Content */}
      <div className="profile-section">
        <div className="container">
          <div className="profile-content">
            {/* Success Message */}
            {successMessage && (
              <div className="animate__animated animate__fadeInDown" style={{ 
                position: 'fixed',
                top: '20px',
                left: '50%',
                transform: 'translateX(-50%)',
                zIndex: 9999,
                minWidth: '300px',
                maxWidth: '600px',
                padding: '16px 24px', 
                backgroundColor: '#d4edda', 
                color: '#155724', 
                border: '2px solid #c3e6cb', 
                borderRadius: '8px',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                fontSize: '15px',
                fontWeight: '600'
              }}>
                <i className="bi bi-check-circle-fill" style={{ fontSize: '20px' }}></i>
                <span>{successMessage}</span>
              </div>
            )}

            {/* Error Message */}
            {errorMessage && (
              <div className="animate__animated animate__fadeInDown" style={{ 
                position: 'fixed',
                top: '20px',
                left: '50%',
                transform: 'translateX(-50%)',
                zIndex: 9999,
                minWidth: '300px',
                maxWidth: '600px',
                padding: '16px 24px', 
                backgroundColor: '#f8d7da', 
                color: '#721c24', 
                border: '2px solid #f5c6cb', 
                borderRadius: '8px',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                fontSize: '15px',
                fontWeight: '600'
              }}>
                <i className="bi bi-exclamation-circle-fill" style={{ fontSize: '20px' }}></i>
                <span>{errorMessage}</span>
              </div>
            )}

            {/* Profile Settings Card */}
            <div className="profile-card">
              <h2 className="profile-card-title">Profile Settings</h2>
              
              {profileLoading ? (
                <div style={{ textAlign: 'center', padding: '40px' }}>
                  <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                </div>
              ) : (
              <form onSubmit={handleSaveChanges}>
                <div className="profile-form-group">
                  <label className="profile-label">Full Name</label>
                  <input
                    type="text"
                    name="fullName"
                    className="profile-input"
                    value={profileData.fullName}
                    onChange={handleProfileChange}
                      required
                  />
                </div>

                <div className="profile-form-group">
                  <label className="profile-label">Email</label>
                  <input
                    type="email"
                    name="email"
                    className="profile-input"
                    value={profileData.email}
                      disabled
                      style={{ backgroundColor: '#f5f5f5', cursor: 'not-allowed' }}
                  />
                </div>

                <div className="profile-form-group">
                  <label className="profile-label">Phone</label>
                  <input
                    type="text"
                    name="phone"
                    className="profile-input"
                    value={profileData.phone}
                    onChange={handleProfileChange}
                  />
                </div>

                <div className="profile-form-group">
                    <label className="profile-label">Address</label>
                    <input
                      type="text"
                      name="address"
                      className="profile-input"
                      value={profileData.address}
                      onChange={handleProfileChange}
                    />
                </div>

                <div className="profile-form-group">
                    <label className="profile-label">About Me</label>
                    <textarea
                      name="aboutMe"
                      className="profile-input"
                      value={profileData.aboutMe}
                      onChange={handleProfileChange}
                      rows="4"
                      style={{ resize: 'vertical' }}
                      onKeyDown={(e) => {
                        // Prevent Enter from submitting in textarea
                        if (e.key === 'Enter' && !e.shiftKey) {
                          e.stopPropagation();
                        }
                      }}
                    />
                </div>

                    <button
                    type="submit" 
                    className="profile-btn" 
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                        Saving...
                      </>
                    ) : (
                      'Save Changes'
                    )}
                </button>
              </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileContent;