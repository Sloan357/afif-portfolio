import { NavLink } from "@/components/atoms/NavLink";
import type { NavigationData } from "@/data/navigation";
import { localizedPath, type Locale } from "@/i18n/routing";

type NavLinksProps = {
  links: NavigationData["links"];
  locale: Locale;
  activeHref?: string | null;
  onNavigate?: () => void;
};

export function NavLinks({
  links,
  locale,
  activeHref,
  onNavigate,
}: NavLinksProps) {
  return (
    <>
      {links.map((link) => (
        <NavLink
          key={link.href}
          href={localizedPath(locale, link.href)}
          label={link.label}
          isActive={activeHref === link.href}
          onClick={onNavigate}
        />
      ))}
    </>
  );
}
