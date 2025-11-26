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
    {
      name: 'googleMapsConfig',
      type: 'group',
      label: 'Google Maps Configuration',
      fields: [
        {
          name: 'apiKey',
          type: 'text',
          required: false,
          admin: {
            description: 'Your Google Maps API key (restricted to Maps JavaScript API)',
          },
        },
        {
          name: 'mapId',
          type: 'text',
          required: false,
          admin: {
            description: 'Your Google Map ID',
          },
        },
        {
          name: 'styleIdLight',
          type: 'text',
          required: false,
          admin: {
            description: 'Style ID for light theme (e.g., edc47589a16083b321f5c16d)',
          },
        },
        {
          name: 'styleIdDark',
          type: 'text',
          required: false,
          admin: {
            description: 'Style ID for dark theme (e.g., edc47589a16083b32dbae02f)',
          },
        },
        {
          name: 'latitude',
          type: 'number',
          required: false,
          admin: {
            description: 'Latitude coordinate for the map marker',
            placeholder: '59.9139',
          },
        },
        {
          name: 'longitude',
          type: 'number',
          required: false,
          admin: {
            description: 'Longitude coordinate for the map marker',
            placeholder: '10.7522',
          },
        },
        {
          name: 'zoomLevel',
          type: 'number',
          required: false,
          defaultValue: 15,
          min: 1,
          max: 20,
          admin: {
            description: 'Map zoom level (1-20, default: 15)',
          },
        },
        {
          name: 'markerTitle',
          type: 'text',
          required: false,
          admin: {
            description: 'Title to display on the map marker',
          },
        },
        {
          name: 'placeholderImageDesktop',
          type: 'upload',
          relationTo: 'media',
          required: false,
          admin: {
            description: 'Map placeholder image for desktop (aspect ratio 3:1)',
          },
        },
        {
          name: 'placeholderImageMobile',
          type: 'upload',
          relationTo: 'media',
          required: false,
          admin: {
            description: 'Map placeholder image for mobile (aspect ratio 4:5)',
          },
        },
      ],
    },
  ],
}
