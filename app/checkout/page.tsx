"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Banknote, Check, CheckCircle2, ChevronDown, Clock, CreditCard, Lock, MapPin, Minus, PackageCheck, Phone, Plus, ShieldCheck, ShoppingBag, Smartphone, Tag, Trash2, Truck, X } from "lucide-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import { CartItem, loadCart, saveCart } from "../lib/cart";

type Fields = { name: string; phone: string; email: string; address: string; area: string; district: string; notes: string };
type Errors = Partial<Record<keyof Fields, string>>;
type AddressType = "Home" | "Office";
type Promo = { label: string; note: string; type: "percent" | "flat" | "shipping"; value: number; min?: number };
type Order = { id: string; items: CartItem[]; subtotal: number; discount: number; deliveryFee: number; total: number; details: Fields; addressType: AddressType; promoCode: string | null; eta: string; placedAt: string };

const emptyFields: Fields = { name: "", phone: "", email: "", address: "", area: "", district: "", notes: "" };
const DELIVERY_FEE = 60;
const MAX_QTY = 20;
const WHATSAPP_NUMBER = "8801327406605";

const promoCodes: Record<string, Promo> = {
  WELCOME10: { label: "10% off your order", note: "10% off", type: "percent", value: 10 },
  AMZAD50: { label: "৳50 off your order", note: "৳50 off over ৳500", type: "flat", value: 50, min: 500 },
  FREESHIP: { label: "Free delivery", note: "Free delivery over ৳1000", type: "shipping", value: 0, min: 1000 },
};

const districts = ["Bagerhat", "Bandarban", "Barguna", "Barishal", "Bhola", "Bogura", "Brahmanbaria", "Chandpur", "Chapainawabganj", "Chattogram", "Chuadanga", "Cox's Bazar", "Cumilla", "Dhaka", "Dinajpur", "Faridpur", "Feni", "Gaibandha", "Gazipur", "Gopalganj", "Habiganj", "Jamalpur", "Jashore", "Jhalokati", "Jhenaidah", "Joypurhat", "Khagrachhari", "Khulna", "Kishoreganj", "Kurigram", "Kushtia", "Lakshmipur", "Lalmonirhat", "Madaripur", "Magura", "Manikganj", "Meherpur", "Moulvibazar", "Munshiganj", "Mymensingh", "Naogaon", "Narail", "Narayanganj", "Narsingdi", "Natore", "Netrokona", "Nilphamari", "Noakhali", "Pabna", "Panchagarh", "Patuakhali", "Pirojpur", "Rajbari", "Rajshahi", "Rangamati", "Rangpur", "Satkhira", "Shariatpur", "Sherpur", "Sirajganj", "Sunamganj", "Sylhet", "Tangail", "Thakurgaon"];

const paymentOptions = [
  { key: "cod", label: "Cash on Delivery", note: "Pay in cash when your order arrives", icon: Banknote, enabled: true },
  { key: "bkash", label: "bKash", note: "Coming soon", icon: Smartphone, enabled: false },
  { key: "nagad", label: "Nagad", note: "Coming soon", icon: Smartphone, enabled: false },
  { key: "card", label: "Credit / Debit Card", note: "Coming soon", icon: CreditCard, enabled: false },
];

const nextSteps = [
  { icon: Phone, title: "We confirm by phone", note: "Our team calls you to confirm the order and address." },
  { icon: PackageCheck, title: "Packed with care", note: "Your items are quality checked and sealed for freshness." },
  { icon: Truck, title: "Delivered to your door", note: "Pay in cash when the order arrives." },
];

const fieldOrder: (keyof Fields)[] = ["name", "phone", "email", "address", "area", "district"];

