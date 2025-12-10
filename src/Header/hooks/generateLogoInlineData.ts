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

  payload.logger.info('=== generateLogoInlineData hook triggered ===')
  payload.logger.info(`logoDark: ${doc.logoDark}, logoLight: ${doc.logoLight}`)

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

      payload.logger.info(
        `logoDark media found: ${logoDoc?.filename}, url: ${logoDoc?.url}, mimeType: ${logoDoc?.mimeType}, hasInlineData: ${!!logoDoc?.inlineData}`,
      )

      // Always regenerate inline data to ensure it's up to date
      if (logoDoc && logoDoc.url) {
        const inlineData = await generateInlineDataFromUrl(logoDoc.url, logoDoc.mimeType, payload)
        if (inlineData) {
          updates.push({ id: doc.logoDark, inlineData })
          needsUpdate = true
          payload.logger.info(`Generated inline data for logoDark (${inlineData.length} chars)`)
        } else {
          payload.logger.warn(`Failed to generate inline data for logoDark`)
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

      payload.logger.info(
        `logoLight media found: ${logoDoc?.filename}, url: ${logoDoc?.url}, mimeType: ${logoDoc?.mimeType}, hasInlineData: ${!!logoDoc?.inlineData}`,
      )

      // Always regenerate inline data to ensure it's up to date
      if (logoDoc && logoDoc.url) {
        const inlineData = await generateInlineDataFromUrl(logoDoc.url, logoDoc.mimeType, payload)
        if (inlineData) {
          updates.push({ id: doc.logoLight, inlineData })
          needsUpdate = true
          payload.logger.info(`Generated inline data for logoLight (${inlineData.length} chars)`)
        } else {
          payload.logger.warn(`Failed to generate inline data for logoLight`)
        }
      }
    } catch (error) {
      payload.logger.error(`Error processing logoLight: ${error}`)
    }
  }

  // Update media documents with inline data
  if (needsUpdate) {
    payload.logger.info(`Updating ${updates.length} media documents with inline data`)
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
        payload.logger.info(`✓ Generated inline data for logo media ID: ${update.id}`)
      } catch (error) {
        payload.logger.error(`Error updating media ${update.id}: ${error}`)
      }
    }
  } else {
    payload.logger.info('No inline data updates needed')
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

    payload.logger.info(`Fetching file from URL: ${absoluteUrl}`)

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
        payload.logger.info('Successfully generated inline SVG data')
        return svgContent
      } else {
        payload.logger.warn('File claimed to be SVG but no <svg> tag found')
        return null
      }
    }
    // Handle raster images - convert to base64
    else if (mimeType?.startsWith('image/')) {
      const arrayBuffer = await response.arrayBuffer()
      const buffer = Buffer.from(arrayBuffer)
      const base64 = buffer.toString('base64')
      const dataUri = `data:${mimeType};base64,${base64}`
      payload.logger.info(`Successfully generated base64 data (${dataUri.length} chars)`)
      return dataUri
    }

    payload.logger.warn(`Unsupported mime type: ${mimeType}`)
    return null
  } catch (error) {
    payload.logger.error(`Error generating inline data from URL: ${error}`)
    return null
  }
}
