import type { FeaturedProject } from "@/data/projects";
import type { SeoData } from "@/data/types";
import {
  getLanguageAlternates,
  getLocalizedUrl,
  siteUrl,
} from "@/data/seo";
import type { Locale } from "@/i18n/routing";

const personId = `${siteUrl}/#person`;
const websiteId = `${siteUrl}/#website`;
const organizationId = `${siteUrl}/#organization`;

export type JsonLdEntity = Record<string, unknown>;

export function createPersonJsonLd(): JsonLdEntity {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": personId,
    name: "Afif El Charif",
    url: siteUrl,
    jobTitle: "Full-Stack Software Engineer",
    sameAs: ["https://github.com/afifelcharif"],
    knowsAbout: [
      "Laravel",
      "Symfony",
      "React Native",
      "Next.js",
      "AI integrations",
      "CMS platforms",
      "Production deployments",
    ],
  };
}

export function createOrganizationJsonLd(): JsonLdEntity {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": organizationId,
    name: "Afif El Charif",
    url: siteUrl,
    founder: {
      "@id": personId,
    },
  };
}

export function createWebsiteJsonLd(
  locale: Locale,
  seo: SeoData,
): JsonLdEntity {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": websiteId,
    name: "Afif El Charif Portfolio",
    url: getLocalizedUrl(locale),
    inLanguage: locale,
    description: seo.metaDescription,
    publisher: {
      "@id": organizationId,
    },
    author: {
      "@id": personId,
    },
    potentialAction: {
      "@type": "ReadAction",
      target: Object.values(getLanguageAlternates()),
    },
  };
}

export function createHomepageJsonLd(locale: Locale, seo: SeoData) {
  return [
    createPersonJsonLd(),
    createOrganizationJsonLd(),
    createWebsiteJsonLd(locale, seo),
  ];
}

export function createProjectJsonLd(
  project: FeaturedProject,
  locale: Locale,
): JsonLdEntity {
  const path = `/projects/${project.slug}`;

  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    "@id": `${getLocalizedUrl(locale, path)}#creativework`,
    name: project.title,
    headline: project.subtitle,
    description: project.description,
    url: getLocalizedUrl(locale, path),
    inLanguage: locale,
    creator: {
      "@id": personId,
    },
    publisher: {
      "@id": organizationId,
    },
    about: project.categories,
    keywords: project.stack,
    image: project.coverImage?.src ?? undefined,
    isPartOf: {
      "@id": websiteId,
    },
  };
}
