import type { Metadata } from "next";
import { siteUrl } from "@/config/site";
import type { SeoData } from "@/data/types";
import { resolveLocalizedContent, type LocalizedContent } from "@/i18n/content";
import { defaultLocale, supportedLocales, type Locale } from "@/i18n/routing";

export type { SeoData } from "@/data/types";

export const seoContent: LocalizedContent<SeoData> = {
  en: {
    metaTitle: "Afif El Charif - Full-Stack Software Engineer",
    metaDescription:
      "Portfolio of Afif El Charif, a full-stack software engineer focused on Laravel, Symfony, React Native, Next.js, AI integrations, CMS platforms, and production deployments.",
    canonicalUrl: `${siteUrl}/en`,
    ogTitle: "Afif El Charif - Full-Stack Software Engineer",
    ogDescription:
      "Full-stack software engineering portfolio focused on Laravel, Symfony, React Native, Next.js, AI integrations, CMS platforms, and production deployments.",
    ogImage: null,
    twitterTitle: "Afif El Charif - Full-Stack Software Engineer",
    twitterDescription:
      "Portfolio focused on Laravel, Symfony, React Native, Next.js, AI integrations, CMS platforms, and production deployments.",
    twitterImage: null,
    noIndex: false,
  },
  fr: {
    metaTitle: "Afif El Charif - Ingenieur logiciel full-stack",
    metaDescription:
      "Portfolio d'Afif El Charif, ingenieur logiciel full-stack specialise en Laravel, Symfony, React Native, Next.js, integrations IA, plateformes CMS et deploiements en production.",
    canonicalUrl: `${siteUrl}/fr`,
    ogTitle: "Afif El Charif - Ingenieur logiciel full-stack",
    ogDescription:
      "Portfolio d'ingenierie full-stack autour de Laravel, Symfony, React Native, Next.js, integrations IA, plateformes CMS et deploiements en production.",
    ogImage: null,
    twitterTitle: "Afif El Charif - Ingenieur logiciel full-stack",
    twitterDescription:
      "Portfolio centre sur Laravel, Symfony, React Native, Next.js, integrations IA, plateformes CMS et deploiements en production.",
    twitterImage: null,
    noIndex: false,
  },
};

function normalizePath(path: string) {
  if (!path || path === "/") {
    return "";
  }

  return path.startsWith("/") ? path : `/${path}`;
}

export function getLocalizedUrl(locale: Locale, path = "") {
  return `${siteUrl}/${locale}${normalizePath(path)}`;
}

export function getLanguageAlternates(path = "") {
  return {
    ...Object.fromEntries(
      supportedLocales.map((locale) => [locale, getLocalizedUrl(locale, path)]),
    ),
    "x-default": getLocalizedUrl(defaultLocale, path),
  };
}

export function getSeoData(locale: Locale, path = ""): SeoData {
  const seo = resolveLocalizedContent<SeoData>(seoContent, locale).content;

  return {
    ...seo,
    canonicalUrl: getLocalizedUrl(locale, path),
  };
}

export function createMetadataFromSeo(
  seo: SeoData,
  locale: Locale,
  path = "",
  type: "website" | "article" = "website",
): Metadata {
  return {
    metadataBase: new URL(siteUrl),
    title: seo.metaTitle,
    description: seo.metaDescription,
    alternates: {
      canonical: seo.canonicalUrl,
      languages: getLanguageAlternates(path),
    },
    robots: {
      index: !seo.noIndex,
      follow: !seo.noIndex,
    },
    openGraph: {
      title: seo.ogTitle,
      description: seo.ogDescription,
      url: seo.canonicalUrl,
      siteName: "Afif El Charif",
      locale,
      alternateLocale: supportedLocales.filter((item) => item !== locale),
      type,
      ...(seo.ogImage
        ? {
            images: [
              {
                url: seo.ogImage,
                alt: seo.ogTitle,
              },
            ],
          }
        : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: seo.twitterTitle,
      description: seo.twitterDescription,
      ...(seo.twitterImage
        ? {
            images: [seo.twitterImage],
          }
        : {}),
    },
  };
}

export const defaultSeoData: SeoData = seoContent.en;
