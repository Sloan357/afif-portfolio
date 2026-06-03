import { SectionEyebrow } from "@/components/atoms/SectionEyebrow";
import { FeaturedProjectGrid } from "@/components/molecules/FeaturedProjectGrid";
import {
  getFeaturedProjectsData,
  type FeaturedProjectsData,
} from "@/data/projects";
import type { Locale } from "@/i18n/routing";

type FeaturedProjectsProps = {
  locale: Locale;
  featuredProjectsData?: FeaturedProjectsData;
};

export function FeaturedProjects({
  locale,
  featuredProjectsData,
}: FeaturedProjectsProps) {
  const resolvedFeaturedProjectsData =
    featuredProjectsData ?? getFeaturedProjectsData(locale);

  return (
    <section
      id="projects"
      className="relative mx-auto max-w-7xl scroll-mt-24 overflow-hidden px-6 py-16 sm:px-8 sm:py-20 lg:px-12 lg:py-24"
    >
      <div className="absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent lg:inset-x-12" />

      <div className="max-w-3xl">
        <SectionEyebrow>{resolvedFeaturedProjectsData.eyebrow}</SectionEyebrow>
        <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white sm:text-4xl md:text-5xl">
          {resolvedFeaturedProjectsData.title}
        </h2>
        <p className="mt-5 max-w-2xl text-base leading-7 text-neutral-400 sm:text-lg">
          {resolvedFeaturedProjectsData.description}
        </p>
      </div>

      <FeaturedProjectGrid
        projects={resolvedFeaturedProjectsData.projects}
        categoryLabels={resolvedFeaturedProjectsData.categoryLabels}
        locale={locale}
      />
    </section>
  );
}
