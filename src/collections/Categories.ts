import type { CollectionConfig } from 'payload'

import { anyone } from '../access/anyone'
import { authenticated } from '../access/authenticated'
import { slugField } from '@/fields/slug'

export const Categories: CollectionConfig = {
  slug: 'categories',
  access: {
    create: authenticated,
    delete: authenticated,
    read: anyone,
    update: authenticated,
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'type', 'updatedAt'],
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'type',
      type: 'select',
      required: true,
      options: [
        {
          label: 'Post Category',
          value: 'post',
        },
        {
          label: 'Menu Category',
          value: 'menu',
        },
        {
          label: 'Product Category',
          value: 'product',
        },
      ],
      admin: {
        description: 'What type of content does this category apply to?',
        position: 'sidebar',
      },
      defaultValue: 'post',
    },
    ...slugField(),
  ],
}
