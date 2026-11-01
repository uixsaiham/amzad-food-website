"use client";

import { useEffect, useRef, useState } from "react";
import { BadgeCheck, ChevronLeft, ChevronRight, Quote, Star } from "lucide-react";

const customerReviews = [
  { name: "Rafiq Hasan", time: "3 days ago", rating: 4, color: "#fde3cf", text: "আমার অভিজ্ঞতা আমজাদ ফুডের সাথে অসাধারণ ছিল। সেবা ছিল অত্যন্ত সহায়ক এবং প্রয়োজনীয় তথ্য পেতে আমি খুব সহজেই যোগাযোগ করতে পেরেছিলাম। ধন্যবাদ আমজাদ ফুড।" },
  { name: "Arif Chowdhury", time: "20 hours ago", rating: 5, color: "#dbe9ff", text: "এজেন্টের সহায়তা আমাকে আমজাদ ফুডের বিভিন্ন পণ্য সম্পর্কে জানাতে সাহায্য করেছে। তারা সবকিছু পরিষ্কারভাবে ব্যাখ্যা করেছে, যা আমাকে সিদ্ধান্ত নিতে সহজ করেছে।" },
  { name: "Samiul Rahman", time: "2 days ago", rating: 4, color: "#e3ddff", text: "আমি দীর্ঘদিন ধরে আমজাদ ফুড কিনতে চেয়েছিলাম, কিন্তু তাদের সহায়তায় সবকিছু সহজ হয়ে গেছে। তাদের ধন্যবাদ।" },
  { name: "Naimul Islam", time: "2 days ago", rating: 5, color: "#d7f0e2", text: "ফাহিমের সহায়তায় আমজাদ ফুডের কেনাকাটা প্রক্রিয়াটি খুব মসৃণ হয়েছে। তিনি আমাকে সবকিছুতে সাহায্য করেছেন এবং পণ্যগুলি খুবই সুসংগঠিত।" },
  { name: "Tanvir Ahmed", time: "5 days ago", rating: 5, color: "#ffe1e6", text: "প্রতিবার অর্ডার করার পর দ্রুত ডেলিভারি পেয়েছি এবং পণ্যের মান সবসময় অসাধারণ। আমজাদ ফুড আমার পরিবারের প্রথম পছন্দ।" },
];

function GoogleIcon() {
  return <svg width="16" height="16" viewBox="0 0 48 48" aria-hidden="true"><path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3C33.7 32.9 29.3 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.1 8 3l6-6C34.5 5.1 29.5 3 24 3 12.4 3 3 12.4 3 24s9.4 21 21 21 21-9.4 21-21c0-1.4-.1-2.7-.4-3.5z" /><path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.6 15.9 18.9 13 24 13c3.1 0 5.8 1.1 8 3l6-6C34.5 6.1 29.5 4 24 4c-7.6 0-14.2 4.3-17.7 10.7z" /><path fill="#4CAF50" d="M24 44c5.4 0 10.3-2.1 14-5.5l-6.5-5.5c-2.1 1.6-4.8 2.5-7.5 2.5-5.3 0-9.7-3.1-11.3-7.6l-6.5 5c3.5 6.5 10.1 11.1 17.8 11.1z" /><path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.3-2.3 4.3-4.3 5.7l6.5 5.5C40.9 36.8 44 31.3 44 24c0-1.4-.1-2.7-.4-3.5z" /></svg>;
}

const AVERAGE = 4.8;

function Stars({ value, size = 14 }: { value: number; size?: number }) {
  const row = Array.from({ length: 5 }, (_, index) => <Star key={index} size={size} fill="currentColor" strokeWidth={0} />);
  return <span className="rv-stars" role="img" aria-label={`${value} out of 5 stars`}>
    <span className="rv-stars-base">{row}</span>
    <span className="rv-stars-fill" style={{ width: `${(value / 5) * 100}%` }}>{row}</span>
  </span>;
}

export default function Reviews() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [scroll, setScroll] = useState({ progress: 0, atStart: true, atEnd: false });
  const update = () => {
    const track = trackRef.current;
    if (!track) return;
    const max = track.scrollWidth - track.clientWidth;
    setScroll({ progress: max > 0 ? track.scrollLeft / max : 1, atStart: track.scrollLeft < 4, atEnd: track.scrollLeft > max - 4 });
  };
  useEffect(() => {
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);
  const step = (direction: number) => {
    const track = trackRef.current;
    const card = track?.firstElementChild as HTMLElement | null;
    if (track && card) track.scrollBy({ left: direction * (card.offsetWidth + 18), behavior: "smooth" });
  };

  return <section className="review-section" id="reviews"><div className="rv page-width">
    <div className="rv-summary">
      <span className="rv-kicker"><Star size={12} fill="currentColor" /> Customer Reviews</span>
      <h2>Loved by families <em>across Bangladesh</em></h2>
      <div className="rv-score">
        <strong>{AVERAGE}</strong>
        <div><Stars value={AVERAGE} size={17} /><small>Average rating on <GoogleIcon /> Google</small></div>
      </div>
      <div className="rv-proof">
        <span className="rv-faces">{customerReviews.slice(0, 4).map((review) => <i key={review.name} style={{ background: review.color }}>{review.name.split(" ").map((part) => part[0]).join("")}</i>)}</span>
        <p><b>50K+</b> happy customers<br />and counting</p>
      </div>
      <div className="rv-controls">
        <button onClick={() => step(-1)} disabled={scroll.atStart} aria-label="Previous reviews"><ChevronLeft size={18} /></button>
        <button onClick={() => step(1)} disabled={scroll.atEnd} aria-label="Next reviews"><ChevronRight size={18} /></button>
        <span className="rv-progress"><i style={{ width: `${Math.max(12, scroll.progress * 100)}%` }} /></span>
      </div>
    </div>
    <div className="rv-track" ref={trackRef} onScroll={update}>
      {customerReviews.map((review) => {
        const initials = review.name.split(" ").map((part) => part[0]).slice(0, 2).join("");
        return <article className="rv-card" key={review.name}>
          <div className="rv-card-top"><Stars value={review.rating} /><GoogleIcon /></div>
          <Quote className="rv-quote" size={30} fill="currentColor" strokeWidth={0} />
          <p>{review.text}</p>
          <footer>
            <span className="rv-avatar" style={{ background: review.color }}>{initials}</span>
            <div><strong>{review.name}</strong><small><BadgeCheck size={13} /> Verified buyer · {review.time}</small></div>
          </footer>
        </article>;
      })}
    </div>
  </div></section>;
}
