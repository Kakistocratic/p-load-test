import type { GlobalConfig } from 'payload'

import { link } from '@/fields/link'
import { revalidateHeader } from './hooks/revalidateHeader'
import { generateLogoInlineData } from './hooks/generateLogoInlineData'

export const Header: GlobalConfig = {
  slug: 'header',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'logoLight',
      type: 'upload',
      relationTo: 'media',
      required: false,
      admin: {
        description: 'Upload a logo for light mode. Recommended size: 170x130px',
      },
    },
    {
      name: 'logoDark',
      type: 'upload',
      relationTo: 'media',
      required: false,
      admin: {
        description: 'Upload a logo for dark mode. Recommended size: 170x130px',
      },
    },
    {
      name: 'navItems',
      type: 'array',
      fields: [
        link({
          appearances: false,
        }),
      ],
      maxRows: 6,
      admin: {
        initCollapsed: true,
        components: {
          RowLabel: '@/Header/RowLabel#RowLabel',
        },
      },
    },
    {
      name: 'showSocialMedia',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        description: 'Show Facebook and Instagram icons in the header (fetched from Contact Info)',
        position: 'sidebar',
      },
    },
    {
      name: 'bookingButton',
      type: 'group',
      admin: {
        description: 'Optional booking button that appears in the header after social media icons',
        position: 'sidebar',
      },
      fields: [
        {
          name: 'enabled',
          type: 'checkbox',
          defaultValue: false,
          admin: {
            description: 'Show booking button in header',
          },
        },
        {
          name: 'label',
          type: 'text',
          required: false,
          admin: {
            description: 'Button text (e.g., "Book a Table", "Reservasjon")',
            placeholder: 'Book a Table',
          },
        },
        link({
          appearances: false,
          disableLabel: true,
        }),
      ],
    },
  ],
  hooks: {
    afterChange: [generateLogoInlineData, revalidateHeader],
  },
}
