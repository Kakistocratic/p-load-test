'use client'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import React, { useEffect } from 'react'

import type { Page } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import { ArtDirectedMedia } from '@/components/Media/ArtDirectedMedia'
import RichText from '@/components/RichText'

export const HighImpactHero: React.FC<Page['hero']> = ({ links, media, richText }) => {
  const { setHeaderTheme } = useHeaderTheme()

  useEffect(() => {
    setHeaderTheme('dark')
  })

  // Get overlay opacity, default to 0.15 if not set
  const overlayOpacity =
    media && typeof media === 'object' && 'overlayOpacity' in media
      ? (media.overlayOpacity ?? 0.35)
      : 0.35

  return (
    <div className="relative -mt-[10.4rem] min-h-[100vh] text-white" data-theme="dark">
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
        <div className="max-w-[36.5rem] md:text-center mb-8">
          {richText && (
            <RichText
              className="mb-6 [&_h1]:text-5xl md:[&_h1]:text-7xl [&_p]:text-lg md:[&_p]:text-2xl"
              data={richText}
              enableGutter={false}
            />
          )}
          {Array.isArray(links) && links.length > 0 && (
            <ul className="flex md:justify-center gap-4">
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
      </div>
    </div>
  )
}
