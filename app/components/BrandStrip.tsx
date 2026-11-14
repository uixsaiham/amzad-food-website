"use client";

import { useEffect, useRef, useState } from "react";

const brands = [
  { name: "Amzad", file: "amzad-original", width: 1320, height: 300 },
  { name: "Moja", file: "moja-original", width: 1100, height: 520 },
  { name: "Slifit", file: "slifit-original", width: 1310, height: 430 },
  { name: "Hazmi", file: "hazmi-original", width: 360, height: 100 },
  { name: "Slim Key", file: "slim-key-original", width: 770, height: 200 },
];

export default function BrandStrip() {
  const section = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  const [animationCycle, setAnimationCycle] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      setVisible(entry.isIntersecting);
    }, { threshold: 0.2 });
    if (section.current) observer.observe(section.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!visible) return;
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const timer = window.setInterval(() => {
      if (!motion.matches && !document.hidden) setAnimationCycle(cycle => cycle + 1);
    }, 10000);
    return () => window.clearInterval(timer);
  }, [visible]);

  return <section ref={section} className={`brand-strip page-width${visible ? " is-visible" : ""}`} aria-label="Our brands">
      <div className="brand-strip-heading brand-family-heading">
        <h2>Our Brands</h2>
      </div>
    <div className="brand-strip-inner brand-strip-logos-only">
      <ul className="brand-strip-logos">
        {brands.map(brand => <li key={`${brand.file}-${animationCycle}`} className={`brand-strip-item brand-strip-${brand.file}`}>
          <img src={`/amzad-food-website/brands/${brand.file}.png`} alt={brand.name} width={brand.width} height={brand.height} loading="lazy" decoding="async" />
        </li>)}
      </ul>
    </div>
  </section>;
}
