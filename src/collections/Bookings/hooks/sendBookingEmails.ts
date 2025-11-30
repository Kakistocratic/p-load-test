import type { CollectionAfterChangeHook } from 'payload'
import type { Booking } from '@/payload-types'
import {
  generateBookingConfirmationEmail,
  generateBookingNotificationEmail,
} from '@/utilities/emails/bookingConfirmation'

/**
 * Hook that sends confirmation emails when a new booking is created
 * - Sends confirmation to the customer
 * - Sends notification to the restaurant staff
 */
export const sendBookingEmails: CollectionAfterChangeHook<Booking> = async ({
  doc,
  operation,
  req: { payload },
}) => {
  // Only send emails for new bookings
  if (operation !== 'create') {
    return doc
  }

  try {
    // Generate customer confirmation email
    const customerEmail = generateBookingConfirmationEmail({
      name: doc.name,
      date: doc.date,
      timeSlot: doc.timeSlot,
      partySize: doc.partySize,
      notes: doc.notes || undefined,
    })

    // Generate staff notification email
    const staffEmail = generateBookingNotificationEmail({
      name: doc.name,
      email: doc.email,
      phone: doc.phone,
      date: doc.date,
      timeSlot: doc.timeSlot,
      partySize: doc.partySize,
      notes: doc.notes || undefined,
    })

    // Get the notification email from environment or use a default
    const staffNotificationEmail =
      process.env.BOOKING_NOTIFICATION_EMAIL || process.env.RESEND_DEFAULT_EMAIL || ''

    // Send both emails in parallel
    await Promise.all([
      // Send confirmation to customer
      payload.sendEmail({
        to: doc.email,
        subject: customerEmail.subject,
        html: customerEmail.html,
        text: customerEmail.text,
      }),
      // Send notification to staff (if configured)
      staffNotificationEmail
        ? payload.sendEmail({
            to: staffNotificationEmail,
            subject: staffEmail.subject,
            html: staffEmail.html,
            text: staffEmail.text,
          })
        : Promise.resolve(),
    ])

    payload.logger.info(`Booking confirmation emails sent for: ${doc.name} (${doc.email})`)
  } catch (error) {
    // Log error but don't fail the booking creation
    payload.logger.error(`Failed to send booking emails: ${error}`)
    // Optionally, you could add a field to track email send status
  }

  return doc
}
