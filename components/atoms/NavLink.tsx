type NavLinkProps = {
  href: string;
  label: string;
  isActive?: boolean;
  onClick?: () => void;
};

export function NavLink({
  href,
  label,
  isActive = false,
  onClick,
}: NavLinkProps) {
  return (
    <a
      href={href}
      onClick={onClick}
      aria-current={isActive ? "page" : undefined}
      className={`text-sm font-medium transition focus-visible:ring-2 focus-visible:ring-cyan-200/40 focus-visible:ring-offset-2 focus-visible:ring-offset-[#050608] focus-visible:outline-none ${
        isActive
          ? "text-white [text-shadow:0_0_24px_rgba(255,255,255,0.22)]"
          : "text-neutral-400 hover:text-white"
      }`}
    >
      {label}
    </a>
  );
}
