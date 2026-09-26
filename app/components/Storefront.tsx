"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { CartItem, CartLine, loadCart, saveCart } from "../lib/cart";
import Link from "next/link";
import { Product, products, comboProducts, exploreProducts, productSlug, catalog, storeProducts, productCategories, productBrands, getProductBrand } from "../lib/products";
import QuickView from "./QuickView";
import AuthModal from "./AuthModal";
import MegaMenu, { MenuContact, MenuIcon, MenuLink, menuCategories, menuHelp, menuPages } from "./MegaMenu";
import CategoryRail from "./CategoryRail";
import PrayerTimes, { PrayerDock } from "./PrayerTimes";
import Reviews from "./Reviews";
import ImpactStats from "./ImpactStats";
import { ArrowDownLeft, ArrowRight, ArrowUp, CakeSlice, Candy, Check, Cherry, Droplet, FileText, ChevronDown, Copy, Droplets, Eye, Facebook, Flame, Gift, Heart, Instagram, Leaf, Lock, Mail, MapPin, Menu, PackageSearch, Phone, Play, Search, Send, ShoppingCart, Star, TreePalm, UserRound, Wheat, X, Youtube } from "lucide-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowsRotate, faBoxOpen, faMagnifyingGlass, faTruckFast } from "@fortawesome/free-solid-svg-icons";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";

type WishItem = { name: string; price: number; image: string };
const categories = ["All", ...productCategories];
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
  { key: "dinajpur", className: "dinajpur", icon: Wheat, place: "Dinajpur", product: "Rice", desc: "Dinajpur's fields grow fragrant chinigura and kataribhog rice, milled fresh for every order." },
  { key: "tangail", className: "tangail", icon: Candy, place: "Tangail", product: "Chomchom", desc: "Tangail's famous Porabari chomchom and traditional sweets, made by generations of local sweet-makers." },
  { key: "jessore", className: "jessore", icon: TreePalm, place: "Jessore", product: "Khejur Gur", desc: "Winter date-palm sap from Jessore is slow-boiled into rich patali and jhola gur." },
];

function ProductCard({ product, onAdd, onOrderNow, wishlisted, onToggleWishlist }: { product: Product; onAdd: (item?: CartLine, qty?: number) => void; onOrderNow: (item?: CartLine, qty?: number) => void; wishlisted: boolean; onToggleWishlist: () => void }) {
  const [quickView, setQuickView] = useState(false);
  const closeQuickView = useCallback(() => setQuickView(false), []);
  return <article className="pc">
    <div className="pc-media">
      <div className="pc-badges">{product.oldPrice && <span className="pc-save">Save ৳{product.oldPrice - product.price}</span>}{product.tag && <span className="pc-tag">{product.tag}</span>}</div>
      <button className={wishlisted ? "pc-wish active" : "pc-wish"} aria-label={wishlisted ? `Remove ${product.name} from wishlist` : `Add ${product.name} to wishlist`} aria-pressed={wishlisted} onClick={onToggleWishlist}><Heart size={16} fill={wishlisted ? "currentColor" : "none"} /></button>
      <Link className="pc-product-link" href={`/products/${productSlug(product.name)}/`} aria-label={`View ${product.name}`}><img src={product.image} alt={product.name} /></Link>
      <div className="pc-quick">
        <button className="pc-quick-btn" onClick={() => setQuickView(true)} aria-label={`Quick view ${product.name}`}><Eye size={15} /><span>Quick view</span></button>
        <button className="pc-quick-btn add" onClick={() => onAdd()} aria-label={`Add ${product.name} to cart`}><ShoppingCart size={15} /><span>Add to cart</span></button>
      </div>
    </div>
    <div className="pc-body">
      <p className="pc-cat">{product.bn}</p>
      <h3 className="pc-name"><Link href={`/products/${productSlug(product.name)}/`}>{product.name}</Link></h3>
      <div className="pc-meta"><span className="pc-unit">{product.unit}</span><span className="pc-rating"><Star size={12} fill="currentColor" />4.9<i>(46)</i></span></div>
      <div className="pc-price"><strong>৳{product.price.toLocaleString("en-IN")}</strong>{product.oldPrice && <del>৳{product.oldPrice.toLocaleString("en-IN")}</del>}</div>
      <button className="pc-order cta cta-ghost cta-sm cta-block" onClick={() => onOrderNow()}><span>Order Now</span></button>
    </div>
    {quickView && <QuickView product={product} wishlisted={wishlisted} onToggleWishlist={onToggleWishlist} onAdd={onAdd} onOrderNow={onOrderNow} onClose={closeQuickView} />}
  </article>;
}

