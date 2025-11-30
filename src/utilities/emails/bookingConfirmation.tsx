import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Preview,
  Section,
  Text,
  Row,
  Column,
} from '@react-email/components'
import { render } from '@react-email/render'

/**
 * React Email component for booking confirmation
 * This is sent to customers when they create a booking
 */
const BookingConfirmationEmail = ({
  name,
  formattedDate,
  timeSlot,
  partySize,
  notes,
}: {
  name: string
  formattedDate: string
  timeSlot: string
  partySize: number
  notes?: string
}) => (
  <Html lang="no">
    <Head />
    <Preview>Din bordreservasjon er bekreftet - {formattedDate}</Preview>
    <Body
      style={{
        margin: 0,
        padding: 0,
        fontFamily:
          '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
        backgroundColor: '#f5f5f5',
      }}
    >
      <Container
        style={{
          margin: '40px auto',
          maxWidth: '600px',
          borderRadius: '8px',
          backgroundColor: '#ffffff',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        }}
      >
        {/* Header */}
        <Section
          style={{
            borderRadius: '8px 8px 0 0',
            backgroundColor: '#f7e7cf',
            padding: '32px 40px',
            textAlign: 'center',
          }}
        >
          <Img
            src={`${process.env.NEXT_PUBLIC_SERVER_URL}/EmailLogo.png`}
            alt="Coffee Shop Logo"
            width="280"
            height="195"
            style={{ margin: '0 auto 16px', display: 'block' }}
          />
          <Heading style={{ margin: '8px 0', color: '#1b2d1b', fontSize: '28px', fontWeight: 600 }}>
            ✓ Bordreservasjon Bekreftet
          </Heading>
        </Section>

        {/* Content */}
        <table role="presentation" style={{ width: '100%', borderCollapse: 'collapse' }}>
          <tr>
            <td style={{ padding: '32px 40px' }}>
              <Text
                style={{
                  margin: '0 0 20px',
                  fontSize: '16px',
                  lineHeight: '1.6',
                  color: '#1b2d1b',
                }}
              >
                Hei {name},
              </Text>

              <Text
                style={{
                  margin: '0 0 32px',
                  fontSize: '16px',
                  lineHeight: '1.6',
                  color: '#1b2d1b',
                }}
              >
                Takk for din bordreservasjon! Vi ser frem til å ta imot deg.
              </Text>

              {/* Booking Details Box */}
              <table
                role="presentation"
                style={{
                  width: '100%',
                  margin: '0 0 32px',
                  borderRadius: '6px',
                  border: '2px solid #e5e7eb',
                  backgroundColor: '#f9fafb',
                  borderCollapse: 'separate',
                }}
              >
                <tr>
                  <td style={{ padding: '20px' }}>
                    <Text
                      style={{
                        margin: '0 0 16px',
                        fontSize: '14px',
                        fontWeight: 600,
                        textTransform: 'uppercase',
                        letterSpacing: '0.5px',
                        color: '#1b2d1b',
                      }}
                    >
                      Reservasjonsdetaljer
                    </Text>
                    <Hr
                      style={{ margin: '16px 0', border: 'none', borderTop: '1px solid #d1d5db' }}
                    />

                    <Row style={{ padding: '8px 12px' }}>
                      <Column style={{ fontSize: '14px', color: '#6b7280' }}>📅 Dato:</Column>
                      <Column
                        style={{
                          textAlign: 'right',
                          fontSize: '14px',
                          fontWeight: 600,
                          color: '#1b2d1b',
                        }}
                      >
                        {formattedDate}
                      </Column>
                    </Row>

                    <Row style={{ padding: '8px 12px' }}>
                      <Column style={{ fontSize: '14px', color: '#6b7280' }}>🕐 Tid:</Column>
                      <Column
                        style={{
                          textAlign: 'right',
                          fontSize: '14px',
                          fontWeight: 600,
                          color: '#1b2d1b',
                        }}
                      >
                        {timeSlot}
                      </Column>
                    </Row>

                    <Row style={{ padding: '8px 12px' }}>
                      <Column style={{ fontSize: '14px', color: '#6b7280' }}>
                        👥 Antall personer:
                      </Column>
                      <Column
                        style={{
                          textAlign: 'right',
                          fontSize: '14px',
                          fontWeight: 600,
                          color: '#1b2d1b',
                        }}
                      >
                        {partySize}
                      </Column>
                    </Row>

                    {notes && (
                      <>
                        <Hr
                          style={{
                            margin: '16px 0',
                            border: 'none',
                            borderTop: '1px solid #d1d5db',
                          }}
                        />
                        <Text style={{ margin: '0 0 8px', fontSize: '14px', color: '#6b7280' }}>
                          💬 Dine notater:
                        </Text>
                        <Text
                          style={{
                            margin: 0,
                            fontSize: '14px',
                            fontStyle: 'italic',
                            color: '#1b2d1b',
                          }}
                        >
                          {notes}
                        </Text>
                      </>
                    )}
                  </td>
                </tr>
              </table>

              <Text
                style={{
                  margin: '0 0 20px',
                  fontSize: '16px',
                  lineHeight: '1.6',
                  color: '#1b2d1b',
                }}
              >
                Dersom du trenger å endre eller kansellere reservasjonen, vennligst kontakt oss så
                snart som mulig.
              </Text>

              <Text style={{ margin: 0, fontSize: '16px', lineHeight: '1.6', color: '#1b2d1b' }}>
                Hilsen,
                <br />
                <strong>Coffee Shop Teamet</strong>
              </Text>
            </td>
          </tr>
        </table>

        {/* Footer */}
        <Section
          style={{
            borderRadius: '0 0 8px 8px',
            borderTop: '1px solid #e5e7eb',
            backgroundColor: '#f9fafb',
            padding: '32px 40px',
            textAlign: 'center',
          }}
        >
          <Text style={{ margin: '0 0 12px', fontSize: '14px', color: '#6b7280' }}>
            Denne e-posten ble sendt automatisk. Ikke svar på denne e-posten.
          </Text>
          <Text style={{ margin: 0, fontSize: '14px', color: '#6b7280' }}>
            &copy; {new Date().getFullYear()} Coffee Shop. Alle rettigheter reservert.
          </Text>
        </Section>
      </Container>
    </Body>
  </Html>
)

