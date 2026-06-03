import { getContactData } from "@/data/contact";
import { getExperienceData } from "@/data/experience";
import { getHeroData } from "@/data/hero";
import { getLabsData } from "@/data/labs";
import { getNavigationData } from "@/data/navigation";
import {
  getFeaturedProjectsData,
  getProjectBySlug,
  type FeaturedProject,
  type FeaturedProjectsData,
} from "@/data/projects";
import { getSeoData } from "@/data/seo";
import type {
  CmsHomeResponse,
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
    contact: mergeWithStaticShape(
      readHomeSection(cmsHome, "contact"),
      staticHomeData.contact,
      "contact",
      logger,
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

function normalizeImage(value: unknown) {
  if (!isRecord(value)) {
    return null;
  }

  const src = readCmsField(value, "src").value;
  const alt = readCmsField(value, "alt").value;
  const variants = readCmsField(value, "variants").value;

  return {
    src: typeof src === "string" ? src : null,
    alt: typeof alt === "string" ? alt : "Project preview",
    ...(isRecord(variants) ? { variants } : {}),
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
    coverImage: normalizeImage(project.coverImage),
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
): FeaturedProjectsData {
  const staticFeaturedProjectsData =
    fallbackFeaturedProjectsData ?? getFeaturedProjectsData(locale);
  const logger = createFallbackLogger(locale, "Projects adapter");
  const projects = readProjectsArray(cmsProjects);

  if (!projects || projects.length === 0) {
    logger.add("featuredProjects.projects");
    logger.flush();

    return staticFeaturedProjectsData;
  }

  const adaptedProjects = projects.map((project, index) =>
    normalizeProjectShape(
      mergeWithStaticShape(
        project,
        getProjectFallback(project, staticFeaturedProjectsData.projects, index),
        `featuredProjects.projects[${getArrayItemLabel(project, index)}]`,
        logger,
      ),
      typeof project.slug === "string" ? project.slug : `cms-project-${index}`,
    ),
  );

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
): FeaturedProject | null {
  const staticProject = getProjectBySlug(slug);
  const project = readProjectPayload(cmsProject);

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
  const adaptedProject = normalizeProjectShape(
    mergeWithStaticShape(
      project,
      staticProject ?? createEmptyProjectFallback(slug),
      `projects.${slug}`,
      logger,
    ),
    slug,
  );

  logger.flush();

  return adaptedProject;
}
