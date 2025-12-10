import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload'

import { revalidatePath, revalidateTag } from 'next/cache'

import type { MenuCategory } from '../../../payload-types'

export const revalidateMenuCategory: CollectionAfterChangeHook<MenuCategory> = ({
  doc,
  req: { payload, context },
}) => {
  if (!context.disableRevalidate) {
    payload.logger.info(`Revalidating menu category: ${doc.name}`)

    // Revalidate all pages that display menu items
    // Category changes affect menu item ordering and organization
    revalidatePath('/', 'layout')
    revalidateTag('menu-items')
    revalidateTag('menu-categories')

    payload.logger.info('Menu category revalidation complete')
  }
  return doc
}

export const revalidateDelete: CollectionAfterDeleteHook<MenuCategory> = ({
  doc,
  req: { payload, context },
}) => {
  if (!context.disableRevalidate) {
    payload.logger.info(`Revalidating after menu category deletion: ${doc?.name}`)

    // Revalidate all pages that display menu items
    revalidatePath('/', 'layout')
    revalidateTag('menu-items')
    revalidateTag('menu-categories')

    payload.logger.info('Menu category deletion revalidation complete')
  }

  return doc
}
