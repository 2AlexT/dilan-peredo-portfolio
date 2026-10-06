import Link from "next/link";

import { Container } from "@/components/ui/container";
import type { Locale } from "@/i18n/config";

const copy = {
  en: {
    back: "Back to case study",
    eyebrow: "Interactive portfolio demo",
    title: "Explore the operations workspace.",
    description: "Walk through sales, collections, inventory, and customer records in a focused backoffice demonstration. Search, filter, inspect documents, and simulate a payment to see the dashboard respond.",
    notice: "All records are fictional. This demonstration runs independently of the original SAP systems. Simulated payments stay in your browser; reset restores the starting data.",
    open: "Open full screen",
    frame: "SAP operations portfolio demonstration — overview, sales, collections, inventory and customers",
    hint: "Start with Overview, then open Collections and simulate a payment. The demo interface is in Spanish, matching the original business workspace.",
  },
  es: {
    back: "Volver al caso de estudio",
    eyebrow: "Demo interactiva de portfolio",
    title: "Explora el espacio de operaciones.",
    description: "Recorre ventas, cobranzas, inventario y clientes en una demostración de backoffice. Busca, filtra, consulta documentos y simula un pago para ver cómo responde el panel.",
    notice: "Todos los registros son ficticios. La demo funciona de forma independiente de los sistemas SAP originales. Los pagos simulados se guardan en tu navegador; restaurar recupera los datos iniciales.",
    open: "Abrir en pantalla completa",
    frame: "Demo de operaciones SAP — resumen, ventas, cobranzas, inventario y clientes",
    hint: "Empieza por Resumen, luego abre Cobranzas y simula un pago para explorar el flujo completo.",
  },
} as const;

export function SapDemo({ locale }: { locale: Locale }) {
  const text = copy[locale];
  const localeRoot = locale === "es" ? "/es" : "";

  return (
    <main id="main-content" lang={locale} className="py-12 sm:py-16">
      <Container>
        <Link href={`${localeRoot}/projects/sap-operations-platform`} className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.12em] text-muted transition-colors hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent">
          <span aria-hidden="true">←</span> {text.back}
        </Link>
        <header className="mt-12 grid gap-7 lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)]">
          <p className="font-mono text-xs uppercase tracking-[0.18em] text-accent">Demo / SAP Operations</p>
          <div>
            <h1 className="max-w-4xl text-4xl font-semibold leading-tight tracking-[-0.04em] text-foreground sm:text-6xl">{text.title}</h1>
            <p className="mt-6 max-w-3xl text-base leading-8 text-muted sm:text-lg">{text.description}</p>
            <p className="mt-5 max-w-3xl border-l border-accent/50 pl-4 text-sm leading-7 text-muted">{text.notice}</p>
          </div>
        </header>
        <section className="mt-12 sm:mt-16" aria-label={text.frame}>
          <div className="mb-4 flex flex-wrap items-center justify-between gap-4">
            <p className="max-w-2xl text-xs leading-6 text-muted">{text.hint}</p>
            <a href="/demo-apps/sap/index.html#/overview" target="_blank" rel="noopener noreferrer" className="border-b border-accent pb-1 text-sm font-semibold text-accent transition-colors hover:text-accent-soft focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent">{text.open} ↗</a>
          </div>
          <iframe src="/demo-apps/sap/index.html#/overview" title={text.frame} className="h-[850px] w-full rounded-lg border border-line bg-white shadow-2xl shadow-black/20 sm:h-[1000px]" loading="lazy" />
        </section>
      </Container>
    </main>
  );
}
