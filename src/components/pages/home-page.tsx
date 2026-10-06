import Link from "next/link";

import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { profile } from "@/data/profile";
import { ProjectGrid } from "@/features/projects/components/project-grid";
import type { Locale } from "@/i18n/config";
import { siteCopy } from "@/i18n/copy";

interface HomePageContentProps {
  locale: Locale;
}

export function HomePageContent({ locale }: HomePageContentProps) {
  const copy = siteCopy[locale].home;
  const localeRoot = locale === "es" ? "/es" : "";

  return (
    <main id="main-content" lang={locale}>
      <section className="relative isolate overflow-hidden pb-20 pt-16 sm:pb-28 sm:pt-24 lg:min-h-[calc(100svh-4.5rem)] lg:py-28">
        <div className="technical-grid pointer-events-none absolute inset-0 -z-10" />
        <div className="pointer-events-none absolute -right-40 top-20 -z-10 size-[34rem] rounded-full bg-accent/[0.035] blur-3xl" />

        <Container className="grid items-center gap-16 lg:grid-cols-[minmax(0,1.25fr)_minmax(20rem,0.75fr)]">
          <div>
            <div className="reveal flex flex-wrap items-center gap-x-5 gap-y-3 font-mono text-xs uppercase tracking-[0.16em] text-muted">
              <span className="inline-flex items-center gap-2 text-accent">
                <span className="signal-pulse size-1.5 rounded-full bg-accent" />
                {copy.availability}
              </span>
              <span>{copy.eyebrow}</span>
            </div>

            <p className="reveal reveal-delay-1 mt-8 text-sm font-medium tracking-wide text-foreground/80 sm:text-base">
              {profile.name}
            </p>
            <h1 className="reveal reveal-delay-1 mt-5 max-w-6xl text-5xl font-semibold leading-[0.95] tracking-[-0.055em] text-foreground sm:text-7xl lg:text-[clamp(4.5rem,7.4vw,8rem)]">
              {copy.headlineLead}{" "}
              <span className="text-accent">{copy.headlineAccent}</span>{" "}
              {copy.headlineEnd}
            </h1>

            <p className="reveal reveal-delay-2 mt-8 max-w-2xl text-lg leading-8 text-muted sm:text-xl sm:leading-9">
              {copy.introduction}
            </p>

            <div className="reveal reveal-delay-2 mt-10 flex flex-wrap items-center gap-x-7 gap-y-5">
              <a
                href="#work"
                className="group inline-flex min-h-12 items-center gap-3 bg-accent px-5 py-3 text-sm font-semibold text-background transition-colors hover:bg-accent-soft focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
              >
                {copy.viewProjects}
                <ArrowIcon />
              </a>
              <a
                href={profile.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex min-h-11 items-center gap-2 border-b border-line py-2 text-sm font-semibold text-foreground transition-colors hover:border-accent hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
              >
                {copy.github}
                <ExternalIcon />
              </a>
            </div>
          </div>

          <SystemMap />
        </Container>

        <Container className="mt-16 lg:mt-24">
          <p className="border-t border-line pt-5 font-mono text-[0.68rem] uppercase tracking-[0.16em] text-muted">
            {copy.location}
          </p>
        </Container>
      </section>

      <section id="about" className="section-rule scroll-mt-20 py-20 sm:py-28">
        <Container>
          <SectionHeading
            index="01"
            eyebrow={copy.about}
            title={copy.aboutHeadline}
          />

          <div className="mt-14 grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)]">
            <div className="hidden lg:block" aria-hidden="true">
              <span className="font-mono text-7xl leading-none text-line">{`{ }`}</span>
            </div>
            <div className="grid gap-10 md:grid-cols-2">
              <div className="space-y-5 text-base leading-8 text-muted sm:text-lg">
                <p>{copy.aboutBody}</p>
                <p>{copy.aboutSecondary}</p>
              </div>
              <ol className="border-t border-line">
                {copy.principles.map((principle, index) => (
                  <li
                    key={principle}
                    className="grid grid-cols-[2rem_1fr] gap-4 border-b border-line py-5 text-sm leading-6 text-foreground"
                  >
                    <span className="font-mono text-xs text-accent">
                      0{index + 1}
                    </span>
                    {principle}
                  </li>
                ))}
              </ol>
            </div>
          </div>
          <dl className="mt-12 grid gap-8 border-t border-line pt-8 md:grid-cols-2">
            <div>
              <dt className="font-mono text-xs uppercase tracking-[0.14em] text-accent">{copy.education}</dt>
              <dd className="mt-3 text-sm leading-7 text-muted">{copy.educationBody}</dd>
            </div>
            <div>
              <dt className="font-mono text-xs uppercase tracking-[0.14em] text-accent">{copy.languages}</dt>
              <dd className="mt-3 text-sm leading-7 text-muted">{copy.languagesBody}</dd>
            </div>
          </dl>
        </Container>
      </section>

      <section id="work" className="section-rule scroll-mt-20 py-20 sm:py-28">
        <Container>
          <SectionHeading
            index="02"
            eyebrow={copy.selectedWork}
            title={copy.engineeringProjects}
            description={copy.workIntroduction}
          />

          <div className="mt-16">
            <ProjectGrid locale={locale} />
          </div>

          <div className="mt-10 flex justify-end">
            <Link
              href={`${localeRoot}/projects`}
              className="group inline-flex items-center gap-3 border-b border-line pb-2 text-sm font-semibold text-foreground transition-colors hover:border-accent hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
            >
              {copy.allProjects}
              <ArrowIcon />
            </Link>
          </div>
        </Container>
      </section>

      <section id="skills" className="section-rule scroll-mt-20 py-20 sm:py-28">
        <Container>
          <SectionHeading
            index="03"
            eyebrow={copy.skills}
            title={copy.skillsHeadline}
            description={copy.skillsIntroduction}
          />

          <div className="mt-16 border-t border-line">
            {copy.skillGroups.map((group, index) => (
              <div
                key={group.title}
                className="grid gap-4 border-b border-line py-7 md:grid-cols-[2rem_minmax(12rem,0.8fr)_minmax(0,1.7fr)] md:items-start md:gap-6"
              >
                <span className="font-mono text-xs text-accent">0{index + 1}</span>
                <h3 className="font-semibold text-foreground">{group.title}</h3>
                <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm leading-6 text-muted">
                  {group.items.map((item) => (
                    <li key={item} className="before:mr-2 before:text-line before:content-['/']">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section id="experience" className="section-rule scroll-mt-20 py-20 sm:py-28">
        <Container>
          <SectionHeading
            index="04"
            eyebrow={copy.experience}
            title={copy.experienceHeadline}
            description={copy.experienceIntroduction}
          />

          <ol className="mt-16 grid border-t border-line lg:grid-cols-3">
            {copy.experienceSteps.map((step) => (
              <li
                key={step.number}
                className="relative border-b border-line py-8 lg:border-b-0 lg:border-r lg:px-8 lg:first:pl-0 lg:last:border-r-0 lg:last:pr-0"
              >
                <span className="font-mono text-xs text-accent">{step.number}</span>
                <h3 className="mt-8 text-xl font-semibold tracking-tight text-foreground">
                  {step.title}
                </h3>
                <p className="mt-4 max-w-sm text-sm leading-7 text-muted">{step.body}</p>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      <section id="contact" className="section-rule scroll-mt-20 py-20 sm:py-28 lg:py-36">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)]">
            <div className="flex items-start gap-3 font-mono text-xs uppercase tracking-[0.18em] text-muted">
              <span className="text-accent">05</span>
              <span>{copy.contact}</span>
            </div>

            <div>
              <h2 className="max-w-4xl text-4xl font-semibold leading-[1.05] tracking-[-0.04em] text-foreground sm:text-6xl lg:text-7xl">
                {copy.contactHeadline}
              </h2>
              <p className="mt-7 max-w-2xl text-lg leading-8 text-muted">{copy.contactBody}</p>
              <dl className="mt-9 grid gap-x-8 gap-y-6 border-t border-line pt-7 sm:grid-cols-2">
                <ContactDetail label={copy.contactName}>{profile.name}</ContactDetail>
                <ContactDetail label={copy.contactEmail}>
                  <a href={`mailto:${profile.email}`} className="break-all underline decoration-line underline-offset-4 hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent">{profile.email}</a>
                </ContactDetail>
                <ContactDetail label={copy.contactPhone}>
                  <a href={profile.phoneHref} className="underline decoration-line underline-offset-4 hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent">{profile.phone}</a>
                </ContactDetail>
                <ContactDetail label={copy.contactLocation}>{profile.location}</ContactDetail>
              </dl>
              <div className="mt-10 flex flex-wrap items-center gap-x-7 gap-y-5">
              <a
                href={`mailto:${profile.email}`}
                className="group inline-flex min-h-12 items-center gap-3 bg-accent px-5 py-3 text-sm font-semibold text-background transition-colors hover:bg-accent-soft focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
              >
                {copy.contactCta}
                <ArrowIcon />
              </a>
              <a
                href={profile.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex min-h-11 items-center gap-2 border-b border-line py-2 text-sm font-semibold text-foreground transition-colors hover:border-accent hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
              >
                {copy.github}
                <ExternalIcon />
              </a>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}

function ContactDetail({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="min-w-0">
      <dt className="font-mono text-xs uppercase tracking-[0.14em] text-muted">{label}</dt>
      <dd className="mt-2 text-base text-foreground">{children}</dd>
    </div>
  );
}

function SystemMap() {
  return (
    <div
      aria-hidden="true"
      className="reveal reveal-delay-2 relative mx-auto hidden aspect-square w-full max-w-[28rem] border border-line bg-surface/60 p-6 lg:block"
    >
      <div className="absolute left-6 top-6 font-mono text-[0.6rem] uppercase tracking-[0.14em] text-muted">
        system / map
      </div>
      <div className="absolute right-6 top-6 flex items-center gap-2 font-mono text-[0.6rem] uppercase tracking-[0.14em] text-accent">
        <span className="signal-pulse size-1.5 rounded-full bg-accent" /> live
      </div>
      <div className="absolute inset-x-12 top-[29%] h-px bg-line" />
      <div className="absolute inset-y-12 left-1/2 w-px bg-line" />

      <SystemNode className="left-[10%] top-[22%]" label="UI" />
      <SystemNode className="right-[10%] top-[22%]" label="API" active />
      <SystemNode className="bottom-[18%] left-[10%]" label="DATA" />
      <SystemNode className="bottom-[18%] right-[10%]" label="OPS" />

      <div className="absolute left-1/2 top-1/2 flex size-20 -translate-x-1/2 -translate-y-1/2 items-center justify-center border border-accent/50 bg-background font-mono text-[0.65rem] uppercase tracking-[0.14em] text-accent">
        domain
      </div>
      <span className="absolute bottom-6 left-6 font-mono text-[0.6rem] text-muted">01—04 CONNECTED</span>
    </div>
  );
}

function SystemNode({
  className,
  label,
  active = false,
}: {
  className: string;
  label: string;
  active?: boolean;
}) {
  return (
    <div className={`absolute flex size-16 items-center justify-center border bg-background font-mono text-[0.62rem] tracking-[0.12em] ${active ? "border-accent text-accent" : "border-line text-muted"} ${className}`}>
      {label}
    </div>
  );
}

function ArrowIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 16 16" className="size-4 transition-transform group-hover:translate-x-1" fill="none">
      <path d="M2 8h11M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

function ExternalIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 16 16" className="size-3.5" fill="none">
      <path d="M6 3h7v7M13 3 5 11" stroke="currentColor" strokeWidth="1.5" />
      <path d="M11 9v4H3V5h4" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}
