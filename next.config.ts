import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  output : 'export',
  basePath : '/finance_bot',
  eslint : {
      ignoreDuringBuilds : true
  }
};

export default nextConfig;
