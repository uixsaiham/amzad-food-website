"use client";

import { useEffect, useMemo, useState } from "react";
import { ArrowDownLeft, ArrowRight, ArrowUp, BadgeCheck, Cherry, Check, ChevronDown, ChevronLeft, ChevronRight, Droplets, Eye, Facebook, Flame, Gift, Heart, Instagram, Leaf, MapPin, Menu, Moon, PackageCheck, Play, Search, ShoppingCart, Star, Sunset, Truck, UserRound, Users, X, Youtube } from "lucide-react";

type Product = { name: string; category: string; price: number; image: string; tag?: string };
const productImage = "/amzad-food-website/product-honey.png";
const products: Product[] = Array.from({ length: 12 }, (_, index) => ({
  name: ["Wildflower Honey & Black Seed", "Sundarbans Raw Honey", "Organic Black Seed Oil", "Premium Date Syrup"][index % 4],
  category: index % 2 ? "Pantry" : "Best seller",
  price: [350, 550, 650, 450][index % 4], image: productImage, tag: index % 3 === 0 ? "Best Seller" : undefined,
}));
const exploreProducts = products.slice(0, 10).map((product, index) => ({ ...product, name: ["Pure Ghee", "Puffed Rice", "Premium Black Seed Oil", "Khejur Gur", "Mango Pickle"][index % 5], price: [550, 230, 650, 1000, 230][index % 5] }));
const categories = ["All", "Fresh produce", "Pantry", "Dairy & eggs", "Bakery"];
const blogReviews = [
  { image: "/amzad-food-website/blog-review-1.png", alt: "মেদ ঝরানো এখন আরও সহজ" },
  { image: "/amzad-food-website/blog-review-2.png", alt: "অতিরিক্ত ওজন কমান প্রাকৃতিক উপায়ে" },
  { image: "/amzad-food-website/blog-review-3.png", alt: "ছোট বড় অভ্যাসেই স্বাস্থ্যকর জীবন" },
];

