"use client";

import React from "react";
import Link from "next/link";
import { useUser } from "@clerk/nextjs";
import { ArrowRight, Mail } from "lucide-react";
import { GithubLogo, LinkedinLogo } from "@/components/icons/BrandLogos";
import DeveloperProfileCard from "@/features/about/components/DeveloperProfileCard";
import InspirationCard from "@/features/about/components/InspirationCard";
import HackCentralCard from "@/features/about/components/HackCentralCard";
import SkillsMatrixCard from "@/features/about/components/SkillsMatrixCard";
import SystemPillarsCard from "@/features/about/components/SystemPillarsCard";
import { QuantFlowLogo } from "@/components/common/QuantFlowLogo";

export default function AboutContent() {
  const { isSignedIn } = useUser();

  return (
    <div className={`min-h-screen bg-white text-zinc-900 selection:bg-zinc-900 selection:text-white`}>
      {/* Navigation Header (Only displayed when logged out; when logged in, TopNavbar & Sidebar render) */}
      {!isSignedIn && (
        <header className="sticky top-0 z-50 border-b border-zinc-200 bg-white/95 backdrop-blur-md">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3.5">
            <Link href="/" className="flex items-center">
              <QuantFlowLogo className="size-6" textClassName="text-base font-semibold tracking-tight" />
            </Link>

            <nav className="hidden md:flex items-center gap-7 text-xs font-medium text-zinc-600">
              <Link href="/" className="hover:text-zinc-950 transition-colors">Home</Link>
              <Link href="/about" className="text-zinc-950 font-semibold underline underline-offset-4">About Developer</Link>
              <Link href="/terms" className="hover:text-zinc-950 transition-colors">Terms</Link>
              <Link href="/contact" className="hover:text-zinc-950 transition-colors">Contact</Link>
            </nav>

            <div className="flex items-center gap-4">
              <Link
                href="/sign-in"
                className="text-xs font-medium text-zinc-600 hover:text-zinc-950 transition-colors"
              >
                Sign In
              </Link>
              <Link
                href="/sign-up"
                className="inline-flex items-center gap-1.5 rounded-md bg-zinc-950 px-3.5 py-1.5 text-xs font-medium text-white hover:bg-zinc-800 transition-colors shadow-sm"
              >
                <span>Start Free</span>
                <ArrowRight className="size-3.5" />
              </Link>
            </div>
          </div>
        </header>
      )}

      {/* Hero Section */}
      <section className="mx-auto max-w-6xl px-6 pt-16 pb-14 text-center">
        <div className="space-y-4 max-w-3xl mx-auto">
          <p className="text-xs font-mono uppercase tracking-wider text-zinc-400">
            ENGINEERING_PROFILE
          </p>

          <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight text-zinc-950 leading-tight">
            Meet the Solo Engineer Behind <br />
            QuantFlow Terminal
          </h1>

          <p className="text-base text-zinc-600 leading-relaxed max-w-2xl mx-auto">
            Architected and engineered end-to-end by <strong className="text-zinc-900 font-semibold">Devashish Haldar</strong> — bridging high-performance C++ quantitative execution with institutional-grade web interfaces.
          </p>

          {/* Social Links */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-3">
            <a
              href="https://github.com/devashishhaldar2006"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-md border border-zinc-200 bg-zinc-50 px-3.5 py-2 text-xs font-mono text-zinc-700 hover:border-zinc-400 hover:text-zinc-950 transition-colors"
            >
              <GithubLogo className="size-4 text-zinc-900" />
              <span>devashishhaldar2006</span>
            </a>
            <a
              href="https://linkedin.com/in/devashish-haldar-dev"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-md border border-zinc-200 bg-zinc-50 px-3.5 py-2 text-xs font-mono text-zinc-700 hover:border-zinc-400 hover:text-zinc-950 transition-colors"
            >
              <LinkedinLogo className="size-4 text-[#0A66C2]" />
              <span>devashish-haldar-dev</span>
            </a>
            <a
              href="mailto:workfordevashishhaldar@gmail.com"
              className="flex items-center gap-2 rounded-md border border-zinc-200 bg-zinc-50 px-3.5 py-2 text-xs font-mono text-zinc-700 hover:border-zinc-400 hover:text-zinc-950 transition-colors"
            >
              <Mail className="size-4 text-zinc-600" />
              <span>workfordevashishhaldar@gmail.com</span>
            </a>
          </div>
        </div>
      </section>

      {/* Main Grid Component Sections */}
      <section className="mx-auto max-w-6xl px-6 pb-20 space-y-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <DeveloperProfileCard />
          <InspirationCard />
        </div>

        <HackCentralCard />

        <SkillsMatrixCard />

        <SystemPillarsCard />

        {/* Call To Action */}
        <div className="text-center pt-8 space-y-5 border-t border-zinc-200">
          <h3 className="text-2xl font-semibold text-zinc-950">
            Ready to explore QuantFlow in action?
          </h3>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href={isSignedIn ? "/dashboard" : "/sign-up"}
              className="inline-flex items-center justify-center gap-2 rounded-md bg-zinc-950 px-6 py-2.5 text-xs font-medium text-white hover:bg-zinc-800 transition-colors shadow-sm"
            >
              <span>{isSignedIn ? "Launch Terminal Console" : "Get Started Free"}</span>
              <ArrowRight className="size-3.5" />
            </Link>
            <a
              href="https://github.com/devashishhaldar2006/QuantFlow"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-md border border-zinc-300 bg-white px-5 py-2.5 text-xs font-medium text-zinc-800 hover:bg-zinc-50 transition-colors"
            >
              <GithubLogo className="size-4 text-zinc-900" />
              <span>QuantFlow Repository</span>
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-zinc-200 bg-zinc-50 py-8 text-center text-xs text-zinc-500 font-mono">
        <p>© {new Date().getFullYear()} QuantFlow Terminal — Engineered by Devashish Haldar.</p>
      </footer>
    </div>
  );
}
