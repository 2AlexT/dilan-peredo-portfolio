# Portfolio Base Plan

This document defines the minimum complete version of Dilan Peredo's software engineering portfolio. The goal is to establish a polished, deployable, and maintainable foundation before spending time on a more distinctive visual style, animations, or extra features.

## 1. Purpose

The portfolio should help a recruiter, engineering manager, client, or collaborator understand the following within a few minutes:

- Who Dilan is and what kind of software he builds.
- His strongest technologies and areas of experience.
- The business and engineering problems he has solved.
- His specific contribution to each project.
- How to contact him or review his public work.

The first release is not intended to be a blog, a CMS, or a complete archive of every repository. Three strong projects are enough for the base.

## 2. Current State

### Already present

- Next.js App Router, React, TypeScript, and Tailwind CSS.
- A responsive shared container and global navigation.
- A homepage with hero, selected projects, about, and contact sections.
- A `/projects` index page.
- Dynamic project case-study routes at `/projects/[slug]`.
- A centralized project data model.
- Three initial projects:
  - SAP Operations Platform — published.
  - ZAZU Platform — published.
  - FrigorERP — coming soon.
- Initial metadata for the site title and description.

### Current blockers and gaps

- [x] Fix the project challenge type mismatch. Project content and the case-study page now consistently use `body`.
- [ ] Complete FrigorERP's case-study content or intentionally keep it labeled as coming soon.
- [ ] Turn the contact section into a real call to action with at least an email link and one professional profile.
- [x] Fix navigation behavior so About and Contact work from the homepage, project index, and case-study routes in both languages.
- [ ] Replace the starter README with project-specific setup, architecture, content-editing, and deployment instructions.
- [ ] Add real project visuals or intentional visual placeholders.
- [ ] Add a footer and basic legal/copyright information.
- [ ] Add missing production metadata and social-sharing assets.
- [ ] Confirm responsive behavior, keyboard navigation, focus states, contrast, and reduced-motion behavior.

## 3. Definition of Done for the Base

The base is complete when all items in this section are true.

### Content

- [ ] The hero clearly states role, specialty, and value in one headline and one supporting paragraph.
- [ ] About copy explains experience, working style, strongest domains, and the kind of opportunities sought.
- [ ] A concise skills or capabilities section groups technologies by purpose instead of presenting an unstructured logo wall.
- [ ] All three project cards have a name, one-line positioning statement, concise description, technology list, status, and visual.
- [ ] Every published project has a complete case study.
- [ ] Private projects clearly distinguish what can be discussed without exposing confidential information.
- [ ] Contact information is real, visible, and usable.
- [ ] English and Spanish copy are complete, consistent, and reviewed by a fluent speaker. English is the default language.
- [x] A visible language control switches between equivalent English and Spanish routes.
- [ ] There are no placeholder claims, dead links, unfinished text, or unsupported metrics.

### Core pages and sections

- [ ] `/` includes Hero, Selected Work, Capabilities/Skills, About, and Contact.
- [ ] `/projects` lists all projects and communicates published versus coming-soon status.
- [ ] `/projects/[slug]` presents a complete case study for each published project.
- [ ] A custom `not-found` experience gives users a route back to the homepage or projects.
- [ ] Shared header and footer work on every route.

### Project case studies

Each published case study should answer these questions:

1. What was the product and who used it?
2. What business or operational problem did it solve?
3. What was Dilan's role and ownership?
4. What constraints existed, including private-source limitations?
5. How was the system structured?
6. What were the most meaningful engineering challenges?
7. What decisions or tradeoffs were made?
8. What result or impact did the work have?
9. What was learned or what would be improved today?

Minimum recommended project fields:

```ts
interface PortfolioProject {
  slug: string;
  name: string;
  subtitle: string;
  description: string;
  technologies: string[];
  status: "published" | "coming-soon";
  privateSource: boolean;
  featured: boolean;
  repositoryUrl?: string;
  liveUrl?: string;
  coverImage?: string;
  overview?: string;
  problem?: string;
  role?: string;
  architecture?: string;
  challenges?: Array<{ title: string; body: string }>;
  outcomes?: string[];
  improvements?: string[];
}
```

Only include measurable outcomes when they are accurate and safe to publish. Qualitative outcomes are acceptable for confidential enterprise work.

### Engineering quality

- [x] `npm run lint` passes.
- [x] `npm run build` passes, including TypeScript validation.
- [ ] Reusable layout, navigation, buttons, section headings, project cards, and content primitives are componentized where useful.
- [ ] Project data has one consistent schema and does not require page-specific workarounds.
- [ ] Images use `next/image`, explicit dimensions or aspect ratios, useful alternative text, and optimized formats.
- [ ] External links use safe target/rel behavior and internal links use Next.js `Link`.
- [ ] No secrets, private repository URLs, internal hostnames, customer data, or proprietary screenshots are committed.
- [ ] The site has no avoidable browser-console or hydration errors.

### Accessibility and UX

- [ ] The site is fully usable with a keyboard.
- [ ] Every interactive element has a visible focus state.
- [ ] Heading levels follow a logical order.
- [ ] Text and controls meet WCAG AA contrast targets.
- [ ] Link labels communicate their destination without relying only on arrows or visual position.
- [ ] Touch targets and navigation remain usable on small screens.
- [ ] Motion is optional and respects `prefers-reduced-motion`.
- [ ] Status labels do not rely on color alone.

### SEO and sharing

