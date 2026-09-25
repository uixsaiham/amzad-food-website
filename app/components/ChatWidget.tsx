"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Headset, Leaf, MessageCircle, Phone, SendHorizontal, X } from "lucide-react";
import { productSlug, storeProducts, type Product } from "../lib/products";
import { findOrder, loadOrders, sampleOrder } from "../lib/orders";
import "./chat-widget.css";

// Scripted help desk: answers common questions in the browser and hands off to WhatsApp or a call. There is no chat backend yet.
type Message = { id: number; from: "bot" | "user"; text: string; products?: Product[]; orderLink?: string; handoff?: boolean };

const quickReplies = ["অর্ডার ট্র্যাক করুন", "ডেলিভারি চার্জ", "পেমেন্ট পদ্ধতি", "খেজুর গুড় খুঁজছি", "প্রতিনিধির সাথে কথা"];
const HINT_KEY = "amzad-chat-hint-hidden";

const has = (text: string, words: string[]) => words.some(word => text.includes(word));
const bnDigits = (value: string | number) => String(value).replace(/\d/g, digit => "০১২৩৪৫৬৭৮৯"[Number(digit)]);

function searchProducts(text: string) {
  const words = text.toLowerCase().split(/[\s,.?!।]+/).filter(word => word.length > 1);
  return storeProducts
    .map(product => {
      const haystack = `${product.name} ${product.bn ?? ""} ${product.category}`.toLowerCase();
      return { product, score: words.filter(word => haystack.includes(word)).length };
    })
    .filter(match => match.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 3)
    .map(match => match.product);
}

