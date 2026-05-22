const fallbackSiteUrl = "https://afifelcharif.com";

function normalizeSiteUrl(url: string) {
  return url.replace(/\/$/, "");
}

export const siteUrl = normalizeSiteUrl(
  process.env.NEXT_PUBLIC_SITE_URL ?? fallbackSiteUrl,
);
