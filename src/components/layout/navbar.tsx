import Link from "next/link";
import { Container } from "../ui/container";

export function Navbar() {
  return (
    <header className="border-b border-zinc-800">
      <Container>
        <nav className="flex h-16 items-center justify-between">
          <Link
            href="/"
            className="font-semibold tracking-tight text-white"
          >
            Dilan Peredo
          </Link>

          <div className="flex items-center gap-6 text-sm text-zinc-400">
            <Link
              href="/projects"
              className="transition-colors hover:text-white"
            >
              Projects
            </Link>

            <a
              href="#about"
              className="transition-colors hover:text-white"
            >
              About
            </a>

            <a
              href="#contact"
              className="transition-colors hover:text-white"
            >
              Contact
            </a>
          </div>
        </nav>
      </Container>
    </header>
  );
}