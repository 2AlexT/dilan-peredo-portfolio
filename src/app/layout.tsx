import type { Metadata } from "next";

import { Navbar } from "@/components/layout/navbar";

import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Dilan Peredo | Software Engineer",
    template: "%s | Dilan Peredo",
  },
  description:
    "Software Engineer specializing in .NET, TypeScript, Angular, React and enterprise software systems.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-black text-white antialiased">
        <Navbar />

        {children}
      </body>
    </html>
  );
}