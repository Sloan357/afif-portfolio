import { defaultLocale, type Locale } from "@/i18n/routing";

export type TranslationStatus = "published" | "draft" | "missing";

export type LocalizedContent<TContent extends Record<string, unknown>> = {
  en: TContent;
  fr?: Partial<TContent> | null;
};

export type LocalizedContentEntry<TContent extends Record<string, unknown>> = {
  locale: Locale;
  status: TranslationStatus;
  fields: Partial<TContent>;
};

export type CmsLocalizedContent<TContent extends Record<string, unknown>> = {
  translations: LocalizedContentEntry<TContent>[];
};

export type ResolvedLocalizedContent<TContent extends Record<string, unknown>> = {
  content: TContent;
  requestedLocale: Locale;
  resolvedLocale: Locale;
  fallbackLocale: typeof defaultLocale;
  fallbackUsed: boolean;
  missingFields: Array<keyof TContent>;
};

type ResolveLocalizedContentOptions = {
  treatEmptyStringAsMissing?: boolean;
};

function isMissingValue(value: unknown, options: ResolveLocalizedContentOptions) {
  if (value === null || value === undefined) {
    return true;
  }

  return options.treatEmptyStringAsMissing === true && value === "";
}

function removeMissingFields<TContent extends Record<string, unknown>>(
  content: Partial<TContent>,
  options: ResolveLocalizedContentOptions,
) {
  return Object.fromEntries(
    Object.entries(content).filter(
      ([, value]) => !isMissingValue(value, options),
    ),
  ) as Partial<TContent>;
}

export function resolveLocalizedContent<TContent extends Record<string, unknown>>(
  localizedContent: LocalizedContent<TContent>,
  locale: Locale,
  options: ResolveLocalizedContentOptions = {},
): ResolvedLocalizedContent<TContent> {
  const englishContent = localizedContent.en;
  const requestedContent = locale === defaultLocale ? englishContent : localizedContent[locale];

  if (locale === defaultLocale) {
    return {
      content: englishContent,
      requestedLocale: locale,
      resolvedLocale: defaultLocale,
      fallbackLocale: defaultLocale,
      fallbackUsed: false,
      missingFields: [],
    };
  }

  const availableContent = requestedContent
    ? removeMissingFields(requestedContent, options)
    : {};

  const missingFields = Object.keys(englishContent).filter((field) =>
    isMissingValue(requestedContent?.[field], options),
  ) as Array<keyof TContent>;

  return {
    content: {
      ...englishContent,
      ...availableContent,
    },
    requestedLocale: locale,
    resolvedLocale: missingFields.length > 0 ? defaultLocale : locale,
    fallbackLocale: defaultLocale,
    fallbackUsed: missingFields.length > 0,
    missingFields,
  };
}

export function resolveCmsLocalizedContent<
  TContent extends Record<string, unknown>,
>(
  cmsContent: CmsLocalizedContent<TContent>,
  locale: Locale,
  options: ResolveLocalizedContentOptions = {},
): ResolvedLocalizedContent<TContent> {
  const englishTranslation = cmsContent.translations.find(
    (translation) => translation.locale === defaultLocale,
  );

  if (!englishTranslation) {
    throw new Error("English content is required for localized CMS entries.");
  }

  const requestedTranslation = cmsContent.translations.find(
    (translation) =>
      translation.locale === locale && translation.status === "published",
  );

  return resolveLocalizedContent(
    {
      en: englishTranslation.fields as TContent,
      fr:
        requestedTranslation?.locale === "fr"
          ? requestedTranslation.fields
          : undefined,
    },
    locale,
    options,
  );
}
