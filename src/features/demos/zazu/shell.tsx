import Link from "next/link";
import { Container } from "@/components/ui/container";
import type { Locale } from "@/i18n/config";

export function ZazuDemoShell({ locale, bot = false, children }: { locale: Locale; bot?: boolean; children: React.ReactNode }) {
  const es = locale === "es";
  const root = es ? "/es" : "";
  return (
    <main id="main-content" lang={locale} className="py-12 sm:py-16">
      <Container>
        <Link href={`${root}/projects/zazu-platform`} className="font-mono text-xs uppercase tracking-widest text-muted hover:text-accent">← {es ? "Volver al caso de estudio" : "Back to case study"}</Link>
        <header className="my-12 grid gap-6 lg:grid-cols-[1fr_2fr]">
          <p className="font-mono text-xs uppercase tracking-widest text-accent">ZAZU / {bot ? (es ? "Bot por reglas" : "Rule-based bot") : (es ? "Operaciones" : "Operations")}</p>
          <div>
            <h1 className="text-4xl font-semibold tracking-[-0.04em] sm:text-6xl">{bot ? (es ? "De una conversación a una reserva." : "From a conversation to a booking.") : (es ? "Una operación. Todo conectado." : "One operation. Everything connected.")}</h1>
            <p className="mt-5 max-w-3xl leading-8 text-muted">{bot ? (es ? "Elige un servicio, consulta horarios y confirma una reserva. Observa cada transición del bot y el registro que genera." : "Choose a service, find a time and confirm a booking. Follow each bot transition and the record it creates.") : (es ? "Explora el CRM, el embudo de conversaciones, la agenda, el catálogo y los reportes de un centro de estética ficticio." : "Explore the CRM, conversation pipeline, appointments, catalog and reports of a fictional beauty studio.")}</p>
            <p className="mt-4 border-l border-accent/50 pl-4 text-sm leading-7 text-muted">{es ? "Demo independiente con datos ficticios integrados. Los cambios se comparten entre ambas demos en este navegador; restaurar recupera los valores iniciales. Sin conexión a WhatsApp, sistemas reales ni IA." : "Standalone demo with built-in fictional data. Changes are shared between both demos in this browser; reset restores the starting values. No connection to WhatsApp, live systems or AI."}</p>
            <Link href={`${root}/demos/${bot ? "zazu" : "zazu-bot"}`} className="mt-5 inline-block text-sm font-semibold text-accent">{bot ? (es ? "Ver la reserva en el workspace" : "See the booking in the workspace") : (es ? "Probar el bot por separado" : "Try the separate bot demo")} →</Link>
          </div>
        </header>
        {children}
      </Container>
    </main>
  );
}
