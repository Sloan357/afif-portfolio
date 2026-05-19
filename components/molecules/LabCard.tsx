"use client";

import { useState } from "react";
import { ProjectPreview } from "@/components/atoms/ProjectPreview";
import { TechTag } from "@/components/atoms/TechTag";
import { ArchitectureNotes } from "@/components/molecules/ArchitectureNotes";
import { TextLink } from "@/components/atoms/TextLink";
import type { LabsData } from "@/data/labs";

type LabCardProps = {
  lab: LabsData["labs"][number];
};

export function LabCard({ lab }: LabCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <article className="group relative overflow-hidden rounded-2xl border border-white/10 bg-[#08090d]/80 p-6 shadow-2xl shadow-black/30 backdrop-blur transition hover:border-white/20 hover:bg-[#0b0d12]/90">
      <div className="absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-cyan-200/25 to-transparent" />
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_50%_0%,rgba(14,165,233,0.1),transparent_32%),linear-gradient(180deg,rgba(255,255,255,0.035),transparent_42%)]" />

      <div className="flex min-h-full flex-col">
        <ProjectPreview image={lab.coverImage} label={lab.title} />

        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-200/70">
            {lab.type}
          </p>
          <h3 className="mt-4 text-xl font-semibold tracking-tight text-white transition group-hover:text-cyan-50">
            {lab.title}
          </h3>
          <p className="mt-4 text-sm leading-6 text-neutral-400">
            {lab.description}
          </p>
          <p className="mt-4 text-xs font-medium leading-5 text-cyan-200/70">
            {lab.showcase}
          </p>
        </div>

        <div className="mt-6 flex flex-wrap gap-2">
          {lab.stack.map((technology) => (
            <TechTag key={technology} label={technology} />
          ))}
        </div>

        {isExpanded ? (
          <div className="mt-6 space-y-5 rounded-xl border border-white/10 bg-white/[0.025] p-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-neutral-500">
                Concept
              </p>
              <p className="mt-2 text-sm leading-6 text-neutral-300">
                {lab.concept.summary}
              </p>
            </div>

            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-neutral-500">
                Skills demonstrated
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {lab.concept.skillsDemonstrated.map((skill) => (
                  <TechTag key={skill} label={skill} />
                ))}
              </div>
            </div>

            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-neutral-500">
                Planned architecture
              </p>
              <ul className="mt-3 space-y-2">
                {lab.concept.plannedArchitecture.map((item) => (
                  <li key={item} className="text-sm leading-6 text-neutral-400">
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <ArchitectureNotes
              title="Architecture Notes"
              sections={lab.concept.architectureNotes}
            />

            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-neutral-500">
                Why it matters
              </p>
              <p className="mt-2 text-sm leading-6 text-neutral-300">
                {lab.concept.whyItMatters}
              </p>
            </div>
          </div>
        ) : null}

        <div className="mt-8 flex items-center justify-between gap-4 border-t border-white/10 pt-5">
          <button
            type="button"
            onClick={() => setIsExpanded((current) => !current)}
            className="inline-flex text-sm font-semibold text-white underline-offset-4 transition hover:text-cyan-200 hover:underline"
            aria-expanded={isExpanded}
          >
            {isExpanded ? "Hide concept" : "View concept"}
          </button>
          <TextLink href={lab.cta.href}>{lab.cta.label}</TextLink>
        </div>
      </div>
    </article>
  );
}
