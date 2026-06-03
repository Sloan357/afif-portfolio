import { notFound } from "next/navigation";
import { Hero } from "@/components/organisms/Hero";
import { FeaturedProjects } from "@/components/organisms/FeaturedProjects";
import { Labs } from "@/components/organisms/Labs";
import { Experience } from "@/components/organisms/Experience";
import { Navigation } from "@/components/organisms/Navigation";
import { Contact } from "@/components/organisms/Contact";
import { StructuredData } from "@/components/atoms/StructuredData";
import { createHomepageJsonLd } from "@/data/structured-data";
import { adaptCmsHome, adaptCmsProjects } from "@/lib/api/adapters";
import { getCmsHome } from "@/lib/api/home";
import { getCmsProjects } from "@/lib/api/projects";
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

  const [cmsHome, cmsProjects] = await Promise.all([
    getCmsHome(locale),
    getCmsProjects(locale),
  ]);
  const homeData = adaptCmsHome(cmsHome, locale);
  const featuredProjectsData = adaptCmsProjects(
    cmsProjects,
    locale,
    homeData.featuredProjects,
  );

  if (!cmsHome && process.env.NODE_ENV === "development") {
    console.info(
      `[cms] Home API unavailable for locale "${locale}"; using static homepage data.`,
    );
  }

  return (
    <main lang={locale} className="min-h-screen bg-[#050608] text-white">
      <StructuredData data={createHomepageJsonLd(locale, homeData.seo)} />
      <Navigation locale={locale} navigationData={homeData.navigation} />
      <Hero locale={locale} heroData={homeData.hero} />
      <FeaturedProjects
        locale={locale}
        featuredProjectsData={featuredProjectsData}
      />
      <Labs locale={locale} labsData={homeData.labs} />
      <Experience locale={locale} experienceData={homeData.experience} />
      <Contact locale={locale} contactData={homeData.contact} />
    </main>
  );
}
