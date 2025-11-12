import type { CollectionConfig } from 'payload'

export const Menu: CollectionConfig = {
  slug: 'menu',
  labels: {
    singular: 'Menu Item',
    plural: 'Menu',
  },
  access: {
    read: () => true,
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
      required: true,
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
          label: 'Begge',
          value: 'begge',
        },
      ],
      admin: {
        description: 'Is this item served hot, cold, or both?',
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
