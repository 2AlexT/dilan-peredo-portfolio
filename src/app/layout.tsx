import type { Metadata } from "next";

import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";
import { RouteTransition } from "@/components/ui/route-transition";
import { profile } from "@/data/profile";

import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Dilan Peredo | Software Engineer",
    template: "%s | Dilan Peredo",
  },
  description:
    "Software Engineer specializing in .NET, TypeScript, Angular, React and enterprise software systems.",
  applicationName: "Dilan Peredo — Software Engineer",
  authors: [{ name: profile.name }],
  keywords: [
    "Software Engineer",
    "Full Stack Developer",
    ".NET",
    "TypeScript",
    "Angular",
    "React",
    "Enterprise Software",
  ],
  openGraph: {
    type: "website",
    title: "Dilan Peredo | Software Engineer",
    description:
      "Full-stack software engineer building dependable business systems and enterprise integrations.",
    siteName: "Dilan Peredo",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body id="top" className="bg-background text-foreground antialiased">
        <RouteTransition />
        <a
          href="#main-content"
          className="fixed left-4 top-4 z-[100] -translate-y-24 bg-accent px-4 py-2 text-sm font-semibold text-background transition-transform focus:translate-y-0"
        >
          Skip to content
        </a>
        <Navbar />

        {children}
        <Footer />
      </body>
    </html>
  );
}
