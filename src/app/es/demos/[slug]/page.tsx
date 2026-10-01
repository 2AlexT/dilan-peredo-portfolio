import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ComprasYaDemo } from "@/features/demos/comprasya-demo";

interface SpanishDemoPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return [{ slug: "comprasya" }];
}

export async function generateMetadata({ params }: SpanishDemoPageProps): Promise<Metadata> {
  const { slug } = await params;
  if (slug !== "comprasya") return {};

  return {
    title: "Demo interactiva de ComprasYa",
    description: "Demostración interactiva sanitizada del flujo empresarial de compras de ComprasYa.",
  };
}

export default async function SpanishDemoPage({ params }: SpanishDemoPageProps) {
  const { slug } = await params;
  if (slug !== "comprasya") notFound();

  return <ComprasYaDemo locale="es" />;
}