- [ ] Add a canonical site URL through `metadataBase` after the production domain is known.
- [ ] Add page-specific metadata for the homepage, projects index, and each published project.
- [ ] Add Open Graph and social-card metadata with a deliberate preview image.
- [ ] Add a favicon/app icon that belongs to the portfolio rather than the starter app.
- [ ] Add `robots.ts` and `sitemap.ts` when the production domain is available.
- [ ] Add structured data for `Person` and, if appropriate, project/creative-work entries.

### Deployment and operations

- [ ] Choose and document a production domain and hosting provider.
- [ ] Configure a repeatable deployment from the main branch.
- [ ] Verify production links, images, metadata, and error pages after deployment.
- [ ] Add lightweight, privacy-conscious analytics only if the information will be used.
- [ ] Provide a simple way to confirm that the deployed site is healthy.
- [ ] Document how to add or update a project without changing page components.

## 4. Recommended Information Architecture

```text
Home
├── Hero
├── Selected projects
├── Capabilities
├── About
└── Contact

Projects
├── SAP Operations Platform
├── ZAZU Platform
└── FrigorERP
```

This structure is sufficient for the first release. A separate About page, résumé page, blog, testimonials, services page, and content management system can wait until there is a clear need.

## 5. Content Needed From Dilan

### Personal content

- [ ] Preferred professional title.
- [ ] Short biography of roughly 80–150 words.
- [ ] Current location and whether remote/relocation information should be public.
- [ ] Type of opportunity or collaboration currently desired.
- [ ] Public email address.
- [ ] GitHub and LinkedIn URLs.
- [ ] Résumé/CV file or a decision not to publish one.
- [ ] Professional portrait or a decision to keep the site typography-led.

### Per-project content

- [ ] Target users or business area.
- [ ] Initial problem and constraints.
- [ ] Exact responsibilities and level of ownership.
- [ ] Architecture description that is safe to disclose.
- [ ] Two or three important technical decisions.
- [ ] Two or three challenges and how they were handled.
- [ ] Outcomes, improvements, or lessons learned.
- [ ] Public repository/demo URL when available.
- [ ] Approved screenshots, diagrams, mockups, or sanitized UI recreations.
- [ ] Confidential details that must never appear publicly.

When repository access is available, repository inspection can help confirm the technology stack, architecture, feature scope, and public links. It should not be used to publish secrets, customer information, proprietary code, or claims that Dilan has not approved.

## 6. UI/UX Direction to Decide

The current interface is a dark, restrained engineering portfolio. Before the visual-design pass, decide the following:

1. **Personality:** minimal/editorial, technical/terminal-inspired, polished/corporate, or bold/experimental.
2. **Theme:** dark only, light only, or a theme switcher.
3. **Color:** monochrome, one accent color, or a broader palette.
4. **Project visuals:** real screenshots, stylized mockups, architecture diagrams, or abstract covers.
5. **Typography:** neutral and modern, editorial, or technical/monospace-led.
6. **Motion:** nearly static, subtle transitions, or more expressive interactions.
7. **Primary audience:** recruiters, engineering leaders, freelance clients, or a combination.
8. **Primary action:** contact Dilan, view projects, download résumé, or visit GitHub.

Recommended starting direction: a refined dark editorial system with one accent color, strong typography, subtle motion, and project visuals that emphasize architecture and business impact. It fits the current enterprise/full-stack positioning without making the portfolio feel like a generic developer template.

## 7. Implementation Order

### Phase 1 — Make the current foundation reliable

- [x] Resolve the `ProjectSection` data/type mismatch.
- [x] Make lint and production build pass.
- [x] Fix cross-route navigation anchors.
- [ ] Define the final project schema and validate required fields for published projects.
- [ ] Replace the starter README.

### Phase 2 — Complete essential content and routes

- [ ] Finish About, Capabilities, Contact, and Footer.
- [ ] Complete the three project entries and published case studies.
- [ ] Add safe project visuals or intentional placeholders.
- [ ] Add the custom not-found page.

### Phase 3 — Production readiness

- [ ] Add accessibility states and test responsive layouts.
- [ ] Complete metadata, icons, Open Graph assets, robots, and sitemap.
- [ ] Deploy and test the production build.
- [ ] Confirm that all content is safe to publish.

### Phase 4 — Visual identity

- [ ] Apply the chosen color, type, spacing, imagery, and motion system.
- [ ] Refine case-study storytelling and visual hierarchy.
- [ ] Test the site with representative users and adjust unclear copy or navigation.

## 8. Explicitly Out of Scope for the Base

These features should be added only when they solve a real need:

- Blog or MDX publishing system.
- Headless CMS.
- User accounts or authentication.
- Database or custom backend.
- Complex filtering or search for only three projects.
- Heavy animation libraries.
- Testimonials without approved, credible quotes.
- An automated feed of every GitHub repository.
- Additional languages beyond English and Spanish before the primary content is complete.

## 9. Base Release Acceptance Checklist

- [ ] A first-time visitor can identify Dilan's role and specialization in under ten seconds.
- [ ] The three projects are visible and their status is unambiguous.
- [ ] Published project pages explain problem, contribution, architecture, challenges, and outcome.
- [ ] Every navigation item and call to action works from every route.
- [ ] Contacting Dilan requires no guesswork.
- [ ] The mobile experience feels intentional rather than compressed.
- [ ] The site is accessible by keyboard and has visible focus states.
- [ ] No confidential or unapproved information is exposed.
- [ ] Lint and production build pass.
- [ ] The deployed site has correct metadata, preview cards, favicon, sitemap, and error handling.
- [ ] The README explains setup, content updates, validation, and deployment.

When this checklist passes, the portfolio has a complete base. Later work can focus on distinctive styling, richer visuals, deeper case studies, and optional features without needing to restructure the project.
