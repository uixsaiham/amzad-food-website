"use client";

import Link from "next/link";
import { ChevronDown, ArrowRight, Phone, MessageCircle } from "lucide-react";
import Storefront from "./Storefront";
import { DELIVERY_FEE, FREE_DELIVERY_MINIMUM } from "../lib/offers";

const groups = [
  { title: "Orders & payments", items: [
    { question: "How do I place an order?", answer: <>Browse <Link href="/products/">All Products</Link>, choose your product and size, and add it to your cart. Open checkout, enter your delivery details and follow the instructions to confirm your order. You can also contact us on WhatsApp for help.</> },
    { question: "How can I pay for my order?", answer: <>Cash on Delivery is available at checkout. Check the payment options shown there before confirming your order. Contact our team if you need help with payment.</> },
    { question: "How do I use a promo code?", answer: <>Enter your code in the promo code field at checkout and apply it. Valid discounts appear in your order summary. Some offers have a minimum order value; checkout will tell you if your order qualifies.</> },
    { question: "Can I change or cancel an order?", answer: <>Contact us as soon as possible with your order ID and the change you need. Our team will check the order’s status and confirm what is possible before dispatch.</> },
  ] },
  { title: "Delivery & tracking", items: [
    { question: "How much does delivery cost?", answer: <>The standard delivery charge is ৳{DELIVERY_FEE}. Delivery is automatically free when your merchandise subtotal reaches ৳{FREE_DELIVERY_MINIMUM.toLocaleString("en-IN")}. Check your final delivery charge in the checkout summary.</> },
    { question: "When will my order arrive?", answer: <>Checkout shows an estimated delivery window for your order. Actual arrival can vary with your location, courier availability and holidays. Contact us with your order ID for an update.</> },
    { question: "How can I track my order?", answer: <>Visit <Link href="/track-order/">Track Order</Link> and enter your order ID. You can also find saved orders in <Link href="/my-orders/">My Orders</Link> on the device you used to order. If your order is not listed, contact our team for help.</> },
    { question: "What if I receive a damaged or incorrect product?", answer: <>Contact us promptly with your order ID, a description of the issue and clear photos of the product and packaging. Keep the packaging while our team checks the issue and helps you with the next steps.</> },
  ] },
  { title: "Products & support", items: [
    { question: "Where can I find product sizes and ingredients?", answer: <>Open the product details page to see available sizes and the Ingredients & Nutrition section. Check the product label for the exact ingredients, storage directions and expiry date. Ask our team if you need clarification before ordering.</> },
    { question: "How should I store my products?", answer: <>Follow the storage instructions on the product’s label. Many pantry products should be kept tightly sealed in a cool, dry place away from sunlight. Storage needs can differ after opening.</> },
    { question: "Can I order a combo pack or a gift?", answer: <>Explore <Link href="/products/?category=Combo%20Packs">Combo Packs</Link> for available bundles. Contact us on WhatsApp to discuss gifting, quantities or any special packaging requests before placing your order.</> },
    { question: "How can I contact Amzad Food?", answer: <>Message us on <a href="https://wa.me/8801327406605" target="_blank" rel="noreferrer">WhatsApp at 01327406605</a> or call <a href="tel:+8809613824071">09613824071</a>. Include your order ID if your question is about an existing order.</> },
  ] },
];

export default function FAQPage() {
  return <Storefront>{() => <div className="faq-page page-width">
    <nav className="pd-breadcrumb" aria-label="Breadcrumb"><Link href="/">Home</Link><span aria-hidden="true">/</span><span aria-current="page">FAQ</span></nav>
    <header className="faq-heading"><span className="pd-eyebrow">A LITTLE HELP, WHEN YOU NEED IT</span><h1>Frequently asked <em>questions.</em></h1><p>From your first order to your next favourite — find the answers here.</p></header>
    <div className="faq-layout">
      <div className="faq-groups">{groups.map((group, index) => <section className="faq-group" key={group.title} aria-labelledby={`faq-group-${index}`}><h2 id={`faq-group-${index}`}>{group.title}</h2>{group.items.map(item => <details className="faq-item" key={item.question}><summary><span>{item.question}</span><ChevronDown size={18} aria-hidden="true" /></summary><div className="faq-answer"><p>{item.answer}</p></div></details>)}</section>)}</div>
      <aside className="faq-support"><MessageCircle size={28} aria-hidden="true" /><span className="pd-eyebrow">WE’RE HERE TO HELP</span><h2>Still have a question?</h2><p>Talk to our team for help with your order or choosing a product.</p><a className="faq-whatsapp" href="https://wa.me/8801327406605" target="_blank" rel="noreferrer">Chat on WhatsApp <ArrowRight size={17} /></a><a className="faq-phone" href="tel:+8809613824071"><Phone size={16} />09613824071</a></aside>
    </div>
  </div>}</Storefront>;
}
