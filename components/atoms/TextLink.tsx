type TextLinkProps = {
  href: string;
  children: React.ReactNode;
};

export function TextLink({ href, children }: TextLinkProps) {
  return (
    <a
      href={href}
      className="inline-flex text-sm font-semibold text-white underline-offset-4 transition hover:text-cyan-200 hover:underline"
    >
      {children}
    </a>
  );
}
