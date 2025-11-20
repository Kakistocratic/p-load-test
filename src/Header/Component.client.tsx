'use client'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import { useTheme } from '@/providers/Theme'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'

import { cn } from '@/utilities/ui'

import type { Header } from '@/payload-types'

import { Logo } from '@/components/Logo/Logo'
import { Media } from '@/components/Media'
import { HeaderNav } from './Nav'

interface HeaderClientProps {
  data: Header
}

export const HeaderClient: React.FC<HeaderClientProps> = ({ data }) => {
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
  const outerClass = cn(
    'w-full sticky top-0 z-20 transition-colors duration-300',
    scrolled ? 'bg-background/95 shadow-sm' : 'bg-transparent',
  )

  const logoImgClass = 'w-auto h-auto transition-all duration-300'

  // Select the appropriate logo based on the current theme
  const currentLogo = currentTheme === 'dark' ? data?.logoDark : data?.logoLight
  const hasLogo = currentLogo && typeof currentLogo === 'object'

  return (
    <header className={outerClass} {...(theme ? { 'data-theme': theme } : {})}>
      <div className={cn('container relative transition-all duration-300')}>
        <div className="flex justify-between items-center">
          <Link href="/">
            {hasLogo ? (
              <Media
                resource={currentLogo}
                // use inline max sizes but let padding change drive layout; keep smooth transition
                imgClassName={cn(
                  logoImgClass,
                  scrolled ? 'max-w-[90px] max-h-[100px] my-2' : 'max-w-[130px] max-h-[130px]',
                )}
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
          <HeaderNav data={data} />
        </div>
      </div>
    </header>
  )
}
