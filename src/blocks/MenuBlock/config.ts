import type { Block } from 'payload'

import { blockSpacing } from '@/fields/blockSpacing'

export const MenuBlock: Block = {
  slug: 'menuBlock',
  interfaceName: 'MenuBlock',
  labels: {
    singular: 'Menu Block',
    plural: 'Menu Blocks',
  },
  fields: [
    blockSpacing,
    {
      name: 'heading',
      type: 'text',
      required: false,
      admin: {
        description: 'Optional heading for the menu section',
      },
    },
    {
      name: 'showFilters',
      type: 'checkbox',
      defaultValue: true,
      admin: {
        description: 'Show category, temperature, and type filters',
      },
    },
  ],
}
