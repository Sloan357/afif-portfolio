export default function Home() {
  return (
    <main className="min-h-screen bg-neutral-950 text-white">
      <section className="mx-auto flex min-h-screen max-w-5xl flex-col justify-center px-6">
        <p className="mb-4 text-sm uppercase tracking-[0.3em] text-emerald-400">
          Software Engineer
        </p>

        <h1 className="max-w-3xl text-5xl font-bold leading-tight md:text-7xl">
          Hi, I&apos;m Afif. I build web and mobile products.
        </h1>

        <p className="mt-6 max-w-2xl text-lg leading-8 text-neutral-300">
          Full-stack developer experienced in Laravel, Symfony, React Native,
          React, SaaS platforms, API design, and AI-powered product features.
        </p>

        <div className="mt-10 flex gap-4">
          <a
            href="#projects"
            className="rounded-full bg-emerald-400 px-6 py-3 font-medium text-neutral-950"
          >
            View projects
          </a>

          <a
            href="#contact"
            className="rounded-full border border-neutral-700 px-6 py-3 font-medium text-white"
          >
            Contact me
          </a>
        </div>
      </section>
    </main>
  );
}
