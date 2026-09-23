"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { CartItem, CartLine, loadCart, saveCart } from "./lib/cart";
import QuickView from "./components/QuickView";
import CategoryRail from "./components/CategoryRail";
import PrayerTimes from "./components/PrayerTimes";
import Reviews from "./components/Reviews";
import ImpactStats from "./components/ImpactStats";
import { ArrowDownLeft, ArrowRight, ArrowUp, Check, Cherry, ChevronDown, Copy, ChevronLeft, ChevronRight, Droplets, Eye, Facebook, Flame, Gift, Heart, Instagram, Leaf, Lock, LogIn, Mail, MapPin, Menu, PackageSearch, Phone, Play, Search, Send, ShoppingCart, Star, UserRound, X, Youtube } from "lucide-react";
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
const journeySteps = [
  { icon: faArrowsRotate, title: "Sourced", subtitle: "Direct from trusted farmers", hue: "#3f9a5c" },
  { icon: faMagnifyingGlass, title: "Quality Checked", subtitle: "Lab tested for your safety", hue: "#e59a12" },
  { icon: faBoxOpen, title: "Premium Packaging", subtitle: "Sealed to lock in freshness", hue: "#f56619" },
  { icon: faTruckFast, title: "Delivered", subtitle: "To your door, across Bangladesh", hue: "#2f7a8a" },
];
const originStories = [
  { key: "sylhet", className: "sylhet", icon: Leaf, place: "Sylhet", product: "Tea", desc: "Rolling tea gardens in the hills of Sylhet supply our hand-picked black tea leaves." },
  { key: "rajshahi", className: "rajshahi", icon: Cherry, place: "Rajshahi", product: "Mango", desc: "Rajshahi's fertile plains grow the sweetest, sun-ripened mangoes in Bangladesh." },
  { key: "comilla", className: "comilla", icon: Flame, place: "Comilla", product: "Spices", desc: "Comilla farmers hand-grind chili, turmeric and cumin using traditional methods." },
  { key: "sundarbans", className: "sundarbans", icon: Droplets, place: "Sundarbans", product: "Honey", desc: "Wild honey harvested sustainably from the mangrove forests of the Sundarbans." },
];

function ProductCard({ product, onAdd, onOrderNow, wishlisted, onToggleWishlist }: { product: Product; onAdd: (item?: CartLine, qty?: number) => void; onOrderNow: (item?: CartLine, qty?: number) => void; wishlisted: boolean; onToggleWishlist: () => void }) {
  const [quickView, setQuickView] = useState(false);
  const closeQuickView = useCallback(() => setQuickView(false), []);
  return <article className="pc">
    <div className="pc-media">
      <div className="pc-badges"><span className="pc-save">Save ৳50</span>{product.tag && <span className="pc-tag">{product.tag}</span>}</div>
      <button className={wishlisted ? "pc-wish active" : "pc-wish"} aria-label={wishlisted ? `Remove ${product.name} from wishlist` : `Add ${product.name} to wishlist`} aria-pressed={wishlisted} onClick={onToggleWishlist}><Heart size={16} fill={wishlisted ? "currentColor" : "none"} /></button>
      <img src={product.image} alt={product.name} />
      <div className="pc-quick">
        <button className="pc-quick-btn" onClick={() => setQuickView(true)} aria-label={`Quick view ${product.name}`}><Eye size={15} /><span>Quick view</span></button>
        <button className="pc-quick-btn add" onClick={() => onAdd()} aria-label={`Add ${product.name} to cart`}><ShoppingCart size={15} /><span>Add to cart</span></button>
      </div>
    </div>
    <div className="pc-body">
      <p className="pc-cat">কালোজিরা মধু</p>
      <h3 className="pc-name">{product.name}</h3>
      <div className="pc-meta"><span className="pc-unit">500 gm</span><span className="pc-rating"><Star size={12} fill="currentColor" />4.9<i>(46)</i></span></div>
      <div className="pc-price"><strong>৳{product.price}</strong><del>৳{product.price + 50}</del></div>
      <button className="pc-order cta cta-ghost cta-sm cta-block" onClick={() => onOrderNow()}><span>Order Now</span></button>
    </div>
    {quickView && <QuickView product={product} wishlisted={wishlisted} onToggleWishlist={onToggleWishlist} onAdd={onAdd} onOrderNow={onOrderNow} onClose={closeQuickView} />}
  </article>;
}

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
      <h1><span>{slide.title[0]}</span><em>{slide.title[1]}</em></h1>
      <p className="hero-description">{slide.desc}</p>
      <div className="hero-actions">
        <a href="#shop" className="cta cta-lg"><span>{slide.cta}</span><i className="cta-icon cta-arrow"><ArrowRight size={15} /></i></a>
        <span className="hero-note"><span className="avatar-stack"><i>F</i><i>A</i><i>M</i></span><span className="hero-note-text"><b><Star size={11} fill="currentColor" /> 4.9 rating</b><small>Loved by 10,000+ families</small></span></span>
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

