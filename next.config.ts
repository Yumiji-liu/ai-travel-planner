import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Cloudflare Pages适配 - 不使用output:export
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
