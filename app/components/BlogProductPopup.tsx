"use client";
import Link from "next/link";
import { RefObject, useEffect, useState } from "react";
import { ArrowRight, Sparkles, X } from "lucide-react";
import { BlogPost, relatedProductFor } from "../lib/blogs";
import { catalog, productSlug } from "../lib/products";

const SHOW_AT = 0.8;
const dismissKey = (slug: string) => `amzad-blog-pick-closed:${slug}`;

// A quiet product suggestion that slides in once the reader is ~80% through the article.
// It shows once per article per browser session and never blocks the text.
export default function BlogProductPopup({ post, articleRef }: { post: BlogPost; articleRef: RefObject<HTMLElement> }) {
  const pick = relatedProductFor(post);
  const product = pick && catalog.find((item) => productSlug(item.name) === pick.slug);
  const [visible, setVisible] = useState(false);
  const [closed, setClosed] = useState(true);

  useEffect(() => {
    let dismissed = false;
    try { dismissed = sessionStorage.getItem(dismissKey(post.slug)) === "1"; } catch { /* storage unavailable */ }
    setClosed(dismissed);
    setVisible(false);
  }, [post.slug]);

  useEffect(() => {
    if (closed || visible || !product) return;
    const check = () => {
      const article = articleRef.current;
      if (!article) return;
      const { top, height } = article.getBoundingClientRect();
      if (height > 0 && (window.innerHeight - top) / height >= SHOW_AT) setVisible(true);
    };
    check();
    window.addEventListener("scroll", check, { passive: true });
    window.addEventListener("resize", check);
    return () => { window.removeEventListener("scroll", check); window.removeEventListener("resize", check); };
  }, [closed, visible, product, articleRef]);

  if (!pick || !product || closed || !visible) return null;

  const close = () => {
    setClosed(true);
    try { sessionStorage.setItem(dismissKey(post.slug), "1"); } catch { /* storage unavailable */ }
  };
  const href = `/products/${pick.slug}/`;
  const bangla = post.language === "bn";

  return <aside className="blog-pick" aria-label={bangla ? "সংশ্লিষ্ট পণ্য" : "Related product"} lang={bangla ? "bn" : "en"}>
    <button type="button" className="blog-pick-close" onClick={close} aria-label={bangla ? "বন্ধ করুন" : "Close product suggestion"}><X size={16} /></button>
    <p className="blog-pick-kicker"><Sparkles size={13} aria-hidden="true" /> {pick.kicker}<span>{pick.topic}</span></p>
    <div className="blog-pick-main">
      <Link href={href} className="blog-pick-image" onClick={close} tabIndex={-1} aria-hidden="true"><img src={product.image} alt="" loading="lazy" /></Link>
      <div className="blog-pick-copy">
        <h3><Link href={href} onClick={close}>{product.bn && bangla ? product.bn : product.name}</Link></h3>
        <p className="blog-pick-benefit">{pick.benefit}</p>
        <p className="blog-pick-price"><strong>৳{product.price.toLocaleString("en-IN")}</strong>{product.oldPrice && <del>৳{product.oldPrice.toLocaleString("en-IN")}</del>}</p>
      </div>
    </div>
    <p className="blog-pick-reason"><b>{bangla ? "কেন এই পণ্য?" : "Why this?"}</b> {pick.reason}</p>
    <Link href={href} className="cta cta-sm cta-block blog-pick-cta" onClick={close}><span>{pick.cta}</span><i className="cta-icon cta-arrow"><ArrowRight size={14} /></i></Link>
  </aside>;
}
