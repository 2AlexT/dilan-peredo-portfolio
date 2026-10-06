"use client";

import { useSyncExternalStore } from "react";
import { createSeed, type DemoState } from "./data";

const key = "portfolio-zazu-demo-v1";
const seed = createSeed();
let current: DemoState = seed;
let loaded = false;
const listeners = new Set<() => void>();

function isDemoState(value: unknown): value is DemoState {
  if (!value || typeof value !== "object") return false;
  const candidate = value as DemoState;
  return candidate.version === 1 && Array.isArray(candidate.contacts) && candidate.contacts.length === seed.contacts.length &&
    candidate.contacts.every(c => seed.contacts.some(s => s.id === c.id) && typeof c.name === "string" && ["new", "interested", "booked", "handoff"].includes(c.stage) && typeof c.serviceId === "string" && Array.isArray(c.history) && c.history.every(h => typeof h === "string")) &&
    Array.isArray(candidate.services) && candidate.services.length === seed.services.length && candidate.services.every(s => seed.services.some(item => item.id === s.id) && typeof s.active === "boolean" && typeof s.price === "number" && s.name && typeof s.name.en === "string" && typeof s.name.es === "string") &&
    Array.isArray(candidate.bookings) && candidate.bookings.every(b => typeof b.id === "string" && candidate.contacts.some(c => c.id === b.contactId) && candidate.services.some(s => s.id === b.serviceId) && ["2026-10-07", "2026-10-08"].includes(b.day) && ["09:00", "11:00", "14:00", "16:00"].includes(b.time) && typeof b.cancelled === "boolean");
}

function readStorage() {
  try {
    const saved: unknown = JSON.parse(localStorage.getItem(key) ?? "null");
    if (isDemoState(saved)) return saved;
  } catch { /* Storage may be unavailable; the demo still works in memory. */ }
  return seed;
}
function subscribe(listener: () => void) {
  listeners.add(listener);
  if (!loaded) { loaded = true; current = readStorage(); }
  const sync = (event: StorageEvent) => {
    if (event.key === key || event.key === null) { current = readStorage(); listeners.forEach(fn => fn()); }
  };
  window.addEventListener("storage", sync);
  return () => { listeners.delete(listener); window.removeEventListener("storage", sync); };
}
export function updateDemo(change: (state: DemoState) => DemoState) {
  current = change(current);
  try { localStorage.setItem(key, JSON.stringify(current)); } catch { /* In-memory fallback. */ }
  listeners.forEach(fn => fn());
}
export function resetDemo() { updateDemo(() => createSeed()); }
export function useDemoState() { return useSyncExternalStore(subscribe, () => current, () => seed); }
