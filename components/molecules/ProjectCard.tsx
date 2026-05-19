import { TechTag } from "@/components/atoms/TechTag";
import { TextLink } from "@/components/atoms/TextLink";
import type { FeaturedProjectsData } from "@/data/projects";

type ProjectCardProps = {
  project: FeaturedProjectsData["projects"][number];
};

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <article className="group relative overflow-hidden rounded-2xl border border-white/10 bg-[#08090d]/80 p-6 shadow-2xl shadow-black/30 backdrop-blur transition hover:border-white/20 hover:bg-[#0b0d12]/90">
      <div className="absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-cyan-200/25 to-transparent" />
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_50%_0%,rgba(14,165,233,0.1),transparent_32%),linear-gradient(180deg,rgba(255,255,255,0.035),transparent_42%)]" />

      <div className="flex min-h-full flex-col">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-200/70">
            {project.type}
          </p>
          <h3 className="mt-4 text-xl font-semibold tracking-tight text-white transition group-hover:text-cyan-50">
            {project.title}
          </h3>
          <p className="mt-4 text-sm leading-6 text-neutral-400">
            {project.description}
          </p>
        </div>

        <div className="mt-6 flex flex-wrap gap-2">
          {project.stack.map((technology) => (
            <TechTag key={technology} label={technology} />
          ))}
        </div>

        <div className="mt-8 border-t border-white/10 pt-5">
          <TextLink href={project.cta.href}>{project.cta.label}</TextLink>
        </div>
      </div>
    </article>
  );
}
