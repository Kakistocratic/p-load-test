import type { CollectionConfig } from 'payload'
import { sendBookingEmails } from './Bookings/hooks/sendBookingEmails'

export const Bookings: CollectionConfig = {
  slug: 'bookings',
  labels: {
    singular: 'Bordreservasjon',
    plural: 'Bordreservasjoner',
  },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'date', 'timeSlot', 'partySize', 'status'],
    group: 'Booking',
  },
  access: {
    read: () => true,
    create: () => true,
    update: () => true,
    delete: () => true,
  },
  hooks: {
    afterChange: [sendBookingEmails],
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
          displayFormat: 'dd.MM.yyyy',
        },
      },
    },
    {
      name: 'timeSlot',
      type: 'text',
      label: 'Tidspunkt',
      required: true,
      admin: {
        description: 'F.eks. "12:00"',
      },
    },
    {
      name: 'partySize',
      type: 'number',
      label: 'Antall personer',
      required: true,
      min: 1,
    },
    {
      name: 'name',
      type: 'text',
      label: 'Navn',
      required: true,
    },
    {
      name: 'email',
      type: 'email',
      label: 'E-post',
      required: true,
    },
    {
      name: 'phone',
      type: 'text',
      label: 'Telefon',
      required: true,
    },
    {
      name: 'notes',
      type: 'textarea',
      label: 'Spesielle ønsker',
    },
    {
      name: 'status',
      type: 'select',
      label: 'Status',
      required: true,
      defaultValue: 'confirmed',
      options: [
        { label: 'Bekreftet', value: 'confirmed' },
        { label: 'Kansellert', value: 'cancelled' },
        { label: 'Fullført', value: 'completed' },
      ],
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'createdAt',
      type: 'date',
      label: 'Opprettet',
      admin: {
        position: 'sidebar',
        readOnly: true,
        date: {
          pickerAppearance: 'dayAndTime',
        },
      },
      hooks: {
        beforeChange: [
          ({ value, operation }) => {
            if (operation === 'create' && !value) {
              return new Date()
            }
            return value
          },
        ],
      },
    },
  ],
}
