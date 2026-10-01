"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { siteCopy } from "@/i18n/copy";

import { Container } from "../ui/container";

export function Navbar() {
  const pathname = usePathname();
  const isSpanish = pathname === "/es" || pathname.startsWith("/es/");
  const locale = isSpanish ? "es" : "en";
  const copy = siteCopy[locale].navigation;
  const localeRoot = isSpanish ? "/es" : "";
  const languageHref = isSpanish
    ? pathname.replace(/^\/es(?=\/|$)/, "") || "/"
    : `/es${pathname === "/" ? "" : pathname}`;

  return (
    <header
      lang={locale}
      className="sticky top-0 z-50 border-b border-line bg-background/95 backdrop-blur-sm"
    >
      <Container>
        <nav className="flex h-[4.5rem] items-center justify-between" aria-label="Primary navigation">
          <Link
            href={localeRoot || "/"}
            className="inline-flex items-center gap-3 font-semibold tracking-tight text-foreground focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
          >
            <span className="flex size-8 items-center justify-center border border-line font-mono text-[0.65rem] text-accent transition-colors group-hover:border-accent">
              DP
            </span>
            <span className="hidden sm:inline">Dilan Peredo</span>
          </Link>

          <div className="flex items-center gap-4 font-mono text-xs uppercase tracking-[0.12em] text-muted sm:gap-6">
            <Link
              href={`${localeRoot}/projects`}
              className="transition-colors hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
            >
              {copy.projects}
            </Link>

            <Link
              href={`${localeRoot || "/"}#about`}
              className="hidden transition-colors hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent md:inline"
            >
              {copy.about}
            </Link>

            <Link
              href={`${localeRoot || "/"}#skills`}
              className="hidden transition-colors hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent lg:inline"
            >
              {copy.skills}
            </Link>

            <Link
              href={`${localeRoot || "/"}#contact`}
              className="hidden transition-colors hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent sm:inline"
            >
              {copy.contact}
            </Link>

            <Link
              href={languageHref}
              hrefLang={isSpanish ? "en" : "es"}
              aria-label={copy.switchLanguage}
              title={copy.switchLanguage}
              className="border-l border-line pl-4 font-semibold text-foreground transition-colors hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent sm:pl-6"
            >
              {copy.switchLanguageShort}
            </Link>
          </div>
        </nav>
      </Container>
    </header>
  );
}
