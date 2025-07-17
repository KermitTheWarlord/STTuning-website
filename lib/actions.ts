"use server"
import { cache } from "react"
import sharp from "sharp"

// Cache the upscaled images to avoid processing the same image multiple times
const upscaledImagesCache = new Map<string, string>()

export const upscaleImage = cache(async (imageUrl: string): Promise<string> => {
  // Check if we've already upscaled this image
  if (upscaledImagesCache.has(imageUrl)) {
    return upscaledImagesCache.get(imageUrl)!
  }

  try {
    // Fetch the image
    const response = await fetch(imageUrl)
    if (!response.ok) {
      throw new Error(`Failed to fetch image: ${response.statusText}`)
    }

    const imageBuffer = await response.arrayBuffer()

    // Use sharp to enhance the image
    const enhancedImageBuffer = await sharp(Buffer.from(imageBuffer))
      .resize({
        width: 1200,
        height: 1200,
        fit: "inside",
        withoutEnlargement: false,
      })
      .sharpen()
      .toBuffer()

    // Convert to base64 for inline usage
    const base64Image = `data:image/jpeg;base64,${Buffer.from(enhancedImageBuffer).toString("base64")}`

    // Store the upscaled image URL in the cache
    upscaledImagesCache.set(imageUrl, base64Image)

    return base64Image
  } catch (error) {
    console.error("Error upscaling image:", error)
    // Return the original image if upscaling fails
    return imageUrl
  }
})
