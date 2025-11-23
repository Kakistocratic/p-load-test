import type { Field } from 'payload'

import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

import { linkGroup } from '@/fields/linkGroup'

export const hero: Field = {
  name: 'hero',
  type: 'group',
  fields: [
    {
      name: 'type',
      type: 'select',
      defaultValue: 'lowImpact',
      label: 'Type',
      options: [
        {
          label: 'None',
          value: 'none',
        },
        {
          label: 'High Impact',
          value: 'highImpact',
        },
        {
          label: 'Medium Impact',
          value: 'mediumImpact',
        },
        {
          label: 'Logo Medium Impact',
          value: 'logoMediumImpact',
        },
        {
          label: 'Low Impact',
          value: 'lowImpact',
        },
      ],
      required: true,
    },
    {
      name: 'richText',
      type: 'richText',
      editor: lexicalEditor({
        features: ({ rootFeatures }) => {
          return [
            ...rootFeatures,
            HeadingFeature({ enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4'] }),
            FixedToolbarFeature(),
            InlineToolbarFeature(),
          ]
        },
      }),
      label: false,
    },
    linkGroup({
      appearances: ['default', 'outline', 'secondary', 'ghost', 'destructive'],
      overrides: {
        maxRows: 2,
      },
    }),
    {
      name: 'media',
      type: 'group',
      admin: {
        condition: (_, { type } = {}) =>
          ['highImpact', 'mediumImpact', 'logoMediumImpact'].includes(type),
      },
      fields: [
        {
          name: 'landscape',
          type: 'upload',
          label: 'Landscape Image',
          admin: {
            description: 'Image used for wide screens (landscape orientation)',
          },
          relationTo: 'media',
          required: true,
        },
        {
          name: 'portrait',
          type: 'upload',
          label: 'Portrait Image (Optional)',
          admin: {
            description:
              'Optional image for narrow screens (portrait/mobile). If not provided, landscape image will be used.',
          },
          relationTo: 'media',
        },
        {
          name: 'overlayOpacity',
          type: 'number',
          label: 'Overlay Opacity',
          admin: {
            description:
              'Dark overlay opacity between image and text (0-1). Default is 0.15 (15% opaque). Higher values make text more readable.',
            step: 0.05,
          },
          defaultValue: 0.15,
          min: 0,
          max: 1,
        },
      ],
      label: 'Hero Images',
    },
    {
      name: 'logo',
      type: 'upload',
      label: 'Logo',
      admin: {
        condition: (_, { type } = {}) => type === 'logoMediumImpact',
        description: 'Logo to display centered in the hero',
      },
      relationTo: 'media',
    },
  ],
  label: false,
}
