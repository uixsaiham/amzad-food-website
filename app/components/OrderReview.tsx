"use client";
import { useEffect, useId, useRef, useState } from "react";
import { Star, X } from "lucide-react";

type Review = { rating: number; comment: string };
export default function OrderReview({ orderId, product, demo = false, compact = false }: { orderId: string; product: string; demo?: boolean; compact?: boolean }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const reviewId = useId();
  const key = `amzad-review:${orderId}:${product}`;
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");
  useEffect(() => {
    if (demo) return;
    try {
      const review: Review | null = JSON.parse(localStorage.getItem(key) || "null");
      if (review && review.rating >= 1 && review.rating <= 5) { setRating(review.rating); setComment(review.comment); setSaved(true); }
    } catch { /* A fresh review can still be written when storage is unavailable. */ }
  }, [key, demo]);
  return <><button className={compact ? "order-rating-prompt" : "orders-review-button"} onClick={() => { setError(""); dialog.current?.showModal(); }}>{compact ? <><strong>Don’t forget to rate</strong><span>Your feedback helps us serve you better.</span><span className="order-rating-stars">{[1, 2, 3, 4, 5].map(value => <Star key={value} size={20} />)}</span></> : saved ? "Edit Review" : "Write a Review"}</button>
    <dialog className="order-review-dialog" ref={dialog} aria-labelledby={`review-title-${reviewId}`} onClick={event => { if (event.target === event.currentTarget) dialog.current?.close(); }}>
      <form onSubmit={event => { event.preventDefault(); if (!rating) { setError("Please choose a star rating."); return; } if (!demo) { try { localStorage.setItem(key, JSON.stringify({ rating, comment: comment.trim() })); } catch { setError("Your review could not be saved. Please try again."); return; } } setSaved(true); dialog.current?.close(); }}>
        <button type="button" className="order-review-close" aria-label="Close review" onClick={() => dialog.current?.close()}><X size={20} /></button>
        <span className="orders-eyebrow">YOUR EXPERIENCE MATTERS</span><h2 id={`review-title-${reviewId}`}>How was your order?</h2><p>{product}</p>
        <div className="order-review-stars" role="group" aria-label="Choose a rating">{[1, 2, 3, 4, 5].map(value => <button type="button" key={value} aria-label={`${value} star${value === 1 ? "" : "s"}`} aria-pressed={rating === value} onClick={() => { setRating(value); setError(""); }}><Star size={30} fill={rating >= value ? "currentColor" : "none"} /></button>)}</div>
        <label htmlFor={`review-comment-${reviewId}`}>Your review <small>(optional)</small></label><textarea id={`review-comment-${reviewId}`} value={comment} onChange={event => setComment(event.target.value)} maxLength={1000} rows={4} placeholder="Tell us what you liked about your food…" />
        <p className="order-review-note">{demo ? "Sample preview — this review will not be saved." : "Your review is saved on this device."}</p>{error && <p role="alert" className="order-review-error">{error}</p>}<button className="orders-primary" type="submit">{demo ? "Preview review" : "Save review"}</button>
      </form>
    </dialog></>;
}
