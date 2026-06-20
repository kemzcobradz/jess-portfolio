import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/jess-portfolio",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
