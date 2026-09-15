"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { CartItem, loadCart, saveCart } from "./lib/cart";
import { ArrowDownLeft, ArrowRight, ArrowUp, Cherry, ChevronDown, ChevronLeft, ChevronRight, Droplets, Eye, Facebook, Flame, Gift, Heart, Instagram, Leaf, LogIn, MapPin, Menu, Moon, PackageSearch, Phone, Play, Search, ShoppingCart, Star, Sunset, UserRound, Users, X, Youtube } from "lucide-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowsRotate, faBoxOpen, faMagnifyingGlass, faTruckFast } from "@fortawesome/free-solid-svg-icons";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";

type Product = { name: string; category: string; price: number; image: string; tag?: string };
type WishItem = { name: string; price: number; image: string };
const productImage = "/amzad-food-website/product-honey.png";
const products: Product[] = Array.from({ length: 12 }, (_, index) => ({
  name: ["Wildflower Honey & Black Seed", "Sundarbans Raw Honey", "Organic Black Seed Oil", "Premium Date Syrup"][index % 4],
  category: index % 2 ? "Pantry" : "Best seller",
  price: [350, 550, 650, 450][index % 4], image: productImage, tag: index % 3 === 0 ? "Best Seller" : undefined,
}));
const exploreProducts = products.slice(0, 10).map((product, index) => ({ ...product, name: ["Pure Ghee", "Puffed Rice", "Premium Black Seed Oil", "Khejur Gur", "Mango Pickle"][index % 5], price: [550, 230, 650, 1000, 230][index % 5] }));
const categories = ["All", "Fresh produce", "Pantry", "Dairy & eggs", "Bakery"];
const shopCategories = [
  { icon: "/amzad-food-website/icons/category-salt.png", label: "Pink Salt" },
  { icon: "/amzad-food-website/icons/category-spices.png", label: "Mosla" },
  { icon: "/amzad-food-website/icons/category-mango.png", label: "Mango" },
  { icon: "/amzad-food-website/icons/category-peanuts.png", label: "Peanuts" },
  { icon: "/amzad-food-website/icons/category-honey.png", label: "Honey" },
  { icon: "/amzad-food-website/icons/category-basket.png", label: "Basket" },
  { icon: "/amzad-food-website/icons/category-seeds.png", label: "Seeds" },
  { icon: "/amzad-food-website/icons/category-dates.png", label: "Khejur" },
];
const trustPoints = [
  { icon: "/amzad-food-website/icons/trust-authentic.png", title: "100% Authentic", subtitle: "Original & pure products" },
  { icon: "/amzad-food-website/icons/trust-lab-tested.png", title: "Lab Tested", subtitle: "Ensuring safe consumption" },
  { icon: "/amzad-food-website/icons/trust-premium.png", title: "Premium Quality", subtitle: "Best grade ingredients" },
  { icon: "/amzad-food-website/icons/trust-no-preservatives.png", title: "No Preservatives", subtitle: "Chemical free promise" },
  { icon: "/amzad-food-website/icons/trust-secure-packaging.png", title: "Secure Packaging", subtitle: "Sealed for freshness" },
  { icon: "/amzad-food-website/icons/trust-support.png", title: "Customer Support", subtitle: "Always here to help" },
];
const blogReviews = [
  { image: "/amzad-food-website/blog-review-1.png", alt: "মেদ ঝরানো এখন আরও সহজ" },
  { image: "/amzad-food-website/blog-review-2.png", alt: "অতিরিক্ত ওজন কমান প্রাকৃতিক উপায়ে" },
  { image: "/amzad-food-website/blog-review-3.png", alt: "ছোট বড় অভ্যাসেই স্বাস্থ্যকর জীবন" },
];
const customerReviews = [
  { name: "Rafiq Hasan", time: "3 days ago", rating: 4, color: "#fde3cf", text: "আমার অভিজ্ঞতা আমজাদ ফুডের সাথে অসাধারণ ছিল। সেবা ছিল অত্যন্ত সহায়ক এবং প্রয়োজনীয় তথ্য পেতে আমি খুব সহজেই যোগাযোগ করতে পেরেছিলাম। ধন্যবাদ আমজাদ ফুড।" },
  { name: "Arif Chowdhury", time: "20 hours ago", rating: 5, color: "#dbe9ff", text: "এজেন্টের সহায়তা আমাকে আমজাদ ফুডের বিভিন্ন পণ্য সম্পর্কে জানাতে সাহায্য করেছে। তারা সবকিছু পরিষ্কারভাবে ব্যাখ্যা করেছে, যা আমাকে সিদ্ধান্ত নিতে সহজ করেছে।" },
  { name: "Samiul Rahman", time: "2 days ago", rating: 4, color: "#e3ddff", text: "আমি দীর্ঘদিন ধরে আমজাদ ফুড কিনতে চেয়েছিলাম, কিন্তু তাদের সহায়তায় সবকিছু সহজ হয়ে গেছে। তাদের ধন্যবাদ।" },
  { name: "Naimul Islam", time: "2 days ago", rating: 5, color: "#d7f0e2", text: "ফাহিমের সহায়তায় আমজাদ ফুডের কেনাকাটা প্রক্রিয়াটি খুব মসৃণ হয়েছে। তিনি আমাকে সবকিছুতে সাহায্য করেছেন এবং পণ্যগুলি খুবই সুসংগঠিত।" },
  { name: "Tanvir Ahmed", time: "5 days ago", rating: 5, color: "#ffe1e6", text: "প্রতিবার অর্ডার করার পর দ্রুত ডেলিভারি পেয়েছি এবং পণ্যের মান সবসময় অসাধারণ। আমজাদ ফুড আমার পরিবারের প্রথম পছন্দ।" },
];
const originStories = [
  { key: "sylhet", className: "sylhet", icon: Leaf, place: "Sylhet", product: "Tea", desc: "Rolling tea gardens in the hills of Sylhet supply our hand-picked black tea leaves." },
  { key: "rajshahi", className: "rajshahi", icon: Cherry, place: "Rajshahi", product: "Mango", desc: "Rajshahi's fertile plains grow the sweetest, sun-ripened mangoes in Bangladesh." },
  { key: "comilla", className: "comilla", icon: Flame, place: "Comilla", product: "Spices", desc: "Comilla farmers hand-grind chili, turmeric and cumin using traditional methods." },
  { key: "sundarbans", className: "sundarbans", icon: Droplets, place: "Sundarbans", product: "Honey", desc: "Wild honey harvested sustainably from the mangrove forests of the Sundarbans." },
];

