import { getCachedGlobal } from '@/utilities/getGlobals'
import React from 'react'

import type { Footer, OpeningHour, ContactInfo } from '@/payload-types'

import { FooterClient } from './Component.client'

export async function Footer() {
  // Temporarily disabled for debugging
  return <footer className="bg-black text-white py-4">Footer disabled for debugging</footer>

  /*
  let footerData: Footer | null = null
  let openingHoursData: OpeningHour | null = null
  let contactData: ContactInfo | null = null

  try {
    footerData = await getCachedGlobal('footer', 1)()
  } catch (error) {
    console.error('Error fetching footer data:', error)
  }

  try {
    openingHoursData = await getCachedGlobal('opening-hours', 1)()
  } catch (error) {
    console.error('Error fetching opening hours data:', error)
  }

  try {
    contactData = await getCachedGlobal('contact-info', 1)()
  } catch (error) {
    console.error('Error fetching contact info data:', error)
  }

  return (
    <FooterClient
      footerData={footerData}
      openingHoursData={openingHoursData}
      contactData={contactData}
    />
  )
  */
}
