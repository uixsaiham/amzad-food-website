import type { Metadata } from "next";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
import "./globals.css";
import ChatWidget from "./components/ChatWidget";

config.autoAddCss = false;

export const metadata: Metadata = {
  title: "Amzad Food | Better choices, delivered",
  description: "Authentic Bangladeshi foods and trusted essentials, sourced with care.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}<ChatWidget /></body>
    </html>
  );
}
