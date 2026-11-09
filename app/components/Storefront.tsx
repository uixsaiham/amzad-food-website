"use client";

import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { CartItem, CartLine, loadCart, saveCart, clampQuantity } from "../lib/cart";
import CartOffer from "./CartOffer";
import { useDismissMenu } from "../lib/useDismissMenu";
import { CATALOG_CATEGORY_EVENT, COMBO_CATEGORY, isCatalogPath, setCatalogCategory } from "../lib/navigation-events";
import { getDeliveryFee } from "../lib/offers";
import Link from "next/link";
import BrandStrip from "./BrandStrip";
import OfferPopup from "./OfferPopup";
import { Product, withDemoVariants, products, comboProducts, exploreProducts, productSlug, catalog, storeProducts, productCategories, productBrands, getProductBrand, resolveProductCategory, productsForCategory } from "../lib/products";
import QuickView from "./QuickView";
import AuthModal from "./AuthModal";
import MegaMenu, { MenuContact, MenuIcon, MenuLink, menuCategories, menuHelp, menuPages } from "./MegaMenu";
import CategoryRail from "./CategoryRail";
import PrayerTimes, { PrayerDock } from "./PrayerTimes";
import Reviews from "./Reviews";
import ImpactStats from "./ImpactStats";
import BlogSection from "./BlogSection";
import FooterFeedback from "./FooterFeedback";
import { ArrowDownLeft, ArrowRight, ArrowUp, CakeSlice, Candy, Check, Cherry, Droplet, FileText, ChevronDown, ChevronLeft, ChevronRight, Copy, Droplets, Eye, Facebook, Flame, Gift, Home, LayoutGrid, Instagram, Leaf, Lock, Mail, MapPin, Menu, PackageSearch, Phone, Search, Send, ShoppingCart, Star, Trash2, TreePalm, UserRound, Wheat, X, Youtube } from "lucide-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowsRotate, faBoxOpen, faMagnifyingGlass, faTruckFast } from "@fortawesome/free-solid-svg-icons";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";

const categories = ["All", "Offer Zone", ...productCategories];
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

export function ProductCard({ product, onAdd, onOrderNow }: { product: Product; onAdd: (item?: CartLine, qty?: number) => void; onOrderNow: (item?: CartLine, qty?: number) => void }) {
  const [quickView, setQuickView] = useState(false);
  const [variantIndex, setVariantIndex] = useState(0);
  const variants = withDemoVariants(product).variants!;
  const selected = variants[variantIndex] ?? variants[0];
  const selectedProduct = { ...product, price: selected.price, oldPrice: selected.oldPrice, image: selected.image, unit: selected.label, images: selected.image === product.image ? product.images : undefined };
  const line: CartLine = { name: `${product.name} (${selected.label})`, price: selected.price, image: selected.image };
  const [inCart, setInCart] = useState(false);
  useEffect(() => {
    const sync = () => setInCart(loadCart().some(item => item.name === line.name && item.qty > 0));
    sync();
    window.addEventListener("amzad-cart-updated", sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener("amzad-cart-updated", sync);
      window.removeEventListener("storage", sync);
    };
  }, [line.name]);
  const closeQuickView = useCallback(() => setQuickView(false), []);
  const name = product.bn ? `${product.name} / ${product.bn}` : product.name;
  return <article className="pc">
    <button className="pc-view" onClick={() => setQuickView(true)} aria-label={`Quick view ${name}`}><Eye size={18} /></button>
    <div className="pc-media">
      <div className="pc-badges">{product.tag === "Best Seller" && <span className="pc-tag pc-best"><Flame size={12} /> Best Selling</span>}{selected.oldPrice && <span className="pc-save">Save {Math.round((1 - selected.price / selected.oldPrice) * 100)}%</span>}{product.tag && product.tag !== "Best Seller" && <span className="pc-tag">{product.tag}</span>}</div>
      <Link className="pc-product-link pc-packs" href={`/products/${productSlug(product.name)}/`} aria-label={`View ${name}, ${selected.label}`}>
        <img src={selected.image} alt={`${name} — ${selected.label}`} loading="lazy" />
      </Link>
    </div>
    <div className="pc-body">
      <h3 className="pc-name" title={name}><Link href={`/products/${productSlug(product.name)}/`}>{product.name}{product.bn && <> / <span lang="bn">{product.bn}</span></>}</Link></h3>
      <div className="pc-price"><strong>৳{selected.price.toLocaleString("en-IN")}</strong>{selected.oldPrice && <del>৳{selected.oldPrice.toLocaleString("en-IN")}</del>}</div>
      <div className="pc-variants" role="group" aria-label={`Pack size for ${name}`}>
        {variants.map((variant, index) => <button key={variant.id} type="button" className={index === variantIndex ? "active" : ""} aria-pressed={index === variantIndex} onClick={() => setVariantIndex(index)}>{variant.label}</button>)}
      </div>
      <div className="pc-actions"><button className="pc-order" onClick={() => onOrderNow(line, 1)}>Order Now</button><button className={inCart ? "pc-action in-cart" : "pc-action"} onClick={() => onAdd(line, 1)} aria-label={inCart ? `Add another ${name} to cart` : `Add ${name} to cart`} title={inCart ? "In cart — add another" : "Add to cart"}><ShoppingCart size={18} /></button></div>
    </div>
    {quickView && <QuickView key={selected.id} product={selectedProduct} onAdd={(_, qty) => onAdd(line, qty)} onOrderNow={(_, qty) => onOrderNow(line, qty)} onClose={closeQuickView} />}
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
      <h1><span>{slide.title[0]}</span><em>{slide.title[1]}</em></h1>
      <p className="hero-description">{slide.desc}</p>


    </div>
    <div className="hero-art" key={`art-${active}`}>
      <div className="hero-image">
        <img src={slide.image} alt={slide.title.join(" ")} />
        <svg className="hero-spots" viewBox={`0 0 ${slide.size[0]} ${slide.size[1]}`} preserveAspectRatio="xMidYMax meet">
          {slide.spots.map(([name, x, y, w, h]) => <a key={name} href={`/amzad-food-website/products/${productSlug(name)}/`} aria-label={`View ${name}`}><title>{name}</title><rect x={x} y={y} width={w} height={h} rx={28} /></a>)}
        </svg>
      </div>
      <span className="hero-stage-ring" aria-hidden="true" />
    </div>
      <div className="hero-actions">
        <a href="/amzad-food-website/#shop" className="cta cta-lg"><span>{slide.cta}</span><i className="cta-icon cta-arrow"><ArrowRight size={15} /></i></a>
        <span className="hero-note"><span className="avatar-stack"><i>F</i><i>A</i><i>M</i></span><span className="hero-note-text"><b><Star size={11} fill="currentColor" /> 4.9 rating</b><small>Loved by 10,000+ families</small></span></span>
      </div>
    <div className="hero-slider-bar">
      <div className="hero-slide-tabs">{heroSlides.map((item, index) => <button key={item.image} className={index === active ? "active" : ""} onClick={() => setActive(index)} aria-label={`Show ${item.cta}`} aria-pressed={index === active}><span>0{index + 1}</span><b>{item.cta}</b><i /></button>)}</div>    </div>
    </div>
  </section>;
}

