type TextLinkProps = {
  href: string;
  children: React.ReactNode;
};

export function TextLink({ href, children }: TextLinkProps) {
  return (
    <a
      href={href}
      className="inline-flex text-sm font-semibold text-white transition hover:text-cyan-200"
    >
      {children}
    </a>
  );
}
