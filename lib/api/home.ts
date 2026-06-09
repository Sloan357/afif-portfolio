import { fetchApi } from "@/lib/api/client";
import type { ApiFetchOptions, CmsHomeResponse } from "@/lib/api/types";
import type { Locale } from "@/i18n/routing";

type CmsRequestOptions = Pick<ApiFetchOptions, "revalidate">;

export async function getCmsHome(
  locale: Locale,
  options: CmsRequestOptions = {},
) {
  const response = await fetchApi<CmsHomeResponse>("/api/v1/home", {
    locale,
    ...options,
  });

  return response?.data ?? null;
}
