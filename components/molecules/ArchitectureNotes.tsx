import type { ArchitectureNoteSection } from "@/data/architecture";

type ArchitectureNotesProps = {
  title?: string;
  sections: readonly ArchitectureNoteSection[];
};

export function ArchitectureNotes({
  title = "Architecture Notes",
  sections,
}: ArchitectureNotesProps) {
  return (
    <section className="rounded-2xl border border-white/10 bg-[#08090d]/80 p-6 shadow-2xl shadow-black/30 backdrop-blur">
      <h2 className="text-lg font-semibold tracking-tight text-white">
        {title}
      </h2>

      <div className="mt-5 space-y-3">
        {sections.map((section) => (
          <details
            key={section.title}
            open={section.isDefaultOpen}
            className="group rounded-xl border border-white/10 bg-white/[0.025] p-4"
          >
            <summary className="cursor-pointer list-none text-sm font-semibold text-neutral-200 transition group-open:text-white">
              <span className="flex items-center justify-between gap-4">
                {section.title}
                <span className="text-xs font-medium text-neutral-500 group-open:text-cyan-200/70">
                  {section.isDefaultOpen ? "Open" : "View"}
                </span>
              </span>
            </summary>

            <p className="mt-3 text-sm leading-6 text-neutral-400">
              {section.summary}
            </p>

            <ul className="mt-4 space-y-2">
              {section.items.map((item) => (
                <li key={item} className="text-sm leading-6 text-neutral-300">
                  {item}
                </li>
              ))}
            </ul>
          </details>
        ))}
      </div>
    </section>
  );
}
