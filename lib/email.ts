import { Resend } from "resend"
import type { Order } from "./kv"

const resend = new Resend(process.env.RESEND_API_KEY)

const ADMIN_EMAIL = process.env.ADMIN_EMAIL

export async function sendNewOrderEmail(order: Order) {
  if (!ADMIN_EMAIL) {
    console.error("ADMIN_EMAIL is not set. Skipping admin notification.")
    return
  }

  await resend.emails.send({
    from: "ST Tuning <onboarding@resend.dev>",
    to: ADMIN_EMAIL,
    subject: "New Order Received",
    html: `
      <h1>New Order Received</h1>
      <p>A new order has been received. Here are the details:</p>
      <ul>
        <li>Order ID: ${order.id}</li>
        <li>Customer: ${order.firstName} ${order.lastName}</li>
        <li>Email: ${order.email}</li>
        <li>Total: $${order.total.toFixed(2)}</li>
      </ul>
      <p>Please check your admin panel for full order details and to process the order.</p>
    `,
  })
}

export async function sendOrderStatusEmail(order: Order) {
  await resend.emails.send({
    from: "ST Tuning <onboarding@resend.dev>",
    to: order.email,
    subject: `Your Order Status Has Been Updated`,
    html: `
      <h1>Order Status Update</h1>
      <p>Dear ${order.firstName} ${order.lastName},</p>
      <p>Your order (ID: ${order.id}) status has been updated to: ${order.status}</p>
      <p>Thank you for your business!</p>
    `,
  })
}
