import { SavedOrder } from "./orders";
export const orderStatuses = ["To Pay", "Processing", "Approved", "Ready to Ship", "Shipped", "Delivered", "Completed", "Cancelled", "Returned"] as const;
export type OrderStatus = typeof orderStatuses[number];
export const statusOf = (order: SavedOrder): OrderStatus => order.status || "Processing";
export const money = (value: number) => `৳${value.toLocaleString("en-IN")}`;
export const orderDate = (value: number) => new Date(value).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
export const trackingSteps = ["Order Placed", "Order Approved", "Order Ready to Ship", "Order Handover to Courier", "Order Delivered"];
export const progressOf = (order: SavedOrder) => ({ "To Pay": 0, Processing: 0, Approved: 1, "Ready to Ship": 2, Shipped: 3, Delivered: 4, Completed: 4, Cancelled: 0, Returned: 4 })[statusOf(order)];

export const isDelivered = (order: SavedOrder) => ["Delivered", "Completed"].includes(statusOf(order));
export const isTerminal = (order: SavedOrder) => ["Delivered", "Completed", "Cancelled", "Returned"].includes(statusOf(order));
export const statusNote = (order: SavedOrder) => ({
  "To Pay": "Your order is awaiting payment. Contact our team for payment details.",
  Processing: "We have received your order. Our team will confirm delivery details by phone.",
  Approved: "Your order has been approved and is being prepared.",
  "Ready to Ship": "Your order is packed and ready to hand over to the courier.",
  Shipped: "Your order has been handed over to the courier and is on its way.",
  Delivered: "Your order has been delivered. Thank you for shopping with Amzad Food.",
  Completed: "Your order is completed. Thank you for shopping with Amzad Food.",
  Cancelled: "This order has been cancelled. Contact our team if you have any questions.",
  Returned: "This order has been returned. Contact our team for return or refund details.",
})[statusOf(order)];
