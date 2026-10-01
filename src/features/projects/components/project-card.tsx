import Link from "next/link";

import type { Locale } from "@/i18n/config";
import { siteCopy } from "@/i18n/copy";

import { getLocalizedProject } from "../data/get-project";
import type { PortfolioProject } from "../types/project";
import { ProjectVisual } from "./project-visual";

interface ProjectCardProps {
  project: PortfolioProject;
  locale: Locale;
  index: number;
}

export function ProjectCard({
  project,
  locale,
  index,
}: ProjectCardProps) {
  const isAvailable = project.status === "published";
  const content = getLocalizedProject(project, locale);
  const copy = siteCopy[locale].projects;
  const localeRoot = locale === "es" ? "/es" : "";

  const cardContent = (
    <>
      <ProjectVisual project={project} />

      <div className="flex flex-1 flex-col p-6 sm:p-7">
        <div className="flex items-center justify-between gap-4 font-mono text-[0.62rem] uppercase tracking-[0.14em] text-muted">
          <span className="text-accent">{String(index).padStart(2, "0")}</span>
          <span>{content.subtitle}</span>
        </div>

        <h3 className="mt-7 text-3xl font-semibold leading-tight tracking-[-0.04em] text-foreground">
          {content.name}
        </h3>
        <p className="mt-4 text-sm leading-7 text-muted">
          {content.description}
        </p>

        <ul className="mt-7 flex flex-wrap gap-x-4 gap-y-2 font-mono text-[0.62rem] uppercase tracking-[0.08em] text-foreground/70">
          {project.technologies.slice(0, 4).map((technology) => (
            <li key={technology} className="before:mr-1.5 before:text-accent before:content-['+']">
              {technology}
            </li>
          ))}
        </ul>

        <div className="mt-auto flex items-end justify-between gap-4 pt-9">
          <span className="font-mono text-[0.62rem] uppercase tracking-[0.12em] text-muted">
            {project.privateSource ? copy.privateSource : copy.technologyLabel}
          </span>
          <span className="flex size-10 items-center justify-center border border-line text-lg text-foreground transition-all duration-300 group-hover:border-accent group-hover:bg-accent group-hover:text-background group-focus-visible:border-accent group-focus-visible:bg-accent group-focus-visible:text-background">
            <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-0.5">
              ↗
            </span>
          </span>
        </div>
      </div>
    </>
  );

  return (
    <article className="min-w-0">
      {isAvailable ? (
          <Link
            href={`${localeRoot}/projects/${project.slug}`}
            aria-label={`${copy.viewCaseStudy}: ${content.name}`}
            className="group flex h-full flex-col overflow-hidden border border-line bg-surface transition-[border-color,background-color,transform,box-shadow] duration-300 hover:-translate-y-1 hover:border-foreground/30 hover:bg-surface-strong hover:shadow-[0_18px_50px_rgba(0,0,0,0.28)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
          >
            {cardContent}
          </Link>
        ) : (
          <div className="flex h-full flex-col overflow-hidden border border-line bg-surface opacity-70">
            {cardContent}
            <span className="sr-only">{copy.comingSoon}</span>
          </div>
        )}
    </article>
  );
}
