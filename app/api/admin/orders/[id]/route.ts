import { NextResponse } from "next/server"
import { updateOrderStatus, getOrder } from "@/lib/kv"
import { sendOrderStatusEmail } from "@/lib/email"

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  try {
    const { status } = await req.json()
    await updateOrderStatus(params.id, status)

    // Get updated order and send email
    const updatedOrder = await getOrder(params.id)
    if (updatedOrder) {
      await sendOrderStatusEmail(updatedOrder)
    }

    return NextResponse.json({ message: "Order status updated successfully" })
  } catch (error) {
    console.error("Error updating order status:", error)
    return NextResponse.json({ error: "Failed to update order status" }, { status: 500 })
  }
}
