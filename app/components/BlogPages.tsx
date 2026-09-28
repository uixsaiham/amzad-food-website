"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import Storefront from "./Storefront";
import { BlogCard } from "./BlogCards";
import { BlogPost, blogPosts, blogTags } from "../lib/blogs";
import { ArrowRight, BookOpen, Clock } from "lucide-react";

/* ═══════════════════════════════════════════════════════════════
   ALL BLOGS PAGE
   ═══════════════════════════════════════════════════════════════ */
export function BlogsPage() {
  const [activeTag, setActiveTag] = useState("All");
  const featured = blogPosts[0];
  const grid = (activeTag === "All" ? blogPosts : blogPosts.filter((p) => p.tag === activeTag))
    .filter((p) => p.slug !== featured.slug);

  return (
    <Storefront>
      {() => (
        <div className="jn-page page-width">
          {/* Breadcrumb */}
          <nav className="pd-breadcrumb" aria-label="Breadcrumb">
            <Link href="/">Home</Link><span>/</span><span>Blogs</span>
          </nav>

          {/* Page header */}
          <header className="jn-page-header">
            <h1>Good food.<br /><em>Stories worth sharing.</em></h1>
            <p>Everyday inspiration, thoughtful ingredients and moments around the table.</p>
          </header>

          {/* Featured hero post */}
          <Link className="jn-featured" href={`/blogs/${featured.slug}/`} aria-label={featured.title}>
            <div className="jn-featured-img">
              <img src={featured.image} alt={featured.title} />
              <span className="jn-tag">{featured.tag}</span>
            </div>
            <div className="jn-featured-body">
              <div className="jn-meta">
                <span>{featured.date}</span>
                <span className="jn-dot" />
                <span><BookOpen size={12} />&thinsp;{featured.readMin} min read</span>
              </div>
              <h2>{featured.title}</h2>
              <p>{featured.description}</p>
              <span className="jn-featured-cta">Read story <ArrowRight size={15} /></span>
            </div>
          </Link>

          {/* Tag filter chips */}
          <div className="jn-tag-bar" role="group" aria-label="Filter by topic">
            {blogTags.map((tag) => (
              <button
                key={tag}
                className={tag === activeTag ? "jn-tag-btn active" : "jn-tag-btn"}
                aria-pressed={tag === activeTag}
                onClick={() => setActiveTag(tag)}
              >
                {tag}
                {tag !== "All" && <small>{blogPosts.filter((p) => p.tag === tag).length}</small>}
              </button>
            ))}
          </div>

          {/* Blog grid */}
          {grid.length > 0 ? (
            <div className="jn-grid">
              {grid.map((post) => <BlogCard key={post.slug} post={post} />)}
            </div>
          ) : (
            <p className="jn-empty">No stories in this category yet — check back soon.</p>
          )}
        </div>
      )}
    </Storefront>
  );
}

/* ═══════════════════════════════════════════════════════════════
   BLOG DETAILS PAGE
   ═══════════════════════════════════════════════════════════════ */