const navItems: { href: string; label: string; category?: string }[] = [{ href: "?offers=1#shop", label: "Offers", category: "Offer Zone" }, { href: "products/", label: "All Products", category: "All" }, { href: `products/?category=${encodeURIComponent(COMBO_CATEGORY)}`, label: "Combo", category: COMBO_CATEGORY }, { href: "blogs/", label: "Blogs" }];

// Which tab matches the current page; -1 on pages outside the main navigation (orders, checkout).
function currentNavIndex(pathname: string) {
  if (/(?:^|\/)blogs(?:\/|$)/.test(pathname)) return 3;
  if (isCatalogPath(pathname)) { const category = new URLSearchParams(window.location.search).get("category"); return category === "Offer Zone" ? 0 : category === COMBO_CATEGORY ? 2 : 1; }
  if (/(?:^|\/)products\//.test(pathname)) return 1;
  return pathname === "/" && new URLSearchParams(window.location.search).get("offers") === "1" ? 0 : -1;
}

function NavLinks({ onNavigate }: { onNavigate: () => void }) {
  const router = useRouter();
  const pathname = usePathname();
  const [active, setActive] = useState(-1);
  useEffect(() => {
    const syncActive = () => setActive(currentNavIndex(pathname));
    syncActive();
    window.addEventListener(CATALOG_CATEGORY_EVENT, syncActive);
    window.addEventListener("popstate", syncActive);
    return () => { window.removeEventListener(CATALOG_CATEGORY_EVENT, syncActive); window.removeEventListener("popstate", syncActive); };
  }, [pathname]);
  const [pill, setPill] = useState<{ left: number; width: number } | null>(null);
  const linkRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  useLayoutEffect(() => {
    const link = linkRefs.current[active];
    const track = link?.parentElement;
    if (!link || !track) { setPill(null); return; }
    const place = () => {
      const label = link.querySelector<HTMLElement>(".nav-label");
      const labelRect = (label ?? link).getBoundingClientRect();
      const trackRect = track.getBoundingClientRect();
      const next = { left: labelRect.left - trackRect.left + track.scrollLeft, width: labelRect.width };
      setPill(previous => previous?.left === next.left && previous.width === next.width ? previous : next);
    };
    place();
    const observer = new ResizeObserver(place);
    observer.observe(track);
    linkRefs.current.forEach(item => { if (item) observer.observe(item); });
    document.fonts.addEventListener("loadingdone", place);
    return () => { observer.disconnect(); document.fonts.removeEventListener("loadingdone", place); };
  }, [active]);
  return <div className="nav-track">
    {pill && <span className="nav-pill" style={{ transform: `translateX(${pill.left}px)`, width: pill.width }} aria-hidden="true" />}
    {navItems.map((item, index) => <Link key={item.label} href={`/${item.href}`} ref={(element) => { linkRefs.current[index] = element; }} className={index === active ? "active" : ""} aria-current={index === active ? "page" : undefined} onClick={(event) => {
      if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      setActive(index);
      onNavigate();
      if (item.label === "Offers") {
        event.preventDefault();
        setActive(0);
        router.push("/?offers=1#shop");
        window.dispatchEvent(new Event("amzad-show-offers"));
        return;
      }
      if (item.category && isCatalogPath(pathname)) {
        event.preventDefault();
        setCatalogCategory(item.category, "push");
        document.getElementById("catalog")?.scrollIntoView({ block: "start" });
        return;
      }
      if (item.href.startsWith("#") && pathname === "/") {
        const target = document.getElementById(item.href.slice(1));
        if (target) {
          event.preventDefault();
          if (window.location.hash !== item.href) window.history.pushState(null, "", item.href);
          target.scrollIntoView({ behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth", block: "start" });
        }
      }
    }}><span className="nav-label">{item.label}{item.label === "Offers" && <b className="nav-offer-count" aria-label="2 offers">2</b>}</span></Link>)}
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

// Bangladeshi mobile number, with or without the +88 country code.
const isWhatsAppNumber = (value: string) => /^(?:\+?88)?01[3-9]\d{8}$/.test(value.replace(/[\s-]/g, ""));

function NewsletterForm({ placeholder, buttonLabel, buttonClassName, onSubscribe, className, channel = "email" }: { placeholder: string; buttonLabel: React.ReactNode; buttonClassName?: string; onSubscribe: (contact: string) => void; className: string; channel?: "email" | "whatsapp" }) {
  const [contact, setContact] = useState("");
  const [error, setError] = useState(false);
  const whatsapp = channel === "whatsapp";
  const submit = (event: React.FormEvent) => {
    event.preventDefault();
    if (whatsapp ? !isWhatsAppNumber(contact) : !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contact)) { setError(true); return; }
    setError(false);
    onSubscribe(contact);
    setContact("");
  };
  return <form className={error ? `${className} has-error` : className} onSubmit={submit} noValidate>
    {whatsapp && <FontAwesomeIcon className="nl-form-whatsapp" icon={faWhatsapp} fontSize={18} aria-hidden="true" />}
    <input type={whatsapp ? "tel" : "email"} inputMode={whatsapp ? "tel" : "email"} autoComplete={whatsapp ? "tel" : "email"} aria-label={whatsapp ? "WhatsApp number" : "Email address"} placeholder={placeholder} value={contact} onChange={(event) => { setContact(event.target.value); setError(false); }} />
    <button type="submit" className={buttonClassName}>{buttonLabel}</button>
    {error && <small className="form-error">{whatsapp ? "Enter a valid WhatsApp number, e.g. 01712345678" : "Enter a valid email address"}</small>}
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
      <h2><span className="nl-intro">Join the family, </span><em>Get 10% off</em> your first order</h2>
      <p>Preview the welcome offer. WhatsApp subscriptions are not available yet.</p>
      <NewsletterForm className="nl-form" channel="whatsapp" placeholder="WhatsApp number" buttonClassName="cta cta-sm" buttonLabel={<><span>Preview offer</span><i className="cta-icon"><Send size={13} /></i></>} onSubscribe={() => { setUnlocked(true); notify("Preview code unlocked. Newsletter subscriptions are not available yet."); }} />
      <ul className="nl-perks"><li><Check size={14} /> Weekly deals</li><li><Check size={14} /> New arrivals first</li><li><Check size={14} /> No spam, ever</li></ul>
    </div>
    <div className="nl-visual">
      <div className="nl-ticket-wrap"><div className={unlocked ? "nl-ticket unlocked" : "nl-ticket"}>
        <div className="nl-ticket-top"><small>Welcome offer</small><strong>10<span>%</span></strong><b>OFF</b></div>
        <div className="nl-ticket-bottom">
          <small>{unlocked ? "Tap to copy your code" : "Preview to unlock your code"}</small>
          <button className="nl-code" onClick={copyCode} disabled={!unlocked} aria-label={unlocked ? `Copy code ${NEWSLETTER_CODE}` : "Code locked until you preview the offer"}><span>{NEWSLETTER_CODE}</span>{!unlocked ? <Lock size={15} /> : copied ? <Check size={15} /> : <Copy size={15} />}</button>
        </div>
      </div></div>
    </div>
  </div></section>;
}

type StoreActions = {
  addToCart: (product: CartLine, qty?: number) => void;
  goToCheckout: (product?: CartLine, qty?: number) => void;
};

export default function Storefront({ children, headerOnly = false }: { headerOnly?: boolean; children?: (actions: StoreActions) => React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const isHomePage = pathname === "/";
  const navRef = useRef<HTMLElement>(null);
  const footerEndRef = useRef<HTMLDivElement>(null);
  const [atFooterEnd, setAtFooterEnd] = useState(false);
  useEffect(() => {
    const node = footerEndRef.current;
    if (!node) return;
    const observer = new IntersectionObserver(([entry]) => setAtFooterEnd(entry.isIntersecting));
    observer.observe(node);
    return () => observer.disconnect();
  }, [headerOnly]);
  const [menuProduct, setMenuProduct] = useState<Product | null>(null);
  const [activeCategory, setActiveCategory] = useState("All");
  const [menuOpen, setMenuOpen] = useState(false);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  useDismissMenu(menuOpen, mobileMenuRef, ".mobile-menu", () => setMenuOpen(false));
  useEffect(() => {
    if (!menuOpen) return;
    const nav = navRef.current;
    if (!nav) return;
    const positionMenu = () => nav.style.setProperty("--mobile-menu-top", `${nav.getBoundingClientRect().bottom}px`);
    positionMenu();
    const observer = new ResizeObserver(positionMenu);
    observer.observe(nav);
    window.addEventListener("scroll", positionMenu, { passive: true });
    window.addEventListener("resize", positionMenu);
    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", positionMenu);
      window.removeEventListener("resize", positionMenu);
    };
  }, [menuOpen]);
  const [megaMenuOpen, setMegaMenuOpen] = useState(false);
  const [mobileTab, setMobileTab] = useState<"menu" | "category">("menu");
  const [query, setQuery] = useState("");
  const searchRef = useRef<HTMLInputElement>(null);
  const searchToggleRef = useRef<HTMLButtonElement>(null);
  const [searchOpen, setSearchOpen] = useState(false);
  useEffect(() => { if (searchOpen) searchRef.current?.focus(); }, [searchOpen]);
  const closeSearch = () => { setSearchOpen(false); searchToggleRef.current?.focus(); };
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement;
      if (event.key === "/" && !["INPUT", "TEXTAREA"].includes(target.tagName)) { event.preventDefault(); setSearchOpen(true); searchRef.current?.focus(); }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartReady, setCartReady] = useState(false);
  useEffect(() => { setCart(loadCart()); setCartReady(true); }, []);
  useEffect(() => { if (cartReady) saveCart(cart); }, [cart, cartReady]);
  useEffect(() => {
    if (!headerOnly) return;
    const sync = () => setCart(current => { const next = loadCart(); return JSON.stringify(current) === JSON.stringify(next) ? current : next; });
    window.addEventListener("amzad-cart-updated", sync);
    return () => window.removeEventListener("amzad-cart-updated", sync);
  }, [headerOnly]);
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setQuery(params.get("q") ?? "");
    const category = resolveProductCategory(params.get("offers") === "1" ? "Offer Zone" : params.get("category") ?? "All");
    if (categories.includes(category)) setActiveCategory(category);
  }, []);
  useEffect(() => {
    const showOffers = () => {
      setActiveCategory("Offer Zone");
      document.getElementById("shop")?.scrollIntoView({ behavior: "smooth" });
    };
    window.addEventListener("amzad-show-offers", showOffers);
    return () => window.removeEventListener("amzad-show-offers", showOffers);
  }, []);
  const [cartOpen, setCartOpen] = useState(false);
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
    const source = productsForCategory(activeCategory);
    return source.filter(item => `${item.name} ${getProductBrand(item)}`.toLowerCase().includes(query.toLowerCase()));
  }, [activeCategory, query]);
  const addToCart = (product: CartLine, qty = 1) => {
    setCart((items) => {
      const found = items.find((item) => item.name === product.name);
      if (found) return items.map((item) => item.name === product.name ? { ...item, qty: clampQuantity(item.qty + qty) } : item);
      return [...items, { name: product.name, price: product.price, image: product.image, qty: clampQuantity(qty) }];
    });
    notify(qty > 1 ? `Added ${qty} × ${product.name} to cart` : `Added ${product.name} to cart`);
  };
  const removeFromCart = (name: string) => setCart((items) => items.filter((item) => item.name !== name));
  const changeQty = (name: string, delta: number) => setCart((items) => items.map((item) => item.name === name ? { ...item, qty: item.qty + delta <= 0 ? 0 : clampQuantity(item.qty + delta) } : item).filter((item) => item.qty > 0));
  const cartCount = cart.reduce((sum, item) => sum + item.qty, 0);
  const cartTotal = cart.reduce((sum, item) => sum + item.qty * item.price, 0);
  const goToCheckout = (product?: CartLine, qty = 1) => {
    let next = cart;
    if (product) {
      const found = cart.find((item) => item.name === product.name);
      next = found ? cart.map((item) => item.name === product.name ? { ...item, qty: clampQuantity(item.qty + qty) } : item) : [...cart, { name: product.name, price: product.price, image: product.image, qty: clampQuantity(qty) }];
      setCart(next);
    }
    saveCart(next);
    setCartOpen(false);
    router.push("/checkout/");
  };

  const handleAccountClick = () => { if (user) { setUser(null); notify("Signed out"); } else { setAuthOpen(true); } };
  const closeMenus = () => { setMenuOpen(false); setMegaMenuOpen(false); };
  const browseMenuCategory = (category: { label: string; tab?: string }) => {
    const tab = resolveProductCategory(category.tab ?? category.label);
    closeMenus(); setQuery(""); setActiveCategory(tab);
    if (children || headerOnly) router.push(`/?category=${encodeURIComponent(tab)}#shop`);
    else requestAnimationFrame(() => scrollToShop());
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
  const scrollToShop = () => { setMenuOpen(false); if (children || headerOnly) { router.push(`/?q=${encodeURIComponent(query)}#shop`); } else { document.getElementById("shop")?.scrollIntoView({ behavior: "smooth" }); } };
  const add = () => addToCart({ name: "Sundarbans Raw Honey", price: 350, image: "/amzad-food-website/honey-bg.png" });
  return <main id="top" className={headerOnly ? "storefront storefront-header-only" : children ? "storefront" : "storefront storefront-home"}>
    {!headerOnly && <OfferPopup />}
    <div className="announcement"><div className="announcement-inner page-width"><span className="announcement-contacts-group"><span className="announcement-cta">প্রয়োজনে কল করুন</span><span className="announcement-contacts"><a className="announcement-contact" href="https://wa.me/8801327406605" target="_blank" rel="noreferrer"><FontAwesomeIcon icon={faWhatsapp} fontSize={14} /> 01327406605</a><span className="announcement-divider" /><a className="announcement-contact" href="tel:+8809613824071"><Phone size={13} /> 09613824071</a></span></span><span className="announcement-links"><a className="announcement-link" href="/amzad-food-website/my-orders/">My Orders</a><a className="announcement-link" href="/amzad-food-website/track-order/"><PackageSearch size={13} /> Track Order</a></span></div></div>
    <nav ref={navRef} className={`navbar page-width site-nav${searchOpen ? " search-open" : ""}`}><button className={menuOpen ? "mobile-menu icon-button open" : "mobile-menu icon-button"} onClick={() => setMenuOpen(!menuOpen)} aria-label={menuOpen ? "Close menu" : "Open menu"} aria-expanded={menuOpen}><span className="burger" aria-hidden="true"><i /><i /><i /></span></button><a className="brand amzad-brand" href="/amzad-food-website/"><img className="brand-logo" src="/amzad-food-website/logo.png" alt="Amzad Food — নিরাপদ খাবার, আপনার অধিকার" width={1400} height={388} /></a><div ref={mobileMenuRef} className={`nav-links${menuOpen ? " open" : ""}${mobileTab === "category" ? " show-categories" : ""}`}><div className="mobile-menu-tabs" role="tablist" aria-label="Menu sections"><button role="tab" aria-selected={mobileTab === "menu"} className={mobileTab === "menu" ? "active" : ""} onClick={() => setMobileTab("menu")}>Menu</button><button role="tab" aria-selected={mobileTab === "category"} className={mobileTab === "category" ? "active" : ""} onClick={() => setMobileTab("category")}>Category</button></div><NavLinks onNavigate={() => setMenuOpen(false)} /><div className="mobile-menu-more">{[...menuPages.filter(link => !["Home", "Products", "Blogs"].includes(link.label)), ...menuHelp].map(link => <a key={link.label} className={link === menuHelp[0] ? "menu-help-start" : undefined} href={link.href ? `/amzad-food-website/${link.href}` : "#"} onClick={(event) => runMenuLink(event, link)}>{link.label}</a>)}</div><MenuContact /><div className="mobile-cat-list">{menuCategories.map(category => <a key={category.label} href="/amzad-food-website/#shop" onClick={(event) => { event.preventDefault(); browseMenuCategory(category); }}><span><MenuIcon icon={category.icon} /></span><b>{category.label}<small>{category.bn}</small></b><ArrowRight size={15} /></a>)}</div><form className="mobile-nav-search" onSubmit={(event) => { event.preventDefault(); scrollToShop(); }}><Search size={16} /><input type="search" aria-label="Search products on mobile" placeholder="Search products..." value={query} onChange={(event) => setQuery(event.target.value)} /><button type="submit" aria-label="Submit product search"><ArrowRight size={18} /></button></form><div className="nav-links-mobile-actions"><button className="nav-account" onClick={() => { setMenuOpen(false); handleAccountClick(); }}><UserRound size={16} /><small>{user ? user.name : "Sign in"}</small></button></div></div>{menuOpen && <button className="nav-backdrop" onClick={() => setMenuOpen(false)} aria-label="Close menu" />}<div className="nav-actions"><button ref={searchToggleRef} type="button" className="nav-icon nav-search-toggle" aria-label={searchOpen ? "Close product search" : "Open product search"} aria-expanded={searchOpen} aria-controls="top-nav-search" onClick={() => searchOpen ? closeSearch() : setSearchOpen(true)}><Search size={19} /></button><form id="top-nav-search" role="search" className="nav-search" hidden={!searchOpen} onSubmit={(event) => { event.preventDefault(); scrollToShop(); }} onKeyDown={(event) => { if (event.key === "Escape") closeSearch(); }}><button className="nav-search-submit" type="submit" aria-label="Search products"><Search size={18} /></button><input ref={searchRef} type="search" placeholder="Search products..." value={query} onChange={(event) => setQuery(event.target.value)} aria-label="Search products" /><button type="button" className="nav-search-clear" onClick={closeSearch} aria-label="Close search"><X size={16} /></button>{query && <button type="button" className="desktop-search-clear" onClick={() => { setQuery(""); searchRef.current?.focus(); }} aria-label="Clear search"><X size={13} /></button>}</form><div className="nav-icons"><button className="nav-icon nav-user" onClick={handleAccountClick} aria-label={user ? `Signed in as ${user.name}, sign out` : "Sign in"} data-tip={user ? "Sign out" : "Sign in"}>{user ? <span className="nav-avatar">{user.name.slice(0, 1).toUpperCase()}</span> : <UserRound size={18} />}</button></div><button className="nav-cart" onClick={() => setCartOpen(true)} aria-label={`Cart, ${cartCount} items`}><span className="nav-cart-icon"><ShoppingCart size={22} /><b key={cartCount}>{cartCount}</b></span><span className="nav-cart-text"><strong>৳{cartTotal.toLocaleString("en-IN")}</strong></span></button><button className={megaMenuOpen ? "mega-menu-trigger open" : "mega-menu-trigger"} onClick={() => setMegaMenuOpen(!megaMenuOpen)} aria-haspopup="true" aria-expanded={megaMenuOpen} aria-label="Browse menu"><span className="burger"><i /><i /><i /></span></button></div><MegaMenu open={megaMenuOpen} onClose={() => setMegaMenuOpen(false)} onCategory={browseMenuCategory} onLink={runMenuLink} /></nav>
    {menuProduct && <QuickView product={menuProduct} onAdd={addToCart} onOrderNow={goToCheckout} onClose={() => setMenuProduct(null)} />}
    {isHomePage && <CategoryRail selectedCategory={activeCategory} onView={setMenuProduct} onAdd={addToCart} onBrowse={(label) => browseMenuCategory({ label })} />}
    {headerOnly ? null : children ? <>
    {children({ addToCart, goToCheckout })}
    </> : <>
    <HeroSlider />
    <BrandStrip />
    <ProductSection id="best-selling" maxRows={3} mobileMaxRows={3} title="Top Selling Products" eyebrow="" products={[...storeProducts.filter(product => product.tag === "Best Seller"), ...storeProducts.filter(product => product.tag !== "Best Seller").slice(0, 3)]} onAdd={addToCart} onOrderNow={goToCheckout} />
    <section className="journey page-width" aria-label="From source to your table"><div className="journey-card">
      <div className="journey-intro"><span className="journey-pill"><Leaf size={12} /> Our Promise</span><h2>From Source<br /><em>to Your Table</em></h2><p>A journey of trust &amp; quality, in four careful steps.</p></div>
      <ol className="journey-steps">{journeySteps.map(step => <li key={step.title} style={{ "--step-hue": step.hue } as React.CSSProperties}><span className="journey-node"><FontAwesomeIcon icon={step.icon} fontSize={17} /></span><strong>{step.title}</strong><p>{step.subtitle}</p></li>)}</ol>
    </div></section>
    <section className="feature-band page-width" id="story"><article className="origin-card"><div className="origin-copy"><p className="eyebrow">Rooted in Bangladesh</p><h2>Discover<br /><span className="origin-title-line">Our Origin <span>🍃</span></span></h2><p>Discover authentic Bangladeshi foods, trusted essentials and naturally sourced products — all in one place.</p><button className="cta" onClick={() => setOriginOpen(true)}><span>Explore Origin Stories</span><i className="cta-icon"><MapPin size={15} /></i></button></div><div className="origin-map"><div className="bd-map" role="img" aria-label="Map of Bangladesh showing where our products are sourced"><span className="bd-shadow" aria-hidden="true" /><span className="bd-shape" aria-hidden="true" /><span className="bd-texture" aria-hidden="true" />{originStories.map((story) => <span className={`bd-spot ${story.className}`} key={`spot-${story.key}`} aria-hidden="true" />)}{originStories.map((story) => <span className={`origin-pin ${story.className}`} key={story.key}><i><story.icon size={13} /></i><b>{story.place}<small>{story.product}</small></b></span>)}</div></div></article><article className="honey-card"><img className="honey-bg" src="/amzad-food-website/honey-bg.png" alt="" aria-hidden="true" /><span className="honey-callout">Pure Goodness<small>from Bangladesh</small><ArrowDownLeft size={20} /></span><div className="honey-copy"><h2>Sundarbans<br />Raw Honey</h2><p className="honey-subtitle">Cold Pressed <span>•</span> 100% Natural</p><div className="honey-badges"><span>100% Natural</span><span>Rich in Naturals</span></div><div className="honey-price"><strong>৳350</strong><del>৳450</del><em>Save ৳100</em></div><button className="cta" onClick={add}><span>Add to Cart</span><i className="cta-icon"><ShoppingCart size={15} /></i></button></div></article></section>
    <ProductSection viewAllHref={activeCategory === "All" || activeCategory === "Offer Zone" ? "/products/" : `/products/?category=${encodeURIComponent(activeCategory)}`} title={activeCategory === "All" ? "All Products" : activeCategory === "Oil" ? "Ghee & Oil" : activeCategory} eyebrow="Best Sellers" products={visibleProducts} maxRows={8} mobileMaxRows={4} onAdd={addToCart} onOrderNow={goToCheckout} id="shop" tabs={{ categories, activeCategory, setActiveCategory }} />
    <NewsletterBanner notify={notify} />
    <ProductSection id="combo" promotion viewAllHref="/products/?category=Combo%20Packs" title="Combo Packages" eyebrow="Value Packs" products={comboProducts} onAdd={addToCart} onOrderNow={goToCheckout} />
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
    <ImpactStats />
    <Reviews />
    <BlogSection />
    </>}
    {!headerOnly && <footer className="ft">
      <div className="ft-main page-width">
        <div className="ft-brand">
          <a className="brand amzad-brand" href="/amzad-food-website/"><img className="brand-logo" src="/amzad-food-website/logo-light.png" alt="Amzad Food — নিরাপদ খাবার, আপনার অধিকার" width={1400} height={388} /></a>
          <p>Trusted food products for everyday Bangladesh, sourced with care from farms across the country.</p>
          <ul className="ft-contact">
            <li><MapPin size={15} /><span>Bosila, West Dhanmondi Housing Society, Block - B, Road - 9, House - 15, Dhaka, Bangladesh</span></li>
            <li><Mail size={15} /><a href="mailto:help@amzadfood.com">help@amzadfood.com</a></li>
            <li><Phone size={15} /><a href="tel:+8809613824071">09613-824071</a></li>
          </ul>
          <div className="ft-social">
            {[[Facebook, "Facebook"], [Instagram, "Instagram"], [Youtube, "YouTube"]].map(([Icon, label]) => { const SocialIcon = Icon as typeof Facebook; return <a key={label as string} href="#" aria-label={label as string} onClick={(event) => { event.preventDefault(); notify("Coming soon"); }}><SocialIcon size={15} /></a>; })}
          </div>
        </div>
        <nav className="ft-col" aria-label="Shop"><strong>Shop</strong><a href="/amzad-food-website/#shop">Honey</a><a href="/amzad-food-website/#shop">Ghee &amp; Oil</a><a href="/amzad-food-website/#shop">Khejur</a><a href="/amzad-food-website/#shop">Mosla</a><a href="/amzad-food-website/#combo">Combo &amp; Gifts</a></nav>
        <nav className="ft-col" aria-label="Company"><strong>Company</strong><a href="/amzad-food-website/#story">Our Story</a><a href="/amzad-food-website/blogs/">Blogs</a><a href="/amzad-food-website/#reviews">Reviews</a><a href="/amzad-food-website/#prayer-times">Prayer Times</a></nav>
        <nav className="ft-col" aria-label="Help"><strong>Help</strong><a href="/amzad-food-website/track-order/">Track Order</a><a href="/amzad-food-website/checkout/">Checkout</a><Link href="/faq/">FAQ</Link><a href="#" onClick={(event) => { event.preventDefault(); notify("Coming soon"); }}>Returns</a><a href="#" onClick={(event) => { event.preventDefault(); notify("Coming soon"); }}>Privacy Policy</a><a href="#" onClick={(event) => { event.preventDefault(); notify("Coming soon"); }}>Terms</a></nav>
        <FooterFeedback />
      </div>


      <div className="ft-bottom ft-bottom-reference page-width">
        <div className="ft-copyright">
          <span>Copyright © {new Date().getFullYear()} Amzad Food</span>
        </div>
        <div className="ft-payment-block">
          <span className="ft-pay-label">Pay With</span>
          <div className="ft-payment-methods">
            <div className="ft-payment-logos" role="group" aria-label="Online payment methods coming soon">
              {["Visa", "Mastercard", "American Express", "UnionPay", "Diners Club", "DBBL Nexus", "Q-Cash", "bKash", "Nagad", "Rocket", "tap", "Upay", "OK Wallet", "mCash", "Islamic Wallet", "MyCash", "Tap 'n Pay", "Citytouch"].map((method, index) => (
                <span key={method} className="ft-payment-card" role="img" aria-label={method} title={method}>
                  <span className="ft-payment-logo" aria-hidden="true" style={{ backgroundPosition: `${-(24 + index * 72.75)}px -23px` }} />
                </span>
              ))}
            </div>
            <small>Cash on Delivery available · Online payments coming soon</small>
          </div>
        </div>
        <a className={`ft-top${atFooterEnd ? " at-footer-end" : ""}`} href="#top" aria-label="Back to top"><ArrowUp size={19} /></a>
      </div>
      <div ref={footerEndRef} className="ft-end-marker" aria-hidden="true" />
    </footer>}

    <Drawer open={cartOpen} onClose={() => setCartOpen(false)} title={`Your Cart (${cartCount})`}>
      {cart.length === 0 ? <p className="empty-state">Your cart is empty.</p> : <>
        <section className="cart-order-summary" aria-label="Order summary">
          <div className="cart-summary-heading"><h3>Order Summary</h3><span>{cartCount} {cartCount === 1 ? "item" : "items"}</span></div>
          <ul className="cart-summary-items">{cart.map((item) => <li key={item.name}>
            <div className="cart-summary-image"><img src={item.image} alt={item.name} /><span>{item.qty}</span></div>
            <div className="cart-summary-info">
              <div className="cart-summary-name-price"><strong>{item.name}</strong><span>৳{item.price.toLocaleString("en-IN")} each</span></div>
              <div className="cart-summary-controls">
                <div className="cart-summary-stepper"><button onClick={() => changeQty(item.name, -1)} aria-label={`Decrease ${item.name} quantity`}>−</button><b aria-live="polite">{item.qty}</b><button onClick={() => changeQty(item.name, 1)} disabled={item.qty >= 20} aria-label={`Increase ${item.name} quantity`}>+</button></div>
                <strong className="cart-summary-line-total" aria-live="polite">৳{(item.price * item.qty).toLocaleString("en-IN")}</strong>
                <button className="cart-summary-remove" aria-label={`Remove ${item.name}`} onClick={() => removeFromCart(item.name)}><Trash2 size={15} /></button>
              </div>
            </div>
          </li>)}</ul>
        </section>
        <CartOffer subtotal={cartTotal} />
        <div className="drawer-total"><span>Subtotal</span><strong>৳{cartTotal.toLocaleString("en-IN")}</strong></div>
        <div className="drawer-delivery"><span>Delivery</span><strong>{getDeliveryFee(cartTotal) === 0 ? "Free" : `৳${getDeliveryFee(cartTotal).toLocaleString("en-IN")}`}</strong></div>
        <p className="drawer-offer-note">Have a promo code? Apply it at checkout.</p>
        <button className="cta cta-block drawer-checkout" onClick={() => goToCheckout()}><span>Checkout · ৳{(cartTotal + getDeliveryFee(cartTotal)).toLocaleString("en-IN")}</span><i className="cta-icon cta-arrow"><ArrowRight size={15} /></i></button>
      </>}
    </Drawer>


    <AuthModal open={authOpen} onClose={closeAuth} onSignIn={(name) => { setUser({ name }); setAuthOpen(false); notify(`Welcome, ${name}!`); }} />


    <Modal open={originOpen} onClose={() => setOriginOpen(false)} title="Our Origin Stories">
      <div className="origin-story-list">{originStories.map((story) => <div className="origin-story-item" key={story.key}><span><story.icon size={16} /></span><div><strong>{story.place} · {story.product}</strong><p>{story.desc}</p></div></div>)}</div>
    </Modal>

    {!headerOnly && <nav className="mobile-app-nav" aria-label="Mobile navigation">
      <Link href="/" aria-current={isHomePage ? "page" : undefined} onClick={() => { setMenuOpen(false); setSearchOpen(false); }}><Home size={23} /><span>Home</span></Link>
      <button type="button" aria-expanded={menuOpen} onClick={() => { setSearchOpen(false); setMenuOpen(!menuOpen); }}><LayoutGrid size={23} /><span>Menu</span></button>
      <button className="mobile-app-search" type="button" aria-label="Search products" aria-expanded={searchOpen} onClick={() => { setMenuOpen(false); setSearchOpen(!searchOpen); window.scrollTo({ top: 0, behavior: "auto" }); }}><span className="mobile-app-search-circle"><Search size={26} /></span><span>Search</span></button>
      <button type="button" onClick={() => { setMenuOpen(false); setCartOpen(true); }}><span className="mobile-app-cart"><ShoppingCart size={23} /><b>{cartCount}</b></span><span>Cart</span></button>
      <button type="button" onClick={() => { setMenuOpen(false); handleAccountClick(); }}><UserRound size={23} /><span>Account</span></button>
    </nav>}

    {toast && <div className="toast" role="status">{toast}</div>}
  </main>;
}

