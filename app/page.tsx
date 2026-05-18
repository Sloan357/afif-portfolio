import { Hero } from "@/components/organisms/Hero";
import { FeaturedProjects } from "@/components/organisms/FeaturedProjects";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#050608] text-white">
      <Hero />
      <FeaturedProjects />
    </main>
  );
}
