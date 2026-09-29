"use client";

import { useEffect, useRef, useState } from "react";

const brands = [
  { name: "Amzad", file: "amzad", width: 511, height: 172 },
  { name: "Maza — মজা", file: "maza", width: 440, height: 248 },
  { name: "Slifit", file: "slifit", width: 494, height: 182 },
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

  return <section ref={section} className={`brand-strip page-width${visible ? " is-visible" : ""}`} aria-labelledby="our-brands-title">
    <div className="brand-strip-inner">
      <div className="brand-strip-heading">
        <span className="eyebrow">One family. Everyday goodness.</span>
        <h2 id="our-brands-title">Our brands<span aria-hidden="true">.</span></h2>
      </div>
      <ul className="brand-strip-logos">
        {brands.map(brand => <li key={`${brand.file}-${animationCycle}`} className={`brand-strip-item brand-strip-${brand.file}`}>
          <img src={`/amzad-food-website/brands/${brand.file}.png`} alt={brand.name} width={brand.width} height={brand.height} loading="lazy" decoding="async" />
        </li>)}
      </ul>
    </div>
  </section>;
}
