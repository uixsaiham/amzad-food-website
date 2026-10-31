"use client";

import { useEffect, useState } from "react";
import { Play, Quote, Star } from "lucide-react";
import { customerReviews, GoogleIcon } from "./Reviews";
import { blogReviews } from "./BlogSection";

export default function ProductReviewStories({ product }: { product: string }) {
  const [selection, setSelection] = useState({ text: 0, video: 0 });
  const [playing, setPlaying] = useState(false);
  useEffect(() => {
    setSelection({ text: Math.floor(Math.random() * customerReviews.length), video: Math.floor(Math.random() * blogReviews.length) });
    setPlaying(false);
  }, [product]);
  const review = customerReviews[selection.text];
  const video = blogReviews[selection.video];
  return <div className="product-story-section">
    <div className="pd-section-heading"><div><span className="pd-eyebrow">FROM OUR COMMUNITY</span><h2>Customer stories</h2></div></div>
    <p className="product-story-context">Experiences from across Amzad Food, shared from our main review section.</p>
    <div className="product-story-grid">
      <article className="rv-card product-story-text">
        <div className="rv-card-top"><span className="product-story-stars" aria-label={`${review.rating} out of 5 stars`}>{[1,2,3,4,5].map(value => <Star key={value} size={16} fill={value <= review.rating ? "currentColor" : "none"} />)}</span><GoogleIcon /></div>
        <Quote className="rv-quote" size={30} fill="currentColor" strokeWidth={0} />
        <p lang="bn">{review.text}</p>
        <footer><span className="rv-avatar" style={{ background: review.color }}>{review.name.split(" ").map(word => word[0]).join("")}</span><div><strong>{review.name}</strong><small>Amzad Food customer</small></div></footer>
      </article>
      <article className="blog-card product-story-video">
        {playing ? <div className="product-story-player"><iframe title={video.alt} src={`https://www.youtube-nocookie.com/embed/${video.videoId}?autoplay=1&playsinline=1&rel=0`} allow="autoplay; encrypted-media; picture-in-picture" allowFullScreen /></div> : <button className="product-story-preview" type="button" onClick={() => setPlaying(true)} aria-label={`Play ${video.alt}`}><img src={video.image} alt={video.alt} /><span className="product-story-play"><Play size={24} fill="currentColor" /></span></button>}
        <div className="product-story-caption"><span className="product-story-type">Video story</span><h3 lang="bn">{video.alt}</h3></div>
      </article>
    </div>
  </div>;
}
