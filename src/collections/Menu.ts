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
      relationTo: 'categories',
      required: true,
      hasMany: false,
      filterOptions: {
        type: {
          equals: 'menu',
        },
      },
      admin: {
        description: 'Select or create a menu category for this item',
      },
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
      name: 'allergens',
      type: 'array',
      required: false,
      admin: {
        description: 'Add allergens associated with this menu item',
        initCollapsed: true,
      },
      fields: [
        {
          name: 'allergen',
          type: 'select',
          required: true,
          options: [
            {
              label: 'Gluten',
              value: 'gluten',
            },
            {
              label: 'Dairy',
              value: 'dairy',
            },
            {
              label: 'Nuts',
              value: 'nuts',
            },
            {
              label: 'Eggs',
              value: 'eggs',
            },
            {
              label: 'Soy',
              value: 'soy',
            },
            {
              label: 'Fish',
              value: 'fish',
            },
            {
              label: 'Shellfish',
              value: 'shellfish',
            },
            {
              label: 'Sesame',
              value: 'sesame',
            },
            {
              label: 'Peanuts',
              value: 'peanuts',
            },
            {
              label: 'Celery',
              value: 'celery',
            },
            {
              label: 'Mustard',
              value: 'mustard',
            },
            {
              label: 'Sulfites',
              value: 'sulfites',
            },
            {
              label: 'Lupin',
              value: 'lupin',
            },
            {
              label: 'Molluscs',
              value: 'molluscs',
            },
          ],
        },
      ],
    },
  ],
}
