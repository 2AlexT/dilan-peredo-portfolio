# Portfolio content and demonstrations

Maintain complete English and Spanish versions of project content and demo routes. Preserve unrelated local changes.

## Evidence and visuals

- Represent each project with screens of its system, clearly labeled screens of a portfolio demonstration, or diagrams of the actual system/workflow. Do not use stock photographs, decorative AI images or invented interfaces as evidence of the original product.
- Label recreated screens as portfolio demos and label fictional data. Include descriptive alt text and captions; keep visuals legible and responsive. Check assets exist before delivery.
- Verify capabilities and architecture against the source repositories. Do not invent user counts, business results, deployment history or performance claims.
- Keep customer data, credentials, environment files, production URLs and private source out of public assets and demonstrations.

## Zazu case study

Explain Zazu as a connected system: the React/Redux administrative frontend, Express/Mongoose backend and WhatsApp automation application. Show CRM/contact context, conversation funnels, catalog, scheduling/bookings, reports and imports/exports. Describe the example customer journey and how a team uses the records.

Keep the funnel chart prominent in the Zazu case study and interactive operations demo. Explain conversation order and distinguish the original D3 chart’s event counts by lastFlow from the demo’s cumulative unique-contact reach. Human assistance is an alternative branch, not a required booking step. Prefer screenshots of the original frontend running with fictional data; the source frontend’s opt-in PORTFOLIO_CAPTURE.md workflow supplies local fixtures. Label original captures separately from recreated public demo screens.

Source repositories available locally:
- `C:/Proyectos_dperedo/zazu_proyecto/frontendZazu_2024_N`
- `C:/Proyectos_dperedo/zazu_proyecto/backofficezazu`
- `C:/Proyectos_dperedo/zazu_proyecto/zazu_estetica_2025`

Maintain separate operations and bot demonstrations with built-in fictional data. The public bot is deterministic, driven by menu choices and explicit state transitions, and must not call AI or live WhatsApp/backend services. Distinguish this demo from AI-related code present in the original bot repository. Read `ZAZU_DEMO.md` for scope and validation details.

After changes run `npm run lint` and `npm run build`. For Zazu booking/flow changes run `node scripts/check-zazu-demo.mjs` and verify the relevant browser interactions in both languages and on mobile.
