import type { Block } from 'payload'

import { blockSpacing } from '@/fields/blockSpacing'

export const InspirationBlock: Block = {
  slug: 'inspirationBlock',
  interfaceName: 'InspirationBlock',
  labels: {
    singular: 'Inspirasjonsgalleri',
    plural: 'Inspirasjonsgallerier',
  },
  fields: [
    blockSpacing,
    {
      name: 'heading',
      type: 'text',
      label: 'Overskrift',
      admin: {
        description: 'Valgfri overskrift over galleriet',
      },
    },
    {
      name: 'autoplay',
      type: 'checkbox',
      label: 'Automatisk avspilling',
      defaultValue: true,
      admin: {
        description: 'Skal karusellen automatisk bla gjennom bildene?',
      },
    },
    {
      name: 'autoplayDelay',
      type: 'number',
      label: 'Forsinkelse (ms)',
      defaultValue: 4000,
      min: 1000,
      max: 10000,
      admin: {
        description: 'Tid mellom hvert bilde i millisekunder',
        condition: (_, siblingData) => siblingData?.autoplay === true,
      },
    },
  ],
}
