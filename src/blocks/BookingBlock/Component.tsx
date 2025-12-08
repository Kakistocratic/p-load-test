import React, { cache } from 'react'
import type { BookingBlock as BookingBlockProps } from '@/payload-types'
import { BookingForm } from './Component.client'
import { getPayload } from 'payload'
import config from '@/payload.config'
import { unstable_cache } from 'next/cache'

const getCachedGlobal = cache(async (slug: 'booking-settings', depth = 0) => {
  const getGlobal = unstable_cache(
    async () => {
      const payload = await getPayload({ config })
      const global = await payload.findGlobal({ slug, depth })
      return global
    },
    [slug],
    {
      tags: [`global_${slug}`],
    },
  )

  return getGlobal()
})

export const BookingBlock: React.FC<BookingBlockProps> = async ({ heading, description }) => {
  // Fetch booking settings
  const bookingSettings = await getCachedGlobal('booking-settings')

  return (
    <div className="max-w-4xl mx-auto px-4 my-16">
      <div>
        {heading && <h2 className="text-4xl font-bold text-center mb-4">{heading}</h2>}
        {description && (
          <p className="text-center text-muted-foreground mb-8 text-lg">{description}</p>
        )}

        <BookingForm bookingSettings={bookingSettings} />
      </div>
    </div>
  )
}
