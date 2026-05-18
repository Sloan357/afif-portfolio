import type { ContactData } from "@/data/contact";

type ContactActionsProps = {
  primaryAction: ContactData["primaryAction"];
  links: ContactData["links"];
};

export function ContactActions({ primaryAction, links }: ContactActionsProps) {
  return (
    <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-center">
      <a
        href={primaryAction.href}
        className="inline-flex items-center justify-center rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-neutral-950 shadow-[0_0_60px_rgba(255,255,255,0.16)] transition hover:bg-neutral-200"
      >
        {primaryAction.label}
      </a>

      {links.map((link) => (
        <a
          key={link.label}
          href={link.href}
          className="inline-flex items-center justify-center rounded-full border border-white/12 bg-white/[0.035] px-7 py-3.5 text-sm font-semibold text-white backdrop-blur transition hover:border-white/25 hover:bg-white/[0.07]"
        >
          {link.label}
        </a>
      ))}
    </div>
  );
}
