export const contactData = {
  eyebrow: "Contact / Let's Build Something",
  title: "Have a system, product, or workflow worth building?",
  description:
    "I work best on practical software with real constraints: backend architecture, mobile workflows, SaaS platforms, AI integrations, and deployment operations.",
  actions: [
    {
      label: "Email me",
      href: "mailto:hello@example.com",
      type: "email",
      isExternal: false,
      opensInNewTab: false,
      isVisible: true,
      isPrimary: true,
    },
    {
      label: "GitHub",
      href: "https://github.com/afifelcharif",
      type: "github",
      isExternal: true,
      opensInNewTab: true,
      isVisible: true,
      isPrimary: false,
    },
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/TODO",
      type: "linkedin",
      isExternal: true,
      opensInNewTab: true,
      isVisible: true,
      isPrimary: false,
    },
    {
      label: "Download CV",
      // TODO: Replace with the final uploaded CV asset from the Laravel CMS.
      href: "/cv/afif-el-charif-cv.pdf",
      type: "cv",
      isExternal: false,
      opensInNewTab: true,
      isVisible: true,
      isPrimary: false,
    },
    {
      label: "Book a call",
      href: "https://calendly.com/TODO",
      type: "booking",
      isExternal: true,
      opensInNewTab: true,
      isVisible: false,
      isPrimary: false,
    },
  ],
} as const;

export type ContactData = typeof contactData;
