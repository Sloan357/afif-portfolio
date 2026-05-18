import { NavLink } from "@/components/atoms/NavLink";
import type { NavigationData } from "@/data/navigation";

type NavLinksProps = {
  links: NavigationData["links"];
  onNavigate?: () => void;
};

export function NavLinks({ links, onNavigate }: NavLinksProps) {
  return (
    <>
      {links.map((link) => (
        <NavLink
          key={link.href}
          href={link.href}
          label={link.label}
          onClick={onNavigate}
        />
      ))}
    </>
  );
}
