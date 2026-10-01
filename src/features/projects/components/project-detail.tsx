import Image from "next/image";
import Link from "next/link";

import { Container } from "@/components/ui/container";
import type { Locale } from "@/i18n/config";
import { siteCopy } from "@/i18n/copy";

import { getLocalizedProject } from "../data/get-project";
import { projects } from "../data/project";
import type { PortfolioProject } from "../types/project";
import { ProjectVisual } from "./project-visual";

interface ProjectDetailProps {
  project: PortfolioProject;
  locale: Locale;
}

export function ProjectDetail({ project, locale }: ProjectDetailProps) {
  const content = getLocalizedProject(project, locale);
  const copy = siteCopy[locale].caseStudy;
  const localeRoot = locale === "es" ? "/es" : "";
  const publishedProjects = projects.filter((item) => item.status === "published");
  const currentIndex = publishedProjects.findIndex((item) => item.slug === project.slug);
  const nextProject = publishedProjects[(currentIndex + 1) % publishedProjects.length];
  const nextContent = getLocalizedProject(nextProject, locale);
  const repositoryUrl = project.privateSource ? undefined : project.repositoryUrl;
  const improvementsIndex = content.screenshots?.length ? "07" : "06";

  return (
    <main id="main-content" lang={locale}>
      <article>
        <header className="relative overflow-hidden pb-20 pt-12 sm:pb-28 sm:pt-16">
          <div className="technical-grid pointer-events-none absolute inset-0" />
          <Container className="relative">
            <Link
              href={`${localeRoot}/projects`}
              className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.12em] text-muted transition-colors hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
            >
              <span aria-hidden="true">←</span> {copy.backToProjects}
            </Link>

            <div className="mt-16 grid gap-10 lg:grid-cols-[minmax(0,1.3fr)_minmax(18rem,0.7fr)] lg:items-end">
              <div>
                <p className="font-mono text-xs uppercase tracking-[0.18em] text-accent">
                  {copy.eyebrow} / {content.subtitle}
                </p>
                <h1 className="mt-6 max-w-5xl text-5xl font-semibold leading-[0.95] tracking-[-0.055em] text-foreground sm:text-7xl lg:text-8xl">
                  {content.name}
                </h1>
                <p className="mt-7 max-w-3xl text-lg leading-8 text-muted sm:text-xl sm:leading-9">
                  {content.description}
                </p>
              </div>

              <aside className="border-t border-line pt-5 lg:mb-1" aria-label="Project information">
                <p className="font-mono text-[0.62rem] uppercase tracking-[0.14em] text-muted">
                  {copy.stack}
                </p>
                <ul className="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-sm text-foreground/80">
                  {content.technologies.map((technology) => (
                    <li key={technology} className="before:mr-1.5 before:text-accent before:content-['+']">
                      {technology}
                    </li>
                  ))}
                </ul>

                {project.privateSource && (
                  <p className="mt-6 border-l border-accent/50 pl-4 text-xs leading-6 text-muted">
                    {copy.privateNotice}
                  </p>
                )}

                {(repositoryUrl || project.liveUrl || project.demoSlug) && (
                  <div className="mt-6 flex flex-wrap gap-5">
                    {project.demoSlug && (
                      <Link
                        href={`${localeRoot}/demos/${project.demoSlug}`}
                        className="border-b border-accent pb-1 text-sm font-semibold text-accent transition-colors hover:border-accent-soft hover:text-accent-soft focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
                      >
                        {copy.demo} →
                      </Link>
                    )}
                    {repositoryUrl && (
                      <ExternalLink href={repositoryUrl}>{copy.repository}</ExternalLink>
                    )}
                    {project.liveUrl && (
                      <ExternalLink href={project.liveUrl}>{copy.live}</ExternalLink>
                    )}
                  </div>
                )}
              </aside>
            </div>

            <div className="mt-16 sm:mt-20">
              <ProjectVisual project={project} large />
            </div>
          </Container>
        </header>

        {content.overview && (
          <NarrativeSection index="01" title={copy.introduction} body={content.overview} />
        )}

        {(content.problem || content.solution || content.role) && (
          <section className="section-rule py-20 sm:py-28">
            <Container>
              <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)]">
                <h2 className="font-mono text-xs uppercase tracking-[0.18em] text-muted">
                  <span className="mr-3 text-accent">02</span>
                  {copy.context}
                </h2>
                <div className="border-t border-line">
                  {content.problem && (
                    <CaseStudyRow title={copy.problem} body={content.problem} />
                  )}
                  {content.solution && (
                    <CaseStudyRow title={copy.solution} body={content.solution} />
                  )}
                  {content.role && <CaseStudyRow title={copy.role} body={content.role} />}
                </div>
              </div>
            </Container>
          </section>
        )}

        {content.architecture && (
          <section className="section-rule py-20 sm:py-28">
            <Container>
              <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)]">
                <div>
                  <h2 className="font-mono text-xs uppercase tracking-[0.18em] text-muted">
                    <span className="mr-3 text-accent">03</span>
                    {copy.architecture}
                  </h2>
                </div>
                <div>
                  <p className="max-w-3xl text-xl leading-9 text-foreground/90">
                    {content.architecture}
                  </p>
                  <ArchitectureDiagram
                    project={project}
                    labels={{
                      requestFlow: copy.requestFlow,
                      systemBoundary: copy.systemBoundary,
                      interface: copy.interface,
                      serviceLayer: copy.serviceLayer,
                      dataSystems: copy.dataSystems,
                    }}
                  />
                </div>
              </div>
            </Container>
          </section>
        )}

        {content.highlights && content.highlights.length > 0 && (
          <ProjectSectionList
            index="04"
            title={copy.highlights}
            sections={content.highlights}
          />
        )}

        {content.challenges && content.challenges.length > 0 && (
          <ProjectSectionList
            index="05"
            title={copy.challenges}
            sections={content.challenges}
          />
        )}

        {content.screenshots && content.screenshots.length > 0 && (
          <section className="section-rule py-20 sm:py-28">
            <Container>
              <h2 className="font-mono text-xs uppercase tracking-[0.18em] text-muted">
                <span className="mr-3 text-accent">06</span>
                {copy.screenshots}
              </h2>
              <div className="mt-12 grid gap-8">
                {content.screenshots.map((screenshot) => (
                  <figure key={screenshot.src}>
                    <Image
                      src={screenshot.src}
                      alt={screenshot.alt}
                      width={1600}
                      height={900}
                      className="h-auto w-full border border-line"
                    />
                    {screenshot.caption && (
                      <figcaption className="mt-3 font-mono text-xs leading-5 text-muted">
                        {screenshot.caption}
                      </figcaption>
                    )}
                  </figure>
                ))}
              </div>
            </Container>
          </section>
        )}

        {content.improvements && content.improvements.length > 0 && (
          <section className="section-rule py-20 sm:py-28">
            <Container>
              <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)]">
                <h2 className="font-mono text-xs uppercase tracking-[0.18em] text-muted">
                  <span className="mr-3 text-accent">{improvementsIndex}</span>
                  {copy.improvements}
                </h2>
                <ol className="border-t border-line">
                  {content.improvements.map((improvement, index) => (
                    <li
                      key={improvement}
                      className="grid grid-cols-[2.5rem_1fr] gap-4 border-b border-line py-5 text-sm leading-7 text-foreground/85 sm:text-base"
                    >
                      <span className="font-mono text-xs text-accent">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      {improvement}
                    </li>
                  ))}
                </ol>
              </div>
            </Container>
          </section>
        )}

        {nextProject && nextProject.slug !== project.slug && (
          <footer className="section-rule py-16 sm:py-20">
            <Container>
              <Link
                href={`${localeRoot}/projects/${nextProject.slug}`}
                className="group block focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
              >
                <span className="font-mono text-xs uppercase tracking-[0.16em] text-muted">
                  {copy.nextProject}
                </span>
                <span className="mt-5 flex items-center justify-between gap-6 text-3xl font-semibold tracking-[-0.035em] text-foreground transition-colors group-hover:text-accent sm:text-5xl">
                  {nextContent.name}
                  <span aria-hidden="true" className="transition-transform group-hover:translate-x-2">→</span>
                </span>
              </Link>
            </Container>
          </footer>
        )}
      </article>
    </main>
  );
}

