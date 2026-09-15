export type CartItem = { name: string; price: number; image: string; qty: number };

const CART_KEY = "amzad-cart";

export function loadCart(): CartItem[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(CART_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function saveCart(cart: CartItem[]) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
  } catch {
    // localStorage unavailable (private mode, quota, etc.) — cart just won't persist across pages
  }
}
