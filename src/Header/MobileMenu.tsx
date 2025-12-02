'use client'

import type { Header, ContactInfo } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import { Sheet, SheetClose, SheetPortal, SheetTrigger } from '@/components/ui/sheet'
import * as SheetPrimitive from '@radix-ui/react-dialog'
import { cn } from '@/utilities/ui'
import { MenuIcon, XIcon } from 'lucide-react'
import { usePathname, useSearchParams } from 'next/navigation'
import React, { Suspense, useEffect, useState } from 'react'
import { useTheme } from '@/providers/Theme'
import { ThemeSelector } from '@/providers/Theme/ThemeSelector'
import { Media } from '@/components/Media'
import { Logo } from '@/components/Logo/Logo'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

// Simple VisuallyHidden component for accessibility
const VisuallyHidden: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <span className="sr-only">{children}</span>
)

interface Props {
  menu: Header['navItems']
  atTop: boolean
  heroBackground: 'dark' | 'light' | null
  headerData: Header
  scrolled: boolean
  contactData?: ContactInfo | null
}

function MobileMenuContent({
  menu,
  atTop,
  heroBackground,
  headerData,
  scrolled,
  contactData,
}: Props) {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [isOpen, setIsOpen] = useState(false)
  const { theme: currentTheme } = useTheme()

  const closeMobileMenu = () => setIsOpen(false)

  // Dynamic dimensions matching the main header
  const logoWidth = scrolled ? 90 : 130
  const logoHeight = scrolled ? 64 : 92
  const headerHeight = scrolled ? 66 : 94

  const showSocialMedia = headerData?.showSocialMedia || false

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 1024) {
        setIsOpen(false)
      }
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [isOpen])

  useEffect(() => {
    setIsOpen(false)
  }, [pathname, searchParams])

  // Theme-based colors for burger menu button (outside the overlay)
  const textColorClass = atTop && heroBackground === 'dark' ? 'text-header-light' : 'text-primary'
  const borderColorClass =
    atTop && heroBackground === 'dark' ? 'border-header-light' : 'border-primary'

  // Logo logic for mobile menu - only based on theme, not scroll
  // In dark theme, show dark logo; in light theme, show light logo
  const shouldShowDarkLogo = currentTheme === 'dark'
  const currentLogo = shouldShowDarkLogo ? headerData?.logoDark : headerData?.logoLight
  const hasLogo = currentLogo && typeof currentLogo === 'object'
  const hasBothLogos =
    headerData?.logoDark &&
    typeof headerData.logoDark === 'object' &&
    headerData?.logoLight &&
    typeof headerData.logoLight === 'object'

  return (
    <Sheet onOpenChange={setIsOpen} open={isOpen}>
      <SheetTrigger
        className={cn(
          'relative flex h-11 w-11 items-center justify-center rounded-md transition-colors',
          textColorClass,
          borderColorClass,
        )}
      >
        <MenuIcon className="h-4" />
      </SheetTrigger>

      <SheetPortal>
        {/* Custom overlay with opacity animation - z-30 to be above header (z-20) */}
        <SheetPrimitive.Overlay
          className={cn(
            'fixed inset-0 z-30 bg-black/80',
            'data-[state=open]:animate-in data-[state=closed]:animate-out',
            'data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
            'data-[state=open]:duration-300 data-[state=closed]:duration-200',
          )}
        />
        {/* Full-screen content with opacity animation - z-30 to be above header (z-20) */}
        <SheetPrimitive.Content
          className={cn(
            'fixed inset-0 z-30 flex flex-col',
            'bg-background',
            'data-[state=open]:animate-in data-[state=closed]:animate-out',
            'data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
            'data-[state=open]:duration-300 data-[state=closed]:duration-200',
          )}
        >
          {/* Visually hidden title for accessibility */}
          <VisuallyHidden>
            <SheetPrimitive.Title>Mobile Navigation Menu</SheetPrimitive.Title>
          </VisuallyHidden>
          <VisuallyHidden>
            <SheetPrimitive.Description>
              Main navigation menu with links to different sections
            </SheetPrimitive.Description>
          </VisuallyHidden>

          {/* Top section matching header height with logo and close button */}
          <div
            className="container flex justify-between items-center my-1 transition-all duration-300"
            style={{ height: `${headerHeight}px` }}
          >
            <Link href="/" onClick={closeMobileMenu}>
              {hasBothLogos ? (
                <div
                  className="relative transition-all duration-300"
                  style={{
                    width: `${logoWidth}px`,
                    height: `${logoHeight}px`,
                  }}
                >
                  <Media
                    resource={headerData.logoDark}
                    imgClassName={cn(
                      'absolute inset-0 transition-opacity duration-300',
                      shouldShowDarkLogo ? 'opacity-100 z-10' : 'opacity-0 z-0',
                    )}
                    priority
                  />
                  <Media
                    resource={headerData.logoLight}
                    imgClassName={cn(
                      'absolute inset-0 transition-opacity duration-300',
                      shouldShowDarkLogo ? 'opacity-0 z-0' : 'opacity-100 z-10',
                    )}
                    priority
                  />
                </div>
              ) : hasLogo ? (
                <div
                  className="transition-all duration-300"
                  style={{
                    width: `${logoWidth}px`,
                    height: `${logoHeight}px`,
                  }}
                >
                  <Media
                    resource={currentLogo}
                    imgClassName="w-full h-full transition-all duration-300"
                    priority
                  />
                </div>
              ) : (
                <Logo
                  loading="eager"
                  priority="high"
                  className={cn('invert dark:invert-0', 'transition-all duration-300')}
                />
              )}
            </Link>
            <SheetClose
              className={cn(
                'flex h-11 w-11 items-center justify-center rounded-md border-2 transition-colors',
                'text-primary border-primary hover:opacity-80',
              )}
            >
              <XIcon className="h-4" />
              <span className="sr-only">Close</span>
            </SheetClose>
          </div>

          {/* Menu content */}
          <div className="container flex-1 overflow-y-auto py-8 flex flex-col items-center justify-start">
            {menu?.length ? (
              <ul className="flex w-full flex-col gap-6 items-center">
                {menu.map((item, index) => (
                  <li key={item?.id || `menu-item-${index}`}>
                    {item?.link && (
                      <CMSLink
                        {...item.link}
                        appearance="link"
                        className="text-3xl font-medium text-primary hover:opacity-80 transition-opacity"
                      />
                    )}
                  </li>
                ))}
              </ul>
            ) : null}

            {/* Social Media Icons */}
            {showSocialMedia && contactData && (
              <div className="flex gap-6 items-center mt-8 pt-8 border-border justify-center w-full">
                {contactData.facebookUrl && (
                  <a
                    href={contactData.facebookUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:opacity-80 transition-opacity"
                    aria-label="Facebook"
                  >
                    <svg
                      className="w-8 h-8 fill-current"
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
                    className="text-primary hover:opacity-80 transition-opacity"
                    aria-label="Instagram"
                  >
                    <svg
                      className="w-8 h-8 fill-current"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                    </svg>
                  </a>
                )}
              </div>
            )}

            {/* Booking Button */}
            {headerData?.bookingButton?.enabled && headerData?.bookingButton?.link && (
              <div className="mt-8">
                <Button
                  asChild
                  variant="ghost"
                  size="lg"
                  className="w-full text-2xl border-2 border-primary text-primary hover:bg-primary hover:text-background transition-colors"
                >
                  <CMSLink {...headerData.bookingButton.link}>
                    {headerData.bookingButton.label || 'Book a Table'}
                  </CMSLink>
                </Button>
              </div>
            )}
          </div>
        </SheetPrimitive.Content>
      </SheetPortal>
    </Sheet>
  )
}

export function MobileMenu({
  menu,
  atTop,
  heroBackground,
  headerData,
  scrolled,
  contactData,
}: Props) {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  // Apply the same theme logic to fallback buttons
  const textColorClass = atTop && heroBackground === 'dark' ? 'text-header-light' : 'text-primary'
  const borderColorClass =
    atTop && heroBackground === 'dark' ? 'border-header-light' : 'border-primary'

  const fallbackButton = (
    <button
      className={cn(
        'relative flex h-11 w-11 items-center justify-center rounded-md border-2 transition-colors',
        textColorClass,
        borderColorClass,
      )}
    >
      <MenuIcon className="h-4" />
    </button>
  )

  if (!isClient) {
    return fallbackButton
  }

  return (
    <Suspense fallback={fallbackButton}>
      <MobileMenuContent
        menu={menu}
        atTop={atTop}
        heroBackground={heroBackground}
        headerData={headerData}
        scrolled={scrolled}
        contactData={contactData}
      />
    </Suspense>
  )
}
