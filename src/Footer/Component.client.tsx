'use client'

import { useTheme } from '@/providers/Theme'
import Link from 'next/link'
import React from 'react'

import type { Footer, OpeningHour, ContactInfo } from '@/payload-types'

import { ThemeSelector } from '@/providers/Theme/ThemeSelector'
import { CMSLink } from '@/components/Link'
import { Logo } from '@/components/Logo/Logo'
import { Media } from '@/components/Media'

interface FooterClientProps {
  footerData: Footer | null
  openingHoursData: OpeningHour | null
  contactData: ContactInfo | null
}

export function FooterClient({ footerData, openingHoursData, contactData }: FooterClientProps) {
  const { theme: currentTheme } = useTheme()

  const navItems = footerData?.navItems || []
  const openingHoursTitle = openingHoursData?.sectionTitle || 'Opening Hours'
  const contactTitle = contactData?.sectionTitle || 'Contact'

  // Select the appropriate logo based on the current theme
  const currentLogo = currentTheme === 'dark' ? footerData?.logoDark : footerData?.logoLight
  const hasLogo = currentLogo && typeof currentLogo === 'object'

  // Helper function to format time - using simple string manipulation to avoid locale issues
  const formatTime = (timeString: string | null | undefined) => {
    if (!timeString) return ''
    // Extract HH:MM from ISO string or time string
    const timeMatch = timeString.match(/(\d{2}):(\d{2})/)
    if (timeMatch) {
      return `${timeMatch[1]}:${timeMatch[2]}`
    }
    return timeString
  }

  return (
    <footer className="mt-auto border-t border-border bg-secondary dark:bg-tertiary text-white">
      <div className="container py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-8 mb-8">
          {/* Empty cell on left for tablet */}
          <div className="hidden md:block xl:hidden"></div>

          {/* Logo Column - centered on mobile, middle on tablet, first column on desktop */}
          <div className="flex items-start justify-center xl:justify-start xl:col-start-1 xl:row-start-1">
            <Link className="flex items-center" href="/">
              <div className="w-[230px] h-auto">
                {hasLogo ? <Media resource={currentLogo} imgClassName="w-auto h-auto" /> : <Logo />}
              </div>
            </Link>
          </div>

          {/* Empty cell on right for tablet */}
          <div className="hidden md:block xl:hidden"></div>

          {/* Navigation Column */}
          <div className="flex flex-col md:ml-0">
            <h3 className="text-4xl font-semibold mb-5 text-background dark:text-primary text-center md:text-left">
              Sidekart
            </h3>
            <nav className="flex flex-col ml-20 md:ml-0 gap-2">
              {navItems.map(({ link }, i) => {
                return (
                  <CMSLink
                    className="text-background text-xl dark:text-primary hover:text-gray-300"
                    key={i}
                    {...link}
                  />
                )
              })}
            </nav>
          </div>

          {/* Opening Hours Column */}
          <div className="flex flex-col md:ml-0">
            <h3 className="text-4xl font-semibold mb-5 text-background dark:text-primary text-center md:text-left">
              {openingHoursTitle}
            </h3>
            <div className="flex flex-col gap-3">
              {openingHoursData?.hours && openingHoursData.hours.length > 0 ? (
                openingHoursData.hours.map((hours, index) => (
                  <div key={index} className="opening-hours-item flex gap-3 ml-20 md:ml-0">
                    <div
                      className="clock-icon flex-shrink-0 w-5 h-5 mt-0.5"
                      aria-hidden="true"
                    ></div>
                    <div className="flex flex-col">
                      <div className="text-lg font-medium text-background dark:text-primary">
                        {hours.dayRange}
                      </div>
                      <div className="text-lg text-background dark:text-primary">
                        {hours.isClosed
                          ? 'Closed'
                          : `${formatTime(hours.openingTime)} - ${formatTime(hours.closingTime)}`}
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-sm text-background dark:text-primary">
                  No opening hours available
                </p>
              )}
            </div>
          </div>

          {/* Contact Info Column */}
          <div className="flex flex-col md:ml-0">
            <h3 className="text-4xl font-semibold mb-5 text-background dark:text-primary text-center md:text-left">
              {contactTitle}
            </h3>
            {contactData && (
              <div className="flex flex-col ml-20 md:ml-0 gap-2">
                {/* Address */}
                {(contactData.streetAddress || contactData.city || contactData.postalCode) && (
                  <div className="mb-2">
                    <span className="text-lg font-bold text-background dark:text-primary">
                      {[contactData.streetAddress, contactData.postalCode, contactData.city]
                        .filter(Boolean)
                        .join(', ')}
                    </span>
                  </div>
                )}

                {/* Phone */}
                {contactData.phoneNumber && (
                  <div className="flex gap-2 flex-wrap items-center">
                    <span className="text-lg whitespace-nowrap text-background dark:text-primary">
                      Telefon:
                    </span>
                    <a
                      href={`tel:${contactData.phoneNumber}`}
                      className="text-lg font-bold text-background dark:text-primary hover:text-foreground whitespace-nowrap"
                    >
                      {contactData.phoneNumber}
                    </a>
                  </div>
                )}

                {/* Email */}
                {contactData.email && (
                  <div className="flex gap-2 flex-wrap items-center">
                    <span className="text-lg whitespace-nowrap text-background dark:text-primary">
                      E-post:
                    </span>
                    <a
                      href={`mailto:${contactData.email}`}
                      className="text-lg font-bold text-background dark:text-primary hover:text-foreground whitespace-nowrap"
                    >
                      {contactData.email}
                    </a>
                  </div>
                )}

                {/* Social Media Icons */}
                {(contactData.facebookUrl || contactData.instagramUrl) && (
                  <div className="flex gap-4 mt-4">
                    {contactData.facebookUrl && (
                      <a
                        href={contactData.facebookUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:opacity-80 transition-opacity text-background dark:text-primary"
                        aria-label="Facebook"
                      >
                        <svg
                          className="w-6 h-6 fill-current"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                        </svg>
                      </a>
                    )}
                    {contactData.instagramUrl && (
                      <a
                        href={contactData.instagramUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-background dark:text-primary hover:opacity-80 transition-opacity"
                        aria-label="Instagram"
                      >
                        <svg
                          className="w-6 h-6 fill-current"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                        </svg>
                      </a>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Bottom Theme Selector */}
        <div className="flex items-start pt-8">
          <ThemeSelector />
        </div>
      </div>
    </footer>
  )
}
