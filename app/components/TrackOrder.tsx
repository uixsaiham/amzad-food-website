"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, CheckCircle2, ClipboardCheck, Clock, Copy, Home, MapPin, PackageCheck, PackageSearch, Phone, ReceiptText, Search, SearchX, Truck, UserRound } from "lucide-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import Storefront from "./Storefront";
import { SavedOrder, findOrder, loadOrders, sampleOrder } from "../lib/orders";

const HOUR = 60 * 60 * 1000;
// Without a backend, progress is estimated from the time since the order was placed.
const steps = [
  { key: "placed", label: "Order placed", note: "We received your order", icon: ReceiptText, after: 0 },
  { key: "confirmed", label: "Confirmed", note: "Our team called to confirm", icon: ClipboardCheck, after: 1 * HOUR },
  { key: "packed", label: "Packed", note: "Quality checked & sealed", icon: PackageCheck, after: 6 * HOUR },
  { key: "shipping", label: "Out for delivery", note: "On the way to your door", icon: Truck, after: 20 * HOUR },
  { key: "delivered", label: "Delivered", note: "Enjoy your order!", icon: Home, after: 48 * HOUR },
];
const stepIndexFor = (order: SavedOrder) => steps.reduce((index, step, i) => Date.now() - order.placedAt >= step.after ? i : index, 0);
const formatTime = (time: number) => new Date(time).toLocaleString("en-GB", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" });
const taka = (value: number) => `৳${value.toLocaleString("en-IN")}`;

type Lookup = { state: "idle" } | { state: "found"; order: SavedOrder } | { state: "missing"; id: string };

export default function TrackOrder() {
  const [query, setQuery] = useState("");
  const [lookup, setLookup] = useState<Lookup>({ state: "idle" });
  const [recent, setRecent] = useState<SavedOrder[]>([]);
  const [copied, setCopied] = useState(false);

  const search = (raw: string) => {
    const id = raw.trim().toUpperCase().replace(/^#/, "");
    if (!id) return;
    setQuery(id);
    const sample = sampleOrder();
    const order = id === sample.id ? sample : findOrder(id);
    setLookup(order ? { state: "found", order } : { state: "missing", id });
    window.history.replaceState(null, "", `?id=${encodeURIComponent(id)}`);
  };

  useEffect(() => {
    setRecent(loadOrders().slice(0, 4));
    const id = new URLSearchParams(window.location.search).get("id");
    if (id) search(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const copyId = (id: string) => {
    navigator.clipboard?.writeText(id).then(() => { setCopied(true); window.setTimeout(() => setCopied(false), 1600); }).catch(() => {});
  };

  return <Storefront>{() => <main className="to-page">
    <section className="to-hero page-width">
      <nav className="pd-breadcrumb" aria-label="Breadcrumb"><Link href="/">Home</Link><span>/</span><span>Track Order</span></nav>
      <div className="to-hero-inner">
        <div className="to-hero-copy">
          <span className="to-pill"><PackageSearch size={13} /> Order tracking · অর্ডার ট্র্যাকিং</span>
          <h1>Where&apos;s my <em>order?</em></h1>
          <p>Enter the order ID from your confirmation message to see live progress, delivery details and what&apos;s in your parcel.</p>
        </div>
        <form className="to-search" onSubmit={(event) => { event.preventDefault(); search(query); }}>
          <label htmlFor="to-id">Order ID</label>
          <div className="to-search-field">
            <Search size={18} />
            <input id="to-id" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="e.g. AF102345" autoComplete="off" spellCheck={false} />
            <button className="cta" type="submit"><span>Track</span><i className="cta-icon cta-arrow"><ArrowRight size={15} /></i></button>
          </div>
          <div className="to-chips">
            {recent.length > 0 && <span>Your recent orders:</span>}
            {recent.map(order => <button type="button" key={order.id} onClick={() => search(order.id)}>#{order.id}</button>)}
            {recent.length === 0 && <><span>No order yet?</span><button type="button" onClick={() => search(sampleOrder().id)}>Try a sample order</button></>}
          </div>
        </form>
      </div>
    </section>

    <section className="to-body page-width" aria-live="polite">
      {lookup.state === "idle" && <div className="to-help-grid">
        {[
          { icon: ReceiptText, title: "Find your order ID", text: "It starts with AF and is shown on your confirmation screen and WhatsApp message." },
          { icon: Clock, title: "Updates in real time", text: "Every step, from confirmation call to doorstep delivery, shows up here." },
          { icon: Truck, title: "Delivery in 2–3 days", text: "Inside Dhaka within 48 hours. Cash on delivery across Bangladesh." },
        ].map(item => <article key={item.title}><i><item.icon size={20} /></i><h3>{item.title}</h3><p>{item.text}</p></article>)}
      </div>}

      {lookup.state === "missing" && <div className="to-missing">
        <i><SearchX size={28} /></i>
        <h2>We couldn&apos;t find order #{lookup.id}</h2>
        <p>Check the ID on your confirmation message and try again. Orders placed by phone or on another device can be tracked by our team — just message us.</p>
        <div className="to-missing-actions">
          <a className="cta cta-whatsapp" href={`https://wa.me/8801327406605?text=${encodeURIComponent(`Hello Amzad Food, please help me track order #${lookup.id}.`)}`} target="_blank" rel="noreferrer"><span>Ask on WhatsApp</span><i className="cta-icon"><FontAwesomeIcon icon={faWhatsapp} fontSize={16} /></i></a>
          <button type="button" className="to-link" onClick={() => search(sampleOrder().id)}>View a sample order</button>
        </div>
      </div>}

      {lookup.state === "found" && (() => {
        const { order } = lookup;
        const current = stepIndexFor(order);
        const done = current === steps.length - 1;
        const itemCount = order.items.reduce((sum, item) => sum + item.qty, 0);
        return <div className="to-result">
          <article className="to-status">
            <header>
              <div>
                <small>Order</small>
                <h2>#{order.id} <button type="button" onClick={() => copyId(order.id)} aria-label="Copy order ID">{copied ? <CheckCircle2 size={15} /> : <Copy size={15} />}</button></h2>
                <p>Placed {formatTime(order.placedAt)} · {itemCount} item{itemCount === 1 ? "" : "s"} · {taka(order.total)}</p>
              </div>
              <div className={done ? "to-badge done" : "to-badge"}><span />{steps[current].label}</div>
            </header>
            <ol className="to-steps" style={{ "--progress": current / (steps.length - 1) } as React.CSSProperties}>
              {steps.map((step, index) => <li key={step.key} className={index < current ? "done" : index === current ? "current" : ""}>
                <i><step.icon size={18} /></i>
                <b>{step.label}</b>
                <small>{index <= current ? (index === 0 ? formatTime(order.placedAt) : formatTime(order.placedAt + step.after)) : step.note}</small>
              </li>)}
            </ol>
            <div className="to-eta">
              <Truck size={20} />
              <div><small>{done ? "Delivered" : "Estimated delivery"}</small><strong>{done ? formatTime(order.placedAt + steps[steps.length - 1].after) : order.eta}</strong></div>
              <span>Cash on delivery · pay {taka(order.total)} at your door</span>
            </div>
          </article>

          <div className="to-grid">
            <article className="to-card">
              <h3>Items in this order</h3>
              <ul className="to-items">{order.items.map(item => <li key={item.name}>
                <img src={item.image} alt="" />
                <div><b>{item.name}</b><small>Qty {item.qty} × {taka(item.price)}</small></div>
                <strong>{taka(item.qty * item.price)}</strong>
              </li>)}</ul>
              <dl className="to-total">
                <div><dt>Delivery</dt><dd>{order.deliveryFee ? taka(order.deliveryFee) : "Free"}</dd></div>
                <div className="grand"><dt>Total</dt><dd>{taka(order.total)}</dd></div>
              </dl>
            </article>

            <div className="to-side">
              <article className="to-card">
                <h3>Delivery details</h3>
                <ul className="to-details">
                  <li><UserRound size={16} /><span><small>Receiver</small>{order.name}</span></li>
                  <li><Phone size={16} /><span><small>Phone</small>{order.phone}</span></li>
                  <li><MapPin size={16} /><span><small>Address</small>{order.address}</span></li>
                </ul>
              </article>
              <article className="to-card to-support">
                <h3>Need help with this order?</h3>
                <p>Our team replies every day until 11pm.</p>
                <a className="cta cta-whatsapp cta-block" href={`https://wa.me/8801327406605?text=${encodeURIComponent(`Hello Amzad Food, I have a question about order #${order.id}.`)}`} target="_blank" rel="noreferrer"><span>Chat on WhatsApp</span><i className="cta-icon"><FontAwesomeIcon icon={faWhatsapp} fontSize={16} /></i></a>
                <a className="cta cta-light cta-block" href="tel:+8809613824071"><span>Call 09613824071</span><i className="cta-icon"><Phone size={15} /></i></a>
              </article>
            </div>
          </div>
        </div>;
      })()}
    </section>
  </main>}</Storefront>;
}
