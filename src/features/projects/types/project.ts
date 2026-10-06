import type { Locale } from "@/i18n/config";

export type ProjectStatus = "published" | "coming-soon";

export interface PortfolioProject {
  slug: string;

  name: string;
  subtitle: string;
  description: string;

  technologies: string[];

  status: ProjectStatus;

  privateSource: boolean;

  featured: boolean;

  repositoryUrl?: string;
  liveUrl?: string;
  demoSlug?: string;
  demoLinks?: ProjectDemoLink[];
  overview?: string;
  problem?: string;
  solution?: string;
  role?: string;
  architecture?: string;
  highlights?: ProjectSection[];
  challenges?: ProjectSection[];
  coverImage?: ProjectImage;
  screenshots?: ProjectImage[];
  improvements?: string[];
  translations?: Partial<
    Record<Exclude<Locale, "en">, ProjectTranslation>
  >;
}

export interface ProjectSection {
  title: string;
  body: string;
}

export interface ProjectDemoLink {
  slug: string;
  label: string;
  description: string;
}

export interface ProjectImage {
  src: string;
  alt: string;
  caption?: string;
}

export interface ProjectTranslation {
  name: string;
  subtitle: string;
  description: string;
  demoLinks?: ProjectDemoLink[];
  overview?: string;
  problem?: string;
  solution?: string;
  role?: string;
  architecture?: string;
  highlights?: ProjectSection[];
  challenges?: ProjectSection[];
  coverImage?: ProjectImage;
  screenshots?: ProjectImage[];
  improvements?: string[];
}
