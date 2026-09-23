"use client";

import { useEffect, useRef, useState } from "react";
import { Gift, MapPin, Star, Users } from "lucide-react";

const stats = [
  { icon: Users, value: 50, decimals: 0, suffix: "K+", label: "Happy customers", note: "and growing every day", tone: "#f56619" },
  { icon: Gift, value: 200, decimals: 0, suffix: "+", label: "Quality products", note: "sourced with care", tone: "#1f8a52" },
  { icon: MapPin, value: 60, decimals: 0, suffix: "+", label: "Districts covered", note: "delivery across Bangladesh", tone: "#2f7a8a" },
  { icon: Star, value: 4.8, decimals: 1, suffix: "/5", label: "Customer rating", note: "average on Google", tone: "#e59a12" },
];

// Counts every stat up from zero the first time the block scrolls into view.
function useCountUp(ref: React.RefObject<HTMLElement>, duration = 1400) {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) { setProgress(1); return; }
    let frame = 0;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      observer.disconnect();
      const start = performance.now();
      const tick = (now: number) => {
        const t = Math.min((now - start) / duration, 1);
        setProgress(1 - Math.pow(1 - t, 3));
        if (t < 1) frame = requestAnimationFrame(tick);
      };
      frame = requestAnimationFrame(tick);
    }, { threshold: 0.35 });
    observer.observe(element);
    return () => { observer.disconnect(); cancelAnimationFrame(frame); };
  }, [ref, duration]);
  return progress;
}

export default function ImpactStats() {
  const ref = useRef<HTMLDivElement>(null);
  const progress = useCountUp(ref);
  return <div className="impact" ref={ref}>
    <div className="impact-intro">
      <span className="impact-kicker">Our impact</span>
      <h2>Trusted by <em>thousands</em> of families</h2>
      <p>Integrity is the cornerstone of our mission, and these numbers keep growing every day.</p>
    </div>
    <ul className="impact-grid">{stats.map((stat) => {
      const Icon = stat.icon;
      return <li key={stat.label} style={{ "--tone": stat.tone } as React.CSSProperties}>
        <span className="impact-icon"><Icon size={18} /></span>
        <strong aria-label={`${stat.value}${stat.suffix}`}>{(stat.value * progress).toFixed(stat.decimals)}<em>{stat.suffix}</em></strong>
        <b>{stat.label}</b>
        <small>{stat.note}</small>
      </li>;
    })}</ul>
  </div>;
}
