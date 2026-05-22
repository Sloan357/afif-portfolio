"use client";

import { useEffect, useState } from "react";
import { MenuToggle } from "@/components/atoms/MenuToggle";
import { NavLinks } from "@/components/molecules/NavLinks";
import { LanguageSwitcher } from "@/components/molecules/LanguageSwitcher";
import { getNavigationData } from "@/data/navigation";
import { localizedPath, type Locale } from "@/i18n/routing";

type NavigationProps = {
  locale: Locale;
};

export function Navigation({ locale }: NavigationProps) {
  const navigationData = getNavigationData(locale);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
            href={localizedPath(locale, navigationData.logo.href)}
            className="inline-flex items-center gap-3 text-sm font-semibold tracking-tight text-white"
            onClick={() => setIsMenuOpen(false)}
          >
            <span className="relative flex h-8 w-8 items-center justify-center overflow-hidden rounded-xl border border-white/10 bg-[#050608] text-xs shadow-lg shadow-black/20">
              <span className="font-semibold text-white">A</span>
              <span className="absolute right-1.5 bottom-1.5 left-1.5 h-0.5 rounded-full bg-emerald-400/80" />
              <span className="absolute top-1.5 right-1.5 h-2 w-0.5 rotate-[-45deg] rounded-full bg-cyan-300/80" />
            </span>
            <span>{navigationData.logo.label}</span>
          </a>

          <div className="hidden items-center gap-7 md:flex">
            <NavLinks links={navigationData.links} locale={locale} />
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
                links={navigationData.links}
                locale={locale}
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
