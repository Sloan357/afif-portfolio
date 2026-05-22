type RouteLoadingStateProps = {
  variant?: "home" | "project";
};

function LoadingBar({ className = "" }: { className?: string }) {
  return (
    <div
      className={`rounded-full bg-white/[0.07] shadow-inner shadow-white/[0.02] ${className}`}
    />
  );
}

export function RouteLoadingState({
  variant = "home",
}: RouteLoadingStateProps) {
  const isProject = variant === "project";

  return (
    <main className="min-h-screen bg-[#050608] text-white">
      <section className="relative isolate mx-auto flex min-h-screen max-w-7xl flex-col justify-center overflow-hidden px-6 py-16 sm:px-8 sm:py-20 lg:px-12 lg:py-24">
        <div className="absolute inset-0 -z-20 bg-[radial-gradient(circle_at_18%_22%,rgba(34,197,94,0.1),transparent_28%),radial-gradient(circle_at_78%_30%,rgba(14,165,233,0.1),transparent_26%),linear-gradient(180deg,#050608_0%,#09090b_48%,#050608_100%)]" />
        <div className="absolute inset-x-0 top-0 -z-10 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.035)_1px,transparent_1px)] [mask-image:radial-gradient(ellipse_at_center,black_0%,transparent_70%)] bg-[size:72px_72px]" />

        <div
          className={
            isProject
              ? "grid gap-10 xl:grid-cols-[minmax(0,1fr)_420px] xl:gap-16"
              : "grid items-center gap-10 md:gap-12 xl:grid-cols-[minmax(0,1fr)_430px] xl:gap-16"
          }
          aria-busy="true"
          aria-label="Loading content"
        >
          <div>
            <LoadingBar className="h-7 w-44" />
            <LoadingBar className="mt-8 h-12 w-full max-w-3xl sm:h-16" />
            <LoadingBar className="mt-4 h-12 w-4/5 max-w-2xl sm:h-16" />
            <div className="mt-8 max-w-2xl space-y-3">
              <LoadingBar className="h-4 w-full" />
              <LoadingBar className="h-4 w-11/12" />
              <LoadingBar className="h-4 w-3/4" />
            </div>
            <div className="mt-10 flex flex-wrap gap-3">
              <LoadingBar className="h-11 w-36" />
              <LoadingBar className="h-11 w-28" />
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-[#08090d]/80 p-6 shadow-2xl shadow-black/30 backdrop-blur">
            <LoadingBar className="h-4 w-28" />
            <LoadingBar className="mt-5 h-8 w-3/4" />
            <div className="mt-8 grid gap-3">
              <LoadingBar className="h-16 w-full rounded-xl" />
              <LoadingBar className="h-16 w-full rounded-xl" />
              <LoadingBar className="h-16 w-full rounded-xl" />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
