import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ProjectPreview } from "@/components/atoms/ProjectPreview";
import { StructuredData } from "@/components/atoms/StructuredData";
import { TechTag } from "@/components/atoms/TechTag";
import { ArchitectureNotes } from "@/components/molecules/ArchitectureNotes";
import { Navigation } from "@/components/organisms/Navigation";
import { getFeaturedProjects, type FeaturedProject } from "@/data/projects";
import { createMetadataFromSeo, getLocalizedUrl, getSeoData } from "@/data/seo";
import { createProjectJsonLd } from "@/data/structured-data";
import type { CmsImage } from "@/data/types";
import { adaptCmsProject } from "@/lib/api/adapters";
import { getCmsProject } from "@/lib/api/projects";
import {
  defaultLocale,
  isSupportedLocale,
  supportedLocales,
  type Locale,
} from "@/i18n/routing";

type ProjectPageProps = {
  params: Promise<{
    locale: string;
    slug: string;
  }>;
};

type ProjectMetadataItem = {
  label: string;
  value: string;
};

export function generateStaticParams() {
  return supportedLocales.flatMap((locale) =>
    getFeaturedProjects().map((project) => ({
      locale,
      slug: project.slug,
    })),
  );
}

async function getResolvedProject(locale: Locale, slug: string) {
  const [cmsProject, cmsProjectMediaFallback] = await Promise.all([
    getCmsProject(slug, locale),
    locale === defaultLocale
      ? Promise.resolve(null)
      : getCmsProject(slug, defaultLocale),
  ]);

  return adaptCmsProject(cmsProject, locale, slug, cmsProjectMediaFallback);
}

function hasText(value: string | null | undefined) {
  return Boolean(value && value.trim());
}

function hasItems(items: readonly unknown[] | null | undefined) {
  return Boolean(items && items.length > 0);
}

function getProjectDescription(project: FeaturedProject) {
  return project.summary || project.description || project.subtitle;
}

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const { locale, slug } = await params;

  if (!isSupportedLocale(locale)) {
    return {};
  }

  const project = await getResolvedProject(locale, slug);

  if (!project) {
    return {};
  }

  const path = `/projects/${project.slug}`;
  const fallbackSeo = getSeoData(locale, path);
  const projectSeo = project.seo;
  const fallbackDescription = getProjectDescription(project);
  const seo = {
    ...fallbackSeo,
    metaTitle:
      projectSeo?.metaTitle || `${project.title} - Afif El Charif`,
    metaDescription:
      projectSeo?.metaDescription || fallbackDescription,
    canonicalUrl: projectSeo?.canonicalUrl || getLocalizedUrl(locale, path),
    ogTitle: projectSeo?.ogTitle || projectSeo?.metaTitle || `${project.title} - Afif El Charif`,
    ogDescription:
      projectSeo?.ogDescription || projectSeo?.metaDescription || fallbackDescription,
    ogImage: projectSeo?.ogImage || project.coverImage?.src || null,
    twitterTitle:
      projectSeo?.twitterTitle || projectSeo?.ogTitle || projectSeo?.metaTitle || `${project.title} - Afif El Charif`,
    twitterDescription:
      projectSeo?.twitterDescription ||
      projectSeo?.ogDescription ||
      projectSeo?.metaDescription ||
      fallbackDescription,
    twitterImage:
      projectSeo?.twitterImage || projectSeo?.ogImage || project.coverImage?.src || null,
    noIndex: projectSeo?.noIndex ?? fallbackSeo.noIndex,
  };

  return createMetadataFromSeo(seo, locale, path, "article");
}

function DetailList({
  title,
  items,
}: {
  title: string;
  items: readonly string[];
}) {
  if (!hasItems(items)) {
    return null;
  }

  return (
    <section className="rounded-2xl border border-white/10 bg-[#08090d]/80 p-6 shadow-2xl shadow-black/30 backdrop-blur">
      <h2 className="text-lg font-semibold tracking-tight text-white">
        {title}
      </h2>
      <ul className="mt-5 space-y-3">
        {items.map((item) => (
          <li key={item} className="text-sm leading-6 text-neutral-400">
            {item}
          </li>
        ))}
      </ul>
    </section>
  );
}

function Gallery({ project }: { project: FeaturedProject }) {
  const galleryImages = project.galleryImages;

  return (
    <section className="rounded-2xl border border-white/10 bg-[#08090d]/80 p-6 shadow-2xl shadow-black/30 backdrop-blur">
      <h2 className="text-lg font-semibold tracking-tight text-white">
        Gallery
      </h2>

      {galleryImages.length > 0 ? (
        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          {galleryImages.map((image) => (
            <ProjectPreview
              key={image.alt}
              image={image}
              label={project.title}
            />
          ))}
        </div>
      ) : (
        <div className="mt-5">
          <ProjectPreview image={null} label={`${project.title} mockups`} />
        </div>
      )}
    </section>
  );
}

