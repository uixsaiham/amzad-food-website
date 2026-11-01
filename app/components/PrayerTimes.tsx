"use client";

import { useEffect, useState } from "react";
import { ChevronDown, ChevronLeft, ChevronRight, Clock, MapPin, Moon, Sun, Sunrise, Sunset } from "lucide-react";

type Phase = "fajr" | "dhuhr" | "asr" | "maghrib" | "isha";
type Prayer = { key: Phase; name: string; at: string; icon: typeof Sun };

// Approximate Dhaka schedule (24h). Replace with a real prayer-time source per city when available.
const prayers: Prayer[] = [
  { key: "fajr", name: "ফজর", at: "04:20", icon: Sunrise },
  { key: "dhuhr", name: "যোহর", at: "12:15", icon: Sun },
  { key: "asr", name: "আসর", at: "16:35", icon: Sun },
  { key: "maghrib", name: "মাগরিব", at: "19:15", icon: Sunset },
  { key: "isha", name: "ইশা", at: "19:41", icon: Moon },
];
const SEHRI_END = "04:14";
const IFTAR = "19:15";

const bnDigits = "০১২৩৪৫৬৭৮৯";
const bn = (value: string | number) => String(value).replace(/\d/g, (digit) => bnDigits[Number(digit)]);
const toMinutes = (at: string) => { const [h, m] = at.split(":").map(Number); return h * 60 + m; };
const formatTime = (at: string) => { const [h, m] = at.split(":").map(Number); return bn(`${h % 12 || 12}:${String(m).padStart(2, "0")}`); };
const formatLeft = (minutes: number) => { const h = Math.floor(minutes / 60); const m = minutes % 60; return h ? `${bn(h)} ঘণ্টা ${bn(m)} মিনিট` : `${bn(m)} মিনিট`; };

function hijriDate(now: Date) {
  const parts = new Intl.DateTimeFormat("bn-BD-u-ca-islamic", { day: "numeric", month: "long", year: "numeric" }).formatToParts(now);
  const part = (type: string) => parts.find((item) => item.type === type)?.value ?? "";
  return `${part("day")} ${part("month")} ${part("year")} হিজরি`;
}

function schedule(now: Date) {
  const minutes = now.getHours() * 60 + now.getMinutes();
  const times = prayers.map((prayer) => toMinutes(prayer.at));
  let current = times.findLastIndex((time) => time <= minutes);
  if (current === -1) current = prayers.length - 1; // before Fajr: still Isha from last night
  const next = (current + 1) % prayers.length;
  let left = times[next] - minutes;
  if (left <= 0) left += 24 * 60;
  // Progress along the five evenly spaced stops, measured from the current prayer toward the next.
  const span = ((times[next] - times[current]) + 24 * 60) % (24 * 60) || 24 * 60;
  const done = ((minutes - times[current]) + 24 * 60) % (24 * 60);
  const progress = next === 0 ? 1 : (current + Math.min(done / span, 1)) / (prayers.length - 1);
  return { current, next, left, progress };
}

function useNow() {
  const [now, setNow] = useState<Date | null>(null);
  useEffect(() => {
    setNow(new Date());
    const timer = setInterval(() => setNow(new Date()), 30_000);
    return () => clearInterval(timer);
  }, []);
  return now;
}


