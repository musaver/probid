export async function sendTextEmail(to: string, subject: string, text: string) {
  const res = await fetch('https://api.brevo.com/v3/smtp/email', {
    method: 'POST',
    headers: {
      'api-key': process.env.BREVO_API_KEY!,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      sender: { name: 'Musaver', email: 'musaver@lmsyl.shop' },
      to: [{ email: to }],
      subject,
      textContent: text,
    }),
  });

  if (!res.ok) {
    const error = await res.json();
    console.error('Brevo Error:', error);
    throw new Error(error.message || 'Failed to send email');
  }

  return await res.json();
}

// Send email using Brevo template
export async function sendTemplateEmail(
  to: string,
  templateId: number,
  params: Record<string, any>
) {
  const res = await fetch('https://api.brevo.com/v3/smtp/email', {
    method: 'POST',
    headers: {
      'api-key': process.env.BREVO_API_KEY!,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      sender: { name: 'Musaver', email: 'musaver@lmsyl.shop' },
      to: [{ email: to }],
      templateId,
      params,
    }),
  });

  if (!res.ok) {
    const error = await res.json();
    console.error('Brevo Template Error:', error);
    throw new Error(error.message || 'Failed to send template email');
  }

  return await res.json();
}

// Send OTP email using template
export async function sendOTPEmail(
  to: string,
  otp: string,
  verificationLink: string
) {
  // You'll need to create a template in Brevo dashboard and get its ID
  // For now, using a fallback to text email if template ID is not set
  const templateId = process.env.BREVO_OTP_TEMPLATE_ID;

  if (templateId) {
    return sendTemplateEmail(to, parseInt(templateId), {
      OTP: otp,
      VERIFICATION_LINK: verificationLink,
      EMAIL: to,
    });
  } else {
    // Fallback to text email
    const message = `Your OTP is: ${otp}\nYour verification link is: ${verificationLink}`;
    return sendTextEmail(to, 'Your Verification Code', message);
  }
}

export async function sendWelcomeEmail(to: string, name?: string) {
  const res = await fetch('https://api.brevo.com/v3/smtp/email', {
    method: 'POST',
    headers: {
      'api-key': process.env.BREVO_API_KEY!,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      sender: { name: 'Musaver', email: 'musaver@lmsyl.shop' },
      to: [{ email: to }],
      subject: 'Welcome to the Platform!',
      textContent: `Hello${name ? ` ${name}` : ''}, thanks for signing up!`,
    }),
  });

  if (!res.ok) {
    const error = await res.json();
    console.error('Failed to send email via Brevo:', error);
    throw new Error(error.message || 'Brevo email failed');
  }

  return await res.json();
}
