import type { CollectionAfterChangeHook } from 'payload'
import type { FormSubmission } from '@payloadcms/plugin-form-builder/types'
import {
  generateContactFormConfirmationEmail,
  generateContactFormNotificationEmail,
} from '@/utilities/emails/contactFormSubmission'

/**
 * Hook that sends emails when a contact form is submitted
 * - Sends confirmation to the customer
 * - Sends notification to the admin/staff
 */
export const sendContactFormEmails: CollectionAfterChangeHook = async ({
  doc,
  operation,
  req: { payload },
}) => {
  // Only send emails for new form submissions
  if (operation !== 'create') {
    return doc
  }

  // Type guard to ensure we have a form submission with the expected structure
  const formSubmission = doc as FormSubmission

  try {
    // Extract form data from submission
    const submissionData = formSubmission.submissionData || []

    // Find the field values from the submission data
    const fullNameField = submissionData.find((field) => field.field === 'full-name')
    const emailField = submissionData.find((field) => field.field === 'email')
    const phoneField = submissionData.find((field) => field.field === 'phone')
    const messageField = submissionData.find((field) => field.field === 'message')

    // Extract values
    const fullName = fullNameField?.value as string
    const email = emailField?.value as string
    const phone = phoneField?.value as string | undefined
    const message = messageField?.value as string

    // Validate required fields
    if (!fullName || !email || !message) {
      payload.logger.warn('Contact form submission missing required fields')
      return doc
    }

    // Generate customer confirmation email
    const customerEmail = await generateContactFormConfirmationEmail({
      fullName,
      message,
    })

    // Generate admin notification email
    const adminEmail = await generateContactFormNotificationEmail({
      fullName,
      email,
      phone,
      message,
    })

    // Get the admin notification email from environment or use a default
    const adminNotificationEmail =
      process.env.CONTACT_FORM_NOTIFICATION_EMAIL || process.env.RESEND_DEFAULT_EMAIL || ''

    // Send both emails in parallel
    await Promise.all([
      // Send confirmation to customer
      payload.sendEmail({
        to: email,
        subject: customerEmail.subject,
        html: customerEmail.html,
        text: customerEmail.text,
      }),
      // Send notification to admin (if configured)
      adminNotificationEmail
        ? payload.sendEmail({
            to: adminNotificationEmail,
            subject: adminEmail.subject,
            html: adminEmail.html,
            text: adminEmail.text,
          })
        : Promise.resolve(),
    ])

    payload.logger.info(`Contact form emails sent for: ${fullName} (${email})`)
  } catch (error) {
    // Log error but don't fail the form submission
    payload.logger.error(`Failed to send contact form emails: ${error}`)
  }

  return doc
}
