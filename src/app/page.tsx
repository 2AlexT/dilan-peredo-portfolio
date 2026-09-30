import { Container } from "@/components/ui/container";
import { ProjectGrid } from "@/features/projects/components/project-grid";

export default function Home() {
  return (
    <main>
      <section className="py-28 lg:py-40">
        <Container>
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-zinc-500">
            Software Engineer
          </p>

          <h1 className="mt-6 max-w-4xl text-5xl font-semibold tracking-tight text-white sm:text-6xl lg:text-7xl">
            I build business systems across backend,
            frontend and enterprise integrations.
          </h1>

          <p className="mt-8 max-w-2xl text-lg leading-8 text-zinc-400">
            Full Stack Software Engineer working with
            .NET, TypeScript, Angular, React and modern
            software architecture.
          </p>

          <div className="mt-10 flex gap-4">
            <a
              href="#projects"
              className="rounded-lg bg-white px-5 py-3 text-sm font-medium text-black"
            >
              View projects
            </a>

            <a
              href="https://github.com/2AlexT"
              target="_blank"
              rel="noreferrer"
              className="rounded-lg border border-zinc-700 px-5 py-3 text-sm font-medium text-white"
            >
              GitHub
            </a>
          </div>
        </Container>
      </section>

      <section
        id="projects"
        className="border-t border-zinc-900 py-24"
      >
        <Container>
          <div className="mb-12">
            <p className="text-sm uppercase tracking-[0.2em] text-zinc-500">
              Selected Work
            </p>

            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white">
              Engineering projects
            </h2>
          </div>

          <ProjectGrid />
        </Container>
      </section>

      <section
        id="about"
        className="border-t border-zinc-900 py-24"
      >
        <Container>
          <div className="max-w-3xl">
            <p className="text-sm uppercase tracking-[0.2em] text-zinc-500">
              About
            </p>

            <h2 className="mt-3 text-3xl font-semibold text-white">
              Building software beyond CRUD.
            </h2>

            <p className="mt-6 text-lg leading-8 text-zinc-400">
              I focus on building maintainable business
              applications, integrating real operational
              systems and improving how complex workflows
              are modeled in software.
            </p>
          </div>
        </Container>
      </section>

      <section
        id="contact"
        className="border-t border-zinc-900 py-24"
      >
        <Container>
          <p className="text-sm uppercase tracking-[0.2em] text-zinc-500">
            Contact
          </p>

          <h2 className="mt-3 text-3xl font-semibold text-white">
            Let&apos;s build something useful.
          </h2>
        </Container>
      </section>
    </main>
  );
}