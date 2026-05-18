type NavLinkProps = {
  href: string;
  label: string;
  onClick?: () => void;
};

export function NavLink({ href, label, onClick }: NavLinkProps) {
  return (
    <a
      href={href}
      onClick={onClick}
      className="text-sm font-medium text-neutral-400 transition hover:text-white"
    >
      {label}
    </a>
  );
}
