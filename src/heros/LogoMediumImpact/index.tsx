'use client'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import React, { useEffect } from 'react'

import type { Page } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import { ArtDirectedMedia } from '@/components/Media/ArtDirectedMedia'
import { Media } from '@/components/Media'
import RichText from '@/components/RichText'
import type { Theme } from '@/providers/Theme/types'

export const LogoMediumImpactHero: React.FC<Page['hero']> = ({
  links,
  media,
  richText,
  logo,
  headerTheme,
}) => {
  const { setHeaderTheme } = useHeaderTheme()

  useEffect(() => {
    // Use the headerTheme from CMS, defaulting to 'dark' for dark hero backgrounds
    setHeaderTheme((headerTheme as Theme) || 'dark')
  }, [setHeaderTheme, headerTheme])

  // Get overlay opacity, default to 0.35 if not set
  const overlayOpacity =
    media && typeof media === 'object' && 'overlayOpacity' in media
      ? (media.overlayOpacity ?? 0.35)
      : 0.35

  return (
    <div className="w-full -mt-[10.4rem]" data-theme="dark">
      <div className="relative aspect-[4/2] md:aspect-[4/2] lg:aspect-[5/2] xl:aspect-[5/1]">
        {/* Image layer - full width */}
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

        {/* Content layer - constrained width */}
        <div className="container relative z-10 h-full">
          <div className="relative h-full flex items-end">
            {/* Text positioned at bottom left */}
            <div className="max-w-[40rem]">
              {richText && (
                <RichText
                  className="mb-6 text-left [&_h1]:text-primary [&_h2]:text-primary [&_h3]:text-primary [&_h4]:text-primary [&_p]:text-primary"
                  data={richText}
                  enableGutter={false}
                />
              )}
              {Array.isArray(links) && links.length > 0 && (
                <ul className="flex gap-4">
                  {links.map(({ link }, i) => {
                    return (
                      <li key={i}>
                        <CMSLink {...link} />
                      </li>
                    )
                  })}
                </ul>
              )}
            </div>

            {/* Logo centered in the hero */}
            {logo && (
              <div className="absolute inset-0 hidden sm:flex items-center justify-center">
                <div className="w-[200px] md:w-[300px]">
                  <Media
                    resource={logo}
                    imgClassName="w-full h-auto object-contain"
                    priority
                    loading="eager"
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