function ProductCard({ product, onAdd, onOrderNow, wishlisted, onToggleWishlist }: { product: Product; onAdd: () => void; onOrderNow: () => void; wishlisted: boolean; onToggleWishlist: () => void }) {
  const [quickView, setQuickView] = useState(false);
  return <article className="product-card"><div className="product-image"><img src={product.image} alt={product.name} /><span className="product-tag">Save ৳50</span><div className="card-actions"><button className={wishlisted ? "wishlist-action active" : "wishlist-action"} aria-label={wishlisted ? `Remove ${product.name} from wishlist` : `Add ${product.name} to wishlist`} title="Wishlist" onClick={onToggleWishlist}><Heart size={16} fill={wishlisted ? "currentColor" : "none"} /></button><button aria-label={`Quick view ${product.name}`} title="Quick view" onClick={() => setQuickView(true)}><Eye size={17} /></button><button className="cart-action" aria-label={`Add ${product.name} to cart`} title="Add to cart" onClick={onAdd}><ShoppingCart size={17} /></button></div></div><div className="product-info"><h3><span>কালোজিরা মধু / </span>{product.name}</h3><p className="product-unit">500 gm</p><div className="product-price-row"><strong>৳{product.price}</strong><span className="rating"><Star size={13} fill="currentColor" /><b>4.9</b><i>(46)</i></span></div><button className="order-button" onClick={onOrderNow}>Order Now</button></div>{quickView && <div className="quick-view" role="dialog" aria-label={`Quick view ${product.name}`}><button className="quick-view-close" onClick={() => setQuickView(false)} aria-label="Close quick view"><X size={16} /></button><img src={product.image} alt={product.name} /><h3>{product.name}</h3><strong>৳{product.price}</strong><button className="primary-button" onClick={() => { onOrderNow(); setQuickView(false); }}>Order Now <ShoppingCart size={14} /></button></div>}</article>;
}

const dailyPrayerTimes = [
  { name: "ফজর", time: "৪:২০" },
  { name: "যোহর", time: "১২:১৫" },
  { name: "আসর", time: "৪:৩৫" },
  { name: "মাগরিব", time: "৭:১৫" },
  { name: "ইশা", time: "৭:৪১" },
];

const heroSlides = [
  { image: "/amzad-food-website/hero-slide-1.png", eyebrow: "100% Pure & Organic", title: ["Bold Spices,", "Real Bangladeshi Taste"], desc: "Hand-ground turmeric, chili, cumin and garam masala — sourced fresh to bring authentic flavor to every meal.", cta: "Shop Spices" },
  { image: "/amzad-food-website/hero-slide-2.png", eyebrow: "Traditional Recipes", title: ["Sweets & Snacks,", "Made With Love"], desc: "From badam barfi to protein bars — classic Bangladeshi treats made the way you remember, delivered fresh.", cta: "Shop Sweets" },
  { image: "/amzad-food-website/hero-slide-3.png", eyebrow: "Nature's Best", title: ["Pure Honey & Ghee,", "Straight From the Source"], desc: "Raw honey, farm-fresh ghee and wellness essentials — sourced with care, trusted by thousands of families.", cta: "Shop Essentials" },
];

function HeroSlider() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  useEffect(() => {
    if (paused) return;
    const timer = setInterval(() => setActive((value) => (value + 1) % heroSlides.length), 5500);
    return () => clearInterval(timer);
  }, [paused]);
  const slide = heroSlides[active];
  const goPrev = () => setActive((value) => (value - 1 + heroSlides.length) % heroSlides.length);
  const goNext = () => setActive((value) => (value + 1) % heroSlides.length);
  return <section className="hero page-width" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
    <div className="hero-copy" key={`copy-${active}`}>
      <p className="eyebrow"><span />{slide.eyebrow}</p>
      <h1>{slide.title[0]}<br /><em>{slide.title[1]}</em></h1>
      <p className="hero-description">{slide.desc}</p>
      <div className="hero-actions">
        <a href="#shop" className="primary-button">{slide.cta} <ArrowRight size={14} /></a>
        <span className="hero-note"><span className="avatar-stack"><i>F</i><i>A</i><i>M</i></span>Loved by 10,000+ families</span>
      </div>
      <div className="hero-dots">{heroSlides.map((item, index) => <button key={item.image} className={index === active ? "active" : ""} onClick={() => setActive(index)} aria-label={`Go to slide ${index + 1}`} />)}</div>
    </div>
    <div className="hero-art" key={`art-${active}`}>
      <div className="hero-image"><img src={slide.image} alt="Amzad Food products" /></div>
      <span className="hero-leaf leaf-one">✦</span>
      <span className="hero-leaf leaf-two">✦</span>
      <button className="hero-arrow prev" onClick={goPrev} aria-label="Previous slide"><ChevronLeft size={18} /></button>
      <button className="hero-arrow next" onClick={goNext} aria-label="Next slide"><ChevronRight size={18} /></button>
    </div>
  </section>;
}

