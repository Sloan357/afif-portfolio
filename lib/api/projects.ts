import { fetchApi } from "@/lib/api/client";
import type {
  ApiFetchOptions,
  CmsProjectResponse,
  CmsProjectsResponse,
} from "@/lib/api/types";
import type { Locale } from "@/i18n/routing";

type CmsRequestOptions = Pick<ApiFetchOptions, "revalidate">;

export async function getCmsProjects(
  locale: Locale,
  options: CmsRequestOptions = {},
) {
  const response = await fetchApi<CmsProjectsResponse>("/api/v1/projects", {
    locale,
    ...options,
    tags: ["projects"],
  });

  return response?.data ?? null;
}

export async function getCmsProject(
  slug: string,
  locale: Locale,
  options: CmsRequestOptions = {},
) {
  const response = await fetchApi<CmsProjectResponse>(
    `/api/v1/projects/${encodeURIComponent(slug)}`,
    {
      locale,
      ...options,
      tags: ["projects", `project:${slug}`],
    },
  );

  return response?.data ?? null;
}
