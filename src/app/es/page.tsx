import type { Metadata } from "next";

import { HomePageContent } from "@/components/pages/home-page";

export const metadata: Metadata = {
  title: {
    absolute: "Dilan Peredo | Ingeniero de Software",
  },
  description:
    "Ingeniero de Software especializado en .NET, TypeScript, Angular, React y sistemas empresariales.",
};

export default function SpanishHome() {
  return <HomePageContent locale="es" />;
}

