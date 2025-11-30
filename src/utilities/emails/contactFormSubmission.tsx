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
 * React Email component for contact form customer confirmation
 * This is sent to customers when they submit a contact form
 */
const ContactFormConfirmationEmail = ({
  fullName,
  message,
}: {
  fullName: string
  message: string
}) => (
  <Html lang="no">
    <Head />
    <Preview>Takk for din henvendelse - Vi kommer tilbake til deg snart</Preview>
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
          <Heading
            style={{
              padding: '8px 0',
              color: '#f7e7cf',
              backgroundColor: '#1b2d1b',
              fontSize: '28px',
              fontWeight: 600,
            }}
          >
            ✓ Takk for din henvendelse
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
                Hei {fullName},
              </Text>

              <Text
                style={{
                  margin: '0 0 32px',
                  fontSize: '16px',
                  lineHeight: '1.6',
                  color: '#1b2d1b',
                }}
              >
                Takk for din henvendelse! Vi har mottatt din melding og vil komme tilbake til deg så
                snart som mulig.
              </Text>

              {/* Message Summary Box */}
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
                      Din melding
                    </Text>
                    <Hr
                      style={{ margin: '16px 0', border: 'none', borderTop: '1px solid #d1d5db' }}
                    />
                    <Text
                      style={{
                        margin: 0,
                        fontSize: '14px',
                        lineHeight: '1.6',
                        color: '#1b2d1b',
                        whiteSpace: 'pre-wrap',
                      }}
                    >
                      {message}
                    </Text>
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
                Vi setter pris på at du tok kontakt med oss og vil gjøre vårt beste for å svare deg
                innen 24 timer.
              </Text>

              <Text style={{ margin: 0, fontSize: '16px', lineHeight: '1.6', color: '#1b2d1b' }}>
                Vennlig hilsen,
                <br />
                <strong>Cardamom Bar & Cafe Teamet</strong>
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
            &copy; {new Date().getFullYear()} Cardamom Bar & Cafe
          </Text>
        </Section>
      </Container>
    </Body>
  </Html>
)

/**
 * React Email component for admin contact form notification
 * This is sent to admin/staff when a new contact form is submitted
 */
const ContactFormNotificationEmail = ({
  fullName,
  email,
  phone,
  message,
}: {
  fullName: string
  email: string
  phone?: string
  message: string
}) => (
  <Html lang="no">
    <Head />
    <Preview>
      Ny kontaktskjema: {fullName} - {email}
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
            backgroundColor: '#3b82f6',
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
            📬 Ny Kontaktskjema
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
                En ny henvendelse er mottatt via kontaktskjemaet:
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
                      Kontaktinformasjon
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
                        {fullName}
                      </Column>
                    </Row>

                    <Row style={{ padding: '8px 12px' }}>
                      <Column style={{ fontSize: '14px', color: '#6b7280' }}>📧 E-post:</Column>
                      <Column style={{ textAlign: 'right', fontSize: '14px', fontWeight: 600 }}>
                        <a
                          href={`mailto:${email}`}
                          style={{ color: '#3b82f6', textDecoration: 'none' }}
                        >
                          {email}
                        </a>
                      </Column>
                    </Row>

                    {phone && (
                      <Row style={{ padding: '8px 12px' }}>
                        <Column style={{ fontSize: '14px', color: '#6b7280' }}>📱 Telefon:</Column>
                        <Column style={{ textAlign: 'right', fontSize: '14px', fontWeight: 600 }}>
                          <a
                            href={`tel:${phone}`}
                            style={{ color: '#3b82f6', textDecoration: 'none' }}
                          >
                            {phone}
                          </a>
                        </Column>
                      </Row>
                    )}
                  </td>
                </tr>
              </table>

              {/* Message */}
              <table
                role="presentation"
                style={{
                  width: '100%',
                  margin: '0 0 32px',
                  borderRadius: '6px',
                  border: '2px solid #dbeafe',
                  backgroundColor: '#eff6ff',
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
                        color: '#1e40af',
                      }}
                    >
                      Melding
                    </Text>
                    <Hr
                      style={{ margin: '16px 0', border: 'none', borderTop: '1px solid #93c5fd' }}
                    />
                    <Text
                      style={{
                        margin: 0,
                        fontSize: '14px',
                        lineHeight: '1.6',
                        color: '#111827',
                        whiteSpace: 'pre-wrap',
                      }}
                    >
                      {message}
                    </Text>
                  </td>
                </tr>
              </table>

              {/* Reminder Box */}
              <table
                role="presentation"
                style={{
                  width: '100%',
                  borderRadius: '4px',
                  borderLeft: '4px solid #f59e0b',
                  backgroundColor: '#fffbeb',
                  borderCollapse: 'separate',
                }}
              >
                <tr>
                  <td style={{ padding: '16px' }}>
                    <Text
                      style={{ margin: 0, fontSize: '14px', lineHeight: '1.6', color: '#374151' }}
                    >
                      <strong style={{ color: '#f59e0b' }}>💡 Påminnelse:</strong> Vennligst svar
                      kunden innen 24 timer for best kundeservice.
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
            Automatisk varsling fra kontaktskjemaet
          </Text>
        </Section>
      </Container>
    </Body>
  </Html>
)

/**
 * Generate HTML email for contact form customer confirmation
 * This is sent to customers when they submit a contact form
 */
export const generateContactFormConfirmationEmail = async ({
  fullName,
  message,
}: {
  fullName: string
  message: string
}) => {
  const html = await render(
    <ContactFormConfirmationEmail fullName={fullName} message={message} />,
    { pretty: true },
  )

  const text = `
Takk for din henvendelse

Hei ${fullName},

Takk for din henvendelse! Vi har mottatt din melding og vil komme tilbake til deg så snart som mulig.

DIN MELDING:
${message}

Vi setter pris på at du tok kontakt med oss og vil gjøre vårt beste for å svare deg innen 24 timer.

Vennlig hilsen,
Cardamom Bar & Cafe Teamet
  `.trim()

  return {
    subject: 'Takk for din henvendelse - Vi kommer tilbake til deg snart',
    html,
    text,
  }
}

/**
 * Generate HTML email for internal contact form notification
 * This is sent to admin/staff when a new contact form is submitted
 */
export const generateContactFormNotificationEmail = async ({
  fullName,
  email,
  phone,
  message,
}: {
  fullName: string
  email: string
  phone?: string
  message: string
}) => {
  const html = await render(
    <ContactFormNotificationEmail
      fullName={fullName}
      email={email}
      phone={phone}
      message={message}
    />,
    { pretty: true },
  )

  const text = `
NY KONTAKTSKJEMA

KONTAKTINFORMASJON:
- Navn: ${fullName}
- E-post: ${email}
${phone ? `- Telefon: ${phone}` : ''}

MELDING:
${message}

Vennligst svar kunden innen 24 timer for best kundeservice.
  `.trim()

  return {
    subject: `Ny kontaktskjema: ${fullName} - ${email}`,
    html,
    text,
  }
}
