type TextLinkProps = {
  href: string;
  children: React.ReactNode;
};

export function TextLink({ href, children }: TextLinkProps) {
  return (
    <a
      href={href}
      className="inline-flex text-sm font-semibold text-white underline-offset-4 transition hover:text-cyan-200 hover:underline focus-visible:ring-2 focus-visible:ring-cyan-200/40 focus-visible:ring-offset-2 focus-visible:ring-offset-[#050608] focus-visible:outline-none"
    >
      {children}
    </a>
  );
}
