import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload'

import { revalidatePath, revalidateTag } from 'next/cache'

import type { Menu } from '../../../payload-types'

export const revalidateMenu: CollectionAfterChangeHook<Menu> = ({
  doc,
  req: { payload, context },
}) => {
  if (!context.disableRevalidate) {
    payload.logger.info(`Revalidating menu item: ${doc.name}`)

    // Revalidate all pages that might display menu items
    // This ensures MenuBlock and FeaturedMenuBlock components get fresh data
    revalidatePath('/', 'layout')
    revalidateTag('menu-items')

    payload.logger.info('Menu revalidation complete')
  }
  return doc
}

export const revalidateDelete: CollectionAfterDeleteHook<Menu> = ({
  doc,
  req: { payload, context },
}) => {
  if (!context.disableRevalidate) {
    payload.logger.info(`Revalidating after menu item deletion: ${doc?.name}`)

    // Revalidate all pages that might display menu items
    revalidatePath('/', 'layout')
    revalidateTag('menu-items')

    payload.logger.info('Menu deletion revalidation complete')
  }

  return doc
}
