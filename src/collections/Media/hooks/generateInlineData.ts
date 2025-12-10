import type { CollectionAfterChangeHook } from 'payload'
import fs from 'fs'
import path from 'path'

/**
 * Hook that generates inline data for images to enable instant rendering without network requests.
 * - For SVG files: stores the raw SVG content
 * - For raster images (PNG, JPEG, WebP, etc.): converts to base64 data URI
 *
 * This runs after each media upload/update and stores the result in the `inlineData` field.
 */
export const generateInlineData: CollectionAfterChangeHook = async ({ doc, req, operation }) => {
  // Only process on create or update operations
  if (operation !== 'create' && operation !== 'update') {
    return doc
  }

  // Skip if no file was uploaded or if inlineData already exists and file hasn't changed
  if (!doc.filename || !doc.mimeType) {
    return doc
  }

  const { payload } = req

  try {
    // Construct the full file path
    const uploadsDir = path.resolve(process.cwd(), 'public/media')
    const filePath = path.join(uploadsDir, doc.filename)

    // Check if file exists
    if (!fs.existsSync(filePath)) {
      payload.logger.warn(`File not found for inline data generation: ${filePath}`)
      return doc
    }

    let inlineData: string | null = null

    // Handle SVG files - store raw content
    if (doc.mimeType === 'image/svg+xml') {
      const svgContent = fs.readFileSync(filePath, 'utf-8')

      // Basic sanitization: ensure it's valid SVG
      if (svgContent.includes('<svg')) {
        inlineData = svgContent
        payload.logger.info(`Generated inline SVG data for: ${doc.filename}`)
      }
    }
    // Handle raster images - convert to base64
    else if (doc.mimeType?.startsWith('image/')) {
      const imageBuffer = fs.readFileSync(filePath)
      const base64 = imageBuffer.toString('base64')
      inlineData = `data:${doc.mimeType};base64,${base64}`
      payload.logger.info(`Generated base64 inline data for: ${doc.filename}`)
    }

    // Update the document with inline data if generated
    if (inlineData && inlineData !== doc.inlineData) {
      await payload.update({
        collection: 'media',
        id: doc.id,
        data: {
          inlineData,
        },
        req,
      })

      // Return updated doc
      return {
        ...doc,
        inlineData,
      }
    }
  } catch (error) {
    payload.logger.error(`Error generating inline data for ${doc.filename}: ${error}`)
  }

  return doc
}
