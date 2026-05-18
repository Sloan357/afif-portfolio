import { TechTag } from "@/components/atoms/TechTag";
import type { ExperienceData } from "@/data/experience";

type ExperienceCardProps = {
  experience: ExperienceData["experiences"][number];
};

export function ExperienceCard({ experience }: ExperienceCardProps) {
  return (
    <article className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#08090d]/80 p-6 shadow-2xl shadow-black/30 backdrop-blur">
      <div className="absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-cyan-200/25 to-transparent" />
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_50%_0%,rgba(14,165,233,0.08),transparent_32%),linear-gradient(180deg,rgba(255,255,255,0.03),transparent_44%)]" />

      <div className="flex flex-col gap-6 lg:grid lg:grid-cols-[220px_minmax(0,1fr)]">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-200/70">
            {experience.period}
          </p>
          <h3 className="mt-4 text-xl font-semibold tracking-tight text-white">
            {experience.role}
          </h3>
          {experience.company ? (
            <p className="mt-2 text-sm text-neutral-500">
              {experience.company}
            </p>
          ) : null}
        </div>

        <div>
          <p className="text-sm leading-6 text-neutral-400">
            {experience.summary}
          </p>

          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            {experience.responsibilities.map((responsibility) => (
              <div
                key={responsibility}
                className="rounded-xl border border-white/10 bg-white/[0.025] px-4 py-3 text-sm leading-6 text-neutral-300"
              >
                {responsibility}
              </div>
            ))}
          </div>

          <div className="mt-6 flex flex-wrap gap-2">
            {experience.technologies.map((technology) => (
              <TechTag key={technology} label={technology} />
            ))}
          </div>
        </div>
      </div>
    </article>
  );
}
