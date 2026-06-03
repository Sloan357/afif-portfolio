import { SectionEyebrow } from "@/components/atoms/SectionEyebrow";
import { LabCard } from "@/components/molecules/LabCard";
import { getLabsData, type LabsDataShape } from "@/data/labs";
import type { Locale } from "@/i18n/routing";

type LabsProps = {
  locale: Locale;
  labsData?: LabsDataShape;
};

export function Labs({ locale, labsData }: LabsProps) {
  const resolvedLabsData = labsData ?? getLabsData(locale);

  return (
    <section
      id="labs"
      className="relative mx-auto max-w-7xl scroll-mt-24 overflow-hidden px-6 py-16 sm:px-8 sm:py-20 lg:px-12 lg:py-24"
    >
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_78%_18%,rgba(14,165,233,0.05),transparent_30%),radial-gradient(circle_at_18%_82%,rgba(34,197,94,0.06),transparent_28%)]" />
      <div className="absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent lg:inset-x-12" />

      <div className="max-w-3xl">
        <SectionEyebrow>{resolvedLabsData.eyebrow}</SectionEyebrow>
        <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white sm:text-4xl md:text-5xl">
          {resolvedLabsData.title}
        </h2>
        <p className="mt-5 max-w-2xl text-base leading-7 text-neutral-400 sm:text-lg">
          {resolvedLabsData.description}
        </p>
      </div>

      <div className="mt-12 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {resolvedLabsData.labs.map((lab) => (
          <LabCard key={lab.slug} lab={lab} />
        ))}
      </div>
    </section>
  );
}
