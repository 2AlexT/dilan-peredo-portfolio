import type { Locale } from "@/i18n/config";

export type Stage = "new" | "interested" | "booked" | "handoff";
export interface Contact { id: string; name: string; stage: Stage; serviceId: string; history: string[] }
export interface Service { id: string; name: Record<Locale, string>; minutes: number; price: number; active: boolean }
export interface Booking { id: string; contactId: string; serviceId: string; day: string; time: string; cancelled: boolean }
export interface DemoState { version: 1; contacts: Contact[]; services: Service[]; bookings: Booking[] }

export const stages: Stage[] = ["new", "interested", "booked", "handoff"];
export const conversationSteps = [
  { flow: "mainFlow", en: "Conversation started", es: "Inicio de conversación" },
  { flow: "productsFlow", en: "Service selected", es: "Servicio elegido" },
  { flow: "daySelectedFlow", en: "Day selected", es: "Día elegido" },
  { flow: "hourFlow", en: "Time selected", es: "Horario elegido" },
  { flow: "finishReservationFlow", en: "Booking confirmed", es: "Reserva confirmada" },
] as const;
export function contactReachedStep(contact: Contact, flow: string) {
  const index = conversationSteps.findIndex(step => step.flow === flow);
  // Later booking-path events imply the preceding required steps were reached.
  // Human follow-up is a branch, not a sequential funnel step.
  return index >= 0 && contact.history.some(event => conversationSteps.findIndex(step => step.flow === event) >= index);
}
export function getConversationFunnel(state: DemoState) {
  return conversationSteps.map(step => ({ ...step, count: state.contacts.filter(c => contactReachedStep(c, step.flow)).length }));
}
export const stageNames = {
  en: { new: "New conversation", interested: "Service selected", booked: "Booking confirmed", handoff: "Human follow-up" },
  es: { new: "Nueva conversación", interested: "Servicio elegido", booked: "Reserva confirmada", handoff: "Atención humana" },
};
export const days = ["2026-10-07", "2026-10-08"];
export const times = ["09:00", "11:00", "14:00", "16:00"];
export function formatDay(day: string, locale: Locale) {
  return new Intl.DateTimeFormat(locale === "es" ? "es-BO" : "en-GB", { day: "numeric", month: "short", timeZone: "UTC" }).format(new Date(`${day}T12:00:00Z`));
}
export function money(value: number, locale: Locale) {
  return new Intl.NumberFormat(locale === "es" ? "es-BO" : "en-GB", { style: "currency", currency: "BOB", maximumFractionDigits: 0 }).format(value);
}
export function createSeed(): DemoState {
  return {
    version: 1,
    services: [
      { id: "facial", name: { en: "Facial care", es: "Limpieza facial" }, minutes: 60, price: 180, active: true },
      { id: "massage", name: { en: "Relaxation massage", es: "Masaje relajante" }, minutes: 60, price: 220, active: true },
      { id: "consultation", name: { en: "Aesthetic consultation", es: "Consulta estética" }, minutes: 60, price: 100, active: true },
    ],
    contacts: [
      { id: "demo-visitor", name: "Elena Sol", stage: "new", serviceId: "", history: ["mainFlow"] },
      { id: "c2", name: "Lucía Prado", stage: "booked", serviceId: "facial", history: ["mainFlow", "productsFlow", "daySelectedFlow", "hourFlow", "finishReservationFlow"] },
      { id: "c3", name: "Mateo Luna", stage: "interested", serviceId: "massage", history: ["mainFlow", "productsFlow"] },
      { id: "c4", name: "Sofía Valle", stage: "handoff", serviceId: "consultation", history: ["mainFlow", "directContactFlow"] },
      { id: "c5", name: "Leo Mar", stage: "booked", serviceId: "massage", history: ["mainFlow", "productsFlow", "daySelectedFlow", "hourFlow", "finishReservationFlow"] },
      { id: "c6", name: "Alma Río", stage: "interested", serviceId: "facial", history: ["mainFlow", "productsFlow"] },
    ],
    bookings: [
      { id: "ZA-1001", contactId: "c2", serviceId: "facial", day: days[0], time: "09:00", cancelled: false },
      { id: "ZA-1002", contactId: "c5", serviceId: "massage", day: days[0], time: "14:00", cancelled: false },
    ],
  };
}

export function availableTimes(state: DemoState, day: string) {
  // A single demonstration room; every service uses a one-hour appointment.
  return times.filter(time => !state.bookings.some(b => !b.cancelled && b.day === day && b.time === time));
}

export function confirmBooking(state: DemoState, serviceId: string, day: string, time: string): DemoState | null {
  if (!state.services.some(s => s.id === serviceId && s.active) || !days.includes(day) || !availableTimes(state, day).includes(time)) return null;
  const id = `ZA-${1001 + state.bookings.length}`;
  return {
    ...state,
    bookings: [...state.bookings, { id, contactId: "demo-visitor", serviceId, day, time, cancelled: false }],
    contacts: state.contacts.map(c => c.id === "demo-visitor" ? { ...c, stage: "booked", serviceId, history: [...c.history, "finishReservationFlow"] } : c),
  };
}

export function cancelBooking(state: DemoState, id: string): DemoState {
  const booking = state.bookings.find(b => b.id === id);
  if (!booking || booking.cancelled) return state;
  const bookings = state.bookings.map(b => b.id === id ? { ...b, cancelled: true } : b);
  return { ...state, bookings, contacts: state.contacts.map(c => c.id === booking.contactId && !bookings.some(b => b.contactId === c.id && !b.cancelled) ? { ...c, stage: "interested", history: [...c.history, "deleteBookingFlow"] } : c) };
}
