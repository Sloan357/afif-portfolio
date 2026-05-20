import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ProjectPreview } from "@/components/atoms/ProjectPreview";
import { TechTag } from "@/components/atoms/TechTag";
import { ArchitectureNotes } from "@/components/molecules/ArchitectureNotes";
import {
  getFeaturedProjects,
  getProjectBySlug,
  type FeaturedProject,
} from "@/data/projects";
import { isSupportedLocale, supportedLocales } from "@/i18n/routing";

type ProjectPageProps = {
  params: Promise<{
    locale: string;
    slug: string;
  }>;
};

export function generateStaticParams() {
  return supportedLocales.flatMap((locale) =>
    getFeaturedProjects().map((project) => ({
      locale,
      slug: project.slug,
    })),
  );
}

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const { locale, slug } = await params;

  if (!isSupportedLocale(locale)) {
    return {};
  }

  const project = getProjectBySlug(slug);

  if (!project) {
    return {};
  }

  return {
    title: `${project.title} — Afif El Charif`,
    description: project.description,
    alternates: {
      canonical: `/${locale}/projects/${project.slug}`,
    },
    openGraph: {
      title: `${project.title} — Afif El Charif`,
      description: project.description,
      url: `/${locale}/projects/${project.slug}`,
      type: "article",
    },
  };
}

function DetailList({
  title,
  items,
}: {
  title: string;
  items: readonly string[];
}) {
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

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { locale, slug } = await params;

  if (!isSupportedLocale(locale)) {
    notFound();
  }

  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  return (
    <main lang={locale} className="min-h-screen bg-[#050608] text-white">
      <section className="relative isolate mx-auto max-w-7xl overflow-hidden px-6 py-16 sm:px-8 sm:py-20 lg:px-12 lg:py-24">
        <div className="absolute inset-0 -z-20 bg-[radial-gradient(circle_at_18%_18%,rgba(14,165,233,0.12),transparent_28%),radial-gradient(circle_at_82%_24%,rgba(34,197,94,0.1),transparent_24%),linear-gradient(180deg,#050608_0%,#09090b_50%,#050608_100%)]" />
        <div className="absolute inset-x-0 top-0 -z-10 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

        <Link
          href={`/${locale}#projects`}
          className="inline-flex text-sm font-semibold text-neutral-300 underline-offset-4 transition hover:text-cyan-200 hover:underline"
        >
          Back to Projects
        </Link>

        <div className="mt-10 grid gap-10 xl:grid-cols-[minmax(0,1fr)_420px] xl:gap-16">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-emerald-200/70">
              {project.type}
            </p>
            <h1 className="mt-5 max-w-4xl text-4xl font-semibold tracking-tight text-balance text-white sm:text-5xl md:text-6xl">
              {project.title}
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-8 text-neutral-300 sm:text-lg">
              {project.subtitle}
            </p>
            <p className="mt-5 max-w-3xl text-sm leading-7 text-neutral-400 sm:text-base">
              {project.description}
            </p>

            <div className="mt-8 flex flex-wrap gap-2">
              {project.stack.map((technology) => (
                <TechTag key={technology} label={technology} />
              ))}
            </div>
          </div>

          <aside className="rounded-2xl border border-white/10 bg-[#08090d]/80 p-6 shadow-2xl shadow-black/30 backdrop-blur">
            <ProjectPreview image={project.coverImage} label={project.title} />
            <div className="border-t border-white/10 pt-5">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-neutral-500">
                Role
              </p>
              <p className="mt-3 text-sm leading-6 text-neutral-200">
                {project.role}
              </p>
            </div>

            {project.externalLinks.length > 0 ? (
              <div className="mt-6 border-t border-white/10 pt-5">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-neutral-500">
                  Links
                </p>
                <div className="mt-3 flex flex-wrap gap-3">
                  {project.externalLinks.map((link) => (
                    <a
                      key={link.href}
                      href={link.href}
                      target={link.isExternal ? "_blank" : undefined}
                      rel={link.isExternal ? "noreferrer" : undefined}
                      className="inline-flex text-sm font-semibold text-white underline-offset-4 transition hover:text-cyan-200 hover:underline"
                    >
                      {link.label}
                    </a>
                  ))}
                </div>
              </div>
            ) : null}
          </aside>
        </div>

        <div className="mt-12 grid gap-4 lg:grid-cols-3">
          <ArchitectureNotes sections={project.architectureNotes} />
          <DetailList title="Challenges" items={project.challenges} />
          <DetailList title="Outcomes" items={project.outcomes} />
        </div>

        <div className="mt-4">
          <Gallery project={project} />
        </div>
      </section>
    </main>
  );
}
