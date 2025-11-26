import type { Block } from 'payload'

export const MapBlock: Block = {
  slug: 'mapBlock',
  interfaceName: 'MapBlock',
  labels: {
    singular: 'Map Block',
    plural: 'Map Blocks',
  },
  fields: [
    {
      name: 'blockTitle',
      type: 'text',
      required: false,
      admin: {
        description: 'Optional title to display above the map',
      },
    },
    {
      name: 'height',
      type: 'select',
      required: false,
      defaultValue: 'medium',
      options: [
        {
          label: 'Small (300px)',
          value: 'small',
        },
        {
          label: 'Medium (450px)',
          value: 'medium',
        },
        {
          label: 'Large (600px)',
          value: 'large',
        },
      ],
      admin: {
        description: 'Height of the map',
      },
    },
    {
      name: 'enableGutter',
      type: 'checkbox',
      label: 'Enable Container Padding',
      defaultValue: true,
      admin: {
        description: 'Add container padding around the map',
      },
    },
  ],
}
