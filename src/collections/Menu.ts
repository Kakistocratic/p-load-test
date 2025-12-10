import type { CollectionConfig } from 'payload'

import { revalidateDelete, revalidateMenu } from './Menu/hooks/revalidateMenu'

export const Menu: CollectionConfig = {
  slug: 'menu',
  labels: {
    singular: 'Menu Item',
    plural: 'Menu',
  },
  access: {
    read: () => true,
  },
  hooks: {
    afterChange: [revalidateMenu],
    afterDelete: [revalidateDelete],
  },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'category', 'price', 'updatedAt'],
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      admin: {
        description: 'The name of the menu item',
      },
    },
    {
      name: 'description',
      type: 'textarea',
      required: false,
      admin: {
        description: 'A description of the menu item',
      },
    },
    {
      name: 'price',
      type: 'number',
      required: false,
      min: 0,
      admin: {
        description: 'Base price in NOK',
        step: 0.01,
      },
    },
    {
      name: 'optionalExtras',
      type: 'array',
      required: false,
      admin: {
        description: 'Add optional extras with additional costs (e.g., extra cream, oat milk)',
        initCollapsed: true,
      },
      fields: [
        {
          name: 'label',
          type: 'text',
          required: true,
          admin: {
            description: 'Name of the extra (e.g., "Extra shot", "Oat milk")',
          },
        },
        {
          name: 'price',
          type: 'number',
          required: true,
          min: 0,
          admin: {
            description: 'Additional cost in NOK',
            step: 0.01,
          },
        },
      ],
    },
    {
      name: 'category',
      type: 'relationship',
      relationTo: 'menu-categories',
      required: false, // Temporarily optional during migration
      hasMany: false,
      admin: {
        description: 'Select or create a menu category for this item',
      },
    },
    {
      name: 'type',
      type: 'select',
      required: true,
      options: [
        {
          label: 'Drikke',
          value: 'drink',
        },
        {
          label: 'Mat',
          value: 'food',
        },
      ],
      admin: {
        description: 'Is this a drink or food item?',
      },
      defaultValue: 'food',
    },
    {
      name: 'temperature',
      type: 'select',
      required: false,
      options: [
        {
          label: 'Varm',
          value: 'varm',
        },
        {
          label: 'Kald',
          value: 'kald',
        },
        {
          label: 'Romtemperatur',
          value: 'romtemperatur',
        },
        {
          label: 'Begge',
          value: 'begge',
        },
      ],
      admin: {
        description: 'Is this item served hot, cold, room temperature, or both?',
      },
    },
    {
      name: 'isWine',
      type: 'checkbox',
      required: false,
      admin: {
        description: 'Check if this is a wine drink',
        position: 'sidebar',
      },
      defaultValue: false,
    },
    {
      name: 'wineLabel',
      type: 'text',
      required: false,
      admin: {
        description: 'Wine type or grape variety (e.g., "Pinot Noir", "Chardonnay")',
        condition: (data) => data.isWine === true,
      },
    },
    {
      name: 'bottlePrice',
      type: 'number',
      required: false,
      min: 0,
      admin: {
        description: 'Price per bottle in NOK (optional)',
        step: 0.01,
        condition: (data) => data.isWine === true,
      },
    },
    {
      name: 'isBeer',
      type: 'checkbox',
      required: false,
      admin: {
        description: 'Check if this is a beer drink',
        position: 'sidebar',
      },
      defaultValue: false,
    },
    {
      name: 'beerLabel',
      type: 'text',
      required: false,
      admin: {
        description: 'Beer type or style (e.g., "IPA", "Lager", "Stout")',
        condition: (data) => data.isBeer === true,
      },
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      required: false,
      admin: {
        description: 'Upload an image for this menu item',
      },
    },
    {
      name: 'noImage',
      type: 'checkbox',
      required: false,
      admin: {
        description: 'Check this if the item should not display with an image (compact layout)',
        position: 'sidebar',
      },
      defaultValue: false,
    },
    {
      name: 'allergens',
      type: 'relationship',
      relationTo: 'allergens',
      hasMany: true,
      required: false,
      admin: {
        description: 'Select allergens associated with this menu item',
      },
    },
    {
      name: 'ingredients',
      type: 'relationship',
      relationTo: 'ingredients',
      hasMany: true,
      required: false,
      admin: {
        description: 'Select ingredients for this menu item',
      },
    },
  ],
}
