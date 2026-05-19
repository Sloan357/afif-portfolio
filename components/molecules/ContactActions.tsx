import type { ContactData } from "@/data/contact";

type ContactActionsProps = {
  actions: ContactData["actions"];
};

export function ContactActions({ actions }: ContactActionsProps) {
  const visibleActions = actions.filter((action) => action.isVisible);
  const primaryAction = visibleActions.find((action) => action.isPrimary);
  const secondaryActions = visibleActions.filter((action) => !action.isPrimary);

  return (
    <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-center">
      {primaryAction ? (
        <a
          href={primaryAction.href}
          target={primaryAction.opensInNewTab ? "_blank" : undefined}
          rel={primaryAction.opensInNewTab ? "noreferrer" : undefined}
          className="inline-flex items-center justify-center rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-neutral-950 shadow-[0_0_60px_rgba(255,255,255,0.16)] transition hover:bg-neutral-200"
        >
          {primaryAction.label}
        </a>
      ) : null}

      {secondaryActions.map((link) => (
        <a
          key={link.label}
          href={link.href}
          target={link.opensInNewTab ? "_blank" : undefined}
          rel={link.opensInNewTab ? "noreferrer" : undefined}
          className="inline-flex items-center justify-center rounded-full border border-white/12 bg-white/[0.035] px-7 py-3.5 text-sm font-semibold text-white backdrop-blur transition hover:border-white/25 hover:bg-white/[0.07]"
        >
          {link.label}
        </a>
      ))}
    </div>
  );
}
