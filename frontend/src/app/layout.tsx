import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";

import AppShell from "@/components/layout/AppShell";

import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const jetBrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "QuantFlow",
  description: "Professional quantitative trading platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${jetBrainsMono.variable} dark h-full`}
    >
      <body className="min-h-full bg-[#0a1120] font-[var(--font-inter)] text-[#d8dfef] antialiased">
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}