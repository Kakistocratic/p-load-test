'use client'

import React, { useState, useMemo, useEffect } from 'react'
import { DayPicker, getDefaultClassNames } from 'react-day-picker'
import 'react-day-picker/style.css'
import RichText from '@/components/RichText'

interface BookingFormProps {
  bookingSettings: any
}

export const BookingForm: React.FC<BookingFormProps> = ({ bookingSettings }) => {
  const [selectedDate, setSelectedDate] = useState<Date>()
  const [partySize, setPartySize] = useState<number>(2)
  const [timeSlot, setTimeSlot] = useState<string>('')
  const [availableSeats, setAvailableSeats] = useState<number | null>(null)
  const [checkingAvailability, setCheckingAvailability] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    notes: '',
  })

  const defaultClassNames = getDefaultClassNames()

  // Check availability when date, time slot, or party size changes
  useEffect(() => {
    const checkAvailability = async () => {
      if (!selectedDate || !timeSlot) {
        setAvailableSeats(null)
        return
      }

      setCheckingAvailability(true)
      try {
        const response = await fetch('/api/bookings/check-availability', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            date: selectedDate.toISOString(),
            timeSlot,
            partySize,
          }),
        })

        if (response.ok) {
          const data = await response.json()
          setAvailableSeats(data.availableSeats)
        }
      } catch (error) {
        console.error('Error checking availability:', error)
      } finally {
        setCheckingAvailability(false)
      }
    }

    checkAvailability()
  }, [selectedDate, timeSlot, partySize])

  // Generate disabled days based on settings
  const disabledDays = useMemo(() => {
    const disabled: any[] = [
      { before: new Date() }, // Disable past dates
    ]

    // Add advance booking limit
    if (bookingSettings?.advanceBookingDays) {
      const maxDate = new Date()
      maxDate.setDate(maxDate.getDate() + bookingSettings.advanceBookingDays)
      disabled.push({ after: maxDate })
    }

    // Add closed weekdays from bookingHours
    if (bookingSettings?.bookingHours && bookingSettings.bookingHours.length > 0) {
      const closedDays = bookingSettings.bookingHours
        .filter((h: any) => h.isClosed)
        .map((h: any) => parseInt(h.dayOfWeek))
      if (closedDays.length > 0) {
        disabled.push({ dayOfWeek: closedDays })
      }
    }

    // Add blackout dates
    if (bookingSettings?.blackoutDates && bookingSettings.blackoutDates.length > 0) {
      bookingSettings.blackoutDates.forEach((blackout: any) => {
        if (blackout.date) {
          disabled.push(new Date(blackout.date))
        }
      })
    }

    return disabled
  }, [bookingSettings])

  // Generate time slots based on booking hours
  const availableTimeSlots = useMemo(() => {
    if (!selectedDate || !bookingSettings?.bookingHours) return []

    const dayOfWeek = selectedDate.getDay()
    const slots: string[] = []

    // Find booking hours for the selected day
    const dayHours = bookingSettings.bookingHours.find(
      (h: any) => parseInt(h.dayOfWeek) === dayOfWeek,
    )

    if (!dayHours || dayHours.isClosed || !dayHours.openingTime || !dayHours.closingTime) {
      return []
    }

    // Parse opening and closing times
    const [openHour, openMin] = dayHours.openingTime.split(':').map(Number)
    const [closeHour, closeMin] = dayHours.closingTime.split(':').map(Number)

    const slotInterval = parseInt(bookingSettings?.timeSlotInterval || '15')

    let currentHour = openHour
    let currentMin = openMin

    while (currentHour < closeHour || (currentHour === closeHour && currentMin < closeMin)) {
      const timeString = `${String(currentHour).padStart(2, '0')}:${String(currentMin).padStart(2, '0')}`
      slots.push(timeString)

      // Add slot interval
      currentMin += slotInterval
      if (currentMin >= 60) {
        currentHour += Math.floor(currentMin / 60)
        currentMin = currentMin % 60
      }
    }

    return slots
  }, [selectedDate, bookingSettings])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitError(null)

    if (!selectedDate || !timeSlot) {
      setSubmitError('Vennligst velg dato og tidspunkt')
      return
    }

    if (availableSeats !== null && availableSeats < partySize) {
      setSubmitError('Ikke nok ledig kapasitet for dette tidspunktet')
      return
    }

    setSubmitting(true)

    try {
      const response = await fetch('/api/bookings/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          date: selectedDate.toISOString(),
          timeSlot,
          partySize,
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          notes: formData.notes,
        }),
      })

      const data = await response.json()

      if (response.ok) {
        setSubmitSuccess(true)
        // Reset form
        setSelectedDate(undefined)
        setTimeSlot('')
        setPartySize(2)
        setFormData({ name: '', email: '', phone: '', notes: '' })
        setAvailableSeats(null)
      } else {
        setSubmitError(data.error || 'Kunne ikke opprette reservasjon')
      }
    } catch (error) {
      console.error('Error submitting booking:', error)
      setSubmitError('Det oppstod en feil. Vennligst prøv igjen.')
    } finally {
      setSubmitting(false)
    }
  }

  const maxPartySize = bookingSettings?.maxPartySize || 8
  const minPartySize = 1

  return (
    <div className="flex flex-col gap-8 max-w-5xl mx-auto">
      {/* Calendar Section */}
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="flex-1 flex flex-col">
            <h3 className="text-xl font-semibold mb-4">Velg dato</h3>
            <div className="flex-1 flex items-center justify-center">
              <DayPicker
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                disabled={disabledDays}
                style={
                  {
                    '--rdp-day-height': '3rem',
                    '--rdp-day-width': '3rem',
                    '--rdp-day_button-height': '2.75rem',
                    '--rdp-day_button-width': '2.75rem',
                  } as React.CSSProperties
                }
                classNames={{
                  today: 'border-primary',
                  selected: 'bg-primary border-primary text-tertiary',
                  root: `${defaultClassNames.root}`,
                  chevron: `${defaultClassNames.chevron}`,
                  day_button: 'rounded-md',
                }}
              />
            </div>
          </div>
          {bookingSettings?.bookingInstructions && (
            <div className="flex-1 flex flex-col">
              <RichText data={bookingSettings.bookingInstructions} enableGutter={false} />
            </div>
          )}
        </div>
      </div>

      {/* Booking Form Section */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="text-xl font-semibold mb-4">Bookingdetaljer</h3>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Party Size */}
          <div>
            <label htmlFor="party-size" className="block text-sm font-medium mb-2">
              Antall personer
            </label>
            <select
              id="party-size"
              value={partySize}
              onChange={(e) => setPartySize(Number(e.target.value))}
              className="w-full px-3 py-2 border border-border rounded-md bg-background"
              required
            >
              {Array.from(
                { length: maxPartySize - minPartySize + 1 },
                (_, i) => i + minPartySize,
              ).map((num) => (
                <option key={num} value={num}>
                  {num} {num === 1 ? 'person' : 'personer'}
                </option>
              ))}
            </select>
          </div>

          {/* Time Slot */}
          <div>
            <label htmlFor="time-slot" className="block text-sm font-medium mb-2">
              Tidspunkt
            </label>
            <select
              id="time-slot"
              value={timeSlot}
              onChange={(e) => setTimeSlot(e.target.value)}
              className="w-full px-3 py-2 border border-border rounded-md bg-background"
              required
              disabled={!selectedDate}
            >
              <option value="">Velg tidspunkt</option>
              {availableTimeSlots.map((slot) => (
                <option key={slot} value={slot}>
                  {slot}
                </option>
              ))}
            </select>
            {timeSlot && availableSeats !== null && (
              <div className="mt-2 text-sm">
                {checkingAvailability ? (
                  <span className="text-muted-foreground">Sjekker tilgjengelighet...</span>
                ) : availableSeats >= partySize ? (
                  <span className="text-green-600">
                    ✓ {availableSeats} {availableSeats === 1 ? 'plass' : 'plasser'} tilgjengelig
                  </span>
                ) : availableSeats > 0 ? (
                  <span className="text-orange-600">
                    Kun {availableSeats} {availableSeats === 1 ? 'plass' : 'plasser'} tilgjengelig
                    (du valgte {partySize})
                  </span>
                ) : (
                  <span className="text-red-600">
                    Fullbooket - vennligst velg et annet tidspunkt
                  </span>
                )}
              </div>
            )}
          </div>

          {/* Name */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium mb-2">
              Navn
            </label>
            <input
              type="text"
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-3 py-2 border border-border rounded-md bg-background"
              required
            />
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-2">
              E-post
            </label>
            <input
              type="email"
              id="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-3 py-2 border border-border rounded-md bg-background"
              required
            />
          </div>

          {/* Phone */}
          <div>
            <label htmlFor="phone" className="block text-sm font-medium mb-2">
              Telefon
            </label>
            <input
              type="tel"
              id="phone"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="w-full px-3 py-2 border border-border rounded-md bg-background"
              required
            />
          </div>

          {/* Notes */}
          <div>
            <label htmlFor="notes" className="block text-sm font-medium mb-2">
              Spesielle ønsker (valgfritt)
            </label>
            <textarea
              id="notes"
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              className="w-full px-3 py-2 border border-border rounded-md bg-background"
              rows={3}
            />
          </div>

          {/* Success Message */}
          {submitSuccess && (
            <div className="p-4 bg-green-50 border border-green-200 rounded-md">
              <p className="text-green-800 font-medium">
                ✓ Reservasjonen er mottatt! Du vil motta en bekreftelse på e-post.
              </p>
            </div>
          )}

          {/* Error Message */}
          {submitError && (
            <div className="p-4 bg-red-50 border border-red-200 rounded-md">
              <p className="text-red-800">{submitError}</p>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={
              !selectedDate ||
              !timeSlot ||
              submitting ||
              (availableSeats !== null && availableSeats < partySize)
            }
            className="w-full bg-primary text-tertiary px-6 py-3 rounded-md font-semibold hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {submitting ? 'Behandler...' : 'Reserver bord'}
          </button>
        </form>
      </div>
    </div>
  )
}
