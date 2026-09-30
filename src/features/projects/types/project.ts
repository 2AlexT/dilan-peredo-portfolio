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
}