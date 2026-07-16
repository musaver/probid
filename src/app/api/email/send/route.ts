import { NextResponse } from 'next/server';
import { randomInt } from 'crypto';
import { db } from '@/lib/db';
import { eq } from 'drizzle-orm';
import bcrypt from 'bcrypt';
import { sendOTPEmail } from '@/lib/email';
import { verification_tokens } from '@/lib/schema';
import { rateLimit } from '@/lib/rate-limit';

// Pre-auth endpoint: sends the sign-in / registration OTP, so it cannot require a
// logged-in session. Instead it is rate-limited (per email + per client IP) and
// validates input BEFORE writing anything, to prevent spam and sender-reputation abuse.
export async function POST(req: Request) {
  const { to } = await req.json();

  // 1. Validate before doing any work / DB writes.
  if (!to || typeof to !== 'string' || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(to)) {
    return NextResponse.json({ error: 'A valid email is required' }, { status: 400 });
  }
  const email = to.toLowerCase();

  // 2. Rate limit: cap OTP sends per address and per client IP.
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';
  const perEmail = rateLimit(`otp:email:${email}`, 3, 15 * 60 * 1000); // 3 / 15 min per address
  const perIp = rateLimit(`otp:ip:${ip}`, 10, 15 * 60 * 1000);         // 10 / 15 min per IP
  if (!perEmail.ok || !perIp.ok) {
    const retryAfter = Math.max(perEmail.retryAfter, perIp.retryAfter);
    return NextResponse.json(
      { error: 'Too many requests. Please try again later.' },
      { status: 429, headers: { 'Retry-After': String(retryAfter) } }
    );
  }

  // 3. Generate + store the OTP / magic-link token.
  const otp = randomInt(100000, 999999).toString();
  const token = (Math.random() + 1).toString(36).substring(2);
  const hashedOtp = await bcrypt.hash(otp, 10);
  const hashedToken = await bcrypt.hash(token, 10);
  const expiresAt = new Date(Date.now() + 15 * 60 * 1000); // 15 minutes
  const verificationLink = `${process.env.NEXTAUTH_URL}/verify-otp?email=${encodeURIComponent(email)}&token=${encodeURIComponent(token)}`;

  // Upsert: replace any existing token for this email
  await db.delete(verification_tokens).where(eq(verification_tokens.identifier, email));
  await db.insert(verification_tokens).values({ identifier: email, token: hashedToken, otp: hashedOtp, expires: expiresAt });

  // 4. Send.
  try {
    await sendOTPEmail(email, otp, verificationLink);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Failed to send OTP email:', error);
    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
  }
}
