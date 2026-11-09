"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { ArrowRight, Leaf, Truck, X } from "lucide-react";
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
        <span className="offer-edition"><Leaf size={13} /> AMZAD FOOD</span>
        <div className="offer-product-stage">
          <span className="offer-stage-ring" aria-hidden="true" />
          <span className="offer-product-spark offer-product-spark-one" aria-hidden="true">✳</span>
          <span className="offer-product-spark offer-product-spark-two" aria-hidden="true">✧</span>
          <img src="/amzad-food-website/products/delight-naru-combo.png" alt="Amzad Food Delight Naru gift collection" />
        </div>
        <span className="offer-visual-caption">A box full of <em>goodness.</em></span>
      </div>
      <div className="offer-content">
        <span className="offer-invitation"><span aria-hidden="true" /> A little treat for you</span>
        <h2 id="offer-popup-title">Good food.<br /><em>Better deals.</em></h2>
        <div className="offer-perk-ticket">
          <div className="offer-ticket-icon"><Truck size={24} /></div>
          <div><strong>Free delivery</strong><p>On orders ৳{FREE_DELIVERY_MINIMUM.toLocaleString("en-IN")}+</p></div>

        </div>
        <a className="offer-shop-button" href="/amzad-food-website/?offers=1#shop" onClick={close}><span>Shop offers</span><ArrowRight size={19} /></a>
        <button className="offer-continue" onClick={close}>Maybe later</button>
      </div>
    </div>
  </div>, document.body);
}
