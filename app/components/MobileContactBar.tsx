import Link from "next/link";
import { Phone } from "lucide-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";

export default function MobileContactBar() {
  return <aside className="mobile-contact-bar" aria-label="Customer support">
    <div className="mobile-contact-numbers">
    <a href="https://wa.me/8801327406605" target="_blank" rel="noreferrer" aria-label="WhatsApp 01327406605"><FontAwesomeIcon icon={faWhatsapp} />01327406605</a>
    <a href="tel:+8809613824071" aria-label="Call 09613824071"><Phone size={13} />09613824071</a>
    </div>
    <Link className="mobile-track-order" href="/track-order/">Track Order</Link>
  </aside>;
}
