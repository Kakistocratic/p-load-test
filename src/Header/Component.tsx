import { getCachedGlobal } from '@/utilities/getGlobals'
import React from 'react'
import dynamic from 'next/dynamic'

import type { Header, ContactInfo } from '@/payload-types'

const HeaderClient = dynamic(() => import('./Component.client').then(mod => ({ default: mod.HeaderClient })), {
  ssr: false,
  loading: () => <header className="w-full sticky top-0 z-20 h-20" />
})

export async function Header() {
  let headerData: Header | null = null
  let contactData: ContactInfo | null = null

  try {
    headerData = await getCachedGlobal('header', 1)()

    // Fetch contact info if showSocialMedia is enabled
    if (headerData?.showSocialMedia) {
      contactData = await getCachedGlobal('contact-info', 1)()
    }
  } catch (error) {
    console.error('Error fetching header data:', error)
  }

  if (!headerData) {
    return null
  }

  return <HeaderClient data={headerData} contactData={contactData} />
}
