const fallbackCmsApiRevalidateSeconds = 300;

function normalizeCmsApiBaseUrl(url: string | undefined) {
  if (!url) {
    return null;
  }

  return url.replace(/\/$/, "");
}

function parseRevalidateSeconds(value: string | undefined) {
  if (!value) {
    return fallbackCmsApiRevalidateSeconds;
  }

  const seconds = Number.parseInt(value, 10);

  return Number.isFinite(seconds) && seconds > 0
    ? seconds
    : fallbackCmsApiRevalidateSeconds;
}

export const cmsApiBaseUrl = normalizeCmsApiBaseUrl(
  process.env.CMS_API_BASE_URL,
);

export const cmsApiRevalidateSeconds = parseRevalidateSeconds(
  process.env.CMS_API_REVALIDATE_SECONDS,
);

export const isCmsApiConfigured = Boolean(cmsApiBaseUrl);
