import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
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
    <Body className="bg-gray-100 font-sans">
      <Container className="mx-auto my-10 max-w-[600px] rounded-lg bg-white shadow-lg">
        {/* Header */}
        <Section className="rounded-t-lg bg-gradient-to-br from-purple-600 to-purple-800 px-10 py-8 text-center">
          <Heading className="m-0 text-3xl font-semibold text-white">
            ✓ Bordreservasjon Bekreftet
          </Heading>
        </Section>

        {/* Content */}
        <Section className="px-10 py-8">
          <Text className="mb-5 text-base leading-relaxed text-gray-800">Hei {name},</Text>

          <Text className="mb-8 text-base leading-relaxed text-gray-800">
            Takk for din bordreservasjon! Vi ser frem til å ta imot deg.
          </Text>

          {/* Booking Details Box */}
          <Section className="mb-8 rounded-md border-2 border-gray-200 bg-gray-50 p-5">
            <Text className="mb-4 text-sm font-semibold uppercase tracking-wide text-gray-700">
              Reservasjonsdetaljer
            </Text>
            <Hr className="my-4 border-gray-300" />

            <Row className="py-2">
              <Column className="text-sm text-gray-600">📅 Dato:</Column>
              <Column className="text-right text-sm font-semibold text-gray-900">
                {formattedDate}
              </Column>
            </Row>

            <Row className="py-2">
              <Column className="text-sm text-gray-600">🕐 Tid:</Column>
              <Column className="text-right text-sm font-semibold text-gray-900">{timeSlot}</Column>
            </Row>

            <Row className="py-2">
              <Column className="text-sm text-gray-600">👥 Antall personer:</Column>
              <Column className="text-right text-sm font-semibold text-gray-900">
                {partySize}
              </Column>
            </Row>

            {notes && (
              <>
                <Hr className="my-4 border-gray-300" />
                <Text className="mb-2 text-sm text-gray-600">💬 Dine notater:</Text>
                <Text className="m-0 text-sm italic text-gray-900">{notes}</Text>
              </>
            )}
          </Section>

          <Text className="mb-5 text-base leading-relaxed text-gray-800">
            Dersom du trenger å endre eller kansellere reservasjonen, vennligst kontakt oss så snart
            som mulig.
          </Text>

          <Text className="m-0 text-base leading-relaxed text-gray-800">
            Hilsen,
            <br />
            <strong>Coffee Shop Teamet</strong>
          </Text>
        </Section>

        {/* Footer */}
        <Section className="rounded-b-lg border-t border-gray-200 bg-gray-50 px-10 py-8 text-center">
          <Text className="mb-3 text-sm text-gray-600">
            Denne e-posten ble sendt automatisk. Ikke svar på denne e-posten.
          </Text>
          <Text className="m-0 text-sm text-gray-600">
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
    <Body className="bg-gray-100 font-sans">
      <Container className="mx-auto my-10 max-w-[600px] rounded-lg bg-white shadow-lg">
        {/* Header */}
        <Section className="rounded-t-lg bg-red-500 px-10 py-8 text-center">
          <Heading className="m-0 text-3xl font-semibold text-white">🔔 Ny Bordreservasjon</Heading>
        </Section>

        {/* Content */}
        <Section className="px-10 py-8">
          <Text className="mb-8 text-base leading-relaxed text-gray-800">
            En ny bordreservasjon er registrert i systemet:
          </Text>

          {/* Customer Details */}
          <Section className="mb-5 rounded-md border-2 border-gray-200 bg-gray-50 p-5">
            <Text className="mb-4 text-sm font-semibold uppercase tracking-wide text-gray-700">
              Kundeinformasjon
            </Text>
            <Hr className="my-4 border-gray-300" />

            <Row className="py-2">
              <Column className="text-sm text-gray-600">👤 Navn:</Column>
              <Column className="text-right text-sm font-semibold text-gray-900">{name}</Column>
            </Row>

            <Row className="py-2">
              <Column className="text-sm text-gray-600">📧 E-post:</Column>
              <Column className="text-right text-sm font-semibold">
                <a href={`mailto:${email}`} className="text-purple-600 no-underline">
                  {email}
                </a>
              </Column>
            </Row>

            <Row className="py-2">
              <Column className="text-sm text-gray-600">📱 Telefon:</Column>
              <Column className="text-right text-sm font-semibold">
                <a href={`tel:${phone}`} className="text-purple-600 no-underline">
                  {phone}
                </a>
              </Column>
            </Row>
          </Section>

          {/* Booking Details */}
          <Section className="mb-8 rounded-md border-2 border-yellow-400 bg-yellow-50 p-5">
            <Text className="mb-4 text-sm font-semibold uppercase tracking-wide text-yellow-800">
              Reservasjonsdetaljer
            </Text>
            <Hr className="my-4 border-yellow-300" />

            <Row className="py-2">
              <Column className="text-sm text-yellow-800">📅 Dato:</Column>
              <Column className="text-right text-sm font-semibold text-gray-900">
                {formattedDate}
              </Column>
            </Row>

            <Row className="py-2">
              <Column className="text-sm text-yellow-800">🕐 Tid:</Column>
              <Column className="text-right text-sm font-semibold text-gray-900">{timeSlot}</Column>
            </Row>

            <Row className="py-2">
              <Column className="text-sm text-yellow-800">👥 Antall personer:</Column>
              <Column className="text-right text-sm font-semibold text-gray-900">
                {partySize}
              </Column>
            </Row>

            {notes && (
              <>
                <Hr className="my-4 border-yellow-300" />
                <Text className="mb-2 text-sm text-yellow-800">💬 Spesielle ønsker:</Text>
                <Text className="m-0 rounded bg-white p-2 text-sm italic text-gray-900">
                  {notes}
                </Text>
              </>
            )}
          </Section>

          <Section className="rounded border-l-4 border-blue-600 bg-blue-50 p-4">
            <Text className="m-0 text-sm leading-relaxed text-gray-700">
              <strong className="text-blue-600">💡 Påminnelse:</strong> Logg inn i admin-panelet for
              å bekrefte eller administrere denne reservasjonen.
            </Text>
          </Section>
        </Section>

        {/* Footer */}
        <Section className="rounded-b-lg border-t border-gray-200 bg-gray-50 px-10 py-8 text-center">
          <Text className="m-0 text-sm text-gray-600">
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

  const html = render(
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

  const html = render(
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
