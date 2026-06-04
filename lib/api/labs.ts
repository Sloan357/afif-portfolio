import { fetchApi } from "@/lib/api/client";
import type { ApiFetchOptions, CmsLabsResponse } from "@/lib/api/types";
import type { Locale } from "@/i18n/routing";

type CmsRequestOptions = Pick<ApiFetchOptions, "revalidate">;

export async function getCmsLabs(
  locale: Locale,
  options: CmsRequestOptions = {},
) {
  const response = await fetchApi<CmsLabsResponse>("/api/v1/labs", {
    locale,
    ...options,
  });

  return response?.data ?? null;
}
