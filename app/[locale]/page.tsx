import { notFound } from "next/navigation";
import { Hero } from "@/components/organisms/Hero";
import { FeaturedProjects } from "@/components/organisms/FeaturedProjects";
import { Labs } from "@/components/organisms/Labs";
import { Experience } from "@/components/organisms/Experience";
import { Navigation } from "@/components/organisms/Navigation";
import { Contact } from "@/components/organisms/Contact";
import { StructuredData } from "@/components/atoms/StructuredData";
import { getSeoData } from "@/data/seo";
import { createHomepageJsonLd } from "@/data/structured-data";
import { isSupportedLocale, supportedLocales } from "@/i18n/routing";

export function generateStaticParams() {
  return supportedLocales.map((locale) => ({ locale }));
}

type HomePageProps = {
  params: Promise<{
    locale: string;
  }>;
};

export default async function Home({ params }: HomePageProps) {
  const { locale } = await params;

  if (!isSupportedLocale(locale)) {
    notFound();
  }

  const seo = getSeoData(locale);

  return (
    <main lang={locale} className="min-h-screen bg-[#050608] text-white">
      <StructuredData data={createHomepageJsonLd(locale, seo)} />
      <Navigation locale={locale} />
      <Hero locale={locale} />
      <FeaturedProjects locale={locale} />
      <Labs locale={locale} />
      <Experience locale={locale} />
      <Contact locale={locale} />
    </main>
  );
}
