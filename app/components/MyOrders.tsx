"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { ChevronRight, Package, Search, ShoppingBag } from "lucide-react";
import Storefront from "./Storefront";
import OrderReview from "./OrderReview";
import OrderStatusTabs from "./OrderStatusTabs";
import { loadOrders, SavedOrder } from "../lib/orders";
import { demoOrders } from "../lib/demo-orders";
import { money, orderDate, isDelivered, statusNote, statusOf } from "../lib/order-status";

export default function MyOrders() {
  const [orders, setOrders] = useState<SavedOrder[]>([]);
  const [ready, setReady] = useState(false);
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("Processing");
  const [demo, setDemo] = useState(false);
  useEffect(() => { const saved = loadOrders(); setOrders(saved); setDemo(saved.length === 0); if (saved.length === 0) setFilter("All Orders"); setReady(true); }, []);
  const displayed = demo ? demoOrders() : orders;
  const matches = displayed.filter(order => order.id.toLowerCase().includes(query.trim().replace(/^#/, "").toLowerCase()) && (filter === "All Orders" || statusOf(order) === filter));
  return <Storefront>{({ addToCart }) => <section className="orders-page"><div className="page-width">
    <nav className="orders-breadcrumb" aria-label="Breadcrumb"><Link href="/">Home</Link><ChevronRight size={14} /><span>My Orders</span></nav>
    <div className="orders-title"><div><span className="orders-eyebrow">YOUR AMZAD FOOD ACCOUNT</span><h1>My Orders</h1><p>All your favourites, from our kitchen to your doorstep.</p></div><Link className="orders-outline" href="/products/"><ShoppingBag size={16} /> Continue shopping</Link></div>
    <div className="orders-search"><Search size={20} /><input aria-label="Search orders by ID" placeholder="Search orders by ID" value={query} onChange={event => setQuery(event.target.value)} />{query && <button onClick={() => setQuery("")} aria-label="Clear search">×</button>}</div>
    <OrderStatusTabs selected={filter} onSelect={setFilter} />
    {demo && <div className="orders-demo">Client preview · The full product catalogue is shown across sample orders for every stage. These are demonstration orders.</div>}
    <div className="orders-context"><span>{matches.length} order{matches.length === 1 ? "" : "s"}{demo ? " · Sample preview" : " · Saved on this device"}</span><button onClick={() => { setDemo(!demo); setFilter(demo ? "Processing" : "All Orders"); setQuery(""); }}>{demo ? "Back to my orders" : "Preview sample orders"}</button></div>
    {!ready ? <div className="orders-empty">Loading your orders…</div> : matches.length === 0 ? <div className="orders-empty"><Package size={40} /><h2>{query ? "No matching orders" : filter === "Processing" ? "No processing orders" : filter !== "All Orders" ? "No matching orders" : "Your first order starts here"}</h2><p>{query || filter !== "All Orders" ? "Try another order ID or choose a different status." : "Orders placed on this device will appear here. Discover wholesome food from across Bangladesh."}</p><Link className="orders-primary" href="/products/">Explore products <ChevronRight size={16} /></Link></div> : <div className="orders-list">{matches.map(order => <article className="orders-card" key={order.id}>
      <header><div><div className="orders-card-heading"><Link href={`/track-order/?id=${order.id}`}><strong>Order ID: {order.id}</strong><ChevronRight size={18} /></Link><span className={`orders-status ${isDelivered(order) ? "completed" : ""}`}>{statusOf(order)}</span></div><small>{orderDate(order.placedAt)}</small></div><Link className="orders-track" href={`/track-order/?id=${order.id}`}>Track Order <ChevronRight size={15} /></Link></header>
      {demo && <p className="orders-stage-note">{statusNote(order)}</p>}
      <div className="orders-products">{order.items.map((item, index) => <div className="orders-product" key={`${item.name}-${index}`}><img src={item.image} alt={item.name} /><div className="orders-product-info"><h3>{item.name}</h3><p>Brand: Amzad Food <span>|</span> Qty: {item.qty}</p><strong>{money(item.price * item.qty)}</strong></div><div className="orders-product-actions">{isDelivered(order) && <OrderReview orderId={order.id} product={item.name} demo={demo} />}<button className="orders-primary" onClick={() => addToCart(item, item.qty)}><ShoppingBag size={15} /> Add to Cart</button></div></div>)}</div>
      <footer><span>{order.items.reduce((sum, item) => sum + item.qty, 0)} items · Cash on Delivery</span><span>Order total <strong>{money(order.total)}</strong></span></footer>
    </article>)}</div>}
    <p className="orders-footnote">Need help finding an order? <a href="https://wa.me/8801327406605" target="_blank" rel="noreferrer">Contact our team</a></p>
  </div></section>}</Storefront>;
}
