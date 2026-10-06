import assert from "node:assert/strict";
import fs from "node:fs";
import ts from "typescript";
import vm from "node:vm";

const source = fs.readFileSync(new URL("../src/features/demos/zazu/data.ts", import.meta.url), "utf8");
const compiled = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 } }).outputText;
const exportsObject = {};
vm.runInNewContext(compiled, { exports: exportsObject, Intl, Date });
const { createSeed, availableTimes, confirmBooking, cancelBooking, getConversationFunnel } = exportsObject;
const seed = createSeed();
assert.equal(JSON.stringify(getConversationFunnel(seed).map(s => s.count)), JSON.stringify([6, 4, 2, 2, 2]), "The seeded funnel follows the required conversation order");

assert.equal(availableTimes(seed, "2026-10-07").includes("09:00"), false, "An occupied slot must not be offered");
assert.equal(confirmBooking(seed, "facial", "2026-10-07", "09:00"), null, "An occupied slot cannot be confirmed");
assert.equal(confirmBooking(seed, "facial", "2030-01-01", "11:00"), null, "A date outside the demo schedule must be rejected");
assert.equal(confirmBooking(seed, "unknown", "2026-10-07", "11:00"), null, "An unknown service must be rejected");
const disabled = { ...seed, services: seed.services.map(s => ({ ...s, active: false })) };
assert.equal(confirmBooking(disabled, "facial", "2026-10-07", "11:00"), null, "Disabled services must be rejected even after time selection");

const booked = confirmBooking(seed, "facial", "2026-10-07", "11:00");
assert.ok(booked);
assert.equal(booked.bookings.length, 3);
assert.equal(seed.bookings.length, 2, "Changes must not mutate the reset seed");
assert.equal(booked.contacts.find(c => c.id === "demo-visitor").stage, "booked");
assert.equal(booked.contacts.find(c => c.id === "demo-visitor").history.at(-1), "finishReservationFlow");
assert.equal(getConversationFunnel(booked).at(-1).count, 3, "A confirmed booking updates the funnel");
assert.equal(confirmBooking(booked, "massage", "2026-10-07", "11:00"), null, "Repeated confirmation cannot double-book the demo room");
const twoBookings = confirmBooking(booked, "massage", "2026-10-08", "11:00");
assert.equal(getConversationFunnel(twoBookings).at(-1).count, 3, "Repeated bookings by one contact do not inflate unique-contact reach");
const oneCancelled = cancelBooking(twoBookings, booked.bookings.at(-1).id);
assert.equal(oneCancelled.contacts.find(c => c.id === "demo-visitor").stage, "booked", "A customer with another active booking stays booked");
const cancelled = cancelBooking(booked, booked.bookings.at(-1).id);
assert.equal(cancelled.contacts.find(c => c.id === "demo-visitor").stage, "interested");
assert.equal(availableTimes(cancelled, "2026-10-07").includes("11:00"), true, "Cancellation frees availability");
assert.equal(getConversationFunnel(cancelled).at(-1).count, 3, "Cancellation retains the completed conversation history");
assert.equal(cancelBooking(cancelled, booked.bookings.at(-1).id), cancelled, "Repeated cancellation has no extra effect");
assert.equal(cancelBooking(seed, "missing"), seed);
console.log("Zazu checks passed: ordered funnel, unique-contact reach, historical cancellation counts, availability, booking/CRM consistency and seed isolation.");
