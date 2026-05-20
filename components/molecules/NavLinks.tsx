import { NavLink } from "@/components/atoms/NavLink";
import type { NavigationData } from "@/data/navigation";
import { localizedPath, type Locale } from "@/i18n/routing";

type NavLinksProps = {
  links: NavigationData["links"];
  locale: Locale;
  onNavigate?: () => void;
};

export function NavLinks({ links, locale, onNavigate }: NavLinksProps) {
  return (
    <>
      {links.map((link) => (
        <NavLink
          key={link.href}
          href={localizedPath(locale, link.href)}
          label={link.label}
          onClick={onNavigate}
        />
      ))}
    </>
  );
}