const heroSlides = [
  { image: "/amzad-food-website/hero-slide-1.png", size: [1924, 1282], spots: [["Kabab Queen Curry Powder", 370, 125, 390, 235], ["Cumin Powder", 765, 120, 410, 240], ["Garam Masala Powder", 1205, 125, 390, 235], ["Turmeric Powder", 215, 320, 550, 640], ["Chili Powder", 765, 330, 505, 660], ["Coriander Powder", 1270, 340, 485, 640]] as [string, number, number, number, number][], eyebrow: "100% Pure & Organic", title: ["Bold Spices,", "Real Bangladeshi Taste"], desc: "Hand-ground turmeric, chili, cumin and garam masala — sourced fresh to bring authentic flavor to every meal.", cta: "Shop Spices", bangla: { kicker: "রান্নার আসল স্বাদে", title: "খাঁটি মসলা", top: "6%" } },
  { image: "/amzad-food-website/hero-slide-2.png", size: [1838, 1226], spots: [["Protein Bar", 55, 280, 405, 620], ["Badami Barfi", 460, 230, 460, 710], ["Pera Sondesh", 920, 205, 405, 730], ["Chinabuti Naru", 1325, 290, 400, 670]] as [string, number, number, number, number][], eyebrow: "Traditional Recipes", title: ["Sweets & Snacks,", "Made With Love"], desc: "From badam barfi to protein bars — classic Bangladeshi treats made the way you remember, delivered fresh.", cta: "Shop Sweets", bangla: { kicker: "প্রতিটি মধুর স্বাদে", title: "মিষ্টি মুহূর্ত", top: "13%" } },
  { image: "/amzad-food-website/hero-slide-3.png", size: [1932, 1288], spots: [["Sundarbans Raw Honey", 445, 95, 400, 595], ["Isabgul Husk Fiber", 885, 145, 680, 445], ["Mixed Nuts", 230, 465, 330, 535], ["Pure Ghee", 825, 595, 505, 525], ["SLFIT Support Capsules", 1335, 670, 415, 450]] as [string, number, number, number, number][], eyebrow: "Nature's Best", title: ["Pure Honey & Ghee,", "Straight From the Source"], desc: "Raw honey, farm-fresh ghee and wellness essentials — sourced with care, trusted by thousands of families.", cta: "Shop Essentials", bangla: { kicker: "প্রকৃতির উপহার", title: "খাঁটি মধু ও ঘি", top: "2%" } },
];

function HeroSlider() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  useEffect(() => {
    if (paused || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = setInterval(() => setActive((value) => (value + 1) % heroSlides.length), 5000);
    return () => clearInterval(timer);
  }, [paused, active]);
  const slide = heroSlides[active];
  return <section className="hero hero-modern page-width" aria-label="Featured collections" aria-roledescription="carousel" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)} onFocusCapture={() => setPaused(true)} onBlurCapture={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) setPaused(false); }}>
    <div className="hero-stage">
    <div className="hero-copy" key={`copy-${active}`}>
      <p className="eyebrow"><span />{slide.eyebrow}</p>
      <h1><span>{slide.title[0]}</span><em>{slide.title[1]}</em></h1>
      <p className="hero-description">{slide.desc}</p>
      <div className="hero-actions">
        <a href="/amzad-food-website/#shop" className="cta cta-lg"><span>{slide.cta}</span><i className="cta-icon cta-arrow"><ArrowRight size={15} /></i></a>
        <span className="hero-note"><span className="avatar-stack"><i>F</i><i>A</i><i>M</i></span><span className="hero-note-text"><b><Star size={11} fill="currentColor" /> 4.9 rating</b><small>Loved by 10,000+ families</small></span></span>
      </div>

    </div>
    <div className="hero-art" key={`art-${active}`}>
      <div className="hero-image">
        <div className="hero-bn" lang="bn" style={{ ["--bn-top" as any]: slide.bangla.top }}>
          <span className="hero-bn-kicker">{slide.bangla.kicker}</span>
          <strong className="hero-bn-title">{slide.bangla.title}</strong>
        </div>
        <span className="hero-bn-seal" lang="bn" aria-hidden="true"><b>১০০%</b>খাঁটি</span>
        <img src={slide.image} alt={slide.title.join(" ")} />
        <svg className="hero-spots" viewBox={`0 0 ${slide.size[0]} ${slide.size[1]}`} preserveAspectRatio="xMidYMax meet">
          {slide.spots.map(([name, x, y, w, h]) => <a key={name} href={`/amzad-food-website/products/${productSlug(name)}/`} aria-label={`View ${name}`}><title>{name}</title><rect x={x} y={y} width={w} height={h} rx={28} /></a>)}
        </svg>
      </div>
      <span className="hero-stage-ring" aria-hidden="true" />
    </div>
    <div className="hero-slider-bar">
      <div className="hero-slide-tabs">{heroSlides.map((item, index) => <button key={item.image} className={index === active ? "active" : ""} onClick={() => setActive(index)} aria-label={`Show ${item.cta}`} aria-pressed={index === active}><span>0{index + 1}</span><b>{item.cta}</b><i /></button>)}</div>    </div>
    </div>
  </section>;
}

const navItems = [{ href: "#top", label: "Home" }, { href: "products/", label: "All Products" }, { href: "#story", label: "Collection" }, { href: "#blogs", label: "Blogs" }];

