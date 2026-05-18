export const experienceData = {
  eyebrow: "About / Experience",
  title: "Backend-minded engineering across product systems",
  introduction:
    "I build full-stack systems with a focus on backend architecture, reliable APIs, mobile workflows, SaaS foundations, AI integrations, and deployment operations.",
  focusAreas: [
    "Backend architecture",
    "React Native",
    "Laravel",
    "Symfony",
    "SaaS systems",
    "AI integrations",
    "DevOps",
  ],
  experiences: [
    {
      role: "Freelance Software Engineer",
      company: null,
      period: "2023 to Present",
      summary:
        "Designed and delivered SaaS platforms, CMS-backed websites, mobile applications, and backend systems for product-focused teams.",
      responsibilities: [
        "Designed SaaS platforms and mobile applications",
        "Built React Native and Laravel systems",
        "Integrated AI features using OpenAI APIs",
        "Managed DigitalOcean deployments",
        "Developed CMS systems and backend architecture",
      ],
      technologies: [
        "Laravel",
        "React Native",
        "OpenAI APIs",
        "DigitalOcean",
        "CMS",
      ],
    },
    {
      role: "Software Engineer",
      company: "Coddict",
      period: "2019 to 2023",
      summary:
        "Worked on PHP and Symfony backend systems for SaaS products serving accounting, tax, and operational workflows.",
      responsibilities: [
        "Developed Symfony and PHP backend services",
        "Built SaaS systems for accounting and tax operations",
        "Designed and maintained REST APIs",
        "Improved backend performance",
        "Worked on microservices and CMS-like systems",
      ],
      technologies: ["Symfony", "PHP", "REST APIs", "Microservices", "SaaS"],
    },
    {
      role: "Solutions Engineer",
      company: "FUJIFILM Synapse",
      period: "2015 to 2019",
      summary:
        "Supported medical imaging systems and technical integrations in PACS/RIS environments with a focus on reliability and troubleshooting.",
      responsibilities: [
        "Supported medical systems and engineering workflows",
        "Worked across PACS/RIS environments",
        "Handled technical integrations and troubleshooting",
      ],
      technologies: [
        "PACS",
        "RIS",
        "Medical Systems",
        "Integrations",
        "Support Engineering",
      ],
    },
  ],
} as const;

export type ExperienceData = typeof experienceData;
