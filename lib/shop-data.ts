export interface Product {
  id: number
  slug: string
  name: string
  description: string
  fullDescription: string
  price: number
  originalPrice?: number
  image: string
  gallery?: string[]
  features: string[]
  specifications: { [key: string]: string }
}

export const products: Product[] = [
  {
    id: 1,
    slug: "mercedes-epc-wis-asra",
    name: "Mercedes EPC, WIS & ASRA – Пълен сервизен каталог (до 2022 г.)",
    description: "Пълен сервизен каталог за Mercedes-Benz с покритие до 2022 г.",
    fullDescription: `Получете достъп до Mercedes-Benz EPC (Електронен каталог за части), WIS (Сервизна информационна система) и ASRA (Норми за трудови часове) с покритие на всички модели до 2022 г. включително. Софтуерът е лесен за инсталация и идеален за сервизи, механици и любители.

    Как работи инсталацията:
    📦 Получавате USB флашка, която съдържа линк за изтегляне и инсталация.
    ⚙️ Ясни инструкции за инсталация, които гарантират бърза и безпроблемна работа.
    🚀 Офлайн работа – веднъж инсталиран, не изисква интернет връзка.

    Какво получавате:
    📀 USB флашка с линк за изтегляне
    📜 Ръководство за инсталация
    🔑 Лесно активиране без сложни настройки`,
    price: 65,
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Mercedes-Benz-WIS-ASRA-2022-11_upscaled-QyFswsdTV1yBb5J8hFhgGYUjsLAB6q.png",
    features: [
      "EPC (Електронен каталог за части) – OEM номера, диаграми и съвместимост.",
      "WIS (Сервизна информационна система) – Оригинални ръководства за ремонт и електросхеми.",
      "ASRA (Норми за трудови часове) – Официални времеви стандарти за ремонти.",
      "Обхваща ВСИЧКИ модели на Mercedes-Benz до 2022 г. включително (леки и товарни автомобили).",
      "Офлайн работа след инсталация",
    ],
    specifications: {
      "Операционна система": "Windows 7/10/11 (64-bit препоръчително)",
      RAM: "Минимум 4GB RAM (по-добре 8GB+)",
      "Дисково пространство": "50GB+ свободно място на диска",
    },
  },
]

export function getProductBySlug(slug: string): Product | undefined {
  console.log("Searching for slug:", slug)

  // Try exact match first
  let product = products.find((product) => product.slug === slug)
  if (product) {
    console.log("Found product with exact match:", product)
    return product
  }

  // Try decoded slug match
  const decodedSlug = decodeURIComponent(slug)
  product = products.find((product) => product.slug === decodedSlug)
  if (product) {
    console.log("Found product with decoded match:", product)
    return product
  }

  // Try case-insensitive match
  const lowerSlug = slug.toLowerCase()
  product = products.find((product) => product.slug.toLowerCase() === lowerSlug)
  if (product) {
    console.log("Found product with case-insensitive match:", product)
    return product
  }

  // Try decoded case-insensitive match
  const decodedLowerSlug = decodeURIComponent(slug).toLowerCase()
  product = products.find((product) => product.slug.toLowerCase() === decodedLowerSlug)
  if (product) {
    console.log("Found product with decoded case-insensitive match:", product)
    return product
  }

  console.log("No product found for slug:", slug)
  console.log(
    "Available slugs:",
    products.map((p) => p.slug),
  )
  return undefined
}
