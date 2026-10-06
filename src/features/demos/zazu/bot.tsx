"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import type { Locale } from "@/i18n/config";
import { availableTimes, confirmBooking, days, formatDay, money, type DemoState } from "./data";
import { resetDemo, updateDemo, useDemoState } from "./store";
import { ZazuDemoShell } from "./shell";
import styles from "./zazu.module.css";

type Flow = "mainFlow" | "productsFlow" | "daySelectedFlow" | "hourFlow" | "bookingFlow" | "finishReservationFlow" | "directContactFlow" | "pricesFlow";
interface Selection { serviceId: string; day: string; time: string }
interface Message { from: "bot" | "visitor"; text: string }
interface Choice { key: string; label: string; value: string }
const emptySelection: Selection = { serviceId: "", day: "", time: "" };

function choicesFor(flow: Flow, selection: Selection, state: DemoState, locale: Locale): Choice[] {
  const es = locale === "es";
  const choices = (values: { label: string; value: string }[]) => values.map((item, i) => ({ ...item, key: String.fromCharCode(65 + i) }));
  if (flow === "mainFlow") return choices([
    { label: es ? "Reservar una cita" : "Book an appointment", value: "book" },
    { label: es ? "Consultar servicios y precios" : "View services and prices", value: "prices" },
    { label: es ? "Hablar con una persona" : "Speak to a person", value: "human" },
  ]);
  if (flow === "productsFlow") return choices(state.services.filter(s => s.active).map(s => ({ label: `${s.name[locale]} · ${money(s.price, locale)}`, value: s.id })));
  if (flow === "daySelectedFlow") return choices(days.filter(day => availableTimes(state, day).length > 0).map(day => ({ label: formatDay(day, locale), value: day })));
  if (flow === "hourFlow") return choices(availableTimes(state, selection.day).map(time => ({ label: time, value: time })));
  if (flow === "bookingFlow") return choices([{ label: es ? "Confirmar reserva" : "Confirm booking", value: "confirm" }, { label: es ? "Volver al inicio" : "Return to the start", value: "restart" }]);
  return choices([{ label: es ? "Volver al inicio" : "Return to the start", value: "restart" }]);
}
function promptFor(flow: Flow, selection: Selection, state: DemoState, locale: Locale) {
  const es = locale === "es";
  if (flow === "mainFlow") return es ? "¡Hola, Elena! Soy Zazu, el asistente de nuestro centro de estética de ejemplo. ¿Qué deseas hacer?" : "Hi, Elena! I’m Zazu, the assistant for our sample beauty studio. What would you like to do?";
  if (flow === "productsFlow") return state.services.some(s => s.active) ? (es ? "Selecciona un servicio del catálogo de ejemplo." : "Choose a service from the sample catalog.") : (es ? "No hay servicios activos. Activa uno en el workspace y reinicia la conversación." : "There are no active services. Enable one in the workspace and restart the conversation.");
  if (flow === "daySelectedFlow") return days.some(day => availableTimes(state, day).length) ? (es ? "Selecciona un día disponible." : "Choose an available day.") : (es ? "No hay turnos disponibles. Puedes solicitar atención humana o cancelar una reserva de ejemplo desde el workspace." : "No appointments are available. Request human follow-up or cancel a sample booking in the workspace.");
  if (flow === "hourFlow") return availableTimes(state, selection.day).length ? (es ? "Estos son los horarios disponibles. Selecciona uno." : "These times are available. Choose one.") : (es ? "Este día ya no tiene horarios disponibles. Reinicia para elegir otro día." : "This day has no available times left. Restart to choose another day.");
  if (flow === "bookingFlow") return `${es ? "Revisa tu reserva de ejemplo" : "Review your sample booking"}:\nElena Sol · ${state.services.find(s => s.id === selection.serviceId)?.name[locale]}\n${formatDay(selection.day, locale)} · ${selection.time}\n${es ? "Confirmar crea un registro local; no se realiza ningún pago." : "Confirming creates a local record; no payment is made."}`;
  if (flow === "pricesFlow") return state.services.filter(s => s.active).map(s => `${s.name[locale]} · ${s.minutes} min · ${money(s.price, locale)}`).join("\n") || (es ? "No hay servicios activos." : "No active services.");
  if (flow === "directContactFlow") return es ? "Tu solicitud de atención humana quedó registrada en el CRM de demo. Una persona del equipo continuaría la conversación en el sistema real." : "Your human follow-up request is recorded in the demo CRM. A team member would continue the conversation in the live system.";
  return es ? "Reserva de ejemplo confirmada. Puedes verla en la agenda y los reportes del workspace." : "Sample booking confirmed. See it in the workspace appointments and reports.";
}

