import { Hero } from "@/components/organisms/Hero";
import { FeaturedProjects } from "@/components/organisms/FeaturedProjects";
import { Labs } from "@/components/organisms/Labs";
import { Experience } from "@/components/organisms/Experience";
import { Navigation } from "@/components/organisms/Navigation";
import { Contact } from "@/components/organisms/Contact";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#050608] text-white">
      <Navigation />
      <Hero />
      <FeaturedProjects />
      <Labs />
      <Experience />
      <Contact />
    </main>
  );
}
