export const heroData = {
  badge: {
    label: "Full-stack software engineer",
    meta: "APIs, systems, interfaces",
  },
  headline: "I build reliable software across backend, web, and mobile.",
  description:
    "I'm Afif. I work close to the data model, API boundaries, and frontend runtime to ship systems that are maintainable under real usage: Laravel, Symfony, React, React Native, and AI-integrated workflows.",
  ctas: [
    {
      label: "Inspect projects",
      href: "#projects",
      variant: "primary",
    },
    {
      label: "Contact",
      href: "#contact",
      variant: "secondary",
    },
  ],
  capabilities: [
    { label: "Backend", value: "Laravel, Symfony, REST APIs" },
    { label: "Frontend", value: "React, Next.js, stateful UI" },
    { label: "Mobile", value: "React Native, app workflows" },
  ],
  architecture: {
    eyebrow: "Architecture",
    title: "Product system card",
    status: "API-first",
    clients: ["Web app", "Mobile app"],
    core: {
      eyebrow: "Core",
      title: "Laravel / Symfony API",
      version: "/v1",
      services: [
        { label: "Auth", value: "Sessions, roles" },
        { label: "API", value: "REST contracts" },
        { label: "Jobs", value: "Queues, workers" },
      ],
    },
    foundations: [
      { label: "MariaDB", value: "Relational data model" },
      { label: "AI layer", value: "Tool-backed workflows" },
    ],
    boundary: {
      label: "Boundaries",
      value: "UI - API - DATA",
    },
  },
} as const;

export type HeroData = typeof heroData;
