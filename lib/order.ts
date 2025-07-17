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
