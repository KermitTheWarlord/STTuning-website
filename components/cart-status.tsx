"use client"

import Link from "next/link"
import { ShoppingBag } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { useCart } from "@/lib/cart-context"

export function CartStatus() {
  const { cart } = useCart()
  const cartItemsCount = cart.reduce((total, item) => total + item.quantity, 0)

  return (
    <Link href="/cart" className="relative">
      <ShoppingBag className="w-6 h-6" />
      {cartItemsCount > 0 && (
        <Badge variant="destructive" className="absolute -top-2 -right-2">
          {cartItemsCount}
        </Badge>
      )}
    </Link>
  )
}
