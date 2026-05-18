import { StatusDot } from "@/components/atoms/StatusDot";
import type { HeroData } from "@/data/hero";

type HeroBadgeProps = {
  badge: HeroData["badge"];
};

export function HeroBadge({ badge }: HeroBadgeProps) {
  return (
    <div className="mb-7 inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-sm text-neutral-300 shadow-2xl shadow-black/20 backdrop-blur">
      <StatusDot />
      <span className="font-medium">{badge.label}</span>
      <span className="hidden h-4 w-px bg-white/10 sm:block" />
      <span className="hidden text-neutral-500 sm:inline">{badge.meta}</span>
    </div>
  );
}
