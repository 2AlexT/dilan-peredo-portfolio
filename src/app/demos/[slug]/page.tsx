import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ComprasYaDemo } from "@/features/demos/comprasya-demo";

interface DemoPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return [{ slug: "comprasya" }];
}

export async function generateMetadata({ params }: DemoPageProps): Promise<Metadata> {
  const { slug } = await params;
  if (slug !== "comprasya") return {};

  return {
    title: "ComprasYa Interactive Demo",
    description: "A sanitized interactive demonstration of the ComprasYa enterprise procurement workflow.",
  };
}

export default async function DemoPage({ params }: DemoPageProps) {
  const { slug } = await params;
  if (slug !== "comprasya") notFound();

  return <ComprasYaDemo locale="en" />;
}
