'use client'

import React from 'react'
import NextImage from 'next/image'
import { cn } from '@/utilities/ui'
import { getMediaUrl } from '@/utilities/getMediaUrl'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import type { Media as MediaType } from '@/payload-types'

interface ArtDirectedMediaProps {
  landscapeImage: MediaType | string | number | null
  portraitImage?: MediaType | string | number | null
  alt?: string
  fill?: boolean
  priority?: boolean
  className?: string
  imgClassName?: string
  loading?: 'lazy' | 'eager'
  quality?: number
}

// A base64 encoded placeholder
const placeholderBlur =
  'data:image/png;base64,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'

export const ArtDirectedMedia: React.FC<ArtDirectedMediaProps> = ({
  landscapeImage,
  portraitImage,
  alt: altProp,
  fill = false,
  priority = false,
  className,
  imgClassName,
  loading,
  quality = 90,
}) => {
  // Helper function to process media resource
  const processMediaResource = (resource: MediaType | string | number | null) => {
    if (!resource || typeof resource !== 'object' || !('url' in resource)) {
      return null
    }

    const { alt: resourceAlt, url, updatedAt, width, height } = resource
    const cacheTag = updatedAt
    const src = getMediaUrl(url, cacheTag)

    return {
      src,
      alt: resourceAlt || '',
      width: width || undefined,
      height: height || undefined,
    }
  }

  const landscapeData = processMediaResource(landscapeImage)
  const portraitData = portraitImage ? processMediaResource(portraitImage) : null

  if (!landscapeData) {
    return null
  }

  // Use portrait image alt text if available, otherwise fallback to landscape, then prop
  const alt = altProp || portraitData?.alt || landscapeData.alt || ''

  // If no portrait image is provided, use regular Next.js Image
  if (!portraitData) {
    return (
      <div className={className}>
        <NextImage
          alt={alt}
          className={cn(imgClassName)}
          fill={fill}
          height={!fill ? landscapeData.height : undefined}
          placeholder="blur"
          blurDataURL={placeholderBlur}
          priority={priority}
          quality={quality}
          loading={loading}
          sizes="100vw"
          src={landscapeData.src}
          width={!fill ? landscapeData.width : undefined}
        />
      </div>
    )
  }

  // Use media query to determine which image to render
  const isMobile = useMediaQuery('(max-width: 768px)')

  // Choose which image data to use based on screen size
  const activeImageData = isMobile ? portraitData : landscapeData
  const appropriateSizes = isMobile
    ? '(max-width: 768px) 100vw, 768px'
    : '(min-width: 769px) 100vw, 100vw'

  // Render only the appropriate image - true art direction with performance
  return (
    <div className={className}>
      <NextImage
        alt={alt}
        className={cn(imgClassName)}
        fill={fill}
        height={!fill ? activeImageData.height : undefined}
        placeholder="blur"
        blurDataURL={placeholderBlur}
        priority={priority}
        quality={quality}
        loading={loading}
        sizes={appropriateSizes}
        src={activeImageData.src}
        width={!fill ? activeImageData.width : undefined}
      />
    </div>
  )
}
