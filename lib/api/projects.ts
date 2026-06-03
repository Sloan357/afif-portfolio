import { cmsApiRevalidateSeconds } from "@/config/cms";
import { fetchApi } from "@/lib/api/client";
import type { CmsProjectResponse, CmsProjectsResponse } from "@/lib/api/types";
import type { Locale } from "@/i18n/routing";

export async function getCmsProjects(locale: Locale) {
  const response = await fetchApi<CmsProjectsResponse>("/api/v1/projects", {
    locale,
    revalidate: cmsApiRevalidateSeconds,
  });

  return response?.data ?? null;
}

export async function getCmsProject(slug: string, locale: Locale) {
  const response = await fetchApi<CmsProjectResponse>(
    `/api/v1/projects/${encodeURIComponent(slug)}`,
    {
      locale,
      revalidate: cmsApiRevalidateSeconds,
    },
  );

  return response?.data ?? null;
}
