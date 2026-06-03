import { cmsApiBaseUrl, cmsApiRevalidateSeconds } from "@/config/cms";
import type { ApiEnvelope, ApiFetchOptions } from "@/lib/api/types";

function normalizeApiPath(path: string) {
  const normalizedPath = path.replace(/^\//, "");

  if (!cmsApiBaseUrl) {
    return normalizedPath;
  }

  const basePath = new URL(cmsApiBaseUrl).pathname.replace(/\/$/, "");

  if (basePath.endsWith("/api/v1") && normalizedPath.startsWith("api/v1/")) {
    return normalizedPath.replace(/^api\/v1\//, "");
  }

  return normalizedPath;
}

function buildApiUrl(path: string, options: ApiFetchOptions) {
  if (!cmsApiBaseUrl) {
    return null;
  }

  const url = new URL(normalizeApiPath(path), `${cmsApiBaseUrl}/`);

  if (options.locale) {
    url.searchParams.set("locale", options.locale);
  }

  Object.entries(options.searchParams ?? {}).forEach(([key, value]) => {
    if (value !== undefined) {
      url.searchParams.set(key, String(value));
    }
  });

  return url;
}

export async function fetchApi<TData>(
  path: string,
  options: ApiFetchOptions = {},
): Promise<ApiEnvelope<TData> | null> {
  const url = buildApiUrl(path, options);

  if (!url) {
    return null;
  }

  try {
    const response = await fetch(url, {
      headers: {
        Accept: "application/json",
      },
      next: {
        revalidate: options.revalidate ?? cmsApiRevalidateSeconds,
      },
    });

    if (!response.ok) {
      return null;
    }

    const envelope = (await response.json()) as ApiEnvelope<TData>;

    if (!envelope || typeof envelope !== "object" || !("data" in envelope)) {
      return null;
    }

    return envelope;
  } catch {
    return null;
  }
}
