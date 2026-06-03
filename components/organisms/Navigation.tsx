"use client";

import { useEffect, useMemo, useState } from "react";
import { usePathname } from "next/navigation";
import { MenuToggle } from "@/components/atoms/MenuToggle";
import { NavLinks } from "@/components/molecules/NavLinks";
import { LanguageSwitcher } from "@/components/molecules/LanguageSwitcher";
import { getNavigationData, type NavigationData } from "@/data/navigation";
import { localizedPath, type Locale } from "@/i18n/routing";

type NavigationProps = {
  locale: Locale;
  navigationData?: NavigationData;
};

export function Navigation({ locale, navigationData }: NavigationProps) {
  const resolvedNavigationData = useMemo(
    () => navigationData ?? getNavigationData(locale),
    [locale, navigationData],
  );
  const pathname = usePathname();
  const [activeHref, setActiveHref] = useState<string | null>(null);
  const activeNavHref = pathname === `/${locale}` ? activeHref : null;
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const homepagePath = `/${locale}`;

    if (pathname !== homepagePath) {
      return;
    }

    const sectionLinks = resolvedNavigationData.links.filter((link) =>
      link.href.startsWith("#"),
    );
    const sections = sectionLinks
      .map((link) => document.getElementById(link.href.slice(1)))
      .filter((section): section is HTMLElement => Boolean(section));

    if (sections.length === 0) {
      return;
    }

    const updateActiveSection = () => {
      const viewportAnchor = window.innerHeight * 0.35;
      const currentSection = sections.reduce<HTMLElement | null>(
        (activeSection, section) => {
          const rect = section.getBoundingClientRect();

          if (rect.top <= viewportAnchor && rect.bottom > viewportAnchor) {
            return section;
          }

          return activeSection;
        },
        null,
      );

      setActiveHref(currentSection ? `#${currentSection.id}` : null);
    };

    updateActiveSection();
    window.addEventListener("scroll", updateActiveSection, { passive: true });
    window.addEventListener("resize", updateActiveSection);

    return () => {
      window.removeEventListener("scroll", updateActiveSection);
      window.removeEventListener("resize", updateActiveSection);
    };
  }, [locale, resolvedNavigationData.links, pathname]);

  useEffect(() => {
    const updateScrollState = () => {
      setIsScrolled(window.scrollY > 16);
    };

    updateScrollState();
    window.addEventListener("scroll", updateScrollState, { passive: true });

    return () => window.removeEventListener("scroll", updateScrollState);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4 sm:px-6 lg:px-8">
      <nav
        className={`mx-auto max-w-7xl border px-4 py-3 transition md:rounded-full md:px-5 ${
          isMenuOpen ? "rounded-3xl" : "rounded-full"
        } ${
          isScrolled || isMenuOpen
            ? "border-white/10 bg-[#050608]/75 shadow-2xl shadow-black/30 backdrop-blur-xl"
            : "border-transparent bg-transparent"
        }`}
      >
        <div className="flex items-center justify-between gap-6">
          <a
            href={localizedPath(locale, resolvedNavigationData.logo.href)}
            className="inline-flex items-center gap-3 text-sm font-semibold tracking-tight text-white"
            onClick={() => setIsMenuOpen(false)}
          >
            <span className="relative flex h-8 w-8 items-center justify-center overflow-hidden rounded-xl border border-white/10 bg-[#050608] text-xs shadow-lg shadow-black/20">
              <span className="font-semibold text-white">A</span>
              <span className="absolute right-1.5 bottom-1.5 left-1.5 h-0.5 rounded-full bg-emerald-400/80" />
              <span className="absolute top-1.5 right-1.5 h-2 w-0.5 rotate-[-45deg] rounded-full bg-cyan-300/80" />
            </span>
            <span>{resolvedNavigationData.logo.label}</span>
          </a>

          <div className="hidden items-center gap-7 md:flex">
            <NavLinks
              links={resolvedNavigationData.links}
              locale={locale}
              activeHref={activeNavHref}
            />
            <LanguageSwitcher locale={locale} />
          </div>

          <MenuToggle
            isOpen={isMenuOpen}
            onClick={() => setIsMenuOpen((current) => !current)}
          />
        </div>

        {isMenuOpen ? (
          <div className="mt-4 border-t border-white/10 px-2 pt-5 pb-4 md:hidden">
            <div className="flex flex-col gap-5">
              <NavLinks
                links={resolvedNavigationData.links}
                locale={locale}
                activeHref={activeNavHref}
                onNavigate={() => setIsMenuOpen(false)}
              />
              <LanguageSwitcher
                locale={locale}
                onNavigate={() => setIsMenuOpen(false)}
              />
            </div>
          </div>
        ) : null}
      </nav>
    </header>
  );
}
