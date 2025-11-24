import React from 'react'

import type { CallToActionBlock as CTABlockProps } from '@/payload-types'

import RichText from '@/components/RichText'
import { CMSLink } from '@/components/Link'
import { ArtDirectedMedia } from '@/components/Media/ArtDirectedMedia'

export const CallToActionBlock: React.FC<CTABlockProps> = ({ links, richText, media }) => {
  // Get overlay opacity, default to 0.15 if not set
  const overlayOpacity =
    media && typeof media === 'object' && 'overlayOpacity' in media
      ? (media.overlayOpacity ?? 0.15)
      : 0.15

  return (
    <div className="container">
      <div className="relative rounded overflow-hidden">
        {/* Aspect ratio container: 3:1 for desktop, 4:5 for mobile */}
        <div className="relative aspect-[4/5] md:aspect-[3/1]">
          {/* Background image layer */}
          {media && typeof media === 'object' && (media.landscape || media.portrait) && (
            <>
              <div className="absolute inset-0">
                <ArtDirectedMedia
                  landscapeImage={media.landscape ?? null}
                  portraitImage={media.portrait ?? null}
                  fill
                  imgClassName="object-cover"
                  priority={false}
                />
              </div>
              {/* Dark overlay between image and text */}
              <div
                className="absolute inset-0 bg-black pointer-events-none"
                style={{ opacity: overlayOpacity }}
              />
            </>
          )}

          {/* Content layer */}
          <div className="relative z-10 h-full flex flex-col justify-end items-center p-8 md:p-12">
            <div className="w-full max-w-[48rem] text-center">
              {richText && (
                <RichText
                  className="mb-6 text-white [&_h1]:text-white [&_h2]:text-white [&_h3]:text-white [&_h4]:text-white [&_p]:text-white"
                  data={richText}
                  enableGutter={false}
                />
              )}
              {(links || []).length > 0 && (
                <div className="flex justify-center gap-4">
                  {(links || []).map(({ link }, i) => {
                    return <CMSLink key={i} size="lg" {...link} />
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
