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
      // treat any scroll away from top as scrolled; small threshold to avoid jitter
      setScrolled(window.scrollY > 10)
    }

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Always keep the header wrapper sticky so the layout doesn't jump when toggling
  // Use theme-dependent background colors when scrolled
  // When NOT scrolled and headerTheme is set (e.g., 'dark' for HighImpact hero), use it for logo
  // When scrolled, always use currentTheme for both background and logo
  const logoTheme = !scrolled && theme ? theme : currentTheme

  const outerClass = cn(
    'w-full sticky top-0 z-20 transition-colors duration-300',
    scrolled
      ? currentTheme === 'dark'
        ? 'bg-black/95 shadow-sm'
        : 'bg-tertiary/95 shadow-sm'
      : 'bg-transparent',
  )

  const logoImgClass = 'w-auto h-auto transition-all duration-300'

  // Select the appropriate logo based on logoTheme
  const currentLogo = logoTheme === 'dark' ? data?.logoDark : data?.logoLight
  const hasLogo = currentLogo && typeof currentLogo === 'object'

  // Check if we have both logos for optimized switching
  const hasBothLogos =
    data?.logoDark &&
    typeof data.logoDark === 'object' &&
    data?.logoLight &&
    typeof data.logoLight === 'object'

  return (
    <header className={outerClass} suppressHydrationWarning>
      <div className={cn('container relative transition-all duration-300')}>
        <div className="flex justify-between items-center">
          <Link href="/" suppressHydrationWarning>
            {hasBothLogos ? (
              // Always render both logos and toggle visibility with CSS for instant switching
              // This avoids hydration issues by keeping the DOM structure consistent
              <div className="relative" suppressHydrationWarning>
                <Media
                  resource={data.logoDark}
                  imgClassName={cn(
                    logoImgClass,
                    scrolled
                      ? 'max-w-[90px] max-h-[90px] my-2'
                      : 'max-w-[130px] max-h-[130px] pt-1',
                    logoTheme === 'dark'
                      ? 'opacity-100 relative'
                      : 'opacity-0 absolute inset-0 pointer-events-none',
                  )}
                  priority
                />
                <Media
                  resource={data.logoLight}
                  imgClassName={cn(
                    logoImgClass,
                    scrolled
                      ? 'max-w-[90px] max-h-[90px] my-2'
                      : 'max-w-[130px] max-h-[130px] pt-1',
                    logoTheme !== 'dark'
                      ? 'opacity-100 relative'
                      : 'opacity-0 absolute inset-0 pointer-events-none',
                  )}
                  priority
                />
              </div>
            ) : hasLogo ? (
              // For SVGs or single logo, conditionally render the appropriate one
              <Media
                resource={currentLogo}
                imgClassName={cn(
                  logoImgClass,
                  scrolled ? 'max-w-[90px] max-h-[90px] my-2' : 'max-w-[130px] max-h-[130px] pt-1',
                )}
                priority
              />
            ) : (
              <Logo
                loading="eager"
                priority="high"
                className={cn(
                  'invert dark:invert-0',
                  logoImgClass,
                  scrolled ? 'max-w-[90px] max-h-[90px]' : 'max-w-[130px] max-h-[130px]',
                )}
              />
            )}
          </Link>
          <HeaderNav
            data={data}
            logoTheme={logoTheme as Theme | undefined}
            contactData={contactData}
          />
        </div>
      </div>
    </header>
  )
}
