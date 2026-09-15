"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, CheckCircle2, ShoppingBag } from "lucide-react";
import { CartItem, loadCart, saveCart } from "../lib/cart";

type FormState = { name: string; phone: string; address: string; district: string; notes: string };
const emptyForm: FormState = { name: "", phone: "", address: "", district: "", notes: "" };

export default function CheckoutPage() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [form, setForm] = useState<FormState>(emptyForm);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [order, setOrder] = useState<{ id: string; total: number } | null>(null);

  useEffect(() => { setCart(loadCart()); }, []);

  const updateField = (field: keyof FormState, value: string) => setForm((current) => ({ ...current, [field]: value }));

  const changeQty = (name: string, delta: number) => setCart((items) => {
    const next = items.map((item) => item.name === name ? { ...item, qty: item.qty + delta } : item).filter((item) => item.qty > 0);
    saveCart(next);
    return next;
  });
  const removeItem = (name: string) => setCart((items) => {
    const next = items.filter((item) => item.name !== name);
    saveCart(next);
    return next;
  });

  const subtotal = cart.reduce((sum, item) => sum + item.qty * item.price, 0);
  const deliveryFee = cart.length > 0 ? 60 : 0;
  const total = subtotal + deliveryFee;

  const submit = (event: React.FormEvent) => {
    event.preventDefault();
    const nextErrors: Partial<Record<keyof FormState, string>> = {};
    if (!form.name.trim()) nextErrors.name = "Enter your full name";
    if (!/^[0-9+\s-]{7,}$/.test(form.phone.trim())) nextErrors.phone = "Enter a valid phone number";
    if (!form.address.trim()) nextErrors.address = "Enter your delivery address";
    if (!form.district.trim()) nextErrors.district = "Enter your district";
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0 || cart.length === 0) return;
    const id = `AF${Math.floor(10000 + Math.random() * 89999)}`;
    setOrder({ id, total });
    saveCart([]);
  };

  if (order) {
    return <main className="checkout-page page-width">
      <div className="checkout-success">
        <span className="checkout-success-icon"><CheckCircle2 size={38} /></span>
        <h1>Order Confirmed!</h1>
        <p>Thank you, {form.name}. Your order <strong>#{order.id}</strong> has been placed.</p>
        <p className="checkout-success-note">We&apos;ll call {form.phone} to confirm delivery to {form.address}, {form.district}. Expected delivery within 2-3 business days. Please pay ৳{order.total} on delivery (Cash on Delivery).</p>
        <Link className="primary-button" href="/">Continue Shopping <ArrowRight size={14} /></Link>
      </div>
    </main>;
  }

  return <main className="checkout-page page-width">
    <Link className="checkout-back" href="/"><ArrowLeft size={15} /> Back to shop</Link>
    <h1>Checkout</h1>
    {cart.length === 0 ? <div className="checkout-empty"><ShoppingBag size={36} /><p>Your cart is empty.</p><Link className="primary-button" href="/">Browse products <ArrowRight size={14} /></Link></div> : <div className="checkout-grid">
      <form className="checkout-form" onSubmit={submit} noValidate>
        <h2>Delivery Details</h2>
        <label>Full Name{errors.name && <span className="field-error">{errors.name}</span>}<input value={form.name} onChange={(event) => updateField("name", event.target.value)} placeholder="Your full name" /></label>
        <label>Phone Number{errors.phone && <span className="field-error">{errors.phone}</span>}<input value={form.phone} onChange={(event) => updateField("phone", event.target.value)} placeholder="01XXXXXXXXX" /></label>
        <label>Delivery Address{errors.address && <span className="field-error">{errors.address}</span>}<textarea value={form.address} onChange={(event) => updateField("address", event.target.value)} placeholder="House, road, area" rows={3} /></label>
        <label>District{errors.district && <span className="field-error">{errors.district}</span>}<input value={form.district} onChange={(event) => updateField("district", event.target.value)} placeholder="e.g. Dhaka" /></label>
        <label>Order Notes (optional)<textarea value={form.notes} onChange={(event) => updateField("notes", event.target.value)} placeholder="Any delivery instructions" rows={2} /></label>
        <div className="checkout-payment"><strong>Payment Method</strong><label className="checkout-radio"><input type="radio" checked readOnly /> Cash on Delivery</label></div>
        <button className="primary-button checkout-submit" type="submit">Place Order <ArrowRight size={14} /></button>
      </form>
      <aside className="checkout-summary">
        <h2>Order Summary</h2>
        <ul>{cart.map((item) => <li key={item.name}>
          <img src={item.image} alt={item.name} />
          <div className="checkout-item-info"><strong>{item.name}</strong><span>৳{item.price} × {item.qty}</span></div>
          <div className="checkout-item-actions"><button type="button" onClick={() => changeQty(item.name, -1)} aria-label={`Decrease ${item.name} quantity`}>-</button><b>{item.qty}</b><button type="button" onClick={() => changeQty(item.name, 1)} aria-label={`Increase ${item.name} quantity`}>+</button><button type="button" className="checkout-remove" onClick={() => removeItem(item.name)} aria-label={`Remove ${item.name}`}>×</button></div>
        </li>)}</ul>
        <div className="checkout-line"><span>Subtotal</span><span>৳{subtotal}</span></div>
        <div className="checkout-line"><span>Delivery</span><span>৳{deliveryFee}</span></div>
        <div className="checkout-line checkout-total"><span>Total</span><span>৳{total}</span></div>
      </aside>
    </div>}
  </main>;
}
