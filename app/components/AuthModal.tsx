"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowRight, Eye, EyeOff, Gift, Heart, Lock, Mail, PackageSearch, ShieldCheck, Star, UserRound, X, Zap } from "lucide-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle, faWhatsapp } from "@fortawesome/free-brands-svg-icons";

type Mode = "signin" | "signup";

const perks = [
  { icon: PackageSearch, title: "Track every order", text: "Live status from packing to your door" },
  { icon: Zap, title: "Faster checkout", text: "Saved address and phone number" },
  { icon: Heart, title: "Wishlist everywhere", text: "Your favourites on every device" },
  { icon: Gift, title: "Member-only deals", text: "Early access to offers and new arrivals" },
];

// Mock sign-in: no backend yet, so any valid input signs the visitor in locally.
export default function AuthModal({ open, onClose, onSignIn }: { open: boolean; onClose: () => void; onSignIn: (name: string) => void }) {
  const [mode, setMode] = useState<Mode>("signin");
  const [name, setName] = useState("");
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const firstField = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => { if (event.key === "Escape") onClose(); };
    const previousOverflow = document.body.style.overflow;
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    const focusTimer = window.setTimeout(() => firstField.current?.focus(), 60);
    return () => { document.removeEventListener("keydown", onKey); document.body.style.overflow = previousOverflow; window.clearTimeout(focusTimer); };
  }, [open, onClose]);

  useEffect(() => { setError(""); window.setTimeout(() => firstField.current?.focus(), 30); }, [mode]);

  if (!open) return null;

  const switchMode = (next: Mode) => { setMode(next); setPassword(""); };
  const submit = (event: React.FormEvent) => {
    event.preventDefault();
    const value = login.trim();
    const isPhone = /^(\+?88)?01[3-9]\d{8}$/.test(value.replace(/[\s-]/g, ""));
    const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
    if (mode === "signup" && !name.trim()) return setError("Please enter your full name.");
    if (!isPhone && !isEmail) return setError("Enter a valid Bangladeshi mobile number or email address.");
    if (password.length < 6) return setError("Password must be at least 6 characters.");
    const displayName = mode === "signup" ? name.trim() : isEmail ? value.split("@")[0] : "Friend";
    onSignIn(displayName.charAt(0).toUpperCase() + displayName.slice(1));
  };
  const socialSignIn = (provider: string) => onSignIn(`${provider} user`);

  return <div className="auth-backdrop" onClick={onClose} role="presentation">
    <div className="auth-modal" onClick={(event) => event.stopPropagation()} role="dialog" aria-modal="true" aria-labelledby="auth-title">
      <aside className="auth-brand" aria-hidden="true">
        <span className="auth-brand-glow" />
        <span className="auth-logo-chip"><img className="auth-logo" src="/amzad-food-website/logo.png" alt="" /></span>
        <div className="auth-brand-copy">
          <span className="auth-hello">স্বাগতম 👋</span>
          <h3>{mode === "signin" ? <>Welcome back to<br /><em>pure, honest food.</em></> : <>Join the family,<br /><em>eat better every day.</em></>}</h3>
        </div>
        <ul className="auth-perks">{perks.map(perk => <li key={perk.title}><i><perk.icon size={16} /></i><span><b>{perk.title}</b>{perk.text}</span></li>)}</ul>
        <div className="auth-proof">
          <span className="avatar-stack"><i>F</i><i>A</i><i>M</i></span>
          <span><b><Star size={12} fill="currentColor" /> 4.9 rating</b>Trusted by 10,000+ families</span>
        </div>
      </aside>

      <section className="auth-panel">
        <button className="auth-close" onClick={onClose} aria-label="Close"><X size={18} /></button>
        <img className="auth-logo auth-logo-mobile" src="/amzad-food-website/logo.png" alt="Amzad Food" />
        <h2 id="auth-title">{mode === "signin" ? "Sign in to your account" : "Create your account"}</h2>
        <p className="auth-sub">{mode === "signin" ? "Good to see you again! Enter your details to continue." : "It takes less than a minute — and your first order gets 10% off."}</p>

        <div className="auth-tabs" role="tablist" aria-label="Account">
          <button role="tab" aria-selected={mode === "signin"} className={mode === "signin" ? "active" : ""} onClick={() => switchMode("signin")}>Sign In</button>
          <button role="tab" aria-selected={mode === "signup"} className={mode === "signup" ? "active" : ""} onClick={() => switchMode("signup")}>Create Account</button>
          <span className={`auth-tab-pill ${mode}`} aria-hidden="true" />
        </div>

        <form className="auth-fields" onSubmit={submit} noValidate>
          {mode === "signup" && <label className="auth-field"><span>Full name</span><div><UserRound size={16} /><input ref={firstField} value={name} onChange={(event) => setName(event.target.value)} placeholder="e.g. Farhana Akter" autoComplete="name" /></div></label>}
          <label className="auth-field"><span>Mobile number or email</span><div><Mail size={16} /><input ref={mode === "signin" ? firstField : undefined} value={login} onChange={(event) => setLogin(event.target.value)} placeholder="01XXXXXXXXX or you@example.com" autoComplete="username" inputMode="email" /></div></label>
          <label className="auth-field">
            <span>Password{mode === "signin" && <button type="button" className="auth-link" onClick={() => setError("Password reset is coming soon — message us on WhatsApp for help.")}>Forgot password?</button>}</span>
            <div><Lock size={16} /><input type={showPassword ? "text" : "password"} value={password} onChange={(event) => setPassword(event.target.value)} placeholder={mode === "signin" ? "Enter your password" : "At least 6 characters"} autoComplete={mode === "signin" ? "current-password" : "new-password"} /><button type="button" className="auth-eye" onClick={() => setShowPassword(!showPassword)} aria-label={showPassword ? "Hide password" : "Show password"}>{showPassword ? <EyeOff size={16} /> : <Eye size={16} />}</button></div>
          </label>
          {mode === "signin" && <label className="auth-remember"><input type="checkbox" defaultChecked /> Keep me signed in</label>}
          {error && <p className="auth-error" role="alert">{error}</p>}
          <button className="cta cta-block auth-submit" type="submit"><span>{mode === "signin" ? "Sign In" : "Create Account"}</span><i className="cta-icon"><ArrowRight size={15} /></i></button>
        </form>

        <div className="auth-divider"><span>or continue with</span></div>
        <div className="auth-social">
          <button type="button" onClick={() => socialSignIn("Google")}><FontAwesomeIcon icon={faGoogle} /> Google</button>
          <button type="button" className="whatsapp" onClick={() => socialSignIn("WhatsApp")}><FontAwesomeIcon icon={faWhatsapp} /> WhatsApp</button>
        </div>

        <p className="auth-switch">{mode === "signin" ? <>New to Amzad Food? <button type="button" onClick={() => switchMode("signup")}>Create an account</button></> : <>Already have an account? <button type="button" onClick={() => switchMode("signin")}>Sign in</button></>}</p>
        <p className="auth-terms"><ShieldCheck size={13} /> Your details are safe with us. By continuing you agree to our Terms &amp; Privacy Policy.</p>
      </section>
    </div>
  </div>;
}
