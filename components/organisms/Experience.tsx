import { SectionEyebrow } from "@/components/atoms/SectionEyebrow";
import { TechTag } from "@/components/atoms/TechTag";
import { ExperienceCard } from "@/components/molecules/ExperienceCard";
import { getExperienceData } from "@/data/experience";
import type { CmsExperienceData } from "@/lib/api/types";
import type { Locale } from "@/i18n/routing";

type ExperienceProps = {
  locale: Locale;
  experienceData?: CmsExperienceData;
};

export function Experience({ locale, experienceData }: ExperienceProps) {
  const resolvedExperienceData = experienceData ?? getExperienceData(locale);

  return (
    <section
      id="experience"
      className="relative mx-auto max-w-7xl scroll-mt-24 overflow-hidden px-6 py-16 sm:px-8 sm:py-20 lg:px-12 lg:py-24"
    >
      <div className="absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent lg:inset-x-12" />

      <div className="grid gap-10 xl:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] xl:items-start">
        <div className="max-w-3xl">
          <SectionEyebrow>{resolvedExperienceData.eyebrow}</SectionEyebrow>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white sm:text-4xl md:text-5xl">
            {resolvedExperienceData.title}
          </h2>
          <p className="mt-5 max-w-2xl text-base leading-7 text-neutral-400 sm:text-lg">
            {resolvedExperienceData.introduction}
          </p>

          <div className="mt-8 flex flex-wrap gap-2">
            {resolvedExperienceData.focusAreas.map((focusArea) => (
              <TechTag key={focusArea} label={focusArea} />
            ))}
          </div>
        </div>

        <div className="relative space-y-5 before:absolute before:top-6 before:bottom-6 before:left-3 before:w-px before:bg-gradient-to-b before:from-cyan-200/30 before:via-white/10 before:to-transparent">
          {resolvedExperienceData.experiences.map((experience) => (
            <ExperienceCard
              key={`${experience.role}-${experience.period}`}
              experience={experience}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
