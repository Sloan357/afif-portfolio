export const contactData = {
  eyebrow: "Contact / Let's Build Something",
  title: "Have a system, product, or workflow worth building?",
  description:
    "I work best on practical software with real constraints: backend architecture, mobile workflows, SaaS platforms, AI integrations, and deployment operations.",
  primaryAction: {
    label: "Email me",
    href: "mailto:hello@example.com",
  },
  links: [
    {
      label: "GitHub",
      href: "https://github.com/",
    },
    {
      label: "LinkedIn",
      href: "#",
    },
  ],
} as const;

export type ContactData = typeof contactData;
