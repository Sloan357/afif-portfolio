import { getTechnologyBadge } from "@/data/technologies";

type TechTagProps = {
  label: string;
};

export function TechTag({ label }: TechTagProps) {
  const technology = getTechnologyBadge(label);

  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.035] px-3 py-1 text-xs font-medium text-neutral-300">
      <span className="inline-flex h-4 min-w-4 items-center justify-center rounded-full border border-cyan-200/15 bg-cyan-300/[0.06] px-1 font-mono text-[0.6rem] leading-none font-semibold text-cyan-100/70">
        {technology.icon}
      </span>
      {technology.label}
    </span>
  );
}
