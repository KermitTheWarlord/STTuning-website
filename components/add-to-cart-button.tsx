"use client"

import { Button } from "@/components/ui/button"
import { useCart } from "@/lib/cart-context"
import { toast } from "@/components/ui/use-toast"
import type { Product } from "@/lib/shop-data"

export default function AddToCartButton({ product }: { product: Product }) {
  const { addToCart } = useCart()

  const handleAddToCart = () => {
    addToCart(product)
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
    })
  }

  return (
    <Button size="lg" onClick={handleAddToCart}>
      Add to Cart
    </Button>
  )
}
