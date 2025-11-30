/**
 * Generate HTML email for booking confirmation
 * This is sent to customers when they create a booking
 */
export const generateBookingConfirmationEmail = ({
  name,
  date,
  timeSlot,
  partySize,
  notes,
}: {
  name: string
  date: string
  timeSlot: string
  partySize: number
  notes?: string
}) => {
  const formattedDate = new Date(date).toLocaleDateString('nb-NO', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  return {
    subject: `Bordreservasjon bekreftet - ${formattedDate}`,
    html: `
<!DOCTYPE html>
<html lang="no">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Bordreservasjon Bekreftet</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f5f5f5;">
  <table role="presentation" style="width: 100%; border-collapse: collapse;">
    <tr>
      <td align="center" style="padding: 40px 0;">
        <table role="presentation" style="width: 600px; max-width: 100%; background-color: #ffffff; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
          
          <!-- Header -->
          <tr>
            <td style="padding: 40px 40px 20px; text-align: center; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 8px 8px 0 0;">
              <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: 600;">✓ Bordreservasjon Bekreftet</h1>
            </td>
          </tr>
          
          <!-- Content -->
          <tr>
            <td style="padding: 40px;">
              <p style="margin: 0 0 20px; font-size: 16px; line-height: 1.6; color: #333333;">
                Hei ${name},
              </p>
              
              <p style="margin: 0 0 30px; font-size: 16px; line-height: 1.6; color: #333333;">
                Takk for din bordreservasjon! Vi ser frem til å ta imot deg.
              </p>
              
              <!-- Booking Details Box -->
              <table role="presentation" style="width: 100%; background-color: #f8f9fa; border-radius: 6px; padding: 20px; border: 2px solid #e9ecef; margin-bottom: 30px;">
                <tr>
                  <td style="padding: 10px 0;">
                    <strong style="color: #495057; font-size: 14px; text-transform: uppercase; letter-spacing: 0.5px;">Reservasjonsdetaljer</strong>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 15px 0; border-top: 1px solid #dee2e6;">
                    <table role="presentation" style="width: 100%;">
                      <tr>
                        <td style="padding: 8px 0; color: #6c757d; font-size: 14px;">📅 Dato:</td>
                        <td style="padding: 8px 0; text-align: right; color: #212529; font-weight: 600; font-size: 14px;">${formattedDate}</td>
                      </tr>
                      <tr>
                        <td style="padding: 8px 0; color: #6c757d; font-size: 14px;">🕐 Tid:</td>
                        <td style="padding: 8px 0; text-align: right; color: #212529; font-weight: 600; font-size: 14px;">${timeSlot}</td>
                      </tr>
                      <tr>
                        <td style="padding: 8px 0; color: #6c757d; font-size: 14px;">👥 Antall personer:</td>
                        <td style="padding: 8px 0; text-align: right; color: #212529; font-weight: 600; font-size: 14px;">${partySize}</td>
                      </tr>
                      ${notes ? `
                      <tr>
                        <td colspan="2" style="padding: 15px 0 8px; color: #6c757d; font-size: 14px; border-top: 1px solid #dee2e6;">💬 Dine notater:</td>
                      </tr>
                      <tr>
                        <td colspan="2" style="padding: 0 0 8px; color: #212529; font-size: 14px; font-style: italic;">${notes}</td>
                      </tr>
                      ` : ''}
                    </table>
                  </td>
                </tr>
              </table>
              
              <p style="margin: 0 0 20px; font-size: 16px; line-height: 1.6; color: #333333;">
                Dersom du trenger å endre eller kansellere reservasjonen, vennligst kontakt oss så snart som mulig.
              </p>
              
              <p style="margin: 0; font-size: 16px; line-height: 1.6; color: #333333;">
                Hilsen,<br>
                <strong>Coffee Shop Teamet</strong>
              </p>
            </td>
          </tr>
          
          <!-- Footer -->
          <tr>
            <td style="padding: 30px 40px; background-color: #f8f9fa; border-radius: 0 0 8px 8px; text-align: center; border-top: 1px solid #e9ecef;">
              <p style="margin: 0 0 10px; font-size: 14px; color: #6c757d;">
                Denne e-posten ble sendt automatisk. Ikke svar på denne e-posten.
              </p>
              <p style="margin: 0; font-size: 14px; color: #6c757d;">
                &copy; ${new Date().getFullYear()} Coffee Shop. Alle rettigheter reservert.
              </p>
            </td>
          </tr>
          
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
    `,
    text: `
Bordreservasjon Bekreftet

Hei ${name},

Takk for din bordreservasjon! Vi ser frem til å ta imot deg.

RESERVASJONSDETALJER:
- Dato: ${formattedDate}
- Tid: ${timeSlot}
- Antall personer: ${partySize}
${notes ? `- Dine notater: ${notes}` : ''}

Dersom du trenger å endre eller kansellere reservasjonen, vennligst kontakt oss så snart som mulig.

Hilsen,
Coffee Shop Teamet
    `.trim(),
  }
}

/**
 * Generate HTML email for internal booking notification
 * This is sent to the restaurant staff when a new booking is created
 */
export const generateBookingNotificationEmail = ({
  name,
  email,
  phone,
  date,
  timeSlot,
  partySize,
  notes,
}: {
  name: string
  email: string
  phone: string
  date: string
  timeSlot: string
  partySize: number
  notes?: string
}) => {
  const formattedDate = new Date(date).toLocaleDateString('nb-NO', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  return {
    subject: `Ny bordreservasjon: ${name} - ${formattedDate} kl. ${timeSlot}`,
    html: `
<!DOCTYPE html>
<html lang="no">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Ny Bordreservasjon</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f5f5f5;">
  <table role="presentation" style="width: 100%; border-collapse: collapse;">
    <tr>
      <td align="center" style="padding: 40px 0;">
        <table role="presentation" style="width: 600px; max-width: 100%; background-color: #ffffff; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
          
          <!-- Header -->
          <tr>
            <td style="padding: 40px 40px 20px; text-align: center; background-color: #ff6b6b; border-radius: 8px 8px 0 0;">
              <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: 600;">🔔 Ny Bordreservasjon</h1>
            </td>
          </tr>
          
          <!-- Content -->
          <tr>
            <td style="padding: 40px;">
              <p style="margin: 0 0 30px; font-size: 16px; line-height: 1.6; color: #333333;">
                En ny bordreservasjon er registrert i systemet:
              </p>
              
              <!-- Customer Details -->
              <table role="presentation" style="width: 100%; background-color: #f8f9fa; border-radius: 6px; padding: 20px; border: 2px solid #e9ecef; margin-bottom: 20px;">
                <tr>
                  <td style="padding: 10px 0;">
                    <strong style="color: #495057; font-size: 14px; text-transform: uppercase; letter-spacing: 0.5px;">Kundeinformasjon</strong>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 15px 0; border-top: 1px solid #dee2e6;">
                    <table role="presentation" style="width: 100%;">
                      <tr>
                        <td style="padding: 8px 0; color: #6c757d; font-size: 14px;">👤 Navn:</td>
                        <td style="padding: 8px 0; text-align: right; color: #212529; font-weight: 600; font-size: 14px;">${name}</td>
                      </tr>
                      <tr>
                        <td style="padding: 8px 0; color: #6c757d; font-size: 14px;">📧 E-post:</td>
                        <td style="padding: 8px 0; text-align: right; color: #212529; font-weight: 600; font-size: 14px;"><a href="mailto:${email}" style="color: #667eea; text-decoration: none;">${email}</a></td>
                      </tr>
                      <tr>
                        <td style="padding: 8px 0; color: #6c757d; font-size: 14px;">📱 Telefon:</td>
                        <td style="padding: 8px 0; text-align: right; color: #212529; font-weight: 600; font-size: 14px;"><a href="tel:${phone}" style="color: #667eea; text-decoration: none;">${phone}</a></td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
              
              <!-- Booking Details -->
              <table role="presentation" style="width: 100%; background-color: #fff3cd; border-radius: 6px; padding: 20px; border: 2px solid #ffc107; margin-bottom: 30px;">
                <tr>
                  <td style="padding: 10px 0;">
                    <strong style="color: #856404; font-size: 14px; text-transform: uppercase; letter-spacing: 0.5px;">Reservasjonsdetaljer</strong>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 15px 0; border-top: 1px solid #ffe69c;">
                    <table role="presentation" style="width: 100%;">
                      <tr>
                        <td style="padding: 8px 0; color: #856404; font-size: 14px;">📅 Dato:</td>
                        <td style="padding: 8px 0; text-align: right; color: #212529; font-weight: 600; font-size: 14px;">${formattedDate}</td>
                      </tr>
                      <tr>
                        <td style="padding: 8px 0; color: #856404; font-size: 14px;">🕐 Tid:</td>
                        <td style="padding: 8px 0; text-align: right; color: #212529; font-weight: 600; font-size: 14px;">${timeSlot}</td>
                      </tr>
                      <tr>
                        <td style="padding: 8px 0; color: #856404; font-size: 14px;">👥 Antall personer:</td>
                        <td style="padding: 8px 0; text-align: right; color: #212529; font-weight: 600; font-size: 14px;">${partySize}</td>
                      </tr>
                      ${notes ? `
                      <tr>
                        <td colspan="2" style="padding: 15px 0 8px; color: #856404; font-size: 14px; border-top: 1px solid #ffe69c;">💬 Spesielle ønsker:</td>
                      </tr>
                      <tr>
                        <td colspan="2" style="padding: 0 0 8px; color: #212529; font-size: 14px; background-color: #ffffff; padding: 10px; border-radius: 4px; font-style: italic;">${notes}</td>
                      </tr>
                      ` : ''}
                    </table>
                  </td>
                </tr>
              </table>
              
              <p style="margin: 0; font-size: 14px; line-height: 1.6; color: #6c757d; padding: 15px; background-color: #e7f3ff; border-left: 4px solid #0066cc; border-radius: 4px;">
                <strong style="color: #0066cc;">💡 Påminnelse:</strong> Logg inn i admin-panelet for å bekrefte eller administrere denne reservasjonen.
              </p>
            </td>
          </tr>
          
          <!-- Footer -->
          <tr>
            <td style="padding: 30px 40px; background-color: #f8f9fa; border-radius: 0 0 8px 8px; text-align: center; border-top: 1px solid #e9ecef;">
              <p style="margin: 0; font-size: 14px; color: #6c757d;">
                Automatisk varsling fra reservasjonssystemet
              </p>
            </td>
          </tr>
          
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
    `,
    text: `
NY BORDRESERVASJON

KUNDEINFORMASJON:
- Navn: ${name}
- E-post: ${email}
- Telefon: ${phone}

RESERVASJONSDETALJER:
- Dato: ${formattedDate}
- Tid: ${timeSlot}
- Antall personer: ${partySize}
${notes ? `- Spesielle ønsker: ${notes}` : ''}

Logg inn i admin-panelet for å bekrefte eller administrere denne reservasjonen.
    `.trim(),
  }
}
