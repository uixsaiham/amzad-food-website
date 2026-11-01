"use client";
import BlogCarousel from "./BlogCards";
import ImpactStats from "./ImpactStats";

export const blogReviews = [
  { videoId: "7ufrbw4XUv", image: "/amzad-food-website/blog-review-1.png", alt: "মেদ ঝরানো এখন আরও সহজ" },
  { videoId: "ApFoP_xcJSE", image: "/amzad-food-website/blog-review-2.png", alt: "অতিরিক্ত ওজন কমান প্রাকৃতিক উপায়ে" },
  { videoId: "hu5xopcyCdI", image: "/amzad-food-website/blog-review-3.png", alt: "ছোট বড় অভ্যাসেই স্বাস্থ্যকর জীবন" },
];

export default function BlogSection({ withStats = false }: { withStats?: boolean }) {
  return <section className="video-reviews page-width" id="blogs">
    <BlogCarousel />
    {withStats && <ImpactStats />}
  </section>;
}
