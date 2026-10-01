import { Container } from "@/components/ui/container";
import { ProjectGrid } from "@/features/projects/components/project-grid";
import type { Locale } from "@/i18n/config";
import { siteCopy } from "@/i18n/copy";

interface ProjectsPageContentProps {
  locale: Locale;
}

export function ProjectsPageContent({ locale }: ProjectsPageContentProps) {
  const copy = siteCopy[locale].projects;

  return (
    <main id="main-content" lang={locale}>
      <section className="relative overflow-hidden py-20 sm:py-28 lg:py-36">
        <div className="technical-grid pointer-events-none absolute inset-0" />
        <Container className="relative">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)]">
            <p className="font-mono text-xs uppercase tracking-[0.18em] text-accent">
              01 / {copy.eyebrow}
            </p>
            <div>
              <h1 className="max-w-5xl text-5xl font-semibold leading-[0.98] tracking-[-0.05em] text-foreground sm:text-7xl lg:text-8xl">
                {copy.title}
              </h1>
              <p className="mt-7 max-w-2xl text-lg leading-8 text-muted">
                {copy.introduction}
              </p>
            </div>
          </div>
        </Container>
      </section>

      <section className="section-rule pb-20 sm:pb-28">
        <Container>
          <ProjectGrid locale={locale} />
        </Container>
      </section>
    </main>
  );
}

