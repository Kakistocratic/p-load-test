'use client'

import React, { useState, useMemo } from 'react'
import { DayPicker, getDefaultClassNames } from 'react-day-picker'
import 'react-day-picker/style.css'

interface BookingFormProps {
  bookingSettings: any
  openingHours: any
}

export const BookingForm: React.FC<BookingFormProps> = ({ bookingSettings, openingHours }) => {
  const [selectedDate, setSelectedDate] = useState<Date>()
  const [partySize, setPartySize] = useState<number>(2)
  const [timeSlot, setTimeSlot] = useState<string>('')
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    notes: '',
  })

  const defaultClassNames = getDefaultClassNames()

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

    // Add closed weekdays
    if (bookingSettings?.closedWeekdays && bookingSettings.closedWeekdays.length > 0) {
      disabled.push({
        dayOfWeek: bookingSettings.closedWeekdays.map((day: string) => parseInt(day)),
      })
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

  // Generate time slots based on opening hours
  const availableTimeSlots = useMemo(() => {
    if (!selectedDate || !openingHours?.hours) return []

    const dayOfWeek = selectedDate.getDay()
    const slots: string[] = []

    // Find matching opening hours for the selected day
    for (const hourEntry of openingHours.hours) {
      if (hourEntry.isClosed) continue

      // Parse day range (e.g., "Mandag-Fredag")
      const dayRange = hourEntry.dayRange?.toLowerCase() || ''
      const matchesDay =
        (dayRange.includes('mandag-fredag') && dayOfWeek >= 1 && dayOfWeek <= 5) ||
        (dayRange.includes('mandag') && dayOfWeek === 1) ||
        (dayRange.includes('tirsdag') && dayOfWeek === 2) ||
        (dayRange.includes('onsdag') && dayOfWeek === 3) ||
        (dayRange.includes('torsdag') && dayOfWeek === 4) ||
        (dayRange.includes('fredag') && dayOfWeek === 5) ||
        (dayRange.includes('lørdag') && dayOfWeek === 6) ||
        (dayRange.includes('søndag') && dayOfWeek === 0)

      if (matchesDay && hourEntry.openingTime && hourEntry.closingTime) {
        // Parse opening and closing times
        const [openHour, openMin] = hourEntry.openingTime.split(':').map(Number)
        const [closeHour, closeMin] = hourEntry.closingTime.split(':').map(Number)

        const slotDuration = bookingSettings?.timeSlotDuration || 30

        let currentHour = openHour
        let currentMin = openMin

        while (currentHour < closeHour || (currentHour === closeHour && currentMin < closeMin)) {
          const timeString = `${String(currentHour).padStart(2, '0')}:${String(currentMin).padStart(2, '0')}`
          slots.push(timeString)

          // Add slot duration
          currentMin += slotDuration
          if (currentMin >= 60) {
            currentHour += Math.floor(currentMin / 60)
            currentMin = currentMin % 60
          }
        }

        break // Use first matching entry
      }
    }

    return slots
  }, [selectedDate, openingHours, bookingSettings])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Implement booking submission logic
    console.log({
      date: selectedDate,
      time: timeSlot,
      partySize,
      ...formData,
    })
  }

  const maxPartySize = bookingSettings?.maxPartySize || 8
  const minPartySize = 1

  return (
    <div className="grid md:grid-cols-2 gap-8">
      {/* Calendar Section */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="text-xl font-semibold mb-4">Velg dato</h3>
        <DayPicker
          mode="single"
          selected={selectedDate}
          onSelect={setSelectedDate}
          disabled={disabledDays}
          classNames={{
            today: 'border-primary',
            selected: 'bg-primary border-primary text-primary-foreground',
            root: `${defaultClassNames.root} mx-auto`,
            chevron: `${defaultClassNames.chevron} fill-primary`,
            day_button: 'hover:bg-muted rounded-md',
          }}
        />
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

          {/* Submit Button */}
          <button
            type="submit"
            disabled={!selectedDate || !timeSlot}
            className="w-full bg-primary text-primary-foreground px-6 py-3 rounded-md font-semibold hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Reserver bord
          </button>
        </form>
      </div>
    </div>
  )
}
