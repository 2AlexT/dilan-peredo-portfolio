"use client";

import Link from "next/link";
import { useState } from "react";

import { Container } from "@/components/ui/container";
import type { Locale } from "@/i18n/config";

type DemoView = "dashboard" | "requests" | "approvals" | "orders";

interface ComprasYaDemoProps {
  locale: Locale;
}

const demoCopy = {
  en: {
    back: "Back to case study",
    eyebrow: "Sanitized interactive demo",
    title: "A safe view into the procurement workflow.",
    description:
      "This portfolio demo recreates representative product interactions with fictional data. It is not connected to Frigor systems and contains no production code or customer information.",
    fictional: "Fictional data · No backend connection",
    role: "Purchasing analyst",
    nav: {
      dashboard: "Overview",
      requests: "Requests",
      approvals: "Approvals",
      orders: "Purchase orders",
    },
    heading: {
      dashboard: "Procurement overview",
      requests: "Purchase requests",
      approvals: "Pending approvals",
      orders: "Purchase orders",
    },
    newRequest: "New request",
    open: "Open",
  },
  es: {
    back: "Volver al caso de estudio",
    eyebrow: "Demo interactiva sanitizada",
    title: "Una vista segura del flujo de compras.",
    description:
      "Esta demo recrea interacciones representativas del producto con datos ficticios. No está conectada a sistemas de Frigor y no contiene código de producción ni información de clientes.",
    fictional: "Datos ficticios · Sin conexión al backend",
    role: "Analista de compras",
    nav: {
      dashboard: "Resumen",
      requests: "Solicitudes",
      approvals: "Aprobaciones",
      orders: "Órdenes de compra",
    },
    heading: {
      dashboard: "Resumen de compras",
      requests: "Solicitudes de compra",
      approvals: "Aprobaciones pendientes",
      orders: "Órdenes de compra",
    },
    newRequest: "Nueva solicitud",
    open: "Abrir",
  },
} as const;

const requests = [
  { code: "SC-2026-00142", area: "Operaciones", item: "Elementos de protección", total: "$ 4.820", status: "En aprobación" },
  { code: "SC-2026-00139", area: "Mantenimiento", item: "Repuestos de línea", total: "$ 12.460", status: "Cotización" },
  { code: "SC-2026-00135", area: "Tecnología", item: "Equipamiento de red", total: "$ 7.280", status: "Aprobada" },
  { code: "SC-2026-00131", area: "Calidad", item: "Insumos de laboratorio", total: "$ 3.640", status: "Revisión" },
];

const approvals = [
  { code: "SC-2026-00142", requester: "María R.", step: "Jefatura de área", age: "2 h" },
  { code: "SC-2026-00137", requester: "Carlos V.", step: "Finanzas", age: "5 h" },
  { code: "SC-2026-00131", requester: "Andrea P.", step: "Gerencia", age: "1 d" },
];

const orders = [
  { code: "OC-2026-00084", supplier: "Proveedor Norte", delivery: "08 Oct", total: "$ 18.900", status: "Emitida" },
  { code: "OC-2026-00081", supplier: "Suministros Central", delivery: "05 Oct", total: "$ 6.420", status: "Parcial" },
  { code: "OC-2026-00078", supplier: "Industrial Andina", delivery: "02 Oct", total: "$ 9.760", status: "Recibida" },
];

export function ComprasYaDemo({ locale }: ComprasYaDemoProps) {
  const [view, setView] = useState<DemoView>("dashboard");
  const copy = demoCopy[locale];
  const localeRoot = locale === "es" ? "/es" : "";

  return (
    <main id="main-content" lang={locale} className="py-12 sm:py-16">
      <Container>
        <Link
          href={`${localeRoot}/projects/comprasya`}
          className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.12em] text-muted transition-colors hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
        >
          <span aria-hidden="true">←</span> {copy.back}
        </Link>

        <header className="mt-12 grid gap-7 lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)]">
          <p className="font-mono text-xs uppercase tracking-[0.18em] text-accent">
            Demo / ComprasYa
          </p>
          <div>
            <h1 className="max-w-4xl text-4xl font-semibold leading-tight tracking-[-0.04em] text-foreground sm:text-6xl">
              {copy.title}
            </h1>
            <p className="mt-6 max-w-3xl text-base leading-8 text-muted sm:text-lg">
              {copy.description}
            </p>
          </div>
        </header>

        <section className="mt-12 overflow-hidden border border-line bg-[#eef1ed] text-[#182019] shadow-2xl shadow-black/20 sm:mt-16">
          <div className="flex min-h-10 items-center justify-between gap-4 bg-[#19231b] px-4 py-2 text-white sm:px-6">
            <span className="font-mono text-[0.62rem] uppercase tracking-[0.14em] text-[#b6f36b]">
              {copy.eyebrow}
            </span>
            <span className="hidden font-mono text-[0.6rem] uppercase tracking-[0.12em] text-white/60 sm:inline">
              {copy.fictional}
            </span>
          </div>

          <div className="grid min-h-[44rem] lg:grid-cols-[15rem_1fr]">
            <aside className="border-b border-[#d4dbd4] bg-white p-5 lg:border-b-0 lg:border-r">
              <div className="flex items-center gap-3">
                <span className="flex size-9 items-center justify-center bg-[#19231b] font-mono text-xs font-bold text-[#b6f36b]">
                  CY
                </span>
                <div>
                  <strong className="block text-sm">ComprasYa</strong>
                  <span className="text-[0.68rem] text-[#6f786f]">Procurement OS</span>
                </div>
              </div>

              <nav className="mt-8 flex gap-2 overflow-x-auto lg:flex-col" aria-label="Demo navigation">
                {(Object.keys(copy.nav) as DemoView[]).map((item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => setView(item)}
                    aria-current={view === item ? "page" : undefined}
                    className={`min-h-10 shrink-0 border-l-2 px-3 py-2 text-left text-xs font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#466b36] ${
                      view === item
                        ? "border-[#4b772e] bg-[#eef5e9] text-[#254118]"
                        : "border-transparent text-[#697169] hover:bg-[#f3f5f2] hover:text-[#182019]"
                    }`}
                  >
                    {copy.nav[item]}
                  </button>
                ))}
              </nav>

              <div className="mt-8 border-t border-[#e0e5df] pt-5 lg:mt-16">
                <span className="block text-[0.62rem] uppercase tracking-[0.12em] text-[#828a82]">Demo role</span>
                <strong className="mt-2 block text-xs">{copy.role}</strong>
              </div>
            </aside>

            <div className="min-w-0 p-5 sm:p-8 lg:p-10">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <p className="text-xs text-[#6f786f]">01 Oct 2026 · Workspace</p>
                  <h2 className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">
                    {copy.heading[view]}
                  </h2>
                </div>
                {view === "requests" && (
                  <button
                    type="button"
                    className="bg-[#315520] px-4 py-2.5 text-xs font-semibold text-white transition-colors hover:bg-[#244417] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#315520]"
                  >
                    + {copy.newRequest}
                  </button>
                )}
              </div>

              <div className="mt-8">
                {view === "dashboard" && <DashboardView />}
                {view === "requests" && <RequestsView openLabel={copy.open} />}
                {view === "approvals" && <ApprovalsView openLabel={copy.open} />}
                {view === "orders" && <OrdersView openLabel={copy.open} />}
              </div>
            </div>
          </div>
        </section>
      </Container>
    </main>
  );
}

