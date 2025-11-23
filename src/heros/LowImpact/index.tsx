'use client'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import React, { useEffect } from 'react'

import type { Page } from '@/payload-types'
import type { Theme } from '@/providers/Theme/types'

import RichText from '@/components/RichText'

type LowImpactHeroType =
  | {
      children?: React.ReactNode
      richText?: never
      headerTheme?: never
    }
  | (Omit<Page['hero'], 'richText'> & {
      children?: never
      richText?: Page['hero']['richText']
    })

export const LowImpactHero: React.FC<LowImpactHeroType> = ({ children, richText, headerTheme }) => {
  const { setHeaderTheme } = useHeaderTheme()

  useEffect(() => {
    // Use the headerTheme from CMS if provided, otherwise don't set (let header use defaults)
    if (headerTheme) {
      setHeaderTheme(headerTheme as Theme)
    }
  }, [setHeaderTheme, headerTheme])

  return (
    <div className="container">
      <div className="max-w-[48rem] mx-auto text-center">
        {children || (richText && <RichText data={richText} enableGutter={false} />)}
      </div>
    </div>
  )
}
