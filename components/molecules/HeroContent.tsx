import { CapabilityGrid } from "@/components/molecules/CapabilityGrid";
import { CtaGroup } from "@/components/molecules/CtaGroup";
import { HeroBadge } from "@/components/molecules/HeroBadge";
import type { HeroData } from "@/data/hero";

type HeroContentProps = {
  hero: HeroData;
};

export function HeroContent({ hero }: HeroContentProps) {
  return (
    <div>
      <HeroBadge badge={hero.badge} />

      <h1 className="max-w-4xl text-4xl font-semibold tracking-tight text-balance sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl">
        {hero.headline}
      </h1>

      <p className="mt-6 max-w-2xl text-base leading-8 text-neutral-300 sm:text-lg lg:mt-7 lg:text-xl lg:leading-9">
        {hero.description}
      </p>

      <CtaGroup ctas={hero.ctas} />
      <CapabilityGrid capabilities={hero.capabilities} />
    </div>
  );
}