export function BlogDetails({ post }: { post: BlogPost }) {
  const [activeId, setActiveId] = useState(post.sections[0]?.id ?? "");
  const [progress, setProgress] = useState(0);
  const articleRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const onScroll = () => {
      // Reading progress
      const art = articleRef.current;
      if (art) {
        const { top, height } = art.getBoundingClientRect();
        setProgress(Math.min(100, Math.max(0, ((window.innerHeight - top) / (height + window.innerHeight)) * 100)));
      }
      // Active TOC section
      let current = post.sections[0]?.id ?? "";
      for (const s of post.sections) {
        const el = document.getElementById(s.id);
        if (el && el.getBoundingClientRect().top <= 160) current = s.id;
      }
      setActiveId(current);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [post]);

  const related = blogPosts.filter((p) => p.slug !== post.slug).slice(0, 3);

  return (
    <Storefront>
      {() => (
        <div className="jn-page page-width">
          {/* Reading progress bar — fixed at top of viewport */}
          <div
            className="jn-progress-bar"
            style={{ "--jn-progress": `${progress}%` } as React.CSSProperties}
            aria-hidden="true"
          />

          {/* Breadcrumb */}
          <nav className="pd-breadcrumb" aria-label="Breadcrumb">
            <Link href="/">Home</Link><span>/</span>
            <Link href="/blogs/">Blogs</Link><span>/</span>
            <span>{post.title}</span>
          </nav>

          {/* Article header */}
          <header className="jn-article-header">
            <span className="jn-tag jn-tag-inline">{post.tag}</span>
            <h1>{post.title}</h1>
            <p className="jn-article-desc">{post.description}</p>
            <div className="jn-byline">
              <span className="jn-byline-avatar">AF</span>
              <div>
                <strong>Amzad Food Editorial</strong>
                <span><Clock size={12} />&thinsp;{post.readMin} min read · {post.date}</span>
              </div>
            </div>
          </header>

          {/* Cover image */}
          <img className="jn-cover" src={post.image} alt={post.title} />

          {/* Two-column: article body + sticky sidebar */}
          <div className="jn-detail-grid">

            {/* Article body */}
            <article className="jn-article" ref={articleRef}>
              {post.sections.map((section, idx) => (
                <section id={section.id} key={section.id} className="jn-section">
                  <div className="jn-section-label">
                    <span className="jn-section-num">{String(idx + 1).padStart(2, "0")}</span>
                    <span className="jn-section-rule" />
                  </div>
                  <h2>{section.title}</h2>
                  {section.paragraphs.map((para) => <p key={para}>{para}</p>)}
                </section>
              ))}

              <div className="jn-article-foot">
                <Link className="cta cta-ghost" href="/blogs/">
                  <span>Back to all stories</span>
                  <i className="cta-icon cta-arrow"><ArrowRight size={14} /></i>
                </Link>
              </div>
            </article>

            {/* Sticky sidebar */}
            <aside className="jn-sidebar">
              {/* Table of contents */}
              <nav className="jn-toc" aria-label="Table of contents">
                <h2>In this story</h2>
                <ol>
                  {post.sections.map((section, idx) => (
                    <li key={section.id}>
                      <a
                        href={`#${section.id}`}
                        aria-current={activeId === section.id ? "location" : undefined}
                        onClick={() => setActiveId(section.id)}
                      >
                        <span className="jn-toc-num">{String(idx + 1).padStart(2, "0")}</span>
                        {section.title}
                      </a>
                    </li>
                  ))}
                </ol>

                <div className="jn-toc-foot">
                  <span className="jn-toc-meta"><BookOpen size={12} /> {post.readMin} min read</span>
                  <Link href="/blogs/" className="jn-toc-all">
                    View all blogs <ArrowRight size={12} />
                  </Link>
                </div>
              </nav>

              {/* Tag / browse card */}
              <div className="jn-sidebar-card">
                <span className="jn-tag jn-tag-inline">{post.tag}</span>
                <p>Discover more stories about {post.tag.toLowerCase()}.</p>
                <Link className="cta cta-sm cta-block" href="/blogs/">
                  <span>Browse all stories</span>
                  <i className="cta-icon cta-arrow"><ArrowRight size={13} /></i>
                </Link>
              </div>
            </aside>
          </div>

          {/* Related posts */}
          {related.length > 0 && (
            <section className="jn-related">
              <div className="jn-related-head">
                <h2>More stories to explore</h2>
                <Link href="/blogs/" className="view-all">
                  View all <ArrowRight size={14} />
                </Link>
              </div>
              <div className="jn-grid">
                {related.map((item) => <BlogCard key={item.slug} post={item} />)}
              </div>
            </section>
          )}
        </div>
      )}
    </Storefront>
  );
}
