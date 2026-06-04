import { fetchApi } from "@/lib/api/client";
import type { ApiFetchOptions, CmsExperienceResponse } from "@/lib/api/types";
import type { Locale } from "@/i18n/routing";

type CmsRequestOptions = Pick<ApiFetchOptions, "revalidate">;

export async function getCmsExperience(
  locale: Locale,
  options: CmsRequestOptions = {},
) {
  const response = await fetchApi<CmsExperienceResponse>("/api/v1/experience", {
    locale,
    ...options,
  });

  return response?.data ?? null;
}
