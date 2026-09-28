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
        <img src={post.image} alt={post.title} loading="lazy" />
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
  const [edges, setEdges] = useState({ start: true, end: false });

  const updateEdges = useCallback(() => {
    const el = trackRef.current;
    if (el) setEdges({ start: el.scrollLeft < 2, end: el.scrollLeft + el.clientWidth >= el.scrollWidth - 2 });
  }, []);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    updateEdges();
    const observer = new ResizeObserver(updateEdges);
    observer.observe(el);
    return () => observer.disconnect();
  }, [updateEdges]);

  const scroll = (dir: number) => {
    const el = trackRef.current;
    if (el) el.scrollBy({ left: dir * el.clientWidth, behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
  };

  return (
    <div className="jn-carousel-wrap">
      {/* Arrow + track row */}
      <div className="jn-carousel">
        <button
          className="best-sellers-arrow best-sellers-prev"
          disabled={edges.start}
          onClick={() => scroll(-1)}
          aria-label="Previous blog posts"
          aria-controls="blog-carousel-track"
        >
          <ChevronLeft size={20} />
        </button>

        <div
          id="blog-carousel-track"
          className="jn-track"
          ref={trackRef}
          onScroll={updateEdges}
          tabIndex={0}
          role="region"
          aria-label="Blog stories"
        >
          {blogPosts.map((post) => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </div>

        <button
          className="best-sellers-arrow best-sellers-next"
          disabled={edges.end}
          onClick={() => scroll(1)}
          aria-label="Next blog posts"
          aria-controls="blog-carousel-track"
        >
          <ChevronRight size={20} />
        </button>
      </div>

      {/* Footer row: story count + view-all CTA */}
      <div className="jn-carousel-footer">
        <span className="jn-carousel-count">{blogPosts.length} stories</span>
        <Link className="cta cta-ghost cta-sm" href="/blogs/">
          <span>View all blogs</span>
          <i className="cta-icon cta-arrow"><ArrowRight size={14} /></i>
        </Link>
      </div>
    </div>
  );
}
