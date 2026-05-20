export const supportedLocales = ["en", "fr"] as const;

export type Locale = (typeof supportedLocales)[number];

export const defaultLocale: Locale = "en";

export function isSupportedLocale(locale: string): locale is Locale {
  return supportedLocales.includes(locale as Locale);
}

export function localizedPath(locale: Locale, href: string) {
  if (href === "#") {
    return `/${locale}`;
  }

  if (href.startsWith("#")) {
    return `/${locale}${href}`;
  }

  if (href.startsWith("/en") || href.startsWith("/fr")) {
    return href;
  }

  if (href.startsWith("/")) {
    return `/${locale}${href}`;
  }

  return href;
}