function NavLinks({ onNavigate }: { onNavigate: () => void }) {
  const pathname = usePathname();
  const [active, setActive] = useState(pathname === "/products/" || pathname === "/products" ? 1 : 0);
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
    {navItems.map((item, index) => <a key={item.label} href={`/amzad-food-website/${item.href}`} ref={(element) => { linkRefs.current[index] = element; }} className={index === active ? "active" : ""} aria-current={index === active ? "page" : undefined} onClick={() => { setActive(index); onNavigate(); }}>{item.label}</a>)}
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

type StoreActions = {
  addToCart: (product: CartLine, qty?: number) => void;
  goToCheckout: (product?: CartLine, qty?: number) => void;
  isWishlisted: (name: string) => boolean;
  toggleWishlist: (product: CartLine) => void;
};

function BlogSection({ notify, withStats = false }: { notify: (message: string) => void; withStats?: boolean }) {
  return <section className="video-reviews" id="blogs">
    <div className="video-review-heading">
      <div><span className="video-eyebrow"><Play size={11} fill="currentColor" /> THE AMZAD JOURNAL</span><h2>Good food.<br /><em>Stories worth sharing.</em></h2></div>
      <div className="video-heading-note"><p>Discover our products, everyday inspiration and the stories behind better food.</p><span>Customer product reviews <i /> Video series</span></div>
    </div>
    <div className="blog-grid">{blogReviews.map((item, index) => <article className="blog-card" key={item.image}>
      <button className="video-preview" aria-label={`Preview ${item.alt} — video coming soon`} onClick={() => notify("This video is coming soon")}>
        <img src={item.image} alt={item.alt} loading="lazy" />
        <span className="video-number">0{index + 1}</span>
        <span className="blog-play"><Play size={18} fill="currentColor" /></span>
        <span className="video-status">Video coming soon</span>
      </button>
      <div className="video-card-copy"><span className="video-card-category">{["Everyday wellness", "Natural goodness", "Better food habits"][index]}</span><h3>{item.alt}</h3><div className="video-card-bottom"><span>Amzad Food · Product stories</span><ArrowUp size={16} /></div></div>
    </article>)}</div>
    {withStats && <ImpactStats />}
  </section>;
}

export default function Storefront({ children }: { children?: (actions: StoreActions) => React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const isHomePage = pathname === "/";
  const [hasScrolled, setHasScrolled] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  useEffect(() => {
    let frame = 0;
    let progress = Math.min(1, Math.max(0, window.scrollY / 140));
    let lastTime = 0;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = (time: number) => {
      const target = Math.min(1, Math.max(0, window.scrollY / 140));
      const elapsed = lastTime ? Math.min(time - lastTime, 64) : 16;
      lastTime = time;
      progress = reducedMotion.matches ? target : progress + (target - progress) * (1 - Math.exp(-elapsed / 100));
      if (Math.abs(target - progress) < .001) progress = target;
      const nav = navRef.current;
      if (nav) {
        const viewport = document.documentElement.clientWidth;
        const mobile = viewport <= 800;
        const inset = mobile ? 12 : Math.max(32, (viewport - 1216) / 2);
        const initialPadding = mobile ? 20 : Math.max(32, (viewport - 1164) / 2);
        nav.style.setProperty("--nav-inset", `${inset * progress}px`);
        nav.style.setProperty("--nav-radius", `${(mobile ? 20 : 24) * progress}px`);
        nav.style.setProperty("--nav-top", `${(mobile ? 8 : 14) * progress}px`);
        nav.style.setProperty("--nav-left", `${initialPadding + ((mobile ? 14 : 26) - initialPadding) * progress}px`);
        nav.style.setProperty("--nav-right", `${initialPadding + ((mobile ? 14 : 20) - initialPadding) * progress}px`);
        nav.style.setProperty("--nav-shadow", `${.24 * progress}`);
      }
      frame = progress !== target ? window.requestAnimationFrame(update) : 0;
      if (!frame) lastTime = 0;
    };
    const onScroll = () => {
      setHasScrolled(window.scrollY > 0);
      if (!frame) frame = window.requestAnimationFrame(update);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => { window.removeEventListener("scroll", onScroll); window.removeEventListener("resize", onScroll); window.cancelAnimationFrame(frame); };
  }, []);
  const [menuProduct, setMenuProduct] = useState<Product | null>(null);
  const [activeCategory, setActiveCategory] = useState("All");
  const [menuOpen, setMenuOpen] = useState(false);
  const [megaMenuOpen, setMegaMenuOpen] = useState(false);
  const [mobileTab, setMobileTab] = useState<"menu" | "category">("menu");
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
  const [cartReady, setCartReady] = useState(false);
  useEffect(() => { setCart(loadCart()); setCartReady(true); }, []);
  useEffect(() => { if (cartReady) saveCart(cart); }, [cart, cartReady]);
  useEffect(() => { setQuery(new URLSearchParams(window.location.search).get("q") ?? ""); }, []);
  const [wishlist, setWishlist] = useState<WishItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [wishlistOpen, setWishlistOpen] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);
  const closeAuth = useCallback(() => setAuthOpen(false), []);
  const [originOpen, setOriginOpen] = useState(false);
  const [user, setUser] = useState<{ name: string } | null>(null);
  const [toast, setToast] = useState<string | null>(null);
  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => setToast(null), 2800);
    return () => clearTimeout(timer);
  }, [toast]);
  const notify = (message: string) => setToast(message);
  const visibleProducts = useMemo(() => {
    const source = activeCategory === "All" ? [...products.slice(0, 8), ...exploreProducts.slice(0, 3)] : storeProducts.filter(item => item.category === activeCategory);
    return source.filter(item => `${item.name} ${getProductBrand(item)}`.toLowerCase().includes(query.toLowerCase()));
  }, [activeCategory, query]);
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
  const closeMenus = () => { setMenuOpen(false); setMegaMenuOpen(false); };
  const browseMenuCategory = (category: { label: string; tab?: string }) => {
    const tab = category.tab ?? category.label;
    closeMenus(); setActiveCategory(categories.includes(tab) ? tab : "All"); scrollToShop();
    notify(`Browsing ${category.label}`);
  };
  const runMenuLink = (event: React.MouseEvent, link: MenuLink) => {
    closeMenus();
    if (link.href) return;
    event.preventDefault();
    if (link.action === "account") handleAccountClick();
    else if (link.action === "track") router.push("/track-order/");
    else notify("Coming soon");
  };
  const scrollToShop = () => { setMenuOpen(false); if (children) { router.push(`/?q=${encodeURIComponent(query)}#shop`); } else { document.getElementById("shop")?.scrollIntoView({ behavior: "smooth" }); } };
  const add = () => addToCart({ name: "Sundarbans Raw Honey", price: 350, image: "/amzad-food-website/honey-bg.png" });
  return <main id="top" className={children ? "storefront" : "storefront storefront-home"}>
    <div className={hasScrolled ? "announcement is-hidden" : "announcement"}><div className="announcement-inner page-width"><span className="announcement-contacts-group"><span className="announcement-cta">প্রয়োজনে কল করুন</span><span className="announcement-contacts"><a className="announcement-contact" href="https://wa.me/8801327406605" target="_blank" rel="noreferrer"><FontAwesomeIcon icon={faWhatsapp} fontSize={14} /> 01327406605</a><span className="announcement-divider" /><a className="announcement-contact" href="tel:+8809613824071"><Phone size={13} /> 09613824071</a></span></span><span className="announcement-links"><a className="announcement-link" href="/amzad-food-website/track-order/"><PackageSearch size={13} /> Track Order</a></span></div></div>
    <nav ref={navRef} className="navbar page-width site-nav"><button className={menuOpen ? "mobile-menu icon-button open" : "mobile-menu icon-button"} onClick={() => setMenuOpen(!menuOpen)} aria-label={menuOpen ? "Close menu" : "Open menu"} aria-expanded={menuOpen}>{menuOpen ? <X size={19} /> : <Menu size={19} />}</button><a className="brand amzad-brand" href="/amzad-food-website/"><img className="brand-logo" src="/amzad-food-website/logo.png" alt="Amzad Food — নিরাপদ খাবার, আপনার অধিকার" width={1400} height={388} /></a><div className={`nav-links${menuOpen ? " open" : ""}${mobileTab === "category" ? " show-categories" : ""}`}><div className="mobile-menu-tabs" role="tablist" aria-label="Menu sections"><button role="tab" aria-selected={mobileTab === "menu"} className={mobileTab === "menu" ? "active" : ""} onClick={() => setMobileTab("menu")}>Menu</button><button role="tab" aria-selected={mobileTab === "category"} className={mobileTab === "category" ? "active" : ""} onClick={() => setMobileTab("category")}>Category</button></div><NavLinks onNavigate={() => setMenuOpen(false)} /><div className="mobile-menu-more">{[...menuPages.filter(link => !["Home", "Products", "Blogs"].includes(link.label)), ...menuHelp].map(link => <a key={link.label} className={link === menuHelp[0] ? "menu-help-start" : undefined} href={link.href ? `/amzad-food-website/${link.href}` : "#"} onClick={(event) => runMenuLink(event, link)}>{link.label}</a>)}</div><MenuContact /><div className="mobile-cat-list">{menuCategories.map(category => <a key={category.label} href="/amzad-food-website/#shop" onClick={(event) => { event.preventDefault(); browseMenuCategory(category); }}><span><MenuIcon icon={category.icon} /></span><b>{category.label}<small>{category.bn}</small></b><ArrowRight size={15} /></a>)}</div><form className="mobile-nav-search" onSubmit={(event) => { event.preventDefault(); scrollToShop(); }}><Search size={16} /><input type="search" aria-label="Search products on mobile" placeholder="Search products..." value={query} onChange={(event) => setQuery(event.target.value)} /><button type="submit" aria-label="Submit product search"><ArrowRight size={18} /></button></form><div className="nav-links-mobile-actions"><button className="nav-account" onClick={() => { setMenuOpen(false); handleAccountClick(); }}><UserRound size={16} /><small>{user ? user.name : "Sign in"}</small></button><button className="nav-account wishlist" onClick={() => { setMenuOpen(false); setWishlistOpen(true); }}><Heart size={16} /><small>Wishlist</small></button></div></div>{menuOpen && <button className="nav-backdrop" onClick={() => setMenuOpen(false)} aria-label="Close menu" />}<div className="nav-actions"><label className="nav-search"><Search size={15} /><input ref={searchRef} placeholder="Search honey, ghee, dates..." value={query} onChange={(event) => setQuery(event.target.value)} onKeyDown={(event) => { if (event.key === "Enter") scrollToShop(); if (event.key === "Escape") event.currentTarget.blur(); }} aria-label="Search products" />{query ? <button type="button" className="nav-search-clear" onClick={() => setQuery("")} aria-label="Clear search"><X size={13} /></button> : <kbd>/</kbd>}</label><div className="nav-icons"><button className="nav-icon" onClick={handleAccountClick} aria-label={user ? `Signed in as ${user.name}, sign out` : "Sign in"} data-tip={user ? "Sign out" : "Sign in"}>{user ? <span className="nav-avatar">{user.name.slice(0, 1).toUpperCase()}</span> : <UserRound size={18} />}</button><button className="nav-icon nav-wishlist" onClick={() => setWishlistOpen(true)} aria-label={`Wishlist, ${wishlist.length} items`} data-tip="Wishlist"><Heart size={18} />{wishlist.length > 0 && <b>{wishlist.length}</b>}</button></div><button className="nav-cart" onClick={() => setCartOpen(true)} aria-label={`Cart, ${cartCount} items`}><span className="nav-cart-icon"><ShoppingCart size={17} /><b key={cartCount}>{cartCount}</b></span><span className="nav-cart-text"><small>My Cart</small><strong>৳{cartTotal.toLocaleString("en-IN")}</strong></span></button><button className={megaMenuOpen ? "mega-menu-trigger open" : "mega-menu-trigger"} onClick={() => setMegaMenuOpen(!megaMenuOpen)} aria-haspopup="true" aria-expanded={megaMenuOpen} aria-label="Browse menu"><span className="burger"><i /><i /><i /></span></button></div><MegaMenu open={megaMenuOpen} onClose={() => setMegaMenuOpen(false)} onCategory={browseMenuCategory} onLink={runMenuLink} /></nav>
    {menuProduct && <QuickView product={menuProduct} wishlisted={wishlist.some(item => item.name === menuProduct.name)} onToggleWishlist={() => toggleWishlist(menuProduct)} onAdd={addToCart} onOrderNow={goToCheckout} onClose={() => setMenuProduct(null)} />}
    {isHomePage && <CategoryRail onView={setMenuProduct} onAdd={addToCart} onBrowse={(label) => { if (categories.includes(label)) setActiveCategory(label); scrollToShop(); notify(label === "All" ? "Showing all products" : `Browsing ${label}`); }} />}
    {children ? <>
    {children({ addToCart, goToCheckout, isWishlisted, toggleWishlist })}
    <Reviews />
    <BlogSection notify={notify} />
    </> : <>
    <HeroSlider />
    <section className="journey page-width" aria-label="From source to your table"><div className="journey-card">
      <div className="journey-intro"><span className="journey-pill"><Leaf size={12} /> Our Promise</span><h2>From Source<br /><em>to Your Table</em></h2><p>A journey of trust &amp; quality, in four careful steps.</p></div>
      <ol className="journey-steps">{journeySteps.map(step => <li key={step.title} style={{ "--step-hue": step.hue } as React.CSSProperties}><span className="journey-node"><FontAwesomeIcon icon={step.icon} fontSize={17} /></span><strong>{step.title}</strong><p>{step.subtitle}</p></li>)}</ol>
    </div></section>
    <section className="feature-band page-width" id="story"><article className="origin-card"><div className="origin-copy"><p className="eyebrow">Rooted in Bangladesh</p><h2>Discover<br /><span className="origin-title-line">Our Origin <span>🍃</span></span></h2><p>Discover authentic Bangladeshi foods, trusted essentials and naturally sourced products — all in one place.</p><button className="cta" onClick={() => setOriginOpen(true)}><span>Explore Origin Stories</span><i className="cta-icon"><MapPin size={15} /></i></button></div><div className="origin-map"><div className="bd-map" role="img" aria-label="Map of Bangladesh showing where our products are sourced"><span className="bd-shadow" aria-hidden="true" /><span className="bd-shape" aria-hidden="true" /><span className="bd-texture" aria-hidden="true" />{originStories.map((story) => <span className={`bd-spot ${story.className}`} key={`spot-${story.key}`} aria-hidden="true" />)}{originStories.map((story) => <span className={`origin-pin ${story.className}`} key={story.key}><i><story.icon size={13} /></i><b>{story.place}<small>{story.product}</small></b></span>)}</div></div></article><article className="honey-card"><img className="honey-bg" src="/amzad-food-website/honey-bg.png" alt="" aria-hidden="true" /><span className="honey-callout">Pure Goodness<small>from Bangladesh</small><ArrowDownLeft size={20} /></span><div className="honey-copy"><h2>Sundarbans<br />Raw Honey</h2><p className="honey-subtitle">Cold Pressed <span>•</span> 100% Natural</p><div className="honey-badges"><span>100% Natural</span><span>Rich in Naturals</span></div><div className="honey-price"><strong>৳350</strong><del>৳450</del><em>Save ৳100</em></div><button className="cta" onClick={add}><span>Add to Cart</span><i className="cta-icon"><ShoppingCart size={15} /></i></button></div></article></section>
    <ProductSection title="Our Best Selling Products" eyebrow="Best Sellers" products={visibleProducts} cardPromotion={activeCategory === "All" && !query.trim()} onAdd={addToCart} onOrderNow={goToCheckout} isWishlisted={isWishlisted} onToggleWishlist={toggleWishlist} id="shop" tabs={{ categories, activeCategory, setActiveCategory }} />
    <NewsletterBanner notify={notify} />
    <ProductSection promotion viewAllHref="/products/?category=Combo%20Packs" title="Combo Packages" eyebrow="Value Packs" products={comboProducts} onAdd={addToCart} onOrderNow={goToCheckout} isWishlisted={isWishlisted} onToggleWishlist={toggleWishlist} />
    <PrayerTimes notify={notify} />
    <PrayerDock />
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
    <section className="snack-promo-wrap page-width" aria-label="Sweets and snacks collection">
      <div className="snack-promo">
        <div className="snack-promo-image"><span aria-hidden="true" /><img src="/amzad-food-website/hero-slide-2.png" alt="Amzad Food sweets and snack packages" loading="lazy" /></div>
        <div className="snack-promo-copy"><span className="snack-promo-kicker"><Gift size={13} /> MADE FOR SHARING</span><h2>Little treats.<br /><em>Lovely moments.</em></h2><p>From badam barfi to protein bars — bring a little sweetness to tea time, family gatherings and thoughtful gifts.</p></div>
        <div className="snack-promo-action"><span>স্বাদে ঐতিহ্য, আনন্দে একসাথে</span><a href="#all-products" className="snack-promo-link">Explore the collection <ArrowRight size={17} /></a><small>Sweets, snacks & everyday favourites</small></div>
      </div>
    </section>
    <ProductSection id="all-products" title="All Products" eyebrow="Explore our full collection" products={exploreProducts.slice(0, 8)} onAdd={addToCart} onOrderNow={goToCheckout} isWishlisted={isWishlisted} onToggleWishlist={toggleWishlist} />
    <BlogSection notify={notify} withStats />
    </>}
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
        <a className="footer-orbit" href="/amzad-food-website/#shop" aria-label="Order now">
          <svg viewBox="0 0 160 160"><path id="orbitPath" fill="none" d="M 80,80 m -68,0 a 68,68 0 1,1 136,0 a 68,68 0 1,1 -136,0" /><text><textPath href="#orbitPath" startOffset="0%">ORDER NOW · FREE DELIVERY · ORDER NOW · FREE DELIVERY ·</textPath></text></svg>
          <ArrowRight className="footer-orbit-arrow" size={22} />
        </a>
      </div>

      <div className="ft-main page-width">
        <div className="ft-brand">
          <a className="brand amzad-brand" href="/amzad-food-website/"><img className="brand-logo" src="/amzad-food-website/logo-light.png" alt="Amzad Food — নিরাপদ খাবার, আপনার অধিকার" width={1400} height={388} /></a>
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
        <nav className="ft-col" aria-label="Shop"><strong>Shop</strong><a href="/amzad-food-website/#shop">Honey</a><a href="/amzad-food-website/#shop">Ghee &amp; Oil</a><a href="/amzad-food-website/#shop">Khejur</a><a href="/amzad-food-website/#shop">Mosla</a><a href="/amzad-food-website/#shop">Combo &amp; Gifts</a></nav>
        <nav className="ft-col" aria-label="Company"><strong>Company</strong><a href="/amzad-food-website/#story">Our Story</a><a href="/amzad-food-website/#blogs">Blogs</a><a href="/amzad-food-website/#reviews">Reviews</a><a href="/amzad-food-website/#prayer-times">Prayer Times</a></nav>
        <nav className="ft-col" aria-label="Help"><strong>Help</strong><a href="/amzad-food-website/track-order/">Track Order</a><a href="/amzad-food-website/checkout/">Checkout</a><a href="#" onClick={(event) => { event.preventDefault(); notify("Coming soon"); }}>FAQ</a><a href="#" onClick={(event) => { event.preventDefault(); notify("Coming soon"); }}>Returns</a></nav>
        <div className="ft-news">
          <strong>Newsletter</strong>
          <p>Deals, new arrivals and recipes, once a week.</p>
          <NewsletterForm className="ft-news-form" placeholder="Your email address" buttonLabel={<ArrowRight size={15} />} onSubscribe={() => notify("Subscribed to the newsletter!")} />
        </div>
      </div>

      <div className="ft-pay page-width">
        <span>We accept</span>
        <b className="on"><Check size={13} /> Cash on Delivery</b>
        <div className="ft-payment-logos" role="group" aria-label="Online payment methods coming soon" tabIndex={0}>
          {["Visa", "Mastercard", "American Express", "UnionPay", "Diners Club", "DBBL Nexus", "Q-Cash", "bKash", "Nagad", "Rocket", "tap", "Upay", "OK Wallet", "mCash", "Islamic Wallet", "MyCash", "Tap 'n Pay", "Citytouch"].map((method, index) => (
            <span key={`${method}-${index}`} className="ft-payment-card" role="img" aria-label={method} title={method}>
              <span className="ft-payment-logo" aria-hidden="true" style={{ backgroundPosition: `${-(24 + index * 72.75)}px -23px` }} />
            </span>
          ))}
        </div>
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

    <AuthModal open={authOpen} onClose={closeAuth} onSignIn={(name) => { setUser({ name }); setAuthOpen(false); notify(`Welcome, ${name}!`); }} />


    <Modal open={originOpen} onClose={() => setOriginOpen(false)} title="Our Origin Stories">
      <div className="origin-story-list">{originStories.map((story) => <div className="origin-story-item" key={story.key}><span><story.icon size={16} /></span><div><strong>{story.place} · {story.product}</strong><p>{story.desc}</p></div></div>)}</div>
    </Modal>

    {toast && <div className="toast" role="status">{toast}</div>}
  </main>;
}

