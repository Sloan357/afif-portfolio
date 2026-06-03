import { cmsApiRevalidateSeconds } from "@/config/cms";
import { fetchApi } from "@/lib/api/client";
import type { CmsHomeResponse } from "@/lib/api/types";
import type { Locale } from "@/i18n/routing";

export async function getCmsHome(locale: Locale) {
  const response = await fetchApi<CmsHomeResponse>("/home", {
    locale,
    revalidate: cmsApiRevalidateSeconds,
  });

  return response?.data ?? null;
}
