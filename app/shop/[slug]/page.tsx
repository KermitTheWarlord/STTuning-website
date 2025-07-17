import { products } from "@/lib/shop-data"
import ProductPageClient from "./product-page-client"

export async function generateStaticParams() {
  return products.map((product) => ({
    slug: product.slug,
  }))
}

export default async function ProductPage({ params }: { params: { slug: string } }) {
  return <ProductPageClient params={params} />
}
