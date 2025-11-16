import type { GlobalConfig } from 'payload'
import { revalidateBookingSettings } from './hooks/revalidateBookingSettings'

export const BookingSettings: GlobalConfig = {
  slug: 'booking-settings',
  label: 'Innstillinger',
  admin: {
    group: 'Booking',
  },
  access: {
    read: () => true,
  },
  hooks: {
    afterChange: [revalidateBookingSettings],
  },
  fields: [
    {
      name: 'maxPartySize',
      type: 'number',
      label: 'Maks antall personer per reservasjon',
      defaultValue: 8,
      required: true,
      min: 1,
      admin: {
        description: 'Maksimum antall personer som kan reservere bord i en booking',
      },
    },
    {
      name: 'timeSlotDuration',
      type: 'number',
      label: 'Lengde på tidsluke (minutter)',
      defaultValue: 30,
      required: true,
      admin: {
        description: 'Hvor lenge hver tidsluke varer (f.eks. 30 eller 60 minutter)',
      },
    },
    {
      name: 'maxSeatsPerSlot',
      type: 'number',
      label: 'Maks antall seter per tidsluke',
      defaultValue: 40,
      required: true,
      min: 1,
      admin: {
        description: 'Totalt antall seter tilgjengelig per tidsluke',
      },
    },
    {
      name: 'advanceBookingDays',
      type: 'number',
      label: 'Hvor mange dager frem kan man reservere',
      defaultValue: 30,
      required: true,
      min: 1,
      max: 365,
      admin: {
        description: 'Hvor langt frem i tid kan kunder reservere bord',
      },
    },
    {
      name: 'blackoutDates',
      type: 'array',
      label: 'Stengte dager (helligdager/feriedager)',
      admin: {
        description: 'Datoer hvor det ikke er mulig å reservere bord',
      },
      fields: [
        {
          name: 'date',
          type: 'date',
          label: 'Dato',
          required: true,
          admin: {
            date: {
              pickerAppearance: 'dayOnly',
            },
          },
        },
        {
          name: 'reason',
          type: 'text',
          label: 'Grunn',
          admin: {
            description: 'F.eks. "Jul", "Påske", "Privat arrangement"',
          },
        },
      ],
    },
    {
      name: 'closedWeekdays',
      type: 'select',
      label: 'Faste stengedager',
      hasMany: true,
      admin: {
        description: 'Velg ukedager kafeen er stengt (f.eks. søndager)',
      },
      options: [
        { label: 'Mandag', value: '1' },
        { label: 'Tirsdag', value: '2' },
        { label: 'Onsdag', value: '3' },
        { label: 'Torsdag', value: '4' },
        { label: 'Fredag', value: '5' },
        { label: 'Lørdag', value: '6' },
        { label: 'Søndag', value: '0' },
      ],
    },
  ],
}
