import { cmsApiRevalidateSeconds } from "@/config/cms";
import { fetchApi } from "@/lib/api/client";
import type { CmsLabsResponse } from "@/lib/api/types";
import type { Locale } from "@/i18n/routing";

export async function getCmsLabs(locale: Locale) {
  const response = await fetchApi<CmsLabsResponse>("/api/v1/labs", {
    locale,
    revalidate: cmsApiRevalidateSeconds,
  });

  return response?.data ?? null;
}
