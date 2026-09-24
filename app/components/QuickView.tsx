"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Check, Clock, Heart, Minus, Plus, ShoppingCart, Star, Truck, X } from "lucide-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import { CartLine } from "../lib/cart";

type QuickViewProduct = { name: string; category: string; price: number; image: string; tag?: string };
type Details = { bn: string; blurb: string; highlights: string[]; usage: string[]; origin: string; shelfLife: string; storage: string; sold: number };
type Tab = "info" | "usage" | "delivery";

const sizes = [{ label: "250 gm", factor: 0.55 }, { label: "500 gm", factor: 1 }, { label: "1 kg", factor: 1.9 }];
const tabs: { key: Tab; label: string }[] = [{ key: "info", label: "Product Info" }, { key: "usage", label: "How to Use" }, { key: "delivery", label: "Delivery" }];
const assurances = [
  { icon: "/amzad-food-website/icons/trust-authentic.png", label: "100% Authentic" },
  { icon: "/amzad-food-website/icons/trust-lab-tested.png", label: "Lab Tested" },
  { icon: "/amzad-food-website/icons/trust-no-preservatives.png", label: "No Preservatives" },
];

const honeyUsage = ["Take one teaspoon on an empty stomach each morning.", "Stir into warm (not boiling) water, milk or tea.", "Drizzle over bread, oats, yoghurt or fruit."];
const details: Record<string, Details> = {
  "Wildflower Honey & Black Seed": { bn: "কালোজিরা মধু", blurb: "Raw wildflower honey blended with black seed — a traditional wellness pairing enjoyed in Bangladeshi homes for generations.", highlights: ["Raw wildflower honey, never overheated or diluted", "Infused with premium black seed (kalojira)", "No added sugar, colour or preservatives", "Sealed in a food-grade jar for freshness"], usage: honeyUsage, origin: "Sundarbans & northern Bangladesh", shelfLife: "18 months", storage: "Cool, dry place away from sunlight", sold: 320 },
  "Sundarbans Raw Honey": { bn: "সুন্দরবনের খাঁটি মধু", blurb: "Wild honey collected sustainably from the mangrove forests of the Sundarbans — dark, rich and full of natural flavour.", highlights: ["Harvested by traditional honey collectors", "100% raw, unprocessed and unheated", "Naturally rich in antioxidants", "Lab tested for purity before packing"], usage: honeyUsage, origin: "Sundarbans, Khulna", shelfLife: "24 months", storage: "Room temperature; natural crystallisation is normal", sold: 410 },
  "Organic Black Seed Oil": { bn: "কালোজিরা তেল", blurb: "Cold-pressed from carefully selected black seeds to keep the natural aroma and goodness — for wellness and care.", highlights: ["Cold-pressed, no heat or chemical extraction", "100% pure, no blending with other oils", "Rich, earthy aroma of fresh black seed", "Packed in a dark bottle to protect quality"], usage: ["Take half a teaspoon daily with honey or warm water.", "Massage gently on scalp or skin as a natural moisturiser.", "Store the bottle tightly capped after every use."], origin: "Bangladesh", shelfLife: "12 months", storage: "Cool, dry place away from sunlight", sold: 280 },
  "Premium Black Seed Oil": { bn: "প্রিমিয়াম কালোজিরা তেল", blurb: "Premium cold-pressed black seed oil made from hand-selected seeds for a strong aroma and consistent quality.", highlights: ["Hand-selected black seeds, cold pressed", "No additives, colour or preservatives", "Strong, authentic black seed aroma", "Sealed, tamper-proof packaging"], usage: ["Take half a teaspoon daily with honey or warm water.", "Use a few drops for hair and skin massage.", "Keep the bottle tightly capped after use."], origin: "Bangladesh", shelfLife: "12 months", storage: "Cool, dry place away from sunlight", sold: 240 },
  "Premium Date Syrup": { bn: "খেজুরের সিরাপ", blurb: "A thick, naturally sweet syrup made from ripe dates — a wholesome replacement for refined sugar.", highlights: ["Made from ripe, hand-picked dates", "No refined sugar or artificial sweeteners", "Naturally rich in iron and minerals", "Smooth, thick texture with a caramel-like taste"], usage: ["Pour over pancakes, oats, yoghurt or desserts.", "Stir into milk, smoothies or tea instead of sugar.", "Use as a natural glaze in baking and cooking."], origin: "Jessore, Bangladesh", shelfLife: "12 months", storage: "Cool, dry place; refrigerate after opening", sold: 190 },
  "Pure Ghee": { bn: "খাঁটি ঘি", blurb: "Slow-cooked from fresh cow milk butter in small batches, with the golden colour and rich aroma of traditional ghee.", highlights: ["Made from fresh milk butter, slow cooked", "Golden colour with a rich, nutty aroma", "No vegetable fat or artificial flavour", "High smoke point — great for everyday cooking"], usage: ["Add a spoonful over hot rice, khichuri or polao.", "Use for frying, tempering and making sweets.", "Spread on roti or paratha instead of butter."], origin: "Bangladesh", shelfLife: "12 months", storage: "Airtight container in a cool, dry place", sold: 520 },
  "Puffed Rice": { bn: "মুড়ি", blurb: "Light, crisp and freshly puffed — the classic Bangladeshi snack, packed to stay crunchy.", highlights: ["Freshly puffed from selected rice", "Light, crisp and easy to digest", "No added colour or preservatives", "Resealable packaging keeps it crunchy"], usage: ["Mix with mustard oil, onion, chilli and coriander for jhal muri.", "Enjoy with milk, jaggery or fresh fruit.", "Serve as a light evening snack with tea."], origin: "Bangladesh", shelfLife: "3 months", storage: "Airtight container, away from moisture", sold: 610 },
  "Khejur Gur": { bn: "খেজুরের গুড়", blurb: "Traditional date-palm jaggery made by slow-boiling fresh sap — the taste of winter mornings in the village.", highlights: ["Made from fresh date-palm sap", "No sugar, chemicals or artificial colour", "Deep caramel flavour and natural sweetness", "Perfect for pitha, payesh and sweets"], usage: ["Use in pitha, payesh and traditional sweets.", "Grate over warm rice or roti for a natural sweet bite.", "Melt into warm milk or tea as a sugar substitute."], origin: "Jessore & Satkhira", shelfLife: "6 months", storage: "Airtight container in a cool, dry place", sold: 350 },
  "Mango Pickle": { bn: "আমের আচার", blurb: "Sun-dried green mango slices cured with mustard oil and hand-ground spices, the traditional way.", highlights: ["Made from fresh green mangoes", "Cured in mustard oil with traditional spices", "Perfect balance of tangy, spicy and sweet", "No artificial colour or flavour"], usage: ["Serve a spoonful with rice, khichuri or paratha.", "Use as a side with dal, bhorta or biryani.", "Always use a dry spoon to keep the pickle fresh."], origin: "Rajshahi", shelfLife: "9 months", storage: "Airtight jar; keep away from moisture", sold: 270 },
};
const fallbackDetails: Details = { bn: "আমজাদ ফুড", blurb: "A trusted Amzad Food essential, sourced with care and packed to keep its natural quality.", highlights: ["Sourced from trusted farmers", "No added colour or preservatives", "Quality checked before packing", "Sealed in premium packaging"], usage: ["Ready to use straight from the pack.", "Store tightly closed after opening."], origin: "Bangladesh", shelfLife: "12 months", storage: "Cool, dry place away from sunlight", sold: 200 };

