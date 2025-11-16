import React from 'react'
import type { FeaturedMenuBlock as FeaturedMenuBlockProps } from '@/payload-types'
import { getPayload } from 'payload'
import config from '@/payload.config'
import { MenuCard } from '@/components/MenuCard'

export const FeaturedMenuBlock: React.FC<FeaturedMenuBlockProps> = async ({
  heading,
  menuItems,
}) => {
  // If menuItems are already populated objects, use them directly
  // Otherwise fetch them
  let items = menuItems

  if (menuItems && menuItems.length > 0 && typeof menuItems[0] === 'number') {
    const payload = await getPayload({ config })
    const { docs } = await payload.find({
      collection: 'menu',
      where: {
        id: {
          in: menuItems as number[],
        },
      },
      depth: 2,
      limit: menuItems.length,
    })
    items = docs
  }

  if (!items || items.length === 0) {
    return null
  }

  return (
    <div className="container my-16">
      {heading && <h2 className="text-4xl font-bold text-center mb-12">{heading}</h2>}

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {items.map((item) => {
          if (typeof item === 'object' && item !== null) {
            return <MenuCard key={item.id} item={item} />
          }
          return null
        })}
      </div>
    </div>
  )
}
