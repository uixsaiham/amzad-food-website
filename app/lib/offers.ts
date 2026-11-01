// Automatic offer eligibility uses the merchandise subtotal before promo discounts.
export const FREE_DELIVERY_MINIMUM = 1000;
export const DELIVERY_FEE = 60;

export const qualifiesForFreeDelivery = (subtotal: number) => subtotal >= FREE_DELIVERY_MINIMUM;
export const getDeliveryFee = (subtotal: number) => subtotal <= 0 || qualifiesForFreeDelivery(subtotal) ? 0 : DELIVERY_FEE;
