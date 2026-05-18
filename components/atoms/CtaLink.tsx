const ctaClassNames = {
  primary:
    "inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-neutral-950 shadow-[0_0_40px_rgba(255,255,255,0.12)] transition hover:bg-neutral-200",
  secondary:
    "inline-flex items-center justify-center rounded-full border border-white/12 bg-white/[0.03] px-6 py-3 text-sm font-semibold text-white backdrop-blur transition hover:border-white/25 hover:bg-white/[0.06]",
} as const;

export type CtaVariant = keyof typeof ctaClassNames;

type CtaLinkProps = {
  href: string;
  label: string;
  variant: CtaVariant;
};

export function CtaLink({ href, label, variant }: CtaLinkProps) {
  return (
    <a href={href} className={ctaClassNames[variant]}>
      {label}
    </a>
  );
}
