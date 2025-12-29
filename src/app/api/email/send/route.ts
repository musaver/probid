import { NextResponse } from 'next/server';
import { randomInt } from 'crypto';
import { db } from '@/lib/db';
import { eq } from 'drizzle-orm';
import bcrypt from 'bcrypt';
import { sendOTPEmail } from '@/lib/email';
import { verification_tokens } from '@/lib/schema';

export async function POST(req: Request) {
  const { to, subject } = await req.json();

  // Generate a 6-digit OTP code
  const otp = randomInt(100000, 999999).toString();
  // Generate a random token (for magic link)
  const token = (Math.random() + 1).toString(36).substring(2);

  // Hash both for storage
  const hashedOtp = await bcrypt.hash(otp, 10);
  const hashedToken = await bcrypt.hash(token, 10);

  // Expiration time (15 minutes from now)
  const expiresAt = new Date(Date.now() + 15 * 60 * 1000);
  const email = to;
  const verificationLink = `${process.env.NEXTAUTH_URL}/verify-otp?email=${encodeURIComponent(email)}&token=${encodeURIComponent(token)}`;

  // Upsert: replace any existing token for this email
  await db.delete(verification_tokens).where(eq(verification_tokens.identifier, email));
  await db.insert(verification_tokens).values({ identifier: email, token: hashedToken, otp: hashedOtp, expires: expiresAt });

  if (!to) {
    return NextResponse.json({ error: 'Email is required' }, { status: 400 });
  }

  try {
    // Use template email function instead of plain text
    await sendOTPEmail(to, otp, verificationLink);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Failed to send OTP email:', error);
    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
  }
}
