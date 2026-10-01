import type { Metadata } from "next";

import { ProjectsPageContent } from "@/components/pages/projects-page";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Selected software engineering case studies across enterprise systems, automation, integrations and application architecture.",
};

export default function ProjectsPage() {
  return <ProjectsPageContent locale="en" />;
}
