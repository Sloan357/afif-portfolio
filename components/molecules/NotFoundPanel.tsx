"use client";

import { usePathname } from "next/navigation";
import { isSupportedLocale, type Locale } from "@/i18n/routing";

const notFoundContent = {
  en: {
    eyebrow: "Not found",
    title: "This page is not available.",
    description:
      "The requested page may have moved, or the project slug does not exist yet.",
    homeLabel: "Back to homepage",
    projectsLabel: "View projects",
  },
  fr: {
    eyebrow: "Introuvable",
    title: "Cette page n'est pas disponible.",
    description:
      "La page demandee a peut-etre ete deplacee, ou ce projet n'existe pas encore.",
    homeLabel: "Retour a l'accueil",
    projectsLabel: "Voir les projets",
  },
};

function getLocaleFromPathname(pathname: string): Locale {
  const locale = pathname.split("/").filter(Boolean)[0];

  return locale && isSupportedLocale(locale) ? locale : "en";
}

export function NotFoundPanel() {
  const pathname = usePathname();
  const locale = getLocaleFromPathname(pathname);
  const content = notFoundContent[locale];

  return (
    <main lang={locale} className="min-h-screen bg-[#050608] text-white">
      <section className="relative isolate mx-auto flex min-h-screen max-w-7xl items-center overflow-hidden px-6 py-16 sm:px-8 sm:py-20 lg:px-12 lg:py-24">
        <div className="absolute inset-0 -z-20 bg-[radial-gradient(circle_at_18%_22%,rgba(34,197,94,0.12),transparent_28%),radial-gradient(circle_at_78%_30%,rgba(14,165,233,0.12),transparent_26%),linear-gradient(180deg,#050608_0%,#09090b_48%,#050608_100%)]" />
        <div className="absolute inset-x-0 top-0 -z-10 h-px bg-gradient-to-r from-transparent via-white/25 to-transparent" />

        <div className="max-w-2xl">
          <p className="text-xs font-semibold tracking-[0.22em] text-emerald-200/70 uppercase">
            {content.eyebrow}
          </p>
          <h1 className="mt-5 text-4xl font-semibold text-balance text-white sm:text-5xl md:text-6xl">
            {content.title}
          </h1>
          <p className="mt-6 max-w-xl text-base leading-8 text-neutral-300 sm:text-lg">
            {content.description}
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href={`/${locale}`}
              className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-neutral-950 transition hover:bg-neutral-200"
            >
              {content.homeLabel}
            </a>
            <a
              href={`/${locale}#projects`}
              className="inline-flex items-center justify-center rounded-full border border-white/12 bg-white/[0.035] px-6 py-3 text-sm font-semibold text-white backdrop-blur transition hover:border-white/25 hover:bg-white/[0.07]"
            >
              {content.projectsLabel}
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
