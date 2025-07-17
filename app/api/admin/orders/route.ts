import { NextResponse } from "next/server"
import { getAllOrders } from "@/lib/kv"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const page = Number.parseInt(searchParams.get("page") || "1", 10)
  const pageSize = Number.parseInt(searchParams.get("pageSize") || "10", 10)
  const search = searchParams.get("search") || ""

  try {
    const { orders, total } = await getAllOrders(page, pageSize, search)
    return NextResponse.json({ orders, total, page, pageSize })
  } catch (error) {
    console.error("Error fetching orders:", error)
    return NextResponse.json({ error: "Failed to fetch orders" }, { status: 500 })
  }
}
