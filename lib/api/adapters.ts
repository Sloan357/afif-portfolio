import { cmsAssetBaseUrl } from "@/config/cms";
import { getContactData } from "@/data/contact";
import { getExperienceData } from "@/data/experience";
import { getHeroData } from "@/data/hero";
import { getLabsData, type LabItem, type LabsDataShape } from "@/data/labs";
import { getNavigationData } from "@/data/navigation";
import {
  getFeaturedProjectsData,
  getProjectBySlug,
  type FeaturedProject,
  type FeaturedProjectsData,
} from "@/data/projects";
import { getSeoData } from "@/data/seo";
import type { CmsLink } from "@/data/types";
import type {
  CmsExperienceData,
  CmsExperiencePayload,
  CmsExperienceResponse,
  CmsHomeResponse,
  CmsLabPayload,
  CmsLabsResponse,
  CmsProjectPayload,
  CmsProjectResponse,
  CmsProjectsResponse,
  HomePageData,
} from "@/lib/api/types";
import type { Locale } from "@/i18n/routing";

type FallbackLogger = {
  add: (path: string) => void;
  flush: () => void;
};

function createFallbackLogger(
  locale: Locale,
  context = "Home adapter",
): FallbackLogger {
  const fields = new Set<string>();

  return {
    add(path) {
      fields.add(path);
    },
    flush() {
      if (process.env.NODE_ENV !== "development" || fields.size === 0) {
        return;
      }

      console.info(
        `[cms] ${context} used static fallback fields for locale "${locale}": ${[
          ...fields,
        ].join(", ")}.`,
      );
    },
  };
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

function camelToSnake(value: string) {
  return value.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`);
}

function readCmsField(source: Record<string, unknown>, key: string) {
  if (key in source) {
    return { found: true, value: source[key] };
  }

  const snakeKey = camelToSnake(key);

  if (snakeKey in source) {
    return { found: true, value: source[snakeKey] };
  }

  return { found: false, value: undefined };
}

function getArrayItemLabel(item: unknown, index: number) {
  if (isRecord(item)) {
    const slug = item.slug;
    const type = item.type;
    const label = item.label;

    if (typeof slug === "string") {
      return slug;
    }

    if (typeof type === "string") {
      return type;
    }

    if (typeof label === "string") {
      return label;
    }
  }

  return String(index);
}

function getArrayItemFallback<TItem>(
  item: unknown,
  fallbackItems: TItem[],
  index: number,
) {
  if (isRecord(item) && typeof item.slug === "string") {
    const matchedItem = fallbackItems.find(
      (fallbackItem) =>
        isRecord(fallbackItem) && fallbackItem.slug === item.slug,
    );

    if (matchedItem) {
      return matchedItem;
    }
  }

  return fallbackItems[index] ?? fallbackItems[0];
}

function mergeWithStaticShape<TFallback>(
  cmsValue: unknown,
  fallbackValue: TFallback,
  path: string,
  logger: FallbackLogger,
): TFallback {
  if (Array.isArray(fallbackValue)) {
    if (!Array.isArray(cmsValue)) {
      logger.add(path);
      return fallbackValue;
    }

    return cmsValue.map((item, index) => {
      const fallbackItem = getArrayItemFallback(item, fallbackValue, index);

      if (fallbackItem === undefined) {
        return item;
      }

      return mergeWithStaticShape(
        item,
        fallbackItem,
        `${path}[${getArrayItemLabel(item, index)}]`,
        logger,
      );
    }) as TFallback;
  }

  if (isRecord(fallbackValue)) {
    if (!isRecord(cmsValue)) {
      logger.add(path);
      return fallbackValue;
    }

    return Object.fromEntries(
      Object.entries(fallbackValue).map(([key, fallbackFieldValue]) => {
        const cmsField = readCmsField(cmsValue, key);
        const fieldPath = `${path}.${key}`;

        if (!cmsField.found) {
          logger.add(fieldPath);
          return [key, fallbackFieldValue];
        }

        return [
          key,
          mergeWithStaticShape(
            cmsField.value,
            fallbackFieldValue,
            fieldPath,
            logger,
          ),
        ];
      }),
    ) as TFallback;
  }

  if (fallbackValue === null) {
    return (cmsValue ?? fallbackValue) as TFallback;
  }

  if (typeof fallbackValue === "string") {
    if (typeof cmsValue !== "string") {
      logger.add(path);
      return fallbackValue;
    }

    return cmsValue as TFallback;
  }

  if (typeof fallbackValue === "boolean") {
    if (typeof cmsValue !== "boolean") {
      logger.add(path);
      return fallbackValue;
    }

    return cmsValue as TFallback;
  }

  if (typeof fallbackValue === "number") {
    if (typeof cmsValue !== "number") {
      logger.add(path);
      return fallbackValue;
    }

    return cmsValue as TFallback;
  }

  return (cmsValue ?? fallbackValue) as TFallback;
}

function readCmsArrayField(source: Record<string, unknown>, key: string) {
  const field = readCmsField(source, key);

  return Array.isArray(field.value) ? field.value : null;
}

function readCmsBooleanField(
  source: Record<string, unknown>,
  key: string,
  fallback: boolean,
) {
  const value = readCmsField(source, key).value;

  return typeof value === "boolean" ? value : fallback;
}

function inferContactLinkType(link: Record<string, unknown>) {
  const explicitType = readCmsField(link, "type").value;

  if (typeof explicitType === "string" && explicitType.trim()) {
    return explicitType.toLowerCase();
  }

  const label = readCmsField(link, "label").value;
  const href = readCmsField(link, "href").value;
  const haystack = `${typeof label === "string" ? label : ""} ${
    typeof href === "string" ? href : ""
  }`.toLowerCase();

  if (haystack.includes("github")) {
    return "github";
  }

  if (haystack.includes("linkedin")) {
    return "linkedin";
  }

  if (haystack.includes("mailto:") || haystack.includes("email")) {
    return "email";
  }

  if (haystack.includes("cv") || haystack.includes("resume")) {
    return "cv";
  }

  if (haystack.includes("calendly") || haystack.includes("book")) {
    return "booking";
  }

  return "link";
}

function getContactLinkHref(link: Record<string, unknown>, type: string) {
  const href = readCmsField(link, "href").value;
  const url = readCmsField(link, "url").value;
  const email = readCmsField(link, "email").value;

  if (typeof href === "string" && href.trim()) {
    return href;
  }

  if (typeof url === "string" && url.trim()) {
    return url;
  }

  if (type === "email" && typeof email === "string" && email.trim()) {
    return email.startsWith("mailto:") ? email : `mailto:${email}`;
  }

  return null;
}

function getContactLinkLabel(link: Record<string, unknown>, type: string) {
  const label = readCmsField(link, "label").value;

  if (typeof label === "string" && label.trim()) {
    return label;
  }

  const fallbackLabels: Record<string, string> = {
    email: "Email me",
    github: "GitHub",
    linkedin: "LinkedIn",
    cv: "Download CV",
    booking: "Book a call",
  };

  return fallbackLabels[type] ?? "Link";
}

function normalizeContactLink(
  link: unknown,
  defaultVisible: boolean,
): CmsLink | null {
  if (!isRecord(link)) {
    return null;
  }

  const type = inferContactLinkType(link);
  const href = getContactLinkHref(link, type);

  if (!href) {
    return null;
  }

  const isExternal =
    readCmsField(link, "isExternal").value ??
    readCmsField(link, "external").value;
  const opensInNewTab =
    readCmsField(link, "opensInNewTab").value ??
    readCmsField(link, "newTab").value;
  const isPrimary = readCmsField(link, "isPrimary").value;

  return {
    label: getContactLinkLabel(link, type),
    href,
    type,
    isExternal:
      typeof isExternal === "boolean"
        ? isExternal
        : href.startsWith("http://") || href.startsWith("https://"),
    opensInNewTab:
      typeof opensInNewTab === "boolean"
        ? opensInNewTab
        : href.startsWith("http://") || href.startsWith("https://"),
    isVisible: readCmsBooleanField(link, "isVisible", defaultVisible),
    ...(typeof isPrimary === "boolean" ? { isPrimary } : {}),
  } satisfies CmsLink;
}

function mergeCmsContactSettings(
  cmsHome: CmsHomeResponse,
  contactData: HomePageData["contact"],
  locale: Locale,
) {
  const logger = createFallbackLogger(locale, "Contact settings adapter");
  const settings = readCmsField(
    cmsHome as Record<string, unknown>,
    "settings",
  ).value;

  if (!isRecord(settings)) {
    logger.add("settings");
    logger.flush();

    return contactData;
  }

  const socialLinks = readCmsArrayField(settings, "socialLinks");

  if (!socialLinks || socialLinks.length === 0) {
    logger.add("settings.socialLinks");
    logger.flush();

    return contactData;
  }

  const contactLinks = readCmsArrayField(settings, "contactLinks") ?? [];
  const visibleContactLinks = contactLinks.filter(
    (link) => isRecord(link) && readCmsBooleanField(link, "isVisible", false),
  );
  const cmsActions = [
    ...socialLinks.map((link) => normalizeContactLink(link, true)),
    ...visibleContactLinks.map((link) => normalizeContactLink(link, true)),
  ].filter((link): link is CmsLink => Boolean(link));

  if (cmsActions.length === 0) {
    logger.add("settings.socialLinks.actions");
    logger.flush();

    return contactData;
  }

  logger.flush();

  return {
    ...contactData,
    actions: cmsActions,
  };
}

function readHomeSection(
  cmsHome: CmsHomeResponse,
  key: keyof HomePageData,
  aliases: string[] = [],
) {
  const source = cmsHome as Record<string, unknown>;

  for (const candidateKey of [key, ...aliases]) {
    const field = readCmsField(source, candidateKey);

    if (field.found) {
      return field.value;
    }
  }

  return undefined;
}

export function getStaticHomeData(locale: Locale): HomePageData {
  return {
    navigation: getNavigationData(locale),
    hero: getHeroData(locale),
    featuredProjects: getFeaturedProjectsData(locale),
    labs: getLabsData(locale),
    experience: getExperienceData(locale),
    contact: getContactData(locale),
    seo: getSeoData(locale),
  };
}

export function adaptCmsHome(
  cmsHome: CmsHomeResponse | null,
  locale: Locale,
): HomePageData {
  const staticHomeData = getStaticHomeData(locale);

  if (!cmsHome) {
    return staticHomeData;
  }

  const logger = createFallbackLogger(locale);
  const adaptedHomeData: HomePageData = {
    navigation: mergeWithStaticShape(
      readHomeSection(cmsHome, "navigation"),
      staticHomeData.navigation,
      "navigation",
      logger,
    ),
    hero: mergeWithStaticShape(
      readHomeSection(cmsHome, "hero"),
      staticHomeData.hero,
      "hero",
      logger,
    ),
    featuredProjects: mergeWithStaticShape(
      readHomeSection(cmsHome, "featuredProjects", ["projects"]),
      staticHomeData.featuredProjects,
      "featuredProjects",
      logger,
    ),
    labs: mergeWithStaticShape(
      readHomeSection(cmsHome, "labs"),
      staticHomeData.labs,
      "labs",
      logger,
    ),
    experience: mergeWithStaticShape(
      readHomeSection(cmsHome, "experience"),
      staticHomeData.experience,
      "experience",
      logger,
    ),
    contact: mergeCmsContactSettings(
      cmsHome,
      mergeWithStaticShape(
        readHomeSection(cmsHome, "contact"),
        staticHomeData.contact,
        "contact",
        logger,
      ),
      locale,
    ),
    seo: mergeWithStaticShape(
      readHomeSection(cmsHome, "seo"),
      staticHomeData.seo,
      "seo",
      logger,
    ),
  };

  logger.flush();

  return adaptedHomeData;
}

function toStringArray(value: unknown): string[] {
  if (!Array.isArray(value)) {
    return [];
  }

  return value.filter((item): item is string => typeof item === "string");
}

function readFirstStringField(source: Record<string, unknown>, keys: string[]) {
  const value = readFirstCmsField(source, keys);

  return typeof value === "string" && value.trim() ? value : null;
}

function resolveCmsAssetUrl(src: string | null) {
  if (!src) {
    return null;
  }

  if (/^(https?:|data:|blob:)/.test(src)) {
    return src;
  }

  if (src.startsWith("//")) {
    return `https:${src}`;
  }

  if (!cmsAssetBaseUrl) {
    return src;
  }

  try {
    return new URL(src, `${cmsAssetBaseUrl}/`).toString();
  } catch {
    return src;
  }
}

function normalizeImage(value: unknown) {
  if (!isRecord(value)) {
    return null;
  }

  const src = resolveCmsAssetUrl(
    readFirstStringField(value, [
      "src",
      "url",
      "originalUrl",
      "previewUrl",
      "path",
    ]),
  );
  const alt = readFirstStringField(value, ["alt", "altText", "name", "title"]);
  const variants = readCmsField(value, "variants").value;
  const conversions = readCmsField(value, "conversions").value;
  const desktopVariant = isRecord(variants)
    ? resolveCmsAssetUrl(
        readFirstStringField(variants, ["desktop", "large", "preview"]),
      )
    : null;
  const desktopConversion = isRecord(conversions)
    ? resolveCmsAssetUrl(
        readFirstStringField(conversions, ["desktop", "large", "preview"]),
      )
    : null;

  return {
    src,
    alt: alt ?? "Project preview",
    ...(desktopVariant || desktopConversion
      ? {
          variants: {
            desktop: desktopVariant ?? desktopConversion,
          },
        }
      : isRecord(variants)
        ? { variants }
        : {}),
  };
}

function normalizeImages(value: unknown) {
  if (!Array.isArray(value)) {
    return [];
  }

  return value.map(normalizeImage).filter((image) => image !== null);
}

function normalizeArchitectureNotes(value: unknown) {
  if (!Array.isArray(value)) {
    return [];
  }

  return value.map((section, index) => {
    if (!isRecord(section)) {
      return {
        title: `Note ${index + 1}`,
        summary: "",
        items: [],
      };
    }

    const title = readCmsField(section, "title").value;
    const summary = readCmsField(section, "summary").value;
    const items = readCmsField(section, "items").value;
    const isDefaultOpen = readCmsField(section, "isDefaultOpen").value;

    return {
      title: typeof title === "string" ? title : `Note ${index + 1}`,
      summary: typeof summary === "string" ? summary : "",
      items: toStringArray(items),
      ...(typeof isDefaultOpen === "boolean" ? { isDefaultOpen } : {}),
    };
  });
}

function normalizeExternalLinks(value: unknown) {
  if (!Array.isArray(value)) {
    return [];
  }

  return value.flatMap((link) => {
    if (!isRecord(link)) {
      return [];
    }

    const label = readCmsField(link, "label").value;
    const href = readCmsField(link, "href").value;
    const type = readCmsField(link, "type").value;
    const isExternal = readCmsField(link, "isExternal").value;
    const opensInNewTab = readCmsField(link, "opensInNewTab").value;
    const isVisible = readCmsField(link, "isVisible").value;

    if (typeof label !== "string" || typeof href !== "string") {
      return [];
    }

    return [
      {
        label,
        href,
        type: typeof type === "string" ? type : "link",
        isExternal: typeof isExternal === "boolean" ? isExternal : true,
        ...(typeof opensInNewTab === "boolean" ? { opensInNewTab } : {}),
        ...(typeof isVisible === "boolean" ? { isVisible } : {}),
      },
    ];
  });
}

function normalizeProjectShape(project: FeaturedProject, fallbackSlug: string) {
  const slug = project.slug || fallbackSlug;
  const cta = isRecord(project.cta) ? project.cta : null;
  const coverImage =
    normalizeImage(project.coverImage) ??
    normalizeImage(readCmsField(project, "featuredImage").value) ??
    normalizeImage(readCmsField(project, "seoImage").value);
  const ctaLabel = cta ? readCmsField(cta, "label").value : undefined;
  const ctaHref = cta ? readCmsField(cta, "href").value : undefined;

  return {
    ...project,
    slug,
    title: project.title || slug,
    subtitle: project.subtitle || "",
    description: project.description || "",
    type: project.type || "Project",
    categories: toStringArray(project.categories),
    coverImage,
    galleryImages: normalizeImages(project.galleryImages),
    stack: toStringArray(project.stack),
    role: project.role || "",
    architectureNotes: normalizeArchitectureNotes(project.architectureNotes),
    challenges: toStringArray(project.challenges),
    outcomes: toStringArray(project.outcomes),
    externalLinks: normalizeExternalLinks(project.externalLinks),
    cta: {
      label: typeof ctaLabel === "string" ? ctaLabel : "View detail",
      href: typeof ctaHref === "string" ? ctaHref : `/projects/${slug}`,
    },
  } satisfies FeaturedProject;
}

function readFirstCmsField(source: Record<string, unknown>, keys: string[]) {
  for (const key of keys) {
    const field = readCmsField(source, key);

    if (field.found) {
      return field.value;
    }
  }

  return undefined;
}

function formatExperiencePeriod(experience: Record<string, unknown>) {
  const period = readFirstCmsField(experience, [
    "period",
    "periodDisplay",
    "dateDisplay",
    "dateRange",
  ]);

  if (typeof period === "string" && period.trim()) {
    return period;
  }

  const startDate = readFirstCmsField(experience, [
    "startDate",
    "startedAt",
    "from",
    "startYear",
  ]);
  const endDate = readFirstCmsField(experience, [
    "endDate",
    "endedAt",
    "to",
    "endYear",
  ]);
  const isCurrent = readFirstCmsField(experience, ["isCurrent", "current"]);

  if (typeof startDate === "string" || typeof startDate === "number") {
    const endDisplay =
      isCurrent === true
        ? "Present"
        : typeof endDate === "string" || typeof endDate === "number"
          ? String(endDate)
          : "Present";

    return `${startDate} to ${endDisplay}`;
  }

  return "";
}

function readExperiencePayload(cmsExperience: CmsExperienceResponse | null) {
  if (!isRecord(cmsExperience)) {
    return null;
  }

  const experience = readCmsField(cmsExperience, "experience");

  if (isRecord(experience.value)) {
    return experience.value as CmsExperiencePayload;
  }

  return cmsExperience as CmsExperiencePayload;
}

function readExperienceItems(cmsExperience: Record<string, unknown>) {
  const experiences = readFirstCmsField(cmsExperience, [
    "experiences",
    "items",
    "timeline",
    "roles",
  ]);

  return Array.isArray(experiences) ? experiences : null;
}

function prepareCmsExperienceItem(item: unknown) {
  if (!isRecord(item)) {
    return item;
  }

  const preparedItem = { ...item };
  const role = readFirstCmsField(preparedItem, ["role", "title", "position"]);
  const technologies = readFirstCmsField(preparedItem, [
    "technologies",
    "stack",
    "techStack",
  ]);
  const responsibilities = readFirstCmsField(preparedItem, [
    "responsibilities",
    "responsibilityItems",
    "highlights",
    "items",
  ]);
  const summary = readFirstCmsField(preparedItem, [
    "summary",
    "description",
    "intro",
  ]);

  if (!readCmsField(preparedItem, "role").found && typeof role === "string") {
    preparedItem.role = role;
  }

  if (
    !readCmsField(preparedItem, "technologies").found &&
    Array.isArray(technologies)
  ) {
    preparedItem.technologies = technologies;
  }

  if (
    !readCmsField(preparedItem, "responsibilities").found &&
    Array.isArray(responsibilities)
  ) {
    preparedItem.responsibilities = responsibilities;
  }

  if (
    !readCmsField(preparedItem, "summary").found &&
    typeof summary === "string"
  ) {
    preparedItem.summary = summary;
  }

  if (!readCmsField(preparedItem, "period").found) {
    preparedItem.period = formatExperiencePeriod(preparedItem);
  }

  return preparedItem;
}

function prepareCmsExperiencePayload(cmsExperience: CmsExperiencePayload) {
  const preparedExperience = { ...cmsExperience };
  const experiences = readExperienceItems(preparedExperience);

  if (experiences) {
    preparedExperience.experiences = experiences.map(prepareCmsExperienceItem);
  }

  return preparedExperience;
}

function normalizeExperienceItem(item: unknown, index: number) {
  const experience = isRecord(item) ? item : {};
  const company = readCmsField(experience, "company").value;

  return {
    role:
      typeof readCmsField(experience, "role").value === "string"
        ? (readCmsField(experience, "role").value as string)
        : `Experience ${index + 1}`,
    company: typeof company === "string" && company.trim() ? company : null,
    period:
      typeof readCmsField(experience, "period").value === "string"
        ? (readCmsField(experience, "period").value as string)
        : "",
    summary:
      typeof readCmsField(experience, "summary").value === "string"
        ? (readCmsField(experience, "summary").value as string)
        : "",
    responsibilities: toStringArray(
      readCmsField(experience, "responsibilities").value,
    ),
    technologies: toStringArray(readCmsField(experience, "technologies").value),
  };
}

function normalizeExperienceShape(experienceData: CmsExperienceData) {
  return {
    ...experienceData,
    eyebrow: experienceData.eyebrow || "About / Experience",
    title: experienceData.title || "Experience",
    introduction: experienceData.introduction || "",
    focusAreas: toStringArray(experienceData.focusAreas),
    experiences: Array.isArray(experienceData.experiences)
      ? experienceData.experiences.map(normalizeExperienceItem)
      : [],
  } as CmsExperienceData;
}

export function adaptCmsExperience(
  cmsExperience: CmsExperienceResponse | null,
  locale: Locale,
  fallbackExperienceData?: CmsExperienceData,
): CmsExperienceData {
  const staticExperienceData =
    fallbackExperienceData ?? getExperienceData(locale);
  const logger = createFallbackLogger(locale, "Experience adapter");
  const experience = readExperiencePayload(cmsExperience);

  if (!experience) {
    logger.add("experience");
    logger.flush();

    return staticExperienceData;
  }

  const preparedExperience = prepareCmsExperiencePayload(experience);
  const adaptedExperience = mergeWithStaticShape(
    preparedExperience,
    staticExperienceData,
    "experience",
    logger,
  );

  logger.flush();

  return normalizeExperienceShape(adaptedExperience);
}

function createEmptyLabFallback(slug: string): LabItem {
  return {
    slug,
    title: slug,
    description: "",
    type: "Lab",
    coverImage: null,
    galleryImages: [],
    stack: [],
    showcase: "",
    concept: {
      summary: "",
      skillsDemonstrated: [],
      plannedArchitecture: [],
      whyItMatters: "",
      architectureNotes: [],
    },
    cta: {
      label: "View concept",
      href: "#contact",
    },
  };
}

function readLabsArray(cmsLabs: CmsLabsResponse | null) {
  if (Array.isArray(cmsLabs)) {
    return cmsLabs;
  }

  if (!isRecord(cmsLabs)) {
    return null;
  }

  const labs = readCmsField(cmsLabs, "labs");

  if (Array.isArray(labs.value)) {
    return labs.value as CmsLabPayload[];
  }

  return null;
}

function prepareCmsLabPayload(cmsLab: CmsLabPayload): CmsLabPayload {
  const preparedLab = { ...cmsLab };
  const stack = readCmsField(preparedLab, "stack");
  const technologies = readCmsField(preparedLab, "technologies");

  if (!stack.found && Array.isArray(technologies.value)) {
    preparedLab.stack = technologies.value;
  }

  const concept = readCmsField(preparedLab, "concept");
  const architectureNotes = readCmsField(preparedLab, "architectureNotes");

  if (isRecord(concept.value)) {
    const preparedConcept = { ...concept.value };
    const skillsDemonstrated = readCmsField(
      preparedConcept,
      "skillsDemonstrated",
    );
    const conceptTechnologies = readCmsField(preparedConcept, "technologies");

    if (!skillsDemonstrated.found && Array.isArray(conceptTechnologies.value)) {
      preparedConcept.skillsDemonstrated = conceptTechnologies.value;
    }

    if (
      !readCmsField(preparedConcept, "architectureNotes").found &&
      Array.isArray(architectureNotes.value)
    ) {
      preparedConcept.architectureNotes = architectureNotes.value;
    }

    preparedLab.concept = preparedConcept;
  } else if (Array.isArray(architectureNotes.value)) {
    preparedLab.concept = {
      architectureNotes: architectureNotes.value,
    };
  }

  return preparedLab;
}

function normalizeLabShape(lab: LabItem, fallbackSlug: string) {
  const slug = lab.slug || fallbackSlug;
  const cta = isRecord(lab.cta) ? lab.cta : null;
  const ctaLabel = cta ? readCmsField(cta, "label").value : undefined;
  const ctaHref = cta ? readCmsField(cta, "href").value : undefined;
  const concept = isRecord(lab.concept) ? lab.concept : null;

  return {
    ...lab,
    slug,
    title: lab.title || slug,
    description: lab.description || "",
    type: lab.type || "Lab",
    coverImage: normalizeImage(lab.coverImage),
    galleryImages: normalizeImages(lab.galleryImages),
    stack: toStringArray(lab.stack),
    showcase: lab.showcase || "",
    concept: {
      summary:
        concept && typeof readCmsField(concept, "summary").value === "string"
          ? (readCmsField(concept, "summary").value as string)
          : "",
      skillsDemonstrated: toStringArray(
        concept ? readCmsField(concept, "skillsDemonstrated").value : [],
      ),
      plannedArchitecture: toStringArray(
        concept ? readCmsField(concept, "plannedArchitecture").value : [],
      ),
      whyItMatters:
        concept &&
        typeof readCmsField(concept, "whyItMatters").value === "string"
          ? (readCmsField(concept, "whyItMatters").value as string)
          : "",
      architectureNotes: normalizeArchitectureNotes(
        concept ? readCmsField(concept, "architectureNotes").value : [],
      ),
    },
    cta: {
      label: typeof ctaLabel === "string" ? ctaLabel : "View concept",
      href: typeof ctaHref === "string" ? ctaHref : "#contact",
    },
  } satisfies LabItem;
}

function getLabFallback(
  cmsLab: CmsLabPayload,
  staticLabs: LabItem[],
  index: number,
) {
  if (typeof cmsLab.slug === "string") {
    return (
      staticLabs.find((lab) => lab.slug === cmsLab.slug) ??
      createEmptyLabFallback(cmsLab.slug)
    );
  }

  return staticLabs[index] ?? createEmptyLabFallback(`cms-lab-${index}`);
}

export function adaptCmsLabs(
  cmsLabs: CmsLabsResponse | null,
  locale: Locale,
  fallbackLabsData?: LabsDataShape,
): LabsDataShape {
  const staticLabsData = fallbackLabsData ?? getLabsData(locale);
  const logger = createFallbackLogger(locale, "Labs adapter");
  const labs = readLabsArray(cmsLabs);

  if (!labs || labs.length === 0) {
    logger.add("labs.labs");
    logger.flush();

    return staticLabsData;
  }

  const adaptedLabs = labs.map((lab, index) => {
    const preparedLab = prepareCmsLabPayload(lab);

    return normalizeLabShape(
      mergeWithStaticShape(
        preparedLab,
        getLabFallback(preparedLab, staticLabsData.labs, index),
        `labs.labs[${getArrayItemLabel(preparedLab, index)}]`,
        logger,
      ),
      typeof preparedLab.slug === "string"
        ? preparedLab.slug
        : `cms-lab-${index}`,
    );
  });

  logger.flush();

  return {
    ...staticLabsData,
    labs: adaptedLabs,
  };
}

function createEmptyProjectFallback(slug: string): FeaturedProject {
  return {
    slug,
    title: slug,
    subtitle: "",
    description: "",
    type: "Project",
    categories: [],
    coverImage: null,
    galleryImages: [],
    stack: [],
    role: "",
    architectureNotes: [],
    challenges: [],
    outcomes: [],
    externalLinks: [],
    cta: {
      label: "View detail",
      href: `/projects/${slug}`,
    },
  };
}

function readProjectsArray(cmsProjects: CmsProjectsResponse | null) {
  if (Array.isArray(cmsProjects)) {
    return cmsProjects;
  }

  if (!isRecord(cmsProjects)) {
    return null;
  }

  const projects = readCmsField(cmsProjects, "projects");

  if (Array.isArray(projects.value)) {
    return projects.value as CmsProjectPayload[];
  }

  const featuredProjects = readCmsField(cmsProjects, "featuredProjects");

  if (isRecord(featuredProjects.value)) {
    const featuredProjectItems = readCmsField(
      featuredProjects.value,
      "projects",
    );

    if (Array.isArray(featuredProjectItems.value)) {
      return featuredProjectItems.value as CmsProjectPayload[];
    }
  }

  return null;
}

function readProjectPayload(cmsProject: CmsProjectResponse | null) {
  if (!isRecord(cmsProject)) {
    return null;
  }

  const project = readCmsField(cmsProject, "project");

  if (isRecord(project.value)) {
    return project.value as CmsProjectPayload;
  }

  return cmsProject as CmsProjectPayload;
}

function readCmsProjectMediaSource(cmsProject: Record<string, unknown>) {
  const coverImage = readCmsField(cmsProject, "coverImage").value;
  const featuredImage = readCmsField(cmsProject, "featuredImage").value;
  const seoImage = readCmsField(cmsProject, "seoImage").value;

  if (normalizeImage(coverImage)?.src) {
    return coverImage;
  }

  if (normalizeImage(featuredImage)?.src) {
    return featuredImage;
  }

  if (normalizeImage(seoImage)?.src) {
    return seoImage;
  }

  return null;
}

function prepareCmsProjectPayload(
  cmsProject: CmsProjectPayload,
  mediaFallbackProject?: CmsProjectPayload | null,
): CmsProjectPayload {
  const preparedProject: Record<string, unknown> = { ...cmsProject };

  if (!readCmsProjectMediaSource(preparedProject)) {
    const fallbackMedia = mediaFallbackProject
      ? readCmsProjectMediaSource(mediaFallbackProject)
      : null;

    if (fallbackMedia) {
      preparedProject.coverImage = fallbackMedia;
    }
  }

  const mediaSource = readCmsProjectMediaSource(preparedProject);

  if (mediaSource) {
    preparedProject.coverImage = mediaSource;
  }

  return preparedProject as CmsProjectPayload;
}

function findCmsProjectBySlug(
  projects: CmsProjectPayload[] | null,
  slug: string | undefined,
) {
  if (!projects || !slug) {
    return null;
  }

  return projects.find((project) => project.slug === slug) ?? null;
}

function logProjectCoverImage(
  project: FeaturedProject,
  locale: Locale,
  context: string,
) {
  if (process.env.NODE_ENV !== "development") {
    return;
  }

  console.info(
    `[cms] ${context} project "${project.slug}" coverImage.src for locale "${locale}": ${
      project.coverImage?.src ?? "missing"
    }`,
  );
}

function getProjectFallback(
  cmsProject: CmsProjectPayload,
  staticProjects: FeaturedProject[],
  index: number,
) {
  if (typeof cmsProject.slug === "string") {
    return (
      staticProjects.find((project) => project.slug === cmsProject.slug) ??
      createEmptyProjectFallback(cmsProject.slug)
    );
  }

  return (
    staticProjects[index] ?? createEmptyProjectFallback(`cms-project-${index}`)
  );
}

export function adaptCmsProjects(
  cmsProjects: CmsProjectsResponse | null,
  locale: Locale,
  fallbackFeaturedProjectsData?: FeaturedProjectsData,
  mediaFallbackProjects?: CmsProjectsResponse | null,
): FeaturedProjectsData {
  const staticFeaturedProjectsData =
    fallbackFeaturedProjectsData ?? getFeaturedProjectsData(locale);
  const logger = createFallbackLogger(locale, "Projects adapter");
  const projects = readProjectsArray(cmsProjects);
  const mediaFallbackProjectItems = readProjectsArray(
    mediaFallbackProjects ?? null,
  );

  if (!projects || projects.length === 0) {
    logger.add("featuredProjects.projects");
    logger.flush();

    return staticFeaturedProjectsData;
  }

  const adaptedProjects = projects.map((project, index) => {
    const preparedProject = prepareCmsProjectPayload(
      project,
      findCmsProjectBySlug(mediaFallbackProjectItems, project.slug),
    );
    const adaptedProject = normalizeProjectShape(
      mergeWithStaticShape(
        preparedProject,
        getProjectFallback(
          preparedProject,
          staticFeaturedProjectsData.projects,
          index,
        ),
        `featuredProjects.projects[${getArrayItemLabel(preparedProject, index)}]`,
        logger,
      ),
      typeof preparedProject.slug === "string"
        ? preparedProject.slug
        : `cms-project-${index}`,
    );

    logProjectCoverImage(adaptedProject, locale, "Projects adapter");

    return adaptedProject;
  });

  logger.flush();

  return {
    ...staticFeaturedProjectsData,
    projects: adaptedProjects,
  };
}

export function adaptCmsProject(
  cmsProject: CmsProjectResponse | null,
  locale: Locale,
  slug: string,
  mediaFallbackProject?: CmsProjectResponse | null,
): FeaturedProject | null {
  const staticProject = getProjectBySlug(slug);
  const project = readProjectPayload(cmsProject);
  const fallbackProject = readProjectPayload(mediaFallbackProject ?? null);

  if (!project) {
    if (staticProject) {
      const logger = createFallbackLogger(
        locale,
        `Project detail adapter (${slug})`,
      );
      logger.add(`projects.${slug}`);
      logger.flush();
    }

    return staticProject ?? null;
  }

  const logger = createFallbackLogger(
    locale,
    `Project detail adapter (${slug})`,
  );
  const preparedProject = prepareCmsProjectPayload(project, fallbackProject);
  const adaptedProject = normalizeProjectShape(
    mergeWithStaticShape(
      preparedProject,
      staticProject ?? createEmptyProjectFallback(slug),
      `projects.${slug}`,
      logger,
    ),
    slug,
  );

  logProjectCoverImage(
    adaptedProject,
    locale,
    `Project detail adapter (${slug})`,
  );

  logger.flush();

  return adaptedProject;
}
