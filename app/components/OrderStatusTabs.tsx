"use client";
import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { orderStatuses } from "../lib/order-status";

export default function OrderStatusTabs({ selected, onSelect }: { selected: string; onSelect: (status: string) => void }) {
  const rail = useRef<HTMLDivElement>(null);
  const [edges, setEdges] = useState({ start: true, end: true });
  const updateEdges = () => {
    const element = rail.current;
    if (element) setEdges({ start: element.scrollLeft <= 2, end: element.scrollLeft + element.clientWidth >= element.scrollWidth - 2 });
  };
  useEffect(() => {
    const element = rail.current;
    if (!element) return;
    updateEdges();
    const observer = new ResizeObserver(updateEdges);
    observer.observe(element);
    return () => observer.disconnect();
  }, []);
  const scroll = (direction: number) => {
    const element = rail.current;
    if (element) element.scrollBy({ left: direction * Math.max(150, element.clientWidth * .75), behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
  };
  return <div className="orders-filter-wrap">
    {!edges.start && <button className="orders-filter-arrow previous" aria-label="Show previous order statuses" onClick={() => scroll(-1)}><ChevronLeft size={22} /></button>}
    <div ref={rail} className="orders-filters" aria-label="Filter orders by status" onScroll={updateEdges}>{["All Orders", ...orderStatuses].map(status => <button key={status} aria-pressed={selected === status} className={selected === status ? "active" : ""} onClick={event => { onSelect(status); const element = rail.current; const button = event.currentTarget; if (element) { const left = button.offsetLeft - element.offsetLeft; if (left < element.scrollLeft) element.scrollTo({ left, behavior: "auto" }); else if (left + button.offsetWidth > element.scrollLeft + element.clientWidth) element.scrollTo({ left: left + button.offsetWidth - element.clientWidth, behavior: "auto" }); } }}>{status}</button>)}</div>
    {!edges.end && <button className="orders-filter-arrow next" aria-label="Show more order statuses" onClick={() => scroll(1)}><ChevronRight size={22} /></button>}
  </div>;
}
