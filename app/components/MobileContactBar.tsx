import Link from "next/link";
import { Phone } from "lucide-react";

export default function MobileContactBar() {
  return <aside className="mobile-contact-bar" aria-label="Customer support">
    <a href="tel:+8809613824071" aria-label="Call 09613824071"><Phone size={13} />09613824071</a>
    <Link className="mobile-track-order" href="/track-order/">Track Order</Link>
  </aside>;
}
