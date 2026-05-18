"use client";

import { useEffect, useState } from "react";
import { MenuToggle } from "@/components/atoms/MenuToggle";
import { NavLinks } from "@/components/molecules/NavLinks";
import { navigationData } from "@/data/navigation";

export function Navigation() {
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
        className={`mx-auto max-w-7xl rounded-full border px-4 py-3 transition md:px-5 ${
          isScrolled || isMenuOpen
            ? "border-white/10 bg-[#050608]/75 shadow-2xl shadow-black/30 backdrop-blur-xl"
            : "border-transparent bg-transparent"
        }`}
      >
        <div className="flex items-center justify-between gap-6">
          <a
            href={navigationData.logo.href}
            className="inline-flex items-center gap-3 text-sm font-semibold tracking-tight text-white"
            onClick={() => setIsMenuOpen(false)}
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-xs shadow-lg shadow-black/20">
              A
            </span>
            <span>{navigationData.logo.label}</span>
          </a>

          <div className="hidden items-center gap-7 md:flex">
            <NavLinks links={navigationData.links} />
          </div>

          <MenuToggle
            isOpen={isMenuOpen}
            onClick={() => setIsMenuOpen((current) => !current)}
          />
        </div>

        {isMenuOpen ? (
          <div className="mt-4 border-t border-white/10 px-1 pb-2 pt-4 md:hidden">
            <div className="flex flex-col gap-4">
              <NavLinks
                links={navigationData.links}
                onNavigate={() => setIsMenuOpen(false)}
              />
            </div>
          </div>
        ) : null}
      </nav>
    </header>
  );
}
