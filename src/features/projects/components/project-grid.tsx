
import { projects } from "../data/project";
import { ProjectCard } from "./project-card";

export function ProjectGrid() {
  const featuredProjects = projects.filter(
    (project) => project.featured,
  );

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      {featuredProjects.map((project) => (
        <ProjectCard
          key={project.slug}
          project={project}
        />
      ))}
    </div>
  );
}