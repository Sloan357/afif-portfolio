import type { MetadataRoute } from "next";

const siteUrl = "https://afifelcharif.com";

const staticRoutes = [
  {
    path: "/en",
    changeFrequency: "monthly",
    priority: 1,
  },
  {
    path: "/fr",
    changeFrequency: "monthly",
    priority: 0.8,
  },
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  return staticRoutes.map((route) => ({
    url: `${siteUrl}${route.path}`,
    lastModified: new Date(),
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}