const navItems = [{ href: "#top", label: "Home" }, { href: "#shop", label: "All Products" }, { href: "#story", label: "Collection" }, { href: "#blogs", label: "Blogs" }];

function NavLinks({ onNavigate }: { onNavigate: () => void }) {
  const [active, setActive] = useState(0);
  const [pill, setPill] = useState<{ left: number; width: number } | null>(null);
  const linkRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  useEffect(() => {
    const place = () => {
      const link = linkRefs.current[active];
      if (link) setPill({ left: link.offsetLeft, width: link.offsetWidth });
    };
    place();
    window.addEventListener("resize", place);
    return () => window.removeEventListener("resize", place);
  }, [active]);
  return <div className="nav-track">
    {pill && <span className="nav-pill" style={{ transform: `translateX(${pill.left}px)`, width: pill.width }} aria-hidden="true" />}
    {navItems.map((item, index) => <a key={item.label} href={item.href} ref={(element) => { linkRefs.current[index] = element; }} className={index === active ? "active" : ""} aria-current={index === active ? "page" : undefined} onClick={() => { setActive(index); onNavigate(); }}>{item.label}</a>)}
  </div>;
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

function NewsletterForm({ placeholder, buttonLabel, buttonClassName, onSubscribe, className }: { placeholder: string; buttonLabel: React.ReactNode; buttonClassName?: string; onSubscribe: (email: string) => void; className: string }) {
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
    <button type="submit" className={buttonClassName}>{buttonLabel}</button>
    {error && <small className="form-error">Enter a valid email address</small>}
  </form>;
}

const NEWSLETTER_CODE = "WELCOME10";

function NewsletterBanner({ notify }: { notify: (message: string) => void }) {
  const [unlocked, setUnlocked] = useState(false);
  const [copied, setCopied] = useState(false);
  const copyCode = async () => {
    try {
      await navigator.clipboard.writeText(NEWSLETTER_CODE);
      setCopied(true);
      notify(`Code ${NEWSLETTER_CODE} copied`);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      notify(`Your code: ${NEWSLETTER_CODE}`);
    }
  };
  return <section className="newsletter page-width" id="newsletter"><div className="nl-card">
    <div className="nl-copy">
      <span className="nl-pill"><Mail size={12} /> Newsletter · নিউজলেটার</span>
      <h2>Join the family, <em>get 10% off</em> your first order</h2>
      <p>Weekly deals, fresh arrivals and traditional recipes from across Bangladesh, straight to your inbox.</p>
      <NewsletterForm className="nl-form" placeholder="Enter your email address" buttonClassName="cta cta-sm" buttonLabel={<><span>Subscribe</span><i className="cta-icon"><Send size={13} /></i></>} onSubscribe={() => { setUnlocked(true); notify("Subscribed! Your 10% off code is unlocked."); }} />
      <ul className="nl-perks"><li><Check size={14} /> Weekly deals</li><li><Check size={14} /> New arrivals first</li><li><Check size={14} /> No spam, ever</li></ul>
    </div>
    <div className="nl-visual">
      <div className="nl-ticket-wrap"><div className={unlocked ? "nl-ticket unlocked" : "nl-ticket"}>
        <div className="nl-ticket-top"><small>Welcome offer</small><strong>10<span>%</span></strong><b>OFF</b></div>
        <div className="nl-ticket-bottom">
          <small>{unlocked ? "Tap to copy your code" : "Subscribe to unlock your code"}</small>
          <button className="nl-code" onClick={copyCode} disabled={!unlocked} aria-label={unlocked ? `Copy code ${NEWSLETTER_CODE}` : "Code locked until you subscribe"}><span>{NEWSLETTER_CODE}</span>{!unlocked ? <Lock size={15} /> : copied ? <Check size={15} /> : <Copy size={15} />}</button>
        </div>
      </div></div>
    </div>
  </div></section>;
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
    <button className="cta cta-block" type="submit"><span>Sign In</span><i className="cta-icon"><LogIn size={15} /></i></button>
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
    <button className="cta cta-block" type="submit"><span>Track Order</span><i className="cta-icon"><PackageSearch size={15} /></i></button>
    {result && <p className="track-result">{result}</p>}
  </form>;
}

export default function Home() {
  const router = useRouter();
  const [activeCategory, setActiveCategory] = useState("All");
  const [menuOpen, setMenuOpen] = useState(false);
  const [megaMenuOpen, setMegaMenuOpen] = useState(false);
  const [query, setQuery] = useState("");
  const searchRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement;
      if (event.key === "/" && !["INPUT", "TEXTAREA"].includes(target.tagName)) { event.preventDefault(); searchRef.current?.focus(); }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);
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
  const addToCart = (product: CartLine, qty = 1) => {
    setCart((items) => {
      const found = items.find((item) => item.name === product.name);
      if (found) return items.map((item) => item.name === product.name ? { ...item, qty: item.qty + qty } : item);
      return [...items, { name: product.name, price: product.price, image: product.image, qty }];
    });
    notify(qty > 1 ? `Added ${qty} × ${product.name} to cart` : `Added ${product.name} to cart`);
  };
  const removeFromCart = (name: string) => setCart((items) => items.filter((item) => item.name !== name));
  const changeQty = (name: string, delta: number) => setCart((items) => items.map((item) => item.name === name ? { ...item, qty: item.qty + delta } : item).filter((item) => item.qty > 0));
  const cartCount = cart.reduce((sum, item) => sum + item.qty, 0);
  const cartTotal = cart.reduce((sum, item) => sum + item.qty * item.price, 0);
  const goToCheckout = (product?: CartLine, qty = 1) => {
    let next = cart;
    if (product) {
      const found = cart.find((item) => item.name === product.name);
      next = found ? cart.map((item) => item.name === product.name ? { ...item, qty: item.qty + qty } : item) : [...cart, { name: product.name, price: product.price, image: product.image, qty }];
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
    <nav className="navbar page-width"><button className={menuOpen ? "mobile-menu icon-button open" : "mobile-menu icon-button"} onClick={() => setMenuOpen(!menuOpen)} aria-label={menuOpen ? "Close menu" : "Open menu"} aria-expanded={menuOpen}>{menuOpen ? <X size={19} /> : <Menu size={19} />}</button><a className="brand amzad-brand" href="#top"><span className="brand-wordmark"><b>amzad</b> <strong>food</strong><small>বিশ্বাসের সাথে, স্বাদের ঠিকানা</small></span></a><div className={menuOpen ? "nav-links open" : "nav-links"}><NavLinks onNavigate={() => setMenuOpen(false)} /><div className="nav-links-mobile-actions"><button className="nav-account" onClick={() => { setMenuOpen(false); handleAccountClick(); }}><UserRound size={16} /><small>{user ? user.name : "Sign in"}</small></button><button className="nav-account wishlist" onClick={() => { setMenuOpen(false); setWishlistOpen(true); }}><Heart size={16} /><small>Wishlist</small></button></div></div>{menuOpen && <button className="nav-backdrop" onClick={() => setMenuOpen(false)} aria-label="Close menu" />}<div className="nav-actions"><label className="nav-search"><Search size={15} /><input ref={searchRef} placeholder="Search honey, ghee, dates..." value={query} onChange={(event) => setQuery(event.target.value)} onKeyDown={(event) => { if (event.key === "Enter") scrollToShop(); if (event.key === "Escape") event.currentTarget.blur(); }} aria-label="Search products" />{query ? <button type="button" className="nav-search-clear" onClick={() => setQuery("")} aria-label="Clear search"><X size={13} /></button> : <kbd>/</kbd>}</label><div className="nav-icons"><button className="nav-icon" onClick={handleAccountClick} aria-label={user ? `Signed in as ${user.name}, sign out` : "Sign in"} data-tip={user ? "Sign out" : "Sign in"}>{user ? <span className="nav-avatar">{user.name.slice(0, 1).toUpperCase()}</span> : <UserRound size={18} />}</button><button className="nav-icon nav-wishlist" onClick={() => setWishlistOpen(true)} aria-label={`Wishlist, ${wishlist.length} items`} data-tip="Wishlist"><Heart size={18} />{wishlist.length > 0 && <b>{wishlist.length}</b>}</button></div><button className="nav-cart" onClick={() => setCartOpen(true)} aria-label={`Cart, ${cartCount} items`}><span className="nav-cart-icon"><ShoppingCart size={17} /><b key={cartCount}>{cartCount}</b></span><span className="nav-cart-text"><small>My Cart</small><strong>৳{cartTotal.toLocaleString("en-IN")}</strong></span></button><button className={megaMenuOpen ? "mega-menu-trigger open" : "mega-menu-trigger"} onClick={() => setMegaMenuOpen(!megaMenuOpen)} aria-haspopup="true" aria-expanded={megaMenuOpen} aria-label="Browse menu"><span className="burger"><i /><i /><i /></span></button></div>{megaMenuOpen && <button className="mega-menu-backdrop" onClick={() => setMegaMenuOpen(false)} aria-label="Close menu" />}<div className={megaMenuOpen ? "mega-menu open" : "mega-menu"}><div className="mega-menu-inner"><div><p className="mega-menu-title">Shop by Category</p><div className="mega-category-grid">{shopCategories.map((category) => <a href="#shop" key={category.label} onClick={() => setMegaMenuOpen(false)}><span><img src={category.icon} alt="" aria-hidden="true" /></span>{category.label}</a>)}</div></div><div className="mega-promo"><span className="mega-promo-icon"><Gift size={20} /></span><strong>Gift Boxes</strong><p>Curated hampers perfect for festivals, weddings or a thoughtful everyday surprise.</p><a href="#shop" className="cta cta-sm" onClick={() => setMegaMenuOpen(false)}><span>Explore Gifts</span><i className="cta-icon"><Gift size={14} /></i></a></div></div></div></nav>
    <CategoryRail onAdd={addToCart} onBrowse={(label) => { scrollToShop(); notify(label === "All" ? "Showing all products" : `Browsing ${label}`); }} />
    <HeroSlider />
    <section className="journey page-width" aria-label="From source to your table"><div className="journey-card">
      <div className="journey-intro"><span className="journey-pill"><Leaf size={12} /> Our Promise</span><h2>From Source<br /><em>to Your Table</em></h2><p>A journey of trust &amp; quality, in four careful steps.</p></div>
      <ol className="journey-steps">{journeySteps.map((step, index) => <li key={step.title} style={{ "--step-hue": step.hue } as React.CSSProperties}><span className="journey-node"><FontAwesomeIcon icon={step.icon} fontSize={17} /></span><small>Step {String(index + 1).padStart(2, "0")}</small><strong>{step.title}</strong><p>{step.subtitle}</p></li>)}</ol>
    </div></section>
    <section className="feature-band page-width" id="story"><article className="origin-card"><div className="origin-copy"><p className="eyebrow">Rooted in Bangladesh</p><h2>Discover<br />Our Origin <span>🍃</span></h2><p>Discover authentic Bangladeshi foods, trusted essentials and naturally sourced products — all in one place.</p><button className="cta" onClick={() => setOriginOpen(true)}><span>Explore Origin Stories</span><i className="cta-icon"><MapPin size={15} /></i></button></div><div className="origin-map"><img src="/amzad-food-website/bangladesh-map.png" alt="Bangladesh sourcing map" />{originStories.map((story) => <span className={`origin-pin ${story.className}`} key={story.key}><i><story.icon size={13} /></i><b>{story.place}<small>{story.product}</small></b></span>)}</div></article><article className="honey-card"><img className="honey-bg" src="/amzad-food-website/honey-bg.png" alt="" aria-hidden="true" /><span className="honey-callout">Pure Goodness<small>from Bangladesh</small><ArrowDownLeft size={20} /></span><div className="honey-copy"><h2>Sundarbans<br />Raw Honey</h2><p className="honey-subtitle">Cold Pressed <span>•</span> 100% Natural</p><div className="honey-badges"><span>100% Natural</span><span>Rich in Naturals</span></div><div className="honey-price"><strong>৳350</strong><del>৳450</del><em>Save ৳100</em></div><button className="cta" onClick={add}><span>Add to Cart</span><i className="cta-icon"><ShoppingCart size={15} /></i></button></div></article></section>
    <ProductSection title="Our Best Selling Products" eyebrow="Best Sellers" products={visibleProducts.slice(0, 8)} onAdd={addToCart} onOrderNow={goToCheckout} isWishlisted={isWishlisted} onToggleWishlist={toggleWishlist} id="shop" tabs={{ categories, activeCategory, setActiveCategory }} />
    <NewsletterBanner notify={notify} />
    <ProductSection title="Combo Packages" eyebrow="Value Packs" products={products.slice(0, 8)} onAdd={addToCart} onOrderNow={goToCheckout} isWishlisted={isWishlisted} onToggleWishlist={toggleWishlist} />
    <PrayerTimes notify={notify} />
    <section className="trust-section"><div className="tr page-width">
      <div className="tr-intro">
        <span className="tr-kicker"><Star size={11} fill="currentColor" /> Why Choose Amzad Food</span>
        <h2>Quality you can <em>trust</em></h2>
        <p>Trust is our most important ingredient. Every product is sourced, tested and packed with care before it reaches your family.</p>
        <div className="tr-seal" aria-hidden="true">
          <svg viewBox="0 0 124 124"><path id="trustSealPath" fill="none" d="M 62,62 m -48,0 a 48,48 0 1,1 96,0 a 48,48 0 1,1 -96,0" /><text><textPath href="#trustSealPath">100% PURE · LAB TESTED · TRUSTED ·</textPath></text></svg>
          <span><Leaf size={22} /></span>
        </div>
      </div>
      <ul className="tr-grid">{trustPoints.map((point, index) => <li key={point.title}>
        <div className="tr-top"><span className="tr-icon"><img src={point.icon} alt="" aria-hidden="true" /></span><b>{String(index + 1).padStart(2, "0")}</b></div>
        <strong>{point.title}</strong>
        <small>{point.subtitle}</small>
      </li>)}</ul>
    </div></section>
    <Reviews />
    <ProductSection title="All Products" eyebrow="Explore our full collection" products={exploreProducts.slice(0, 8)} onAdd={addToCart} onOrderNow={goToCheckout} isWishlisted={isWishlisted} onToggleWishlist={toggleWishlist} />
    <section className="video-reviews" id="blogs"><h2>Customer Product Review</h2><div className="blog-grid">{blogReviews.map((item, index) => <article className="blog-card" key={index}><img src={item.image} alt={item.alt} /><button className="blog-play" aria-label="Play video" onClick={() => notify("Video coming soon")}><Play size={16} fill="currentColor" /></button></article>)}</div><ImpactStats /></section>
    <footer className="ft">
      <div className="ft-cta page-width">
        <div className="ft-cta-copy">
          <span className="ft-kicker"><i />প্রতিদিন খোলা · রাত ১১টা পর্যন্ত</span>
          <h2>Let&apos;s talk <em>about food.</em></h2>
          <p>Questions about an order, a product or a gift box? Our team is happy to help, every day.</p>
        </div>
        <div className="ft-cta-actions">
          <a className="cta cta-whatsapp" href="https://wa.me/8801327406605" target="_blank" rel="noreferrer"><span>Chat on WhatsApp</span><i className="cta-icon"><FontAwesomeIcon icon={faWhatsapp} fontSize={16} /></i></a>
          <a className="cta cta-light" href="tel:+8809613824071"><span>Call 09613824071</span><i className="cta-icon"><Phone size={15} /></i></a>
        </div>
        <a className="footer-orbit" href="#shop" aria-label="Order now">
          <svg viewBox="0 0 160 160"><path id="orbitPath" fill="none" d="M 80,80 m -68,0 a 68,68 0 1,1 136,0 a 68,68 0 1,1 -136,0" /><text><textPath href="#orbitPath" startOffset="0%">ORDER NOW · FREE DELIVERY · ORDER NOW · FREE DELIVERY ·</textPath></text></svg>
          <ArrowRight className="footer-orbit-arrow" size={22} />
        </a>
      </div>

      <div className="ft-main page-width">
        <div className="ft-brand">
          <a className="brand amzad-brand" href="#top"><span className="brand-wordmark"><b>amzad</b> <strong>food</strong></span></a>
          <p>Trusted food products for everyday Bangladesh, sourced with care from farms across the country.</p>
          <ul className="ft-contact">
            <li><MapPin size={15} /><span>বাড়ি ১২, রোড ৫, ধানমন্ডি, ঢাকা ১২০৯</span></li>
            <li><Mail size={15} /><a href="mailto:hello@amzadfood.com">hello@amzadfood.com</a></li>
            <li><Phone size={15} /><a href="tel:+8809613824071">09613824071</a></li>
          </ul>
          <div className="ft-social">
            {[[Facebook, "Facebook"], [Instagram, "Instagram"], [Youtube, "YouTube"]].map(([Icon, label]) => { const SocialIcon = Icon as typeof Facebook; return <a key={label as string} href="#" aria-label={label as string} onClick={(event) => { event.preventDefault(); notify("Coming soon"); }}><SocialIcon size={15} /></a>; })}
          </div>
        </div>
        <nav className="ft-col" aria-label="Shop"><strong>Shop</strong><a href="#shop">Honey</a><a href="#shop">Ghee &amp; Oil</a><a href="#shop">Khejur</a><a href="#shop">Mosla</a><a href="#shop">Combo &amp; Gifts</a></nav>
        <nav className="ft-col" aria-label="Company"><strong>Company</strong><a href="#story">Our Story</a><a href="#blogs">Blogs</a><a href="#reviews">Reviews</a><a href="#prayer-times">Prayer Times</a></nav>
        <nav className="ft-col" aria-label="Help"><strong>Help</strong><a href="#" onClick={(event) => { event.preventDefault(); setTrackOpen(true); }}>Track Order</a><a href="/amzad-food-website/checkout/">Checkout</a><a href="#" onClick={(event) => { event.preventDefault(); notify("Coming soon"); }}>FAQ</a><a href="#" onClick={(event) => { event.preventDefault(); notify("Coming soon"); }}>Returns</a></nav>
        <div className="ft-news">
          <strong>Newsletter</strong>
          <p>Deals, new arrivals and recipes, once a week.</p>
          <NewsletterForm className="ft-news-form" placeholder="Your email address" buttonLabel={<ArrowRight size={15} />} onSubscribe={() => notify("Subscribed to the newsletter!")} />
        </div>
      </div>

      <div className="ft-pay page-width">
        <span>We accept</span>
        <b className="on"><Check size={13} /> Cash on Delivery</b>
        <b>bKash</b><b>Nagad</b><b>Cards</b>
        <small>Online payments coming soon</small>
      </div>

      <div className="ft-bottom page-width">
        <span>© {new Date().getFullYear()} Amzad Food. All rights reserved.</span>
        <div className="ft-legal">
          <a href="#" onClick={(event) => { event.preventDefault(); notify("Coming soon"); }}>Privacy Policy</a>
          <a href="#" onClick={(event) => { event.preventDefault(); notify("Coming soon"); }}>Terms</a>
          <a className="ft-top" href="#top" aria-label="Back to top"><ArrowUp size={15} /></a>
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
        <button className="cta cta-block drawer-checkout" onClick={() => goToCheckout()}><span>Checkout · ৳{cartTotal}</span><i className="cta-icon cta-arrow"><ArrowRight size={15} /></i></button>
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

function ProductSection({ title, eyebrow, products, onAdd, onOrderNow, id, tabs, isWishlisted, onToggleWishlist }: { title: string; eyebrow: string; products: Product[]; onAdd: (product: CartLine, qty?: number) => void; onOrderNow: (product: CartLine, qty?: number) => void; id?: string; tabs?: { categories: string[]; activeCategory: string; setActiveCategory: (value: string) => void }; isWishlisted: (name: string) => boolean; onToggleWishlist: (product: Product) => void }) {
  const [sortKey, setSortKey] = useState<"featured" | "price-asc" | "price-desc">("featured");
  const [sortOpen, setSortOpen] = useState(false);
  const sortLabels: Record<string, string> = { featured: "Featured", "price-asc": "Price: Low to High", "price-desc": "Price: High to Low" };
  const sortedProducts = useMemo(() => {
    if (sortKey === "price-asc") return [...products].sort((a, b) => a.price - b.price);
    if (sortKey === "price-desc") return [...products].sort((a, b) => b.price - a.price);
    return products;
  }, [products, sortKey]);
  return <section className="shop-section page-width" id={id}><div className="section-heading"><div><p className="eyebrow">{eyebrow}</p><h2>{title}</h2><p>Discover our handpicked collection of natural and delicious products.</p></div><a className="text-link" href="#shop">View all products <ArrowRight size={14} /></a></div>{tabs && <>{sortOpen && <button className="panel-backdrop transparent" onClick={() => setSortOpen(false)} aria-label="Close sort menu" />}<div className="category-tabs">{tabs.categories.map((category) => <button className={tabs.activeCategory === category ? "active" : ""} key={category} onClick={() => tabs.setActiveCategory(category)}>{category}</button>)}<div className="sort-dropdown"><button className="sort-button" onClick={() => setSortOpen((value) => !value)} aria-haspopup="true" aria-expanded={sortOpen}>{sortLabels[sortKey]} <ChevronDown size={13} className={sortOpen ? "flip" : ""} /></button>{sortOpen && <div className="sort-menu">{Object.entries(sortLabels).map(([key, label]) => <button key={key} className={sortKey === key ? "active" : ""} onClick={() => { setSortKey(key as "featured" | "price-asc" | "price-desc"); setSortOpen(false); }}>{label}</button>)}</div>}</div></div></>}<div className="product-grid">{sortedProducts.map((product, index) => <ProductCard product={{ ...product, tag: product.tag || (index % 3 === 0 ? "New" : undefined) }} onAdd={(item, qty) => onAdd(item ?? product, qty)} onOrderNow={(item, qty) => onOrderNow(item ?? product, qty)} wishlisted={isWishlisted(product.name)} onToggleWishlist={() => onToggleWishlist(product)} key={`${product.name}-${index}`} />)}</div></section>;
}
