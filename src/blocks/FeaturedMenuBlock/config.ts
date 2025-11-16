import type { Block } from 'payload'

export const FeaturedMenuBlock: Block = {
  slug: 'featuredMenuBlock',
  interfaceName: 'FeaturedMenuBlock',
  labels: {
    singular: 'Utvalgte Menyprodukter',
    plural: 'Utvalgte Menyprodukter',
  },
  fields: [
    {
      name: 'heading',
      type: 'text',
      label: 'Overskrift',
      defaultValue: 'Utvalgte produkter',
      admin: {
        description: 'Overskrift som vises over produktene',
      },
    },
    {
      name: 'menuItems',
      type: 'relationship',
      relationTo: 'menu',
      hasMany: true,
      required: true,
      label: 'Menyprodukter',
      admin: {
        description: 'Velg menyprodukter som skal vises',
      },
    },
  ],
}
