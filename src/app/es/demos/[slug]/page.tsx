import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { SapDemo } from "@/features/demos/sap-demo";
import { ZazuWorkspace } from "@/features/demos/zazu/workspace";
import { ZazuBot } from "@/features/demos/zazu/bot";

import { ComprasYaDemo } from "@/features/demos/comprasya-demo";

interface SpanishDemoPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return [{ slug: "comprasya" }, { slug: "sap" }, { slug: "zazu" }, { slug: "zazu-bot" }];
}

export async function generateMetadata({ params }: SpanishDemoPageProps): Promise<Metadata> {
  const { slug } = await params;
  if (slug === "zazu" || slug === "zazu-bot") return {
    title: slug === "zazu" ? "Demo de operaciones Zazu" : "Demo del bot Zazu por reglas",
    description: slug === "zazu" ? "Explora CRM, embudos de conversación, agenda, servicios y reportes con datos ficticios." : "Sigue una conversación por menús que genera una reserva ficticia. Sin IA ni conexión real a WhatsApp.",
  };
  if (slug === "sap") return {
    title: "Demo interactiva de operaciones SAP",
    description: "Explora una demo de backoffice con cinco pantallas y datos ficticios de ventas, cobranzas, inventario y clientes.",
  };
  if (slug !== "comprasya") return {};

  return {
    title: "Demo interactiva de ComprasYa",
    description: "Demostración interactiva sanitizada del flujo empresarial de compras de ComprasYa.",
  };
}

export default async function SpanishDemoPage({ params }: SpanishDemoPageProps) {
  const { slug } = await params;
  if (slug === "zazu") return <ZazuWorkspace locale="es" />;
  if (slug === "zazu-bot") return <ZazuBot locale="es" />;
  if (slug === "sap") return <SapDemo locale="es" />;
  if (slug !== "comprasya") notFound();

  return <ComprasYaDemo locale="es" />;
}
