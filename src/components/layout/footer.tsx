"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { Container } from "@/components/ui/container";
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
          <Link
            href={localeRoot || "/"}
            className="inline-flex items-center gap-3 font-semibold tracking-tight text-foreground focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
          >
            <span className="flex size-8 items-center justify-center border border-line font-mono text-xs text-accent">
              DP
            </span>
            Dilan Peredo
          </Link>
          <p className="mt-4 max-w-md text-sm leading-6 text-muted">
            {copy.description}
          </p>
        </div>

        <p className="font-mono text-xs uppercase tracking-[0.12em] text-muted">
          © {new Date().getFullYear()} · {copy.rights}
        </p>
      </Container>
    </footer>
  );
}
