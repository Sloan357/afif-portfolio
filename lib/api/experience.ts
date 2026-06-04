import { cmsApiRevalidateSeconds } from "@/config/cms";
import { fetchApi } from "@/lib/api/client";
import type { CmsExperienceResponse } from "@/lib/api/types";
import type { Locale } from "@/i18n/routing";

export async function getCmsExperience(locale: Locale) {
  const response = await fetchApi<CmsExperienceResponse>("/api/v1/experience", {
    locale,
    revalidate: cmsApiRevalidateSeconds,
  });

  return response?.data ?? null;
}
