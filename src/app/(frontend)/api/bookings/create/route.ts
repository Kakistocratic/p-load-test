import { getPayload } from 'payload'
import config from '@/payload.config'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const payload = await getPayload({ config })
    const body = await req.json()

    const { date, timeSlot, partySize, name, email, phone, notes } = body

    // Validate required fields
    if (!date || !timeSlot || !partySize || !name || !email || !phone) {
      return NextResponse.json({ error: 'All required fields must be provided' }, { status: 400 })
    }

    // Fetch booking settings
    const bookingSettings = await payload.findGlobal({
      slug: 'booking-settings',
    })

    const totalCapacity = bookingSettings.totalSeatingCapacity || 40
    const occupancyDuration = bookingSettings.tableOccupancyDuration || 120
    const maxPartySize = bookingSettings.maxPartySize || 8

    // Validate party size
    if (partySize > maxPartySize) {
      return NextResponse.json(
        { error: `Party size cannot exceed ${maxPartySize} people` },
        { status: 400 },
      )
    }

    // Parse the selected time slot
    const [selectedHour, selectedMinute] = timeSlot.split(':').map(Number)
    const selectedDateTime = new Date(date)
    selectedDateTime.setHours(selectedHour, selectedMinute, 0, 0)

    // Calculate the time range for this booking
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
      const overlaps =
        bookingStartTime < existingBookingEnd && bookingEndTime > existingBookingStart

      if (overlaps) {
        occupiedSeats += booking.partySize
      }
    }

    const availableSeats = Math.max(0, totalCapacity - occupiedSeats)

    // Check if there's enough capacity
    if (availableSeats < partySize) {
      return NextResponse.json(
        {
          error: 'Not enough capacity available for this time slot',
          availableSeats,
        },
        { status: 409 },
      )
    }

    // Create the booking with confirmed status since availability was already checked
    const newBooking = await payload.create({
      collection: 'bookings',
      data: {
        date: new Date(date).toISOString().split('T')[0],
        timeSlot,
        partySize,
        name,
        email,
        phone,
        notes: notes || '',
        status: 'confirmed',
      },
    })

    return NextResponse.json({
      success: true,
      booking: newBooking,
      message: 'Booking created successfully',
    })
  } catch (error) {
    console.error('Error creating booking:', error)
    return NextResponse.json({ error: 'Failed to create booking' }, { status: 500 })
  }
}
