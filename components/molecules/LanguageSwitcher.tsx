"use client";

import { usePathname } from "next/navigation";
import {
  supportedLocales,
  switchLocalePath,
  type Locale,
} from "@/i18n/routing";

type LanguageSwitcherProps = {
  locale: Locale;
  onNavigate?: () => void;
};

export function LanguageSwitcher({
  locale,
  onNavigate,
}: LanguageSwitcherProps) {
  const pathname = usePathname();

  return (
    <nav
      className="inline-flex items-center rounded-full border border-white/10 bg-white/[0.035] p-1"
      aria-label="Language selector"
    >
      {supportedLocales.map((option) => {
        const isActive = option === locale;

        return (
          <a
            key={option}
            href={switchLocalePath(pathname, option)}
            onClick={onNavigate}
            aria-current={isActive ? "page" : undefined}
            className={`rounded-full px-2.5 py-1 text-[0.7rem] font-semibold tracking-[0.16em] uppercase transition focus-visible:ring-2 focus-visible:ring-cyan-200/40 focus-visible:ring-offset-2 focus-visible:ring-offset-[#050608] focus-visible:outline-none ${
              isActive
                ? "bg-white text-neutral-950"
                : "text-neutral-500 hover:text-white"
            }`}
          >
            {option}
          </a>
        );
      })}
    </nav>
  );
}