/**
 * React Email component for staff booking notification
 * This is sent to restaurant staff when a new booking is created
 */
const BookingNotificationEmail = ({
  name,
  email,
  phone,
  formattedDate,
  timeSlot,
  partySize,
  notes,
}: {
  name: string
  email: string
  phone: string
  formattedDate: string
  timeSlot: string
  partySize: number
  notes?: string
}) => (
  <Html lang="no">
    <Head />
    <Preview>
      Ny bordreservasjon: {name} - {formattedDate} kl. {timeSlot}
    </Preview>
    <Body
      style={{
        margin: 0,
        padding: 0,
        fontFamily:
          '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
        backgroundColor: '#f5f5f5',
      }}
    >
      <Container
        style={{
          margin: '40px auto',
          maxWidth: '600px',
          borderRadius: '8px',
          backgroundColor: '#ffffff',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        }}
      >
        {/* Header */}
        <Section
          style={{
            borderRadius: '8px 8px 0 0',
            backgroundColor: '#ef4444',
            padding: '32px 40px',
            textAlign: 'center',
          }}
        >
          <Img
            src={`${process.env.NEXT_PUBLIC_SERVER_URL}/EmailLogo.png`}
            alt="Coffee Shop Logo"
            width="120"
            height="120"
            style={{ margin: '0 auto 16px', display: 'block' }}
          />
          <Heading style={{ margin: 0, color: '#ffffff', fontSize: '28px', fontWeight: 600 }}>
            🔔 Ny Bordreservasjon
          </Heading>
        </Section>

        {/* Content */}
        <table role="presentation" style={{ width: '100%', borderCollapse: 'collapse' }}>
          <tr>
            <td style={{ padding: '32px 40px' }}>
              <Text
                style={{
                  margin: '0 0 32px',
                  fontSize: '16px',
                  lineHeight: '1.6',
                  color: '#1f2937',
                }}
              >
                En ny bordreservasjon er registrert i systemet:
              </Text>

              {/* Customer Details */}
              <table
                role="presentation"
                style={{
                  width: '100%',
                  margin: '0 0 20px',
                  borderRadius: '6px',
                  border: '2px solid #e5e7eb',
                  backgroundColor: '#f9fafb',
                  borderCollapse: 'separate',
                }}
              >
                <tr>
                  <td style={{ padding: '20px' }}>
                    <Text
                      style={{
                        margin: '0 0 16px',
                        fontSize: '14px',
                        fontWeight: 600,
                        textTransform: 'uppercase',
                        letterSpacing: '0.5px',
                        color: '#6b7280',
                      }}
                    >
                      Kundeinformasjon
                    </Text>
                    <Hr
                      style={{ margin: '16px 0', border: 'none', borderTop: '1px solid #d1d5db' }}
                    />

                    <Row style={{ padding: '8px 12px' }}>
                      <Column style={{ fontSize: '14px', color: '#6b7280' }}>👤 Navn:</Column>
                      <Column
                        style={{
                          textAlign: 'right',
                          fontSize: '14px',
                          fontWeight: 600,
                          color: '#111827',
                        }}
                      >
                        {name}
                      </Column>
                    </Row>

                    <Row style={{ padding: '8px 12px' }}>
                      <Column style={{ fontSize: '14px', color: '#6b7280' }}>📧 E-post:</Column>
                      <Column style={{ textAlign: 'right', fontSize: '14px', fontWeight: 600 }}>
                        <a
                          href={`mailto:${email}`}
                          style={{ color: '#9333ea', textDecoration: 'none' }}
                        >
                          {email}
                        </a>
                      </Column>
                    </Row>

                    <Row style={{ padding: '8px 12px' }}>
                      <Column style={{ fontSize: '14px', color: '#6b7280' }}>📱 Telefon:</Column>
                      <Column style={{ textAlign: 'right', fontSize: '14px', fontWeight: 600 }}>
                        <a
                          href={`tel:${phone}`}
                          style={{ color: '#9333ea', textDecoration: 'none' }}
                        >
                          {phone}
                        </a>
                      </Column>
                    </Row>
                  </td>
                </tr>
              </table>

              {/* Booking Details */}
              <table
                role="presentation"
                style={{
                  width: '100%',
                  margin: '0 0 32px',
                  borderRadius: '6px',
                  border: '2px solid #facc15',
                  backgroundColor: '#fefce8',
                  borderCollapse: 'separate',
                }}
              >
                <tr>
                  <td style={{ padding: '20px' }}>
                    <Text
                      style={{
                        margin: '0 0 16px',
                        fontSize: '14px',
                        fontWeight: 600,
                        textTransform: 'uppercase',
                        letterSpacing: '0.5px',
                        color: '#854d0e',
                      }}
                    >
                      Reservasjonsdetaljer
                    </Text>
                    <Hr
                      style={{ margin: '16px 0', border: 'none', borderTop: '1px solid #fde047' }}
                    />

                    <Row style={{ padding: '8px 12px' }}>
                      <Column style={{ fontSize: '14px', color: '#854d0e' }}>📅 Dato:</Column>
                      <Column
                        style={{
                          textAlign: 'right',
                          fontSize: '14px',
                          fontWeight: 600,
                          color: '#111827',
                        }}
                      >
                        {formattedDate}
                      </Column>
                    </Row>

                    <Row style={{ padding: '8px 12px' }}>
                      <Column style={{ fontSize: '14px', color: '#854d0e' }}>🕐 Tid:</Column>
                      <Column
                        style={{
                          textAlign: 'right',
                          fontSize: '14px',
                          fontWeight: 600,
                          color: '#111827',
                        }}
                      >
                        {timeSlot}
                      </Column>
                    </Row>

                    <Row style={{ padding: '8px 12px' }}>
                      <Column style={{ fontSize: '14px', color: '#854d0e' }}>
                        👥 Antall personer:
                      </Column>
                      <Column
                        style={{
                          textAlign: 'right',
                          fontSize: '14px',
                          fontWeight: 600,
                          color: '#111827',
                        }}
                      >
                        {partySize}
                      </Column>
                    </Row>

                    {notes && (
                      <>
                        <Hr
                          style={{
                            margin: '16px 0',
                            border: 'none',
                            borderTop: '1px solid #fde047',
                          }}
                        />
                        <Text style={{ margin: '0 0 8px', fontSize: '14px', color: '#854d0e' }}>
                          💬 Spesielle ønsker:
                        </Text>
                        <Text
                          style={{
                            margin: 0,
                            borderRadius: '4px',
                            backgroundColor: '#ffffff',
                            padding: '10px',
                            fontSize: '14px',
                            fontStyle: 'italic',
                            color: '#111827',
                          }}
                        >
                          {notes}
                        </Text>
                      </>
                    )}
                  </td>
                </tr>
              </table>

              {/* Reminder Box */}
              <table
                role="presentation"
                style={{
                  width: '100%',
                  borderRadius: '4px',
                  borderLeft: '4px solid #2563eb',
                  backgroundColor: '#eff6ff',
                  borderCollapse: 'separate',
                }}
              >
                <tr>
                  <td style={{ padding: '16px' }}>
                    <Text
                      style={{ margin: 0, fontSize: '14px', lineHeight: '1.6', color: '#374151' }}
                    >
                      <strong style={{ color: '#2563eb' }}>💡 Påminnelse:</strong> Logg inn i
                      admin-panelet for å bekrefte eller administrere denne reservasjonen.
                    </Text>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>

        {/* Footer */}
        <Section
          style={{
            borderRadius: '0 0 8px 8px',
            borderTop: '1px solid #e5e7eb',
            backgroundColor: '#f9fafb',
            padding: '32px 40px',
            textAlign: 'center',
          }}
        >
          <Text style={{ margin: 0, fontSize: '14px', color: '#6b7280' }}>
            Automatisk varsling fra reservasjonssystemet
          </Text>
        </Section>
      </Container>
    </Body>
  </Html>
)

/**
 * Generate HTML email for booking confirmation
 * This is sent to customers when they create a booking
 */
export const generateBookingConfirmationEmail = async ({
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

  const html = await render(
    <BookingConfirmationEmail
      name={name}
      formattedDate={formattedDate}
      timeSlot={timeSlot}
      partySize={partySize}
      notes={notes}
    />,
    { pretty: true },
  )

  const text = `
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
  `.trim()

  return {
    subject: `Bordreservasjon bekreftet - ${formattedDate}`,
    html,
    text,
  }
}

/**
 * Generate HTML email for internal booking notification
 * This is sent to the restaurant staff when a new booking is created
 */
export const generateBookingNotificationEmail = async ({
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

  const html = await render(
    <BookingNotificationEmail
      name={name}
      email={email}
      phone={phone}
      formattedDate={formattedDate}
      timeSlot={timeSlot}
      partySize={partySize}
      notes={notes}
    />,
    { pretty: true },
  )

  const text = `
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
  `.trim()

  return {
    subject: `Ny bordreservasjon: ${name} - ${formattedDate} kl. ${timeSlot}`,
    html,
    text,
  }
}
