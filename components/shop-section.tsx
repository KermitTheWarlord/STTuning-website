import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import Image from "next/image"
import Link from "next/link"
import { products } from "@/lib/shop-data"

export function ShopSection() {
  return (
    <section id="shop" className="py-20 bg-black/95">
      <div className="container">
        <h2 className="text-3xl font-bold text-center mb-12">Tuning Tools Shop</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {products.map((item) => (
            <Card key={item.id} className="bg-card/50 backdrop-blur">
              <CardHeader>
                <div className="relative aspect-square w-full mb-4">
                  <Image
                    src={item.image || "/placeholder.svg"}
                    alt={item.name}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-contain rounded-md"
                  />
                </div>
                <CardTitle>{item.name}</CardTitle>
                <CardDescription>{item.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">{item.price.toFixed(2)} лв.</p>
                {item.originalPrice && (
                  <p className="text-lg text-gray-400 line-through">{item.originalPrice.toFixed(2)} лв.</p>
                )}
              </CardContent>
              <CardFooter>
                <Button className="w-full" asChild>
                  <Link href={`/shop/${item.slug}`}>View Details</Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
