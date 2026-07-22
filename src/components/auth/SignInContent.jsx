"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";

const COPY = {
  signin: {
    headline: "Welcome back",
    sub: "We'll email you a one-time code to sign in",
    verifyBtn: "Verify and sign in",
  },
  register: {
    headline: "Create your account",
    sub: "Start tracking properties in minutes",
    verifyBtn: "Verify and create account",
  },
};

const RESEND_SECONDS = 60;

const SignInContent = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Where to send the user after sign-in. Honors ?callbackUrl set by the
  // middleware (e.g. /support from "Contact Admin"); rejects absolute URLs
  // as an open-redirect guard. Defaults to /dashboard.
  const rawCallback = searchParams?.get("callbackUrl");
  const postLoginTarget =
    rawCallback && rawCallback.startsWith("/") && !rawCallback.startsWith("//")
      ? rawCallback
      : "/dashboard";

  // 'signin' | 'register'
  const [mode, setMode] = useState("signin");
  // 'email' | 'verify'
  const [step, setStep] = useState("email");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [agree, setAgree] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [resendIn, setResendIn] = useState(0);

  const timerRef = useRef(null);

  const startCountdown = useCallback(() => {
    setResendIn(RESEND_SECONDS);
    clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setResendIn((s) => {
        if (s <= 1) {
          clearInterval(timerRef.current);
          return 0;
        }
        return s - 1;
      });
    }, 1000);
  }, []);

  useEffect(() => () => clearInterval(timerRef.current), []);

  const requestCode = async () => {
    const res = await fetch("/api/email/send", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        to: email.trim(),
        subject:
          mode === "signin"
            ? "Your BidBridge sign-in code"
            : "Your BidBridge verification code",
      }),
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
      throw new Error(data.error || "Failed to send code. Please try again.");
    }
  };

  const handleSendCode = async (e) => {
    e.preventDefault();
    setError("");
    if (mode === "register" && !agree) {
      setError("Please accept the Terms and Privacy Policy to continue.");
      return;
    }
    setLoading(true);
    try {
      await requestCode();
      setOtp("");
      setStep("verify");
      startCountdown();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleVerify = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      // OTP is submitted as `password` — matches the existing verify endpoint.
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim(), password: otp }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(data.error || "Invalid code. Please check and try again.");
        return;
      }

      const login = await signIn("credentials", {
        email: email.trim(),
        redirect: false,
      });

      if (login?.ok) {
        router.push(postLoginTarget);
      } else {
        setError("Verified, but sign-in failed. Please try again.");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    if (resendIn > 0 || loading) return;
    setError("");
    try {
      await requestCode();
      startCountdown();
    } catch (err) {
      setError(err.message);
    }
  };

  const switchMode = (next) => {
    setMode(next);
    setStep("email");
    setError("");
    setOtp("");
    setAgree(false);
    clearInterval(timerRef.current);
    setResendIn(0);
  };

  const backToEmail = () => {
    setStep("email");
    setError("");
    setOtp("");
    clearInterval(timerRef.current);
    setResendIn(0);
  };

  const headline = step === "verify" ? "Check your email" : COPY[mode].headline;

  return (
    <div className="bb-auth">
      <div className="bb-wrap">
        <div className="bb-card">
          <div className="bb-brand">
            <Image
              className="bb-seal"
              src="/images/logo.png"
              alt="BidBridge"
              width={104}
              height={104}
              priority
            />
          </div>

          <div className="bb-head">
            <div className="bb-headline">{headline}</div>
            <div className="bb-sub">
              {step === "verify" ? (
                <>
                  We sent a 6-digit code to{" "}
                  <span className="bb-sent-to">{email.trim()}</span>
                </>
              ) : (
                COPY[mode].sub
              )}
            </div>
          </div>

          {error && <div className="bb-error">{error}</div>}

          {step === "email" && mode === "signin" && (
            <form className="bb-form" onSubmit={handleSendCode}>
              <div className="bb-field">
                <label htmlFor="bb-email">Email</label>
                <input
                  id="bb-email"
                  type="email"
                  placeholder="you@example.com"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <button className="bb-btn" type="submit" disabled={loading}>
                {loading ? "Sending…" : "Send code"}
              </button>
            </form>
          )}

          {step === "email" && mode === "register" && (
            <form className="bb-form" onSubmit={handleSendCode}>
              <div className="bb-field">
                <label htmlFor="bb-reg-email">Email</label>
                <input
                  id="bb-reg-email"
                  type="email"
                  placeholder="you@example.com"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <div className="bb-hint">
                  No password needed — we&apos;ll email you a code to verify.
                </div>
              </div>

              <label className="bb-check">
                <input
                  type="checkbox"
                  checked={agree}
                  onChange={(e) => setAgree(e.target.checked)}
                />
                <span>
                  I agree to the <Link href="/terms-condition">Terms</Link> and{" "}
                  <Link href="/privacy-policy">Privacy Policy</Link>.
                </span>
              </label>

              <button className="bb-btn" type="submit" disabled={loading}>
                {loading ? "Sending…" : "Send code"}
              </button>
            </form>
          )}

          {step === "verify" && (
            <>
              <form className="bb-form" onSubmit={handleVerify}>
                <div className="bb-field">
                  <label htmlFor="bb-otp">6-digit code</label>
                  <input
                    id="bb-otp"
                    className="bb-otp"
                    type="text"
                    inputMode="numeric"
                    autoComplete="one-time-code"
                    maxLength={6}
                    placeholder="••••••"
                    value={otp}
                    onChange={(e) =>
                      setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))
                    }
                    required
                  />
                  <div className="bb-hint">Codes expire after 15 minutes.</div>
                </div>
                <button
                  className="bb-btn"
                  type="submit"
                  disabled={loading || otp.length < 6}
                >
                  {loading ? "Verifying…" : COPY[mode].verifyBtn}
                </button>
              </form>

              <div className="bb-resend">
                Didn&apos;t get it?{" "}
                <button
                  type="button"
                  className="bb-linkbtn"
                  onClick={handleResend}
                  disabled={resendIn > 0 || loading}
                >
                  {resendIn > 0 ? `Resend code (${resendIn})` : "Resend code"}
                </button>
              </div>
              <button type="button" className="bb-back" onClick={backToEmail}>
                Use a different email
              </button>
            </>
          )}

          {step === "email" && (
            <div className="bb-switch">
              {mode === "signin" ? (
                <>
                  New to BidBridge?{" "}
                  <button type="button" onClick={() => switchMode("register")}>
                    Create an account
                  </button>
                </>
              ) : (
                <>
                  Already have an account?{" "}
                  <button type="button" onClick={() => switchMode("signin")}>
                    Sign in
                  </button>
                </>
              )}
            </div>
          )}

          <div className="bb-trust">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 2 4 5v6c0 5 3.5 8.5 8 11 4.5-2.5 8-6 8-11V5l-8-3Z" />
            </svg>
            Free for bidders · Secure, encrypted access
          </div>
        </div>
      </div>

      <footer className="bb-footer">
        <div>
          <Link href="/support">Help &amp; Support</Link>
          <Link href="/about">About</Link>
          <Link href="/terms-condition">Terms</Link>
          <Link href="/privacy-policy">Privacy</Link>
        </div>
        <div className="bb-disclaimer">
          BidBridge is an independent service and is not a government agency or
          county office.
        </div>
      </footer>
    </div>
  );
};

export default SignInContent;
