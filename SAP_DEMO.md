# SAP operations portfolio demo

The SAP case study links to /demos/sap and /es/demos/sap. These pages embed a dedicated Angular application from public/demo-apps/sap/index.html. The full-screen application uses hash navigation, so its five screens survive refreshes without server rewrite rules.

The public demo reads only the bundled fictional seed. Simulated payments are saved per browser using the dilan.sap-demo.paid.v1 localStorage key. Reset clears the visitor's simulated payments. There are no SAP credentials, original customer records, company uploads, production application modules or requests to the local Node API in this build.

## Refresh the Angular bundle

1. In api_lab_backoffice_sap, run npm run export:demo to export a fresh fictional seed to the sibling frontend.
2. In api_lab_frontend_sap, run npm ci if needed, then npm run build:demo:hosted.
3. Replace only public/demo-apps/sap with the contents of dist/portfolio-hosted/browser from that frontend.
4. Run npm run lint and npm run build in this portfolio, then commit the source and updated bundle together.

The current bundle is committed so the existing Next.js/Vercel build can serve it without cloning the enterprise repositories or starting an extra backend. License notices are included with the bundle. The screenshot in public/project-media/sap is from the fictional demonstration, not the original enterprise application.

English and Spanish wrapper pages explain the demonstration. The application interface is Spanish, matching the original operational workspace. Keep demo claims separate from the original production architecture and contribution in the case study.
