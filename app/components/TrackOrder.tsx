"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Check, ChevronRight, Copy, Download, MapPin, Package, Phone, Search, Truck } from "lucide-react";
import Storefront from "./Storefront";
import OrderReview from "./OrderReview";
import { demoOrders } from "../lib/demo-orders";
import { downloadInvoice } from "../lib/order-invoice";
import { SavedOrder, findOrder, sampleOrder, sampleProcessingOrder } from "../lib/orders";
import { normaliseOrderId } from "../lib/navigation-events";
import { isDelivered, isTerminal, statusNote, money, orderDate, progressOf, statusOf, trackingSteps } from "../lib/order-status";

export default function TrackOrder() {
  const [query, setQuery] = useState("");
  const [order, setOrder] = useState<SavedOrder | null>(null);
  const [searched, setSearched] = useState(false);
  const [copied, setCopied] = useState(false);
  const search = (raw: string) => {
    const id = normaliseOrderId(raw);
    if (!id) return;
    setQuery(id); setSearched(true); setOrder(findOrder(id) || demoOrders().find(item => item.id === id) || (id === "AF102345" ? sampleOrder() : id === "AF102346" ? sampleProcessingOrder() : null));
    window.history.replaceState(null, "", `?id=${encodeURIComponent(id)}`);
  };
  useEffect(() => { const id = new URLSearchParams(window.location.search).get("id"); if (id) search(id); }, []);
  const demo = !!order && (["AF102345", "AF102346"].includes(order.id) || demoOrders().some(item => item.id === order.id)) && !findOrder(order.id);
  return <Storefront>{() => <section className="orders-page track-page"><div className="page-width">
    <nav className="orders-breadcrumb" aria-label="Breadcrumb"><Link href="/my-orders/">My Orders</Link><ChevronRight size={14} /><span>{order ? "Order Details" : "Track Order"}</span></nav>
    <div className="orders-title"><div><span className="orders-eyebrow">FROM OUR KITCHEN TO YOUR DOOR</span><h1>{order ? "Order Details" : "Track your order"}</h1>{!order && <p>Enter your order ID to see where your parcel is and when it will arrive.</p>}</div><Link className="orders-outline" href="/my-orders/">View all orders <ChevronRight size={16} /></Link></div>
    <form className={order ? "track-lookup compact" : "track-lookup"} onSubmit={event => { event.preventDefault(); search(query); }}>
      <label htmlFor="track-order-id">Enter your order ID</label>
      <div className="track-lookup-row"><Search size={20} aria-hidden="true" /><input id="track-order-id" required placeholder="e.g. AF102345" autoComplete="off" spellCheck={false} value={query} onChange={event => setQuery(event.target.value)} aria-describedby="track-order-hint" /><button className="cta" type="submit"><span>Track Order</span><i className="cta-icon cta-arrow"><Truck size={15} /></i></button></div>
      <p id="track-order-hint">{searched && !order ? <b role="alert">We couldn’t find order {query}. Check the ID, or contact us if you ordered on another device.</b> : "Your order ID starts with AF and is shown on the confirmation screen after checkout."}</p>
    </form>
    {!order && <div className="track-help">
      <div><Package size={20} /><span><strong>Want to see how tracking works?</strong>Open a sample order with a full delivery timeline.</span><button className="orders-outline" onClick={() => search("AF102345")}>View sample order <ChevronRight size={16} /></button></div>
      <div><Phone size={20} /><span><strong>Can’t find your order ID?</strong>Our team can look it up by your phone number.</span><a className="orders-outline" href="https://wa.me/8801327406605?text=Please%20help%20me%20track%20my%20order" target="_blank" rel="noreferrer">Ask on WhatsApp <ChevronRight size={16} /></a></div>
    </div>}
    {order && <>{demo && <div className="orders-demo">Sample order preview · These details demonstrate the design.</div>}<div className="order-detail-grid">
      <aside className="order-detail-sidebar">{isDelivered(order) && order.items.length > 0 && <OrderReview orderId={order.id} product={order.items[0].name} demo={!!demo} compact />}<article className="order-panel address-panel"><h2>Delivery Address</h2><div className="order-address"><MapPin size={19} /><div><strong>{order.name}</strong><p>{order.phone}</p><p>{order.address}</p></div></div></article><article className="order-panel order-support"><span className="orders-eyebrow">WE’RE HERE TO HELP</span><h2>A little help with your order?</h2><p>Talk to our team for delivery updates or any questions about your parcel.</p><a className="orders-primary" href={`https://wa.me/8801327406605?text=${encodeURIComponent(`Please help me with order ${order.id}`)}`} target="_blank" rel="noreferrer">Chat on WhatsApp <ChevronRight size={16} /></a><a className="order-phone" href="tel:+8809613824071"><Phone size={15} /> 09613824071</a></article><div className="order-promise"><Truck size={23} /><div><strong>Good food. Carefully delivered.</strong><p>Packed with care, every single time.</p></div></div></aside>
      <div className="order-detail-main"><article className="order-panel order-overview"><div className="order-status-banner"><div><h2>{statusOf(order) === "Completed" ? "Order Completed" : statusOf(order) === "Cancelled" ? "Order Cancelled" : `Order ${statusOf(order)}`}</h2><p>{statusNote(order)}</p></div><span className="order-parcel"><Package size={42} />{isDelivered(order) && <i><Check size={15} /></i>}</span></div>
      <div className="order-overview-body"><dl className="order-metadata"><div><dt>Order ID <button aria-label="Copy order ID" onClick={() => navigator.clipboard?.writeText(order.id).then(() => { setCopied(true); setTimeout(() => setCopied(false), 1800); }).catch(() => {})}>{copied ? <Check size={13} /> : <Copy size={13} />}</button></dt><dd>{order.id}</dd></div><div><dt>Order Date</dt><dd>{orderDate(order.placedAt)}</dd></div><div><dt>Payment Method</dt><dd>Cash on Delivery</dd></div></dl><div className="order-shipping"><small>Shipping Address</small><p>{order.name} · {order.phone}<br />{order.address}</p></div><div className="order-download"><span>{isDelivered(order) ? "Delivery completed" : isTerminal(order) ? `Order ${statusOf(order).toLowerCase()}` : `Estimated delivery: ${order.eta}`}</span><button className="orders-primary" onClick={() => downloadInvoice(order, !!demo)}><Download size={15} /> Download Invoice</button></div></div></article>
      <article className="order-panel"><h2>Tracking Update</h2><ol className="order-timeline">{(order.updates?.length ? order.updates : [{ label: "Order Placed", note: "We received your order. Awaiting confirmation from our team.", at: order.placedAt }]).map((update, index) => <li key={`${update.label}-${index}`}><time dateTime={new Date(update.at).toISOString()}>{orderDate(update.at)}<span>{new Date(update.at).toLocaleTimeString("en-GB", { hour: "numeric", minute: "2-digit", hour12: true })}</span></time><i><Check size={12} /></i><div><strong>{update.label}</strong><p>{update.note}</p></div></li>)}</ol>{!order.updates?.length && !isTerminal(order) && <div className="order-next"><Truck size={17} /> Next: {trackingSteps[Math.min(progressOf(order) + 1, trackingSteps.length - 1)]} · Awaiting an update</div>}</article>
      <article className="order-panel"><h2>Order Items</h2><div className="order-detail-items">{order.items.map((item, index) => <div className="orders-product" key={`${item.name}-${index}`}><img src={item.image} alt={item.name} /><div className="orders-product-info"><h3>{item.name}</h3><p>Brand: Amzad Food</p></div><span>Qty: {item.qty}</span><strong>{money(item.price * item.qty)}</strong></div>)}</div><dl className="order-totals"><div><dt>Total Items</dt><dd>{order.items.reduce((sum, item) => sum + item.qty, 0)} item(s)</dd></div><div><dt>Subtotal</dt><dd>{money(order.items.reduce((sum, item) => sum + item.price * item.qty, 0))}</dd></div>{order.items.reduce((sum, item) => sum + item.price * item.qty, 0) + order.deliveryFee > order.total && <div><dt>Discount</dt><dd>−{money(order.items.reduce((sum, item) => sum + item.price * item.qty, 0) + order.deliveryFee - order.total)}</dd></div>}<div><dt>Delivery Charge</dt><dd>{order.deliveryFee ? money(order.deliveryFee) : "Free"}</dd></div><div className="order-grand-total"><dt>Order Total<small>Cash on Delivery</small></dt><dd>{money(order.total)}</dd></div></dl></article>
      </div></div></>}
  </div></section>}</Storefront>;
}
