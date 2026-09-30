import { Check, Truck } from "lucide-react";
import { DELIVERY_FEE, FREE_DELIVERY_MINIMUM, qualifiesForFreeDelivery } from "../lib/offers";

export default function CartOffer({ subtotal }: { subtotal: number }) {
  const unlocked = qualifiesForFreeDelivery(subtotal);
  const remaining = Math.max(0, FREE_DELIVERY_MINIMUM - subtotal);
  const progress = Math.max(0, Math.min(100, subtotal / FREE_DELIVERY_MINIMUM * 100));

  return <section className={`cart-offer${unlocked ? " unlocked" : ""}`} aria-label="Free delivery offer">
    <div className="cart-offer-heading">
      <span className="cart-offer-icon">{unlocked ? <Check size={19} /> : <Truck size={19} />}</span>
      <div aria-live="polite" aria-atomic="true">
        <strong>{unlocked ? "Free delivery unlocked!" : "A little more, delivered free"}</strong>
        <p>{unlocked ? `You save ৳${DELIVERY_FEE} on delivery.` : <>Add <b>৳{remaining.toLocaleString("en-IN")}</b> more for free delivery.</>}</p>
      </div>
    </div>
    <div className="cart-offer-progress" role="progressbar" aria-label="Progress toward free delivery" aria-valuenow={Math.round(progress)} aria-valuemin={0} aria-valuemax={100}>
      <span style={{ width: `${progress}%` }} />
    </div>
    <small>Orders ৳{FREE_DELIVERY_MINIMUM.toLocaleString("en-IN")}+ · Applied automatically</small>
  </section>;
}
