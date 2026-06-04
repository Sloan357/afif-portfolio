const productionCmsApiRevalidateSeconds = 300;
const developmentCmsApiRevalidateSeconds = 60;

function normalizeCmsApiBaseUrl(url: string | undefined) {
  if (!url) {
    return null;
  }

  return url.replace(/\/$/, "");
}

function getCmsAssetBaseUrl(apiBaseUrl: string | null) {
  if (!apiBaseUrl) {
    return null;
  }

  try {
    const url = new URL(apiBaseUrl);
    url.pathname = url.pathname
      .replace(/\/api\/v1\/?$/, "")
      .replace(/\/api\/?$/, "");
    url.search = "";
    url.hash = "";

    return url.toString().replace(/\/$/, "");
  } catch {
    return null;
  }
}

function getDefaultRevalidateSeconds() {
  return process.env.NODE_ENV === "production"
    ? productionCmsApiRevalidateSeconds
    : developmentCmsApiRevalidateSeconds;
}

function parseRevalidateSeconds(value: string | undefined) {
  const defaultRevalidateSeconds = getDefaultRevalidateSeconds();

  if (!value) {
    return defaultRevalidateSeconds;
  }

  const seconds = Number.parseInt(value, 10);

  return Number.isFinite(seconds) && seconds > 0
    ? seconds
    : defaultRevalidateSeconds;
}

export const cmsApiBaseUrl = normalizeCmsApiBaseUrl(
  process.env.CMS_API_BASE_URL,
);

export const cmsApiRevalidateSeconds = parseRevalidateSeconds(
  process.env.CMS_API_REVALIDATE_SECONDS,
);

export const cmsAssetBaseUrl = getCmsAssetBaseUrl(cmsApiBaseUrl);

export const cmsApiCacheConfig = {
  revalidate: cmsApiRevalidateSeconds,
};

export const isCmsApiConfigured = Boolean(cmsApiBaseUrl);
