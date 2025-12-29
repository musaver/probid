# Brevo Email Template Setup Guide

## Step 1: Create Email Template in Brevo Dashboard

1. **Login to Brevo** (formerly Sendinblue)
   - Go to https://app.brevo.com/

2. **Navigate to Templates**
   - Click on "Campaigns" in the left sidebar
   - Select "Templates" 
   - Click "Create a new template"

3. **Choose Template Type**
   - Select "Email template"
   - Choose "Drag & Drop Editor" or "Rich Text Editor"

4. **Design Your OTP Email Template**

### Recommended Template Structure:

```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Verification Code</title>
</head>
<body style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px;">
    <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; padding: 40px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
        
        <!-- Logo/Header -->
        <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #333333; margin: 0;">Probid</h1>
        </div>

        <!-- Main Content -->
        <div style="margin-bottom: 30px;">
            <h2 style="color: #333333; margin-bottom: 20px;">Verify Your Email Address</h2>
            <p style="color: #666666; line-height: 1.6; margin-bottom: 20px;">
                Thank you for registering! Please use the verification code below to complete your registration:
            </p>
        </div>

        <!-- OTP Code Box -->
        <div style="background-color: #f8f9fa; border: 2px dashed #6ea500; border-radius: 8px; padding: 20px; text-align: center; margin-bottom: 30px;">
            <p style="color: #666666; margin: 0 0 10px 0; font-size: 14px;">Your Verification Code:</p>
            <h1 style="color: #6ea500; margin: 0; font-size: 36px; letter-spacing: 8px; font-weight: bold;">
                {{ params.OTP }}
            </h1>
        </div>

        <!-- Alternative Link -->
        <div style="margin-bottom: 30px;">
            <p style="color: #666666; line-height: 1.6; margin-bottom: 15px;">
                Or click the button below to verify automatically:
            </p>
            <div style="text-align: center;">
                <a href="{{ params.VERIFICATION_LINK }}" 
                   style="display: inline-block; background-color: #6ea500; color: #ffffff; padding: 14px 32px; text-decoration: none; border-radius: 6px; font-weight: bold; font-size: 16px;">
                    Verify Email
                </a>
            </div>
        </div>

        <!-- Expiration Notice -->
        <div style="background-color: #fff3cd; border-left: 4px solid #ffc107; padding: 15px; margin-bottom: 30px;">
            <p style="color: #856404; margin: 0; font-size: 14px;">
                ⏰ This code will expire in 15 minutes for security reasons.
            </p>
        </div>

        <!-- Footer -->
        <div style="border-top: 1px solid #eeeeee; padding-top: 20px; margin-top: 30px;">
            <p style="color: #999999; font-size: 12px; line-height: 1.6; margin: 0;">
                If you didn't request this verification code, please ignore this email or contact our support team.
            </p>
            <p style="color: #999999; font-size: 12px; margin: 10px 0 0 0;">
                © 2024 Probid. All rights reserved.
            </p>
        </div>
    </div>
</body>
</html>
```

### Template Variables to Use:

In your template, use these Brevo variables:
- `{{ params.OTP }}` - The 6-digit verification code
- `{{ params.VERIFICATION_LINK }}` - The magic link for one-click verification
- `{{ params.EMAIL }}` - The user's email address (optional)

## Step 2: Get Template ID

1. After saving your template, Brevo will assign it an ID
2. You can find the template ID in the URL or template list
3. It will be a number like `1`, `2`, `3`, etc.

## Step 3: Add Template ID to Environment Variables

Add this to your `.env.local` file:

```bash
BREVO_OTP_TEMPLATE_ID=1
```

Replace `1` with your actual template ID from Brevo.

## Step 4: Test Your Template

1. Make sure your `.env.local` has:
   ```bash
   BREVO_API_KEY=your_api_key_here
   BREVO_OTP_TEMPLATE_ID=1
   NEXTAUTH_URL=http://localhost:3000
   ```

2. Restart your development server:
   ```bash
   npm run dev
   ```

3. Try registering with a new email address
4. Check your inbox for the beautifully formatted OTP email!

## Template Customization Tips

### Colors
- Primary: `#6ea500` (green - matches your brand)
- Text: `#333333` (dark gray)
- Muted: `#666666` (medium gray)
- Background: `#f4f4f4` (light gray)

### Responsive Design
The template uses inline styles and max-width to ensure it looks good on mobile devices.

### Branding
- Add your logo image URL in the header
- Customize colors to match your brand
- Add social media links in the footer

## Advanced: Multiple Templates

You can create different templates for different purposes:

```typescript
// In email.ts
export async function sendWelcomeEmail(to: string, name?: string) {
  const templateId = process.env.BREVO_WELCOME_TEMPLATE_ID;
  if (templateId) {
    return sendTemplateEmail(to, parseInt(templateId), {
      NAME: name || 'User',
    });
  }
  // Fallback...
}
```

## Troubleshooting

### Template Not Working?
1. Check that `BREVO_OTP_TEMPLATE_ID` is set in `.env.local`
2. Verify the template ID is correct in Brevo dashboard
3. Make sure template is "Active" in Brevo
4. Check server logs for any API errors

### Variables Not Showing?
1. Use `{{ params.VARIABLE_NAME }}` syntax in Brevo editor
2. Make sure variable names match exactly (case-sensitive)
3. Test with Brevo's "Send test email" feature first

### Styling Issues?
1. Use inline styles (not CSS classes)
2. Test in Brevo's preview before using in production
3. Use table-based layouts for better email client compatibility

## Resources

- [Brevo Template Documentation](https://developers.brevo.com/docs/send-a-transactional-email)
- [Email Template Best Practices](https://www.brevo.com/blog/email-template-best-practices/)
- [HTML Email Guide](https://www.campaignmonitor.com/css/)

