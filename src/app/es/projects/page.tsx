import type { Metadata } from "next";

import { ProjectsPageContent } from "@/components/pages/projects-page";

export const metadata: Metadata = {
  title: "Proyectos",
  description:
    "Proyectos seleccionados de ingeniería de software, sistemas empresariales, automatización e integraciones.",
};

export default function SpanishProjectsPage() {
  return <ProjectsPageContent locale="es" />;
}

