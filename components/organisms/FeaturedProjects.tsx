import { SectionEyebrow } from "@/components/atoms/SectionEyebrow";
import { FeaturedProjectGrid } from "@/components/molecules/FeaturedProjectGrid";
import { getFeaturedProjectsData } from "@/data/projects";
import type { Locale } from "@/i18n/routing";

type FeaturedProjectsProps = {
  locale: Locale;
};

export function FeaturedProjects({ locale }: FeaturedProjectsProps) {
  const featuredProjectsData = getFeaturedProjectsData(locale);

  return (
    <section
      id="projects"
      className="relative mx-auto max-w-7xl scroll-mt-24 overflow-hidden px-6 py-16 sm:px-8 sm:py-20 lg:px-12 lg:py-24"
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

      <FeaturedProjectGrid
        projects={featuredProjectsData.projects}
        categoryLabels={featuredProjectsData.categoryLabels}
        locale={locale}
      />
    </section>
  );
}
