"use client"

import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { useCart } from "@/lib/cart-context"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function CartPage() {
  const { cart, removeFromCart, getCartTotal } = useCart()
  const router = useRouter()

  const handleRemove = (productId: number) => {
    removeFromCart(productId)
  }

  const handleCheckout = () => {
    router.push("/checkout")
  }

  return (
    <>
      <SiteHeader />
      <main className="min-h-screen py-20 slate-pattern">
        <div className="container">
          <div className="bg-black/80 backdrop-blur-sm rounded-lg p-8">
            <h1 className="text-3xl font-bold mb-8">Your Cart</h1>
            {cart.length === 0 ? (
              <p>
                Your cart is empty.{" "}
                <Link href="/#shop" className="text-primary hover:underline">
                  Continue shopping
                </Link>
              </p>
            ) : (
              <>
                <div className="space-y-4">
                  {cart.map((item) => (
                    <div key={item.id} className="flex items-center justify-between border-b border-gray-700 pb-4">
                      <div>
                        <h3 className="font-semibold">{item.name}</h3>
                        <p className="text-sm text-gray-400">Quantity: {item.quantity}</p>
                      </div>
                      <div className="flex items-center space-x-4">
                        <p>${(item.price * item.quantity).toFixed(2)}</p>
                        <Button variant="destructive" size="sm" onClick={() => handleRemove(item.id)}>
                          Remove
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-8 flex justify-between items-center">
                  <p className="text-xl font-semibold">Total: ${getCartTotal().toFixed(2)}</p>
                  <Button size="lg" onClick={handleCheckout}>
                    Proceed to Checkout
                  </Button>
                </div>
              </>
            )}
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  )
}
