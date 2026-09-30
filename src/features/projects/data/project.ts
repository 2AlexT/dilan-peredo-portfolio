import type { PortfolioProject } from "../types/project";

export const projects: PortfolioProject[] = [
  {
    slug: "sap-operations-platform",
    name: "SAP Operations Platform",
    subtitle: "Enterprise Operations & Analytics",
    description:
      "Enterprise platform integrating business operations with SAP HANA, SAP Business One and internal systems.",
    technologies: [
      "Angular",
      "TypeScript",
      "Node.js",
      "Express",
      "SAP HANA",
      "SQL Server",
    ],
    status: "published",
    privateSource: true,
    featured: true,
  },

  {
    slug: "zazu-platform",
    name: "ZAZU Platform",
    subtitle: "Business Automation Platform",
    description:
      "Customer operations and automation platform combining CRM functionality, analytics and WhatsApp workflows.",
    technologies: [
      "React",
      "Node.js",
      "Express",
      "MongoDB",
      "WhatsApp",
    ],
    status: "published",
    privateSource: true,
    featured: true,
  },

  {
    slug: "frigor-erp",
    name: "FrigorERP",
    subtitle: "Enterprise Procurement Platform",
    description:
      "Procurement and enterprise operations platform focused on workflows, approvals and business process automation.",
    technologies: [
      ".NET",
      "Angular",
      "SQL Server",
    ],
    status: "coming-soon",
    privateSource: true,
    featured: true,
  },
];