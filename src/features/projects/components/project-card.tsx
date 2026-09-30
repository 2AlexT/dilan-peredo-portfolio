import Link from "next/link";

import type { PortfolioProject } from "../types/project";

interface ProjectCardProps {
  project: PortfolioProject;
}

export function ProjectCard({
  project,
}: ProjectCardProps) {
  const isAvailable = project.status === "published";

  return (
    <article className="group rounded-2xl border border-zinc-800 bg-zinc-950 p-6 transition hover:border-zinc-700">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm text-zinc-500">
            {project.subtitle}
          </p>

          <h3 className="mt-2 text-2xl font-semibold tracking-tight text-white">
            {project.name}
          </h3>
        </div>

        {project.privateSource && (
          <span className="rounded-full border border-zinc-700 px-3 py-1 text-xs text-zinc-400">
            Private source
          </span>
        )}
      </div>

      <p className="mt-4 leading-7 text-zinc-400">
        {project.description}
      </p>

      <div className="mt-6 flex flex-wrap gap-2">
        {project.technologies.map((technology) => (
          <span
            key={technology}
            className="rounded-md bg-zinc-900 px-3 py-1 text-sm text-zinc-300"
          >
            {technology}
          </span>
        ))}
      </div>

      <div className="mt-8">
        {isAvailable ? (
          <Link
            href={`/projects/${project.slug}`}
            className="text-sm font-medium text-white"
          >
            View case study →
          </Link>
        ) : (
          <span className="text-sm text-zinc-600">
            Case study coming soon
          </span>
        )}
      </div>
    </article>
  );
}