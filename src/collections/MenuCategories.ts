import type { CollectionConfig } from 'payload'

import { anyone } from '../access/anyone'
import { authenticated } from '../access/authenticated'

export const MenuCategories: CollectionConfig = {
  slug: 'menu-categories',
  labels: {
    singular: 'Menu Category',
    plural: 'Menu Categories',
  },
  access: {
    create: authenticated,
    delete: authenticated,
    read: anyone,
    update: authenticated,
  },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'order', 'updatedAt'],
  },
  defaultSort: 'order',
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      admin: {
        description: 'Category name (e.g., Kaffe, Te, Alkohol)',
      },
    },
    {
      name: 'parent',
      type: 'relationship',
      relationTo: 'menu-categories',
      hasMany: false,
      required: false,
      admin: {
        description: 'Parent category (leave empty for top-level categories)',
      },
    },
    {
      name: 'order',
      type: 'number',
      required: true,
      admin: {
        description: 'Display order within parent (lower numbers appear first)',
        step: 1,
      },
      defaultValue: 0,
    },
  ],
}
