import React from 'react'
import type { InspirationBlock as InspirationBlockProps } from '@/payload-types'
import { getPayload } from 'payload'
import config from '@/payload.config'
import { InspirationCarousel } from './Component.client'

export const InspirationBlock: React.FC<InspirationBlockProps> = async ({
  heading,
  autoplay,
  autoplayDelay,
}) => {
  const payload = await getPayload({ config })

  // Fetch all inspiration images sorted by order
  const { docs: images } = await payload.find({
    collection: 'inspiration',
    limit: 100,
    sort: 'order',
  })

  if (!images || images.length === 0) {
    return null
  }

  return (
    <div className="my-20">
      {heading && <h2 className="text-4xl font-bold text-center mb-12">{heading}</h2>}
      <InspirationCarousel
        images={images}
        autoplay={autoplay ?? true}
        autoplayDelay={autoplayDelay ?? 4000}
      />
    </div>
  )
}