function ProjectMetadata({ items }: { items: ProjectMetadataItem[] }) {
  if (!hasItems(items)) {
    return null;
  }

  return (
    <section className="mt-8 rounded-2xl border border-white/10 bg-[#08090d]/80 p-6 shadow-2xl shadow-black/30 backdrop-blur">
      <h2 className="text-lg font-semibold tracking-tight text-white">
        Project metadata
      </h2>
      <dl className="mt-5 grid gap-4 sm:grid-cols-2">
        {items.map((item) => (
          <div key={item.label}>
            <dt className="text-xs font-semibold tracking-[0.2em] text-neutral-500 uppercase">
              {item.label}
            </dt>
            <dd className="mt-2 text-sm leading-6 text-neutral-200">
              {item.value}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}

function EngineeringHighlights({ items }: { items: readonly string[] }) {
  if (!hasItems(items)) {
    return null;
  }

  return (
    <section className="rounded-2xl border border-white/10 bg-[#08090d]/80 p-6 shadow-2xl shadow-black/30 backdrop-blur">
      <h2 className="text-lg font-semibold tracking-tight text-white">
        Engineering Highlights
      </h2>
      <ul className="mt-5 grid gap-3 sm:grid-cols-2">
        {items.map((item) => (
          <li
            key={item}
            className="rounded-xl border border-white/10 bg-white/[0.025] px-4 py-3 text-sm leading-6 text-neutral-300"
          >
            {item}
          </li>
        ))}
      </ul>
    </section>
  );
}

function CaseStudySections({ project }: { project: FeaturedProject }) {
  const sections = project.caseStudySections ?? [];

  if (!hasItems(sections)) {
    return null;
  }

  return (
    <div className="space-y-4">
      {sections.map((section) => (
        <section
          key={`${section.title}-${section.sortOrder ?? "section"}`}
          className="rounded-2xl border border-white/10 bg-[#08090d]/80 p-6 shadow-2xl shadow-black/30 backdrop-blur"
        >
          {section.eyebrow ? (
            <p className="text-xs font-semibold tracking-[0.2em] text-neutral-500 uppercase">
              {section.eyebrow}
            </p>
          ) : null}
          <h2 className={section.eyebrow ? "mt-3 text-lg font-semibold tracking-tight text-white" : "text-lg font-semibold tracking-tight text-white"}>
            {section.title}
          </h2>
          {section.summary ? (
            <p className="mt-4 text-sm leading-6 text-neutral-400">
              {section.summary}
            </p>
          ) : null}
          {section.content ? (
            <p className="mt-4 text-sm leading-7 text-neutral-300">
              {section.content}
            </p>
          ) : null}
          {section.items && section.items.length > 0 ? (
            <ul className="mt-5 space-y-3">
              {section.items.map((item) => (
                <li key={item} className="text-sm leading-6 text-neutral-400">
                  {item}
                </li>
              ))}
            </ul>
          ) : null}
        </section>
      ))}
    </div>
  );
}

function ArchitectureDiagram({ image }: { image: CmsImage | null | undefined }) {
  if (!image?.src) {
    return null;
  }

  return (
    <section className="rounded-2xl border border-white/10 bg-[#08090d]/80 p-6 shadow-2xl shadow-black/30 backdrop-blur">
      <h2 className="text-lg font-semibold tracking-tight text-white">
        Architecture Diagram
      </h2>
      <div className="mt-5">
        <ProjectPreview image={image} label="Architecture diagram" />
      </div>
    </section>
  );
}

function getRepositoryVisibilityLabel(
  visibility: FeaturedProject["repositoryVisibility"],
) {
  if (visibility === "public") {
    return "Public";
  }

  if (visibility === "private") {
    return "Private repository";
  }

  if (visibility === "nda") {
    return "Source code unavailable due to client confidentiality.";
  }

  return "";
}

function isRepositoryLink(link: FeaturedProject["externalLinks"][number]) {
  const haystack = `${link.type} ${link.label} ${link.href}`.toLowerCase();

  return (
    haystack.includes("github") ||
    haystack.includes("repository") ||
    haystack.includes("repo") ||
    haystack.includes("source")
  );
}

function getVisibleExternalLinks(project: FeaturedProject) {
  if (project.repositoryVisibility === "private" || project.repositoryVisibility === "nda") {
    return project.externalLinks.filter((link) => !isRepositoryLink(link));
  }

  return project.externalLinks;
}

function getProjectMetadataItems(project: FeaturedProject) {
  return [
    { label: "Project type", value: project.type },
    { label: "Industry", value: project.industry ?? "" },
    { label: "Timeline", value: project.timeline ?? "" },
    { label: "Team size", value: project.teamSize ?? "" },
    { label: "Role", value: project.role },
    {
      label: "Repository",
      value: getRepositoryVisibilityLabel(project.repositoryVisibility),
    },
  ].filter((item) => hasText(item.value));
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { locale, slug } = await params;

  if (!isSupportedLocale(locale)) {
    notFound();
  }

  const project = await getResolvedProject(locale, slug);

  if (!project) {
    notFound();
  }

  const caseStudySections = project.caseStudySections ?? [];
  const hasStructuredCaseStudy = caseStudySections.length > 0;
  const visibleExternalLinks = getVisibleExternalLinks(project);

  return (
    <>
      <StructuredData data={createProjectJsonLd(project, locale)} />
      <Navigation locale={locale} />
      <main
        id="main-content"
        lang={locale}
        className="min-h-screen bg-[#050608] text-white"
      >
        <section className="relative isolate mx-auto max-w-7xl overflow-hidden px-6 py-16 sm:px-8 sm:py-20 lg:px-12 lg:py-24 xl:max-w-[88rem]">
          <div className="absolute inset-0 -z-20 bg-[radial-gradient(circle_at_18%_18%,rgba(14,165,233,0.12),transparent_28%),radial-gradient(circle_at_82%_24%,rgba(34,197,94,0.1),transparent_24%),linear-gradient(180deg,#050608_0%,#09090b_50%,#050608_100%)]" />
          <div className="absolute inset-x-0 top-0 -z-10 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

          <Link
            href={`/${locale}#projects`}
            className="inline-flex text-sm font-semibold text-neutral-300 underline-offset-4 transition hover:text-cyan-200 hover:underline focus-visible:ring-2 focus-visible:ring-cyan-200/40 focus-visible:ring-offset-2 focus-visible:ring-offset-[#050608] focus-visible:outline-none"
          >
            Back to Projects
          </Link>

          <div className="mt-10 grid gap-10 xl:grid-cols-[minmax(0,1fr)_420px] xl:gap-16">
            <div>
              <p className="text-xs font-semibold tracking-[0.22em] text-emerald-200/70 uppercase">
                {project.type}
              </p>
              <h1 className="mt-5 max-w-4xl text-4xl font-semibold tracking-tight text-balance text-white sm:text-5xl md:text-6xl">
                {project.title}
              </h1>
              {project.subtitle ? (
                <p className="mt-6 max-w-2xl text-base leading-8 text-neutral-300 sm:text-lg">
                  {project.subtitle}
                </p>
              ) : null}
              {project.summary || project.description ? (
                <p className="mt-5 max-w-3xl text-sm leading-7 text-neutral-400 sm:text-base">
                  {project.summary || project.description}
                </p>
              ) : null}

              <ul className="mt-8 flex flex-wrap gap-2">
                {project.stack.map((technology) => (
                  <li key={technology}>
                    <TechTag label={technology} />
                  </li>
                ))}
              </ul>

              <ProjectMetadata items={getProjectMetadataItems(project)} />
            </div>

            <aside className="rounded-2xl border border-white/10 bg-[#08090d]/80 p-6 shadow-2xl shadow-black/30 backdrop-blur">
              <ProjectPreview image={project.coverImage} label={project.title} />

              {visibleExternalLinks.length > 0 ? (
                <div className="border-t border-white/10 pt-5">
                  <p className="text-xs font-semibold tracking-[0.2em] text-neutral-500 uppercase">
                    Links
                  </p>
                  <ul className="mt-3 flex flex-wrap gap-3">
                    {visibleExternalLinks.map((link) => (
                      <li key={link.href}>
                        <a
                          href={link.href}
                          target={link.isExternal ? "_blank" : undefined}
                          rel={link.isExternal ? "noreferrer" : undefined}
                          className="inline-flex text-sm font-semibold text-white underline-offset-4 transition hover:text-cyan-200 hover:underline focus-visible:ring-2 focus-visible:ring-cyan-200/40 focus-visible:ring-offset-2 focus-visible:ring-offset-[#050608] focus-visible:outline-none"
                        >
                          {link.label}
                          {link.isExternal ? (
                            <span className="sr-only"> Opens in a new tab</span>
                          ) : null}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}
            </aside>
          </div>

          <div className="mt-12 space-y-4">
            <EngineeringHighlights items={project.engineeringHighlights ?? []} />
            <CaseStudySections project={project} />
            <ArchitectureDiagram image={project.architectureDiagram} />
          </div>

          {!hasStructuredCaseStudy ? (
            <div className="mt-12 grid gap-4 lg:grid-cols-3">
              {project.architectureNotes.length > 0 ? (
                <ArchitectureNotes sections={project.architectureNotes} />
              ) : null}
              <DetailList title="Challenges" items={project.challenges} />
              <DetailList title="Outcomes" items={project.outcomes} />
            </div>
          ) : null}

          <div className="mt-4">
            <Gallery project={project} />
          </div>
        </section>
      </main>
    </>
  );
}
