import { resolveLocalizedContent } from "@/i18n/content";
import type { Locale } from "@/i18n/routing";

export type NavigationData = {
  logo: {
    label: string;
    href: string;
  };
  links: Array<{
    label: string;
    href: string;
  }>;
};

export const navigationContent = {
  en: {
    logo: {
      label: "Afif",
      href: "#",
    },
    links: [
      { label: "Projects", href: "#projects" },
      { label: "Labs", href: "#labs" },
      { label: "Experience", href: "#experience" },
      { label: "Contact", href: "#contact" },
    ],
  },
  fr: {
    logo: {
      label: "Afif",
      href: "#",
    },
    links: [
      { label: "Projets", href: "#projects" },
      { label: "Labs", href: "#labs" },
      { label: "Experience", href: "#experience" },
      { label: "Contact", href: "#contact" },
    ],
  },
};

export function getNavigationData(locale: Locale) {
  return resolveLocalizedContent<NavigationData>(navigationContent, locale)
    .content;
}

export const navigationData = navigationContent.en;
