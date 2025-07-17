import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ClientLayout } from "@/components/client-layout"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "STTuning KZ - Professional Car Remapping Services",
  description:
    "Expert car remapping and tuning services in Kazanlak, Bulgaria. Boost your vehicle's performance with our professional ECU tuning solutions.",
  metadataBase: new URL("https://sttuning-kz.com"),
  openGraph: {
    title: "STTuning KZ",
    description: "Professional ECU Remapping & Performance Tuning in Kazanlak, Bulgaria",
    url: "https://sttuning-kz.com",
    siteName: "ST Tuning KZ",
    locale: "en",
    type: "website",
  },
    generator: 'v0.dev'
}

async function runMigration() {
  try {
    const response = await fetch("/api/migrate")
    const data = await response.json()
    console.log("Migration result:", data.message)
  } catch (error) {
    console.error("Failed to run migration:", error)
  }
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  await runMigration()

  return (
    <html lang="en" className="dark">
      <body className={inter.className}>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  )
}
