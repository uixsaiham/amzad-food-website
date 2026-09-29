"use client";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowRight, ArrowUpRight, BookOpen, ChevronLeft, ChevronRight } from "lucide-react";
import { BlogPost, blogPosts } from "../lib/blogs";

/* ── Single blog card ─────────────────────────────────────────── */
export function BlogCard({ post }: { post: BlogPost }) {
  return (
    <Link className="jn-card" href={`/blogs/${post.slug}/`}>
      <div className="jn-card-img">
        <img src={post.image} alt={post.imageAlt ?? post.title} loading="lazy" />
        <span className="jn-tag">{post.tag}</span>
      </div>
      <div className="jn-card-body">
        <div className="jn-meta">
          <span>{post.date}</span>
          <span className="jn-dot" />
          <span><BookOpen size={11} />&thinsp;{post.readMin} min</span>
        </div>
        <h3>{post.title}</h3>
        <p>{post.description}</p>
        <span className="jn-read">Read story <ArrowUpRight size={15} /></span>
      </div>
    </Link>
  );
}

/* ── Scrollable carousel with prev/next arrows ────────────────── */
export default function BlogCarousel() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [scroll, setScroll] = useState({ progress: 0, start: true, end: false });

  const update = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    setScroll({ progress: max > 0 ? el.scrollLeft / max : 1, start: el.scrollLeft < 4, end: el.scrollLeft > max - 4 });
  }, []);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    update();
    const observer = new ResizeObserver(update);
    observer.observe(el);
    return () => observer.disconnect();
  }, [update]);

  // Advance by one card so the arrows feel like the reviews carousel.
  const step = (dir: number) => {
    const el = trackRef.current;
    const card = el?.firstElementChild as HTMLElement | null;
    if (el && card) el.scrollBy({ left: dir * (card.offsetWidth + (parseFloat(getComputedStyle(el).columnGap) || 0)), behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
  };

  return (
    <div className="jn-carousel-wrap">
      <div className="jn-carousel-head">
        <div className="jn-carousel-title"><h2>From Our Blog</h2><p>Fresh ideas for your kitchen and everyday table.</p></div>
        <div className="jn-carousel-nav">
          <Link className="view-all" href="/blogs/"><span>View all blogs</span><i><ArrowRight size={14} /></i></Link>
        </div>
      </div>

      <div className="best-sellers-carousel">
        <button type="button" className="best-sellers-arrow best-sellers-prev" onClick={() => step(-1)} disabled={scroll.start} aria-label="Previous blog posts" aria-controls="blog-carousel-track"><ChevronLeft size={20} /></button>
      <div
        id="blog-carousel-track"
        className="jn-track"
        ref={trackRef}
        onScroll={update}
        tabIndex={0}
        role="region"
        aria-label="Blog stories"
      >
        {blogPosts.map((post) => <BlogCard key={post.slug} post={post} />)}
      </div>
        <button type="button" className="best-sellers-arrow best-sellers-next" onClick={() => step(1)} disabled={scroll.end} aria-label="Next blog posts" aria-controls="blog-carousel-track"><ChevronRight size={20} /></button>
      </div>
    </div>
  );
}