function reply(input: string, awaitingOrder: boolean): { message: Omit<Message, "id" | "from">; awaitingOrder: boolean } {
  const text = input.toLowerCase().trim();
  const orderId = input.match(/#?\s*(af\s*-?\s*\d{4,})/i)?.[1].replace(/[\s-]/g, "");
  if (orderId || (awaitingOrder && /\d{4,}/.test(text))) {
    const id = orderId ?? text.match(/\d{4,}/)![0];
    const sample = sampleOrder();
    const order = findOrder(id) ?? findOrder(`AF${id}`) ?? ([sample.id, sample.id.slice(2)].includes(id.toUpperCase()) ? sample : undefined);
    if (!order) return { awaitingOrder: false, message: { text: `দুঃখিত, #${id.toUpperCase()} নম্বরের কোনো অর্ডার এই ডিভাইসে পাওয়া যায়নি। নম্বরটি আবার দেখে নিন, অথবা আমাদের প্রতিনিধির সাথে কথা বলুন।`, handoff: true } };
    const items = order.items.reduce((sum, item) => sum + item.qty, 0);
    return { awaitingOrder: false, message: { text: `অর্ডার #${order.id} পাওয়া গেছে — ${bnDigits(items)}টি পণ্য, মোট ৳${bnDigits(order.total.toLocaleString("en-IN"))}। আনুমানিক ডেলিভারি: ${order.eta}।`, orderLink: order.id } };
  }
  if (has(text, ["track", "ট্র্যাক", "অর্ডার", "order", "কোথায়"])) {
    const latest = loadOrders()[0];
    return { awaitingOrder: true, message: { text: latest ? `আপনার অর্ডার আইডি লিখুন (যেমন ${latest.id})। কনফার্মেশন মেসেজে আইডিটি পাবেন।` : "আপনার অর্ডার আইডি লিখুন (যেমন AF102345)। কনফার্মেশন মেসেজে আইডিটি পাবেন।" } };
  }
  if (has(text, ["delivery", "ডেলিভারি", "চার্জ", "shipping", "কতদিন", "কবে"])) {
    return { awaitingOrder, message: { text: "সারা বাংলাদেশে ডেলিভারি চার্জ ৳৬০, সময় লাগে ২–৩ কার্যদিবস। ৳১,০০০-এর বেশি অর্ডারে FREESHIP কোড দিলে ডেলিভারি ফ্রি।" } };
  }
  if (has(text, ["payment", "পেমেন্ট", "বিকাশ", "bkash", "নগদ", "nagad", "cod", "ক্যাশ", "টাকা"])) {
    return { awaitingOrder, message: { text: "এখন ক্যাশ অন ডেলিভারি চালু আছে — পণ্য হাতে পেয়ে টাকা দিন। বিকাশ, নগদ ও কার্ড পেমেন্ট শীঘ্রই আসছে।" } };
  }
  if (has(text, ["agent", "human", "প্রতিনিধি", "মানুষ", "কথা", "call", "কল", "whatsapp", "হোয়াটসঅ্যাপ", "return", "রিটার্ন", "সমস্যা", "অভিযোগ"])) {
    return { awaitingOrder, message: { text: "আমাদের প্রতিনিধি প্রতিদিন রাত ১১টা পর্যন্ত আছেন। হোয়াটসঅ্যাপে লিখুন বা সরাসরি কল করুন:", handoff: true } };
  }
  if (has(text, ["hi", "hello", "হাই", "হ্যালো", "সালাম", "salam", "assalam"])) {
    return { awaitingOrder, message: { text: "ওয়ালাইকুম আসসালাম! পণ্যের নাম লিখুন, অথবা নিচের যেকোনো বিষয় বেছে নিন।" } };
  }
  if (has(text, ["ধন্যবাদ", "thanks", "thank"])) {
    return { awaitingOrder, message: { text: "আপনাকেও ধন্যবাদ! আর কিছু লাগলে জানাবেন। 🌿" } };
  }
  const found = searchProducts(text.replace(/খুঁজছি|চাই|আছে|দাম|কত/g, " "));
  if (found.length) return { awaitingOrder, message: { text: "এগুলো আপনার পছন্দ হতে পারে:", products: found } };
  return { awaitingOrder, message: { text: "দুঃখিত, প্রশ্নটি ঠিক বুঝতে পারিনি। পণ্যের নাম লিখে দেখুন, অথবা আমাদের প্রতিনিধির সাথে কথা বলুন।", handoff: true } };
}

export default function ChatWidget() {
  const [view, setView] = useState<"closed" | "welcome" | "chat">("closed");
  const [hint, setHint] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [draft, setDraft] = useState("");
  const [typing, setTyping] = useState(false);
  const [awaitingOrder, setAwaitingOrder] = useState(false);
  const nextId = useRef(0);
  const bodyRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    let hidden = false;
    try { hidden = sessionStorage.getItem(HINT_KEY) === "1"; } catch {}
    if (hidden) return;
    const timer = window.setTimeout(() => setHint(true), 2500);
    return () => window.clearTimeout(timer);
  }, []);
  useEffect(() => {
    const frame = requestAnimationFrame(() => { const body = bodyRef.current; if (body) body.scrollTop = body.scrollHeight; });
    return () => cancelAnimationFrame(frame);
  }, [messages, typing, view]);
  useEffect(() => {
    if (view === "closed") return;
    const onKey = (event: KeyboardEvent) => { if (event.key === "Escape") setView("closed"); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [view]);

  const hideHint = () => { setHint(false); try { sessionStorage.setItem(HINT_KEY, "1"); } catch {} };
  const push = (message: Omit<Message, "id">) => setMessages(list => [...list, { ...message, id: nextId.current++ }]);
  const open = () => { hideHint(); setView(messages.length ? "chat" : "welcome"); };
  const startChat = () => {
    setView("chat");
    if (!messages.length) push({ from: "bot", text: "আসসালামু আলাইকুম! আমি আমজাদ ফুডের সহকারী। অর্ডার, ডেলিভারি বা পণ্য সম্পর্কে যা জানতে চান লিখুন।" });
    window.setTimeout(() => inputRef.current?.focus(), 250);
  };
  const send = (text: string) => {
    const value = text.trim();
    if (!value || typing) return;
    push({ from: "user", text: value });
    setDraft("");
    setTyping(true);
    const answer = reply(value, awaitingOrder);
    setAwaitingOrder(answer.awaitingOrder);
    window.setTimeout(() => { setTyping(false); push({ from: "bot", ...answer.message }); }, 700 + Math.min(value.length * 15, 600));
  };

  return <div className={`chat-widget${view !== "closed" ? " is-open" : ""}`}>
    {view !== "closed" && <section className="chat-panel" role="dialog" aria-label="Amzad Food chat support" lang="bn">
      {view === "welcome" ? <>
        <header className="chat-hero">
          <span className="chat-mark"><Leaf size={22} /></span>
          <h2>আসসালামু আলাইকুম,<small>আমজাদ ফুড-এ স্বাগতম!</small></h2>
          <p>আপনাকে কিভাবে সহযোগিতা করতে পারি?</p>
          <button className="chat-close" onClick={() => setView("closed")} aria-label="Close chat"><X size={16} /></button>
        </header>
        <div className="chat-welcome">
          <button className="chat-option" onClick={startChat}><span><MessageCircle size={18} /></span><b>Live Chat Support<small>আমাদের প্রতিনিধির সাথে কথা বলুন</small></b></button>
          <a className="chat-option" href="https://wa.me/8801327406605" target="_blank" rel="noreferrer"><span className="wa"><Phone size={17} /></span><b>WhatsApp<small>০১৩২৭৪০৬৬০৫ নম্বরে মেসেজ দিন</small></b></a>
          <button className="chat-start" onClick={startChat}>নতুন চ্যাট শুরু করুন</button>
          <p className="chat-note">সাধারণত ১–৫ মিনিটের মধ্যে উত্তর পাওয়া যায়</p>
        </div>
      </> : <>
        <header className="chat-bar">
          <button onClick={() => setView("welcome")} aria-label="Back"><ArrowLeft size={17} /></button>
          <span className="chat-mark small"><Leaf size={16} /></span>
          <div><strong>Amzad Food</strong><small><i />অনলাইন · রাত ১১টা পর্যন্ত</small></div>
          <button onClick={() => setView("closed")} aria-label="Close chat"><X size={17} /></button>
        </header>
        <div className="chat-body" ref={bodyRef} aria-live="polite">
          {messages.map(message => <div key={message.id} className={`chat-msg ${message.from}`}>
            <p>{message.text}</p>
            {message.products && <div className="chat-products">{message.products.map(product => <Link key={product.name} href={`/products/${productSlug(product.name)}/`} onClick={() => setView("closed")}>
              <img src={product.image} alt="" />
              <span><b>{product.bn ?? product.name}</b><small>৳{bnDigits(product.price.toLocaleString("en-IN"))}{product.unit ? ` · ${product.unit}` : ""}</small></span>
            </Link>)}</div>}
            {message.orderLink && <Link className="chat-action" href={`/track-order/?id=${message.orderLink}`} onClick={() => setView("closed")}>অর্ডারের বিস্তারিত দেখুন</Link>}
            {message.handoff && <div className="chat-handoff"><a href="https://wa.me/8801327406605" target="_blank" rel="noreferrer"><MessageCircle size={14} /> WhatsApp</a><a href="tel:+8809613824071"><Phone size={14} /> কল করুন</a></div>}
          </div>)}
          {typing && <div className="chat-msg bot"><p className="chat-typing" aria-label="Typing"><i /><i /><i /></p></div>}
        </div>
        <div className="chat-quick">{quickReplies.map(label => <button key={label} onClick={() => send(label)} disabled={typing}>{label}</button>)}</div>
        <form className="chat-input" onSubmit={(event) => { event.preventDefault(); send(draft); }}>
          <input ref={inputRef} value={draft} onChange={(event) => setDraft(event.target.value)} placeholder="আপনার প্রশ্ন লিখুন..." aria-label="Type your message" />
          <button type="submit" disabled={!draft.trim() || typing} aria-label="Send"><SendHorizontal size={17} /></button>
        </form>
      </>}
      <footer className="chat-foot">Powered by <b>Amzad Food</b></footer>
    </section>}
    {hint && view === "closed" && <div className="chat-hint">
      <button className="chat-hint-open" onClick={open}><Headset size={16} /> Need Help?</button>
      <button className="chat-hint-close" onClick={hideHint} aria-label="Dismiss help prompt"><X size={13} /></button>
    </div>}
    <button className="chat-launcher" onClick={() => (view === "closed" ? open() : setView("closed"))} aria-label={view === "closed" ? "Open chat support" : "Close chat support"} aria-expanded={view !== "closed"}>
      {view === "closed" ? <MessageCircle size={24} /> : <X size={22} />}
    </button>
  </div>;
}
