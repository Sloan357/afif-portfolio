export default function Home() {
  return (
    <main className="min-h-screen bg-[#050608] text-white">
      <section className="relative isolate mx-auto flex min-h-screen max-w-7xl flex-col justify-center overflow-hidden px-6 py-24 sm:px-8 lg:px-12">
        <div className="absolute inset-0 -z-20 bg-[radial-gradient(circle_at_20%_20%,rgba(34,197,94,0.16),transparent_28%),radial-gradient(circle_at_78%_12%,rgba(99,102,241,0.14),transparent_26%),linear-gradient(180deg,#050608_0%,#09090b_48%,#050608_100%)]" />
        <div className="absolute inset-x-0 top-0 -z-10 h-px bg-gradient-to-r from-transparent via-white/25 to-transparent" />
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,rgba(255,255,255,0.045)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.045)_1px,transparent_1px)] bg-[size:72px_72px] [mask-image:radial-gradient(ellipse_at_center,black_0%,transparent_70%)]" />

        <div className="max-w-4xl">
          <div className="mb-7 inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-sm text-neutral-300 shadow-2xl shadow-black/20 backdrop-blur">
            <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_18px_rgba(52,211,153,0.8)]" />
            <span className="font-medium">Full-stack software engineer</span>
            <span className="hidden h-4 w-px bg-white/10 sm:block" />
            <span className="hidden text-neutral-500 sm:inline">
              APIs, systems, interfaces
            </span>
          </div>

          <h1 className="max-w-4xl text-5xl font-semibold tracking-tight text-balance sm:text-6xl md:text-7xl lg:text-8xl">
            I build reliable software across backend, web, and mobile.
          </h1>

          <p className="mt-7 max-w-2xl text-lg leading-8 text-neutral-300 sm:text-xl sm:leading-9">
            I&apos;m Afif. I work close to the data model, API boundaries, and
            frontend runtime to ship systems that are maintainable under real
            usage: Laravel, Symfony, React, React Native, and AI-integrated
            workflows.
          </p>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <a
              href="#projects"
              className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-neutral-950 shadow-[0_0_40px_rgba(255,255,255,0.12)] transition hover:bg-neutral-200"
            >
              Inspect projects
            </a>

            <a
              href="#contact"
              className="inline-flex items-center justify-center rounded-full border border-white/12 bg-white/[0.03] px-6 py-3 text-sm font-semibold text-white backdrop-blur transition hover:border-white/25 hover:bg-white/[0.06]"
            >
              Contact
            </a>
          </div>

          <div className="mt-14 grid max-w-3xl grid-cols-1 gap-px overflow-hidden rounded-lg border border-white/10 bg-white/10 sm:grid-cols-3">
            {[
              ["Backend", "Laravel, Symfony, REST APIs"],
              ["Frontend", "React, Next.js, stateful UI"],
              ["Mobile", "React Native, app workflows"],
            ].map(([label, value]) => (
              <div key={label} className="bg-[#08090c]/90 p-5">
                <p className="text-xs font-medium uppercase tracking-[0.2em] text-neutral-500">
                  {label}
                </p>
                <p className="mt-3 text-sm leading-6 text-neutral-200">
                  {value}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
