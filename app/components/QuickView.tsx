"use client";

import { useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Check, Clock, Minus, Phone, Plus, Truck, X } from "lucide-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import { CartLine } from "../lib/cart";
import { Product, getProductBrand, withDemoVariants } from "../lib/products";
import ProductGallery from "./ProductGallery";
import { getProductDetails } from "../lib/product-details";
import { useModalDialog } from "../lib/useModalDialog";
import { DELIVERY_DESCRIPTION } from "../lib/offers";

type QuickViewProduct = Product;
type Tab = "info" | "usage" | "delivery";

const tabs: { key: Tab; label: string }[] = [{ key: "info", label: "Product Info" }, { key: "usage", label: "How to Use" }, { key: "delivery", label: "Delivery" }];
export default function QuickView({ product, onAdd, onOrderNow, onClose, embedded = false, initialQuantity = 1 }: {
  embedded?: boolean;
  initialQuantity?: number;
  product: QuickViewProduct;
  onAdd: (item: CartLine, qty: number) => void;
  onOrderNow: (item: CartLine, qty: number) => void;
  onClose: () => void;
}) {
  const info = getProductDetails(product);
  const dialog = useRef<HTMLDivElement>(null);
  useModalDialog(dialog, !embedded, onClose);
  const [qty, setQty] = useState(initialQuantity);
  const [tab, setTab] = useState<Tab>("info");
  const variants = withDemoVariants(product).variants!;
  const [variantId, setVariantId] = useState(() => variants.find((variant) => variant.label === product.unit)?.id ?? variants[0].id);
  const selected = variants.find((variant) => variant.id === variantId) ?? variants[0];
  const selectedProduct = { ...product, price: selected.price, oldPrice: selected.oldPrice, unit: selected.label, image: selected.image, images: selected.image === product.image ? product.images : undefined };

  const price = selected.price;
  const saving = Math.max(0, (selected.oldPrice ?? price) - price);
  const line: CartLine = { name: `${product.name} (${selected.label})`, price, image: selected.image };
  const whatsappText = encodeURIComponent(`Hello Amzad Food, I would like to order ${qty} × ${line.name} (৳${price * qty}).`);
  const infoRows: [string, string][] = [["Brand", getProductBrand(product)], ["Category", product.category], ["Pack", selected.label]];

  const content = (
    <div className={embedded ? "pd-product" : "qv-backdrop"} onClick={onClose} role="presentation">
      <div ref={dialog} tabIndex={-1} className="qv" role={embedded ? undefined : "dialog"} aria-modal={embedded ? undefined : true} aria-label={`Quick view ${product.name}`} onClick={(event) => event.stopPropagation()}>
        {!embedded && <button className="qv-close" onClick={onClose} aria-label="Close quick view"><X size={18} /></button>}

        <div className="qv-scroll">
        <div className="qv-media">
          {saving > 0 && <span className="qv-save">Save ৳{saving}</span>}
          {product.tag && <span className="qv-tag">{product.tag}</span>}
          <ProductGallery key={`${product.name}-${selected.id}`} product={selectedProduct} />
        </div>

        <div className="qv-body">
          <div className="qv-meta"><span className="qv-cat">{product.category}</span></div>
          {embedded ? <h1 className="qv-title"><span>{product.bn ?? product.name}</span>{product.name}</h1> : <h2 className="qv-title"><span>{product.bn ?? product.name}</span>{product.name}</h2>}
          <div className="qv-price"><strong>৳{price}</strong>{saving > 0 && <><del>৳{selected.oldPrice}</del><em>You save ৳{saving}</em></>}</div>
          <p className="qv-blurb">{info.blurb}</p>

          <ul className="qv-highlights">{info.highlights.map((item) => <li key={item}><Check size={14} />{item}</li>)}</ul>

          <div className="qv-offer"><Truck size={16} /><span>Cash on Delivery available · Free delivery on orders ৳1,000+</span></div>

          <div className="qv-block">
            <h4>Select Size <small>{selected.label}</small></h4>
            <div className="qv-sizes" role="group" aria-label={`Pack size for ${product.name}`}>
              {variants.map((variant) => <button key={variant.id} type="button" className={variant.id === selected.id ? "active" : ""} aria-pressed={variant.id === selected.id} onClick={() => setVariantId(variant.id)}><b>{variant.label}</b><span>৳{variant.price}</span></button>)}
            </div>
          </div>

          <div className="qv-buy">
            <div className="qv-qty"><button onClick={() => setQty((value) => Math.max(1, value - 1))} aria-label="Decrease quantity" disabled={qty === 1}><Minus size={14} /></button><b aria-live="polite">{qty}</b><button onClick={() => setQty((value) => Math.min(20, value + 1))} aria-label="Increase quantity" disabled={qty === 20}><Plus size={14} /></button></div>
            <strong className="qv-line-total" aria-live="polite">Total: ৳{price * qty}</strong>
            <button className="qv-add cta" onClick={() => { onAdd(line, qty); onClose(); }}><span>Add to Cart · ৳{price * qty}</span></button>
            <button className="qv-order cta cta-dark" onClick={() => { onOrderNow(line, qty); onClose(); }}><span>Order Now</span></button>
          </div>
          <div className="qv-contact">
            <a className="qv-whatsapp" href={`https://wa.me/8801327406605?text=${whatsappText}`} target="_blank" rel="noreferrer" aria-label="Order via WhatsApp 01327406605"><FontAwesomeIcon icon={faWhatsapp} fontSize={15} />01327406605</a>
            <a className="qv-whatsapp qv-call" href="tel:+8809613824071" aria-label="Call 09613824071"><Phone size={14} />09613824071</a>
          </div>

          <div className="qv-tabs" role="tablist" aria-label="Product details">{tabs.map((item) => <button key={item.key} role="tab" aria-selected={tab === item.key} className={tab === item.key ? "active" : ""} onClick={() => setTab(item.key)}>{item.label}</button>)}</div>
          <div className="qv-panel" role="tabpanel">
            {tab === "info" && <dl className="qv-info">{infoRows.map(([label, value]) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}</dl>}
            {tab === "usage" && <ol className="qv-usage">{info.usage.map((step) => <li key={step}>{step}</li>)}</ol>}
            {tab === "delivery" && <ul className="qv-delivery">
              <li><Truck size={15} /><span><b>Delivery time</b>See the estimated delivery window at checkout</span></li>
              <li><Clock size={15} /><span><b>Delivery charge</b>{DELIVERY_DESCRIPTION}</span></li>
              <li><Check size={15} /><span><b>Payment</b>Cash on Delivery — pay when you receive</span></li>
              <li><FontAwesomeIcon icon={faWhatsapp} fontSize={15} /><span><b>Need help?</b>Call 09613824071 or WhatsApp 01327406605</span></li>
            </ul>}
          </div>
        </div>
        </div>
      </div>
    </div>
  );
  return embedded ? content : createPortal(content, document.body);
}
