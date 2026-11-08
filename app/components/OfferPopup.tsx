"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { ArrowRight, Gift, Leaf, Truck, X } from "lucide-react";
import { useModalDialog } from "../lib/useModalDialog";
import { FREE_DELIVERY_MINIMUM } from "../lib/offers";

export default function OfferPopup() {
  const [open, setOpen] = useState(false);
  const dialog = useRef<HTMLDivElement>(null);
  const close = useCallback(() => setOpen(false), []);
  useModalDialog(dialog, open, close);
  useEffect(() => {
    const timer = window.setTimeout(() => {
      setOpen(true);
    }, 5000);
    return () => window.clearTimeout(timer);
  }, []);
  if (!open) return null;
  return createPortal(<div className="offer-popup-backdrop" onClick={close}>
    <div ref={dialog} className="offer-popup" role="dialog" aria-modal="true" aria-labelledby="offer-popup-title" tabIndex={-1} onClick={event => event.stopPropagation()}>
      <button className="offer-popup-close" aria-label="Close offers" onClick={close}><X size={20} /></button>
      <div className="offer-visual">
        <span className="offer-edition"><Leaf size={13} /> THE GOOD FOOD EDIT</span>
        <div className="offer-visual-title">Good food.<br /><em>Better deals.</em></div>
        <div className="offer-product-stage">
          <span className="offer-stage-ring" aria-hidden="true" />
          <img src="/amzad-food-website/products/delight-naru-combo.png" alt="Amzad Food Delight Naru gift collection" />
          <span className="offer-curated"><Gift size={15} /> Packed with goodness</span>
        </div>
        <span className="offer-visual-footer">PANTRY FAVOURITES · THOUGHTFULLY CHOSEN</span>
      </div>
      <div className="offer-content">
        <span className="offer-invitation"><span aria-hidden="true" /> A little treat from Amzad</span>
        <h2 id="offer-popup-title">Your favourites.<br /><em>A little less.</em></h2>
        <p className="offer-intro">Bring home the foods you love, with a little extra goodness on us.</p>
        <div className="offer-perk-ticket">
          <div className="offer-ticket-icon"><Truck size={24} /></div>
          <div><span className="offer-ticket-label">DELIVERY IS ON US</span><strong>Shop ৳{FREE_DELIVERY_MINIMUM.toLocaleString("en-IN")}+</strong><p>Free delivery. Automatically applied.</p></div>
          <span className="offer-ticket-edge" aria-hidden="true" />
        </div>
        <a className="offer-shop-button" href="/amzad-food-website/?offers=1#shop" onClick={close}><span>Discover the offers</span><ArrowRight size={19} /></a>
        <button className="offer-continue" onClick={close}>I’ll explore on my own</button>
        <span className="offer-fineprint">Savings on selected products. No code needed.</span>
      </div>
    </div>
  </div>, document.body);
}
