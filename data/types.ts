export type CmsVisibility = {
  isVisible?: boolean;
  sortOrder?: number;
};

export type CmsLink = CmsVisibility & {
  label: string;
  href: string;
  type: string;
  isExternal: boolean;
  opensInNewTab?: boolean;
  isPrimary?: boolean;
  ariaLabel?: string;
};

export type CmsImage = {
  src: string | null;
  alt: string;
  width?: number;
  height?: number;
  caption?: string;
  variants?: {
    mobile?: string | null;
    tablet?: string | null;
    desktop?: string | null;
  };
};

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

export type TechnologyItem = {
  label: string;
  slug?: string;
  icon?: string;
  category?: string;
};

export type ArchitectureNoteSection = CmsVisibility & {
  title: string;
  summary: string;
  items: string[];
  isDefaultOpen?: boolean;
};
