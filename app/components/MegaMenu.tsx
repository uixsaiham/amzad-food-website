"use client";

import { ArrowRight, CakeSlice, Candy, Droplet, Gift, Leaf, Phone, Wheat } from "lucide-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";

// Hamburger menu: every category and page link, shared by the desktop mega menu and the mobile menu.
export const menuCategories: { label: string; bn: string; icon: string | typeof Leaf; tab?: string }[] = [
  { label: "Honey", bn: "মধু", icon: "/amzad-food-website/icons/category-honey.png" },
  { label: "Khejur", bn: "খেজুর", icon: "/amzad-food-website/icons/category-dates.png" },
  { label: "Gur", bn: "গুড়", icon: Candy },
  { label: "Ghee & Oil", bn: "ঘি ও তেল", icon: Droplet },
  { label: "Mosla", bn: "মসলা", icon: "/amzad-food-website/icons/category-spices.png" },
  { label: "Nuts", bn: "বাদাম", icon: "/amzad-food-website/icons/category-peanuts.png" },
  { label: "Seeds", bn: "বীজ", icon: "/amzad-food-website/icons/category-seeds.png" },
  { label: "Mango", bn: "আম", icon: "/amzad-food-website/icons/category-mango.png" },
  { label: "Pink Salt", bn: "পিংক লবণ", icon: "/amzad-food-website/icons/category-salt.png" },
  { label: "Combo", bn: "কম্বো", icon: "/amzad-food-website/icons/category-basket.png", tab: "Combo & Gifts" },
  { label: "Shemai", bn: "সেমাই", icon: Wheat },
  { label: "Veshoj Item", bn: "ভেষজ পণ্য", icon: Leaf },
  { label: "Dessert", bn: "ডেজার্ট", icon: CakeSlice },
];
export type MenuLink = { label: string; href?: string; action?: "account" | "track" | "soon" };
export const menuPages: MenuLink[] = [{ label: "Home", href: "#top" }, { label: "Products", href: "#shop" }, { label: "Blogs", href: "#blogs" }, { label: "About Us", href: "#story" }, { label: "Track Order", action: "track" }, { label: "My Account", action: "account" }];
export const menuHelp: MenuLink[] = [{ label: "Terms and Conditions", action: "soon" }, { label: "Return Policy", action: "soon" }, { label: "Privacy Policy", action: "soon" }];
export const MenuContact = () => <div className="menu-contact"><p><b>Need help ordering?</b><span>We reply every day until 11pm.</span></p><div className="menu-contact-actions"><a className="cta cta-whatsapp" href="https://wa.me/8801327406605" target="_blank" rel="noreferrer"><span>Chat on WhatsApp</span><i className="cta-icon"><FontAwesomeIcon icon={faWhatsapp} fontSize={16} /></i></a><a className="cta cta-light" href="tel:+8809613824071"><span>Call 09613824071</span><i className="cta-icon"><Phone size={15} /></i></a></div></div>;
export const MenuIcon = ({ icon }: { icon: string | typeof Leaf }) => typeof icon === "string" ? <img src={icon} alt="" aria-hidden="true" /> : (() => { const Icon = icon; return <Icon size={18} aria-hidden="true" />; })();

export type MenuCategory = (typeof menuCategories)[number];

// Desktop mega menu opened from the hamburger button; shared by the storefront and checkout headers.
export default function MegaMenu({ open, onClose, onCategory, onLink }: { open: boolean; onClose: () => void; onCategory: (category: MenuCategory) => void; onLink: (event: React.MouseEvent, link: MenuLink) => void }) {
  return <>{open && <button className="mega-menu-backdrop" onClick={onClose} aria-label="Close menu" />}<div className={open ? "mega-menu open" : "mega-menu"}><div className="mega-menu-inner"><div className="mega-cats"><p className="mega-menu-title">Shop by Category</p><div className="mega-category-grid">{menuCategories.map((category) => <a href="/amzad-food-website/#shop" key={category.label} onClick={(event) => { event.preventDefault(); onCategory(category); }}><span><MenuIcon icon={category.icon} /></span><b>{category.label}</b><small>{category.bn}</small></a>)}</div><MenuContact /></div><div className="mega-links"><p className="mega-menu-title">Menu</p><ul>{menuPages.map(link => <li key={link.label}><a href={link.href ? `/amzad-food-website/${link.href}` : "#"} onClick={(event) => onLink(event, link)}>{link.label}<ArrowRight size={13} /></a></li>)}</ul><p className="mega-menu-title">Help &amp; Policies</p><ul>{menuHelp.map(link => <li key={link.label}><a href="#" onClick={(event) => onLink(event, link)}>{link.label}<ArrowRight size={13} /></a></li>)}</ul></div><div className="mega-promo"><span className="mega-promo-icon"><Gift size={20} /></span><strong>Gift Boxes</strong><p>Curated hampers perfect for festivals, weddings or a thoughtful everyday surprise.</p><a href="/amzad-food-website/#shop" className="cta cta-sm" onClick={onClose}><span>Explore Gifts</span><i className="cta-icon"><Gift size={14} /></i></a></div></div></div></>;
}
