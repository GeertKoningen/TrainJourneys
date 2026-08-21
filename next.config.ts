import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  productionBrowserSourceMaps: true,
  experimental: {
    turbopackMinify: true,
  },
};

export default nextConfig;
