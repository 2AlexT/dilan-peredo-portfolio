import { projects } from "./project";
import type { Locale } from "@/i18n/config";
import type {
  PortfolioProject,
  ProjectTranslation,
} from "../types/project";

export function getProjectBySlug(slug: string) {
  return projects.find((project) => project.slug === slug);
}

export function getLocalizedProject(
  project: PortfolioProject,
  locale: Locale,
): PortfolioProject & ProjectTranslation {
  const translation = locale === "en"
    ? undefined
    : project.translations?.[locale];

  return {
    ...project,
    ...translation,
  };
}
