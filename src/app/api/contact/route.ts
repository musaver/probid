// POST /api/contact — public contact form. Emails the submission to the support inbox
// with reply-to set to the sender, so the team can reply directly from their mailbox.

import { NextResponse } from 'next/server';

const INBOX = process.env.CONTACT_INBOX_EMAIL || 'support@bidbridge.com'; // TODO: set CONTACT_INBOX_EMAIL in env

export async function POST(req: Request) {
  let body: { name?: string; email?: string; subject?: string; message?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request.' }, { status: 400 });
  }

  const name = (body.name || '').trim();
  const email = (body.email || '').trim();
  const subject = (body.subject || '').trim();
  const message = (body.message || '').trim();

  if (!name || !email || !message) {
    return NextResponse.json({ error: 'Please fill in your name, email, and message.' }, { status: 400 });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: 'Please enter a valid email address.' }, { status: 400 });
  }
  if (message.length > 5000) {
    return NextResponse.json({ error: 'Message is too long.' }, { status: 400 });
  }

  if (!process.env.BREVO_API_KEY) {
    console.error('Contact form: BREVO_API_KEY not configured');
    return NextResponse.json({ error: 'Email service is not configured. Please email us directly.' }, { status: 500 });
  }

  const text =
    `New contact form submission from BidBridge\n\n` +
    `Name:    ${name}\n` +
    `Email:   ${email}\n` +
    `Subject: ${subject || '(none)'}\n\n` +
    `Message:\n${message}\n`;

  const res = await fetch('https://api.brevo.com/v3/smtp/email', {
    method: 'POST',
    headers: {
      'api-key': process.env.BREVO_API_KEY,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      sender: { name: 'BidBridge Contact Form', email: 'musaver@lmsyl.shop' },
      to: [{ email: INBOX }],
      replyTo: { email, name },
      subject: subject ? `[Contact] ${subject}` : `[Contact] Message from ${name}`,
      textContent: text,
    }),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    console.error('Contact form Brevo error:', err);
    return NextResponse.json({ error: 'Could not send your message. Please try again or email us directly.' }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