function ProductCard({ product, onAdd }: { product: Product; onAdd: () => void }) {
  const [quickView, setQuickView] = useState(false);
  return <article className="product-card"><div className="product-image"><img src={product.image} alt={product.name} /><span className="product-tag">Save ৳50</span><div className="card-actions"><button aria-label={`Quick view ${product.name}`} title="Quick view" onClick={() => setQuickView(true)}><Eye size={17} /></button><button className="cart-action" aria-label={`Add ${product.name} to cart`} title="Add to cart" onClick={onAdd}><ShoppingCart size={17} /></button></div></div><div className="product-info"><h3><span>কালোজিরা মধু / </span>{product.name}</h3><p className="product-unit">500 gm</p><div className="product-price-row"><strong>৳{product.price}</strong><span className="rating"><Star size={13} fill="currentColor" /><b>4.9</b><i>(46)</i></span></div><button className="order-button" onClick={onAdd}>Order Now</button></div>{quickView && <div className="quick-view" role="dialog" aria-label={`Quick view ${product.name}`}><button className="quick-view-close" onClick={() => setQuickView(false)} aria-label="Close quick view"><X size={16} /></button><img src={product.image} alt={product.name} /><h3>{product.name}</h3><strong>৳{product.price}</strong><button className="primary-button" onClick={() => { onAdd(); setQuickView(false); }}>Add to Cart <ShoppingCart size={14} /></button></div>}</article>;
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

function PrayerTimesCard() {
  const [showAll, setShowAll] = useState(false);
  return <section className="prayer-widget page-width" id="prayer-times">
    <div className="prayer-widget-head">
      <div className="prayer-widget-title"><span className="prayer-moon-icon"><Moon size={17} fill="currentColor" /></span><div><h2>আজকের নামাজের সময়</h2><small>২৬ আগস্ট, ২০২৬ · ঢাকা</small></div></div>
      <button className="prayer-location"><MapPin size={13} /> ঢাকা <ChevronDown size={13} /></button>
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

export default function Home() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [basketCount, setBasketCount] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [query, setQuery] = useState("");
  const visibleProducts = useMemo(() => products.filter((item) => (activeCategory === "All" || activeCategory === "Pantry") && item.name.toLowerCase().includes(query.toLowerCase())), [activeCategory, query]);
  const add = () => setBasketCount((value) => value + 1);
  return <main id="top">
    <nav className="navbar page-width"><button className={menuOpen ? "mobile-menu icon-button open" : "mobile-menu icon-button"} onClick={() => setMenuOpen(!menuOpen)} aria-label={menuOpen ? "Close menu" : "Open menu"} aria-expanded={menuOpen}>{menuOpen ? <X size={19} /> : <Menu size={19} />}</button><a className="brand amzad-brand" href="#top"><span className="brand-wordmark"><b>amzad</b> <strong>food</strong><small>বিশ্বাসের সাথে, স্বাদের ঠিকানা</small></span></a><div className={menuOpen ? "nav-links open" : "nav-links"}><a href="#top" onClick={() => setMenuOpen(false)}>Home</a><a href="#shop" onClick={() => setMenuOpen(false)}>All Products</a><a href="#collection" onClick={() => setMenuOpen(false)}>Collection</a><a href="#top" onClick={() => setMenuOpen(false)}>Blogs</a><div className="nav-links-mobile-actions"><button className="nav-account"><UserRound size={16} /><small>Sign in</small></button><button className="nav-account wishlist"><Heart size={16} /><small>Wishlist</small></button></div></div>{menuOpen && <button className="nav-backdrop" onClick={() => setMenuOpen(false)} aria-label="Close menu" />}<div className="nav-actions"><div className="nav-search"><Search size={13} /><input placeholder="Search for food, brand..." value={query} onChange={(event) => setQuery(event.target.value)} /></div><button className="nav-account"><UserRound size={16} /><small>Sign in</small></button><button className="nav-account" onClick={add}><ShoppingCart size={16} /><small>Cart</small><b>{basketCount}</b></button><button className="nav-account wishlist"><Heart size={16} /><small>Wishlist</small></button></div></nav>
    <HeroSlider />
    <section className="category-strip page-width" id="collection"><div className="category-intro"><strong>Shop by<br />Category</strong><ArrowRight size={15} /></div>{["🧂","🫙","🥭","🥜","🍯","🧺","🌱","🫘"].map((icon, index) => <button className="quick-category" key={`${icon}-${index}`}><span>{icon}</span><small>{["Pink Salt","Mosla","Mango","Pink Salt","Honey Nuts","Pink Salt","Seeds","Khejur"][index]}</small></button>)}<button className="gift-box"><span><Gift size={19} /></span><strong>Gift Boxes<small>Perfect for<br />every occasion</small></strong></button></section>
    <section className="promise-strip"><div className="page-width promises"><div className="source-label"><strong>From Source<br />to Your Table</strong><small>A journey of Trust &amp; Quality</small></div>{[[BadgeCheck,"Sourced","from Trusted Farmers"],[Check,"Quality Checked","for Your Safety"],[PackageCheck,"Premium Packaging","for Freshness"],[Truck,"Delivered","Across Bangladesh"]].map(([Icon, title, subtitle], index) => <div key={title as string}><span className="promise-icon"><Icon size={15} /></span><p><strong>{title as string}</strong><br />{subtitle as string}</p>{index < 3 && <ArrowRight size={13} />}</div>)}</div></section>
    <section className="feature-band page-width"><article className="origin-card"><div className="origin-copy"><p className="eyebrow">Rooted in Bangladesh</p><h2>Discover<br />Our Origin <span>🍃</span></h2><p>Discover authentic Bangladeshi foods, trusted essentials and naturally sourced products — all in one place.</p><button className="primary-button">Explore Origin Stories <ArrowRight size={14} /></button></div><div className="origin-map"><img src="/amzad-food-website/bangladesh-map.png" alt="Bangladesh sourcing map" /><span className="origin-pin sylhet"><i><Leaf size={13} /></i><b>Sylhet<small>Tea</small></b></span><span className="origin-pin rajshahi"><i><Cherry size={13} /></i><b>Rajshahi<small>Mango</small></b></span><span className="origin-pin comilla"><i><Flame size={13} /></i><b>Comilla<small>Spices</small></b></span><span className="origin-pin sundarbans"><i><Droplets size={13} /></i><b>Sundarbans<small>Honey</small></b></span></div></article><article className="honey-card"><img className="honey-bg" src="/amzad-food-website/honey-bg.png" alt="" aria-hidden="true" /><span className="honey-callout">Pure Goodness<small>from Bangladesh</small><ArrowDownLeft size={20} /></span><div className="honey-copy"><h2>Sundarbans<br />Raw Honey</h2><p className="honey-subtitle">Cold Pressed <span>•</span> 100% Natural</p><div className="honey-badges"><span>100% Natural</span><span>Rich in Naturals</span></div><div className="honey-price"><strong>৳350</strong><del>৳450</del><em>Save ৳100</em></div><button className="primary-button" onClick={add}>Add to Cart <ShoppingCart size={14} /></button></div></article></section>
    <ProductSection title="Our Best Selling Products" eyebrow="Best Sellers" products={visibleProducts.slice(0, 8)} onAdd={add} id="shop" tabs={{ categories, activeCategory, setActiveCategory }} />
    <section className="subscribe page-width"><div className="subscribe-content"><h2>Subscribe</h2><strong className="subscribe-discount">10% OFF</strong><p>Delve into the vibrant world of Bangladeshi flavors, showcasing carefully selected ingredients.</p></div><div className="subscribe-form"><input placeholder="Enter your email address" /><button>Subscribe</button></div></section>
    <ProductSection title="Combo Packages" eyebrow="Value Packs" products={products.slice(0, 8)} onAdd={add} />
    <PrayerTimesCard />
    <section className="trust-section"><p className="eyebrow">Why choose Amzad Food</p><h2>Quality You Can Trust</h2><p>Every product is selected with care.</p><div className="trust-grid">{["100% Safe Products","Lab Tested","Premium Quality","No Preservatives","Secure Packaging","Customer Support"].map((item) => <div key={item}><BadgeCheck size={19} /><strong>{item}</strong><small>Carefully checked for you</small></div>)}</div></section>
    <section className="review-section"><h2>Customer Reviews And Ratings</h2><div className="reviews">{["Rafiq Ahmed","Md. Arif Hossain","Lamia Sultana","Hasan Mahmud"].map((name) => <article key={name}><strong>{name}</strong><span className="rating">★★★★★</span><p>Excellent quality and very fast delivery. The taste feels authentic and fresh.</p><small>Verified customer</small></article>)}</div></section>
    <ProductSection title="All Products" eyebrow="Explore our full collection" products={exploreProducts.slice(0, 8)} onAdd={add} />
    <section className="video-reviews"><h2>Customer Product Review</h2><div className="blog-grid">{blogReviews.map((item, index) => <article className="blog-card" key={index}><img src={item.image} alt={item.alt} /><button className="blog-play" aria-label="Play video"><Play size={16} fill="currentColor" /></button></article>)}</div><div className="trust-banner"><h2>Trusted by Thousands of Families</h2><p>Integrity is the cornerstone of our mission.</p><div className="stats"><span><div className="stat-top"><i className="stat-icon"><Users size={20} /></i><b>50K+</b></div><small>Happy Customer</small></span><span><div className="stat-top"><i className="stat-icon"><Gift size={20} /></i><b>200+</b></div><small>Quality Products</small></span><span><div className="stat-top"><i className="stat-icon"><MapPin size={20} /></i><b>60+</b></div><small>Districts Covered</small></span><span><div className="stat-top"><i className="stat-icon"><Star size={20} /></i><b>4.8/5</b></div><small>Customer Rating</small></span></div></div></section>
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
          <div className="footer-newsletter"><strong>The Newsletter</strong><div><input placeholder="Your email address" /><button aria-label="Subscribe"><ArrowRight size={14} /></button></div></div>
        </div>
        <div className="footer-column"><strong>Quick Links</strong><a href="#shop">Browse Products</a><a href="#collection">Collections</a><a href="#top">About us</a></div>
        <div className="footer-column"><strong>About</strong><a href="#top">Our Story</a><a href="#top">Mission</a><a href="#top">Contact</a></div>
        <div className="footer-contact">
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
          <div className="footer-social"><a href="#top" aria-label="Facebook"><Facebook size={14} /></a><a href="#top" aria-label="Instagram"><Instagram size={14} /></a><a href="#top" aria-label="YouTube"><Youtube size={14} /></a></div>
        </div>
        <div className="footer-bottom-right">
          <a href="#top">Privacy Policy</a><a href="#top">Terms</a><a href="#top">FAQ</a>
          <a className="footer-top-btn" href="#top" aria-label="Back to top"><ArrowUp size={14} /></a>
        </div>
      </div>
      <div className="footer-giant" aria-hidden="true">amzad food</div>
    </footer>
  </main>;
}

function ProductSection({ title, eyebrow, products, onAdd, id, tabs }: { title: string; eyebrow: string; products: Product[]; onAdd: () => void; id?: string; tabs?: { categories: string[]; activeCategory: string; setActiveCategory: (value: string) => void } }) {
  return <section className="shop-section page-width" id={id}><div className="section-heading"><div><p className="eyebrow">{eyebrow}</p><h2>{title}</h2><p>Discover our handpicked collection of natural and delicious products.</p></div><a className="text-link" href="#shop">View all products <ArrowRight size={14} /></a></div>{tabs && <div className="category-tabs">{tabs.categories.map((category) => <button className={tabs.activeCategory === category ? "active" : ""} key={category} onClick={() => tabs.setActiveCategory(category)}>{category}</button>)}<button className="sort-button">Sort by <ChevronDown size={13} /></button></div>}<div className="product-grid">{products.map((product, index) => <ProductCard product={{ ...product, tag: product.tag || (index % 3 === 0 ? "New" : undefined) }} onAdd={onAdd} key={`${product.name}-${index}`} />)}</div></section>;
}