const roundTo5 = (value: number) => Math.round(value / 5) * 5;

export default function QuickView({ product, wishlisted, onToggleWishlist, onAdd, onOrderNow, onClose, embedded = false }: {
  embedded?: boolean;
  product: QuickViewProduct;
  wishlisted: boolean;
  onToggleWishlist: () => void;
  onAdd: (item: CartLine, qty: number) => void;
  onOrderNow: (item: CartLine, qty: number) => void;
  onClose: () => void;
}) {
  const info = details[product.name] ?? fallbackDetails;
  const [sizeIndex, setSizeIndex] = useState(1);
  const [qty, setQty] = useState(1);
  const [tab, setTab] = useState<Tab>("info");

  useEffect(() => {
    if (embedded) return;
    const onKey = (event: KeyboardEvent) => { if (event.key === "Escape") onClose(); };
    const previousOverflow = document.body.style.overflow;
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => { document.removeEventListener("keydown", onKey); document.body.style.overflow = previousOverflow; };
  }, [onClose, embedded]);

  const size = sizes[sizeIndex];
  const price = roundTo5(product.price * size.factor);
  const saving = roundTo5(50 * size.factor);
  const line: CartLine = { name: size.factor === 1 ? product.name : `${product.name} (${size.label})`, price, image: product.image };
  const sku = `AF-${product.name.split(/\W+/).filter(Boolean).map((word) => word[0]).join("").toUpperCase()}${product.price}`;
  const whatsappText = encodeURIComponent(`Hello Amzad Food, I would like to order ${qty} × ${line.name} (৳${price * qty}).`);
  const infoRows: [string, string][] = [["Category", product.category], ["Net weight", size.label], ["Origin", info.origin], ["Shelf life", info.shelfLife], ["Storage", info.storage], ["SKU", sku]];

  const content = (
    <div className={embedded ? "pd-product" : "qv-backdrop"} onClick={onClose} role="presentation">
      <div className="qv" role={embedded ? undefined : "dialog"} aria-modal={embedded ? undefined : true} aria-label={`Quick view ${product.name}`} onClick={(event) => event.stopPropagation()}>
        {!embedded && <button className="qv-close" onClick={onClose} aria-label="Close quick view"><X size={18} /></button>}

        <div className="qv-scroll">
        <div className="qv-media">
          <span className="qv-save">Save ৳{saving}</span>
          {product.tag && <span className="qv-tag">{product.tag}</span>}
          <button className={wishlisted ? "qv-wish active" : "qv-wish"} onClick={onToggleWishlist} aria-label={wishlisted ? `Remove ${product.name} from wishlist` : `Add ${product.name} to wishlist`}><Heart size={18} fill={wishlisted ? "currentColor" : "none"} /></button>
          <img src={product.image} alt={product.name} />
          <ul className="qv-assure">{assurances.map((item) => <li key={item.label}><img src={item.icon} alt="" aria-hidden="true" />{item.label}</li>)}</ul>
        </div>

        <div className="qv-body">
          <div className="qv-meta"><span className="qv-cat">{product.category}</span><span className="qv-stock"><i />In stock</span></div>
          <h2><span>{info.bn}</span>{product.name}</h2>
          <div className="qv-rating">
            <span className="qv-stars">{Array.from({ length: 5 }, (_, index) => <Star key={index} size={14} fill="currentColor" />)}</span>
            <b>4.9</b><span>(46 reviews)</span><em>{info.sold}+ sold</em>
          </div>
          <div className="qv-price"><strong>৳{price}</strong><del>৳{price + saving}</del><em>You save ৳{saving}</em></div>
          <p className="qv-blurb">{info.blurb}</p>

          <div className="qv-block">
            <h4>Select size <small>{size.label}</small></h4>
            <div className="qv-sizes">{sizes.map((option, index) => <button key={option.label} className={index === sizeIndex ? "active" : ""} onClick={() => setSizeIndex(index)} aria-pressed={index === sizeIndex}><b>{option.label}</b><span>৳{roundTo5(product.price * option.factor)}</span></button>)}</div>
          </div>

          <ul className="qv-highlights">{info.highlights.map((item) => <li key={item}><Check size={14} />{item}</li>)}</ul>

          <div className="qv-offer"><Truck size={16} /><span>Cash on Delivery available · Delivered within 2-3 business days</span></div>

          <div className="qv-buy">
            <div className="qv-qty"><button onClick={() => setQty((value) => Math.max(1, value - 1))} aria-label="Decrease quantity" disabled={qty === 1}><Minus size={14} /></button><b aria-live="polite">{qty}</b><button onClick={() => setQty((value) => Math.min(20, value + 1))} aria-label="Increase quantity" disabled={qty === 20}><Plus size={14} /></button></div>
            <button className="qv-add cta" onClick={() => { onAdd(line, qty); onClose(); }}><span>Add to Cart · ৳{price * qty}</span><i className="cta-icon"><ShoppingCart size={15} /></i></button>
            <button className="qv-order cta cta-dark" onClick={() => { onOrderNow(line, qty); onClose(); }}><span>Order Now</span></button>
          </div>
          <a className="qv-whatsapp cta cta-whatsapp cta-outline cta-block" href={`https://wa.me/8801327406605?text=${whatsappText}`} target="_blank" rel="noreferrer"><span>Order via WhatsApp · 01327406605</span><i className="cta-icon"><FontAwesomeIcon icon={faWhatsapp} fontSize={16} /></i></a>

          <div className="qv-tabs" role="tablist" aria-label="Product details">{tabs.map((item) => <button key={item.key} role="tab" aria-selected={tab === item.key} className={tab === item.key ? "active" : ""} onClick={() => setTab(item.key)}>{item.label}</button>)}</div>
          <div className="qv-panel" role="tabpanel">
            {tab === "info" && <dl className="qv-info">{infoRows.map(([label, value]) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}</dl>}
            {tab === "usage" && <ol className="qv-usage">{info.usage.map((step) => <li key={step}>{step}</li>)}</ol>}
            {tab === "delivery" && <ul className="qv-delivery">
              <li><Truck size={15} /><span><b>Delivery time</b>2-3 business days across Bangladesh</span></li>
              <li><Clock size={15} /><span><b>Delivery charge</b>৳60 flat rate on every order</span></li>
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
