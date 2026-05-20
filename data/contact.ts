import type { CmsLink } from "@/data/types";
import { resolveLocalizedContent } from "@/i18n/content";
import type { Locale } from "@/i18n/routing";

export type ContactData = {
  eyebrow: string;
  title: string;
  description: string;
  actions: CmsLink[];
};

export const contactData: ContactData = {
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
};

export type ContactShellData = Omit<ContactData, "actions">;

export type ContactActionLabels = Record<CmsLink["type"], string>;

export const contactShellContent = {
  en: {
    eyebrow: contactData.eyebrow,
    title: contactData.title,
    description: contactData.description,
  },
  fr: {
    eyebrow: "Contact / Construisons quelque chose",
    title: "Vous avez un systeme, un produit ou un workflow a construire ?",
    description:
      "Je travaille mieux sur des logiciels concrets avec de vraies contraintes : architecture backend, workflows mobiles, plateformes SaaS, integrations IA et operations de deploiement.",
  },
};

export const contactActionLabelContent = {
  en: Object.fromEntries(
    contactData.actions.map((action) => [action.type, action.label]),
  ) as ContactActionLabels,
  fr: {
    email: "M'envoyer un email",
    github: "GitHub",
    linkedin: "LinkedIn",
    cv: "Telecharger le CV",
    booking: "Planifier un appel",
  },
};

export function getContactData(locale: Locale): ContactData {
  const shell = resolveLocalizedContent<ContactShellData>(
    contactShellContent,
    locale,
  ).content;
  const actionLabels = resolveLocalizedContent<ContactActionLabels>(
    contactActionLabelContent,
    locale,
  ).content;

  return {
    ...contactData,
    ...shell,
    actions: contactData.actions.map((action) => ({
      ...action,
      label: actionLabels[action.type] ?? action.label,
    })),
  };
}
