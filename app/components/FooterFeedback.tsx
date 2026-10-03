"use client";

import { useId, useState, type FormEvent } from "react";
import { Send } from "lucide-react";

export default function FooterFeedback() {
  const id = useId();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const normalized = phone.replace(/[০-৯]/g, digit => String("০১২৩৪৫৬৭৮৯".indexOf(digit))).replace(/[\s()-]/g, "");
    if (!name.trim() || !message.trim()) { setError("আপনার নাম ও মতামত লিখুন।"); return; }
    if (!/^(?:\+?88)?01[3-9]\d{8}$/.test(normalized)) { setError("সঠিক বাংলাদেশি মোবাইল নম্বর লিখুন।"); return; }
    setError("");
    const text = `আমজাদ ফুড — মতামত\nনাম: ${name.trim()}\nমোবাইল: ${normalized}\n\n${message.trim()}`;
    window.location.assign(`https://wa.me/8801327406605?text=${encodeURIComponent(text)}`);
  }
  return <section className="footer-feedback" lang="bn" aria-labelledby={`${id}-heading`}>
    <h2 id={`${id}-heading`}>আপনার মতামত</h2>
    <form className="footer-feedback-form" onSubmit={submit}>
      <div className="footer-feedback-fields">
        <div><label htmlFor={`${id}-name`}>আপনার নাম</label><input id={`${id}-name`} autoComplete="name" value={name} onChange={event => setName(event.target.value)} maxLength={80} required placeholder="আপনার নাম লিখুন" /></div>
        <div><label htmlFor={`${id}-phone`}>মোবাইল নম্বর</label><input id={`${id}-phone`} type="tel" inputMode="tel" autoComplete="tel" value={phone} onChange={event => setPhone(event.target.value)} maxLength={20} required placeholder="01XXXXXXXXX" aria-describedby={error ? `${id}-error` : undefined} /></div>
      </div>
      <div><label htmlFor={`${id}-message`}>আপনার মতামত</label><textarea id={`${id}-message`} value={message} onChange={event => setMessage(event.target.value)} maxLength={1500} rows={3} required placeholder="আপনার মূল্যবান মতামত লিখুন…" /></div>
      {error && <p className="footer-feedback-error" id={`${id}-error`} role="alert">{error}</p>}
      <button type="submit">মতামত সাবমিট করুন <Send size={19} aria-hidden="true" /></button>
    </form>
  </section>;
}
