import Link from "next/link";
import { Truck } from "lucide-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";

export default function MobileContactBar() {
  return <aside className="mobile-contact-bar" aria-label="Customer support">
    <a href="https://wa.me/8801327406605" target="_blank" rel="noreferrer" aria-label="WhatsApp 01327406605"><FontAwesomeIcon icon={faWhatsapp} />01327406605</a>
    <span className="mobile-contact-divider" aria-hidden="true" />
    <Link href="/track-order/"><Truck size={13} />Track Order</Link>
  </aside>;
}
