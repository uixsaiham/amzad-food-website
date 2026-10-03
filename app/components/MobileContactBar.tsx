import { Phone } from "lucide-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";

export default function MobileContactBar() {
  return <aside className="mobile-contact-bar" aria-label="Customer support">
    <span className="mobile-contact-label" lang="bn">প্রয়োজনে কল করুন</span>
    <a href="https://wa.me/8801327406605" target="_blank" rel="noreferrer" aria-label="WhatsApp 01327406605"><FontAwesomeIcon icon={faWhatsapp} />01327406605</a>
    <span className="mobile-contact-divider" aria-hidden="true" />
    <a href="tel:+8809613824071" aria-label="Call 09613824071"><Phone size={13} />09613824071</a>
  </aside>;
}
