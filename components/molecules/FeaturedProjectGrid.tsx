"use client";

import { useMemo, useState } from "react";
import { ProjectCard } from "@/components/molecules/ProjectCard";
import type { FeaturedProject } from "@/data/projects";
import type { Locale } from "@/i18n/routing";

type FeaturedProjectGridProps = {
  projects: FeaturedProject[];
  categoryLabels: Record<string, string>;
  locale: Locale;
};

const allFilter = "All";
const preferredFilterOrder = [allFilter, "CMS", "AI", "Mobile", "Backend"];

function getProjectFilters(projects: FeaturedProject[]) {
  const categories = new Set(projects.flatMap((project) => project.categories));

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

export function FeaturedProjectGrid({
  projects,
  categoryLabels,
  locale,
}: FeaturedProjectGridProps) {
  const filters = useMemo(() => getProjectFilters(projects), [projects]);
  const [activeFilter, setActiveFilter] = useState(allFilter);

  const filteredProjects =
    activeFilter === allFilter
      ? projects
      : projects.filter((project) => project.categories.includes(activeFilter));

  return (
    <>
      <ul className="mt-10 flex flex-wrap gap-2" aria-label="Project filters">
        {filters.map((filter) => {
          const isActive = filter === activeFilter;

          return (
            <li key={filter}>
              <button
                type="button"
                aria-pressed={isActive}
                onClick={() => setActiveFilter(filter)}
                className={`rounded-full border px-4 py-2 text-sm font-medium transition focus-visible:ring-2 focus-visible:ring-cyan-200/40 focus-visible:ring-offset-2 focus-visible:ring-offset-[#050608] focus-visible:outline-none ${
                isActive
                  ? "border-white/20 bg-white text-neutral-950"
                  : "border-white/10 bg-white/[0.035] text-neutral-300 hover:border-white/20 hover:bg-white/[0.06] hover:text-white"
              }`}
              >
                {categoryLabels[filter] ?? filter}
              </button>
            </li>
          );
        })}
      </ul>

      <ul className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {filteredProjects.map((project) => (
          <li key={project.title}>
            <ProjectCard project={project} locale={locale} />
          </li>
        ))}
      </ul>
    </>
  );
}
