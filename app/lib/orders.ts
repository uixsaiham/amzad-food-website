import { CartItem, isCartItem } from "./cart";

// Orders placed on this browser, so the Track Order page can find them. There is no backend yet.
export type SavedOrder = {
  id: string; items: CartItem[]; total: number; deliveryFee: number;
  name: string; phone: string; address: string; eta: string; placedAt: number;
  status?: import("./order-status").OrderStatus;
  updates?: { label: string; note: string; at: number }[];
  discount?: number;
};

const ORDERS_KEY = "amzad-orders";

export function isSavedOrder(value: unknown): value is SavedOrder {
  if (!value || typeof value !== "object") return false;
  const order = value as Partial<SavedOrder>;
  const amount = (v: unknown) => typeof v === "number" && Number.isFinite(v) && v >= 0;
  return typeof order.id === "string" && order.id.length > 0 &&
    Array.isArray(order.items) && order.items.every(isCartItem) &&
    amount(order.total) && amount(order.deliveryFee) && amount(order.placedAt) &&
    Math.abs(order.placedAt as number) <= 8.64e15 &&
    [order.name, order.phone, order.address, order.eta].every(v => typeof v === "string") &&
    (order.status === undefined || ["Processing", "Approved", "Delivered", "Completed", "Cancelled", "Returned", "Ready to Ship", "Shipped"].includes(order.status)) &&
    (order.discount === undefined || amount(order.discount)) &&
    (order.updates === undefined || (Array.isArray(order.updates) && order.updates.every(update =>
      update && typeof update.label === "string" && typeof update.note === "string" && amount(update.at) && update.at <= 8.64e15)));
}

export function loadOrders(): SavedOrder[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(ORDERS_KEY);
    const parsed: unknown = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed.filter(isSavedOrder).slice(0, 20) : [];
  } catch {
    return [];
  }
}

export function saveOrder(order: SavedOrder) {
  if (typeof window === "undefined" || !isSavedOrder(order)) return false;
  try {
    localStorage.setItem(ORDERS_KEY, JSON.stringify([order, ...loadOrders().filter(item => item.id !== order.id)].slice(0, 20)));
    return true;
  } catch {
    return false;
  }
}

export const findOrder = (id: string) => loadOrders().find(order => order.id.toUpperCase() === id.trim().toUpperCase().replace(/^#/, ""));

// Demo order so the tracker can be tried without placing an order first.
export const sampleOrder = (): SavedOrder => ({
  id: "AF102345",
  items: [
    { name: "Khejurer Patali Gur", price: 1100, qty: 1, image: "/amzad-food-website/products/khejurer-patali-gur.png" },
    { name: "Pera Sondesh", price: 1350, qty: 1, image: "/amzad-food-website/products/pera-sondesh.png" },
    { name: "Mustard Oil 5 Ltr", price: 1450, qty: 1, image: "/amzad-food-website/products/mustard-oil-5-ltr.png" },
  ],
  total: 3960, deliveryFee: 60,
  name: "Farhana Akter", phone: "01712345678", address: "House 12, Road 5, Dhanmondi, Dhaka",
  eta: "2–3 business days", placedAt: Date.UTC(2026, 8, 28, 10, 15), status: "Completed",
  updates: [
    { label: "Order Delivered", note: "Your parcel has been delivered. Enjoy your Amzad Food favourites!", at: Date.UTC(2026, 8, 30, 6, 30) },
    { label: "Order Handover to Courier", note: "Your parcel is on its way to your delivery address.", at: Date.UTC(2026, 8, 29, 8, 0) },
    { label: "Order Ready to Ship", note: "Your items have been quality checked and packed.", at: Date.UTC(2026, 8, 29, 4, 0) },
    { label: "Order Approved", note: "Your order has been confirmed.", at: Date.UTC(2026, 8, 28, 11, 0) },
    { label: "Order Placed", note: "We received your order.", at: Date.UTC(2026, 8, 28, 10, 15) },
  ],
});

// Separate processing preview; never added to the customer’s saved orders.
export const sampleProcessingOrder = (): SavedOrder => ({
  ...sampleOrder(),
  id: "AF102346",
  status: "Processing",
  placedAt: Date.UTC(2026, 8, 30, 10, 15),
  updates: [{ label: "Order Placed", note: "We received your order. Awaiting confirmation from our team.", at: Date.UTC(2026, 8, 30, 10, 15) }],
});
