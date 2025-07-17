import Link from "next/link"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"

export default function NotFound() {
  return (
    <>
      <SiteHeader />
      <main className="min-h-screen py-20 slate-pattern">
        <div className="container">
          <div className="bg-black/80 backdrop-blur-sm rounded-lg p-8 text-center">
            <h2 className="text-3xl font-bold mb-4">Product Not Found</h2>
            <p className="mb-6">
              We couldn't find the product you're looking for. It might have been removed or doesn't exist.
            </p>
            <Link href="/#shop" className="text-primary hover:underline">
              Return to Shop
            </Link>
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  )
}
