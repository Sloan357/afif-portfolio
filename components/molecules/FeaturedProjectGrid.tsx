"use client";

import { useMemo, useState } from "react";
import { ProjectCard } from "@/components/molecules/ProjectCard";
import type { FeaturedProject } from "@/data/projects";

type FeaturedProjectGridProps = {
  projects: FeaturedProject[];
};

const allFilter = "All";
const preferredFilterOrder = [allFilter, "CMS", "AI", "Mobile", "Backend"];

function getProjectFilters(projects: FeaturedProject[]) {
  const categories = new Set(
    projects.flatMap((project) => project.categories),
  );

  return [
    allFilter,
    ...Array.from(categories).sort((first, second) => {
      const firstIndex = preferredFilterOrder.indexOf(first);
      const secondIndex = preferredFilterOrder.indexOf(second);

      if (firstIndex === -1 && secondIndex === -1) {
        return first.localeCompare(second);
      }

      if (firstIndex === -1) {
        return 1;
      }

      if (secondIndex === -1) {
        return -1;
      }

      return firstIndex - secondIndex;
    }),
  ];
}

export function FeaturedProjectGrid({ projects }: FeaturedProjectGridProps) {
  const filters = useMemo(() => getProjectFilters(projects), [projects]);
  const [activeFilter, setActiveFilter] = useState(allFilter);

  const filteredProjects =
    activeFilter === allFilter
      ? projects
      : projects.filter((project) => project.categories.includes(activeFilter));

  return (
    <>
      <div className="mt-10 flex flex-wrap gap-2">
        {filters.map((filter) => {
          const isActive = filter === activeFilter;

          return (
            <button
              key={filter}
              type="button"
              onClick={() => setActiveFilter(filter)}
              className={`rounded-full border px-4 py-2 text-sm font-medium transition ${
                isActive
                  ? "border-white/20 bg-white text-neutral-950"
                  : "border-white/10 bg-white/[0.035] text-neutral-300 hover:border-white/20 hover:bg-white/[0.06] hover:text-white"
              }`}
            >
              {filter}
            </button>
          );
        })}
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {filteredProjects.map((project) => (
          <ProjectCard key={project.title} project={project} />
        ))}
      </div>
    </>
  );
}
