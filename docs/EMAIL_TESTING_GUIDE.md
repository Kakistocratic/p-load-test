# Email Testing Guide for Resend

This guide explains how to test email functionality with Resend before going live with your production domain.

## Overview

The project uses `@payloadcms/email-resend` for transactional emails:
- **Contact Form**: Configured through Payload's Form Builder (admin panel)
- **Booking Confirmations**: Automatic emails sent via hooks when bookings are created

## Testing Strategies

### 1. Development Testing (No Domain Required) ✅ **RECOMMENDED FOR INITIAL TESTING**

Resend allows you to send test emails **without setting up a custom domain**. This is perfect for development.

#### Setup:
1. **Get your Resend API key**:
   - Sign up at [resend.com](https://resend.com)
   - Go to "API Keys" and create a new key
   - Copy the key (starts with `re_`)

2. **Configure your `.env` file**:
   ```env
   RESEND_API_KEY=re_your_actual_api_key_here
   RESEND_DEFAULT_EMAIL=onboarding@resend.dev  # Use Resend's test email
   RESEND_DEFAULT_NAME=Coffee Shop
   BOOKING_NOTIFICATION_EMAIL=your-email@gmail.com  # Your personal email for testing
   ```

3. **Important**: When using `onboarding@resend.dev`, emails can **only** be sent to:
   - Email addresses you've verified in your Resend account
   - Your Resend account email

4. **Verify your test email**:
   - Go to Resend dashboard → Settings → Verified emails
   - Add your personal email address
   - Click the verification link sent to your email

#### Testing:
- Create test bookings - you'll receive emails at your verified address
- Test contact forms through the admin panel
- Check Resend dashboard for delivery logs

**Pros**: No DNS setup, quick to test, safe for development  
**Cons**: Can only send to verified emails (not real customers)

---

### 2. Subdomain Testing (Recommended Before Production) ✅

Use a subdomain on your own domain to test with real email addresses.

#### Why This Is Safe:
- ✅ No impact on your client's domain
- ✅ Easy to switch domains later (just update environment variables)
- ✅ Can send to any email address
- ✅ Test the complete production flow

#### Setup:
1. **Choose a subdomain** on your domain:
   - Example: `coffee-test.yourdomain.com`
   - Or: `staging.yourdomain.com`

2. **Add domain in Resend**:
   - Go to Resend dashboard → Domains → Add Domain
   - Enter your subdomain (e.g., `coffee-test.yourdomain.com`)
   - Resend will provide DNS records

3. **Update DNS records** (on your domain registrar):
   Add the records Resend provides, typically:
   ```
   Type: TXT
   Name: coffee-test
   Value: [Resend verification string]

   Type: MX
   Name: coffee-test
   Value: feedback-smtp.us-east-1.amazonses.com
   Priority: 10

   Type: TXT
   Name: _dmarc.coffee-test
   Value: [DMARC policy]
   ```

4. **Wait for verification** (usually 5-30 minutes)

5. **Update `.env` file**:
   ```env
   RESEND_API_KEY=re_your_actual_api_key_here
   RESEND_DEFAULT_EMAIL=noreply@coffee-test.yourdomain.com
   RESEND_DEFAULT_NAME=Coffee Shop
   BOOKING_NOTIFICATION_EMAIL=your-work-email@company.com
   ```

#### Testing:
- Send emails to real email addresses
- Test spam scoring and deliverability
- Verify email templates render correctly in different clients
- Test the complete user journey

---

### 3. Switching to Production Domain

When you're ready to launch with the client's domain:

#### Setup:
1. **Add client's domain in Resend**:
   - Go to Resend → Domains → Add Domain
   - Enter client's domain (e.g., `clientcoffeeshop.com`)
   - Get DNS records

2. **Update client's DNS** (coordinate with client):
   - Add the DNS records Resend provides
   - Wait for verification

3. **Update environment variables ONLY**:
   ```env
   RESEND_DEFAULT_EMAIL=noreply@clientcoffeeshop.com
   RESEND_DEFAULT_NAME=Client Coffee Shop Name
   BOOKING_NOTIFICATION_EMAIL=bookings@clientcoffeeshop.com
   ```

4. **Redeploy** your application with the new environment variables

**That's it!** No code changes needed, just environment variable updates.

---

## Email Configuration Guide

### For Contact Forms (Form Builder):

1. **Access admin panel**: Navigate to Collections → Forms
2. **Create/Edit a form**
3. **Go to the "Emails" tab**
4. **Configure emails**:
   - **Email To**: Recipient email (e.g., `info@coffeeshop.com`)
   - **Email From**: Leave blank to use default from `.env`
   - **Subject**: `New contact form submission`
   - **Message**: Use template variables like:
     ```
     New message from {{name}}
     
     Email: {{email}}
     Message: {{message}}
     
     All data:
     {{*:table}}
     ```

### For Bookings:

Bookings automatically send two emails when created:
1. **Customer Confirmation**: Beautiful HTML email to the customer
2. **Staff Notification**: Alert to your `BOOKING_NOTIFICATION_EMAIL`

No admin panel configuration needed - it's handled by the code.

---

## Troubleshooting

### Emails not sending:
1. Check Resend dashboard → Logs for errors
2. Verify `RESEND_API_KEY` is correct
3. In development mode, ensure recipient email is verified
4. Check server logs for error messages

### Emails going to spam:
1. Ensure DNS records are properly configured
2. Add DKIM, SPF, and DMARC records (Resend provides these)
3. Use a professional "from" address (not `test@...`)
4. Test email content with [Mail Tester](https://www.mail-tester.com/)

### Domain verification failing:
1. Wait 30 minutes after adding DNS records
2. Use DNS checker tools to verify records are propagated
3. Ensure you added records to the correct domain/subdomain
4. Contact your DNS provider if issues persist

---

## Best Practices

### During Development:
- ✅ Use `onboarding@resend.dev` as sender
- ✅ Only send to verified test emails
- ✅ Use Resend's test mode if available

### During Staging (Subdomain):
- ✅ Test all email scenarios
- ✅ Review emails on multiple devices/clients
- ✅ Check spam scores
- ✅ Verify all links work correctly

### In Production:
- ✅ Use professional sender addresses
- ✅ Monitor Resend dashboard for deliverability
- ✅ Set up webhooks for bounce/complaint notifications
- ✅ Keep DNS records up to date

---

## Current Implementation

### Configured Email Triggers:

1. **Booking Creation** (`src/collections/Bookings/hooks/sendBookingEmails.ts`)
   - Triggers: When a new booking is created
   - Sends to: Customer + Staff notification email
   - Templates: Beautiful HTML emails with booking details

2. **Contact Forms** (via Form Builder Plugin)
   - Triggers: When form is submitted
   - Sends to: Configured per-form in admin panel
   - Templates: Customizable in admin panel

### Environment Variables Required:

```env
# Required
RESEND_API_KEY=re_xxxxx

# Optional (with defaults)
RESEND_DEFAULT_EMAIL=onboarding@resend.dev  # Default sender
RESEND_DEFAULT_NAME=Coffee Shop             # Sender name
BOOKING_NOTIFICATION_EMAIL=admin@...        # Staff notifications
```

---

## Summary: Recommended Testing Flow

1. **Week 1 - Development**: 
   - Use `onboarding@resend.dev`
   - Test with verified emails only
   - Validate email templates and logic

2. **Week 2 - Staging**: 
   - Set up subdomain on your domain
   - Test with real email addresses
   - Review deliverability and spam scores
   - Client can review email content

3. **Week 3 - Pre-Launch**: 
   - Add client's domain to Resend
   - Update DNS records (coordinate with client)
   - Update environment variables
   - Final testing

4. **Launch**: 
   - Monitor Resend dashboard
   - Watch for any delivery issues
   - Be ready to adjust DNS if needed

**Key Takeaway**: You can fully develop and test emails without the client's domain. When switching to production, it's just an environment variable change - no code modifications needed! 🎉
