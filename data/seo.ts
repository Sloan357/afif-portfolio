export type SeoData = {
  metaTitle: string;
  metaDescription: string;
  canonicalUrl: string;
  ogTitle: string;
  ogDescription: string;
  ogImage: string | null;
  twitterTitle: string;
  twitterDescription: string;
  twitterImage: string | null;
  noIndex: boolean;
};

export const defaultSeoData: SeoData = {
  metaTitle: "Afif El Charif — Full-Stack Software Engineer",
  metaDescription:
    "Portfolio of Afif El Charif, a full-stack software engineer focused on Laravel, Symfony, React Native, Next.js, AI integrations, CMS platforms, and production deployments.",
  canonicalUrl: "https://afifelcharif.com",
  ogTitle: "Afif El Charif — Full-Stack Software Engineer",
  ogDescription:
    "Full-stack software engineering portfolio focused on Laravel, Symfony, React Native, Next.js, AI integrations, CMS platforms, and production deployments.",
  ogImage: null,
  twitterTitle: "Afif El Charif — Full-Stack Software Engineer",
  twitterDescription:
    "Portfolio focused on Laravel, Symfony, React Native, Next.js, AI integrations, CMS platforms, and production deployments.",
  twitterImage: null,
  noIndex: false,
};
