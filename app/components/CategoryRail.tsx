"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowRight, ChevronLeft, ChevronRight, Coffee, Flame, Gift, LayoutGrid, Plus, Sparkles, Star, Wheat } from "lucide-react";
import { CartLine } from "../lib/cart";

type RailProduct = { name: string; bn: string; price: number; old?: number; unit: string; rating: number };
type RailCategory = {
  key: string; label: string; bn: string; count: number; accent: string; tint: string;
  icon: string | typeof Flame; tagline: string; tags: string[]; deal: string; top: RailProduct[];
};

const img = (name: string) => `/amzad-food-website/icons/${name}.png`;
const productImage = "/amzad-food-website/product-honey.png";

export const railCategories: RailCategory[] = [
  { key: "honey", label: "Honey", bn: "মধু", count: 18, accent: "#e59a12", tint: "#fff4dc", icon: img("category-honey"), tagline: "Raw, unheated honey from the Sundarbans and mustard fields.", tags: ["Sundarbans", "Black Seed", "Mustard Flower", "Litchi Flower", "Comb Honey"], deal: "Up to 20% off on honey jars", top: [
    { name: "Sundarbans Raw Honey", bn: "সুন্দরবনের মধু", price: 550, old: 650, unit: "500 gm", rating: 4.9 },
    { name: "Wildflower Honey & Black Seed", bn: "কালোজিরা মধু", price: 350, unit: "500 gm", rating: 4.8 },
    { name: "Litchi Flower Honey", bn: "লিচু ফুলের মধু", price: 480, old: 520, unit: "500 gm", rating: 4.7 },
  ] },
  { key: "ghee", label: "Ghee & Oil", bn: "ঘি ও তেল", count: 12, accent: "#c9820c", tint: "#fdf1d8", icon: Flame, tagline: "Slow-cooked ghee and cold-pressed oils for everyday cooking.", tags: ["Cow Ghee", "Black Seed Oil", "Mustard Oil", "Coconut Oil"], deal: "Free delivery on ghee over ৳1000", top: [
    { name: "Pure Ghee", bn: "খাঁটি ঘি", price: 550, unit: "400 gm", rating: 4.9 },
    { name: "Organic Black Seed Oil", bn: "কালোজিরা তেল", price: 650, old: 720, unit: "250 ml", rating: 4.8 },
    { name: "Cold Pressed Mustard Oil", bn: "সরিষার তেল", price: 320, unit: "1 L", rating: 4.7 },
  ] },
  { key: "dates", label: "Khejur", bn: "খেজুর", count: 15, accent: "#8a4b2a", tint: "#f8ebe3", icon: img("category-dates"), tagline: "Premium Ajwa, Medjool and Mabroom dates, packed fresh.", tags: ["Ajwa", "Medjool", "Mabroom", "Sukkari", "Date Syrup"], deal: "Buy 2 kg, get 250 gm free", top: [
    { name: "Ajwa Dates", bn: "আজওয়া খেজুর", price: 1200, old: 1350, unit: "500 gm", rating: 4.9 },
    { name: "Premium Date Syrup", bn: "খেজুরের সিরাপ", price: 450, unit: "350 gm", rating: 4.7 },
    { name: "Medjool Dates", bn: "মেডজুল খেজুর", price: 1450, unit: "500 gm", rating: 4.8 },
  ] },
  { key: "spices", label: "Mosla", bn: "মসলা", count: 26, accent: "#d2451e", tint: "#ffe9e1", icon: img("category-spices"), tagline: "Hand-ground turmeric, chili, cumin and garam masala.", tags: ["Turmeric", "Chili", "Cumin", "Garam Masala", "Coriander"], deal: "Spice combo from ৳499", top: [
    { name: "Turmeric Powder", bn: "হলুদ গুঁড়া", price: 180, unit: "200 gm", rating: 4.8 },
    { name: "Red Chili Powder", bn: "মরিচ গুঁড়া", price: 160, unit: "200 gm", rating: 4.7 },
    { name: "Garam Masala", bn: "গরম মসলা", price: 240, old: 280, unit: "100 gm", rating: 4.9 },
  ] },
  { key: "nuts", label: "Nuts", bn: "বাদাম", count: 14, accent: "#a0692b", tint: "#f7eddf", icon: img("category-peanuts"), tagline: "Crunchy, fresh-roasted nuts and healthy snack mixes.", tags: ["Cashew", "Almond", "Peanut", "Pistachio", "Mixed Nuts"], deal: "10% off on mixed nut packs", top: [
    { name: "Premium Cashew", bn: "কাজু বাদাম", price: 950, unit: "500 gm", rating: 4.8 },
    { name: "California Almond", bn: "কাঠ বাদাম", price: 880, old: 950, unit: "500 gm", rating: 4.8 },
    { name: "Roasted Peanut", bn: "চিনা বাদাম", price: 220, unit: "500 gm", rating: 4.6 },
  ] },
  { key: "seeds", label: "Seeds", bn: "বীজ", count: 11, accent: "#4f7d2a", tint: "#edf5e1", icon: img("category-seeds"), tagline: "Chia, flax and black seeds for everyday wellness.", tags: ["Chia", "Flax", "Black Seed", "Pumpkin", "Sunflower"], deal: "Wellness seeds from ৳199", top: [
    { name: "Chia Seeds", bn: "চিয়া সিড", price: 390, unit: "250 gm", rating: 4.8 },
    { name: "Black Seed (Kalojira)", bn: "কালোজিরা", price: 199, unit: "250 gm", rating: 4.7 },
    { name: "Flax Seeds", bn: "তিসি", price: 260, unit: "250 gm", rating: 4.6 },
  ] },
  { key: "mango", label: "Mango", bn: "আম", count: 9, accent: "#e3a300", tint: "#fff6d6", icon: img("category-mango"), tagline: "Seasonal Rajshahi mangoes, pickles and aamshotto.", tags: ["Himsagar", "Langra", "Amrapali", "Aamshotto", "Mango Pickle"], deal: "Pre-order the next harvest", top: [
    { name: "Himsagar Mango", bn: "হিমসাগর আম", price: 1400, unit: "10 kg", rating: 4.9 },
    { name: "Mango Pickle", bn: "আমের আচার", price: 230, unit: "400 gm", rating: 4.8 },
    { name: "Aamshotto", bn: "আমসত্ত্ব", price: 350, unit: "250 gm", rating: 4.7 },
  ] },
  { key: "salt", label: "Pink Salt", bn: "লবণ", count: 6, accent: "#d25b7d", tint: "#fde8ee", icon: img("category-salt"), tagline: "Himalayan pink salt and rock salt, mineral-rich.", tags: ["Fine Grain", "Coarse", "Black Salt", "Rock Salt"], deal: "Kitchen-pack savings", top: [
    { name: "Himalayan Pink Salt", bn: "পিংক সল্ট", price: 190, unit: "500 gm", rating: 4.8 },
    { name: "Black Salt", bn: "বিট লবণ", price: 120, unit: "250 gm", rating: 4.6 },
    { name: "Rock Salt Coarse", bn: "সৈন্ধব লবণ", price: 160, unit: "500 gm", rating: 4.7 },
  ] },
  { key: "rice", label: "Rice & Snacks", bn: "চাল ও মুড়ি", count: 17, accent: "#7a8a2c", tint: "#f2f4df", icon: Wheat, tagline: "Aromatic rice, puffed rice, chira and traditional snacks.", tags: ["Chinigura", "Puffed Rice", "Chira", "Khoi", "Pitha Flour"], deal: "Pitha season essentials", top: [
    { name: "Puffed Rice", bn: "মুড়ি", price: 230, unit: "1 kg", rating: 4.8 },
    { name: "Chinigura Rice", bn: "চিনিগুড়া চাল", price: 180, unit: "1 kg", rating: 4.7 },
    { name: "Khejur Gur", bn: "খেজুর গুড়", price: 1000, old: 1100, unit: "1 kg", rating: 4.9 },
  ] },
  { key: "tea", label: "Tea", bn: "চা", count: 8, accent: "#2f7a4a", tint: "#e4f3e9", icon: Coffee, tagline: "Hand-picked Sylhet tea leaves and herbal blends.", tags: ["Black Tea", "Green Tea", "Tulsi", "Masala Chai"], deal: "Try a Sylhet sampler", top: [
    { name: "Sylhet Black Tea", bn: "সিলেটের চা", price: 280, unit: "400 gm", rating: 4.8 },
    { name: "Green Tea", bn: "গ্রিন টি", price: 320, unit: "100 gm", rating: 4.6 },
    { name: "Masala Chai", bn: "মসলা চা", price: 260, unit: "200 gm", rating: 4.7 },
  ] },
  { key: "combo", label: "Combo & Gifts", bn: "কম্বো", count: 10, accent: "#f56619", tint: "#fff0e5", icon: img("category-basket"), tagline: "Curated hampers and value combos for every occasion.", tags: ["Family Pack", "Wellness Box", "Eid Hamper", "Wedding Gift"], deal: "Save up to ৳400 on combos", top: [
    { name: "Wellness Combo Box", bn: "ওয়েলনেস কম্বো", price: 1650, old: 1950, unit: "4 items", rating: 4.9 },
    { name: "Family Kitchen Pack", bn: "ফ্যামিলি প্যাক", price: 2200, old: 2500, unit: "6 items", rating: 4.8 },
    { name: "Eid Gift Hamper", bn: "ঈদ গিফট হ্যাম্পার", price: 2800, unit: "7 items", rating: 4.9 },
  ] },
];

