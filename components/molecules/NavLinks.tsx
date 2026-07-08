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

function resolveNavHref(href: string, locale: Locale, isHomepage: boolean) {
  if (href.startsWith("#")) {
    return isHomepage ? href : localizedPath(locale, href);
  }

  return localizedPath(locale, href);
}

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
        const href = resolveNavHref(link.href, locale, isHomepage);

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
