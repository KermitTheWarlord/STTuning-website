import { sql } from "@vercel/postgres"

export async function migrate() {
  try {
    // Check if orders table exists
    const { rows: ordersTableExists } = await sql`
      SELECT EXISTS (
        SELECT FROM information_schema.tables 
        WHERE table_schema = 'public'
        AND table_name = 'orders'
      );
    `

    if (!ordersTableExists[0].exists) {
      // Create orders table
      await sql`
        CREATE TABLE orders (
          id SERIAL PRIMARY KEY,
          first_name VARCHAR(255) NOT NULL,
          last_name VARCHAR(255) NOT NULL,
          email VARCHAR(255) NOT NULL,
          country VARCHAR(255) NOT NULL,
          city VARCHAR(255) NOT NULL,
          street VARCHAR(255) NOT NULL,
          phone_number VARCHAR(255) NOT NULL,
          total DECIMAL(10, 2) NOT NULL,
          status VARCHAR(50) NOT NULL,
          created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
        )
      `
      console.log("Orders table created successfully")
    } else {
      console.log("Orders table already exists")
    }

    // Check if order_items table exists
    const { rows: orderItemsTableExists } = await sql`
      SELECT EXISTS (
        SELECT FROM information_schema.tables 
        WHERE table_schema = 'public'
        AND table_name = 'order_items'
      );
    `

    if (!orderItemsTableExists[0].exists) {
      // Create order_items table
      await sql`
        CREATE TABLE order_items (
          id SERIAL PRIMARY KEY,
          order_id INTEGER REFERENCES orders(id),
          product_id INTEGER NOT NULL,
          name VARCHAR(255) NOT NULL,
          price DECIMAL(10, 2) NOT NULL,
          quantity INTEGER NOT NULL
        )
      `
      console.log("Order_items table created successfully")
    } else {
      console.log("Order_items table already exists")
    }

    console.log("Migration completed successfully")
  } catch (error) {
    console.error("Migration failed:", error)
    throw error
  }
}
