import type { ArchitectureNoteSection } from "@/data/architecture";

type LabConcept = {
  summary: string;
  skillsDemonstrated: string[];
  plannedArchitecture: string[];
  whyItMatters: string;
  architectureNotes: ArchitectureNoteSection[];
};

type LabItem = {
  title: string;
  description: string;
  type: string;
  coverImage: {
    src: string | null;
    alt: string;
    variants: {
      mobile: string | null;
      desktop: string | null;
    };
  };
  galleryImages: [];
  stack: string[];
  showcase: string;
  concept: LabConcept;
  cta: {
    label: string;
    href: string;
  };
};

type LabsDataShape = {
  eyebrow: string;
  title: string;
  description: string;
  labs: LabItem[];
};

export const labsData: LabsDataShape = {
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
        architectureNotes: [
          {
            title: "Problem",
            summary:
              "Meeting notes often contain useful actions, but they are easy to lose without a structured follow-up workflow.",
            items: [
              "Extract contacts, reminders, summaries, and next steps from messy input.",
              "Keep AI suggestions reviewable before they affect CRM data.",
            ],
            isDefaultOpen: true,
          },
          {
            title: "Architecture",
            summary:
              "The system uses a backend workflow pipeline for note ingestion, queued AI extraction, and user-approved CRM updates.",
            items: [
              "Store raw notes and normalized extraction results separately.",
              "Queue AI processing to avoid blocking the main user flow.",
            ],
          },
          {
            title: "Stack Decisions",
            summary:
              "Laravel, queues, and a focused React interface keep the workflow practical and inspectable.",
            items: [
              "Laravel models contacts, notes, tasks, and reminders.",
              "Queue workers isolate slower AI operations from the UI.",
            ],
          },
          {
            title: "Challenges",
            summary:
              "The key challenge is extracting useful actions without creating noisy or inaccurate CRM updates.",
            items: [
              "Handle vague meeting notes and incomplete contact references.",
              "Avoid over-automation by keeping human approval in the loop.",
            ],
          },
          {
            title: "Security Considerations",
            summary:
              "CRM notes can contain sensitive business context and should be scoped carefully.",
            items: [
              "Limit note visibility to the owning user or workspace.",
              "Avoid logging full private note content unnecessarily.",
            ],
          },
          {
            title: "Scalability Thoughts",
            summary:
              "Extraction jobs should scale independently as note volume grows.",
            items: [
              "Batch background processing where possible.",
              "Track extraction status and retry failed AI jobs safely.",
            ],
          },
          {
            title: "Future Improvements",
            summary:
              "Future versions can add calendar sync, contact enrichment, and confidence scoring.",
            items: [
              "Add confidence indicators for suggested follow-ups.",
              "Connect approved reminders to calendar or task systems.",
            ],
          },
        ],
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
        architectureNotes: [
          {
            title: "Problem",
            summary:
              "Small production systems still need clear visibility into deployments, uptime, certificates, services, and logs.",
            items: [
              "Centralize operational signals that are usually scattered across providers.",
              "Surface issues before they become user-facing incidents.",
            ],
            isDefaultOpen: true,
          },
          {
            title: "Architecture",
            summary:
              "The dashboard combines provider integrations, scheduled health checks, and compact operational views.",
            items: [
              "Poll DigitalOcean and related service APIs for infrastructure state.",
              "Store health-check snapshots for uptime and SSL reporting.",
            ],
          },
          {
            title: "Stack Decisions",
            summary:
              "A backend-first design is appropriate because most value comes from integrations and scheduled checks.",
            items: [
              "Use backend jobs for recurring checks and API polling.",
              "Keep frontend views focused on status, incidents, and logs.",
            ],
          },
          {
            title: "Challenges",
            summary:
              "The challenge is presenting operational detail without building an overly complex monitoring product.",
            items: [
              "Avoid alert fatigue and noisy status surfaces.",
              "Keep logs and health data searchable but lightweight.",
            ],
          },
          {
            title: "Security Considerations",
            summary:
              "Provider credentials and deployment data require careful handling.",
            items: [
              "Store provider tokens server-side only.",
              "Avoid exposing sensitive environment or log values to the client.",
            ],
          },
          {
            title: "Scalability Thoughts",
            summary:
              "Checks and integrations should scale with the number of monitored services.",
            items: [
              "Run checks asynchronously and store compact status history.",
              "Separate incident state from raw log collection.",
            ],
          },
          {
            title: "Future Improvements",
            summary:
              "Future versions can add alert routing, incident timelines, and deployment comparisons.",
            items: [
              "Add webhook notifications for downtime and SSL expiry.",
              "Add service-level incident history and deployment markers.",
            ],
          },
        ],
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
        architectureNotes: [
          {
            title: "Problem",
            summary:
              "Household food planning involves changing pantry state, shared lists, recipes, and shopping decisions across multiple people.",
            items: [
              "Keep household members aligned on what exists and what needs buying.",
              "Use AI to reduce manual entry without making the workflow feel complex.",
            ],
            isDefaultOpen: true,
          },
          {
            title: "Architecture",
            summary:
              "The system combines mobile workflows, backend domain models, realtime collaboration, and asynchronous AI features.",
            items: [
              "React Native provides pantry, recipe, receipt, and shopping screens.",
              "Laravel models households, items, recipes, and shopping rules.",
              "Firebase supports realtime shared household state.",
            ],
          },
          {
            title: "Stack Decisions",
            summary:
              "React Native, Laravel, Firebase, and AI services map cleanly to the product's mobile, domain, realtime, and intelligence layers.",
            items: [
              "Laravel keeps business rules explicit and testable.",
              "Firebase handles collaborative updates with low perceived latency.",
            ],
          },
          {
            title: "Challenges",
            summary:
              "The hardest part is keeping AI suggestions useful while preserving trust in household inventory data.",
            items: [
              "Normalize receipt items into usable pantry entities.",
              "Avoid recipe suggestions that ignore expiration dates or preferences.",
            ],
          },
          {
            title: "Security Considerations",
            summary:
              "Household data should only be visible to authorized members.",
            items: [
              "Apply household membership checks across API endpoints.",
              "Mirror access rules in realtime database permissions.",
            ],
          },
          {
            title: "Scalability Thoughts",
            summary:
              "The AI layer should scale separately from core mobile and household flows.",
            items: [
              "Run receipt parsing and recipe generation asynchronously.",
              "Cache common suggestions and normalized ingredients where possible.",
            ],
          },
          {
            title: "Future Improvements",
            summary:
              "Future versions can add dietary profiles, household analytics, and smarter shopping optimization.",
            items: [
              "Add preference-aware recipe recommendations.",
              "Add shopping optimization based on usage and expiry patterns.",
            ],
          },
        ],
      },
      cta: {
        label: "Building next",
        href: "#contact",
      },
    },
  ],
};

export type LabsData = typeof labsData;
