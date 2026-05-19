export type ProjectImage = {
  src: string | null;
  alt: string;
  variants?: {
    mobile?: string | null;
    desktop?: string | null;
  };
};

export type ProjectExternalLink = {
  label: string;
  href: string;
  type: string;
  isExternal: boolean;
  isVisible: boolean;
};

export type FeaturedProject = {
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  type: string;
  categories: string[];
  coverImage: ProjectImage | null;
  galleryImages: ProjectImage[];
  stack: string[];
  role: string;
  architectureNotes: string[];
  challenges: string[];
  outcomes: string[];
  externalLinks: ProjectExternalLink[];
  cta: {
    label: string;
    href: string;
  };
};

export type FeaturedProjectsData = {
  eyebrow: string;
  title: string;
  description: string;
  projects: FeaturedProject[];
};

export const featuredProjectsData: FeaturedProjectsData = {
  eyebrow: "Featured projects",
  title: "Selected engineering work",
  description:
    "A small set of representative builds across backend systems, product interfaces, mobile workflows, and AI-assisted features.",
  projects: [
    {
      slug: "nam-house-of-sleep",
      title: "Nam House of Sleep",
      subtitle: "CMS-managed product website for a sleep and home product brand.",
      description:
        "Informative website with CMS-managed product pages and a modern product-focused frontend for presenting collections clearly.",
      type: "Product website",
      categories: ["CMS", "Backend"],
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
      role: "Full-stack engineer",
      architectureNotes: [
        "React frontend structured around reusable product and content sections.",
        "ExpressJS backend prepared for CMS-managed product page data.",
        "Content model designed for brand, collection, and product presentation.",
      ],
      challenges: [
        "Keeping product information easy to manage without making the frontend rigid.",
        "Balancing visual product presentation with fast, informative browsing.",
      ],
      outcomes: [
        "Modern product-focused frontend foundation.",
        "CMS-ready structure for product and content updates.",
      ],
      externalLinks: [],
      cta: {
        label: "View details",
        href: "/projects/nam-house-of-sleep",
      },
    },
    {
      slug: "ai-sourcing-platform",
      title: "AI Sourcing Platform",
      subtitle: "AI-powered sourcing and workflow automation platform.",
      description:
        "AI-powered sourcing and workflow automation platform focused on scalable architecture and intelligent operational flows.",
      type: "AI platform",
      categories: ["AI", "Backend"],
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
      role: "Full-stack engineer",
      architectureNotes: [
        "Workflow-oriented architecture for sourcing pipelines and task automation.",
        "API boundaries prepared for AI-assisted extraction, ranking, and handoff flows.",
        "Data structures designed around repeatable sourcing operations.",
      ],
      challenges: [
        "Designing AI workflows that remain explainable and operationally useful.",
        "Keeping automation flexible enough for different sourcing paths.",
      ],
      outcomes: [
        "Scalable foundation for intelligent sourcing workflows.",
        "Clear separation between automation logic, API contracts, and user-facing flows.",
      ],
      externalLinks: [],
      cta: {
        label: "View details",
        href: "/projects/ai-sourcing-platform",
      },
    },
    {
      slug: "household-manager-app",
      title: "Household Manager App",
      subtitle:
        "Realtime household collaboration app for pantry, groceries, and recipes.",
      description:
        "Mobile app for pantry management, grocery lists, recipes, and realtime household collaboration across shared accounts.",
      type: "Mobile application",
      categories: ["Mobile", "Backend"],
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
      role: "Mobile and backend engineer",
      architectureNotes: [
        "React Native app structured around shared household workflows.",
        "Laravel backend prepared for account, pantry, recipe, and grocery domain logic.",
        "Firebase support for realtime collaboration and household state updates.",
      ],
      challenges: [
        "Keeping shared household data consistent across multiple users and devices.",
        "Designing pantry, recipe, and grocery flows that remain simple on mobile.",
      ],
      outcomes: [
        "Mobile-first foundation for household collaboration.",
        "Realtime architecture direction for shared lists and pantry updates.",
      ],
      externalLinks: [],
      cta: {
        label: "View details",
        href: "/projects/household-manager-app",
      },
    },
  ],
};

export function getFeaturedProjects() {
  return featuredProjectsData.projects;
}

export function getProjectBySlug(slug: string) {
  return featuredProjectsData.projects.find((project) => project.slug === slug);
}
