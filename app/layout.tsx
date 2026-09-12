import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Amzad Food | Better choices, delivered",
  description: "Authentic Bangladeshi foods and trusted essentials, sourced with care.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
