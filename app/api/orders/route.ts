import { NextResponse } from "next/server"
import { storeOrder, getOrder } from "@/lib/kv"
import { sendNewOrderEmail } from "@/lib/email"

export async function POST(req: Request) {
  try {
    const orderData = await req.json()
    console.log("Received order data:", orderData)

    const orderId = await storeOrder(orderData)
    console.log("Order stored with ID:", orderId)

    // Fetch the complete order data
    const order = await getOrder(orderId)

    if (order) {
      console.log("Sending email notification for order:", orderId)
      // Send email notification to admin
      await sendNewOrderEmail(order)
      console.log("Email notification sent successfully")
    } else {
      console.error("Failed to fetch order data for ID:", orderId)
    }

    return NextResponse.json({ orderId }, { status: 201 })
  } catch (error) {
    console.error("Error processing order:", error)
    return NextResponse.json({ error: "Failed to process order" }, { status: 500 })
  }
}
