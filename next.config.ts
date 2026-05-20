import type { NextConfig } from "next";
import { defaultLocale } from "./i18n/routing";

const nextConfig: NextConfig = {
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
