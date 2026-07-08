export function SkipLink() {
  return (
    <a
      href="#main-content"
      className="sr-only fixed top-4 left-4 z-[100] rounded-full bg-white px-5 py-3 text-sm font-semibold text-neutral-950 shadow-2xl focus:not-sr-only focus:ring-2 focus:ring-cyan-200/50 focus:ring-offset-2 focus:ring-offset-[#050608] focus:outline-none"
    >
      Skip to content
    </a>
  );
}
