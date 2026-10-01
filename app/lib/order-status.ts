import { SavedOrder } from "./orders";
export const orderStatuses = ["Processing", "Approved", "Delivered", "Completed", "Cancelled", "Returned"] as const;
export type OrderStatus = typeof orderStatuses[number];
export const statusOf = (order: SavedOrder): OrderStatus => {
  // Keep older browser orders visible after simplifying the customer-facing flow.
  const status = order.status as string | undefined;
  if (status === "Ready to Ship" || status === "Shipped") return "Approved";
  return orderStatuses.includes(status as OrderStatus) ? status as OrderStatus : "Processing";
};
export const money = (value: number) => `৳${value.toLocaleString("en-IN")}`;
export const orderDate = (value: number) => new Date(value).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
export const trackingSteps = ["Order Placed", "Order Approved", "Order Delivered", "Order Completed"];
export const progressOf = (order: SavedOrder) => ({ Processing: 0, Approved: 1, Delivered: 2, Completed: 3, Cancelled: 0, Returned: 2 })[statusOf(order)];

export const isDelivered = (order: SavedOrder) => ["Delivered", "Completed"].includes(statusOf(order));
export const isTerminal = (order: SavedOrder) => ["Delivered", "Completed", "Cancelled", "Returned"].includes(statusOf(order));
export const statusNote = (order: SavedOrder) => ({
  Processing: "We have received your order. Our team will confirm delivery details by phone.",
  Approved: "Your order has been approved and is being prepared.",
  Delivered: "Your order has been delivered. Thank you for shopping with Amzad Food.",
  Completed: "Your order is completed. Thank you for shopping with Amzad Food.",
  Cancelled: "This order has been cancelled. Contact our team if you have any questions.",
  Returned: "This order has been returned. Contact our team for return or refund details.",
})[statusOf(order)];
