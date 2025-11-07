import type { CollectionConfig } from 'payload'

import { anyone } from '../access/anyone'
import { authenticated } from '../access/authenticated'

export const ContactInfo: CollectionConfig = {
  slug: 'contact-info',
  access: {
    create: authenticated,
    delete: authenticated,
    read: anyone,
    update: authenticated,
  },
  admin: {
    useAsTitle: 'phoneNumber',
    defaultColumns: ['phoneNumber', 'email', 'city'],
  },
  fields: [
    {
      name: 'phoneNumber',
      type: 'text',
      required: false,
      admin: {
        placeholder: '+47 123 45 678',
      },
    },
    {
      name: 'email',
      type: 'email',
      required: false,
    },
    {
      name: 'facebookUrl',
      type: 'text',
      required: false,
      admin: {
        placeholder: 'https://facebook.com/your-page',
      },
    },
    {
      name: 'instagramUrl',
      type: 'text',
      required: false,
      admin: {
        placeholder: 'https://instagram.com/your-account',
      },
    },
    {
      name: 'streetAddress',
      type: 'text',
      required: false,
    },
    {
      name: 'city',
      type: 'text',
      required: false,
    },
    {
      name: 'postalCode',
      type: 'text',
      required: false,
    },
  ],
}
