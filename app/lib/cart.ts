export type CartItem = { name: string; price: number; image: string; qty: number };
export type CartLine = Omit<CartItem, "qty">;

const CART_KEY = "amzad-cart";
export const MAX_CART_QTY = 20;
export const clampQuantity = (qty: number) => Math.max(1, Math.min(MAX_CART_QTY, Number.isFinite(qty) ? Math.trunc(qty) : 1));

export function isCartItem(value: unknown): value is CartItem {
  if (!value || typeof value !== "object") return false;
  const item = value as Partial<CartItem>;
  return typeof item.name === "string" && item.name.trim().length > 0 &&
    typeof item.price === "number" && Number.isFinite(item.price) && item.price >= 0 &&
    typeof item.image === "string" && typeof item.qty === "number" &&
    Number.isInteger(item.qty) && item.qty > 0;
}

export function loadCart(): CartItem[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(CART_KEY);
    const parsed: unknown = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed.filter(isCartItem).map(item => ({ ...item, qty: clampQuantity(item.qty) })) : [];
  } catch {
    return [];
  }
}

export function saveCart(cart: CartItem[]) {
  if (typeof window === "undefined") return;
  try {
    const value = JSON.stringify(cart);
    if (localStorage.getItem(CART_KEY) === value) return;
    localStorage.setItem(CART_KEY, value);
    window.dispatchEvent(new Event("amzad-cart-updated"));
  } catch {
    // localStorage unavailable (private mode, quota, etc.) — cart just won't persist across pages
  }
}
