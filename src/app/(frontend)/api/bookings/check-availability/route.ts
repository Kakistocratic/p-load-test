import { getPayload } from 'payload'
import config from '@/payload.config'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const payload = await getPayload({ config })
    const body = await req.json()

    const { date, timeSlot, partySize } = body

    if (!date || !timeSlot) {
      return NextResponse.json({ error: 'Date and timeSlot are required' }, { status: 400 })
    }

    // Fetch booking settings
    const bookingSettings = await payload.findGlobal({
      slug: 'booking-settings',
    })

    const totalCapacity = bookingSettings.totalSeatingCapacity || 40
    const occupancyDuration = bookingSettings.tableOccupancyDuration || 120

    // Parse the selected time slot
    const [selectedHour, selectedMinute] = timeSlot.split(':').map(Number)
    const selectedDateTime = new Date(date)
    selectedDateTime.setHours(selectedHour, selectedMinute, 0, 0)

    // Calculate the time range that would be affected by this booking
    const bookingStartTime = selectedDateTime
    const bookingEndTime = new Date(bookingStartTime.getTime() + occupancyDuration * 60000)

    // Find all confirmed/pending bookings for the same date
    const existingBookings = await payload.find({
      collection: 'bookings',
      where: {
        and: [
          {
            date: {
              equals: new Date(date).toISOString().split('T')[0],
            },
          },
          {
            status: {
              in: ['pending', 'confirmed'],
            },
          },
        ],
      },
    })

    // Calculate occupied seats for overlapping time slots
    let occupiedSeats = 0

    for (const booking of existingBookings.docs) {
      const [bookingHour, bookingMinute] = booking.timeSlot.split(':').map(Number)
      const bookingDateTime = new Date(booking.date)
      bookingDateTime.setHours(bookingHour, bookingMinute, 0, 0)

      const existingBookingStart = bookingDateTime
      const existingBookingEnd = new Date(
        existingBookingStart.getTime() + occupancyDuration * 60000,
      )

      // Check if bookings overlap
      // Bookings overlap if: (StartA < EndB) AND (EndA > StartB)
      const overlaps =
        bookingStartTime < existingBookingEnd && bookingEndTime > existingBookingStart

      if (overlaps) {
        occupiedSeats += booking.partySize
      }
    }

    const availableSeats = Math.max(0, totalCapacity - occupiedSeats)
    const canBook = partySize ? availableSeats >= partySize : availableSeats > 0

    return NextResponse.json({
      availableSeats,
      totalCapacity,
      occupiedSeats,
      canBook,
    })
  } catch (error) {
    console.error('Error checking availability:', error)
    return NextResponse.json({ error: 'Failed to check availability' }, { status: 500 })
  }
}
