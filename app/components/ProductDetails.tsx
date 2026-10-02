"use client";
import Link from "next/link";
import { useState } from "react";
import { ArrowRight, MessageSquare, Info, ShieldCheck, Leaf, Truck } from "lucide-react";
import QuickView from "./QuickView";
import Reviews from "./Reviews";
import { Product, productSlug } from "../lib/products";
import Storefront from "./Storefront";

function ProductTabs({ product }: { product: Product }) {
  const [activeTab, setActiveTab] = useState<"description" | "nutrition" | "shipping">("description");
  return (
    <div className="pd-tabs-section">
      <div className="pd-tabs-nav">
        <button type="button" className={activeTab === "description" ? "active" : ""} onClick={() => setActiveTab("description")}><Info size={16} style={{ display: 'inline', verticalAlign: '-3px', marginRight: '6px' }} /> Description</button>
        <button type="button" className={activeTab === "nutrition" ? "active" : ""} onClick={() => setActiveTab("nutrition")}><Leaf size={16} style={{ display: 'inline', verticalAlign: '-3px', marginRight: '6px' }} /> Ingredients & Nutrition</button>
        <button type="button" className={activeTab === "shipping" ? "active" : ""} onClick={() => setActiveTab("shipping")}><Truck size={16} style={{ display: 'inline', verticalAlign: '-3px', marginRight: '6px' }} /> Shipping & Returns</button>
      </div>
      <div className="pd-tabs-content">
        {activeTab === "description" && <div>
          <h3>About {product.name}</h3>
          <p>Experience the authentic taste of Bangladesh with our premium {product.name}. Carefully sourced and packed to ensure maximum freshness and quality, this product is an essential addition to your daily routine.</p>
          <ul>
            <li>100% natural and pure</li>
            <li>Sourced directly from trusted local farmers</li>
            <li>No artificial colors or preservatives</li>
            <li>Hygienically processed and packed</li>
          </ul>
        </div>}
        {activeTab === "nutrition" && <div>
          <h3>Ingredients & Nutrition</h3>
          <p><strong>Ingredients:</strong> 100% pure {product.category.toLowerCase()} extract/ingredients. Contains no additives.</p>
          <p><strong>Storage:</strong> Store in a cool, dry place away from direct sunlight. Ensure the container is tightly sealed after every use.</p>
          <p><strong>Allergen Info:</strong> Produced in a facility that also processes nuts and dairy. Please consult with a physician if you have severe allergies.</p>
        </div>}
        {activeTab === "shipping" && <div>
          <h3>Shipping & Returns</h3>
          <p><strong>Delivery Time:</strong> 2-3 business days within Dhaka, 3-5 days for other districts.</p>
          <p><strong>Shipping Cost:</strong> ৳60 flat delivery fee on all orders. Enjoy free delivery on orders over ৳1000 with promo code FREESHIP.</p>
          <p><strong>Returns:</strong> We have a 3-day hassle-free return policy. If you receive a damaged or incorrect product, please contact our support team immediately for a replacement or refund.</p>
        </div>}
      </div>
    </div>
  );
}

export default function ProductDetails({ product, related }: { product: Product; related: Product[] }) {
  return <Storefront>{({ addToCart, goToCheckout, isWishlisted, toggleWishlist }) => <div className="pd-page">
    <div className="page-width">
      <div className="pd-topbar"><nav className="pd-breadcrumb" aria-label="Breadcrumb"><Link href="/">Home</Link><span>/</span><Link href="/products/">All Products</Link><span>/</span><Link href={`/products/?category=${encodeURIComponent(product.category)}`}>{product.category === "Oil" ? "Ghee & Oil" : product.category}</Link><span>/</span><span aria-current="page">{product.name}</span></nav><a href="#product-reviews">View customer reviews <ArrowRight size={14} /></a></div>
      <QuickView key={product.name} product={product} embedded wishlisted={isWishlisted(product.name)} onToggleWishlist={() => toggleWishlist(product)} onAdd={addToCart} onOrderNow={goToCheckout} onClose={() => {}} />
      
      <ProductTabs product={product} />

      <section className="pd-reviews" id="product-reviews"><div><span className="pd-eyebrow">CUSTOMER VOICES</span><h2>Product reviews</h2><p>Feedback for {product.name}</p></div><div className="pd-review-empty"><MessageSquare size={26} /><strong>No product-specific reviews yet</strong><p>Explore what customers say about shopping with Amzad Food below.</p></div></section>
    </div>
    <div className="pd-store-reviews"><div className="page-width"><p className="pd-eyebrow">REVIEWS OF AMZAD FOOD · STORE-WIDE EXPERIENCES</p></div><Reviews /></div>
    <section className="pd-related page-width"><div className="pd-section-heading"><div><span className="pd-eyebrow">A LITTLE MORE TO LOVE</span><h2>Explore related products</h2></div><Link href="/products/">Shop all <ArrowRight size={16} /></Link></div><div className="pd-related-grid">{related.map(item => <Link className="pd-related-card" href={`/products/${productSlug(item.name)}/`} key={item.name}><div><img src={item.image} alt={item.name} /><span><ArrowRight size={18} /></span></div><small>{item.category}</small><h3>{item.name}</h3><p>৳{item.price} {item.oldPrice && <del>৳{item.oldPrice}</del>}</p></Link>)}</div></section>
  </div>}</Storefront>;
}
