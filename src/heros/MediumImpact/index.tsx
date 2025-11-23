'use client'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import React, { useEffect } from 'react'

import type { Page } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import { ArtDirectedMedia } from '@/components/Media/ArtDirectedMedia'
import RichText from '@/components/RichText'

export const MediumImpactHero: React.FC<Page['hero']> = ({ links, media, richText }) => {
  const { setHeaderTheme } = useHeaderTheme()

  useEffect(() => {
    // Set to 'dark' so the dark logo shows up against the dark hero image at top
    setHeaderTheme('dark')
  }, [setHeaderTheme])
  // Get overlay opacity, default to 0.35 if not set
  const overlayOpacity =
    media && typeof media === 'object' && 'overlayOpacity' in media
      ? (media.overlayOpacity ?? 0.35)
      : 0.35

  return (
    <div className="w-full -mt-[10.4rem]" data-theme="dark">
      <div className="relative aspect-[5/2] md:aspect-[5/1]">
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
        <div
          className="relative z-10 h-full flex items-center justify-center text-white"
          data-theme="dark"
        >
          <div className="max-w-[40rem] text-center px-4">
            {richText && <RichText className="mb-6" data={richText} enableGutter={false} />}
            {Array.isArray(links) && links.length > 0 && (
              <ul className="flex justify-center gap-4">
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
    </div>
  )
}