/** Two to three delivery days out, skipping Fridays (no courier deliveries). */
function deliveryWindow(from = new Date()) {
  const addDays = (days: number) => {
    const date = new Date(from);
    let added = 0;
    while (added < days) {
      date.setDate(date.getDate() + 1);
      if (date.getDay() !== 5) added += 1;
    }
    return date;
  };
  const format = (date: Date) => date.toLocaleDateString("en-GB", { weekday: "short", day: "numeric", month: "short" });
  return `${format(addDays(2))} – ${format(addDays(3))}`;
}

function validate(fields: Fields): Errors {
  const errors: Errors = {};
  if (fields.name.trim().length < 3) errors.name = "Enter your full name";
  if (!/^(?:\+?88)?01[3-9]\d{8}$/.test(fields.phone.replace(/[\s-]/g, ""))) errors.phone = "Enter a valid mobile number, e.g. 01712345678";
  if (fields.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email.trim())) errors.email = "Enter a valid email address";
  if (fields.address.trim().length < 6) errors.address = "Enter your house, road and block details";
  if (!fields.area.trim()) errors.area = "Enter your area or thana";
  if (!fields.district) errors.district = "Select your district";
  return errors;
}

function Field({ id, label, error, optional, hint, children }: { id: string; label: string; error?: string; optional?: boolean; hint?: string; children: React.ReactNode }) {
  return <div className={error ? "co-field has-error" : "co-field"}>
    <label htmlFor={id}>{label}{optional && <em>Optional</em>}</label>
    {children}
    {error ? <span className="co-error" role="alert">{error}</span> : hint ? <span className="co-hint">{hint}</span> : null}
  </div>;
}

function Steps({ current }: { current: 2 | 3 }) {
  const steps = ["Cart", "Your details", "Confirmation"];
  return <ol className="co-steps" aria-label="Checkout progress">
    {steps.map((label, index) => {
      const number = index + 1;
      const done = number < current || (current === 3 && number === 3);
      return <li key={label} className={done ? "done" : number === current ? "active" : ""} aria-current={number === current ? "step" : undefined}>
        <span>{done ? <Check size={13} /> : number}</span>{label}
      </li>;
    })}
  </ol>;
}

function Header() {
  return <header className="co-header"><div className="co-header-inner page-width">
    <Link className="brand amzad-brand" href="/"><span className="brand-wordmark"><b>amzad</b> <strong>food</strong></span></Link>
    <span className="co-secure"><Lock size={13} /> Secure checkout</span>
  </div></header>;
}

