import { SectionEyebrow } from "@/components/atoms/SectionEyebrow";
import { ProjectCard } from "@/components/molecules/ProjectCard";
import { featuredProjectsData } from "@/data/projects";

export function FeaturedProjects() {
  return (
    <section
      id="projects"
      className="relative mx-auto max-w-7xl overflow-hidden px-6 py-24 sm:px-8 lg:px-12"
    >
      <div className="absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent lg:inset-x-12" />

      <div className="max-w-3xl">
        <SectionEyebrow>{featuredProjectsData.eyebrow}</SectionEyebrow>
        <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white sm:text-4xl md:text-5xl">
          {featuredProjectsData.title}
        </h2>
        <p className="mt-5 max-w-2xl text-base leading-7 text-neutral-400 sm:text-lg">
          {featuredProjectsData.description}
        </p>
      </div>

      <div className="mt-12 grid gap-4 md:grid-cols-3">
        {featuredProjectsData.projects.map((project) => (
          <ProjectCard key={project.title} project={project} />
        ))}
      </div>
    </section>
  );
}
