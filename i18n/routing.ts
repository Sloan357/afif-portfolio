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

export function switchLocalePath(pathname: string, targetLocale: Locale) {
  const segments = pathname.split("/").filter(Boolean);
  const currentLocale = segments[0];

  if (currentLocale && isSupportedLocale(currentLocale)) {
    return `/${[targetLocale, ...segments.slice(1)].join("/")}`;
  }

  return `/${[targetLocale, ...segments].join("/")}`;
}
