export const featuredProjectsData = {
  eyebrow: "Featured projects",
  title: "Selected engineering work",
  description:
    "A small set of representative builds across backend systems, product interfaces, mobile workflows, and AI-assisted features.",
  projects: [
    {
      title: "Nam House of Sleep",
      description:
        "Informative website with CMS-managed product pages and a modern product-focused frontend for presenting collections clearly.",
      type: "Product website",
      coverImage: {
        src: null,
        alt: "Nam House of Sleep project preview",
        variants: {
          mobile: null,
          desktop: null,
        },
      },
      galleryImages: [],
      stack: ["React", "ExpressJS", "CMS", "Product UI"],
      cta: {
        label: "View details",
        href: "#contact",
      },
    },
    {
      title: "AI Sourcing Platform",
      description:
        "AI-powered sourcing and workflow automation platform focused on scalable architecture and intelligent operational flows.",
      type: "AI platform",
      coverImage: {
        src: null,
        alt: "AI Sourcing Platform project preview",
        variants: {
          mobile: null,
          desktop: null,
        },
      },
      galleryImages: [],
      stack: ["AI Workflows", "Automation", "Scalable APIs", "Sourcing"],
      cta: {
        label: "View details",
        href: "#contact",
      },
    },
    {
      title: "Household Manager App",
      description:
        "Mobile app for pantry management, grocery lists, recipes, and realtime household collaboration across shared accounts.",
      type: "Mobile application",
      coverImage: {
        src: null,
        alt: "Household Manager App project preview",
        variants: {
          mobile: null,
          desktop: null,
        },
      },
      galleryImages: [],
      stack: ["React Native", "Laravel", "Firebase", "Realtime Sync"],
      cta: {
        label: "View details",
        href: "#contact",
      },
    },
  ],
} as const;

export type FeaturedProjectsData = typeof featuredProjectsData;
