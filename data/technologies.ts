export type TechnologyBadge = {
  label: string;
  icon: string;
};

const technologyBadges: Record<string, TechnologyBadge> = {
  "ai features": { label: "AI Features", icon: "AI" },
  "ai integrations": { label: "AI integrations", icon: "AI" },
  "ai workflows": { label: "AI Workflows", icon: "AI" },
  automation: { label: "Automation", icon: "AU" },
  "backend apis": { label: "Backend APIs", icon: "API" },
  "backend architecture": { label: "Backend architecture", icon: "BE" },
  cms: { label: "CMS", icon: "CM" },
  crm: { label: "CRM", icon: "CRM" },
  devops: { label: "DevOps", icon: "DO" },
  digitalocean: { label: "DigitalOcean", icon: "DO" },
  expressjs: { label: "ExpressJS", icon: "EX" },
  firebase: { label: "Firebase", icon: "FB" },
  integrations: { label: "Integrations", icon: "IN" },
  laravel: { label: "Laravel", icon: "LA" },
  logs: { label: "Logs", icon: "LG" },
  "medical systems": { label: "Medical Systems", icon: "MS" },
  microservices: { label: "Microservices", icon: "MS" },
  monitoring: { label: "Monitoring", icon: "MO" },
  "openai apis": { label: "OpenAI APIs", icon: "AI" },
  pacs: { label: "PACS", icon: "PX" },
  php: { label: "PHP", icon: "PH" },
  "product ui": { label: "Product UI", icon: "UI" },
  queues: { label: "Queues", icon: "Q" },
  react: { label: "React", icon: "R" },
  "react native": { label: "React Native", icon: "RN" },
  "realtime sync": { label: "Realtime Sync", icon: "RT" },
  "rest apis": { label: "REST APIs", icon: "API" },
  ris: { label: "RIS", icon: "RI" },
  saas: { label: "SaaS", icon: "SA" },
  "saas systems": { label: "SaaS systems", icon: "SA" },
  "scalable apis": { label: "Scalable APIs", icon: "API" },
  sourcing: { label: "Sourcing", icon: "SO" },
  "support engineering": { label: "Support Engineering", icon: "SE" },
  symfony: { label: "Symfony", icon: "SY" },
};

export function getTechnologyBadge(label: string): TechnologyBadge {
  const normalizedLabel = label.toLowerCase();

  return (
    technologyBadges[normalizedLabel] ?? {
      label,
      icon: label
        .split(/\s+/)
        .map((word) => word[0])
        .join("")
        .slice(0, 3)
        .toUpperCase(),
    }
  );
}
