import type { Block } from 'payload'

import { blockSpacing } from '@/fields/blockSpacing'

export const BookingBlock: Block = {
  slug: 'bookingBlock',
  interfaceName: 'BookingBlock',
  labels: {
    singular: 'Bordreservasjon',
    plural: 'Bordreservasjoner',
  },
  fields: [
    blockSpacing,
    {
      name: 'heading',
      type: 'text',
      label: 'Overskrift',
      defaultValue: 'Reserver bord',
      required: true,
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Beskrivelse',
      admin: {
        description: 'Kort beskrivelse som vises over bookingskjemaet',
      },
    },
  ],
}
