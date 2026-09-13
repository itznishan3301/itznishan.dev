export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <section className="section-container section-padding text-center">
        <p className="mb-4 font-mono text-xs uppercase tracking-widest text-[var(--color-text-tertiary)]">
          Portfolio — Under Construction
        </p>
        <h1 className="text-5xl font-semibold tracking-tight md:text-7xl">
          Nuruzzaman Nishan
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-[var(--color-text-secondary)]">
          [ADD YOUR TAGLINE OR INTRODUCTION]
        </p>
        <div className="mt-10 flex items-center justify-center gap-4">
          <a href="#contact" className="btn btn-primary">
            Get in Touch
          </a>
          <a
            href="/resume/Nuruzzaman_Nishan_Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-outline"
          >
            Download CV
          </a>
        </div>
      </section>
    </main>
  );
}
