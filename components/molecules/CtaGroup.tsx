import { CtaLink } from "@/components/atoms/CtaLink";
import type { HeroData } from "@/data/hero";

type CtaGroupProps = {
  ctas: HeroData["ctas"];
};

export function CtaGroup({ ctas }: CtaGroupProps) {
  return (
    <div className="mt-8 flex flex-col gap-3 sm:flex-row lg:mt-10">
      {ctas.map((cta) => (
        <CtaLink
          key={cta.href}
          href={cta.href}
          label={cta.label}
          variant={cta.variant}
        />
      ))}
    </div>
  );
}
