import type { HeroData } from "@/data/hero";

type CapabilityGridProps = {
  capabilities: HeroData["capabilities"];
};

export function CapabilityGrid({ capabilities }: CapabilityGridProps) {
  return (
    <div className="mt-14 grid max-w-3xl grid-cols-1 gap-px overflow-hidden rounded-lg border border-white/10 bg-white/10 sm:grid-cols-3">
      {capabilities.map((capability) => (
        <div key={capability.label} className="bg-[#08090c]/90 p-5">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-neutral-500">
            {capability.label}
          </p>
          <p className="mt-3 text-sm leading-6 text-neutral-200">
            {capability.value}
          </p>
        </div>
      ))}
    </div>
  );
}