export function ZazuBot({ locale }: { locale: Locale }) {
  const state = useDemoState();
  const es = locale === "es";
  const [flow, setFlow] = useState<Flow>("mainFlow");
  const [selection, setSelection] = useState<Selection>(emptySelection);
  const [messages, setMessages] = useState<Message[]>([]);
  const [trace, setTrace] = useState<string[]>(["mainFlow"]);
  const [input, setInput] = useState("");
  const [status, setStatus] = useState("");
  const chatMessages = useRef<HTMLDivElement>(null);
  const choices = choicesFor(flow, selection, state, locale);
  const prompt = promptFor(flow, selection, state, locale);
  const visitor = state.contacts.find(c => c.id === "demo-visitor")!;
  useEffect(() => {
    if (chatMessages.current) chatMessages.current.scrollTop = chatMessages.current.scrollHeight;
  }, [messages, flow]);

  function restart() { setFlow("mainFlow"); setSelection(emptySelection); setMessages([]); setTrace(["mainFlow"]); setInput(""); setStatus(""); }
  function choose(value: string, label: string) {
    let next: Flow = flow;
    let context = selection;
    if (value === "restart") { restart(); return; }
    if (value === "human") {
      next = "directContactFlow";
      updateDemo(s => ({ ...s, contacts: s.contacts.map(c => c.id === "demo-visitor" ? { ...c, stage: "handoff", history: [...c.history, next] } : c) }));
    } else if (flow === "mainFlow") next = value === "book" ? "productsFlow" : "pricesFlow";
    else if (flow === "productsFlow") {
      context = { ...selection, serviceId: value }; next = "daySelectedFlow";
      updateDemo(s => ({ ...s, contacts: s.contacts.map(c => c.id === "demo-visitor" ? { ...c, stage: "interested", serviceId: value, history: [...c.history, "productsFlow"] } : c) }));
    } else if (flow === "daySelectedFlow") {
      context = { ...selection, day: value }; next = "hourFlow";
      updateDemo(s => ({ ...s, contacts: s.contacts.map(c => c.id === "demo-visitor" ? { ...c, history: [...c.history, "daySelectedFlow"] } : c) }));
    } else if (flow === "hourFlow") {
      context = { ...selection, time: value }; next = "bookingFlow";
      updateDemo(s => ({ ...s, contacts: s.contacts.map(c => c.id === "demo-visitor" ? { ...c, history: [...c.history, "hourFlow"] } : c) }));
    }
    else if (flow === "bookingFlow") {
      let confirmed = false;
      updateDemo(s => { const result = confirmBooking(s, selection.serviceId, selection.day, selection.time); confirmed = result !== null; return result ?? s; });
      if (!confirmed) { setStatus(es ? "El turno o servicio ya no está disponible. Reinicia para elegir otra opción." : "The time or service is no longer available. Restart to choose another option."); return; }
      next = "finishReservationFlow";
    }
    setMessages(previous => [...previous, { from: "bot", text: prompt }, { from: "visitor", text: label }]);
    setFlow(next); setSelection(context); setTrace(previous => [...previous, next]); setInput(""); setStatus("");
  }
  function sendInput(event: React.FormEvent) {
    event.preventDefault();
    const text = input.trim();
    if (!text) return;
    if (["hola", "hello", "restart", "reiniciar"].includes(text.toLowerCase())) { restart(); return; }
    const choice = choices.find(item => item.key === text.toUpperCase());
    if (choice) choose(choice.value, `${choice.key}) ${choice.label}`);
    else { setMessages(previous => [...previous, { from: "visitor", text }, { from: "bot", text: es ? "Elige una de las opciones mostradas o escribe «hola» para reiniciar. Esta demo sigue reglas y no interpreta preguntas abiertas." : "Choose one of the displayed options or type “hello” to restart. This demo follows rules and does not interpret open-ended questions." }]); setInput(""); setStatus(es ? "Entrada no válida: la etapa del bot no cambió." : "Invalid input: the bot stage did not change."); }
  }

  return <ZazuDemoShell locale={locale} bot>
    <div className={styles.botLayout}>
      <section className={styles.chat} aria-label={es ? "Conversación de demo con Zazu" : "Demo conversation with Zazu"}>
        <header className={styles.chatHeader}><span className={styles.botAvatar}>Z.</span><div><strong>Zazu</strong><small>{es ? "Bot por reglas · Sin IA" : "Rule-based bot · No AI"}</small></div><button className={styles.secondary} onClick={restart}>{es ? "Reiniciar chat" : "Restart chat"} ↺</button></header>
        <div className={styles.chatMessages} ref={chatMessages}>
          <p className={styles.chatDate}>{es ? "ESCENARIO FICTICIO · ELENA SOL" : "FICTIONAL SCENARIO · ELENA SOL"}</p>
          {messages.map((message, i) => <p key={i} className={message.from === "bot" ? styles.botBubble : styles.visitorBubble}>{message.text}</p>)}
          <div aria-live="polite" aria-atomic="true"><p className={styles.botBubble}>{prompt}</p></div>
        </div>
        <div className={styles.choices}>{choices.map(choice => <button key={choice.key} onClick={() => choose(choice.value, `${choice.key}) ${choice.label}`)}><span>{choice.key}</span>{choice.label}</button>)}</div>
        <form className={styles.chatForm} onSubmit={sendInput}><label className={styles.srOnly} htmlFor="zazu-message">{es ? "Mensaje para el bot" : "Message to the bot"}</label><input id="zazu-message" value={input} onChange={e => setInput(e.target.value)} maxLength={200} placeholder={es ? "Escribe una letra o «hola»…" : "Type a letter or “hello”…"} /><button className={styles.primary} disabled={!input.trim()}>{es ? "Enviar" : "Send"} →</button></form>
      </section>
      <aside className={styles.botInspector}>
        <span className={styles.inspectorEyebrow}>{es ? "DETRÁS DE LA CONVERSACIÓN" : "BEHIND THE CONVERSATION"}</span>
        <h2>{es ? "Cada elección mueve el sistema." : "Every choice moves the system."}</h2>
        <p>{es ? "Una máquina de estados valida la opción, mantiene el contexto y genera registros. No hay respuestas generativas." : "A state machine validates the choice, keeps context and creates records. Responses are not generated by AI."}</p>
        <section className={styles.panel}><h3>{es ? "Estado actual" : "Current state"}</h3><code className={styles.currentFlow}>{flow}</code><dl className={styles.context}><div><dt>{es ? "Servicio" : "Service"}</dt><dd>{state.services.find(s => s.id === selection.serviceId)?.name[locale] ?? "—"}</dd></div><div><dt>{es ? "Turno" : "Appointment"}</dt><dd>{selection.day ? formatDay(selection.day, locale) : "—"} {selection.time}</dd></div><div><dt>{es ? "Reservas de Elena" : "Elena’s bookings"}</dt><dd>{state.bookings.filter(b => b.contactId === visitor.id && !b.cancelled).length}</dd></div></dl></section>
        <section className={styles.panel}><h3>{es ? "Ruta de esta conversación" : "This conversation’s path"}</h3><ol className={styles.trace}>{trace.map((item, i) => <li key={`${i}-${item}`}><span>{String(i + 1).padStart(2, "0")}</span><code>{item}</code></li>)}</ol></section>
        <p role="status" className={status ? styles.notice : styles.srOnly}>{status}</p>
        <Link className={styles.primaryLink} href={`${es ? "/es" : ""}/demos/zazu`}>{es ? "Abrir CRM y agenda" : "Open CRM and appointments"} →</Link>
        <div className={styles.botActions}><button className={styles.secondary} disabled={flow === "directContactFlow"} onClick={() => choose("human", es ? "Solicitar atención humana" : "Request human follow-up")}>{es ? "Solicitar atención humana" : "Request human follow-up"}</button><button className={styles.textButton} onClick={() => { resetDemo(); restart(); }}>{es ? "Restaurar ambas demos" : "Reset both demos"} ↺</button></div>
      </aside>
    </div>
  </ZazuDemoShell>;
}
