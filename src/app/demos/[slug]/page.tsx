import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { SapDemo } from "@/features/demos/sap-demo";
import { ZazuWorkspace } from "@/features/demos/zazu/workspace";
import { ZazuBot } from "@/features/demos/zazu/bot";

import { ComprasYaDemo } from "@/features/demos/comprasya-demo";

interface DemoPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return [{ slug: "comprasya" }, { slug: "sap" }, { slug: "zazu" }, { slug: "zazu-bot" }];
}

export async function generateMetadata({ params }: DemoPageProps): Promise<Metadata> {
  const { slug } = await params;
  if (slug === "zazu" || slug === "zazu-bot") return {
    title: slug === "zazu" ? "Zazu Operations Demo" : "Zazu Rule-Based Bot Demo",
    description: slug === "zazu" ? "Explore CRM, conversation pipelines, appointments, services and reports with fictional data." : "Follow a menu-driven bot conversation that creates a fictional booking. No AI or live WhatsApp connection.",
  };
  if (slug === "sap") return {
    title: "SAP Operations Interactive Demo",
    description: "Explore a five-screen backoffice portfolio demo with fictional sales, collections, inventory and customer records.",
  };
  if (slug !== "comprasya") return {};

  return {
    title: "ComprasYa Interactive Demo",
    description: "A sanitized interactive demonstration of the ComprasYa enterprise procurement workflow.",
  };
}

export default async function DemoPage({ params }: DemoPageProps) {
  const { slug } = await params;
  if (slug === "zazu") return <ZazuWorkspace locale="en" />;
  if (slug === "zazu-bot") return <ZazuBot locale="en" />;
  if (slug === "sap") return <SapDemo locale="en" />;
  if (slug !== "comprasya") notFound();

  return <ComprasYaDemo locale="en" />;
}