export default function CheckoutPage() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [fields, setFields] = useState<Fields>(emptyFields);
  const [addressType, setAddressType] = useState<AddressType>("Home");
  const [errors, setErrors] = useState<Errors>({});
  const [promoInput, setPromoInput] = useState("");
  const [appliedCode, setAppliedCode] = useState<string | null>(null);
  const [promoError, setPromoError] = useState("");
  const [eta, setEta] = useState("");
  const [order, setOrder] = useState<Order | null>(null);
  const [summaryOpen, setSummaryOpen] = useState(false);

  useEffect(() => { setCart(loadCart()); setEta(deliveryWindow()); }, []);

  const updateField = (field: keyof Fields, value: string) => {
    setFields((current) => ({ ...current, [field]: value }));
    if (errors[field]) setErrors((current) => ({ ...current, [field]: undefined }));
  };
  const updateCart = (next: CartItem[]) => { setCart(next); saveCart(next); };
  const changeQty = (name: string, delta: number) => updateCart(cart.map((item) => item.name === name ? { ...item, qty: Math.min(MAX_QTY, item.qty + delta) } : item).filter((item) => item.qty > 0));
  const removeItem = (name: string) => updateCart(cart.filter((item) => item.name !== name));

  const itemCount = cart.reduce((sum, item) => sum + item.qty, 0);
  const subtotal = cart.reduce((sum, item) => sum + item.qty * item.price, 0);
  const promo = appliedCode ? promoCodes[appliedCode] : undefined;
  const promoActive = !!promo && subtotal >= (promo.min ?? 0);
  const discount = promo && promoActive ? (promo.type === "percent" ? Math.round(subtotal * promo.value / 100) : promo.type === "flat" ? Math.min(promo.value, subtotal) : 0) : 0;
  const baseDelivery = cart.length > 0 ? DELIVERY_FEE : 0;
  const deliveryFee = promo && promoActive && promo.type === "shipping" ? 0 : baseDelivery;
  const total = subtotal - discount + deliveryFee;
  const savings = discount + (baseDelivery - deliveryFee);

  const applyPromo = (rawCode: string) => {
    const code = rawCode.trim().toUpperCase();
    if (!code) { setPromoError("Enter a promo code"); return; }
    const match = promoCodes[code];
    if (!match) { setPromoError("This promo code isn't valid"); return; }
    if (subtotal < (match.min ?? 0)) { setPromoError(`Add ৳${(match.min ?? 0) - subtotal} more to use ${code}`); return; }
    setAppliedCode(code);
    setPromoInput("");
    setPromoError("");
  };
  const removePromo = () => { setAppliedCode(null); setPromoError(""); };

  const submit = (event: React.FormEvent) => {
    event.preventDefault();
    if (cart.length === 0) return;
    const nextErrors = validate(fields);
    setErrors(nextErrors);
    const firstInvalid = fieldOrder.find((field) => nextErrors[field]);
    if (firstInvalid) {
      const element = document.getElementById(`co-${firstInvalid}`);
      element?.scrollIntoView({ behavior: "smooth", block: "center" });
      element?.focus({ preventScroll: true });
      return;
    }
    setOrder({
      id: `AF${String(Date.now()).slice(-6)}`,
      items: cart, subtotal, discount, deliveryFee, total,
      details: { ...fields, name: fields.name.trim(), phone: fields.phone.trim(), email: fields.email.trim(), address: fields.address.trim(), area: fields.area.trim(), notes: fields.notes.trim() },
      addressType, promoCode: promoActive ? appliedCode : null, eta,
      placedAt: new Date().toLocaleString("en-GB", { day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" }),
    });
    updateCart([]);
    window.scrollTo({ top: 0 });
  };

  if (order) {
    const { details } = order;
    const whatsappText = encodeURIComponent([
      `Hello Amzad Food, I placed order #${order.id}.`,
      "",
      ...order.items.map((item) => `• ${item.qty} × ${item.name} — ৳${item.qty * item.price}`),
      "",
      `Total (Cash on Delivery): ৳${order.total}`,
      `Name: ${details.name}`,
      `Phone: ${details.phone}`,
      `Address: ${details.address}, ${details.area}, ${details.district}`,
      details.notes ? `Notes: ${details.notes}` : "",
    ].filter((line, index, lines) => line !== "" || lines[index - 1] !== "").join("\n"));
    return <>
      <Header />
      <main className="checkout-page page-width">
        <div className="co-steps-center"><Steps current={3} /></div>
        <div className="co-success">
          <div className="co-success-head">
            <span className="co-success-icon"><CheckCircle2 size={40} /></span>
            <h1>Order Confirmed!</h1>
            <p>Thank you, <strong>{details.name}</strong>. Your order has been placed successfully.</p>
            <span className="co-order-id">Order <b>#{order.id}</b></span>
          </div>

          <div className="co-success-grid">
            <section className="co-card">
              <h2 className="co-card-title">Order details</h2>
              <ul className="co-receipt">{order.items.map((item) => <li key={item.name}>
                <img src={item.image} alt="" />
                <div><strong>{item.name}</strong><span>Qty {item.qty} × ৳{item.price}</span></div>
                <b>৳{item.qty * item.price}</b>
              </li>)}</ul>
              <div className="co-lines">
                <div><span>Subtotal</span><span>৳{order.subtotal}</span></div>
                {order.discount > 0 && <div className="co-discount"><span>Discount ({order.promoCode})</span><span>−৳{order.discount}</span></div>}
                <div><span>Delivery</span><span>{order.deliveryFee === 0 ? "Free" : `৳${order.deliveryFee}`}</span></div>
                <div className="co-total"><span>Total to pay</span><span>৳{order.total}</span></div>
              </div>
              <p className="co-pay-note"><Banknote size={15} /> Cash on Delivery — please keep ৳{order.total} ready.</p>
            </section>

            <div className="co-success-side">
              <section className="co-card">
                <h2 className="co-card-title">Delivery information</h2>
                <dl className="co-details">
                  <div><dt>Deliver to</dt><dd>{details.name}</dd></div>
                  <div><dt>Phone</dt><dd>{details.phone}</dd></div>
                  {details.email && <div><dt>Email</dt><dd>{details.email}</dd></div>}
                  <div><dt>Address</dt><dd>{details.address}, {details.area}, {details.district} <small>({order.addressType})</small></dd></div>
                  {details.notes && <div><dt>Notes</dt><dd>{details.notes}</dd></div>}
                  <div><dt>Placed on</dt><dd>{order.placedAt}</dd></div>
                </dl>
                <div className="co-eta"><Truck size={18} /><div><small>Estimated delivery</small><strong>{order.eta}</strong></div></div>
              </section>
              <a className="co-whatsapp cta cta-whatsapp" href={`https://wa.me/${WHATSAPP_NUMBER}?text=${whatsappText}`} target="_blank" rel="noreferrer"><span>Send order details on WhatsApp</span><i className="cta-icon"><FontAwesomeIcon icon={faWhatsapp} fontSize={17} /></i></a>
              <Link className="co-secondary" href="/">Continue Shopping <ArrowRight size={14} /></Link>
            </div>
          </div>

          <section className="co-next">
            <h2 className="co-card-title">What happens next</h2>
            <ol>{nextSteps.map((step, index) => <li key={step.title}><span><step.icon size={18} /></span><div><strong>{index + 1}. {step.title}</strong><p>{step.note}</p></div></li>)}</ol>
          </section>
        </div>
      </main>
    </>;
  }

  return <>
    <Header />
    <main className="checkout-page page-width">
      <Link className="checkout-back" href="/"><ArrowLeft size={15} /> Back to shop</Link>
      <div className="co-title-row">
        <h1>Checkout</h1>
        <Steps current={2} />
      </div>

      {cart.length === 0 ? <div className="co-empty">
        <span><ShoppingBag size={34} /></span>
        <h2>Your cart is empty</h2>
        <p>Add some products to your cart and they will show up here.</p>
        <Link className="cta" href="/"><span>Browse products</span><i className="cta-icon"><ShoppingBag size={15} /></i></Link>
      </div> : <div className="co-grid">
        <form className="co-form" id="checkout-form" onSubmit={submit} noValidate>
          <section className="co-card">
            <div className="co-card-head"><span className="co-num">1</span><div><h2>Contact information</h2><p>We will call this number to confirm your order.</p></div></div>
            <div className="co-row">
              <Field id="co-name" label="Full name" error={errors.name}>
                <input id="co-name" value={fields.name} onChange={(event) => updateField("name", event.target.value)} placeholder="e.g. Rahim Uddin" autoComplete="name" aria-invalid={!!errors.name} />
              </Field>
              <Field id="co-phone" label="Mobile number" error={errors.phone}>
                <input id="co-phone" type="tel" inputMode="tel" value={fields.phone} onChange={(event) => updateField("phone", event.target.value)} placeholder="01XXXXXXXXX" autoComplete="tel" aria-invalid={!!errors.phone} />
              </Field>
            </div>
            <Field id="co-email" label="Email address" optional error={errors.email} hint="For your order receipt">
              <input id="co-email" type="email" value={fields.email} onChange={(event) => updateField("email", event.target.value)} placeholder="you@example.com" autoComplete="email" aria-invalid={!!errors.email} />
            </Field>
          </section>

          <section className="co-card">
            <div className="co-card-head"><span className="co-num">2</span><div><h2>Delivery address</h2><p>Where should we deliver your order?</p></div></div>
            <Field id="co-address" label="Full address" error={errors.address}>
              <textarea id="co-address" value={fields.address} onChange={(event) => updateField("address", event.target.value)} placeholder="House / flat no., road, block, landmark" rows={3} autoComplete="street-address" aria-invalid={!!errors.address} />
            </Field>
            <div className="co-row">
              <Field id="co-area" label="Area / Thana" error={errors.area}>
                <input id="co-area" value={fields.area} onChange={(event) => updateField("area", event.target.value)} placeholder="e.g. Dhanmondi" autoComplete="address-level3" aria-invalid={!!errors.area} />
              </Field>
              <Field id="co-district" label="District" error={errors.district}>
                <div className="co-select">
                  <select id="co-district" value={fields.district} onChange={(event) => updateField("district", event.target.value)} autoComplete="address-level2" aria-invalid={!!errors.district}>
                    <option value="">Select district</option>
                    {districts.map((district) => <option key={district} value={district}>{district}</option>)}
                  </select>
                  <ChevronDown size={16} />
                </div>
              </Field>
            </div>
            <div className="co-field">
              <span className="co-label">Address type</span>
              <div className="co-segment" role="radiogroup" aria-label="Address type">
                {(["Home", "Office"] as AddressType[]).map((type) => <button type="button" key={type} role="radio" aria-checked={addressType === type} className={addressType === type ? "active" : ""} onClick={() => setAddressType(type)}><MapPin size={14} /> {type}</button>)}
              </div>
            </div>
            <Field id="co-notes" label="Order notes" optional hint="Delivery instructions, preferred time, gate code…">
              <textarea id="co-notes" value={fields.notes} onChange={(event) => updateField("notes", event.target.value)} placeholder="Anything we should know?" rows={2} maxLength={300} />
            </Field>
          </section>

          <section className="co-card">
            <div className="co-card-head"><span className="co-num">3</span><div><h2>Payment method</h2><p>All transactions are safe and simple.</p></div></div>
            <div className="co-pay-grid" role="radiogroup" aria-label="Payment method">
              {paymentOptions.map((option) => <div key={option.key} role="radio" aria-checked={option.enabled} aria-disabled={!option.enabled} className={option.enabled ? "co-pay active" : "co-pay disabled"}>
                <span className="co-pay-icon"><option.icon size={18} /></span>
                <div><strong>{option.label}</strong><small>{option.note}</small></div>
                {option.enabled && <span className="co-pay-check"><Check size={13} /></span>}
              </div>)}
            </div>
          </section>

          <button className="co-place co-place-desktop cta cta-lg cta-block" type="submit"><span>Place Order · ৳{total}</span><i className="cta-icon"><Lock size={16} /></i></button>
          <p className="co-legal">By placing your order, you agree to be contacted by our team to confirm delivery.</p>
        </form>

        <aside className="co-summary">
          <section className={summaryOpen ? "co-card co-summary-card open" : "co-card co-summary-card"}>
            <h2 className="co-summary-title"><button type="button" className="co-summary-head" onClick={() => setSummaryOpen((open) => !open)} aria-expanded={summaryOpen}>
              <span className="co-summary-name">Order Summary</span>
              <span className="co-summary-count">{itemCount} {itemCount === 1 ? "item" : "items"}</span>
              <span className="co-summary-mobile-total">৳{total}</span>
              <ChevronDown size={18} className="co-summary-chevron" />
            </button></h2>
            <div className="co-summary-body">
            <ul className="co-items">{cart.map((item) => <li key={item.name}>
              <div className="co-item-img"><img src={item.image} alt="" /><b>{item.qty}</b></div>
              <div className="co-item-info">
                <strong>{item.name}</strong>
                <span>৳{item.price} each</span>
                <div className="co-qty">
                  <button type="button" onClick={() => changeQty(item.name, -1)} aria-label={`Decrease ${item.name} quantity`}><Minus size={12} /></button>
                  <b>{item.qty}</b>
                  <button type="button" onClick={() => changeQty(item.name, 1)} disabled={item.qty >= MAX_QTY} aria-label={`Increase ${item.name} quantity`}><Plus size={12} /></button>
                </div>
              </div>
              <div className="co-item-side">
                <strong>৳{item.qty * item.price}</strong>
                <button type="button" onClick={() => removeItem(item.name)} aria-label={`Remove ${item.name}`}><Trash2 size={14} /></button>
              </div>
            </li>)}</ul>

            <div className="co-promo">
              <h3><Tag size={14} /> Promo code</h3>
              {promo && appliedCode ? <div className={promoActive ? "co-promo-applied" : "co-promo-applied inactive"}>
                <span className="co-promo-icon"><Check size={14} /></span>
                <div><strong>{appliedCode}</strong><small>{promoActive ? `${promo.label} applied` : `Spend ৳${promo.min} to use this code — add ৳${(promo.min ?? 0) - subtotal} more`}</small></div>
                <button type="button" onClick={removePromo} aria-label="Remove promo code"><X size={14} /></button>
              </div> : <>
                <div className={promoError ? "co-promo-form has-error" : "co-promo-form"}>
                  <input value={promoInput} onChange={(event) => { setPromoInput(event.target.value); setPromoError(""); }} onKeyDown={(event) => { if (event.key === "Enter") { event.preventDefault(); applyPromo(promoInput); } }} placeholder="Enter code" aria-label="Promo code" aria-invalid={!!promoError} autoCapitalize="characters" spellCheck={false} />
                  <button type="button" onClick={() => applyPromo(promoInput)}>Apply</button>
                </div>
                {promoError && <span className="co-error" role="alert">{promoError}</span>}
                <div className="co-promo-chips">{Object.entries(promoCodes).map(([code, item]) => <button type="button" key={code} onClick={() => applyPromo(code)} title={`Apply ${code}`}><b>{code}</b><small>{item.note}</small></button>)}</div>
              </>}
            </div>

            <div className="co-lines">
              <div><span>Subtotal</span><span>৳{subtotal}</span></div>
              {discount > 0 && <div className="co-discount"><span>Discount ({appliedCode})</span><span>−৳{discount}</span></div>}
              <div><span>Delivery</span><span>{deliveryFee === 0 ? <><s>৳{baseDelivery}</s> <em>Free</em></> : `৳${deliveryFee}`}</span></div>
              <div className="co-total"><span>Total</span><span>৳{total}</span></div>
            </div>
            {savings > 0 && <p className="co-savings">🎉 You&apos;re saving ৳{savings} on this order</p>}

            <div className="co-eta"><Truck size={18} /><div><small>Estimated delivery</small><strong>{eta || "2–3 business days"}</strong></div></div>
            </div>
          </section>

          <section className="co-card co-assure">
            <ul>
              <li><ShieldCheck size={17} /><div><strong>100% authentic products</strong><small>Quality checked before packing</small></div></li>
              <li><Clock size={17} /><div><strong>Delivery in 2–3 business days</strong><small>Across Bangladesh</small></div></li>
              <li><Banknote size={17} /><div><strong>Pay when you receive</strong><small>Cash on Delivery on every order</small></div></li>
            </ul>
            <div className="co-help">
              <strong>Need help with your order?</strong>
              <div>
                <a href="tel:+8809613824071"><Phone size={14} /> 09613824071</a>
                <a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noreferrer"><FontAwesomeIcon icon={faWhatsapp} fontSize={14} /> 01327406605</a>
              </div>
            </div>
          </section>
        </aside>
      </div>}
    </main>

    {cart.length > 0 && <div className="co-mobilebar">
      <div><small>Total to pay</small><strong>৳{total}</strong></div>
      <button className="co-place cta" type="submit" form="checkout-form"><span>Place Order</span><i className="cta-icon"><Lock size={15} /></i></button>
    </div>}
  </>;
}
