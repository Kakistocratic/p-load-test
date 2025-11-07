import type { CollectionConfig } from 'payload'

import { anyone } from '../access/anyone'
import { authenticated } from '../access/authenticated'

export const OpeningHours: CollectionConfig = {
  slug: 'opening-hours',
  access: {
    create: authenticated,
    delete: authenticated,
    read: anyone,
    update: authenticated,
  },
  admin: {
    useAsTitle: 'dayRange',
    defaultColumns: ['dayRange', 'openingTime', 'closingTime', 'isClosed'],
  },
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
      required: false,
      admin: {
        date: {
          pickerAppearance: 'timeOnly',
          displayFormat: 'HH:mm',
        },
        condition: (data) => !data.isClosed,
      },
    },
    {
      name: 'closingTime',
      type: 'date',
      required: false,
      admin: {
        date: {
          pickerAppearance: 'timeOnly',
          displayFormat: 'HH:mm',
        },
        condition: (data) => !data.isClosed,
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
}