function ProductSection({ cardPromotion = false, promotion = false, viewAllHref = "/products/", title, eyebrow, products, onAdd, onOrderNow, id, tabs, isWishlisted, onToggleWishlist }: { cardPromotion?: boolean; promotion?: boolean; viewAllHref?: string; title: string; eyebrow: string; products: Product[]; onAdd: (product: CartLine, qty?: number) => void; onOrderNow: (product: CartLine, qty?: number) => void; id?: string; tabs?: { categories: string[]; activeCategory: string; setActiveCategory: (value: string) => void }; isWishlisted: (name: string) => boolean; onToggleWishlist: (product: Product) => void }) {
  const [sortKey, setSortKey] = useState<SortKey>("featured");
  const sortedProducts = useMemo(() => sortProducts(products, sortKey), [products, sortKey]);
  return <section className="shop-section page-width" id={id}><div className="section-heading"><div><p className="eyebrow">{eyebrow}</p><h2>{title}</h2><p>Discover our handpicked collection of natural and delicious products.</p></div><ViewAllLink href={viewAllHref} /></div>{tabs ? <div className="shop-toolbar"><PillTabs label="Product categories" items={tabs.categories.map(category => ({ key: category, label: category }))} active={tabs.activeCategory} onChange={tabs.setActiveCategory} /><SortMenu value={sortKey} onChange={setSortKey} /></div> : null}{sortedProducts.length === 0 && <p className="shop-empty" role="status">No products available in this category yet. Explore another category.</p>}{promotion && <aside className="shop-promotion" aria-label="Featured honey collection">
      <div className="shop-promo-copy"><span className="shop-promo-kicker"><Leaf size={12} /> FROM NATURE, WITH CARE</span><h3>A little sweetness.<br /><em>A lot of goodness.</em></h3><p>খাঁটি স্বাদ, প্রতিদিনের ভরসা</p></div>
      <div className="shop-promo-art"><span aria-hidden="true" /><img src="/amzad-food-website/hero-slide-3.png" alt="Amzad Food honey and ghee collection" loading="lazy" /></div>
      <div className="shop-promo-bottom"><span className="shop-promo-label">THE PANTRY EDIT</span><p>Bring home our Sundarbans raw honey, sourced with care.</p><Link className="shop-promo-link" href="/products/sundarbans-raw-honey/"><span>Discover our honey</span><ArrowRight size={17} /></Link><small>Explore a favourite from Amzad Food</small></div>
    </aside>}
    <div className="product-grid">{sortedProducts.map((product, index) => <ProductCard product={{ ...product, tag: product.tag || (index % 3 === 0 ? "New" : undefined) }} onAdd={(item, qty) => onAdd(item ?? product, qty)} onOrderNow={(item, qty) => onOrderNow(item ?? product, qty)} wishlisted={isWishlisted(product.name)} onToggleWishlist={() => onToggleWishlist(product)} key={`${product.name}-${index}`} />)}{cardPromotion && <aside className="grid-promo-card" aria-label="Discover the Amzad Food collection">
      <span className="grid-promo-kicker"><Gift size={12} /> A LITTLE MORE GOODNESS</span>
      <h3>Made to share.<br /><em>Chosen with care.</em></h3>
      <div className="grid-promo-art"><img src="/amzad-food-website/hero-slide-2.png" alt="Amzad Food sweets and snacks" loading="lazy" /></div>
      <p>Discover sweets, snacks and pantry favourites for every occasion.</p>
      <a href="#all-products">Explore the collection <ArrowRight size={15} /></a>
    </aside>}</div></section>;
}

