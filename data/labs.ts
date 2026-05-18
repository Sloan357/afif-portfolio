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
      stack: ["AI Workflows", "Queues", "Automation", "CRM"],
      showcase: "AI workflows, queues, and automation",
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
      stack: ["DigitalOcean", "Monitoring", "Logs", "Backend APIs"],
      showcase: "DevOps, monitoring, and backend integrations",
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
      stack: ["React Native", "Laravel", "Firebase", "AI Features"],
      showcase: "React Native, Laravel, Firebase, and AI features",
      cta: {
        label: "Building next",
        href: "#contact",
      },
    },
  ],
} as const;

export type LabsData = typeof labsData;
