import { ArchitectureCard } from "@/components/molecules/ArchitectureCard";
import { HeroContent } from "@/components/molecules/HeroContent";
import { heroData } from "@/data/hero";

export function Hero() {
  return (
    <section className="relative isolate mx-auto flex min-h-screen max-w-7xl flex-col justify-center overflow-hidden px-6 py-16 sm:px-8 sm:py-20 lg:px-12 lg:py-24">
      <div className="absolute inset-0 -z-20 bg-[radial-gradient(circle_at_18%_22%,rgba(34,197,94,0.14),transparent_28%),radial-gradient(circle_at_78%_30%,rgba(14,165,233,0.13),transparent_26%),radial-gradient(circle_at_70%_72%,rgba(99,102,241,0.12),transparent_24%),linear-gradient(180deg,#050608_0%,#09090b_48%,#050608_100%)]" />
      <div className="absolute inset-x-0 top-0 -z-10 h-px bg-gradient-to-r from-transparent via-white/25 to-transparent" />
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,rgba(255,255,255,0.045)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.045)_1px,transparent_1px)] bg-[size:72px_72px] [mask-image:radial-gradient(ellipse_at_center,black_0%,transparent_70%)]" />

      <div className="grid items-center gap-16 xl:grid-cols-[minmax(0,1fr)_430px]">
        <HeroContent hero={heroData} />
        <ArchitectureCard architecture={heroData.architecture} />
      </div>
    </section>
  );
}
