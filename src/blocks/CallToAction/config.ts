import type { Block } from 'payload'

import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

import { blockSpacing } from '@/fields/blockSpacing'
import { linkGroup } from '../../fields/linkGroup'

export const CallToAction: Block = {
  slug: 'cta',
  interfaceName: 'CallToActionBlock',
  fields: [
    blockSpacing,
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
      appearances: ['default', 'outline'],
      overrides: {
        maxRows: 2,
      },
    }),
    {
      name: 'media',
      type: 'group',
      fields: [
        {
          name: 'landscape',
          type: 'upload',
          label: 'Landscape Image',
          admin: {
            description: 'Image used for wide screens (landscape orientation, 3:1 aspect ratio)',
          },
          relationTo: 'media',
        },
        {
          name: 'portrait',
          type: 'upload',
          label: 'Portrait Image (Optional)',
          admin: {
            description:
              'Optional image for narrow screens (portrait/mobile, 4:5 aspect ratio). If not provided, landscape image will be used.',
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
      label: 'Background Image',
    },
  ],
  labels: {
    plural: 'Calls to Action',
    singular: 'Call to Action',
  },
}
