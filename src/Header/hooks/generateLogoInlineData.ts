import type { GlobalAfterChangeHook } from 'payload'

/**
 * Hook that generates inline data specifically for header logos to enable instant rendering.
 * Only processes the logoDark and logoLight fields when they change.
 * - For SVG files: stores the raw SVG content
 * - For raster images (PNG, JPEG, WebP, etc.): converts to base64 data URI
 *
 * Works with both local storage and remote storage (S3, etc.) by fetching via URL
 */
export const generateLogoInlineData: GlobalAfterChangeHook = async ({ doc, req }) => {
  const { payload } = req

  let needsUpdate = false
  const updates: Array<{ id: string | number; inlineData: string }> = []

  // Process logoDark if it exists and is a reference
  if (doc.logoDark && typeof doc.logoDark === 'number') {
    try {
      const logoDoc = await payload.findByID({
        collection: 'media',
        id: doc.logoDark,
        req,
      })

      // Always regenerate inline data to ensure it's up to date
      if (logoDoc && logoDoc.url) {
        const inlineData = await generateInlineDataFromUrl(logoDoc.url, logoDoc.mimeType, payload)
        if (inlineData) {
          updates.push({ id: doc.logoDark, inlineData })
          needsUpdate = true
        }
      }
    } catch (error) {
      payload.logger.error(`Error processing logoDark: ${error}`)
    }
  }

  // Process logoLight if it exists and is a reference
  if (doc.logoLight && typeof doc.logoLight === 'number') {
    try {
      const logoDoc = await payload.findByID({
        collection: 'media',
        id: doc.logoLight,
        req,
      })

      // Always regenerate inline data to ensure it's up to date
      if (logoDoc && logoDoc.url) {
        const inlineData = await generateInlineDataFromUrl(logoDoc.url, logoDoc.mimeType, payload)
        if (inlineData) {
          updates.push({ id: doc.logoLight, inlineData })
          needsUpdate = true
        }
      }
    } catch (error) {
      payload.logger.error(`Error processing logoLight: ${error}`)
    }
  }

  // Update media documents with inline data
  if (needsUpdate) {
    for (const update of updates) {
      try {
        await payload.update({
          collection: 'media',
          id: update.id,
          data: {
            inlineData: update.inlineData,
          },
          req,
        })
      } catch (error) {
        payload.logger.error(`Error updating media ${update.id}: ${error}`)
      }
    }
  }

  return doc
}

/**
 * Helper function to generate inline data by fetching from URL
 * Works with both local and remote storage (S3, Supabase, etc.)
 */
async function generateInlineDataFromUrl(
  url: string | null | undefined,
  mimeType: string | null | undefined,
  payload: any,
): Promise<string | null> {
  if (!url) {
    payload.logger.warn('No URL provided for inline data generation')
    return null
  }

  try {
    // Convert relative URLs to absolute URLs
    let absoluteUrl = url
    if (url.startsWith('/')) {
      const baseUrl =
        process.env.NEXT_PUBLIC_SERVER_URL || process.env.VERCEL_URL || 'http://localhost:3000'
      absoluteUrl = `${baseUrl}${url}`
    }

    // Fetch the file content from the URL
    const response = await fetch(absoluteUrl)

    if (!response.ok) {
      payload.logger.error(`Failed to fetch file: ${response.status} ${response.statusText}`)
      return null
    }

    // Handle SVG files - store raw content
    if (mimeType === 'image/svg+xml') {
      const svgContent = await response.text()
      if (svgContent.includes('<svg')) {
        return svgContent
      }
      return null
    }
    // Handle raster images - convert to base64
    else if (mimeType?.startsWith('image/')) {
      const arrayBuffer = await response.arrayBuffer()
      const buffer = Buffer.from(arrayBuffer)
      const base64 = buffer.toString('base64')
      return `data:${mimeType};base64,${base64}`
    }

    return null
  } catch (error) {
    payload.logger.error(`Error generating inline data from URL: ${error}`)
    return null
  }
}
