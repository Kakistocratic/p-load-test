import type { GlobalConfig } from 'payload'

import { revalidateContactInfo } from './hooks/revalidateContactInfo'

export const ContactInfo: GlobalConfig = {
  slug: 'contact-info',
  access: {
    read: () => true,
  },
  hooks: {
    afterChange: [revalidateContactInfo],
  },
  fields: [
    {
      name: 'sectionTitle',
      type: 'text',
      required: false,
      defaultValue: 'Contact',
      admin: {
        description: 'The heading to display above contact info (e.g., "Contact", "Kontakt")',
      },
    },
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
