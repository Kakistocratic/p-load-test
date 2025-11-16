import type { CollectionConfig } from 'payload'

export const Inspiration: CollectionConfig = {
  slug: 'inspiration',
  labels: {
    singular: 'Inspirasjonsbilde',
    plural: 'Inspirasjon',
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'image', 'order'],
    listSearchableFields: ['title'],
    // Enable drag and drop for ordering
    pagination: {
      defaultLimit: 50,
    },
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'Tittel',
      admin: {
        description: 'En beskrivende tittel for bildet (vises ikke på frontend)',
      },
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      required: true,
      label: 'Bilde',
      admin: {
        description: 'Bildet som vises i karusellen',
      },
    },
    {
      name: 'altText',
      type: 'text',
      label: 'Alt-tekst',
      admin: {
        description: 'Alternativ tekst for bildet (tilgjengelighet)',
      },
    },
    {
      name: 'order',
      type: 'number',
      required: true,
      defaultValue: 0,
      label: 'Rekkefølge',
      admin: {
        description: 'Rekkefølgen bildet vises i karusellen',
        position: 'sidebar',
      },
    },
  ],
}
