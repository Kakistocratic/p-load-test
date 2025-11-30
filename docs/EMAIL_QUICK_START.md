# Quick Start: Email Testing with Resend

## Immediate Next Steps

### 1. Get Your Resend API Key (5 minutes)
1. Go to [resend.com](https://resend.com) and sign up
2. Navigate to **API Keys** in the dashboard
3. Click **Create API Key**
4. Copy the key (starts with `re_`)

### 2. Add to Your `.env` File
Create or update your `.env` file with:

```env
# Copy from your .env.example and add:
RESEND_API_KEY=re_paste_your_key_here
RESEND_DEFAULT_EMAIL=onboarding@resend.dev
RESEND_DEFAULT_NAME=Coffee Shop
BOOKING_NOTIFICATION_EMAIL=your.email@gmail.com
```

### 3. Verify Your Test Email in Resend
1. In Resend dashboard → **Settings** → **Verified Emails**
2. Click **Add Email**
3. Enter your personal email (e.g., `your.email@gmail.com`)
4. Check your inbox and click the verification link

### 4. Test It!

Start your dev server:
```bash
pnpm dev
```

Then test:
- ✅ **Create a booking** through your frontend → You'll receive confirmation email
- ✅ **Submit a contact form** (configure in admin panel first)

## What's Been Configured

✅ **Payload Email Adapter**: Configured in `payload.config.ts`  
✅ **Booking Emails**: Automatic confirmation + staff notification  
✅ **Contact Forms**: Ready to configure in admin panel  
✅ **Beautiful HTML Templates**: Professional Norwegian email templates  

## Important Notes

### Development Mode Restrictions:
- 📧 Can **only** send to verified email addresses
- 📧 Use `onboarding@resend.dev` as sender
- 📧 Perfect for testing - no DNS setup needed!

### For Contact Forms:
1. Go to admin panel → **Collections** → **Forms**
2. Create a form or edit existing
3. Click the **Emails** tab
4. Configure:
   - **Email To**: Where form submissions go
   - **Email From**: (leave blank to use default)
   - **Subject**: Email subject line
   - **Message**: Use `{{fieldName}}` for form fields

Example message template:
```
New contact from {{name}}

Email: {{email}}
Phone: {{phone}}
Message: {{message}}

All form data:
{{*:table}}
```

## When You're Ready for Real Testing

Use your own subdomain (completely safe):
1. Choose subdomain: `test.yourdomain.com`
2. Add domain in Resend
3. Update DNS records (provided by Resend)
4. Update `.env`:
   ```env
   RESEND_DEFAULT_EMAIL=noreply@test.yourdomain.com
   ```
5. Now you can send to **any** email address!

**Switching to production later?** Just update the environment variables - no code changes needed!

## Troubleshooting

**Emails not sending?**
- Check Resend dashboard → **Logs** for errors
- Verify API key is correct in `.env`
- Ensure test email is verified in Resend
- Check server console for errors

**Need help?**
See the complete guide: `docs/EMAIL_TESTING_GUIDE.md`

## Files Modified

- ✅ `src/payload.config.ts` - Email adapter configured
- ✅ `src/collections/Bookings.ts` - Email hooks added
- ✅ `src/utilities/emails/bookingConfirmation.ts` - Email templates
- ✅ `src/collections/Bookings/hooks/sendBookingEmails.ts` - Email logic
- ✅ `.env.example` - Updated with email variables

---

**You're all set!** 🎉 Get your Resend API key and start testing.
