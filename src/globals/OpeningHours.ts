import type { GlobalConfig } from 'payload'

import { revalidateOpeningHours } from './hooks/revalidateOpeningHours'

export const OpeningHours: GlobalConfig = {
  slug: 'opening-hours',
  access: {
    read: () => true,
  },
  hooks: {
    afterChange: [revalidateOpeningHours],
  },
  fields: [
    {
      name: 'sectionTitle',
      type: 'text',
      defaultValue: 'Opening Hours',
      admin: {
        description:
          'The heading to display above opening hours (e.g., "Opening Hours", "Åpningstider")',
      },
    },
    {
      name: 'hours',
      type: 'array',
      fields: [
        {
          name: 'dayRange',
          type: 'text',
          required: true,
          admin: {
            description: 'e.g., Mon-Fri, Sat-Sun, or a specific day',
          },
        },
        {
          name: 'openingTime',
          type: 'date',
          admin: {
            date: {
              pickerAppearance: 'timeOnly',
              displayFormat: 'HH:mm',
            },
          },
        },
        {
          name: 'closingTime',
          type: 'date',
          admin: {
            date: {
              pickerAppearance: 'timeOnly',
              displayFormat: 'HH:mm',
            },
          },
        },
        {
          name: 'isClosed',
          type: 'checkbox',
          defaultValue: false,
          admin: {
            description: 'Check this if the shop is closed on these days',
          },
        },
      ],
    },
  ],
}
