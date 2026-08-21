import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  productionBrowserSourceMaps: true,
  experimental: {
    turbopackMinify: true,
    inlineCss: true,
  },
};

export default nextConfig;