// Compact prayer card pinned to the right edge; hides while the full prayer section is on screen.
export function PrayerDock() {
  const now = useNow();
  const [sectionVisible, setSectionVisible] = useState(false);
  useEffect(() => {
    const section = document.getElementById("prayer-times");
    if (!section) return;
    const observer = new IntersectionObserver(([entry]) => setSectionVisible(entry.isIntersecting), { threshold: 0.25 });
    observer.observe(section);
    return () => observer.disconnect();
  }, []);
  // Remember whether this visitor collapsed the card; on smaller laptops it starts collapsed so it doesn't cover the hero.
  const [collapsed, setCollapsed] = useState(false);
  useEffect(() => {
    let stored: string | null = null;
    try { stored = localStorage.getItem("pdock-collapsed"); } catch {}
    setCollapsed(stored ? stored === "1" : window.innerWidth < 1280);
  }, []);
  const toggle = (value: boolean) => { setCollapsed(value); try { localStorage.setItem("pdock-collapsed", value ? "1" : "0"); } catch {} };

  if (!now) return null;
  const state = schedule(now);
  const current = prayers[state.current];
  const next = prayers[state.next];

  if (collapsed) return <button className={sectionVisible ? "pdock-mini is-hidden" : "pdock-mini"} lang="bn" onClick={() => toggle(false)} aria-label="নামাজের সময় দেখুন">
    <ChevronLeft size={14} />
    <span><b>{current.name}</b><small>{formatTime(current.at)}</small></span>
  </button>;

  return <aside className={sectionVisible ? "pdock is-hidden" : "pdock"} lang="bn" aria-label="নামাজের সময়">
    <div className="pdock-head">
      <span><Moon size={12} fill="currentColor" /> নামাজের সময়</span>
      <em><MapPin size={11} /> ঢাকা</em>
      <button className="pdock-collapse" onClick={() => toggle(true)} aria-label="ছোট করুন"><ChevronRight size={14} /></button>
    </div>
    <div className="pdock-next">
      <small>পরবর্তী · {next.name} {formatTime(next.at)}</small>
      <strong>{formatLeft(state.left)} বাকি</strong>
    </div>
    <ul>
      {prayers.map((prayer, index) => <li key={prayer.key} className={index === state.current ? "current" : index === state.next ? "next" : ""}>
        <span>{prayer.name}</span><b>{formatTime(prayer.at)}</b>
      </li>)}
    </ul>
    <a href="#prayer-times">বিস্তারিত দেখুন <Clock size={12} /></a>
  </aside>;
}

export default function PrayerTimes({ notify }: { notify: (message: string) => void }) {
  const now = useNow();

  const state = now ? schedule(now) : { current: prayers.length - 1, next: 0, left: 0, progress: 1 };
  const current = prayers[state.current];
  const next = prayers[state.next];
  const date = now ? new Intl.DateTimeFormat("bn-BD", { weekday: "long", day: "numeric", month: "long" }).format(now) : "";
  const hijri = now ? hijriDate(now) : "";
  const CurrentIcon = current.icon;

  return <section className="prayer page-width" id="prayer-times">
    <div className="prayer-sky" data-phase={current.key}>
      <span className="prayer-orb" aria-hidden="true" />
      <div className="prayer-top">
        <div className="prayer-heading">
          <span className="prayer-kicker"><Moon size={12} fill="currentColor" /> আজকের নামাজের সময়</span>
          <p>{date}{hijri && <><i /> {hijri}</>}</p>
        </div>
        <button className="prayer-city" onClick={() => notify("More cities coming soon — showing Dhaka")}><MapPin size={13} /> ঢাকা <ChevronDown size={13} /></button>
      </div>

      <div className="prayer-now">
        <div className="prayer-current">
          <span className="prayer-live"><i /> এখন চলছে</span>
          <h2><CurrentIcon size={30} strokeWidth={1.8} /> {current.name}</h2>
          <p>শুরু {formatTime(current.at)}</p>
        </div>
        <div className="prayer-countdown" aria-live="polite">
          <small><Clock size={12} /> পরবর্তী · {next.name} {formatTime(next.at)}</small>
          <strong>{now ? formatLeft(state.left) : "—"}</strong>
          <span>বাকি</span>
        </div>
      </div>

      <ol className="prayer-line" style={{ "--progress": state.progress } as React.CSSProperties}>
        {prayers.map((prayer, index) => {
          const Icon = prayer.icon;
          const status = index === state.current ? "current" : index === state.next ? "next" : "";
          return <li key={prayer.key} className={status}>
            <span className="prayer-dot"><Icon size={15} /></span>
            <b>{prayer.name}</b>
            <small>{formatTime(prayer.at)}</small>
          </li>;
        })}
      </ol>

      <div className="prayer-bottom">
        <div className="prayer-fast"><span><Moon size={14} /></span><div><small>সেহরির শেষ</small><strong>{formatTime(SEHRI_END)}</strong></div></div>
        <div className="prayer-fast iftar"><span><Sunset size={14} /></span><div><small>ইফতার</small><strong>{formatTime(IFTAR)}</strong></div></div>
        <p>সময়সূচি আনুমানিক। স্থানীয় মসজিদের ঘোষণাকে অগ্রাধিকার দিন।</p>
      </div>
    </div>
  </section>;
}
