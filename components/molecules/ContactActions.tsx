"use client";

import { useEffect, useState } from "react";
import type { ContactData } from "@/data/contact";

type ContactActionsProps = {
  actions: ContactData["actions"];
  interactionLabels: ContactData["interactionLabels"];
};

function getEmailAddress(href: string) {
  if (!href.startsWith("mailto:")) {
    return null;
  }

  return href.replace("mailto:", "").split("?")[0] || null;
}

export function ContactActions({
  actions,
  interactionLabels,
}: ContactActionsProps) {
  const [feedback, setFeedback] = useState<string | null>(null);
  const visibleActions = actions.filter((action) => action.isVisible);
  const primaryAction = visibleActions.find((action) => action.isPrimary);
  const secondaryActions = visibleActions.filter((action) => !action.isPrimary);
  const emailAddress = primaryAction
    ? getEmailAddress(primaryAction.href)
    : null;

  useEffect(() => {
    if (!feedback) {
      return;
    }

    const timeout = window.setTimeout(() => setFeedback(null), 2400);

    return () => window.clearTimeout(timeout);
  }, [feedback]);

  async function copyEmail() {
    if (!emailAddress) {
      return;
    }

    try {
      await navigator.clipboard.writeText(emailAddress);
      setFeedback(interactionLabels.copiedEmail);
    } catch {
      setFeedback(interactionLabels.copyFailed);
    }
  }

  return (
    <div className="mt-10">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-center">
        {primaryAction ? (
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-center">
            <a
              href={primaryAction.href}
              target={primaryAction.opensInNewTab ? "_blank" : undefined}
              rel={primaryAction.opensInNewTab ? "noreferrer" : undefined}
              className="inline-flex items-center justify-center rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-neutral-950 shadow-[0_0_60px_rgba(255,255,255,0.16)] transition hover:bg-neutral-200 focus:ring-2 focus:ring-white/30 focus:ring-offset-2 focus:ring-offset-[#08090d] focus:outline-none"
            >
              {primaryAction.label}
            </a>

            {emailAddress ? (
              <button
                type="button"
                onClick={copyEmail}
                className="inline-flex items-center justify-center rounded-full border border-white/12 bg-white/[0.035] px-5 py-3.5 text-sm font-semibold text-white backdrop-blur transition hover:border-white/25 hover:bg-white/[0.07] focus:ring-2 focus:ring-cyan-200/25 focus:ring-offset-2 focus:ring-offset-[#08090d] focus:outline-none"
              >
                {interactionLabels.copyEmail}
              </button>
            ) : null}
          </div>
        ) : null}

        {secondaryActions.map((link) => (
          <a
            key={link.href}
            href={link.href}
            target={link.opensInNewTab ? "_blank" : undefined}
            rel={link.opensInNewTab ? "noreferrer" : undefined}
            className="inline-flex items-center justify-center rounded-full border border-white/12 bg-white/[0.035] px-7 py-3.5 text-sm font-semibold text-white backdrop-blur transition hover:border-white/25 hover:bg-white/[0.07] focus:ring-2 focus:ring-cyan-200/25 focus:ring-offset-2 focus:ring-offset-[#08090d] focus:outline-none"
          >
            {link.label}
          </a>
        ))}
      </div>

      <p
        aria-live="polite"
        className="mt-4 min-h-5 text-center text-xs font-medium text-emerald-200/75"
      >
        {feedback}
      </p>
    </div>
  );
}
