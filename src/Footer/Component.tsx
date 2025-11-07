import { getCachedGlobal } from '@/utilities/getGlobals'
import Link from 'next/link'
import React from 'react'
import configPromise from '@payload-config'
import { getPayload } from 'payload'

import type { Footer, OpeningHour } from '@/payload-types'

import { ThemeSelector } from '@/providers/Theme/ThemeSelector'
import { CMSLink } from '@/components/Link'
import { Logo } from '@/components/Logo/Logo'
import { Media } from '@/components/Media'

export async function Footer() {
  const footerData: Footer = await getCachedGlobal('footer', 1)()
  const payload = await getPayload({ config: configPromise })

  // Fetch opening hours
  const { docs: openingHours } = await payload.find({
    collection: 'opening-hours',
    limit: 100,
  })

  const navItems = footerData?.navItems || []

  // Helper function to format time in Norwegian format
  const formatTime = (timeString: string | null | undefined) => {
    if (!timeString) return ''
    const date = new Date(timeString)
    return date.toLocaleTimeString('nb-NO', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    })
  }

  return (
    <footer className="mt-auto border-t border-border bg-black dark:bg-card text-white">
      <div className="container py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Logo Column */}
          <div className="flex items-start">
            <Link className="flex items-center" href="/">
              {footerData?.logo && typeof footerData.logo === 'object' ? (
                <Media
                  resource={footerData.logo}
                  imgClassName="max-w-[170px] max-h-[130px] w-auto h-auto"
                />
              ) : (
                <Logo />
              )}
            </Link>
          </div>

          {/* Navigation Column */}
          <div className="flex flex-col">
            <h3 className="text-lg font-semibold mb-4">Menu</h3>
            <nav className="flex flex-col gap-2">
              {navItems.map(({ link }, i) => {
                return <CMSLink className="text-white hover:text-gray-300" key={i} {...link} />
              })}
            </nav>
          </div>

          {/* Opening Hours Column */}
          <div className="flex flex-col">
            <h3 className="text-lg font-semibold mb-4">Opening Hours</h3>
            <div className="flex flex-col gap-3">
              {openingHours.map((hours: OpeningHour) => (
                <div key={hours.id} className="opening-hours-item flex gap-3">
                  <div className="clock-icon flex-shrink-0 w-5 h-5 mt-0.5" aria-hidden="true"></div>
                  <div className="flex flex-col">
                    <div className="font-medium">{hours.dayRange}</div>
                    <div className="text-sm text-gray-300">
                      {hours.isClosed
                        ? 'Closed'
                        : `${formatTime(hours.openingTime)} - ${formatTime(hours.closingTime)}`}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Contact Info Column */}
          <div className="flex flex-col">
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            {/* Contact info will be added later */}
          </div>
        </div>

        {/* Bottom Theme Selector */}
        <div className="flex items-start pt-8 border-t border-gray-700">
          <ThemeSelector />
        </div>
      </div>
    </footer>
  )
}
