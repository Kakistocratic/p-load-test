'use client'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import { useTheme } from '@/providers/Theme'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'

import { cn } from '@/utilities/ui'

import type { Header, ContactInfo } from '@/payload-types'
import type { Theme } from '@/providers/Theme/types'

import { Logo } from '@/components/Logo/Logo'
import { Media } from '@/components/Media'
import { HeaderNav } from './Nav'

interface HeaderClientProps {
  data: Header
  contactData?: ContactInfo | null
}

export const HeaderClient: React.FC<HeaderClientProps> = ({ data, contactData }) => {
  /* Storing the value in a useState to avoid hydration errors */
  const [theme, setTheme] = useState<string | null>(null)
  const { headerTheme, setHeaderTheme } = useHeaderTheme()
  const { theme: currentTheme } = useTheme()
  const pathname = usePathname()

  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    setHeaderTheme(null)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])

  useEffect(() => {
    if (headerTheme && headerTheme !== theme) setTheme(headerTheme)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [headerTheme])

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 10)
    }

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const outerClass = cn(
    'w-full sticky top-0 z-20 transition-colors duration-300',
    scrolled
      ? currentTheme === 'dark'
        ? 'bg-tertiary/95 shadow-sm'
        : 'bg-tertiary/95 shadow-sm'
      : 'bg-transparent',
  )

  // Logo logic: mirror the text logic
  // At top with dark hero: show light logo (like white text)
  // Otherwise: use theme default
  const atTop = !scrolled
  const shouldShowLightLogo = atTop && theme === 'dark' ? true : currentTheme === 'dark'

  const currentLogo = shouldShowLightLogo ? data?.logoLight : data?.logoDark
  const hasLogo = currentLogo && typeof currentLogo === 'object'

  // Check if we have both logos for optimized switching
  const hasBothLogos =
    data?.logoDark &&
    typeof data.logoDark === 'object' &&
    data?.logoLight &&
    typeof data.logoLight === 'object'

  // Explicit dimensions for logo sizing (width x height)
  const logoWidth = scrolled ? 90 : 130
  const logoHeight = scrolled ? 64 : 92

  return (
    <header className={outerClass}>
      <div className={cn('container relative transition-all duration-300')}>
        <div className="flex justify-between items-center my-1">
          <Link href="/">
            {hasBothLogos ? (
              <div
                className="relative transition-all duration-300"
                style={{
                  width: `${logoWidth}px`,
                  height: `${logoHeight}px`,
                }}
              >
                <Media
                  resource={data.logoLight}
                  imgClassName={cn(
                    'absolute inset-0 transition-opacity duration-300',
                    shouldShowLightLogo ? 'opacity-100 z-10' : 'opacity-0 z-0',
                  )}
                  priority
                />
                <Media
                  resource={data.logoDark}
                  imgClassName={cn(
                    'absolute inset-0 transition-opacity duration-300',
                    !shouldShowLightLogo ? 'opacity-100 z-10' : 'opacity-0 z-0',
                  )}
                  priority
                />
              </div>
            ) : hasLogo ? (
              <div
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
          <HeaderNav
            data={data}
            contactData={contactData}
            atTop={!scrolled}
            heroBackground={theme as 'dark' | 'light' | null}
          />
        </div>
      </div>
    </header>
  )
}
