type MenuToggleProps = {
  isOpen: boolean;
  onClick: () => void;
  controlsId: string;
};

export function MenuToggle({ isOpen, onClick, controlsId }: MenuToggleProps) {
  return (
    <button
      type="button"
      aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
      aria-expanded={isOpen}
      aria-controls={controlsId}
      onClick={onClick}
      className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.035] text-white transition hover:border-white/20 hover:bg-white/[0.06] focus-visible:ring-2 focus-visible:ring-cyan-200/40 focus-visible:ring-offset-2 focus-visible:ring-offset-[#050608] focus-visible:outline-none md:hidden"
    >
      <span className="relative h-3.5 w-4">
        <span
          className={`absolute top-0 left-0 h-px w-4 bg-current transition ${isOpen ? "translate-y-[7px] rotate-45" : ""}`}
        />
        <span
          className={`absolute top-[7px] left-0 h-px w-4 bg-current transition ${isOpen ? "opacity-0" : ""}`}
        />
        <span
          className={`absolute bottom-0 left-0 h-px w-4 bg-current transition ${isOpen ? "-translate-y-[7px] -rotate-45" : ""}`}
        />
      </span>
    </button>
  );
}
