"use client";
import { useCallback, useEffect, useId, useRef, useState } from "react";
import { Play, ArrowUp, ChevronLeft, ChevronRight } from "lucide-react";
import BlogCarousel from "./BlogCards";
import ImpactStats from "./ImpactStats";

const blogReviews = [
  { videoId: "7ufrbw4XUv", image: "/amzad-food-website/blog-review-1.png", alt: "মেদ ঝরানো এখন আরও সহজ" },
  { videoId: "ApFoP_xcJSE", image: "/amzad-food-website/blog-review-2.png", alt: "অতিরিক্ত ওজন কমান প্রাকৃতিক উপায়ে" },
  { videoId: "hu5xopcyCdI", image: "/amzad-food-website/blog-review-3.png", alt: "ছোট বড় অভ্যাসেই স্বাস্থ্যকর জীবন" },
];

export default function BlogSection({ withStats = false }: { withStats?: boolean }) {
  const [playingVideo, setPlayingVideo] = useState<string | null>(null);
  const trackId = useId();
  const track = useRef<HTMLDivElement>(null);
  const [edges, setEdges] = useState({ start: true, end: false });
  const update = useCallback(() => {
    const el = track.current;
    if (el) setEdges({ start: el.scrollLeft < 4, end: el.scrollLeft >= el.scrollWidth - el.clientWidth - 4 });
  }, []);
  useEffect(() => {
    const el = track.current;
    if (!el) return;
    update();
    const observer = new ResizeObserver(update);
    observer.observe(el);
    return () => observer.disconnect();
  }, [update]);
  const step = (direction: number) => {
    const el = track.current;
    const card = el?.firstElementChild as HTMLElement | null;
    if (!el || !card) return;
    setPlayingVideo(null);
    el.scrollBy({ left: direction * (card.offsetWidth + (parseFloat(getComputedStyle(el).columnGap) || 0)), behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
  };
  return <section className="video-reviews" id="blogs">
    <div className="video-review-heading">
      <div><span className="video-eyebrow"><Play size={11} fill="currentColor" /> THE AMZAD JOURNAL</span><h2>Good food.<br /><em>Stories worth sharing.</em></h2></div>
      <div className="video-heading-note"><p>Discover our products, everyday inspiration and the stories behind better food.</p><span>Customer product reviews <i /> Video series</span></div>
    </div>
    <div className="video-stories-carousel best-sellers-carousel">
    <button className="video-stories-arrow best-sellers-arrow best-sellers-prev" type="button" disabled={edges.start} onClick={() => step(-1)} aria-label="Previous video story" aria-controls={trackId}><ChevronLeft size={20} /></button>
    <div className="blog-grid video-stories-track" id={trackId} ref={track} onScroll={update} tabIndex={0} role="region" aria-label="Video stories">{blogReviews.map((item, index) => <article className="blog-card" key={item.image}>
      {playingVideo === item.videoId ? <div className="video-inline-player">
        <iframe src={`https://www.youtube-nocookie.com/embed/${item.videoId}?autoplay=1&playsinline=1&rel=0`}
          title={item.alt} allow="autoplay; encrypted-media; picture-in-picture; fullscreen" allowFullScreen
          referrerPolicy="strict-origin-when-cross-origin" />
      </div> : <button type="button" className="video-preview" aria-label={`Play ${item.alt}`} onClick={() => setPlayingVideo(item.videoId)}>
        <img src={item.image} alt={item.alt} loading="lazy" />
        <span className="video-number">0{index + 1}</span>
        <span className="blog-play"><Play size={18} fill="currentColor" /></span>
        <span className="video-status">Watch video</span>
      </button>}
      <div className="video-card-copy"><span className="video-card-category">{["Everyday wellness", "Natural goodness", "Better food habits"][index]}</span><h3>{item.alt}</h3><div className="video-card-bottom"><span>Amzad Food · Product stories</span><ArrowUp size={16} /></div></div>
    </article>)}</div>

    <button className="video-stories-arrow best-sellers-arrow best-sellers-next" type="button" disabled={edges.end} onClick={() => step(1)} aria-label="Next video story" aria-controls={trackId}><ChevronRight size={20} /></button>
    </div>

    {/* Written stories carousel */}
    <div className="blog-section-stories">
      <BlogCarousel />
    </div>

    {withStats && <ImpactStats />}
  </section>;
}