function GoogleIcon() {
  return <svg width="16" height="16" viewBox="0 0 48 48" aria-hidden="true"><path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3C33.7 32.9 29.3 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.1 8 3l6-6C34.5 5.1 29.5 3 24 3 12.4 3 3 12.4 3 24s9.4 21 21 21 21-9.4 21-21c0-1.4-.1-2.7-.4-3.5z" /><path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.6 15.9 18.9 13 24 13c3.1 0 5.8 1.1 8 3l6-6C34.5 6.1 29.5 4 24 4c-7.6 0-14.2 4.3-17.7 10.7z" /><path fill="#4CAF50" d="M24 44c5.4 0 10.3-2.1 14-5.5l-6.5-5.5c-2.1 1.6-4.8 2.5-7.5 2.5-5.3 0-9.7-3.1-11.3-7.6l-6.5 5c3.5 6.5 10.1 11.1 17.8 11.1z" /><path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.3-2.3 4.3-4.3 5.7l6.5 5.5C40.9 36.8 44 31.3 44 24c0-1.4-.1-2.7-.4-3.5z" /></svg>;
}

function ReviewCarousel() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const scrollToReview = (index: number) => {
    const track = trackRef.current;
    const card = track?.children[index] as HTMLElement | undefined;
    if (track && card) track.scrollTo({ left: card.offsetLeft - track.offsetLeft, behavior: "smooth" });
    setActive(index);
  };
  const handleScroll = () => {
    const track = trackRef.current;
    if (!track) return;
    let closest = 0;
    let minDist = Infinity;
    Array.from(track.children).forEach((child, index) => {
      const dist = Math.abs((child as HTMLElement).offsetLeft - track.offsetLeft - track.scrollLeft);
      if (dist < minDist) { minDist = dist; closest = index; }
    });
    setActive(closest);
  };
  return <>
    <div className="reviews-carousel">
      <button className="review-nav prev" onClick={() => scrollToReview(Math.max(0, active - 1))} aria-label="Previous reviews" disabled={active === 0}><ChevronLeft size={16} /></button>
      <div className="reviews" ref={trackRef} onScroll={handleScroll}>
        {customerReviews.map((review) => {
          const initials = review.name.split(" ").map((part) => part[0]).slice(0, 2).join("");
          return <article key={review.name}>
            <div className="review-head">
              <span className="review-avatar" style={{ background: review.color }}>{initials}</span>
              <div className="review-who"><strong>{review.name}</strong><small>{review.time}</small></div>
              <GoogleIcon />
            </div>
            <span className="review-stars">{Array.from({ length: 5 }, (_, index) => <Star key={index} size={13} fill={index < review.rating ? "#f5a623" : "none"} color={index < review.rating ? "#f5a623" : "#dbe0d8"} />)}</span>
            <span className="review-quote">"</span>
            <p>{review.text}</p>
          </article>;
        })}
      </div>
      <button className="review-nav next" onClick={() => scrollToReview(Math.min(customerReviews.length - 1, active + 1))} aria-label="Next reviews" disabled={active === customerReviews.length - 1}><ChevronRight size={16} /></button>
    </div>
    <div className="review-dots">{customerReviews.map((review, index) => <button key={review.name} className={index === active ? "active" : ""} onClick={() => scrollToReview(index)} aria-label={`Go to review ${index + 1}`} />)}</div>
  </>;
}

