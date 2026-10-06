"use client";

import { usePathname } from "next/navigation";

import { Container } from "@/components/ui/container";
import { profile } from "@/data/profile";
import { siteCopy } from "@/i18n/copy";

export function Footer() {
  const pathname = usePathname();
  const locale = pathname === "/es" || pathname.startsWith("/es/") ? "es" : "en";
  const copy = siteCopy[locale].footer;
  const localeRoot = locale === "es" ? "/es" : "";

  return (
    <footer className="section-rule py-10">
      <Container className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <a
            href={`${localeRoot || "/"}#top`}
            aria-label={siteCopy[locale].navigation.home}
            title={siteCopy[locale].navigation.homeTitle}
            className="inline-flex items-center gap-3 font-semibold tracking-tight text-foreground transition-colors hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
          >
            <span className="flex size-8 items-center justify-center border border-line font-mono text-xs text-accent">
              DP
            </span>
            Dilan Peredo
          </a>
          <p className="mt-4 max-w-md text-sm leading-6 text-muted">
            {copy.description}
          </p>
          <a href={`mailto:${profile.email}`} className="mt-3 inline-block break-all text-sm text-muted underline decoration-line underline-offset-4 hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent">
            {profile.email}
          </a>
        </div>

        <p className="font-mono text-xs uppercase tracking-[0.12em] text-muted">
          © {new Date().getFullYear()} · {copy.rights}
        </p>
      </Container>
    </footer>
  );
}
