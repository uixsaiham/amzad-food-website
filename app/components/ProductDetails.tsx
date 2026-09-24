"use client";
import Link from "next/link";
import { ArrowRight, MessageSquare } from "lucide-react";
import QuickView from "./QuickView";
import Reviews from "./Reviews";
import { Product, productSlug } from "../lib/products";
import Storefront from "./Storefront";

export default function ProductDetails({ product, related }: { product: Product; related: Product[] }) {
  return <Storefront>{({ addToCart, goToCheckout, isWishlisted, toggleWishlist }) => <div className="pd-page">
    <div className="page-width">
      <nav className="pd-breadcrumb" aria-label="Breadcrumb"><Link href="/">Home</Link><span>/</span><Link href="/#shop">Shop</Link><span>/</span><span>{product.name}</span></nav>
      <div className="pd-intro"><h1>{product.name}</h1><a href="#product-reviews">View customer reviews <ArrowRight size={14} /></a></div>
      <QuickView key={product.name} product={product} embedded wishlisted={isWishlisted(product.name)} onToggleWishlist={() => toggleWishlist(product)} onAdd={addToCart} onOrderNow={goToCheckout} onClose={() => {}} />
      <section className="pd-reviews" id="product-reviews"><div><span className="pd-eyebrow">CUSTOMER VOICES</span><h2>Product reviews</h2><p>Feedback for {product.name}</p></div><div className="pd-review-empty"><MessageSquare size={26} /><strong>No product-specific reviews yet</strong><p>Explore what customers say about shopping with Amzad Food below.</p></div></section>
    </div>
    <div className="pd-store-reviews"><div className="page-width"><p className="pd-eyebrow">REVIEWS OF AMZAD FOOD · STORE-WIDE EXPERIENCES</p></div><Reviews /></div>
    <section className="pd-related page-width"><div className="pd-section-heading"><div><span className="pd-eyebrow">A LITTLE MORE TO LOVE</span><h2>Explore related products</h2></div><Link href="/#shop">Shop all <ArrowRight size={16} /></Link></div><div className="pd-related-grid">{related.map(item => <Link className="pd-related-card" href={`/products/${productSlug(item.name)}/`} key={item.name}><div><img src={item.image} alt={item.name} /><span><ArrowRight size={18} /></span></div><small>{item.category}</small><h3>{item.name}</h3><p>৳{item.price} <del>৳{item.price + 50}</del></p></Link>)}</div></section>
  </div>}</Storefront>;
}
