import Link from "next/link";

import { Container } from "@/components/ui/container";

export default function NotFound() {
  return (
    <main id="main-content" className="relative flex min-h-[70svh] items-center overflow-hidden py-24">
      <div className="technical-grid pointer-events-none absolute inset-0" />
      <Container className="relative">
        <p className="font-mono text-xs uppercase tracking-[0.18em] text-accent">
          404 / Route not found
        </p>
        <h1 className="mt-6 max-w-3xl text-5xl font-semibold leading-tight tracking-[-0.05em] text-foreground sm:text-7xl">
          This path leads outside the system.
        </h1>
        <p className="mt-6 max-w-xl text-lg leading-8 text-muted">
          The page may have moved, or the route may no longer be available.
        </p>
        <div className="mt-10 flex flex-wrap gap-6">
          <Link
            href="/"
            className="bg-accent px-5 py-3 text-sm font-semibold text-background transition-colors hover:bg-accent-soft focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
          >
            Return home
          </Link>
          <Link
            href="/projects"
            className="border-b border-line py-3 text-sm font-semibold text-foreground transition-colors hover:border-accent hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
          >
            Browse projects →
          </Link>
        </div>
      </Container>
    </main>
  );
}