function PrayerTimesCard({ notify }: { notify: (message: string) => void }) {
  const [showAll, setShowAll] = useState(false);
  return <section className="prayer-widget page-width" id="prayer-times">
    <div className="prayer-widget-head">
      <div className="prayer-widget-title"><span className="prayer-moon-icon"><Moon size={17} fill="currentColor" /></span><div><h2>আজকের নামাজের সময়</h2><small>২৬ আগস্ট, ২০২৬ · ঢাকা</small></div></div>
      <button className="prayer-location" onClick={() => notify("More cities coming soon — showing Dhaka")}><MapPin size={13} /> ঢাকা <ChevronDown size={13} /></button>
    </div>
    <div className="prayer-card">
      <div className="prayer-card-main">
        <span className="prayer-live-badge"><i />এখনকার নামাজ</span>
        <h3>ইশা নামাজ</h3>
        <p className="prayer-time">সময়: ৭:৪১</p>
        <p className="prayer-next">পরবর্তী <b>ফজর নামাজ ৪:২০</b></p>
      </div>
      <div className="prayer-card-side">
        <div className="prayer-date-box"><small>আজকের তারিখ</small><strong>২৬ আগস্ট, ২০২৬</strong><em>স্থান: ঢাকা</em></div>
        <button className="prayer-all-btn" onClick={() => setShowAll((value) => !value)} aria-expanded={showAll}>আজকের সব নামাজ <ChevronDown size={13} className={showAll ? "flip" : ""} /></button>
        {showAll && <ul className="prayer-all-list">{dailyPrayerTimes.map((prayer) => <li key={prayer.name}><span>{prayer.name}</span><b>{prayer.time}</b></li>)}</ul>}
      </div>
      <div className="prayer-chips">
        <div className="prayer-chip"><div><small>সেহরি</small><strong>সেহরির শেষ সময় ৪:৫৯</strong></div><span className="prayer-chip-icon"><Moon size={15} /></span></div>
        <div className="prayer-chip iftar"><div><small>ইফতার</small><strong>ইফতারের সময় ৭:১৫</strong></div><span className="prayer-chip-icon iftar-icon"><Sunset size={15} /></span></div>
      </div>
      <p className="prayer-disclaimer">সময়সূচি ইসলামিক হিসাব অনুযায়ী আনুমানিক। স্থানীয় মসজিদের ঘোষণাকে অগ্রাধিকার দিন।</p>
    </div>
  </section>;
}

function Drawer({ open, onClose, title, children }: { open: boolean; onClose: () => void; title: string; children: React.ReactNode }) {
  return <>
    {open && <button className="panel-backdrop" onClick={onClose} aria-label="Close" />}
    <aside className={open ? "side-drawer open" : "side-drawer"} aria-hidden={!open} role="dialog" aria-label={title}>
      <div className="side-drawer-head"><h3>{title}</h3><button onClick={onClose} aria-label="Close"><X size={18} /></button></div>
      <div className="side-drawer-body">{children}</div>
    </aside>
  </>;
}

function Modal({ open, onClose, title, children }: { open: boolean; onClose: () => void; title: string; children: React.ReactNode }) {
  if (!open) return null;
  return <div className="modal-backdrop" onClick={onClose} role="presentation">
    <div className="modal-box" onClick={(event) => event.stopPropagation()} role="dialog" aria-label={title}>
      <div className="modal-head"><h3>{title}</h3><button onClick={onClose} aria-label="Close"><X size={18} /></button></div>
      <div className="modal-body">{children}</div>
    </div>
  </div>;
}

function NewsletterForm({ placeholder, buttonLabel, onSubscribe, className }: { placeholder: string; buttonLabel: React.ReactNode; onSubscribe: (email: string) => void; className: string }) {
  const [email, setEmail] = useState("");
  const [error, setError] = useState(false);
  const submit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { setError(true); return; }
    setError(false);
    onSubscribe(email);
    setEmail("");
  };
  return <form className={error ? `${className} has-error` : className} onSubmit={submit} noValidate>
    <input type="email" placeholder={placeholder} value={email} onChange={(event) => { setEmail(event.target.value); setError(false); }} />
    <button type="submit">{buttonLabel}</button>
    {error && <small className="form-error">Enter a valid email address</small>}
  </form>;
}

function SignInForm({ onSubmit }: { onSubmit: (name: string) => void }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const submit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!name.trim() || !email.trim()) return;
    onSubmit(name.trim());
  };
  return <form className="auth-form" onSubmit={submit}>
    <label>Name<input value={name} onChange={(event) => setName(event.target.value)} placeholder="Your name" required /></label>
    <label>Email<input type="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="you@example.com" required /></label>
    <button className="primary-button" type="submit">Sign In</button>
  </form>;
}

function TrackOrderForm() {
  const [orderId, setOrderId] = useState("");
  const [result, setResult] = useState<string | null>(null);
  const submit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!orderId.trim()) return;
    setResult(`Order #${orderId.trim().toUpperCase()} is confirmed and being prepared. Expected delivery within 2-3 business days.`);
  };
  return <form className="auth-form" onSubmit={submit}>
    <label>Order ID<input value={orderId} onChange={(event) => setOrderId(event.target.value)} placeholder="e.g. AF10234" required /></label>
    <button className="primary-button" type="submit">Track Order</button>
    {result && <p className="track-result">{result}</p>}
  </form>;
}

