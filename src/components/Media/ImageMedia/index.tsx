'use client'

import type { StaticImageData } from 'next/image'

import { cn } from '@/utilities/ui'
import NextImage from 'next/image'
import React from 'react'

import type { Props as MediaProps } from '../types'

import { cssVariables } from '@/cssVariables'
import { getMediaUrl } from '@/utilities/getMediaUrl'

const { breakpoints } = cssVariables

// A base64 encoded neutral gray placeholder while the image is loading
const placeholderBlur =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mN89erVfwAJYwPNteQx0wAAAABJRU5ErkJggg=='

export const ImageMedia: React.FC<MediaProps> = (props) => {
  const {
    alt: altFromProps,
    fill,
    pictureClassName,
    imgClassName,
    priority,
    resource,
    size: sizeFromProps,
    src: srcFromProps,
    loading: loadingFromProps,
    onLoad,
  } = props

  let width: number | undefined
  let height: number | undefined
  let alt = altFromProps
  let src: StaticImageData | string = srcFromProps || ''
  let isSvg = false

  if (!src && resource && typeof resource === 'object') {
    const { alt: altFromResource, height: fullHeight, url, width: fullWidth, mimeType } = resource

    width = fullWidth!
    height = fullHeight!
    alt = altFromResource || ''
    isSvg = mimeType?.includes('svg') || false

    const cacheTag = resource.updatedAt
    src = getMediaUrl(url, cacheTag)
  }

  const loading = loadingFromProps || (!priority ? 'lazy' : undefined)

  // NOTE: this is used by the browser to determine which image to download at different screen sizes
  const sizes = sizeFromProps
    ? sizeFromProps
    : Object.entries(breakpoints)
        .map(([, value]) => `(max-width: ${value}px) ${value * 2}w`)
        .join(', ')

  // For SVG images, use a regular img tag instead of Next Image
  // because Next Image has issues with SVGs (no intrinsic dimensions)
  if (isSvg) {
    return (
      <img
        alt={alt || ''}
        className={cn(imgClassName)}
        src={src as string}
        loading={loading}
        onLoad={onLoad}
        style={{ display: 'block', width: '100%', height: '100%', objectFit: 'contain' }}
      />
    )
  }

  return (
    <picture className={cn(pictureClassName)}>
      <NextImage
        alt={alt || ''}
        className={cn(imgClassName)}
        fill={fill}
        height={!fill ? height : undefined}
        placeholder="blur"
        blurDataURL={placeholderBlur}
        priority={priority}
        quality={90}
        loading={loading}
        sizes={sizes}
        src={src}
        width={!fill ? width : undefined}
        fetchPriority={priority ? 'high' : undefined}
        onLoad={onLoad}
      />
    </picture>
  )
}
