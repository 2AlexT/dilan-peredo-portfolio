"use client";

import { useState } from "react";
import Link from "next/link";
import type { Locale } from "@/i18n/config";
import { availableTimes, cancelBooking, contactReachedStep, conversationSteps, days, formatDay, money, stageNames, stages, type Contact, type DemoState } from "./data";
import { ConversationFunnel } from "./funnel";
import { resetDemo, updateDemo, useDemoState } from "./store";
import { ZazuDemoShell } from "./shell";
import styles from "./zazu.module.css";

type View = "overview" | "crm" | "appointments" | "catalog" | "reports";
const nav = {
  en: { overview: "Overview", crm: "CRM & pipeline", appointments: "Appointments", catalog: "Service catalog", reports: "Reports" },
  es: { overview: "Resumen", crm: "CRM y embudo", appointments: "Agenda", catalog: "Catálogo de servicios", reports: "Reportes" },
};

export function ZazuWorkspace({ locale }: { locale: Locale }) {
  const state = useDemoState();
  const [view, setView] = useState<View>("overview");
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState("demo-visitor");
  const [notice, setNotice] = useState("");
  const [funnelFlow, setFunnelFlow] = useState("");
  const es = locale === "es";
  const bookings = state.bookings.filter(b => !b.cancelled);
  const value = bookings.reduce((total, b) => total + (state.services.find(s => s.id === b.serviceId)?.price ?? 0), 0);
  const filtered = state.contacts.filter(c => c.name.toLocaleLowerCase().includes(query.toLocaleLowerCase().trim()) && (!funnelFlow || contactReachedStep(c, funnelFlow)));
  const contact = filtered.find(c => c.id === selected) ?? filtered[0];
  function selectFunnel(flow: string) { setFunnelFlow(flow); setQuery(""); setView("crm"); }
  function exportReport() {
    const rows = [["booking", "customer", "service", "date", "time", "value_BOB", "status"], ...state.bookings.map(b => [b.id, state.contacts.find(c => c.id === b.contactId)?.name ?? "", state.services.find(s => s.id === b.serviceId)?.name[locale] ?? "", b.day, b.time, String(state.services.find(s => s.id === b.serviceId)?.price ?? 0), b.cancelled ? "cancelled" : "confirmed"])];
    const csv = "\uFEFF" + rows.map(row => row.map(cell => `"${cell.replaceAll('"', '""')}"`).join(",")).join("\r\n");
    const url = URL.createObjectURL(new Blob([csv], { type: "text/csv;charset=utf-8" }));
    const anchor = document.createElement("a"); anchor.href = url; anchor.download = "zazu-fictional-bookings.csv"; anchor.click(); URL.revokeObjectURL(url);
    setNotice(es ? "Reporte con datos ficticios exportado." : "Fictional-data report exported.");
  }
  return <ZazuDemoShell locale={locale}>
    <section className={styles.workspace} aria-label={es ? "Workspace Zazu de demostración" : "Zazu demonstration workspace"}>
      <aside className={styles.sidebar}>
        <div className={styles.brand}><span>Z.</span><div>ZAZU<small>{es ? "CENTRO DE ESTÉTICA DEMO" : "DEMO BEAUTY STUDIO"}</small></div></div>
        <p className={styles.navLabel}>{es ? "OPERACIÓN DEL NEGOCIO" : "BUSINESS OPERATIONS"}</p>
        <nav aria-label={es ? "Navegación de la demo" : "Demo navigation"}>
          {(Object.keys(nav[locale]) as View[]).map((item, index) => <button key={item} aria-current={view === item ? "page" : undefined} onClick={() => { setView(item); setNotice(""); }}><span aria-hidden="true">{["◈", "▥", "▦", "◇", "↗"][index]}</span>{nav[locale][item]}</button>)}
        </nav>
        <div className={styles.sidebarFoot}><span className={styles.dot} />{es ? "Datos de ejemplo" : "Sample data"}<small>React · Node.js · MongoDB</small></div>
      </aside>
      <div className={styles.content}>
        <div className={styles.topbar}><span>Zazu <span className={styles.muted}>/ {nav[locale][view]}</span></span><span className={styles.tag}>{es ? "DEMO LOCAL" : "LOCAL DEMO"}</span></div>
        <div className={styles.banner}><span>{es ? "Escenario de ejemplo · 7–8 oct 2026 · Todos los valores son ficticios" : "Sample scenario · 7–8 Oct 2026 · All values are fictional"}</span><button onClick={() => { resetDemo(); setNotice(es ? "Datos iniciales restaurados en ambas demos." : "Starting data restored in both demos."); }}>{es ? "Restaurar demo" : "Reset demo"} ↺</button></div>
        <div className={styles.body}>
          <div className={styles.heading}><div><p>{es ? "DE LA CONVERSACIÓN A LA OPERACIÓN" : "FROM CONVERSATION TO OPERATIONS"}</p><h2>{nav[locale][view]}</h2></div><span className={styles.muted}>{es ? "Workspace de ejemplo" : "Sample workspace"}</span></div>
          <p role="status" className={notice ? styles.notice : styles.srOnly}>{notice}</p>
          {(view === "overview" || view === "reports") && <>
            <div className={styles.kpis}>
              <Kpi label={es ? "Contactos en CRM" : "CRM contacts"} value={String(state.contacts.length)} hint={es ? "En este conjunto de ejemplo" : "In this sample dataset"} />
              <Kpi label={es ? "Reservas confirmadas" : "Confirmed bookings"} value={String(bookings.length)} hint={es ? "Excluye las canceladas" : "Excludes cancelled bookings"} />
              <Kpi label={es ? "Valor de reservas" : "Booking value"} value={money(value, locale)} hint={es ? "Simulado; no son cobros" : "Simulated; these are not payments"} />
              <Kpi label={es ? "Atención humana" : "Human follow-up"} value={String(state.contacts.filter(c => c.stage === "handoff").length)} hint={es ? "Conversaciones por atender" : "Conversations awaiting review"} />
            </div>
            <div className={styles.twoColumns}>
              <ConversationFunnel state={state} locale={locale} selectedFlow={funnelFlow} onSelect={selectFunnel} />
              <section className={styles.panel}><div className={styles.panelHeading}><h3>{es ? "Un flujo, varios módulos" : "One flow, several modules"}</h3></div><ol className={styles.flowList}>{(es ? ["El bot consulta el catálogo y la disponibilidad", "Cada elección conserva el contexto en CRM", "La confirmación genera una reserva", "Agenda y reportes reflejan el registro"] : ["The bot reads catalog and availability", "Each choice keeps customer context in CRM", "Confirmation creates a booking", "Appointments and reports reflect the record"]).map((step, i) => <li key={step}><span>{String(i + 1).padStart(2, "0")}</span>{step}</li>)}</ol><Link className={styles.textButton} href={`${es ? "/es" : ""}/demos/zazu-bot`}>{es ? "Crear una reserva con el bot" : "Create a booking with the bot"} →</Link></section>
            </div>
            <section className={styles.panel}><div className={styles.panelHeading}><h3>{es ? "Reservas de ejemplo" : "Sample bookings"}</h3>{view === "reports" ? <button className={styles.secondary} onClick={exportReport}>{es ? "Exportar CSV" : "Export CSV"}</button> : <button className={styles.textButton} onClick={() => setView("appointments")}>{es ? "Ver agenda" : "View appointments"} →</button>}</div><BookingTable state={state} locale={locale} /></section>
          </>}
          {view === "crm" && <>
            <ConversationFunnel state={state} locale={locale} selectedFlow={funnelFlow} onSelect={selectFunnel} />
            {funnelFlow && <div className={styles.funnelFilter}><span>{es ? "Etapa alcanzada" : "Stage reached"}: {conversationSteps.find(step => step.flow === funnelFlow)?.[locale]} · {filtered.length} {es ? "contactos" : "contacts"}</span><button className={styles.secondary} onClick={() => setFunnelFlow("")}>{es ? "Mostrar todas las etapas" : "Show all stages"}</button></div>}
            <div className={styles.filters}><label>{es ? "Buscar contacto" : "Search contacts"}<input type="search" placeholder={es ? "Nombre del contacto…" : "Contact name…"} value={query} onChange={e => setQuery(e.target.value)} /></label></div>
            <p className={styles.muted}>{es ? "El embudo muestra el recorrido histórico. Las columnas inferiores muestran la etapa actual de cada contacto." : "The funnel shows the historical journey. The columns below show each contact’s current stage."}</p>
            <div className={styles.pipeline}>{stages.map(stage => <section key={stage}><h3>{stageNames[locale][stage]} <span>{filtered.filter(c => c.stage === stage).length}</span></h3>{filtered.filter(c => c.stage === stage).map(c => <button key={c.id} onClick={() => setSelected(c.id)} aria-pressed={selected === c.id}><strong>{c.name}</strong><small>{state.services.find(s => s.id === c.serviceId)?.name[locale] ?? (es ? "Aún sin servicio" : "No service selected")}</small><span className={styles.muted}>{c.history.at(-1)}</span></button>)}</section>)}</div>
            {filtered.length === 0 && <p className={styles.notice}>{es ? "No se encontraron contactos." : "No contacts found."}</p>}
            {contact && <ContactDetail contact={contact} state={state} locale={locale} />}
          </>}
          {view === "appointments" && <>
            <div className={styles.twoColumns}>{days.map(day => <section className={styles.panel} key={day}><h3>{formatDay(day, locale)}</h3><p className={styles.muted}>{es ? "Una sala de demo · turnos de 60 minutos" : "One demo room · 60-minute appointments"}</p><div className={styles.slots}>{availableTimes(state, day).map(time => <span className={styles.badge} key={time}>{time}</span>)}{availableTimes(state, day).length === 0 && <span>{es ? "Sin turnos disponibles" : "No available slots"}</span>}</div></section>)}</div>
            <section className={styles.panel}><div className={styles.panelHeading}><h3>{es ? "Agenda de reservas" : "Booking schedule"}</h3><Link className={styles.textButton} href={`${es ? "/es" : ""}/demos/zazu-bot`}>{es ? "Reservar con el bot" : "Book with the bot"} →</Link></div><BookingTable state={state} locale={locale} onCancel={id => { updateDemo(s => cancelBooking(s, id)); setNotice(es ? "Reserva cancelada. El turno vuelve a estar disponible." : "Booking cancelled. The time is available again."); }} /></section>
          </>}
          {view === "catalog" && <section className={styles.panel}><div className={styles.panelHeading}><h3>{es ? "Servicios y precios" : "Services and prices"}</h3><span className={styles.tag}>{es ? "CATÁLOGO COMPARTIDO" : "SHARED CATALOG"}</span></div><p className={styles.muted}>{es ? "Desactivar un servicio lo quita de las nuevas opciones del bot. Las reservas existentes conservan su registro." : "Disabling a service removes it from new bot choices. Existing bookings retain their record."}</p><div className={styles.serviceGrid}>{state.services.map(s => <article className={styles.serviceCard} key={s.id}><span className={styles.serviceIcon} aria-hidden="true">◇</span><h3>{s.name[locale]}</h3><p>{s.minutes} min · {es ? "Sesión de ejemplo" : "Sample session"}</p><strong>{money(s.price, locale)}</strong><button className={s.active ? styles.secondary : styles.primary} aria-pressed={s.active} onClick={() => { updateDemo(state => ({ ...state, services: state.services.map(item => item.id === s.id ? { ...item, active: !item.active } : item) })); setNotice(es ? "Disponibilidad del catálogo actualizada." : "Catalog availability updated."); }}>{s.active ? (es ? "Activo · desactivar" : "Active · disable") : (es ? "Inactivo · activar" : "Inactive · enable")}</button></article>)}</div></section>}
        </div>
        <footer className={styles.footer}>{es ? "Demostración de portfolio · Datos ficticios · Cambios locales" : "Portfolio demonstration · Fictional data · Local changes"}</footer>
      </div>
    </section>
  </ZazuDemoShell>;
}

