import { SavedOrder } from "./orders";
import { orderStatuses, statusNote } from "./order-status";
import { storeProducts } from "./products";

// Cover every catalogue product once, across the six customer-facing stages.
// Preview orders are never persisted or mixed into a customer's real history.
export function demoOrders(): SavedOrder[] {
  const size = Math.ceil(storeProducts.length / orderStatuses.length);
  return orderStatuses.map((status, index) => {
    const items = storeProducts.slice(index * size, (index + 1) * size).map(product => ({ name: product.name, price: product.price, image: product.image, qty: 1 }));
    const placedAt = Date.UTC(2026, 8, 24 + index, 10, 15);
    const order: SavedOrder = {
      id: `AFDEMO${String(index + 1).padStart(3, "0")}`,
      items,
      status,
      total: items.reduce((sum, item) => sum + item.price * item.qty, 0) + 60,
      deliveryFee: 60,
      name: "Sample Customer",
      phone: "Not provided in preview",
      address: "Sample delivery address, Dhaka",
      eta: "2–3 business days",
      placedAt,
    };
    const updates = [{ label: "Order Placed", note: "We received your order.", at: placedAt }];
    if (["Approved", "Delivered", "Completed", "Returned"].includes(status)) updates.push({ label: "Order Approved", note: "Your order has been confirmed.", at: placedAt + 3600000 });
    if (["Delivered", "Completed", "Returned"].includes(status)) updates.push({ label: "Order Delivered", note: "Your parcel was delivered.", at: placedAt + 86400000 });
    if (["Completed", "Cancelled", "Returned"].includes(status)) updates.push({ label: `Order ${status}`, note: statusNote(order), at: placedAt + 90000000 });
    order.updates = updates.reverse();
    return order;
  }).filter(order => order.items.length > 0);
}
