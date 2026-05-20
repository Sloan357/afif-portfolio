import { resolveLocalizedContent, type LocalizedContent } from "@/i18n/content";
import type { Locale } from "@/i18n/routing";

export type HeroData = {
  badge: {
    label: string;
    meta: string;
  };
  headline: string;
  description: string;
  ctas: Array<{
    label: string;
    href: string;
    variant: "primary" | "secondary";
  }>;
  capabilities: Array<{ label: string; value: string }>;
  architecture: {
    eyebrow: string;
    title: string;
    status: string;
    clients: string[];
    core: {
      eyebrow: string;
      title: string;
      version: string;
      services: Array<{ label: string; value: string }>;
    };
    foundations: Array<{ label: string; value: string }>;
    boundary: {
      label: string;
      value: string;
    };
  };
};

export const heroContent: LocalizedContent<HeroData> = {
  en: {
    badge: {
      label: "Full-stack software engineer",
      meta: "APIs, systems, interfaces",
    },
    headline: "I build reliable software across backend, web, and mobile.",
    description:
      "I'm Afif. I work close to the data model, API boundaries, and frontend runtime to ship systems that are maintainable under real usage: Laravel, Symfony, React, React Native, and AI-integrated workflows.",
    ctas: [
      {
        label: "Inspect projects",
        href: "#projects",
        variant: "primary",
      },
      {
        label: "Contact",
        href: "#contact",
        variant: "secondary",
      },
    ],
    capabilities: [
      { label: "Backend", value: "Laravel, Symfony, REST APIs" },
      { label: "Frontend", value: "React, Next.js, stateful UI" },
      { label: "Mobile", value: "React Native, app workflows" },
    ],
    architecture: {
      eyebrow: "Architecture",
      title: "Product system card",
      status: "API-first",
      clients: ["Web app", "Mobile app"],
      core: {
        eyebrow: "Core",
        title: "Laravel / Symfony API",
        version: "/v1",
        services: [
          { label: "Auth", value: "Sessions, roles" },
          { label: "API", value: "REST contracts" },
          { label: "Jobs", value: "Queues, workers" },
        ],
      },
      foundations: [
        { label: "MariaDB", value: "Relational data model" },
        { label: "AI layer", value: "Tool-backed workflows" },
      ],
      boundary: {
        label: "Boundaries",
        value: "UI - API - DATA",
      },
    },
  },
  fr: {
    badge: {
      label: "Ingenieur logiciel full-stack",
      meta: "APIs, systemes, interfaces",
    },
    headline: "Je construis des logiciels fiables pour le backend, le web et le mobile.",
    description:
      "Je suis Afif. Je travaille au plus pres du modele de donnees, des frontieres API et du runtime frontend pour livrer des systemes maintenables en usage reel : Laravel, Symfony, React, React Native et workflows integres a l'IA.",
    ctas: [
      {
        label: "Voir les projets",
        href: "#projects",
        variant: "primary",
      },
      {
        label: "Contact",
        href: "#contact",
        variant: "secondary",
      },
    ],
    capabilities: [
      { label: "Backend", value: "Laravel, Symfony, REST APIs" },
      { label: "Frontend", value: "React, Next.js, UI avec etat" },
      { label: "Mobile", value: "React Native, workflows applicatifs" },
    ],
  },
};

export function getHeroData(locale: Locale) {
  return resolveLocalizedContent<HeroData>(heroContent, locale).content;
}

export const heroData = heroContent.en;
