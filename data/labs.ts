export const labsData = {
  eyebrow: "Labs / Building Next",
  title: "Self-initiated systems in progress",
  description:
    "Experimental builds focused on sharpening new skills across AI workflows, backend integrations, DevOps visibility, and mobile product systems.",
  labs: [
    {
      title: "AI CRM Assistant",
      description:
        "Extracts follow-ups, reminders, summaries, and contacts from meetings or notes to support cleaner relationship management workflows.",
      type: "AI workflow lab",
      coverImage: {
        src: null,
        alt: "AI CRM Assistant lab preview",
        variants: {
          mobile: null,
          desktop: null,
        },
      },
      galleryImages: [],
      stack: ["AI Workflows", "Queues", "Automation", "CRM"],
      showcase: "AI workflows, queues, and automation",
      concept: {
        summary:
          "A lightweight assistant that turns unstructured meeting notes into follow-ups, reminders, contact updates, and concise relationship summaries.",
        skillsDemonstrated: [
          "AI extraction workflows",
          "Queue-backed automation",
          "CRM data modeling",
        ],
        plannedArchitecture: [
          "Laravel API for contacts, notes, reminders, and activity history",
          "Queued AI processing for summaries and follow-up extraction",
          "React interface for reviewing and approving suggested actions",
        ],
        whyItMatters:
          "It demonstrates how AI can support daily business workflows without replacing human review or control.",
      },
      cta: {
        label: "Building next",
        href: "#contact",
      },
    },
    {
      title: "Deployment Dashboard",
      description:
        "Tracks DigitalOcean deployments, uptime, SSL status, logs, and services from a focused operations dashboard.",
      type: "DevOps lab",
      coverImage: {
        src: null,
        alt: "Deployment Dashboard lab preview",
        variants: {
          mobile: null,
          desktop: null,
        },
      },
      galleryImages: [],
      stack: ["DigitalOcean", "Monitoring", "Logs", "Backend APIs"],
      showcase: "DevOps, monitoring, and backend integrations",
      concept: {
        summary:
          "A compact operations dashboard for tracking deployments, uptime, SSL health, service status, logs, and backend infrastructure signals.",
        skillsDemonstrated: [
          "DevOps integrations",
          "Monitoring workflows",
          "Backend service orchestration",
        ],
        plannedArchitecture: [
          "Backend integrations with DigitalOcean APIs and service metadata",
          "Scheduled checks for uptime, SSL expiry, and deployment state",
          "Dashboard views for logs, services, incidents, and environment health",
        ],
        whyItMatters:
          "It shows practical infrastructure visibility for production systems without introducing heavyweight monitoring complexity.",
      },
      cta: {
        label: "Building next",
        href: "#contact",
      },
    },
    {
      title: "Smart Pantry AI Engine",
      description:
        "AI recipe suggestions, receipt parsing, expiration tracking, and shopping optimization for household planning flows.",
      type: "Mobile AI lab",
      coverImage: {
        src: null,
        alt: "Smart Pantry AI Engine lab preview",
        variants: {
          mobile: null,
          desktop: null,
        },
      },
      galleryImages: [],
      stack: ["React Native", "Laravel", "Firebase", "AI Features"],
      showcase: "React Native, Laravel, Firebase, and AI features",
      concept: {
        summary:
          "An AI-assisted household engine for recipe suggestions, receipt parsing, expiration tracking, and smarter shopping decisions.",
        skillsDemonstrated: [
          "React Native product flows",
          "Laravel domain modeling",
          "Firebase realtime collaboration",
          "AI-assisted recommendations",
        ],
        plannedArchitecture: [
          "React Native app for pantry, grocery, recipe, and household workflows",
          "Laravel API for accounts, pantry items, recipes, and shopping logic",
          "Firebase realtime layer for shared household state",
          "AI services for parsing receipts and generating recipe suggestions",
        ],
        whyItMatters:
          "It connects mobile UX, household collaboration, and AI features around a real everyday workflow.",
      },
      cta: {
        label: "Building next",
        href: "#contact",
      },
    },
  ],
} as const;

export type LabsData = typeof labsData;
