"use client";
import Link from "next/link";
import { useState } from "react";
import { ArrowRight, Info, ShieldCheck, Leaf, Truck } from "lucide-react";
import QuickView from "./QuickView";
import { getProductDetails } from "../lib/product-details";
import { Product } from "../lib/products";
import Storefront, { ProductCard } from "./Storefront";
import ProductReview from "./ProductReview";
import { DELIVERY_DESCRIPTION } from "../lib/offers";

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
          <p>{getProductDetails(product).blurb}</p>
        </div>}
        {activeTab === "nutrition" && <div>
          <h3>Ingredients & Nutrition</h3>
          <p><strong>Ingredients & allergens:</strong> Check the product label or contact our team for product-specific information before ordering.</p>
          <p><strong>Storage:</strong> Follow the storage instructions on the product label.</p>

        </div>}
        {activeTab === "shipping" && <div>
          <h3>Shipping & Returns</h3>
          <p><strong>Delivery Time:</strong> Contact our team to confirm delivery availability and timing.</p>
          <p><strong>Shipping Cost:</strong> {DELIVERY_DESCRIPTION}</p>
          <p><strong>Returns:</strong> Contact our support team about damaged or incorrect products and confirm return eligibility before ordering.</p>
        </div>}
      </div>
    </div>
  );
}

export default function ProductDetails({ product, related }: { product: Product; related: Product[] }) {
  return <Storefront>{({ addToCart, goToCheckout }) => <div className="pd-page">
    <div className="page-width">
      <div className="pd-topbar"><nav className="pd-breadcrumb" aria-label="Breadcrumb"><Link href="/">Home</Link><span>/</span><Link href="/products/">All Products</Link><span>/</span><Link href={`/products/?category=${encodeURIComponent(product.category)}`}>{product.category === "Oil" ? "Ghee & Oil" : product.category}</Link><span>/</span><span aria-current="page">{product.name}</span></nav></div>
      <QuickView key={product.name} product={product} embedded onAdd={addToCart} onOrderNow={goToCheckout} onClose={() => {}} />

      <ProductTabs product={product} />
      <ProductReview key={product.name} product={product.name} />

    </div>
    <section className="pd-related page-width"><div className="pd-section-heading"><div><span className="pd-eyebrow">A LITTLE MORE TO LOVE</span><h2>Explore related products</h2></div><Link href="/products/">Shop all <ArrowRight size={16} /></Link></div><div className="pd-related-grid">{related.map(item => <ProductCard key={item.name} product={item} onAdd={(line, qty) => addToCart(line ?? item, qty)} onOrderNow={(line, qty) => goToCheckout(line ?? item, qty)} />)}</div></section>
  </div>}</Storefront>;
}
