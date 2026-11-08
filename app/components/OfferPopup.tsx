"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Gift, Truck, X } from "lucide-react";
import { useModalDialog } from "../lib/useModalDialog";
import { FREE_DELIVERY_MINIMUM } from "../lib/offers";

export default function OfferPopup() {
  const [open, setOpen] = useState(false);
  const dialog = useRef<HTMLDivElement>(null);
  const close = useCallback(() => setOpen(false), []);
  useModalDialog(dialog, open, close);
  useEffect(() => {
    let shown = false;
    try { shown = sessionStorage.getItem("amzad-offer-shown") === "1"; } catch {}
    if (shown) return;
    const timer = window.setTimeout(() => {
      setOpen(true);
      try { sessionStorage.setItem("amzad-offer-shown", "1"); } catch {}
    }, 5000);
    return () => window.clearTimeout(timer);
  }, []);
  if (!open) return null;
  return createPortal(<div className="offer-popup-backdrop" onClick={close}>
    <div ref={dialog} className="offer-popup" role="dialog" aria-modal="true" aria-labelledby="offer-popup-title" tabIndex={-1} onClick={event => event.stopPropagation()}>
      <button className="offer-popup-close" aria-label="Close offers" onClick={close}><X size={20} /></button>
      <Gift className="offer-popup-gift" size={40} />
      <h2 id="offer-popup-title">A little more, for less</h2>
      <div className="offer-popup-deal"><Gift size={22} /><div><strong>Offers on your favourites</strong><p>Explore discounted pantry essentials and combo packs.</p></div></div>
      <div className="offer-popup-deal"><Truck size={22} /><div><strong>Free delivery on ৳{FREE_DELIVERY_MINIMUM.toLocaleString("en-IN")}+</strong><p>Applied automatically to eligible orders.</p></div></div>
      <a className="cta" href="/amzad-food-website/?offers=1#shop" onClick={close}>Shop offers <Gift size={17} /></a>
    </div>
  </div>, document.body);
}
