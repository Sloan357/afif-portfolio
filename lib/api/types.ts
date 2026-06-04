import type { ContactData } from "@/data/contact";
import type { getExperienceData } from "@/data/experience";
import type { HeroData } from "@/data/hero";
import type { LabsDataShape } from "@/data/labs";
import type { NavigationData } from "@/data/navigation";
import type { FeaturedProject, FeaturedProjectsData } from "@/data/projects";
import type { SeoData } from "@/data/types";
import type { Locale } from "@/i18n/routing";

export type ApiLocaleMeta = {
  requestedLocale?: Locale | string;
  resolvedLocale?: Locale | string;
  defaultLocale?: Locale | string;
  fallbackLocale?: Locale | string;
  fallbackUsed?: boolean;
  missingFields?: string[];
  translationStatus?: string;
};

export type ApiEnvelope<TData> = {
  data: TData | null;
  meta?: ApiLocaleMeta & Record<string, unknown>;
  links?: Record<string, string | null>;
};

export type ApiFetchOptions = {
  locale?: Locale;
  revalidate?: number;
  searchParams?: Record<string, boolean | number | string | undefined>;
};

export type CmsExperienceData = ReturnType<typeof getExperienceData>;

export type CmsLabPayload = Record<string, unknown> & { slug?: string };

export type CmsLabsResponse =
  | CmsLabPayload[]
  | {
      labs?: CmsLabPayload[];
    };

export type CmsProjectPayload = Partial<FeaturedProject> &
  Record<string, unknown>;

export type CmsProjectsResponse =
  | CmsProjectPayload[]
  | {
      projects?: CmsProjectPayload[];
      featuredProjects?: {
        projects?: CmsProjectPayload[];
      };
      featured_projects?: {
        projects?: CmsProjectPayload[];
      };
    };

export type CmsProjectResponse =
  | CmsProjectPayload
  | {
      project?: CmsProjectPayload;
    };

export type CmsHomeResponse = {
  navigation?: NavigationData;
  hero?: HeroData;
  featuredProjects?: FeaturedProjectsData;
  projects?: FeaturedProjectsData;
  labs?: LabsDataShape;
  experience?: CmsExperienceData;
  contact?: ContactData;
  seo?: SeoData;
};

export type HomePageData = {
  navigation: NavigationData;
  hero: HeroData;
  featuredProjects: FeaturedProjectsData;
  labs: LabsDataShape;
  experience: CmsExperienceData;
  contact: ContactData;
  seo: SeoData;
};
