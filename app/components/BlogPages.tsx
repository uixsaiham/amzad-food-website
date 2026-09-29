"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import Storefront from "./Storefront";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebookF, faXTwitter, faLinkedinIn, faPinterestP, faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import { BlogCard } from "./BlogCards";
import { BlogPost, blogPosts, blogTags } from "../lib/blogs";
import { ArrowRight, BookOpen, Clock, Check, Link2, ChevronDown, ArrowUpRight, Mail } from "lucide-react";

/* ═══════════════════════════════════════════════════════════════
   ALL BLOGS PAGE
   ═══════════════════════════════════════════════════════════════ */
export function BlogsPage() {
  const [activeTag, setActiveTag] = useState("All");
  const featured = blogPosts[0];
  const grid = (activeTag === "All" ? blogPosts : blogPosts.filter((p) => p.tag === activeTag))
    .filter((p) => activeTag !== "All" || p.slug !== featured.slug);

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
            <p className="eyebrow">From our kitchen to yours</p>
            <h1>Amzad Food <em>Blog</em></h1>
            <p>Pantry tips, ingredient guides and food stories for your everyday table.</p>
          </header>

          {/* Featured hero post */}
          {activeTag === "All" && <Link className="jn-featured" href={`/blogs/${featured.slug}/`} aria-label={featured.title}>
            <div className="jn-featured-img">
              <img src={featured.image} alt={featured.imageAlt ?? featured.title} width={1536} height={1024} fetchPriority="high" />
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
          </Link>}

          {/* Tag filter chips */}
          <h2 className="jn-browse-title">Explore blog topics</h2>
          <div className="jn-tag-bar" role="group" aria-label="Filter by topic">
            {blogTags.map((tag) => (
              <button
                key={tag}
                className={tag === activeTag ? "jn-tag-btn active" : "jn-tag-btn"}
                aria-pressed={tag === activeTag}
                onClick={() => setActiveTag(tag)}
              >
                {tag === "All" ? "All blogs" : tag}
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
  const [tocOpen, setTocOpen] = useState(true);
  const [shareStatus, setShareStatus] = useState("");
  const [shareUrl, setShareUrl] = useState("");
  useEffect(() => { setShareUrl(window.location.origin + window.location.pathname); setShareStatus(""); }, [post.slug]);
  const encodedUrl = encodeURIComponent(shareUrl);
  const encodedTitle = encodeURIComponent(post.title);
  const sharePlatforms = [
    { name: "Facebook", icon: faFacebookF, href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`, color: "#4267a9" },
    { name: "X", icon: faXTwitter, href: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`, color: "#202722" },
    { name: "LinkedIn", icon: faLinkedinIn, href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`, color: "#087da5" },
    { name: "Pinterest", icon: faPinterestP, href: `https://pinterest.com/pin/create/button/?url=${encodedUrl}&description=${encodedTitle}&media=${encodeURIComponent(shareUrl ? new URL(post.image, shareUrl).href : "")}`, color: "#bf2030" },
    { name: "WhatsApp", icon: faWhatsapp, href: `https://wa.me/?text=${encodedTitle}%20${encodedUrl}`, color: "#218447" },
  ];
  const copyLink = async () => {
    try { await navigator.clipboard.writeText(shareUrl || window.location.href); setShareStatus("Link copied"); }
    catch { setShareStatus("Copy the page address from your browser to share this story."); }
  };
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
    window.addEventListener("resize", onScroll);
    return () => { window.removeEventListener("scroll", onScroll); window.removeEventListener("resize", onScroll); };
  }, [post]);

  const related = blogPosts.filter((p) => p.slug !== post.slug).slice(0, 6);

  return (
    <Storefront>
      {() => (
        <div className="jn-page jn-detail-page page-width">
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
          <header className="jn-article-header" lang={post.language ?? "en"}>
            <div className="jn-article-kicker"><span /> THE AMZAD JOURNAL <span className="jn-kicker-divider">/</span> {post.tag}</div>
            <span className="jn-tag jn-tag-inline">{post.tag}</span>
            <h1>{post.title}</h1>
            <p className="jn-article-desc">{post.description}</p>
            <div className="jn-article-meta-row">
            <div className="jn-byline">
              <span className="jn-byline-avatar">AF</span>
              <div>
                <strong>Amzad Food Editorial</strong>
                <span><Clock size={12} />&thinsp;{post.readMin} min read · {post.date}</span>
              </div>
            </div>
            <div className="jn-share-row" lang="en">
              <span className="jn-share-label">Share</span>
              <div className="jn-share-platforms">
                {sharePlatforms.map(platform => <a key={platform.name} href={platform.href} target="_blank" rel="noopener noreferrer" aria-label={`Share on ${platform.name}`} title={`Share on ${platform.name}`} style={{ "--share-color": platform.color } as React.CSSProperties}><FontAwesomeIcon icon={platform.icon} /></a>)}
                <a href={`mailto:?subject=${encodedTitle}&body=${encodedUrl}`} aria-label="Share by email" title="Share by email" style={{ "--share-color": "#748075" } as React.CSSProperties}><Mail size={16} /></a>
                <button type="button" onClick={copyLink} aria-label="Copy story link" title="Copy story link">{shareStatus === "Link copied" ? <Check size={16} /> : <Link2 size={16} />}</button>
              </div>
              <span className="jn-share-status" role="status">{shareStatus}</span>
            </div>
            </div>
          </header>

          {/* Cover image */}
          <figure className="jn-cover-wrap"><img className="jn-cover" src={post.image} alt={post.imageAlt ?? post.title} fetchPriority="high" />
            <figcaption><span>AMZAD FOOD JOURNAL</span><span>{post.tag} <span aria-hidden="true"> / </span> {post.readMin} min read</span></figcaption>
          </figure>

          {/* Two-column: article body + sticky sidebar */}
          <div className="jn-detail-grid">

            {/* Article body */}
            <article className="jn-article" ref={articleRef} lang={post.language ?? "en"}>
              <div className="jn-takeaways">
                <span className="jn-summary-label"><BookOpen size={15} /> AT A GLANCE</span>
                {post.takeaways ? <ul>{post.takeaways.map(item => <li key={item}><Check size={16} /><span>{item}</span></li>)}</ul> : <p>{post.description}</p>}
              </div>
              {post.sections.map((section, idx) => (
                <section id={section.id} key={section.id} className="jn-section">
                  <div className="jn-section-label">
                    <span className="jn-section-num">{String(idx + 1).padStart(2, "0")}</span>
                    <span className="jn-section-rule" />
                  </div>
                  <h2>{section.title}</h2>
                  {section.paragraphs.map((para) => <p key={para}>{para}</p>)}
                  {section.bullets && <ul className="jn-body-list">{section.bullets.map(item => <li key={item}>{item}</li>)}</ul>}
                  {section.steps && <ol className="jn-body-steps">{section.steps.map(item => <li key={item}>{item}</li>)}</ol>}
                  {section.note && <aside className="jn-note"><BookOpen size={18} /><p>{section.note}</p></aside>}
                </section>
              ))}

              {post.sources && <section className="jn-sources" aria-label="Sources"><h2>Sources &amp; further reading</h2><ul>{post.sources.map(source => <li key={source.url}><a href={source.url} target="_blank" rel="noopener noreferrer">{source.title}<ArrowUpRight size={14} /></a></li>)}</ul></section>}
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
              <nav className={`jn-toc${tocOpen ? "" : " is-collapsed"}`} aria-label="Table of contents">
                <div className="jn-toc-heading"><h2>In this story</h2><button className="jn-toc-toggle" type="button" onClick={() => setTocOpen(!tocOpen)} aria-expanded={tocOpen} aria-controls="story-contents" aria-label="Toggle story contents"><ChevronDown size={18} /></button></div>
                <ol id="story-contents">
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

              {post.featuredProduct && <Link href={post.featuredProduct.href} className="jn-product-pick"><span>FROM OUR PANTRY</span><img src={post.featuredProduct.image} alt={post.featuredProduct.name} loading="lazy" /><h3 lang={post.language}>{post.featuredProduct.name}</h3><p>Explore ingredients, sizes and product details.</p><b>Explore product <ArrowRight size={15} /></b></Link>}
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
