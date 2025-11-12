import React from 'react'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { MenuBlockComponent } from './Component.client'

interface MenuBlockProps {
  heading?: string | null
  showFilters?: boolean | null
  id?: string
  blockName?: string
  blockType: 'menuBlock'
}

export const MenuBlock: React.FC<MenuBlockProps> = async (props) => {
  const { heading, showFilters } = props
  const payload = await getPayload({ config: configPromise })

  // Fetch all menu items with populated relationships
  const { docs: menuItems } = await payload.find({
    collection: 'menu',
    depth: 2,
    limit: 1000,
    sort: 'category.order',
  })

  return <MenuBlockComponent menuItems={menuItems} heading={heading} showFilters={showFilters} />
}
