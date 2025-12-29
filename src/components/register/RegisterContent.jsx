"use client";
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

const RegisterContent = () => {
    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState("");
    const [step, setStep] = useState(1); // 1: Email, 2: OTP
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleSendOtp = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            const res = await fetch('/api/email/send', {
                method: 'POST',
                body: JSON.stringify({
                    to: email,
                    subject: 'Your OTP for Registration',
                }),
                headers: { 'Content-Type': 'application/json' },
            });

            const data = await res.json();

            if (!res.ok) {
                setError(data.error || 'Failed to send OTP');
            } else {
                setStep(2);
            }
        } catch (err) {
            setError("An error occurred. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            // Verify OTP and Register/Login
            const res = await fetch('/api/register', {
                method: 'POST',
                body: JSON.stringify({ email, password: otp }), // OTP is sent as password
                headers: { 'Content-Type': 'application/json' },
            });

            const data = await res.json();

            if (!res.ok) {
                setError(data.error || 'Invalid OTP or registration failed');
            } else {
                // Auto-login after successful verification
                const login = await signIn('credentials', {
                    email,
                    redirect: false,
                });

                if (login?.ok) {
                    router.push('/dashboard');
                } else {
                    setError('Verified but login failed.');
                }
            }
        } catch (err) {
            setError("An error occurred. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            {/* Breadcrumb Section
            <div className="login-breadcrumb">
                <div className="container">
                    <h1 className="login-title">Register</h1>
                    <div className="breadcrumb-nav">
                        <Link href="/" className="breadcrumb-link">Home</Link>
                        <span className="breadcrumb-separator">→</span>
                        <span className="breadcrumb-current">Register</span>
                    </div>
                </div>
            </div> */}

            {/* Register Section */}
            <div className="login-section">
                <div className="container relative">
                    {/* Logo at top left */}
                   

                    <div className="login-wrapper">
                        {/* Left Side - Illustration */}
                        <div className="login-illustration">
                            <div className="illustration-content">
                                <Image
                                    src="/images/login-illustration.png"
                                    alt="Auction Illustration"
                                    width={500}
                                    height={400}
                                    priority
                                />
                            </div>
                        </div>

                        {/* Right Side - Register Form */}
                        <div className="login-form-wrapper">
                            <div className="login-card">
                                <div className="secure-icon">
                                    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M12 2L4 6V12C4 16.55 7.16 20.74 12 22C16.84 20.74 20 16.55 20 12V6L12 2ZM10 17L6 13L7.41 11.59L10 14.17L16.59 7.58L18 9L10 17Z" fill="currentColor" />
                                    </svg>
                                </div>
                                <h2 className="login-heading">Continue with Email</h2>
                                <p className="login-subtitle">
                                    {step === 1 ? "Enter your email to log in. If you’re new, we’ll create an account for you instantly." : "Enter the OTP sent to your email"}
                                </p>

                                {error && <p style={{ color: 'red', marginBottom: '1rem', textAlign: 'center' }}>{error}</p>}

                                {step === 1 ? (
                                    <form onSubmit={handleSendOtp} className="login-form">
                                        <div className="form-group">
                                            <label htmlFor="email" className="form-label">
                                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M20 4H4C2.9 4 2.01 4.9 2.01 6L2 18C2 19.1 2.9 20 4 20H20C21.1 20 22 19.1 22 18V6C22 4.9 21.1 4 20 4ZM20 8L12 13L4 8V6L12 11L20 6V8Z" fill="currentColor" />
                                                </svg>
                                                Email Address
                                            </label>
                                            <input
                                                type="email"
                                                id="email"
                                                className="form-input"
                                                placeholder="Enter your email"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                required
                                            />
                                        </div>

                                        <button type="submit" className="btn-send-otp" disabled={loading}>
                                            {loading ? "Processing..." : "Continue"}
                                        </button>
                                    </form>
                                ) : (
                                    <form onSubmit={handleRegister} className="login-form">
                                        <div className="form-group">
                                            <label htmlFor="otp" className="form-label">
                                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M12 17c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm6-9h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zM9 6c0-1.66 1.34-3 3-3s3 1.34 3 3v2H9V6z" fill="currentColor" />
                                                </svg>
                                                Password (OTP)
                                            </label>
                                            <input
                                                type="text"
                                                id="otp"
                                                className="form-input"
                                                placeholder="Enter OTP"
                                                value={otp}
                                                onChange={(e) => setOtp(e.target.value)}
                                                required
                                            />
                                        </div>

                                        <button type="submit" className="btn-send-otp" disabled={loading}>
                                            {loading ? "Verifying..." : "Verify Now"}
                                        </button>
                                        <button
                                            type="button"
                                            className="btn-link"
                                            onClick={() => setStep(1)}
                                            style={{ marginTop: '10px', background: 'none', border: 'none', color: '#666', cursor: 'pointer', width: '100%' }}
                                        >
                                            Back to Email
                                        </button>
                                    </form>
                                )}

                                <div className="divider">
                                    <span>OR</span>
                                </div>

                                <div className="social-login">
                                    <button className="btn-social btn-google" onClick={() => signIn('google', { callbackUrl: '/dashboard' })}>
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                                            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                                            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                                            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                                        </svg>
                                        Continue with Google
                                    </button>

                                    <button className="btn-social btn-facebook" onClick={() => signIn('facebook', { callbackUrl: '/dashboard' })}>
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" fill="#1877F2" />
                                        </svg>
                                        Continue with Facebook
                                    </button>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default RegisterContent;
