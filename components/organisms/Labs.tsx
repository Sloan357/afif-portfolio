import { SectionEyebrow } from "@/components/atoms/SectionEyebrow";
import { LabCard } from "@/components/molecules/LabCard";
import { labsData } from "@/data/labs";

export function Labs() {
  return (
    <section
      id="labs"
      className="relative mx-auto max-w-7xl scroll-mt-24 overflow-hidden px-6 py-16 sm:px-8 sm:py-20 lg:px-12 lg:py-24"
    >
      <div className="absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent lg:inset-x-12" />

      <div className="max-w-3xl">
        <SectionEyebrow>{labsData.eyebrow}</SectionEyebrow>
        <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white sm:text-4xl md:text-5xl">
          {labsData.title}
        </h2>
        <p className="mt-5 max-w-2xl text-base leading-7 text-neutral-400 sm:text-lg">
          {labsData.description}
        </p>
      </div>

      <div className="mt-12 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {labsData.labs.map((lab) => (
          <LabCard key={lab.title} lab={lab} />
        ))}
      </div>
    </section>
  );
}
