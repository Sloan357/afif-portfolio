import type { MetadataRoute } from "next";
import { siteUrl } from "@/config/site";
import { getFeaturedProjects } from "@/data/projects";
import { supportedLocales } from "@/i18n/routing";

const localizedHomeRoutes = supportedLocales.map((locale) => ({
  path: `/${locale}`,
  changeFrequency: "monthly",
  priority: locale === "en" ? 1 : 0.8,
})) satisfies Array<{
  path: string;
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
  priority: number;
}>;

const localizedProjectRoutes = supportedLocales.flatMap((locale) =>
  getFeaturedProjects().map((project) => ({
    path: `/${locale}/projects/${project.slug}`,
    changeFrequency: "monthly",
    priority: locale === "en" ? 0.7 : 0.6,
  })),
) satisfies Array<{
  path: string;
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
  priority: number;
}>;

export default function sitemap(): MetadataRoute.Sitemap {
  return [...localizedHomeRoutes, ...localizedProjectRoutes].map((route) => ({
    url: `${siteUrl}${route.path}`,
    lastModified: new Date(),
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}
