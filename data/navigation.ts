export const navigationData = {
  logo: {
    label: "Afif",
    href: "#",
  },
  links: [
    { label: "Projects", href: "#projects" },
    { label: "Labs", href: "#labs" },
    { label: "Experience", href: "#experience" },
    { label: "Contact", href: "#contact" },
  ],
} as const;

export type NavigationData = typeof navigationData;