function Kpi({ label, value, hint }: { label: string; value: string; hint: string }) {
  return <div className={styles.kpi}><span>{label}</span><strong>{value}</strong><small>{hint}</small></div>;
}
function ContactDetail({ contact, state, locale }: { contact: Contact; state: DemoState; locale: Locale }) {
  const es = locale === "es";
  return <section className={styles.panel}><div className={styles.panelHeading}><h3>{contact.name}</h3><span className={styles.badge}>{stageNames[locale][contact.stage]}</span></div><p className={styles.muted}>{es ? "Historial de transiciones del contacto" : "Contact transition history"}</p><ol className={styles.history}>{contact.history.map((flow, i) => <li key={`${flow}-${i}`}><span>{String(i + 1).padStart(2, "0")}</span><code>{flow}</code></li>)}</ol><p className={styles.muted}>{es ? "Reservas activas" : "Active bookings"}: {state.bookings.filter(b => b.contactId === contact.id && !b.cancelled).length} · {es ? "Origen: escenario ficticio de WhatsApp" : "Source: fictional WhatsApp scenario"}</p></section>;
}
function BookingTable({ state, locale, onCancel }: { state: DemoState; locale: Locale; onCancel?: (id: string) => void }) {
  const es = locale === "es";
  return <div className={styles.tableScroll}><table><thead><tr>{(es ? ["Reserva", "Cliente", "Servicio", "Fecha / hora", "Estado"] : ["Booking", "Customer", "Service", "Date / time", "Status"]).map(h => <th key={h} scope="col">{h}</th>)}{onCancel && <th scope="col">{es ? "Acción" : "Action"}</th>}</tr></thead><tbody>{state.bookings.map(b => <tr key={b.id}><td><strong>{b.id}</strong></td><td>{state.contacts.find(c => c.id === b.contactId)?.name}</td><td>{state.services.find(s => s.id === b.serviceId)?.name[locale]}</td><td>{formatDay(b.day, locale)} · {b.time}</td><td><span className={b.cancelled ? styles.cancelled : styles.badge}>{b.cancelled ? (es ? "Cancelada" : "Cancelled") : (es ? "Confirmada" : "Confirmed")}</span></td>{onCancel && <td><button className={styles.secondary} disabled={b.cancelled} aria-label={`${es ? "Cancelar reserva" : "Cancel booking"} ${b.id}`} onClick={() => onCancel(b.id)}>{es ? "Cancelar" : "Cancel"}</button></td>}</tr>)}</tbody></table></div>;
}
