import type { PortfolioProject } from "../types/project";
import { zazuProject } from "./zazu-project";

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
      "SAP Business One",
      "SQL Server",
    ],

    status: "published",
    privateSource: true,
    featured: true,
    demoSlug: "sap",
    coverImage: {
      src: "/project-media/sap/demo-cover.jpg",
      alt: "SAP portfolio demo showing the backoffice navigation, sales and collection indicators, monthly chart, and branch breakdown with fictional data",
      caption: "Interactive demo · Fictional data",
    },

    overview:
      "A large internal business platform supporting operational areas such as sales, inventory, accounting, collections, finance, invoicing, planning and master data while integrating directly with SAP systems.",

    problem:
      "Operational work was distributed across interconnected business areas and data sources. Teams needed one dependable interface for completing workflows and understanding information held across SAP and internal systems.",

    solution:
      "A modular web platform brought operational workflows, reporting and data access into a consistent experience, backed by APIs that coordinate SAP HANA, SAP Business One and SQL Server integrations.",

    role:
      "Full Stack development across frontend modules, backend APIs, business workflows and enterprise integrations.",

    architecture:
      "Angular frontend communicating with a Node.js and Express API that integrates SAP HANA, SAP Business One Service Layer, SQL Server and other internal services.",

    highlights: [
      {
        title: "Domain-led modules",
        body:
          "Interfaces and backend capabilities were organized around operational areas, helping a broad platform remain navigable as its business scope grew.",
      },
      {
        title: "Integration boundary",
        body:
          "The API layer coordinated different enterprise data sources and exposed workflow-oriented capabilities to the frontend instead of leaking source-system complexity.",
      },
      {
        title: "Operational outputs",
        body:
          "Reporting, exports, documents and QR-based flows were treated as first-class parts of the operation rather than secondary dashboard features.",
      },
    ],

    challenges: [
      {
        title: "Enterprise integration",
        body:
          "The platform needed to coordinate business workflows across SAP HANA, SAP Business One and other internal data sources while maintaining usable interfaces for operational teams.",
      },
      {
        title: "Large business domain",
        body:
          "The application spans sales, accounting, collections, inventory, finance, invoicing, planning and additional operational areas, requiring clear separation between business modules.",
      },
      {
        title: "Reporting and operational tooling",
        body:
          "The system generates operational tables, Excel exports, PDFs, QR-based flows and analytical visualizations for different business roles.",
      },
    ],

    screenshots: [{
      src: "/project-media/sap/demo-overview.png",
      alt: "Portfolio backoffice demonstration with fictional sales metrics, monthly charts and branch summaries",
      caption: "A separate five-screen portfolio demo using fictional records. Original SAP integrations and private source remain outside the public demonstration.",
    }],

    improvements: [
      "Reduce controller size and move business logic into dedicated services.",
      "Introduce stronger automated testing.",
      "Strengthen module boundaries.",
      "Improve API contracts and documentation.",
      "Introduce more consistent error handling.",
      "Containerize local development and deployment.",
    ],

    translations: {
      es: {
        name: "Plataforma de Operaciones SAP",
        coverImage: {
          src: "/project-media/sap/demo-cover.jpg",
          alt: "Demo de operaciones SAP con navegación de backoffice, indicadores de ventas y cobranzas, gráfico mensual y distribución por sucursal con datos ficticios",
          caption: "Demo interactiva · Datos ficticios",
        },
        subtitle: "Operaciones y analítica empresarial",
        description:
          "Plataforma empresarial que integra operaciones de negocio con SAP HANA, SAP Business One y sistemas internos.",
        overview:
          "Una amplia plataforma interna que apoya áreas operativas como ventas, inventario, contabilidad, cobranzas, finanzas, facturación, planificación y datos maestros, con integración directa a sistemas SAP.",
        problem:
          "El trabajo operativo estaba distribuido entre áreas de negocio y fuentes de datos conectadas. Los equipos necesitaban una interfaz confiable para completar flujos y comprender la información almacenada entre SAP y sistemas internos.",
        solution:
          "Una plataforma web modular unificó flujos operativos, reportes y acceso a datos en una experiencia consistente, respaldada por APIs que coordinan integraciones con SAP HANA, SAP Business One y SQL Server.",
        role:
          "Desarrollo Full Stack de módulos frontend, APIs backend, flujos de negocio e integraciones empresariales.",
        architecture:
          "Frontend en Angular conectado a una API de Node.js y Express que integra SAP HANA, SAP Business One Service Layer, SQL Server y otros servicios internos.",
        highlights: [
          {
            title: "Módulos guiados por el dominio",
            body:
              "Las interfaces y capacidades backend se organizaron alrededor de áreas operativas, ayudando a mantener navegable una plataforma cuyo alcance de negocio continuó creciendo.",
          },
          {
            title: "Límite de integración",
            body:
              "La capa de API coordinó distintas fuentes empresariales y expuso capacidades orientadas a flujos, evitando trasladar la complejidad de los sistemas fuente al frontend.",
          },
          {
            title: "Resultados operativos",
            body:
              "Los reportes, exportaciones, documentos y flujos con QR se trataron como partes centrales de la operación y no como funciones secundarias del panel.",
          },
        ],
        challenges: [
          {
            title: "Integración empresarial",
            body:
              "La plataforma debía coordinar flujos de negocio entre SAP HANA, SAP Business One y otras fuentes de datos internas, manteniendo interfaces prácticas para los equipos operativos.",
          },
          {
            title: "Dominio de negocio amplio",
            body:
              "La aplicación abarca ventas, contabilidad, cobranzas, inventario, finanzas, facturación, planificación y otras áreas operativas, lo que exige una separación clara entre módulos de negocio.",
          },
          {
            title: "Reportes y herramientas operativas",
            body:
              "El sistema genera tablas operativas, exportaciones a Excel, archivos PDF, flujos basados en códigos QR y visualizaciones analíticas para distintos roles empresariales.",
          },
        ],
        screenshots: [{
          src: "/project-media/sap/demo-overview.png",
          alt: "Demo de backoffice con indicadores ficticios de ventas, gráficos mensuales y resumen por sucursal",
          caption: "Demo independiente de cinco pantallas con datos ficticios. Las integraciones SAP originales y el código privado quedan fuera de la demostración pública.",
        }],

        improvements: [
          "Reducir el tamaño de los controladores y mover la lógica de negocio a servicios dedicados.",
          "Incorporar pruebas automatizadas más sólidas.",
          "Fortalecer los límites entre módulos.",
          "Mejorar los contratos y la documentación de las APIs.",
          "Unificar el manejo de errores.",
          "Contenerizar los entornos de desarrollo local y despliegue.",
        ],
      },
    },
  },

  zazuProject,

  {
    slug: "comprasya",
    name: "ComprasYa",
    subtitle: "Procurement & Approval Platform",
    description:
      "An enterprise procurement system that coordinates requisitions, approvals, purchase orders, inventory and supplier workflows across multiple operational roles.",

    technologies: [
      "Angular 20",
      "TypeScript",
      ".NET 9",
      "Entity Framework Core",
      "SQL Server",
      "JWT",
    ],

    status: "published",
    privateSource: true,
    featured: true,
    demoSlug: "comprasya",
    coverImage: {
      src: "/project-media/comprasya/dashboard-analyst-sanitized.png",
      alt: "Original ComprasYa Angular purchasing analyst dashboard with purchase-order indicators, anonymized sample supplier names and a request trend chart",
      caption: "Original frontend · Anonymized capture",
    },

    overview:
      "ComprasYa is a procurement and approval platform developed for Frigor. It connects the lifecycle of a purchase—from an employee request and multi-step approval through purchase-order processing and warehouse follow-up—inside one role-aware system.",

    problem:
      "Procurement crosses departments, approvers, purchasing analysts, supervisors and warehouse teams. Disconnected tools make it difficult to preserve context, enforce the correct approval path and maintain an auditable history as a request changes.",

    solution:
      "The platform gives each role a focused workspace while maintaining one shared workflow. Configurable approval paths, versioned requests, purchase-order processing, inventory handoffs and administrative catalogs keep the operation connected without flattening its business rules.",

    role:
      "Full-stack engineering across the Angular application, .NET APIs, domain model, role-based access, approval workflows, reporting and operational integrations.",

    architecture:
      "An Angular 20 frontend uses lazy-loaded feature areas and role-based route guards. It communicates with a layered .NET 9 API split into API, Application, Domain and Infrastructure projects, with Entity Framework Core and SQL Server for persistence, JWT for authentication, and background services for documents, notifications and scheduled work.",

    highlights: [
      {
        title: "Versioned procurement workflows",
        body:
          "Purchase requests and approval flows preserve their history rather than being overwritten, keeping decisions traceable as requirements and approvers change.",
      },
      {
        title: "Role-specific workspaces",
        body:
          "Requesters, approvers, purchasing analysts, supervisors, administrators and warehouse roles receive focused navigation and permissions around the same operational process.",
      },
      {
        title: "End-to-end operational coverage",
        body:
          "The system connects requisitions, comparisons, purchase orders, supplier records, inventory requests, exports and documents instead of treating each as an isolated screen.",
      },
    ],

    challenges: [
      {
        title: "State across a long-running process",
        body:
          "A request can move through revisions, multiple approval steps and purchasing actions. The design needed explicit states and transactions so partial operations would not leave the workflow inconsistent.",
      },
      {
        title: "Authorization beyond simple roles",
        body:
          "Access depends on both a user's role and the workflow stage. Route guards, API policies and domain validation work together so the interface is helpful without becoming the security boundary.",
      },
      {
        title: "Auditability without losing usability",
        body:
          "Soft deletion, interaction history and created/updated metadata preserve operational evidence while role-focused screens keep that complexity from overwhelming daily users.",
      },
    ],

    screenshots: [
      {
        src: "/project-media/comprasya/dashboard-analyst-sanitized.png",
        alt: "ComprasYa purchasing analyst dashboard with procurement indicators and supplier activity",
        caption:
          "The purchasing workspace turns requisitions, pending decisions and supplier activity into a focused operational queue.",
      },
      {
        src: "/project-media/comprasya/new-request-sanitized.png",
        alt: "ComprasYa form for creating a new purchase request",
        caption:
          "A structured request flow captures the business context and line items needed by downstream approvers and buyers.",
      },
      {
        src: "/project-media/comprasya/approval-flow-sanitized.png",
        alt: "ComprasYa approval detail showing the request and its multi-step approval flow",
        caption:
          "Approvers see the request, supporting context and current workflow state together before recording a decision.",
      },
      {
        src: "/project-media/comprasya/warehouse-requests-sanitized.png",
        alt: "ComprasYa warehouse view listing purchase requests and fulfillment status",
        caption:
          "Warehouse teams receive a role-specific view for tracking requests as procurement moves into fulfillment.",
      },
    ],

    improvements: [
      "Add broader unit, integration and end-to-end coverage around approval-state transitions.",
      "Move deployment artifacts out of source control and standardize release packaging.",
      "Strengthen secret and environment configuration for repeatable deployments.",
      "Add containerized demo infrastructure with seeded, fully fictional data.",
      "Increase observability around background jobs and external integrations.",
    ],

    translations: {
      es: {
        name: "ComprasYa",
        subtitle: "Plataforma de compras y aprobaciones",
        coverImage: {
          src: "/project-media/comprasya/dashboard-analyst-sanitized.png",
          alt: "Panel original de ComprasYa en Angular para el analista de compras, con indicadores de órdenes, nombres de proveedores de ejemplo anonimizados y gráfico de solicitudes",
          caption: "Frontend original · Captura anonimizada",
        },
        description:
          "Sistema empresarial de adquisiciones que coordina solicitudes, aprobaciones, órdenes de compra, inventario y proveedores entre múltiples roles operativos.",
        overview:
          "ComprasYa es una plataforma de compras y aprobaciones desarrollada para Frigor. Conecta el ciclo de una compra —desde la solicitud y aprobación en varios pasos hasta la orden de compra y el seguimiento de almacén— dentro de un sistema basado en roles.",
        problem:
          "Las compras involucran departamentos, aprobadores, analistas, supervisores y equipos de almacén. Las herramientas desconectadas dificultan conservar el contexto, aplicar el flujo correcto y mantener un historial auditable cuando una solicitud cambia.",
        solution:
          "La plataforma ofrece a cada rol un espacio de trabajo enfocado, manteniendo un flujo compartido. Las rutas de aprobación configurables, solicitudes versionadas, órdenes de compra, entregas a almacén y catálogos administrativos mantienen conectada la operación sin simplificar sus reglas de negocio.",
        role:
          "Ingeniería full-stack de la aplicación Angular, APIs .NET, modelo de dominio, acceso por roles, flujos de aprobación, reportes e integraciones operativas.",
        architecture:
          "Un frontend en Angular 20 utiliza funcionalidades con carga diferida y protección de rutas por rol. Se comunica con una API en .NET 9 separada en proyectos de API, Aplicación, Dominio e Infraestructura, con Entity Framework Core y SQL Server para persistencia, JWT para autenticación y servicios en segundo plano para documentos, notificaciones y tareas programadas.",
        highlights: [
          {
            title: "Flujos de compra versionados",
            body:
              "Las solicitudes y los flujos de aprobación conservan su historial en lugar de sobrescribirse, manteniendo trazables las decisiones cuando cambian los requisitos o aprobadores.",
          },
          {
            title: "Espacios de trabajo por rol",
            body:
              "Solicitantes, aprobadores, analistas, supervisores, administradores y almaceneros reciben navegación y permisos enfocados alrededor del mismo proceso operativo.",
          },
          {
            title: "Cobertura operativa de principio a fin",
            body:
              "El sistema conecta solicitudes, comparativos, órdenes de compra, proveedores, pedidos de inventario, exportaciones y documentos en lugar de tratar cada área como una pantalla aislada.",
          },
        ],
        challenges: [
          {
            title: "Estado en un proceso de larga duración",
            body:
              "Una solicitud puede atravesar revisiones, múltiples aprobaciones y acciones de compra. El diseño necesitó estados y transacciones explícitas para evitar que operaciones parciales dejaran el flujo inconsistente.",
          },
          {
            title: "Autorización más allá de roles simples",
            body:
              "El acceso depende del rol y de la etapa del flujo. Las protecciones de rutas, políticas de API y validaciones de dominio trabajan juntas para que la interfaz sea útil sin convertirse en la barrera de seguridad.",
          },
          {
            title: "Auditoría sin perder usabilidad",
            body:
              "La eliminación lógica, el historial de interacciones y los metadatos preservan evidencia operativa, mientras que las pantallas por rol evitan abrumar al usuario diario.",
          },
        ],
        screenshots: [
          {
            src: "/project-media/comprasya/dashboard-analyst-sanitized.png",
            alt: "Panel del analista de compras de ComprasYa con indicadores y actividad de proveedores",
            caption:
              "El espacio de compras convierte solicitudes, decisiones pendientes y actividad de proveedores en una cola operativa enfocada.",
          },
          {
            src: "/project-media/comprasya/new-request-sanitized.png",
            alt: "Formulario de ComprasYa para crear una nueva solicitud de compra",
            caption:
              "Un flujo estructurado captura el contexto del negocio y los ítems que necesitan los aprobadores y compradores.",
          },
          {
            src: "/project-media/comprasya/approval-flow-sanitized.png",
            alt: "Detalle de aprobación de ComprasYa con la solicitud y su flujo de aprobación",
            caption:
              "Los aprobadores ven la solicitud, el contexto de respaldo y el estado actual del flujo antes de registrar una decisión.",
          },
          {
            src: "/project-media/comprasya/warehouse-requests-sanitized.png",
            alt: "Vista de almacén de ComprasYa con solicitudes de compra y estado de entrega",
            caption:
              "El equipo de almacén recibe una vista específica para seguir las solicitudes cuando compras pasa a la etapa de entrega.",
          },
        ],
        improvements: [
          "Ampliar las pruebas unitarias, de integración y end-to-end alrededor de las transiciones de aprobación.",
          "Separar los artefactos de despliegue del código fuente y estandarizar los paquetes de entrega.",
          "Fortalecer la configuración de secretos y entornos para despliegues repetibles.",
          "Agregar infraestructura contenerizada para la demo con datos completamente ficticios.",
          "Aumentar la observabilidad de tareas en segundo plano e integraciones externas.",
        ],
      },
    },
  },
];
