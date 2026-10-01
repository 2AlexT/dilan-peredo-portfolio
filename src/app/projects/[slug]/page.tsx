import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ProjectDetail } from "@/features/projects/components/project-detail";
import { getProjectBySlug } from "@/features/projects/data/get-project";
import { projects } from "@/features/projects/data/project";

interface ProjectPageProps {
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
}: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project || project.status !== "published") {
    return {};
  }

  return {
    title: project.name,
    description: project.description,
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project || project.status !== "published") {
    notFound();
  }

  return <ProjectDetail project={project} locale="en" />;
}