type SortKey = "featured" | "price-asc" | "price-desc";
const sortLabels: Record<SortKey, string> = { featured: "Featured", "price-asc": "Price: Low to High", "price-desc": "Price: High to Low" };
const sortProducts = (items: Product[], key: SortKey) => key === "price-asc" ? [...items].sort((a, b) => a.price - b.price) : key === "price-desc" ? [...items].sort((a, b) => b.price - a.price) : items;

function ViewAllLink({ href }: { href: string }) {
  return <Link className="view-all" href={href}><span>View all</span><i><ArrowRight size={14} /></i></Link>;
}

// Segmented tabs styled like the navbar: a soft track with a white pill that slides to the active tab.
// On narrow screens the track scrolls sideways and keeps the active tab in view.
function PillTabs({ items, active, onChange, label }: { items: { key: string; label: string; count?: number }[]; active: string; onChange: (key: string) => void; label: string }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const [pill, setPill] = useState<{ left: number; width: number } | null>(null);
  useEffect(() => {
    const place = () => {
      const tab = tabRefs.current[active];
      const track = trackRef.current;
      if (!tab || !track) return;
      setPill({ left: tab.offsetLeft, width: tab.offsetWidth });
      if (track.scrollWidth > track.clientWidth) track.scrollTo({ left: tab.offsetLeft - (track.clientWidth - tab.offsetWidth) / 2, behavior: "smooth" });
    };
    place();
    document.fonts?.ready.then(place);
    window.addEventListener("resize", place);
    return () => window.removeEventListener("resize", place);
  }, [active, items.length]);
  return <div className="pill-tabs" ref={trackRef} role="tablist" aria-label={label}>
    {pill && <span className="pill-tabs-pill" style={{ transform: `translateX(${pill.left}px)`, width: pill.width }} aria-hidden="true" />}
    {items.map(item => <button key={item.key} ref={(element) => { tabRefs.current[item.key] = element; }} role="tab" aria-selected={item.key === active} className={item.key === active ? "active" : ""} onClick={() => onChange(item.key)}>
      {item.label}{item.count !== undefined && <small>{item.count}</small>}
    </button>)}
  </div>;
}

