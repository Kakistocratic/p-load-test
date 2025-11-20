import type { GlobalConfig } from 'payload'

import { link } from '@/fields/link'
import { revalidateFooter } from './hooks/revalidateFooter'

export const Footer: GlobalConfig = {
  slug: 'footer',
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
          RowLabel: '@/Footer/RowLabel#RowLabel',
        },
      },
    },
  ],
  hooks: {
    afterChange: [revalidateFooter],
  },
}
