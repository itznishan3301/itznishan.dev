import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <section className="section-container text-center">
        <p className="mb-4 font-mono text-xs uppercase tracking-widest text-[var(--color-text-tertiary)]">
          404
        </p>
        <h1 className="text-4xl font-semibold tracking-tight md:text-6xl">
          Page Not Found
        </h1>
        <p className="mt-6 text-lg text-[var(--color-text-secondary)]">
          The page you are looking for does not exist.
        </p>
        <Link href="/" className="btn btn-primary mt-10 inline-flex">
          Back to Home
        </Link>
      </section>
    </main>
  );
}
