'use client'

import React from 'react'

import type { Header as HeaderType } from '@/payload-types'
import type { Theme } from '@/providers/Theme/types'

import { CMSLink } from '@/components/Link'
import Link from 'next/link'
import { SearchIcon } from 'lucide-react'
import { MobileMenu } from '../MobileMenu'
import { cn } from '@/utilities/ui'

export const HeaderNav: React.FC<{ data: HeaderType; logoTheme?: Theme }> = ({
  data,
  logoTheme,
}) => {
  const navItems = data?.navItems || []

  // When logoTheme is 'dark', we're showing dark logo (at top of HighImpact hero)
  // So use light text color (foreground) to contrast against dark background
  // When logoTheme is not 'dark', use the primary color (which adapts to theme)
  const textColorClass = logoTheme === 'dark' ? 'text-foreground' : 'text-primary'

  return (
    <>
      {/* Desktop Navigation */}
      <nav className="hidden md:flex gap-3 items-center">
        {navItems.map(({ link }, i) => {
          return link ? (
            <CMSLink
              key={i}
              {...link}
              appearance="link"
              className={cn('text-1xl', textColorClass)}
            />
          ) : null
        })}
        <Link href="/search">
          <span className="sr-only">Search</span>
          <SearchIcon className={cn('w-5', textColorClass)} />
        </Link>
      </nav>

      {/* Mobile Navigation */}
      <div className="flex md:hidden gap-3 items-center">
        <Link href="/search">
          <span className="sr-only">Search</span>
          <SearchIcon className={cn('w-5', textColorClass)} />
        </Link>
        <MobileMenu menu={navItems} />
      </div>
    </>
  )
}
