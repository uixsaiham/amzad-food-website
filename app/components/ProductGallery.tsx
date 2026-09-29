"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { ChevronLeft, ChevronRight, ZoomIn, ZoomOut } from "lucide-react";
import { Product, ProductImage, getProductImages } from "../lib/products";

function GalleryImage({ image, name }: { image: ProductImage; name: string }) {
  return <img src={image.src} alt={`${name} — ${image.label}`} draggable={false}
    style={{ transform: `scale(${image.scale ?? 1})`, transformOrigin: `${image.x ?? 50}% ${image.y ?? 50}%` }} />;
}

export default function ProductGallery({ product, children }: { product: Product; children?: ReactNode }) {
  const images = getProductImages(product);
  const [selected, setSelected] = useState(0);
  const [hovered, setHovered] = useState(false);
  const [pinned, setPinned] = useState(false);
  const layer = useRef<HTMLSpanElement>(null);
  const frame = useRef(0);
  const point = useRef({ x: 50, y: 50 });
  const thumbs = useRef<(HTMLButtonElement | null)[]>([]);
  const active = images[selected] ?? images[0];
  const zoomed = hovered || pinned;

  useEffect(() => () => cancelAnimationFrame(frame.current), []);
  const resetZoom = () => {
    cancelAnimationFrame(frame.current);
    frame.current = 0;
    setHovered(false);
    setPinned(false);
    if (layer.current) layer.current.style.transformOrigin = "50% 50%";
  };
  const select = (index: number) => {
    resetZoom();
    setSelected((index + images.length) % images.length);
  };

  return <div className="product-gallery" role="group" aria-label={`${product.name} image gallery`}>
    <div className="product-gallery-stage">
      <button type="button" className="product-gallery-image" data-zoomed={zoomed}
        aria-label={`${pinned ? "Zoom out of" : "Zoom into"} ${product.name}: ${active.label}`} aria-pressed={pinned}
        onClick={() => { setPinned(!pinned); setHovered(false); }}
        onPointerEnter={event => {
          if (event.pointerType === "mouse" && window.matchMedia("(hover: hover) and (pointer: fine)").matches) setHovered(true);
        }}
        onPointerLeave={() => setHovered(false)}
        onBlur={resetZoom}
        onKeyDown={event => {
          if (event.key === "Escape" && zoomed) { event.stopPropagation(); resetZoom(); }
          if (event.key === "ArrowRight" || event.key === "ArrowLeft") {
            event.preventDefault(); select(selected + (event.key === "ArrowRight" ? 1 : -1));
          }
        }}
        onPointerMove={event => {
          if (event.pointerType !== "mouse") return;
          const rect = event.currentTarget.getBoundingClientRect();
          point.current = { x: Math.max(0, Math.min(100, (event.clientX - rect.left) / rect.width * 100)), y: Math.max(0, Math.min(100, (event.clientY - rect.top) / rect.height * 100)) };
          if (!frame.current) frame.current = requestAnimationFrame(() => {
            if (layer.current) layer.current.style.transformOrigin = `${point.current.x}% ${point.current.y}%`;
            frame.current = 0;
          });
        }}>
        <span ref={layer} className="product-gallery-zoom"><GalleryImage image={active} name={product.name} /></span>
        <span className="product-gallery-zoom-icon" aria-hidden="true">{zoomed ? <ZoomOut size={18} /> : <ZoomIn size={18} />}</span>
      </button>
      {images.length > 1 && <div className="product-gallery-arrows">
        <button type="button" onClick={() => select(selected - 1)} aria-label="Previous product image"><ChevronLeft size={18} /></button>
        <button type="button" onClick={() => select(selected + 1)} aria-label="Next product image"><ChevronRight size={18} /></button>
      </div>}
    </div>
    <div className="product-gallery-caption"><span aria-live="polite">{active.label}{images.length > 1 ? ` · ${selected + 1}/${images.length}` : ""}</span><span className="gallery-hover-hint">Hover to zoom</span><span className="gallery-touch-hint">Tap to zoom</span></div>
    {children}
    {images.length > 1 && <div className="product-gallery-thumbs" aria-label="Choose product image">
      {images.map((image, index) => <button type="button" key={`${image.src}-${index}`}
        ref={element => { thumbs.current[index] = element; }}
        className={index === selected ? "active" : ""} aria-pressed={index === selected}
        aria-label={`View ${image.label.toLowerCase()} of ${product.name}`} onClick={() => select(index)}
        onKeyDown={event => {
          if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) return;
          event.preventDefault();
          const next = event.key === "Home" ? 0 : event.key === "End" ? images.length - 1 : (index + (event.key === "ArrowRight" ? 1 : -1) + images.length) % images.length;
          select(next); thumbs.current[next]?.focus();
        }}>
        <span><GalleryImage image={image} name={product.name} /></span>
      </button>)}
    </div>}
  </div>;
}
