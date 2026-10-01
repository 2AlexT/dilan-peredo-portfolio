
import type { Locale } from "@/i18n/config";

import { projects } from "../data/project";
import { ProjectCard } from "./project-card";

interface ProjectGridProps {
  locale: Locale;
}

export function ProjectGrid({ locale }: ProjectGridProps) {
  const featuredProjects = projects.filter(
    (project) => project.featured,
  );

  return (
    <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
      {featuredProjects.map((project, index) => (
        <ProjectCard
          key={project.slug}
          project={project}
          locale={locale}
          index={index + 1}
        />
      ))}
    </div>
  );
}
