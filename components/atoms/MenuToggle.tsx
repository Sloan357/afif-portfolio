type MenuToggleProps = {
  isOpen: boolean;
  onClick: () => void;
};

export function MenuToggle({ isOpen, onClick }: MenuToggleProps) {
  return (
    <button
      type="button"
      aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
      aria-expanded={isOpen}
      onClick={onClick}
      className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.035] text-white transition hover:border-white/20 hover:bg-white/[0.06] md:hidden"
    >
      <span className="relative h-3.5 w-4">
        <span
          className={`absolute left-0 top-0 h-px w-4 bg-current transition ${isOpen ? "translate-y-[7px] rotate-45" : ""}`}
        />
        <span
          className={`absolute left-0 top-[7px] h-px w-4 bg-current transition ${isOpen ? "opacity-0" : ""}`}
        />
        <span
          className={`absolute bottom-0 left-0 h-px w-4 bg-current transition ${isOpen ? "-translate-y-[7px] -rotate-45" : ""}`}
        />
      </span>
    </button>
  );
}
