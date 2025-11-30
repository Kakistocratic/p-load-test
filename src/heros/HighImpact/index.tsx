'use client'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import React, { useEffect } from 'react'

import type { Page } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import { cn } from '@/utilities/ui'
import { ArtDirectedMedia } from '@/components/Media/ArtDirectedMedia'
import RichText from '@/components/RichText'
import type { Theme } from '@/providers/Theme/types'

export const HighImpactHero: React.FC<Page['hero']> = ({ links, media, richText, headerTheme }) => {
  const { setHeaderTheme } = useHeaderTheme()

  useEffect(() => {
    // Use the headerTheme from CMS, defaulting to 'dark' for dark hero backgrounds
    setHeaderTheme((headerTheme as Theme) || 'dark')
  }, [setHeaderTheme, headerTheme])

  // Get overlay opacity, default to 0.15 if not set
  const overlayOpacity =
    media && typeof media === 'object' && 'overlayOpacity' in media
      ? (media.overlayOpacity ?? 0.35)
      : 0.35

  return (
    <div className="relative -mt-[10.4rem] min-h-[100vh]" data-theme="dark">
      {/* Image layer */}
      {media && typeof media === 'object' && (
        <>
          <div className="absolute inset-0">
            <ArtDirectedMedia
              landscapeImage={media.landscape}
              portraitImage={media.portrait}
              fill
              imgClassName="object-cover"
              priority
              loading="eager"
            />
          </div>
          {/* Black overlay between image and text */}
          <div
            className="absolute inset-0 bg-black pointer-events-none"
            style={{ opacity: overlayOpacity }}
          />
        </>
      )}

      {/* Text layer */}
      <div className="container relative z-10 min-h-[100vh] flex items-center justify-center">
        <div className="max-w-[40rem] md:text-center mb-8">
          {richText && (
            <RichText
              className="mb-6 [&_h1]:text-7xl md:[&_h1]:text-8xl [&_p]:text-lg md:[&_p]:text-2xl [&_h1]:text-foreground text-foreground"
              data={richText}
              enableGutter={false}
            />
          )}
          {Array.isArray(links) && links.length > 0 && (
            <ul className="flex md:justify-center gap-4">
              {links.map(({ link }, i) => {
                return (
                  <li key={i}>
                    <CMSLink
                      {...link}
                      size="lg"
                      className={cn(
                        // preserve any className coming from the CMS and add larger button styles
                        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                        // @ts-ignore
                        link?.className,
                        'text-lg md:text-xl px-8 py-4 md:px-8 md:py-4',
                      )}
                    />
                  </li>
                )
              })}
            </ul>
          )}
        </div>
      </div>
    </div>
  )
}
