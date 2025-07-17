"use client"

import { useSearchParams } from "next/navigation"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function OrderConfirmationPage() {
  const searchParams = useSearchParams()
  const orderId = searchParams.get("id")

  return (
    <>
      <SiteHeader />
      <main className="min-h-screen py-20 slate-pattern">
        <div className="container">
          <div className="bg-black/80 backdrop-blur-sm rounded-lg p-8 text-center">
            <h1 className="text-3xl font-bold mb-4">Order Confirmed!</h1>
            <p className="mb-4">Thank you for your order. We will contact you shortly to confirm the details.</p>
            {orderId && (
              <p className="mb-8">
                Your order ID is: <strong>{orderId}</strong>
              </p>
            )}
            <Button asChild>
              <Link href="/">Return to Home</Link>
            </Button>
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  )
}
