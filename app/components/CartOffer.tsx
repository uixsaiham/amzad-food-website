import { Check, Truck } from "lucide-react";
import { DELIVERY_FEE, FREE_DELIVERY_MINIMUM, getFreeDeliveryProgress, qualifiesForFreeDelivery } from "../lib/offers";

export default function CartOffer({ subtotal }: { subtotal: number }) {
  const orderValue = Number.isFinite(subtotal) ? Math.max(0, subtotal) : 0;
  const unlocked = qualifiesForFreeDelivery(orderValue);
  const remaining = Math.max(0, FREE_DELIVERY_MINIMUM - orderValue);
  const progress = getFreeDeliveryProgress(orderValue);

  return <section className={`cart-offer${unlocked ? " unlocked" : ""}`} aria-label="Free delivery offer">
    <div className="cart-offer-heading">
      <span className="cart-offer-icon">{unlocked ? <Check size={19} /> : <Truck size={19} />}</span>
      <div aria-live="polite" aria-atomic="true">
        <strong className="cart-offer-threshold">{unlocked ? <>Free delivery unlocked <span>· Save ৳{DELIVERY_FEE}</span></> : <>Free delivery on ৳{FREE_DELIVERY_MINIMUM.toLocaleString("en-IN")}+ <span>· Add ৳{remaining.toLocaleString("en-IN")}</span></>}</strong>
      </div>
    </div>
    <div className="cart-offer-progress" role="progressbar" aria-label="Progress toward free delivery" aria-valuetext={`৳${orderValue.toLocaleString("en-IN")} of ৳${FREE_DELIVERY_MINIMUM.toLocaleString("en-IN")} minimum order for free delivery`} aria-valuenow={progress} aria-valuemin={0} aria-valuemax={100}>
      <span style={{ width: `${progress}%` }} />
    </div>

  </section>;
}