function NarrativeSection({ index, title, body }: { index: string; title: string; body: string }) {
  return (
    <section className="section-rule py-20 sm:py-28">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)]">
          <h2 className="font-mono text-xs uppercase tracking-[0.18em] text-muted">
            <span className="mr-3 text-accent">{index}</span>
            {title}
          </h2>
          <p className="max-w-3xl text-xl leading-9 text-foreground/90 sm:text-2xl sm:leading-10">
            {body}
          </p>
        </div>
      </Container>
    </section>
  );
}

function CaseStudyRow({ title, body }: { title: string; body: string }) {
  return (
    <div className="grid gap-4 border-b border-line py-7 md:grid-cols-[10rem_1fr] md:gap-8">
      <h3 className="font-mono text-xs uppercase tracking-[0.14em] text-accent">{title}</h3>
      <p className="max-w-2xl leading-8 text-foreground/85">{body}</p>
    </div>
  );
}

function ProjectSectionList({
  index,
  title,
  sections,
}: {
  index: string;
  title: string;
  sections: Array<{ title: string; body: string }>;
}) {
  return (
    <section className="section-rule py-20 sm:py-28">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)]">
          <h2 className="font-mono text-xs uppercase tracking-[0.18em] text-muted">
            <span className="mr-3 text-accent">{index}</span>
            {title}
          </h2>
          <div className="border-t border-line">
            {sections.map((section, sectionIndex) => (
              <article
                key={section.title}
                className="grid gap-4 border-b border-line py-7 md:grid-cols-[2rem_minmax(10rem,0.7fr)_minmax(0,1.3fr)] md:gap-6"
              >
                <span className="font-mono text-xs text-accent">
                  {String(sectionIndex + 1).padStart(2, "0")}
                </span>
                <h3 className="font-semibold text-foreground">{section.title}</h3>
                <p className="text-sm leading-7 text-muted">{section.body}</p>
              </article>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}

function ArchitectureDiagram({
  project,
  labels,
}: {
  project: PortfolioProject;
  labels: {
    requestFlow: string;
    systemBoundary: string;
    interface: string;
    serviceLayer: string;
    dataSystems: string;
  };
}) {
  const frontend = project.technologies.find((item) => item === "Angular" || item === "React") ?? "Client";
  const api = project.technologies.includes(".NET") ? ".NET API" : "Node API";
  const data = project.technologies.find((item) => ["SAP HANA", "SQL Server", "MongoDB"].includes(item)) ?? "Data";

  return (
    <div className="mt-10 border border-line bg-surface p-5 sm:p-8">
      <div className="flex items-center justify-between font-mono text-[0.6rem] uppercase tracking-[0.14em] text-muted">
        <span>{labels.requestFlow}</span>
        <span className="text-accent">{labels.systemBoundary}</span>
      </div>
      <div className="mt-8 grid items-center gap-3 sm:grid-cols-[1fr_auto_1fr_auto_1fr]">
        <ArchitectureNode label={labels.interface} value={frontend} />
        <FlowArrow />
        <ArchitectureNode label={labels.serviceLayer} value={api} active />
        <FlowArrow />
        <ArchitectureNode label={labels.dataSystems} value={data} />
      </div>
    </div>
  );
}

function ArchitectureNode({ label, value, active = false }: { label: string; value: string; active?: boolean }) {
  return (
    <div className={`min-h-24 border p-4 ${active ? "border-accent/60 bg-accent/[0.04]" : "border-line bg-background"}`}>
      <span className="font-mono text-[0.58rem] uppercase tracking-[0.12em] text-muted">{label}</span>
      <strong className={`mt-5 block text-sm font-semibold ${active ? "text-accent" : "text-foreground"}`}>
        {value}
      </strong>
    </div>
  );
}

function FlowArrow() {
  return <span aria-hidden="true" className="rotate-90 text-center font-mono text-accent sm:rotate-0">→</span>;
}

function ExternalLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="border-b border-line pb-1 text-sm font-semibold text-foreground transition-colors hover:border-accent hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
    >
      {children} ↗
    </a>
  );
}