function ProductSection({ maxRows, mobileMaxRows, carousel = false, cardPromotion = false, promotion = false, viewAllHref = "/products/", title, eyebrow, products, onAdd, onOrderNow, id, tabs }: { maxRows?: number; mobileMaxRows?: number; carousel?: boolean; cardPromotion?: boolean; promotion?: boolean; viewAllHref?: string; title: string; eyebrow: string; products: Product[]; onAdd: (product: CartLine, qty?: number) => void; onOrderNow: (product: CartLine, qty?: number) => void; id?: string; tabs?: { categories: string[]; activeCategory: string; setActiveCategory: (value: string) => void } }) {
  const [sortKey, setSortKey] = useState<SortKey>("featured");
  const sortedProducts = useMemo(() => sortProducts(products, sortKey), [products, sortKey]);
  const gridRef = useRef<HTMLDivElement>(null);
  const [columns, setColumns] = useState(4);
  const [isMobile, setIsMobile] = useState(false);
  const [page, setPage] = useState(1);
  const [edges, setEdges] = useState({ start: true, end: false });
  const updateEdges = useCallback(() => {
    const el = gridRef.current;
    if (el) setEdges({ start: el.scrollLeft <= 2, end: el.scrollLeft + el.clientWidth >= el.scrollWidth - 2 });
  }, []);
  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;
    const measure = () => {
      setIsMobile(window.matchMedia("(max-width: 800px)").matches);
      if (maxRows) setColumns(getComputedStyle(grid).gridTemplateColumns.split(" ").filter(Boolean).length || 1);
      if (carousel) updateEdges();
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(grid);
    return () => observer.disconnect();
  }, [maxRows, carousel, updateEdges]);
  const rows = isMobile ? mobileMaxRows ?? maxRows : maxRows;
  const pageSize = rows ? rows * columns : Math.max(1, sortedProducts.length);
  const totalPages = Math.max(1, Math.ceil(sortedProducts.length / pageSize));
  const currentPage = Math.min(page, totalPages);
  const pageProducts = sortedProducts.slice((currentPage - 1) * pageSize, currentPage * pageSize);
  useEffect(() => { setPage(1); }, [products, sortKey, pageSize]);
  const changePage = (next: number) => {
    setPage(next);
    document.getElementById(id ?? "")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };
  const move = (direction: number) => {
    const el = gridRef.current;
    if (el) el.scrollBy({ left: direction * el.clientWidth, behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
  };

  return <section className="shop-section page-width" id={id}><div className="section-heading"><div><p className="eyebrow">{eyebrow}</p><h2>{title}</h2><p>Discover our handpicked collection of natural and delicious products.</p></div><ViewAllLink href={viewAllHref} /></div>{tabs ? <div className="shop-toolbar"><PillTabs label="Product categories" items={tabs.categories.map(category => ({ key: category, label: category }))} active={tabs.activeCategory} onChange={tabs.setActiveCategory} /><SortMenu value={sortKey} onChange={setSortKey} /></div> : null}{sortedProducts.length === 0 && <p className="shop-empty" role="status">No products available in this category yet. Explore another category.</p>}{promotion && <aside className="shop-promotion" aria-label="Featured honey collection">
      <div className="shop-promo-copy"><span className="shop-promo-kicker"><Leaf size={12} /> FROM NATURE, WITH CARE</span><h3>A little sweetness.<br /><em>A lot of goodness.</em></h3><p>খাঁটি স্বাদ, প্রতিদিনের ভরসা</p></div>
      <div className="shop-promo-art"><span aria-hidden="true" /><img src="/amzad-food-website/hero-slide-3.png" alt="Amzad Food honey and ghee collection" loading="lazy" /></div>
      <div className="shop-promo-bottom"><span className="shop-promo-label">THE PANTRY EDIT</span><p>Bring home our Sundarbans raw honey, sourced with care.</p><Link className="shop-promo-link" href="/products/sundarbans-raw-honey/"><span>Discover our honey</span><ArrowRight size={17} /></Link><small>Explore a favourite from Amzad Food</small></div>
    </aside>}
    <div className={carousel ? "best-sellers-carousel" : undefined}>
    {carousel && <button className="best-sellers-arrow best-sellers-prev" type="button" disabled={edges.start} onClick={() => move(-1)} aria-label="Previous best-selling products"><ChevronLeft size={20} /></button>}
    <div className={carousel ? "best-sellers-track" : "product-grid"} ref={gridRef} onScroll={carousel ? updateEdges : undefined} tabIndex={carousel ? 0 : undefined} role={carousel ? "region" : undefined} aria-label={carousel ? "Best-selling products" : undefined}>{pageProducts.map((product, index) => <ProductCard product={{ ...product, tag: product.tag || (index % 3 === 0 ? "New" : undefined) }} onAdd={(item, qty) => onAdd(item ?? product, qty)} onOrderNow={(item, qty) => onOrderNow(item ?? product, qty)} key={`${product.name}-${index}`} />)}{cardPromotion && <aside className="grid-promo-card" aria-label="Discover the Amzad Food collection">
      <span className="grid-promo-kicker"><Gift size={12} /> A LITTLE MORE GOODNESS</span>
      <h3>Made to share.<br /><em>Chosen with care.</em></h3>
      <div className="grid-promo-art"><img src="/amzad-food-website/hero-slide-2.png" alt="Amzad Food sweets and snacks" loading="lazy" /></div>
      <p>Discover sweets, snacks and pantry favourites for every occasion.</p>
      <Link href="/products/">Explore the collection <ArrowRight size={15} /></Link>
    </aside>}</div>
    {carousel && <button className="best-sellers-arrow best-sellers-next" type="button" disabled={edges.end} onClick={() => move(1)} aria-label="Next best-selling products"><ChevronRight size={20} /></button>}
    </div>
    {maxRows && <Pagination currentPage={currentPage} pageCount={totalPages} onChange={changePage} label={`${title} pagination`} />}
    </section>;
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

const categoryLabel = (category: string) => category === "Oil" ? "Ghee & Oil" : category === "Spices" ? "Mosla & Spices" : category;
const productTypeLabels: Record<string, string> = { all: "All types", single: "Single products", combo: "Combo packs" };

// Full catalogue for the dedicated All Products page.
export function ProductCatalog({ addToCart, goToCheckout }: StoreActions) {
  const [category, setCategory] = useState("All");
  const [sortKey, setSortKey] = useState<SortKey>("featured");
  const [query, setQuery] = useState("");
  const [priceFilter, setPriceFilter] = useState<PriceFilter>("all");
  const [brand, setBrand] = useState("all");
  const [productType, setProductType] = useState("all");
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [page, setPage] = useState(1);
  const resultsRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    setPage(1);
  }, [category, priceFilter, query, sortKey, brand, productType]);

  // Follow the URL, including header links (All Products / Combo) clicked while this page is open.
  useEffect(() => {
    const sync = () => {
      const wanted = resolveProductCategory(new URLSearchParams(window.location.search).get("category") ?? "All");
      setCategory(productCategories.includes(wanted) ? wanted : "All");
    };
    sync();
    window.addEventListener(CATALOG_CATEGORY_EVENT, sync);
    window.addEventListener("popstate", sync);
    return () => { window.removeEventListener(CATALOG_CATEGORY_EVENT, sync); window.removeEventListener("popstate", sync); };
  }, []);

  const pick = (value: string) => setCatalogCategory(value);

  const tabs = [{ key: "All", label: "All products", count: storeProducts.length }, ...productCategories.map(name => ({ key: name, label: categoryLabel(name), count: storeProducts.filter(item => item.category === name).length }))];

  const activeFilters = useMemo(() => {
    const items: { label: string; clear: () => void }[] = [];
    if (category !== "All") items.push({ label: categoryLabel(category), clear: () => pick("All") });
    if (priceFilter !== "all") items.push({ label: priceFilterLabels[priceFilter], clear: () => setPriceFilter("all") });
    if (brand !== "all") items.push({ label: brand, clear: () => setBrand("all") });
    if (productType !== "all") items.push({ label: productTypeLabels[productType], clear: () => setProductType("all") });
    if (query.trim()) items.push({ label: `“${query.trim()}”`, clear: () => setQuery("") });
    return items;
  }, [category, priceFilter, query, brand, productType]);
  const extraFilterCount = [priceFilter !== "all", brand !== "all", productType !== "all"].filter(Boolean).length;

  const shown = useMemo(() => {
    const base = category === "All" ? storeProducts : storeProducts.filter(item => item.category === category);
    const withQuery = query.trim() ? base.filter((item) => {
      const target = `${item.name} ${item.bn ?? ""} ${item.category} ${getProductBrand(item)}`.toLowerCase();
      return target.includes(query.trim().toLowerCase());
    }) : base;
    const withPrice = withQuery.filter((item) => matchesPriceRange(item.price, priceFilter));
    const withType = withPrice.filter(item => (brand === "all" || getProductBrand(item) === brand) && (productType === "all" || (productType === "combo" ? item.category === COMBO_CATEGORY : item.category !== COMBO_CATEGORY)));
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
    setPriceFilter("all");
    setBrand("all");
    setProductType("all");
    setQuery("");
    setSortKey("featured");
    pick("All");
  };

  const title = category === "All" ? "All Products" : categoryLabel(category);

  return <section className="catalog page-width" id="catalog">
    <nav className="pd-breadcrumb catalog-breadcrumb" aria-label="Breadcrumb"><Link href="/">Home</Link><span>/</span>{category === "All" ? <span aria-current="page">All Products</span> : <><a href="/amzad-food-website/products/" onClick={(event) => { event.preventDefault(); pick("All"); }}>All Products</a><span>/</span><span aria-current="page">{title}</span></>}</nav>
    <header className="catalog-heading"><h1>{title}</h1><p>{category === "All" ? `${storeProducts.length} natural foods, sweets and pantry essentials from across Bangladesh.` : `${tabs.find(tab => tab.key === category)?.count ?? 0} products in ${title}.`}</p></header>

    <div className="catalog-layout">
      <div className="catalog-desktop-filters" role="region" aria-label="Product filters">
        <div className="catalog-field"><label htmlFor="desktop-category">Category</label><select id="desktop-category" value={category} onChange={event => pick(event.target.value)}>{tabs.map(tab => <option key={tab.key} value={tab.key}>{tab.label} ({tab.count})</option>)}</select></div>
        <div className="catalog-field"><label htmlFor="desktop-price">Price</label><select id="desktop-price" value={priceFilter} onChange={event => setPriceFilter(event.target.value as PriceFilter)}>{(Object.keys(priceFilterLabels) as PriceFilter[]).map(value => <option key={value} value={value}>{priceFilterLabels[value]}</option>)}</select></div>
        <div className="catalog-field"><label htmlFor="desktop-brand">Brand</label><select id="desktop-brand" value={brand} onChange={event => setBrand(event.target.value)}>{["all", ...productBrands].map(value => <option key={value} value={value}>{value === "all" ? "All brands" : value}</option>)}</select></div>
        <div className="catalog-field"><label htmlFor="desktop-type">Product type</label><select id="desktop-type" value={productType} onChange={event => setProductType(event.target.value)}>{Object.keys(productTypeLabels).map(value => <option key={value} value={value}>{productTypeLabels[value]}</option>)}</select></div>
        <div className="catalog-field catalog-desktop-search"><label htmlFor="desktop-search">Search products</label><div className="catalog-search"><Search size={17} aria-hidden="true" /><input id="desktop-search" type="search" value={query} onChange={event => setQuery(event.target.value)} placeholder="Search products…" />{query && <button type="button" onClick={() => setQuery("")} aria-label="Clear search"><X size={14} /></button>}</div></div>
      </div>
      <aside className={filtersOpen ? "catalog-sidebar filters-open" : "catalog-sidebar"} aria-label="Product filters">
        <div className="catalog-search"><Search size={17} aria-hidden="true" /><input id="catalog-search" type="search" aria-label="Search products" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search products…" />{query && <button type="button" onClick={() => setQuery("")} aria-label="Clear search"><X size={14} /></button>}</div>

        <div className="catalog-group catalog-group-categories">
          <h2>Categories</h2>
          <ul className="catalog-cats">{tabs.map(tab => <li key={tab.key}><button type="button" className={tab.key === category ? "active" : undefined} aria-pressed={tab.key === category} onClick={() => pick(tab.key)}><span>{tab.label}</span><small>{tab.count}</small></button></li>)}</ul>
        </div>

        <button type="button" className="catalog-filters-toggle" aria-expanded={filtersOpen} aria-controls="catalog-more-filters" onClick={() => setFiltersOpen(!filtersOpen)}><span>More filters{extraFilterCount > 0 && <b>{extraFilterCount}</b>}</span><ChevronDown size={16} /></button>
        <div className="catalog-more-filters" id="catalog-more-filters">
          <div className="catalog-group">
            <h2>Price</h2>
            <div className="catalog-options">{(Object.keys(priceFilterLabels) as PriceFilter[]).map(value => <button key={value} type="button" className={value === priceFilter ? "active" : undefined} aria-pressed={value === priceFilter} onClick={() => setPriceFilter(value)}>{priceFilterLabels[value]}</button>)}</div>
          </div>
          <div className="catalog-group">
            <h2>Brand</h2>
            <div className="catalog-options">{["all", ...productBrands].map(name => <button key={name} type="button" className={name === brand ? "active" : undefined} aria-pressed={name === brand} onClick={() => setBrand(name)}>{name === "all" ? "All brands" : name}</button>)}</div>
          </div>
          <div className="catalog-group">
            <h2>Product type</h2>
            <div className="catalog-options">{Object.keys(productTypeLabels).map(value => <button key={value} type="button" className={value === productType ? "active" : undefined} aria-pressed={value === productType} onClick={() => setProductType(value)}>{productTypeLabels[value]}</button>)}</div>
          </div>
        </div>
      </aside>

      <div className="catalog-results">
        <div className="catalog-summary-row">
          <p ref={resultsRef} tabIndex={-1} className="catalog-count" role="status">Showing <b>{shown.length > 0 ? `${pageStart + 1}–${pageStart + pageProducts.length}` : "0"}</b> of {shown.length} {shown.length === 1 ? "product" : "products"}</p>
          <div className="catalog-field catalog-sort-field">
            <label htmlFor="catalog-sort">Sort by</label>
            <select id="catalog-sort" value={sortKey} onChange={(event) => setSortKey(event.target.value as SortKey)}>
              {(Object.keys(sortLabels) as SortKey[]).map(key => <option key={key} value={key}>{sortLabels[key]}</option>)}
            </select>
          </div>
        </div>

        {activeFilters.length > 0 && <div className="active-filter-bar" aria-label="Active filters">
          {activeFilters.map((filter) => <button type="button" key={filter.label} className="active-filter-pill" onClick={filter.clear} aria-label={`Remove filter ${filter.label}`}>{filter.label}<X size={12} aria-hidden="true" /></button>)}
          <button type="button" className="filter-reset" onClick={resetFilters}>Clear all</button>
        </div>}

        {shown.length === 0 ? (
          <div className="shop-empty" role="status">
            <strong>No products match your filters.</strong>
            <p>Try clearing a filter or browsing another category.</p>
            <button type="button" className="cta cta-sm" onClick={resetFilters}><span>Clear filters</span></button>
          </div>
        ) : (
          <div className="product-grid">{pageProducts.map(product => <ProductCard key={product.name} product={product} onAdd={(item, qty) => addToCart(item ?? product, qty)} onOrderNow={(item, qty) => goToCheckout(item ?? product, qty)} />)}</div>
        )}
        <Pagination currentPage={currentPage} pageCount={pageCount} onChange={changePage} />
      </div>
    </div>
  </section>;
}


function Pagination({ currentPage, pageCount, onChange, label = "Product pagination" }: { currentPage: number; pageCount: number; onChange: (page: number) => void; label?: string }) {
  if (pageCount <= 1) return null;
  const mobileStart = Math.max(1, Math.min(currentPage - 1, pageCount - 2));
  return <nav className="catalog-pagination" aria-label={label}>
    <button className="catalog-page-direction" type="button" aria-label="Previous page" disabled={currentPage === 1} onClick={() => onChange(currentPage - 1)}><ChevronLeft size={18} /><span>Previous</span></button>
    <div className="catalog-page-numbers">{Array.from({ length: pageCount }, (_, index) => index + 1).map(number => <button className={number >= mobileStart && number < mobileStart + 3 ? undefined : "catalog-page-desktop"} key={number} type="button" aria-label={`Page ${number}`} aria-current={currentPage === number ? "page" : undefined} onClick={() => onChange(number)}>{number}</button>)}</div>
    <button className="catalog-page-direction" type="button" aria-label="Next page" disabled={currentPage === pageCount} onClick={() => onChange(currentPage + 1)}><span>Next</span><ChevronRight size={18} /></button>
    <span className="catalog-page-status" aria-live="polite">Page {currentPage} of {pageCount}</span>
  </nav>;
}
