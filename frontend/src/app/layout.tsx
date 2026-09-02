import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";

import AppShell from "@/components/layout/AppShell";

import "./globals.css";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://quantflow-jade.vercel.app"),
  title: {
    default: "QuantFlow | Institutional Quantitative Research Terminal",
    template: "%s | QuantFlow",
  },
  description:
    "Institutional-grade quantitative backtesting platform. Build, optimize, and execute high-frequency algorithmic strategies in C++ with sub-millisecond tick precision.",
  keywords: [
    "quantitative trading",
    "algorithmic trading",
    "backtesting engine",
    "C++ quant engine",
    "institutional trading",
    "market data",
    "portfolio analytics",
    "Sharpe ratio",
    "drawdown analysis",
  ],
  authors: [{ name: "Devashish Haldar", url: "https://github.com/devashishhaldar2006" }],
  creator: "Devashish Haldar",
  publisher: "QuantFlow Terminal",
  icons: {
    icon: "/logo.svg",
    shortcut: "/logo.svg",
    apple: "/logo.svg",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://quantflow-jade.vercel.app",
    title: "QuantFlow | Institutional Quantitative Research Terminal",
    description:
      "Design, backtest, and deploy high-frequency quantitative strategies with ultra low-latency C++ execution.",
    siteName: "QuantFlow",
  },
  twitter: {
    card: "summary_large_image",
    title: "QuantFlow | Institutional Quantitative Research Terminal",
    description:
      "High-frequency algorithmic trading and research terminal powered by high performance C++ and Next.js.",
    creator: "@quantflow",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${jetbrainsMono.variable} dark h-full`}
    >
      <body className="min-h-full bg-slate-950 font-sans text-slate-100 antialiased">
        <ClerkProvider appearance={{ theme: dark }}>
          <AppShell>{children}</AppShell>
        </ClerkProvider>
      </body>
    </html>
  );
}