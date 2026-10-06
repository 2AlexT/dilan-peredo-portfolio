import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import type { Locale } from "@/i18n/config";
import type { ProjectDemoLink } from "../types/project";

export function ZazuSystemScope({ locale, demos }: { locale: Locale; demos: ProjectDemoLink[] }) {
  const es = locale === "es";
  const root = es ? "/es" : "";
  const modules = es ? [
    ["CRM y contactos", "Contexto del cliente, último servicio, etapa y listas de contactos."],
    ["Embudo de conversaciones", "Flujos del bot, historial de interacciones y puntos de seguimiento."],
    ["Agenda y reservas", "Disponibilidad, fecha, hora, detalles e historial de reservas."],
    ["Catálogo del negocio", "Categorías, servicios, productos y precios para el panel y el bot."],
    ["Reportes e intercambio", "Indicadores, filtros por período, exportaciones e importación de Excel."],
    ["Automatización de WhatsApp", "Opciones de menú, estado de conversación y acceso al backend."],
  ] : [
    ["CRM & contacts", "Customer context, last service, conversation stage and contact lists."],
    ["Conversation funnel", "Bot flows, interaction history and follow-up touchpoints."],
    ["Appointments & bookings", "Availability, date, time, booking details and history."],
    ["Business catalog", "Categories, services, products and prices for the workspace and bot."],
    ["Reports & data exchange", "Indicators, period filters, exports and Excel imports."],
    ["WhatsApp automation", "Menu choices, conversation state and backend access."],
  ];
  return <section className="section-rule py-20 sm:py-28">
    <Container>
      <div className="grid gap-10 lg:grid-cols-[1fr_2fr]">
        <div><p className="font-mono text-xs uppercase tracking-[0.18em] text-accent">{es ? "Alcance del sistema" : "System scope"}</p><h2 className="mt-6 text-3xl font-semibold tracking-tight sm:text-4xl">{es ? "Tres aplicaciones. Una operación conectada." : "Three applications. One connected operation."}</h2><p className="mt-5 text-sm leading-7 text-muted">{es ? "Seis áreas funcionales representadas en los repositorios. Las demos muestran una parte de ese alcance con datos ficticios." : "Six functional areas represented in the repositories. The demos show a subset of that scope with fictional data."}</p></div>
        <div className="grid gap-px border border-line bg-line sm:grid-cols-2">{modules.map(([title, body], index) => <article key={title} className="bg-surface p-6"><span className="font-mono text-xs text-accent">{String(index + 1).padStart(2, "0")}</span><h3 className="mt-4 font-semibold">{title}</h3><p className="mt-3 text-sm leading-7 text-muted">{body}</p></article>)}</div>
      </div>
      <div className="mt-16 border-y border-line py-8"><p className="font-mono text-xs uppercase tracking-widest text-muted">{es ? "Cómo se usa · Ejemplo de estética" : "How it is used · Aesthetics example"}</p><ol className="mt-7 grid gap-7 sm:grid-cols-2 lg:grid-cols-4">{(es ? [
        ["01 / Cliente", "Consulta el catálogo y elige un servicio desde una conversación."],
        ["02 / Bot", "Guía por horarios y registra las etapas y la reserva a través del backend."],
        ["03 / Equipo", "Consulta el contexto del contacto, la reserva y los casos de atención humana."],
        ["04 / Administración", "Revisa interacciones, reservas y datos del catálogo desde el workspace."],
      ] : [
        ["01 / Customer", "Explores the catalog and selects a service from a conversation."],
        ["02 / Bot", "Guides time selection and records stages and bookings through the backend."],
        ["03 / Team", "Reviews customer context, the booking and human follow-up requests."],
        ["04 / Administration", "Reviews interactions, bookings and catalog data in the workspace."],
      ]).map(([title, body]) => <li key={title}><h3 className="font-mono text-xs uppercase tracking-wider text-accent">{title}</h3><p className="mt-3 text-sm leading-7 text-muted">{body}</p></li>)}</ol></div>
      <div className="mt-16 grid items-start gap-8 lg:grid-cols-[1fr_1.6fr]">
        <div><p className="font-mono text-xs uppercase tracking-widest text-accent">{es ? "Frontend original / D3" : "Original frontend / D3"}</p><h3 className="mt-5 text-2xl font-semibold">{es ? "El embudo hace visible la conversación." : "The funnel makes the conversation visible."}</h3><p className="mt-4 text-sm leading-7 text-muted">{es ? "El equipo consulta los flujos registrados: inicio de conversación, categoría, servicio y agenda. El frontend original agrupa eventos por lastFlow, permite comparar períodos y exportar los registros de una etapa a Excel." : "The team reviews recorded flows: conversation start, category, service and appointments. The original frontend groups events by lastFlow, compares periods and exports a stage’s records to Excel."}</p><p className="mt-4 text-sm leading-7 text-muted">{es ? "La demo interactiva muestra un recorrido ordenado: inicio → servicio → día → horario → confirmación. Cuenta contactos únicos que alcanzaron cada paso y permite seleccionarlos para seguimiento. La atención humana es una ruta alternativa." : "The interactive demo shows an ordered journey: start → service → day → time → confirmation. It counts unique contacts who reached each step and lets the team select them for follow-up. Human assistance is an alternative path."}</p></div>
        <figure><Image src="/project-media/zazu/original-funnel.jpg" width={1440} height={1000} alt={es ? "Frontend original de Zazu con dos embudos D3 y filtros Día, Semana y Mes; datos ficticios" : "Original Zazu frontend showing two D3 funnels and Day, Week and Month filters with fictional data"} className="h-auto w-full border border-line" /><figcaption className="mt-3 text-xs leading-6 text-muted">{es ? "Captura del frontend React original ejecutado localmente con datos ficticios. Los valores ilustran el gráfico; no son resultados de producción." : "Capture of the original React frontend running locally with fictional data. Values illustrate the chart; they are not production results."}</figcaption></figure>
      </div>
      <div className="mt-12 grid gap-6 sm:grid-cols-2">{demos.map((demo, i) => <Link key={demo.slug} href={`${root}/demos/${demo.slug}`} className="group border border-line bg-surface p-7 transition-colors hover:border-accent focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"><span className="font-mono text-xs uppercase tracking-widest text-accent">{i === 0 ? (es ? "Demo 01 / Operaciones" : "Demo 01 / Operations") : (es ? "Demo 02 / Bot sin IA" : "Demo 02 / Bot without AI")}</span><h3 className="mt-5 text-xl font-semibold">{demo.label} <span aria-hidden="true">→</span></h3><p className="mt-4 text-sm leading-7 text-muted">{demo.description}</p></Link>)}</div>
    </Container>
  </section>;
}

export function ZazuArchitecture({ locale }: { locale: Locale }) {
  return <figure className="mt-10"><Image src={`/project-media/zazu/system-flow-${locale}.svg`} width={1600} height={900} alt={locale === "es" ? "WhatsApp y bot Node conectados al backend Express y MongoDB; el workspace React consume la misma API" : "WhatsApp and Node bot connect to the Express backend and MongoDB; the React workspace consumes the same API"} className="h-auto w-full border border-line" /><figcaption className="mt-3 text-xs leading-6 text-muted">{locale === "es" ? "Arquitectura de los repositorios originales. Ambas demos públicas simulan estos registros en el navegador." : "Architecture of the original repositories. Both public demos simulate these records in the browser."}</figcaption></figure>;
}
