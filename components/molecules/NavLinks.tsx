import { NavLink } from "@/components/atoms/NavLink";
import type { NavigationData } from "@/data/navigation";
import { localizedPath, type Locale } from "@/i18n/routing";

type NavLinksProps = {
  links: NavigationData["links"];
  locale: Locale;
  activeHref?: string | null;
  isHomepage?: boolean;
  onNavigate?: () => void;
};

export function NavLinks({
  links,
  locale,
  activeHref,
  isHomepage = false,
  onNavigate,
}: NavLinksProps) {
  return (
    <>
      {links.map((link) => {
        const href =
          isHomepage && link.href.startsWith("#")
            ? link.href
            : localizedPath(locale, link.href);

        return (
          <NavLink
            key={link.href}
            href={href}
            label={link.label}
            isActive={activeHref === link.href}
            onClick={onNavigate}
          />
        );
      })}
    </>
  );
}
