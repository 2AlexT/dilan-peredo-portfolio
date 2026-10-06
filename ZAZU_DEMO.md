# Zazu portfolio representation

## Public experience

The case study at `/projects/zazu-platform` (and `/es/projects/zazu-platform`) explains three cooperating repositories and six functional areas. It includes a customer journey, repository-based architecture, and separately labeled demos:

- `/demos/zazu`: overview, CRM/pipeline, appointments, service catalog and reports; Spanish equivalent under `/es`.
- `/demos/zazu-bot`: deterministic letter/menu choices, service selection, day/time availability, confirmation, invalid-input recovery and simulated human follow-up; Spanish equivalent under `/es`.

All values are fictional. The aesthetics scenario uses a fixed 7–8 October 2026 sample period and a single room with one-hour appointments. These are demonstration assumptions, not claims about the production scheduling model. No deployment counts, revenue outcomes or performance metrics are claimed.

Both demos share versioned localStorage records and work in memory if storage is unavailable. Reset restores both datasets. Restarting the chat only clears its conversation, preserving bookings. Catalog activation affects new bot choices; booking confirmation rechecks service and slot availability. Cancellation frees the slot and updates the customer stage when there are no other active bookings. CSV exports contain only fictional booking records. The simplified four-stage pipeline represents latest customer state, not a conversion-rate calculation.

The ordered conversation funnel appears in overview, CRM and reports: start → service → day → time → confirmation. It counts unique contacts who historically reached each step; a later mandatory step implies earlier steps for older demo records. Clicking a step filters the CRM to those contacts. Human follow-up is a separate branch. Cancellation preserves historical reach. This differs from the original D3 chart, which aggregates CRM events by lastFlow and displays mainFlow first, then other counts in descending order.

## Repository evidence

- Frontend `src/App.js`: dashboard, QR, categories, products/services, schedule, booking details, reports, CRM, contact lists and Excel upload routes.
- Frontend `src/components/CrmComponent.js` and `src/customHooks/useSelectedFlowFilter.js`: flow grouping, funnel views, exports and customer filters by `lastFlow` / product context.
- Backend `routes/routes.js`: administrative and bot catalog endpoints, schedules, bookings, interactions, CRM, contact lists and imports/exports.
- Backend `models/CRM.js`, `Booking.js`, `Interaction.js`: shared business/customer context and operational records.
- Bot `flow.js`, `services.js`, `index.js`: letter options, catalog/schedule/booking API calls and named conversation flows.
- Bot `chatgpt-prompts.js` and `index.js` also contain AI-related integrations. The public rule-based demo uses none of them; do not describe the entire source bot as having no AI.

The public demo recreates a subset of the system. Product management, account authentication, bulk imports, contact campaigns and live messaging are described as repository capabilities, not implemented in this demo.

## Visuals and validation

`public/project-media/zazu/` contains original React frontend captures (`original-*.jpg`), recreated public demo screens (`workspace.jpg`, `bot.jpg`) and English/Spanish system diagrams. Original captures run the actual frontend components with fictional local fixtures; they are not production screenshots. Recreated screens must remain labeled as portfolio demos. No screen uses real customer records.

Run the original frontend using its `PORTFOLIO_CAPTURE.md` instructions. The opt-in Axios adapter supplies a fictional session and local responses without a live backend. Capture `/crmData`, `/crmPersonalInformation` and `/bookingDetails/portfolio-demo`; retain the visible fictional-data label. Do not enable capture mode for a production deployment.

Run `npm run lint`, `npm run build`, and `node scripts/check-zazu-demo.mjs`. In a browser check booking → workspace CRM/appointments/reports, rejected input, occupied slots, cancellation, catalog activation, human follow-up, reset, CSV export, language routes and narrow layouts. Source and demo records contain no private customer information or credentials.
