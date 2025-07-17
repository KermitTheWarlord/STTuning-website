import type { Order } from "@/lib/kv"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"

interface DetailedOrderViewProps {
  order: Order
  onClose: () => void
}

export function DetailedOrderView({ order, onClose }: DetailedOrderViewProps) {
  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Order Details</DialogTitle>
          <DialogClose asChild>
            <Button variant="ghost" size="icon">
              <X className="h-4 w-4" />
            </Button>
          </DialogClose>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div>
            <h3 className="font-semibold">Order ID</h3>
            <p>{order.id}</p>
          </div>
          <div>
            <h3 className="font-semibold">Customer</h3>
            <p>
              {order.firstName} {order.lastName}
            </p>
          </div>
          <div>
            <h3 className="font-semibold">Address</h3>
            <p>
              {order.street}, {order.city}, {order.country}
            </p>
          </div>
          <div>
            <h3 className="font-semibold">Phone</h3>
            <p>{order.phoneNumber}</p>
          </div>
          <div>
            <h3 className="font-semibold">Status</h3>
            <p>{order.status}</p>
          </div>
          <div>
            <h3 className="font-semibold">Items</h3>
            <ul>
              {order.items.map((item, index) => (
                <li key={index}>
                  {item.name} - Quantity: {item.quantity} - ${item.price.toFixed(2)}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-semibold">Total</h3>
            <p>${order.total.toFixed(2)}</p>
          </div>
          <div>
            <h3 className="font-semibold">Order Date</h3>
            <p>{new Date(order.createdAt).toLocaleString()}</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
