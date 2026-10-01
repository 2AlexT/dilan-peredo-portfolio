import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ProjectDetail } from "@/features/projects/components/project-detail";
import {
  getLocalizedProject,
  getProjectBySlug,
} from "@/features/projects/data/get-project";
import { projects } from "@/features/projects/data/project";

interface SpanishProjectPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export function generateStaticParams() {
  return projects
    .filter((project) => project.status === "published")
    .map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: SpanishProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project || project.status !== "published") {
    return {};
  }

  const content = getLocalizedProject(project, "es");

  return {
    title: content.name,
    description: content.description,
  };
}

export default async function SpanishProjectPage({
  params,
}: SpanishProjectPageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project || project.status !== "published") {
    notFound();
  }

  return <ProjectDetail project={project} locale="es" />;
}

