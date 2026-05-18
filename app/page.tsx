const architectureClients = ["Web app", "Mobile app"];

const architectureServices = [
  { label: "Auth", value: "Sessions, roles" },
  { label: "API", value: "REST contracts" },
  { label: "Jobs", value: "Queues, workers" },
];

const architectureFoundations = [
  { label: "MariaDB", value: "Relational data model" },
  { label: "AI layer", value: "Tool-backed workflows" },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-[#050608] text-white">
      <section className="relative isolate mx-auto flex min-h-screen max-w-7xl flex-col justify-center overflow-hidden px-6 py-24 sm:px-8 lg:px-12">
        <div className="absolute inset-0 -z-20 bg-[radial-gradient(circle_at_18%_22%,rgba(34,197,94,0.14),transparent_28%),radial-gradient(circle_at_78%_30%,rgba(14,165,233,0.13),transparent_26%),radial-gradient(circle_at_70%_72%,rgba(99,102,241,0.12),transparent_24%),linear-gradient(180deg,#050608_0%,#09090b_48%,#050608_100%)]" />
        <div className="absolute inset-x-0 top-0 -z-10 h-px bg-gradient-to-r from-transparent via-white/25 to-transparent" />
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,rgba(255,255,255,0.045)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.045)_1px,transparent_1px)] bg-[size:72px_72px] [mask-image:radial-gradient(ellipse_at_center,black_0%,transparent_70%)]" />

        <div className="grid items-center gap-16 lg:grid-cols-[minmax(0,1fr)_430px]">
          <div>
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
              I&apos;m Afif. I work close to the data model, API boundaries,
              and frontend runtime to ship systems that are maintainable under
              real usage: Laravel, Symfony, React, React Native, and
              AI-integrated workflows.
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

          <div className="hidden lg:block">
            <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-[#08090d]/85 p-6 shadow-2xl shadow-black/45 backdrop-blur">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(14,165,233,0.13),transparent_34%),linear-gradient(180deg,rgba(255,255,255,0.045),transparent_34%)]" />
              <div className="absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-cyan-200/35 to-transparent" />

              <div className="relative">
                <div className="flex items-start justify-between gap-6">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.24em] text-neutral-500">
                      Architecture
                    </p>
                    <h2 className="mt-3 text-lg font-semibold tracking-tight text-white">
                      Product system card
                    </h2>
                  </div>
                  <div className="rounded-full border border-emerald-300/20 bg-emerald-400/[0.08] px-3 py-1 text-xs font-medium text-emerald-200">
                    API-first
                  </div>
                </div>

                <div className="mt-9 rounded-2xl border border-white/10 bg-black/20 p-4">
                  <div className="grid grid-cols-2 gap-3">
                    {architectureClients.map((client) => (
                      <div
                        key={client}
                        className="rounded-xl border border-white/10 bg-white/[0.045] px-4 py-3 text-center text-sm font-medium text-neutral-200"
                      >
                        {client}
                      </div>
                    ))}
                  </div>

                  <div className="mx-auto h-8 w-px bg-gradient-to-b from-white/20 to-cyan-300/35" />

                  <div className="rounded-2xl border border-cyan-200/20 bg-cyan-300/[0.06] p-4 shadow-[0_0_70px_rgba(14,165,233,0.11)]">
                    <div className="flex items-center justify-between gap-4">
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-cyan-200/70">
                          Core
                        </p>
                        <p className="mt-2 text-base font-semibold text-white">
                          Laravel / Symfony API
                        </p>
                      </div>
                      <div className="rounded-lg border border-white/10 bg-black/25 px-3 py-2 font-mono text-xs text-neutral-300">
                        /v1
                      </div>
                    </div>

                    <div className="mt-4 grid grid-cols-3 gap-2">
                      {architectureServices.map((service) => (
                        <div
                          key={service.label}
                          className="rounded-lg border border-white/10 bg-[#090b10]/80 p-3"
                        >
                          <p className="text-xs font-medium text-neutral-200">
                            {service.label}
                          </p>
                          <p className="mt-1 text-xs leading-4 text-neutral-500">
                            {service.value}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mx-auto h-8 w-px bg-gradient-to-b from-cyan-300/35 to-emerald-300/30" />

                  <div className="grid grid-cols-2 gap-3">
                    {architectureFoundations.map((foundation) => (
                      <div
                        key={foundation.label}
                        className="rounded-xl border border-white/10 bg-white/[0.035] p-4"
                      >
                        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-neutral-500">
                          {foundation.label}
                        </p>
                        <p className="mt-2 text-sm leading-5 text-neutral-200">
                          {foundation.value}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-4 flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.025] px-4 py-3">
                  <p className="text-xs text-neutral-500">Boundaries</p>
                  <p className="font-mono text-xs text-neutral-300">
                    UI - API - DATA
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