export default function Home() {
  const router = useRouter();
  const [activeCategory, setActiveCategory] = useState("All");
  const [menuOpen, setMenuOpen] = useState(false);
  const [megaMenuOpen, setMegaMenuOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [cart, setCart] = useState<CartItem[]>([]);
  useEffect(() => { setCart(loadCart()); }, []);
  useEffect(() => { saveCart(cart); }, [cart]);
  const [wishlist, setWishlist] = useState<WishItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [wishlistOpen, setWishlistOpen] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);
  const [trackOpen, setTrackOpen] = useState(false);
  const [originOpen, setOriginOpen] = useState(false);
  const [user, setUser] = useState<{ name: string } | null>(null);
  const [toast, setToast] = useState<string | null>(null);
  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => setToast(null), 2800);
    return () => clearTimeout(timer);
  }, [toast]);
  const notify = (message: string) => setToast(message);
  const visibleProducts = useMemo(() => products.filter((item) => (activeCategory === "All" || activeCategory === "Pantry") && item.name.toLowerCase().includes(query.toLowerCase())), [activeCategory, query]);
  const addToCart = (product: { name: string; price: number; image: string }) => {
    setCart((items) => {
      const found = items.find((item) => item.name === product.name);
      if (found) return items.map((item) => item.name === product.name ? { ...item, qty: item.qty + 1 } : item);
      return [...items, { name: product.name, price: product.price, image: product.image, qty: 1 }];
    });
    notify(`Added ${product.name} to cart`);
  };
  const removeFromCart = (name: string) => setCart((items) => items.filter((item) => item.name !== name));
  const changeQty = (name: string, delta: number) => setCart((items) => items.map((item) => item.name === name ? { ...item, qty: item.qty + delta } : item).filter((item) => item.qty > 0));
  const cartCount = cart.reduce((sum, item) => sum + item.qty, 0);
  const cartTotal = cart.reduce((sum, item) => sum + item.qty * item.price, 0);
  const goToCheckout = (product?: { name: string; price: number; image: string }) => {
    let next = cart;
    if (product) {
      const found = cart.find((item) => item.name === product.name);
      next = found ? cart.map((item) => item.name === product.name ? { ...item, qty: item.qty + 1 } : item) : [...cart, { name: product.name, price: product.price, image: product.image, qty: 1 }];
      setCart(next);
    }
    saveCart(next);
    setCartOpen(false);
    router.push("/checkout/");
  };
  const toggleWishlist = (product: { name: string; price: number; image: string }) => {
    setWishlist((items) => {
      if (items.some((item) => item.name === product.name)) { notify(`Removed ${product.name} from wishlist`); return items.filter((item) => item.name !== product.name); }
      notify(`Added ${product.name} to wishlist`);
      return [...items, { name: product.name, price: product.price, image: product.image }];
    });
  };
  const isWishlisted = (name: string) => wishlist.some((item) => item.name === name);
  const handleAccountClick = () => { if (user) { setUser(null); notify("Signed out"); } else { setAuthOpen(true); } };
  const scrollToShop = () => { setMenuOpen(false); document.getElementById("shop")?.scrollIntoView({ behavior: "smooth" }); };
  const add = () => addToCart({ name: "Sundarbans Raw Honey", price: 350, image: "/amzad-food-website/honey-bg.png" });
  return <main id="top">
    <div className="announcement"><div className="announcement-inner page-width"><span className="announcement-contacts-group"><span className="announcement-cta">প্রয়োজনে কল করুন</span><span className="announcement-contacts"><a className="announcement-contact" href="https://wa.me/8801327406605" target="_blank" rel="noreferrer"><FontAwesomeIcon icon={faWhatsapp} fontSize={14} /> 01327406605</a><span className="announcement-divider" /><a className="announcement-contact" href="tel:+8809613824071"><Phone size={13} /> 09613824071</a></span></span><span className="announcement-links"><a className="announcement-link" href="#" onClick={(event) => { event.preventDefault(); handleAccountClick(); }}><LogIn size={13} /> {user ? `Hi, ${user.name}` : "Sign In"}</a><span className="announcement-divider" /><a className="announcement-link" href="#" onClick={(event) => { event.preventDefault(); setTrackOpen(true); }}><PackageSearch size={13} /> Track Order</a></span></div></div>
    <nav className="navbar page-width"><button className={menuOpen ? "mobile-menu icon-button open" : "mobile-menu icon-button"} onClick={() => setMenuOpen(!menuOpen)} aria-label={menuOpen ? "Close menu" : "Open menu"} aria-expanded={menuOpen}>{menuOpen ? <X size={19} /> : <Menu size={19} />}</button><a className="brand amzad-brand" href="#top"><span className="brand-wordmark"><b>amzad</b> <strong>food</strong><small>বিশ্বাসের সাথে, স্বাদের ঠিকানা</small></span></a><div className={menuOpen ? "nav-links open" : "nav-links"}><a href="#top" onClick={() => setMenuOpen(false)}>Home</a><a href="#shop" onClick={() => setMenuOpen(false)}>All Products</a><a href="#collection" onClick={() => setMenuOpen(false)}>Collection</a><a href="#blogs" onClick={() => setMenuOpen(false)}>Blogs</a><div className="nav-links-mobile-actions"><button className="nav-account" onClick={() => { setMenuOpen(false); handleAccountClick(); }}><UserRound size={16} /><small>{user ? user.name : "Sign in"}</small></button><button className="nav-account wishlist" onClick={() => { setMenuOpen(false); setWishlistOpen(true); }}><Heart size={16} /><small>Wishlist</small></button></div></div>{menuOpen && <button className="nav-backdrop" onClick={() => setMenuOpen(false)} aria-label="Close menu" />}<div className="nav-actions"><div className="nav-search"><Search size={13} /><input placeholder="Search for food, brand..." value={query} onChange={(event) => setQuery(event.target.value)} /></div><button className="nav-account" onClick={handleAccountClick}><UserRound size={16} /><small>{user ? user.name : "Sign in"}</small></button><button className="nav-account" onClick={() => setCartOpen(true)}><ShoppingCart size={16} /><small>Cart</small><b>{cartCount}</b></button><button className="nav-account wishlist" onClick={() => setWishlistOpen(true)}><Heart size={16} /><small>Wishlist</small>{wishlist.length > 0 && <b>{wishlist.length}</b>}</button><button className={megaMenuOpen ? "mega-menu-trigger open" : "mega-menu-trigger"} onClick={() => setMegaMenuOpen(!megaMenuOpen)} aria-haspopup="true" aria-expanded={megaMenuOpen}><Menu size={14} /> Menu <ChevronDown size={12} /></button></div>{megaMenuOpen && <button className="mega-menu-backdrop" onClick={() => setMegaMenuOpen(false)} aria-label="Close menu" />}<div className={megaMenuOpen ? "mega-menu open" : "mega-menu"}><div className="mega-menu-inner"><div><p className="mega-menu-title">Shop by Category</p><div className="mega-category-grid">{shopCategories.map((category) => <a href="#collection" key={category.label} onClick={() => setMegaMenuOpen(false)}><span><img src={category.icon} alt="" aria-hidden="true" /></span>{category.label}</a>)}</div></div><div className="mega-promo"><span className="mega-promo-icon"><Gift size={20} /></span><strong>Gift Boxes</strong><p>Curated hampers perfect for festivals, weddings or a thoughtful everyday surprise.</p><a href="#shop" className="primary-button" onClick={() => setMegaMenuOpen(false)}>Explore Gifts <ArrowRight size={13} /></a></div></div></div></nav>
    <HeroSlider />
    <section className="category-strip page-width" id="collection"><div className="category-intro"><strong>Shop by<br />Category</strong><ArrowRight size={15} /></div>{shopCategories.map((category) => <button className="quick-category" key={category.label} onClick={scrollToShop}><span><img src={category.icon} alt="" aria-hidden="true" /></span><small>{category.label}</small></button>)}<button className="gift-box" onClick={scrollToShop}><span><Gift size={19} /></span><strong>Gift Boxes<small>Perfect for<br />every occasion</small></strong></button></section>
    <section className="promise-strip"><div className="page-width promises"><div className="source-label"><strong>From Source<br />to Your Table</strong><small>A journey of Trust &amp; Quality</small></div>{[[faArrowsRotate,"Sourced","from Trusted Farmers"],[faMagnifyingGlass,"Quality Checked","for Your Safety"],[faBoxOpen,"Premium Packaging","for Freshness"],[faTruckFast,"Delivered","Across Bangladesh"]].map(([icon, title, subtitle], index) => <div key={title as string}><span className="promise-icon"><FontAwesomeIcon icon={icon as typeof faArrowsRotate} fontSize={15} /></span><p><strong>{title as string}</strong><br />{subtitle as string}</p>{index < 3 && <ArrowRight size={13} />}</div>)}</div></section>
    <section className="feature-band page-width" id="story"><article className="origin-card"><div className="origin-copy"><p className="eyebrow">Rooted in Bangladesh</p><h2>Discover<br />Our Origin <span>🍃</span></h2><p>Discover authentic Bangladeshi foods, trusted essentials and naturally sourced products — all in one place.</p><button className="primary-button" onClick={() => setOriginOpen(true)}>Explore Origin Stories <ArrowRight size={14} /></button></div><div className="origin-map"><img src="/amzad-food-website/bangladesh-map.png" alt="Bangladesh sourcing map" />{originStories.map((story) => <span className={`origin-pin ${story.className}`} key={story.key}><i><story.icon size={13} /></i><b>{story.place}<small>{story.product}</small></b></span>)}</div></article><article className="honey-card"><img className="honey-bg" src="/amzad-food-website/honey-bg.png" alt="" aria-hidden="true" /><span className="honey-callout">Pure Goodness<small>from Bangladesh</small><ArrowDownLeft size={20} /></span><div className="honey-copy"><h2>Sundarbans<br />Raw Honey</h2><p className="honey-subtitle">Cold Pressed <span>•</span> 100% Natural</p><div className="honey-badges"><span>100% Natural</span><span>Rich in Naturals</span></div><div className="honey-price"><strong>৳350</strong><del>৳450</del><em>Save ৳100</em></div><button className="primary-button" onClick={add}>Add to Cart <ShoppingCart size={14} /></button></div></article></section>
    <ProductSection title="Our Best Selling Products" eyebrow="Best Sellers" products={visibleProducts.slice(0, 8)} onAdd={addToCart} onOrderNow={goToCheckout} isWishlisted={isWishlisted} onToggleWishlist={toggleWishlist} id="shop" tabs={{ categories, activeCategory, setActiveCategory }} />
    <section className="subscribe page-width"><div className="subscribe-content"><h2>Subscribe</h2><strong className="subscribe-discount">10% OFF</strong><p>Delve into the vibrant world of Bangladeshi flavors, showcasing carefully selected ingredients.</p></div><NewsletterForm className="subscribe-form" placeholder="Enter your email address" buttonLabel="Subscribe" onSubscribe={() => notify("Subscribed! Your 10% off code is on its way.")} /></section>
    <ProductSection title="Combo Packages" eyebrow="Value Packs" products={products.slice(0, 8)} onAdd={addToCart} onOrderNow={goToCheckout} isWishlisted={isWishlisted} onToggleWishlist={toggleWishlist} />
    <PrayerTimesCard notify={notify} />
    <section className="trust-section"><span className="trust-badge"><Star size={11} fill="currentColor" /> Why Choose Amzad Food</span><h2>Quality You Can Trust</h2><p>Trust is our most important ingredient</p><div className="trust-grid">{trustPoints.map((point) => <div key={point.title}><span className="trust-icon"><img src={point.icon} alt="" aria-hidden="true" /></span><strong>{point.title}</strong><small>{point.subtitle}</small></div>)}</div></section>
    <section className="review-section"><h2>Customer Reviews And Ratings</h2><ReviewCarousel /></section>
    <ProductSection title="All Products" eyebrow="Explore our full collection" products={exploreProducts.slice(0, 8)} onAdd={addToCart} onOrderNow={goToCheckout} isWishlisted={isWishlisted} onToggleWishlist={toggleWishlist} />
    <section className="video-reviews" id="blogs"><h2>Customer Product Review</h2><div className="blog-grid">{blogReviews.map((item, index) => <article className="blog-card" key={index}><img src={item.image} alt={item.alt} /><button className="blog-play" aria-label="Play video" onClick={() => notify("Video coming soon")}><Play size={16} fill="currentColor" /></button></article>)}</div><div className="trust-banner"><h2>Trusted by Thousands of Families</h2><p>Integrity is the cornerstone of our mission.</p><div className="stats"><span><div className="stat-top"><i className="stat-icon"><Users size={20} /></i><b>50K+</b></div><small>Happy Customer</small></span><span><div className="stat-top"><i className="stat-icon"><Gift size={20} /></i><b>200+</b></div><small>Quality Products</small></span><span><div className="stat-top"><i className="stat-icon"><MapPin size={20} /></i><b>60+</b></div><small>Districts Covered</small></span><span><div className="stat-top"><i className="stat-icon"><Star size={20} /></i><b>4.8/5</b></div><small>Customer Rating</small></span></div></div></section>
    <footer className="footer">
      <div className="footer-cta page-width">
        <h2 className="footer-cta-heading">LET&apos;S TALK<br /><em>ABOUT FOOD.</em></h2>
        <a className="footer-orbit" href="#shop" aria-label="Order now">
          <svg viewBox="0 0 160 160"><path id="orbitPath" fill="none" d="M 80,80 m -68,0 a 68,68 0 1,1 136,0 a 68,68 0 1,1 -136,0" /><text><textPath href="#orbitPath" startOffset="0%">ORDER NOW · FREE DELIVERY · ORDER NOW · FREE DELIVERY ·</textPath></text></svg>
          <ArrowRight className="footer-orbit-arrow" size={22} />
        </a>
      </div>
      <div className="footer-divider page-width" />
      <div className="footer-main page-width">
        <div className="footer-brand">
          <a className="brand amzad-brand" href="#top"><span className="brand-wordmark"><b>amzad</b> <strong>food</strong></span></a>
          <p>Trusted food products for everyday Bangladesh.</p>
          <div className="footer-newsletter"><strong>The Newsletter</strong><NewsletterForm className="footer-newsletter-form" placeholder="Your email address" buttonLabel={<ArrowRight size={14} />} onSubscribe={() => notify("Subscribed to the newsletter!")} /></div>
        </div>
        <div className="footer-column"><strong>Quick Links</strong><a href="#shop">Browse Products</a><a href="#collection">Collections</a><a href="#story">About us</a></div>
        <div className="footer-column"><strong>About</strong><a href="#story">Our Story</a><a href="#story">Mission</a><a href="#footer-contact">Contact</a></div>
        <div className="footer-contact" id="footer-contact">
          <strong>Contact</strong>
          <a className="footer-phone" href="tel:+8801700000000">+৮৮০ ১৭০০-০০০০০০</a>
          <a href="mailto:hello@amzadfood.com">hello@amzadfood.com</a>
          <address>বাড়ি ১২, রোড ৫, ধানমন্ডি<br />ঢাকা ১২০৯, বাংলাদেশ</address>
          <span className="footer-hours"><i />প্রতিদিন খোলা · রাত ১১টা পর্যন্ত</span>
        </div>
      </div>
      <div className="footer-bottom page-width">
        <div className="footer-bottom-left">
          <span>© 2024 Amzad Food</span>
          <div className="footer-social"><a href="#" aria-label="Facebook" onClick={(event) => { event.preventDefault(); notify("Coming soon"); }}><Facebook size={14} /></a><a href="#" aria-label="Instagram" onClick={(event) => { event.preventDefault(); notify("Coming soon"); }}><Instagram size={14} /></a><a href="#" aria-label="YouTube" onClick={(event) => { event.preventDefault(); notify("Coming soon"); }}><Youtube size={14} /></a></div>
        </div>
        <div className="footer-bottom-right">
          <a href="#" onClick={(event) => { event.preventDefault(); notify("Coming soon"); }}>Privacy Policy</a><a href="#" onClick={(event) => { event.preventDefault(); notify("Coming soon"); }}>Terms</a><a href="#" onClick={(event) => { event.preventDefault(); notify("Coming soon"); }}>FAQ</a>
          <a className="footer-top-btn" href="#top" aria-label="Back to top"><ArrowUp size={14} /></a>
        </div>
      </div>
      <div className="footer-giant" aria-hidden="true">amzad food</div>
    </footer>

    <Drawer open={cartOpen} onClose={() => setCartOpen(false)} title={`Your Cart (${cartCount})`}>
      {cart.length === 0 ? <p className="empty-state">Your cart is empty.</p> : <>
        <ul className="drawer-list">{cart.map((item) => <li key={item.name}>
          <img src={item.image} alt={item.name} />
          <div className="drawer-item-info"><strong>{item.name}</strong><span>৳{item.price}</span>
            <div className="qty-stepper"><button onClick={() => changeQty(item.name, -1)} aria-label={`Decrease ${item.name} quantity`}>-</button><b>{item.qty}</b><button onClick={() => changeQty(item.name, 1)} aria-label={`Increase ${item.name} quantity`}>+</button></div>
          </div>
          <button className="drawer-remove" aria-label={`Remove ${item.name}`} onClick={() => removeFromCart(item.name)}><X size={14} /></button>
        </li>)}</ul>
        <div className="drawer-total"><span>Subtotal</span><strong>৳{cartTotal}</strong></div>
        <button className="primary-button drawer-checkout" onClick={() => goToCheckout()}>Checkout <ArrowRight size={14} /></button>
      </>}
    </Drawer>

    <Drawer open={wishlistOpen} onClose={() => setWishlistOpen(false)} title={`Wishlist (${wishlist.length})`}>
      {wishlist.length === 0 ? <p className="empty-state">No items saved yet.</p> : <ul className="drawer-list">{wishlist.map((item) => <li key={item.name}>
        <img src={item.image} alt={item.name} />
        <div className="drawer-item-info"><strong>{item.name}</strong><span>৳{item.price}</span></div>
        <div className="drawer-item-actions">
          <button aria-label={`Add ${item.name} to cart`} onClick={() => addToCart(item)}><ShoppingCart size={14} /></button>
          <button className="drawer-remove" aria-label={`Remove ${item.name} from wishlist`} onClick={() => toggleWishlist(item)}><X size={14} /></button>
        </div>
      </li>)}</ul>}
    </Drawer>

    <Modal open={authOpen} onClose={() => setAuthOpen(false)} title="Sign In">
      <SignInForm onSubmit={(name) => { setUser({ name }); setAuthOpen(false); notify(`Welcome, ${name}!`); }} />
    </Modal>

    <Modal open={trackOpen} onClose={() => setTrackOpen(false)} title="Track Your Order">
      <TrackOrderForm />
    </Modal>

    <Modal open={originOpen} onClose={() => setOriginOpen(false)} title="Our Origin Stories">
      <div className="origin-story-list">{originStories.map((story) => <div className="origin-story-item" key={story.key}><span><story.icon size={16} /></span><div><strong>{story.place} · {story.product}</strong><p>{story.desc}</p></div></div>)}</div>
    </Modal>

    {toast && <div className="toast" role="status">{toast}</div>}
  </main>;
}

