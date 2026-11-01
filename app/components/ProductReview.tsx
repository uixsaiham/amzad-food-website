"use client";

import { useEffect, useId, useState, type FormEvent } from "react";
import { CheckCircle2, Star } from "lucide-react";
import { productSlug } from "../lib/products";

type Review = { rating: number; comment: string };

export default function ProductReview({ product }: { product: string }) {
  const id = useId();
  const storageKey = `amzad-product-review:${productSlug(product)}`;
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [saved, setSaved] = useState<Review | null>(null);
  const [ready, setReady] = useState(false);
  const [error, setError] = useState("");
  const [status, setStatus] = useState("");

  useEffect(() => {
    try {
      const review: unknown = JSON.parse(localStorage.getItem(storageKey) || "null");
      if (review && typeof review === "object" && "rating" in review && "comment" in review &&
        typeof review.rating === "number" && Number.isInteger(review.rating) && review.rating >= 1 && review.rating <= 5 &&
        typeof review.comment === "string") {
        const valid = { rating: review.rating, comment: review.comment.slice(0, 1000) };
        setSaved(valid); setRating(valid.rating); setComment(valid.comment);
      }
    } catch { /* Allow writing a review even when storage cannot be read. */ }
    setReady(true);
  }, [storageKey]);

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("");
    if (!rating) { setError("Please choose a star rating."); return; }
    const review = { rating, comment: comment.trim() };
    try { localStorage.setItem(storageKey, JSON.stringify(review)); }
    catch { setError("Your review could not be saved on this device. Please try again."); return; }
    setSaved(review); setError(""); setStatus("Your product review has been saved on this device.");
  }

  return <section className="product-review" id="product-reviews" aria-labelledby={`${id}-heading`}>
    <div className="product-review-intro">
      <span className="pd-eyebrow">YOUR EXPERIENCE MATTERS</span>
      <h2 id={`${id}-heading`}>Write a product review</h2>
      <p>How was {product}? Share your experience to help us improve.</p>
      {saved && <article className="product-review-saved" aria-label="Your saved product review">
        <strong><CheckCircle2 size={17} /> Your saved review</strong>
        <div className="product-review-rating" aria-label={`${saved.rating} out of 5 stars`}>{[1, 2, 3, 4, 5].map(value => <Star key={value} size={18} aria-hidden="true" fill={value <= saved.rating ? "currentColor" : "none"} />)}</div>
        {saved.comment && <p>{saved.comment}</p>}
      </article>}
    </div>
    <form className="product-review-form" onSubmit={submit}>
      <fieldset aria-describedby={error ? `${id}-error` : undefined}>
        <legend>Your rating <span>(required)</span></legend>
        <div className="product-review-stars">{[1, 2, 3, 4, 5].map(value => <label key={value}>
          <input type="radio" name={`${id}-rating`} value={value} checked={rating === value} onChange={() => { setRating(value); setError(""); setStatus(""); }} aria-label={`${value} star${value === 1 ? "" : "s"}`} />
          <span><Star size={26} aria-hidden="true" fill={value <= rating ? "currentColor" : "none"} /></span>
        </label>)}</div>
      </fieldset>
      <label htmlFor={`${id}-comment`}>Your review <span>(optional)</span></label>
      <textarea id={`${id}-comment`} value={comment} onChange={event => { setComment(event.target.value); setStatus(""); }} maxLength={1000} rows={5} placeholder="Tell us about the taste, quality or packaging…" />
      <div className="product-review-note"><span>Saved on this device only; reviews are not published publicly.</span><span>{comment.length}/1000</span></div>
      {error && <p className="product-review-error" id={`${id}-error`} role="alert">{error}</p>}
      <button type="submit" className="product-review-submit" disabled={!ready}>{saved ? "Update review" : "Save review"}</button>
      <p className="product-review-status" role="status">{status}</p>
    </form>
  </section>;
}