function SortMenu({ value, onChange }: { value: SortKey; onChange: (value: SortKey) => void }) {
  const [open, setOpen] = useState(false);
  return <div className="sort-dropdown">
    {open && <button className="panel-backdrop transparent" onClick={() => setOpen(false)} aria-label="Close sort menu" />}
    <button className="sort-button" onClick={() => setOpen(!open)} aria-haspopup="true" aria-expanded={open}>{sortLabels[value]} <ChevronDown size={13} className={open ? "flip" : ""} /></button>
    {open && <div className="sort-menu">{(Object.keys(sortLabels) as SortKey[]).map(key => <button key={key} className={value === key ? "active" : ""} onClick={() => { onChange(key); setOpen(false); }}>{sortLabels[key]}</button>)}</div>}
  </div>;
}

type PriceFilter = "all" | "under-500" | "500-1000" | "1000-2000" | "2000-plus";

const priceFilterLabels: Record<PriceFilter, string> = {
  all: "All prices",
  "under-500": "Under ৳500",
  "500-1000": "৳500–৳1,000",
  "1000-2000": "৳1,000–৳2,000",
  "2000-plus": "৳2,000+",
};

const matchesPriceRange = (price: number, range: PriceFilter) => {
  switch (range) {
    case "under-500": return price < 500;
    case "500-1000": return price >= 500 && price <= 1000;
    case "1000-2000": return price > 1000 && price <= 2000;
    case "2000-plus": return price > 2000;
    default: return true;
  }
};