function CategoryIcon({ icon, size = 20 }: { icon: RailCategory["icon"]; size?: number }) {
  if (typeof icon === "string") return <img src={icon} alt="" aria-hidden="true" />;
  const Icon = icon;
  return <Icon size={size} strokeWidth={2} />;
}

export default function CategoryRail({ onAdd, onBrowse }: { onAdd: (item: CartLine) => void; onBrowse: (label: string) => void }) {
  const [active, setActive] = useState<string | null>(null);
  const [canScroll, setCanScroll] = useState({ left: false, right: false });
  const trackRef = useRef<HTMLDivElement>(null);
  const openTimer = useRef<ReturnType<typeof setTimeout>>();
  const closeTimer = useRef<ReturnType<typeof setTimeout>>();
  const current = railCategories.find((category) => category.key === active);

  const updateScroll = () => {
    const track = trackRef.current;
    if (!track) return;
    setCanScroll({ left: track.scrollLeft > 4, right: track.scrollLeft + track.clientWidth < track.scrollWidth - 4 });
  };
  useEffect(() => {
    updateScroll();
    window.addEventListener("resize", updateScroll);
    return () => { window.removeEventListener("resize", updateScroll); clearTimeout(openTimer.current); clearTimeout(closeTimer.current); };
  }, []);
  useEffect(() => {
    if (!active) return;
    const onKey = (event: KeyboardEvent) => { if (event.key === "Escape") setActive(null); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active]);

  const hoverable = () => typeof window !== "undefined" && window.matchMedia("(hover: hover) and (min-width: 801px)").matches;
  const preview = (key: string) => {
    if (!hoverable()) return;
    clearTimeout(closeTimer.current);
    clearTimeout(openTimer.current);
    openTimer.current = setTimeout(() => setActive(key), active ? 0 : 120);
  };
  const scheduleClose = () => {
    clearTimeout(openTimer.current);
    closeTimer.current = setTimeout(() => setActive(null), 180);
  };
  const keepOpen = () => clearTimeout(closeTimer.current);
  const scrollBy = (direction: number) => trackRef.current?.scrollBy({ left: direction * 320, behavior: "smooth" });
  const browse = (label: string) => { setActive(null); onBrowse(label); };

  return <div className="cat-rail-wrap page-width" onMouseLeave={scheduleClose}>
    <div className="cat-rail">
      <button className="cat-rail-offer" onClick={() => browse("Offer Zone")} onMouseEnter={scheduleClose}>
        <span className="cat-rail-offer-icon"><Sparkles size={15} /></span>
        <span><b>Offer Zone</b><small>Up to 30% off</small></span>
      </button>
      <div className="cat-rail-scroller">
        <button disabled={!canScroll.left} className="cat-rail-arrow left" onClick={() => scrollBy(-1)} aria-label="Scroll categories left"><ChevronLeft size={15} /></button>
        <div className="cat-rail-track" ref={trackRef} onScroll={updateScroll} role="menubar" aria-label="Shop categories">
          {railCategories.map((category) => <button
            key={category.key}
            role="menuitem"
            className={active === category.key ? "cat-chip active" : "cat-chip"}
            style={{ "--accent": category.accent, "--tint": category.tint } as React.CSSProperties}
            onMouseEnter={() => preview(category.key)}
            onFocus={() => hoverable() && setActive(category.key)}
            onClick={() => browse(category.label)}
            aria-haspopup="true"
            aria-expanded={active === category.key}
          >
            <span className="cat-chip-icon"><CategoryIcon icon={category.icon} size={17} /></span>
            <span className="cat-chip-text"><b>{category.label}</b><small>{category.bn}</small></span>
          </button>)}
        </div>
        <button disabled={!canScroll.right} className="cat-rail-arrow right" onClick={() => scrollBy(1)} aria-label="Scroll categories right"><ChevronRight size={15} /></button>
      </div>
      <button className="cat-rail-all" onClick={() => browse("All")} onMouseEnter={scheduleClose}><LayoutGrid size={15} /><span>All</span></button>
    </div>

    <div className={current ? "cat-flyout open" : "cat-flyout"} onMouseEnter={keepOpen} aria-hidden={!current}>
      {current && <div className="cat-flyout-inner" key={current.key} style={{ "--accent": current.accent, "--tint": current.tint } as React.CSSProperties}>
        <div className="cat-flyout-intro">
          <span className="cat-flyout-badge"><CategoryIcon icon={current.icon} size={24} /></span>
          <p className="cat-flyout-kicker">{current.count} products</p>
          <h3>{current.label} <em>{current.bn}</em></h3>
          <p className="cat-flyout-tagline">{current.tagline}</p>
          <div className="cat-flyout-tags">{current.tags.map((tag) => <button key={tag} onClick={() => browse(`${current.label} · ${tag}`)}>{tag}</button>)}</div>
        </div>
        <div className="cat-flyout-products">
          <p className="cat-flyout-label"><Star size={12} fill="currentColor" /> Top picks in {current.label}</p>
          <ol>{current.top.map((product, index) => <li key={product.name}>
            <span className="cat-rank">{String(index + 1).padStart(2, "0")}</span>
            <span className="cat-thumb"><img src={productImage} alt="" /></span>
            <div className="cat-product-info">
              <strong>{product.name}</strong>
              <small>{product.bn} · {product.unit}</small>
              <span className="cat-product-price"><b>৳{product.price}</b>{product.old && <del>৳{product.old}</del>}<i><Star size={10} fill="currentColor" /> {product.rating}</i></span>
            </div>
            <button className="cat-add" onClick={() => onAdd({ name: product.name, price: product.price, image: productImage })} aria-label={`Add ${product.name} to cart`}><Plus size={15} /></button>
          </li>)}</ol>
        </div>
        <div className="cat-flyout-deal">
          <span className="cat-deal-ribbon"><Gift size={13} /> This week</span>
          <strong>{current.deal}</strong>
          <button className="cta cta-light cta-sm" onClick={() => browse(current.label)}><span>Shop all {current.label}</span><i className="cta-icon cta-arrow"><ArrowRight size={14} /></i></button>
        </div>
      </div>}
    </div>
  </div>;
}
