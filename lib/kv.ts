import { sql } from "./db"

export interface Order {
  id: string
  firstName: string
  lastName: string
  email: string
  country: string
  city: string
  street: string
  phoneNumber: string
  items: Array<{
    id: number
    name: string
    price: number
    quantity: number
  }>
  total: number
  status: "pending" | "processing" | "shipped" | "delivered"
  createdAt: string
}

export async function storeOrder(order: Omit<Order, "id" | "createdAt" | "status">): Promise<string> {
  const { rows } = await sql`
    INSERT INTO orders (first_name, last_name, email, country, city, street, phone_number, total, status)
    VALUES (${order.firstName}, ${order.lastName}, ${order.email}, ${order.country}, ${order.city}, ${order.street}, ${order.phoneNumber}, ${order.total}, 'pending')
    RETURNING id
  `
  const newOrderId = rows[0].id

  for (const item of order.items) {
    await sql`
      INSERT INTO order_items (order_id, product_id, name, price, quantity)
      VALUES (${newOrderId}, ${item.id}, ${item.name}, ${item.price}, ${item.quantity})
    `
  }

  return newOrderId
}

export async function getOrder(id: string): Promise<Order | null> {
  const {
    rows: [order],
  } = await sql`SELECT * FROM orders WHERE id = ${id}`
  if (!order) return null

  const { rows: items } = await sql`SELECT * FROM order_items WHERE order_id = ${id}`

  return {
    id: order.id,
    firstName: order.first_name,
    lastName: order.last_name,
    email: order.email,
    country: order.country,
    city: order.city,
    street: order.street,
    phoneNumber: order.phone_number,
    items: items.map((item) => ({
      id: item.product_id,
      name: item.name,
      price: Number.parseFloat(item.price),
      quantity: item.quantity,
    })),
    total: Number.parseFloat(order.total),
    status: order.status,
    createdAt: order.created_at.toISOString(),
  }
}

export async function getAllOrders(page = 1, pageSize = 10, search = ""): Promise<{ orders: Order[]; total: number }> {
  const offset = (page - 1) * pageSize
  const searchTerm = `%${search}%`

  const { rows: orders } = await sql`
    SELECT * FROM orders
    WHERE id::text ILIKE ${searchTerm}
       OR first_name ILIKE ${searchTerm}
       OR last_name ILIKE ${searchTerm}
       OR email ILIKE ${searchTerm}
       OR status ILIKE ${searchTerm}
    ORDER BY created_at DESC
    LIMIT ${pageSize} OFFSET ${offset}
  `

  const {
    rows: [{ count }],
  } = await sql`
    SELECT COUNT(*) FROM orders
    WHERE id::text ILIKE ${searchTerm}
       OR first_name ILIKE ${searchTerm}
       OR last_name ILIKE ${searchTerm}
       OR email ILIKE ${searchTerm}
       OR status ILIKE ${searchTerm}
  `

  const ordersWithItems = await Promise.all(
    orders.map(async (order) => {
      const { rows: items } = await sql`SELECT * FROM order_items WHERE order_id = ${order.id}`
      return {
        id: order.id,
        firstName: order.first_name,
        lastName: order.last_name,
        email: order.email,
        country: order.country,
        city: order.city,
        street: order.street,
        phoneNumber: order.phone_number,
        items: items.map((item) => ({
          id: item.product_id,
          name: item.name,
          price: Number.parseFloat(item.price),
          quantity: item.quantity,
        })),
        total: Number.parseFloat(order.total),
        status: order.status,
        createdAt: order.created_at.toISOString(),
      }
    }),
  )

  return {
    orders: ordersWithItems,
    total: Number.parseInt(count),
  }
}

export async function updateOrderStatus(id: string, status: Order["status"]): Promise<void> {
  await sql`UPDATE orders SET status = ${status} WHERE id = ${id}`
}
