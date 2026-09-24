/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  distDir: process.env.NODE_ENV === "development" ? ".next-dev" : ".next",
  basePath: "/amzad-food-website",
  trailingSlash: true,
  ...(process.env.NODE_ENV === "development" ? {
    async redirects() {
      return [{ source: "/", destination: "/amzad-food-website/", basePath: false, permanent: false }];
    },
  } : {}),
  images: { unoptimized: true },
};

export default nextConfig;