// Full catalogue for the dedicated All Products page.
export function ProductCatalog({ addToCart, goToCheckout, isWishlisted, toggleWishlist }: StoreActions) {
  const [category, setCategory] = useState("All");
  const [sortKey, setSortKey] = useState<SortKey>("featured");
  const [query, setQuery] = useState("");
  const [priceFilter, setPriceFilter] = useState<PriceFilter>("all");
  const [brand, setBrand] = useState("all");
  const [productType, setProductType] = useState("all");
  const [page, setPage] = useState(1);
  const resultsRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    setPage(1);
  }, [category, priceFilter, query, sortKey, brand, productType]);

  useEffect(() => {
    const wanted = new URLSearchParams(window.location.search).get("category");
    if (wanted && productCategories.includes(wanted)) setCategory(wanted);
  }, []);

  const pick = (value: string) => {
    setCategory(value);
    const url = new URL(window.location.href);
    if (value === "All") url.searchParams.delete("category"); else url.searchParams.set("category", value);
    window.history.replaceState(null, "", url);
  };

  const tabs = [{ key: "All", label: "All", count: storeProducts.length }, ...productCategories.map(name => ({ key: name, label: name, count: storeProducts.filter(item => item.category === name).length }))];

  const activeFilters = useMemo(() => {
    const items: string[] = [];
    if (category !== "All") items.push(category);
    if (priceFilter !== "all") items.push(priceFilterLabels[priceFilter]);
    if (brand !== "all") items.push(brand);
    if (productType !== "all") items.push(productType === "combo" ? "Combo packs" : "Single products");
    if (query.trim()) items.push(`“${query.trim()}”`);
    return items;
  }, [category, priceFilter, query, brand, productType]);

  const shown = useMemo(() => {
    const base = category === "All" ? storeProducts : storeProducts.filter(item => item.category === category);
    const withQuery = query.trim() ? base.filter((item) => {
      const target = `${item.name} ${item.bn ?? ""} ${item.category} ${getProductBrand(item)}`.toLowerCase();
      return target.includes(query.trim().toLowerCase());
    }) : base;
    const withPrice = withQuery.filter((item) => matchesPriceRange(item.price, priceFilter));
    const withType = withPrice.filter(item => (brand === "all" || getProductBrand(item) === brand) && (productType === "all" || (productType === "combo" ? item.category === "Combo Packs" : item.category !== "Combo Packs")));
    return sortProducts(withType, sortKey);
  }, [category, priceFilter, query, sortKey, brand, productType]);

  const pageSize = 12;
  const pageCount = Math.max(1, Math.ceil(shown.length / pageSize));
  const currentPage = Math.min(page, pageCount);
  const pageStart = (currentPage - 1) * pageSize;
  const pageProducts = shown.slice(pageStart, pageStart + pageSize);
  const changePage = (nextPage: number) => {
    setPage(Math.max(1, Math.min(nextPage, pageCount)));
    resultsRef.current?.focus({ preventScroll: true });
    resultsRef.current?.scrollIntoView({ block: "start", behavior: "auto" });
  };

  const resetFilters = () => {
    setCategory("All");
    setPriceFilter("all");
    setBrand("all");
    setProductType("all");
    setQuery("");
    setSortKey("featured");
    const url = new URL(window.location.href);
    url.searchParams.delete("category");
    window.history.replaceState(null, "", url);
  };

  return <section className="catalog page-width" id="catalog">
    <header className="catalog-heading"><h1>All Products</h1></header>

    <div className="catalog-toolbar" role="group" aria-label="Product filters">
      <div className="catalog-field">
        <label htmlFor="price-filter">Price Range</label>
        <select id="price-filter" value={priceFilter} onChange={(event) => setPriceFilter(event.target.value as PriceFilter)}>
          {(Object.keys(priceFilterLabels) as PriceFilter[]).map(value => <option key={value} value={value}>{priceFilterLabels[value]}</option>)}
        </select>
      </div>
      <div className="catalog-field">
        <label htmlFor="category-filter">Category</label>
        <select id="category-filter" value={category} onChange={(event) => pick(event.target.value)}>
          {tabs.map(tab => <option key={tab.key} value={tab.key}>{tab.key === "All" ? "All categories" : tab.label} ({tab.count})</option>)}
        </select>
      </div>
      <div className="catalog-field">
        <label htmlFor="brand-filter">Brand</label>
        <select id="brand-filter" value={brand} onChange={(event) => setBrand(event.target.value)}>
          <option value="all">All brands</option>{productBrands.map(name => <option key={name} value={name}>{name}</option>)}
        </select>
      </div>
      <div className="catalog-field">
        <label htmlFor="type-filter">Product Type</label>
        <select id="type-filter" value={productType} onChange={(event) => setProductType(event.target.value)}>
          <option value="all">All types</option><option value="single">Single products</option><option value="combo">Combo packs</option>
        </select>
      </div>
      <div className="catalog-field catalog-search-field">
        <label htmlFor="catalog-search">Search</label>
        <div className="catalog-search"><Search size={17} aria-hidden="true" /><input id="catalog-search" type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search products…" /></div>
      </div>
    </div>

    <div className="catalog-results">
      {activeFilters.length > 0 && <div className="active-filter-bar" aria-live="polite">
        {activeFilters.map((filter) => <span key={filter} className="active-filter-pill">{filter}</span>)}
        <button type="button" className="filter-reset" onClick={resetFilters}>Clear all</button>
      </div>}


    <div className="catalog-summary-row">
      <p ref={resultsRef} tabIndex={-1} className="catalog-count" role="status">Showing {shown.length > 0 ? `${pageStart + 1}–${pageStart + pageProducts.length} of ${shown.length}` : "0"} {shown.length === 1 ? "product" : "products"}{category !== "All" && <> in <b>{category}</b></>}</p>
      <div className="catalog-field catalog-sort-field">
        <label htmlFor="catalog-sort">Sort By</label>
        <select id="catalog-sort" value={sortKey} onChange={(event) => setSortKey(event.target.value as SortKey)}>
          {(Object.keys(sortLabels) as SortKey[]).map(key => <option key={key} value={key}>{sortLabels[key]}</option>)}
        </select>
      </div>
    </div>

      {shown.length === 0 ? (
        <div className="shop-empty" role="status">
          <strong>No products match your filters.</strong>
          <p>Try clearing a filter or browsing another category.</p>
          <button type="button" className="cta cta-sm" onClick={resetFilters}><span>Clear filters</span></button>
        </div>
      ) : (
        <div className="product-grid">{pageProducts.map(product => <ProductCard key={product.name} product={product} onAdd={(item, qty) => addToCart(item ?? product, qty)} onOrderNow={(item, qty) => goToCheckout(item ?? product, qty)} wishlisted={isWishlisted(product.name)} onToggleWishlist={() => toggleWishlist(product)} />)}</div>
      )}
      {pageCount > 1 && <nav className="catalog-pagination" aria-label="Product pagination">
        <button type="button" disabled={currentPage === 1} onClick={() => changePage(currentPage - 1)}>← Previous</button>
        <div className="catalog-page-numbers">
          {Array.from({ length: pageCount }, (_, index) => index + 1).map(number => <button key={number} type="button" aria-label={`Page ${number}`} aria-current={currentPage === number ? "page" : undefined} onClick={() => changePage(number)}>{number}</button>)}
        </div>
        <button type="button" disabled={currentPage === pageCount} onClick={() => changePage(currentPage + 1)}>Next →</button>
      </nav>}
    </div>
  </section>;
}
