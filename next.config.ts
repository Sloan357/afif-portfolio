import path from "node:path";
import type { NextConfig } from "next";
import { defaultLocale } from "./i18n/routing";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "api.afifelcharif.com",
        pathname: "/storage/media/**",
      },
      {
        protocol: "http",
        hostname: "127.0.0.1",
        port: "8000",
        pathname: "/storage/media/**",
      },
      {
        protocol: "http",
        hostname: "localhost",
        port: "8000",
        pathname: "/storage/media/**",
      },
    ],
  },
  turbopack: {
    root: path.resolve(__dirname),
  },
  async redirects() {
    return [
      {
        source: "/",
        destination: `/${defaultLocale}`,
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
