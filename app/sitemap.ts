import type { MetadataRoute } from "next";

const siteUrl = "https://afifelcharif.com";

const staticRoutes = [
  {
    path: "",
    changeFrequency: "monthly",
    priority: 1,
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
