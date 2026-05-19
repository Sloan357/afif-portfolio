import type { ArchitectureNoteSection } from "@/data/architecture";

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
  architectureNotes: ArchitectureNoteSection[];
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
        {
          title: "Problem",
          summary:
            "The site needs to present product and brand information clearly while staying easy to update through CMS-managed content.",
          items: [
            "Product pages should be editable without changing frontend code.",
            "Collections and content sections need predictable structure for future CMS fields.",
          ],
          isDefaultOpen: true,
        },
        {
          title: "Architecture",
          summary:
            "A React frontend consumes structured product and page data from an ExpressJS layer prepared for CMS integration.",
          items: [
            "Reusable frontend sections for product collections, content blocks, and calls to action.",
            "Backend API boundary designed around product, collection, and page models.",
          ],
        },
        {
          title: "Stack Decisions",
          summary:
            "React and ExpressJS keep the implementation lightweight while leaving room for a CMS-backed product catalog.",
          items: [
            "React supports a modern product-focused interface.",
            "ExpressJS keeps API and content delivery simple for the current scope.",
          ],
        },
        {
          title: "Challenges",
          summary:
            "The main constraint is balancing flexible CMS editing with a polished product presentation layer.",
          items: [
            "Avoiding overly rigid product templates.",
            "Keeping frontend components reusable across product and content pages.",
          ],
        },
        {
          title: "Security Considerations",
          summary:
            "CMS-managed product content should be treated as untrusted input and rendered safely.",
          items: [
            "Validate and sanitize rich text fields before rendering.",
            "Keep admin editing and public content delivery behind separate authorization boundaries.",
          ],
        },
        {
          title: "Scalability Thoughts",
          summary:
            "The product model can grow from simple pages into collections, categories, and richer media assets.",
          items: [
            "Cache public product content where possible.",
            "Keep image and gallery fields structured for CDN-backed delivery later.",
          ],
        },
        {
          title: "Future Improvements",
          summary:
            "The next step is replacing placeholder content with CMS-managed products, galleries, and SEO fields.",
          items: [
            "Add final product screenshots and gallery assets.",
            "Connect page metadata to CMS SEO fields.",
          ],
        },
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
        {
          title: "Problem",
          summary:
            "Sourcing workflows involve repeated research, extraction, ranking, and follow-up tasks that benefit from structured automation.",
          items: [
            "Users need AI assistance without losing control over final decisions.",
            "The system needs to keep workflow state visible and auditable.",
          ],
          isDefaultOpen: true,
        },
        {
          title: "Architecture",
          summary:
            "The platform is modeled around sourcing pipelines, queued AI tasks, and API boundaries for operational workflow steps.",
          items: [
            "Pipeline data model for candidates, sources, tasks, and statuses.",
            "Async processing layer for extraction, summarization, and ranking.",
          ],
        },
        {
          title: "Stack Decisions",
          summary:
            "The architecture prioritizes clear backend contracts and isolated AI workflow execution.",
          items: [
            "API-first design keeps AI features separate from the user interface.",
            "Queues provide resilience for slower AI and enrichment tasks.",
          ],
        },
        {
          title: "Challenges",
          summary:
            "The hardest part is making AI output useful, reviewable, and safe for operational decisions.",
          items: [
            "Avoiding opaque automation for important sourcing steps.",
            "Designing fallbacks for incomplete or low-confidence AI output.",
          ],
        },
        {
          title: "Security Considerations",
          summary:
            "Sourcing data and AI prompts can contain sensitive business context that must be scoped carefully.",
          items: [
            "Separate user-owned data from shared system prompts.",
            "Log AI actions without exposing unnecessary sensitive details.",
          ],
        },
        {
          title: "Scalability Thoughts",
          summary:
            "The workflow model should support more sources, more enrichment steps, and larger background workloads over time.",
          items: [
            "Queue AI tasks independently from request/response paths.",
            "Use explicit status transitions for long-running sourcing jobs.",
          ],
        },
        {
          title: "Future Improvements",
          summary:
            "Future iterations can add richer review tools, source integrations, and analytics around workflow quality.",
          items: [
            "Add confidence scoring and approval workflows.",
            "Add integrations for external sourcing data providers.",
          ],
        },
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
        {
          title: "Problem",
          summary:
            "Household planning data changes frequently and often needs to be shared across multiple users in realtime.",
          items: [
            "Pantry, grocery, and recipe flows need to remain simple on mobile.",
            "Shared household state needs predictable synchronization.",
          ],
          isDefaultOpen: true,
        },
        {
          title: "Architecture",
          summary:
            "The app combines a React Native client, Laravel domain API, and Firebase realtime layer for collaborative updates.",
          items: [
            "React Native handles mobile-first workflows and offline-friendly screens.",
            "Laravel owns household accounts, pantry models, recipes, and grocery logic.",
            "Firebase supports realtime shared list and household state updates.",
          ],
        },
        {
          title: "Stack Decisions",
          summary:
            "The stack separates domain logic from realtime sync while keeping the mobile experience responsive.",
          items: [
            "Laravel is a strong fit for structured domain rules and APIs.",
            "Firebase is useful for live collaboration and fast shared-state updates.",
          ],
        },
        {
          title: "Challenges",
          summary:
            "The main challenge is keeping shared data accurate while preserving a simple mobile UX.",
          items: [
            "Avoiding conflicts when multiple household members update the same lists.",
            "Keeping recipes, pantry items, and grocery suggestions connected without clutter.",
          ],
        },
        {
          title: "Security Considerations",
          summary:
            "Household data should be scoped tightly to members and protected across API and realtime layers.",
          items: [
            "Enforce household-level authorization on backend resources.",
            "Mirror access rules in Firebase security configuration.",
          ],
        },
        {
          title: "Scalability Thoughts",
          summary:
            "The system should support more households, larger item histories, and AI features without slowing core workflows.",
          items: [
            "Keep AI parsing and recommendation work asynchronous.",
            "Archive or summarize historical pantry and shopping events over time.",
          ],
        },
        {
          title: "Future Improvements",
          summary:
            "Future work can deepen AI assistance and improve household planning automation.",
          items: [
            "Add receipt image parsing and ingredient normalization.",
            "Add smarter shopping optimization based on usage patterns.",
          ],
        },
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
