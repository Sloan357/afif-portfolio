import { ArchitectureItem } from "@/components/atoms/ArchitectureItem";
import type { HeroData } from "@/data/hero";

type ArchitectureCardProps = {
  architecture: HeroData["architecture"];
};

export function ArchitectureCard({ architecture }: ArchitectureCardProps) {
  return (
    <div className="hidden md:block md:max-w-3xl xl:max-w-none">
      <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-[#08090d]/85 p-6 shadow-2xl shadow-black/45 backdrop-blur">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(14,165,233,0.13),transparent_34%),linear-gradient(180deg,rgba(255,255,255,0.045),transparent_34%)]" />
        <div className="absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-cyan-200/35 to-transparent" />

        <div className="relative">
          <div className="flex items-start justify-between gap-6">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-neutral-500">
                {architecture.eyebrow}
              </p>
              <h2 className="mt-3 text-lg font-semibold tracking-tight text-white">
                {architecture.title}
              </h2>
            </div>
            <div className="rounded-full border border-emerald-300/20 bg-emerald-400/[0.08] px-3 py-1 text-xs font-medium text-emerald-200">
              {architecture.status}
            </div>
          </div>

          <div className="mt-9 rounded-2xl border border-white/10 bg-black/20 p-4">
            <div className="grid grid-cols-2 gap-3">
              {architecture.clients.map((client) => (
                <div
                  key={client}
                  className="rounded-xl border border-white/10 bg-white/[0.045] px-4 py-3 text-center text-sm font-medium text-neutral-200"
                >
                  {client}
                </div>
              ))}
            </div>

            <div className="mx-auto h-8 w-px bg-gradient-to-b from-white/20 to-cyan-300/35" />

            <div className="rounded-2xl border border-cyan-200/20 bg-cyan-300/[0.06] p-4 shadow-[0_0_70px_rgba(14,165,233,0.11)]">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] text-cyan-200/70">
                    {architecture.core.eyebrow}
                  </p>
                  <p className="mt-2 text-base font-semibold text-white">
                    {architecture.core.title}
                  </p>
                </div>
                <div className="rounded-lg border border-white/10 bg-black/25 px-3 py-2 font-mono text-xs text-neutral-300">
                  {architecture.core.version}
                </div>
              </div>

              <div className="mt-4 grid grid-cols-3 gap-2">
                {architecture.core.services.map((service) => (
                  <ArchitectureItem
                    key={service.label}
                    label={service.label}
                    value={service.value}
                    className="rounded-lg border border-white/10 bg-[#090b10]/80 p-3"
                    labelClassName="text-xs font-medium text-neutral-200"
                    valueClassName="mt-1 text-xs leading-4 text-neutral-500"
                  />
                ))}
              </div>
            </div>

            <div className="mx-auto h-8 w-px bg-gradient-to-b from-cyan-300/35 to-emerald-300/30" />

            <div className="grid grid-cols-2 gap-3">
              {architecture.foundations.map((foundation) => (
                <ArchitectureItem
                  key={foundation.label}
                  label={foundation.label}
                  value={foundation.value}
                  className="rounded-xl border border-white/10 bg-white/[0.035] p-4"
                  labelClassName="text-xs font-semibold uppercase tracking-[0.18em] text-neutral-500"
                  valueClassName="mt-2 text-sm leading-5 text-neutral-200"
                />
              ))}
            </div>
          </div>

          <div className="mt-4 flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.025] px-4 py-3">
            <p className="text-xs text-neutral-500">
              {architecture.boundary.label}
            </p>
            <p className="font-mono text-xs text-neutral-300">
              {architecture.boundary.value}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