function ProductSection({ title, eyebrow, products, onAdd, onOrderNow, id, tabs, isWishlisted, onToggleWishlist }: { title: string; eyebrow: string; products: Product[]; onAdd: (product: Product) => void; onOrderNow: (product: Product) => void; id?: string; tabs?: { categories: string[]; activeCategory: string; setActiveCategory: (value: string) => void }; isWishlisted: (name: string) => boolean; onToggleWishlist: (product: Product) => void }) {
  const [sortKey, setSortKey] = useState<"featured" | "price-asc" | "price-desc">("featured");
  const [sortOpen, setSortOpen] = useState(false);
  const sortLabels: Record<string, string> = { featured: "Featured", "price-asc": "Price: Low to High", "price-desc": "Price: High to Low" };
  const sortedProducts = useMemo(() => {
    if (sortKey === "price-asc") return [...products].sort((a, b) => a.price - b.price);
    if (sortKey === "price-desc") return [...products].sort((a, b) => b.price - a.price);
    return products;
  }, [products, sortKey]);
  return <section className="shop-section page-width" id={id}><div className="section-heading"><div><p className="eyebrow">{eyebrow}</p><h2>{title}</h2><p>Discover our handpicked collection of natural and delicious products.</p></div><a className="text-link" href="#shop">View all products <ArrowRight size={14} /></a></div>{tabs && <>{sortOpen && <button className="panel-backdrop transparent" onClick={() => setSortOpen(false)} aria-label="Close sort menu" />}<div className="category-tabs">{tabs.categories.map((category) => <button className={tabs.activeCategory === category ? "active" : ""} key={category} onClick={() => tabs.setActiveCategory(category)}>{category}</button>)}<div className="sort-dropdown"><button className="sort-button" onClick={() => setSortOpen((value) => !value)} aria-haspopup="true" aria-expanded={sortOpen}>{sortLabels[sortKey]} <ChevronDown size={13} className={sortOpen ? "flip" : ""} /></button>{sortOpen && <div className="sort-menu">{Object.entries(sortLabels).map(([key, label]) => <button key={key} className={sortKey === key ? "active" : ""} onClick={() => { setSortKey(key as "featured" | "price-asc" | "price-desc"); setSortOpen(false); }}>{label}</button>)}</div>}</div></div></>}<div className="product-grid">{sortedProducts.map((product, index) => <ProductCard product={{ ...product, tag: product.tag || (index % 3 === 0 ? "New" : undefined) }} onAdd={() => onAdd(product)} onOrderNow={() => onOrderNow(product)} wishlisted={isWishlisted(product.name)} onToggleWishlist={() => onToggleWishlist(product)} key={`${product.name}-${index}`} />)}</div></section>;
}
