import type { GlobalAfterChangeHook } from 'payload'
import fs from 'fs'
import path from 'path'

/**
 * Hook that generates inline data specifically for header logos to enable instant rendering.
 * Only processes the logoDark and logoLight fields when they change.
 * - For SVG files: stores the raw SVG content
 * - For raster images (PNG, JPEG, WebP, etc.): converts to base64 data URI
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

      if (logoDoc && logoDoc.filename && !logoDoc.inlineData) {
        const inlineData = await generateInlineDataForFile(
          logoDoc.filename,
          logoDoc.mimeType,
          payload,
        )
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

      if (logoDoc && logoDoc.filename && !logoDoc.inlineData) {
        const inlineData = await generateInlineDataForFile(
          logoDoc.filename,
          logoDoc.mimeType,
          payload,
        )
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
        payload.logger.info(`Generated inline data for logo media ID: ${update.id}`)
      } catch (error) {
        payload.logger.error(`Error updating media ${update.id}: ${error}`)
      }
    }
  }

  return doc
}

/**
 * Helper function to generate inline data from a file
 */
async function generateInlineDataForFile(
  filename: string,
  mimeType: string | null | undefined,
  payload: any,
): Promise<string | null> {
  try {
    const uploadsDir = path.resolve(process.cwd(), 'public/media')
    const filePath = path.join(uploadsDir, filename)

    if (!fs.existsSync(filePath)) {
      payload.logger.warn(`File not found: ${filePath}`)
      return null
    }

    // Handle SVG files - store raw content
    if (mimeType === 'image/svg+xml') {
      const svgContent = fs.readFileSync(filePath, 'utf-8')
      if (svgContent.includes('<svg')) {
        return svgContent
      }
    }
    // Handle raster images - convert to base64
    else if (mimeType?.startsWith('image/')) {
      const imageBuffer = fs.readFileSync(filePath)
      const base64 = imageBuffer.toString('base64')
      return `data:${mimeType};base64,${base64}`
    }

    return null
  } catch (error) {
    payload.logger.error(`Error generating inline data: ${error}`)
    return null
  }
}
