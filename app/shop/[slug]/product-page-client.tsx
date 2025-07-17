"use client"

import { useState } from "react"
import { getProductBySlug } from "@/lib/shop-data"
import { notFound } from "next/navigation"
import Image from "next/image"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import AddToCartButton from "@/components/add-to-cart-button"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"

export default function ProductPageClient({ params }: { params: { slug: string } }) {
  console.log("ProductPageClient received params:", params)
  console.log("Looking for slug:", params.slug)

  const product = getProductBySlug(params.slug)
  console.log("Product found:", product)

  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isLoading, setIsLoading] = useState(false)

  if (!product) {
    console.log("Product not found, redirecting to not found")
    notFound()
  }

  // Get the current image source
  const currentImage =
    product.gallery && product.gallery.length > 0 ? product.gallery[currentImageIndex] : product.image

  // Simple navigation functions
  function goToPrevious() {
    if (!product.gallery || product.gallery.length <= 1) return
    setIsLoading(true)
    setCurrentImageIndex((prev) => (prev === 0 ? product.gallery.length - 1 : prev - 1))
  }

  function goToNext() {
    if (!product.gallery || product.gallery.length <= 1) return
    setIsLoading(true)
    setCurrentImageIndex((prev) => (prev === product.gallery.length - 1 ? 0 : prev + 1))
  }

  function selectImage(index: number) {
    if (index === currentImageIndex) return
    setIsLoading(true)
    setCurrentImageIndex(index)
  }

  function handleImageLoad() {
    setIsLoading(false)
  }

  return (
    <>
      <SiteHeader />
      <main className="min-h-screen py-20 slate-pattern">
        <div className="container">
          <div className="bg-black/80 backdrop-blur-sm rounded-lg p-8">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="relative">
                <div className="aspect-square relative rounded-lg overflow-hidden">
                  {isLoading && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/20 z-10">
                      <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                    </div>
                  )}
                  <Image
                    src={currentImage || "/placeholder.svg"}
                    alt={product.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 600px"
                    className="object-contain"
                    onLoad={handleImageLoad}
                  />
                </div>

                {product.gallery && product.gallery.length > 1 && (
                  <>
                    <Button
                      variant="secondary"
                      size="icon"
                      className="absolute left-2 top-1/2 -translate-y-1/2 z-10"
                      onClick={goToPrevious}
                      disabled={isLoading}
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="secondary"
                      size="icon"
                      className="absolute right-2 top-1/2 -translate-y-1/2 z-10"
                      onClick={goToNext}
                      disabled={isLoading}
                    >
                      <ChevronRight className="h-4 w-4" />
                    </Button>

                    <div className="flex justify-center gap-2 mt-4">
                      {product.gallery.map((img, index) => (
                        <button
                          key={index}
                          className={`w-16 h-16 relative border-2 rounded overflow-hidden ${
                            index === currentImageIndex ? "border-primary" : "border-gray-400"
                          }`}
                          onClick={() => selectImage(index)}
                          disabled={isLoading}
                        >
                          <Image
                            src={img || "/placeholder.svg"}
                            alt={`Thumbnail ${index + 1}`}
                            fill
                            sizes="64px"
                            className="object-cover"
                          />
                        </button>
                      ))}
                    </div>
                  </>
                )}
              </div>

              <div>
                <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
                <p className="text-xl font-semibold mb-4">{product.price.toFixed(2)} лв.</p>
                {product.originalPrice && (
                  <p className="text-lg text-gray-400 line-through mb-2">{product.originalPrice.toFixed(2)} лв.</p>
                )}
                <div className="mb-6 whitespace-pre-line">{product.fullDescription}</div>
                <AddToCartButton product={product} />
              </div>
            </div>

            <div className="mt-12">
              <h2 className="text-2xl font-bold mb-4">Features</h2>
              <ul className="list-disc list-inside mb-8">
                {product.features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
              <h2 className="text-2xl font-bold mb-4">Specifications</h2>
              <dl className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-2">
                {Object.entries(product.specifications).map(([key, value]) => (
                  <div key={key} className="flex flex-col">
                    <dt className="font-semibold">{key}</dt>
                    <dd>{value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  )
}
