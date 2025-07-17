"use client"

import type React from "react"

import { CartProvider } from "@/lib/cart-context"

export function ClientLayout({ children }: { children: React.ReactNode }) {
  return <CartProvider>{children}</CartProvider>
}