function DashboardView() {
  return (
    <>
      <div className="grid gap-3 sm:grid-cols-3">
        {[
          ["Solicitudes activas", "24", "+4 esta semana"],
          ["Por aprobar", "07", "2 con prioridad"],
          ["Órdenes abiertas", "12", "3 entregas próximas"],
        ].map(([label, value, note]) => (
          <div key={label} className="border border-[#d6ddd5] bg-white p-5">
            <span className="text-xs text-[#6f786f]">{label}</span>
            <strong className="mt-4 block text-3xl tracking-tight">{value}</strong>
            <span className="mt-2 block text-[0.68rem] text-[#4b772e]">{note}</span>
          </div>
        ))}
      </div>

      <div className="mt-4 grid gap-4 xl:grid-cols-[1.3fr_0.7fr]">
        <div className="border border-[#d6ddd5] bg-white p-5">
          <div className="flex items-center justify-between">
            <strong className="text-sm">Flujo mensual</strong>
            <span className="text-[0.65rem] text-[#737b73]">Últimas 8 semanas</span>
          </div>
          <div className="mt-8 flex h-36 items-end gap-3 border-b border-[#dfe4de]">
            {[38, 54, 44, 67, 59, 78, 63, 86].map((height, index) => (
              <div key={index} className="flex-1 bg-[#c9d6c4]" style={{ height: `${height}%` }}>
                {index === 7 && <div className="h-full bg-[#4b772e]" />}
              </div>
            ))}
          </div>
        </div>

        <div className="border border-[#d6ddd5] bg-white p-5">
          <strong className="text-sm">Estado del proceso</strong>
          <div className="mt-6 space-y-5">
            {[
              ["Solicitado", "86%"],
              ["Aprobación", "62%"],
              ["Orden emitida", "41%"],
              ["Recepción", "29%"],
            ].map(([label, width]) => (
              <div key={label}>
                <div className="flex justify-between text-[0.68rem] text-[#687168]">
                  <span>{label}</span><span>{width}</span>
                </div>
                <div className="mt-2 h-1.5 bg-[#e5e9e4]">
                  <div className="h-full bg-[#4b772e]" style={{ width }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

function RequestsView({ openLabel }: { openLabel: string }) {
  return <DemoTable headers={["Solicitud", "Área", "Detalle", "Total", "Estado", ""]} rows={requests.map((item) => [item.code, item.area, item.item, item.total, item.status, openLabel])} />;
}

function ApprovalsView({ openLabel }: { openLabel: string }) {
  return <DemoTable headers={["Solicitud", "Solicitante", "Etapa actual", "Espera", ""]} rows={approvals.map((item) => [item.code, item.requester, item.step, item.age, openLabel])} />;
}

function OrdersView({ openLabel }: { openLabel: string }) {
  return <DemoTable headers={["Orden", "Proveedor", "Entrega", "Total", "Estado", ""]} rows={orders.map((item) => [item.code, item.supplier, item.delivery, item.total, item.status, openLabel])} />;
}

function DemoTable({ headers, rows }: { headers: string[]; rows: string[][] }) {
  return (
    <div className="overflow-x-auto border border-[#d6ddd5] bg-white">
      <table className="w-full min-w-[42rem] border-collapse text-left text-xs">
        <thead className="bg-[#f5f7f4] text-[#687168]">
          <tr>
            {headers.map((header) => (
              <th key={header || "action"} className="border-b border-[#d6ddd5] px-4 py-3 font-semibold">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row[0]} className="border-b border-[#e1e6e0] last:border-0 hover:bg-[#f7f9f6]">
              {row.map((cell, index) => (
                <td key={`${row[0]}-${index}`} className={`px-4 py-4 ${index === 0 ? "font-mono font-semibold" : ""} ${index === row.length - 1 ? "text-right font-semibold text-[#315520]" : ""}`}>
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
