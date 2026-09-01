"use client";

import React from "react";
import Link from "next/link";
import { useUser } from "@clerk/nextjs";
import { motion } from "framer-motion";
import {
  Zap,
  ArrowRight,
  Sparkles,
  Mail,
} from "lucide-react";

import { GithubLogo, LinkedinLogo } from "@/components/icons/BrandLogos";
import DeveloperProfileCard from "@/features/about/components/DeveloperProfileCard";
import InspirationCard from "@/features/about/components/InspirationCard";
import HackCentralCard from "@/features/about/components/HackCentralCard";
import SkillsMatrixCard from "@/features/about/components/SkillsMatrixCard";
import SystemPillarsCard from "@/features/about/components/SystemPillarsCard";

export default function AboutContent() {
  const { isSignedIn } = useUser();

  return (
    <div className={`relative ${isSignedIn ? 'w-full' : 'min-h-screen bg-[#030712]'} text-slate-100 selection:bg-indigo-500 selection:text-white overflow-hidden`}>
      {/* Dynamic Ambient Background Glows */}
      {!isSignedIn && (
        <>
          <div className="absolute inset-0 bg-[radial-gradient(#334155_1px,transparent_1px)] [background-size:32px_32px] opacity-20 pointer-events-none" />
          <motion.div
            animate={{ opacity: [0.1, 0.18, 0.1] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -top-40 left-1/2 -translate-x-1/2 size-[650px] rounded-full bg-indigo-900/20 blur-[160px] pointer-events-none"
          />
        </>
      )}

      {/* Navigation Header (Only displayed when logged out; when logged in, TopNavbar & Sidebar render) */}
      {!isSignedIn && (
        <header className="sticky top-0 z-50 border-b border-white/10 bg-[#030712]/80 backdrop-blur-2xl">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
            <Link href="/" className="flex items-center gap-2.5 group">
              <motion.div
                whileHover={{ rotate: 180 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="flex size-8 items-center justify-center rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-500 shadow-lg shadow-indigo-500/30"
              >
                <Zap className="size-4 text-white fill-current" />
              </motion.div>
              <span className="text-lg font-extrabold tracking-tight text-white">
                Quant<span className="text-indigo-400">Flow</span>
              </span>
            </Link>

            <nav className="hidden md:flex items-center gap-8 text-xs font-semibold text-slate-300">
              <Link href="/" className="hover:text-indigo-400 transition-colors">Home</Link>
              <Link href="/about" className="text-indigo-400 font-bold">About Developer</Link>
              <Link href="/strategies" className="hover:text-indigo-400 transition-colors">Strategies</Link>
              <Link href="/terms" className="hover:text-indigo-400 transition-colors">Terms</Link>
              <Link href="/contact" className="hover:text-indigo-400 transition-colors">Contact</Link>
            </nav>

            <div className="flex items-center gap-3">
              <Link
                href="/sign-in"
                className="text-xs font-semibold text-slate-300 hover:text-white px-3 py-2 transition-colors"
              >
                Sign In
              </Link>
              <Link
                href="/sign-up"
                className="group flex items-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 px-4 py-2.5 text-xs font-bold text-white shadow-lg shadow-indigo-500/25 hover:from-indigo-500 hover:to-violet-500 transition-all"
              >
                <span>Start Free</span>
                <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </header>
      )}

      {/* Hero Section */}
      <section className="relative mx-auto max-w-6xl px-6 pt-16 sm:pt-20 pb-16 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-6"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-4 py-1.5 text-xs font-semibold text-indigo-300 backdrop-blur-xl">
            <Sparkles className="size-3.5 text-indigo-400" />
            <span>Engineered Solo with Precision</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white max-w-4xl mx-auto leading-[1.15]">
            Meet the Solo Engineer Behind <br />
            <span className="text-indigo-400">
              QuantFlow Terminal
            </span>
          </h1>

          <p className="text-base sm:text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Architected and engineered end-to-end by <strong className="text-slate-100">Devashish Haldar</strong> — bridging high-performance C++ quantitative execution with institutional-grade web interfaces.
          </p>

          {/* Social Links Badge with Official Brand SVG Logos */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <a
              href="https://github.com/devashishhaldar2006"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-xl border border-slate-800 bg-slate-900/90 px-4 py-2 text-xs font-semibold text-slate-300 hover:border-slate-700 hover:text-white transition-all shadow-md"
            >
              <GithubLogo className="size-4 text-white" />
              <span>devashishhaldar2006</span>
            </a>
            <a
              href="https://linkedin.com/in/devashish-haldar-dev"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-xl border border-slate-800 bg-slate-900/90 px-4 py-2 text-xs font-semibold text-slate-300 hover:border-indigo-500/40 hover:text-white transition-all shadow-md"
            >
              <LinkedinLogo className="size-4 text-[#0A66C2]" />
              <span>devashish-haldar-dev</span>
            </a>
            <a
              href="mailto:workfordevashishhaldar@gmail.com"
              className="flex items-center gap-2 rounded-xl border border-slate-800 bg-slate-900/90 px-4 py-2 text-xs font-semibold text-slate-300 hover:border-slate-700 hover:text-white transition-all shadow-md"
            >
              <Mail className="size-4 text-indigo-400" />
              <span>workfordevashishhaldar@gmail.com</span>
            </a>
          </div>
        </motion.div>
      </section>

      {/* Main Grid Component Sections */}
      <section className="mx-auto max-w-6xl px-6 pb-20 space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <DeveloperProfileCard />
          <InspirationCard />
        </div>

        <HackCentralCard />

        <SkillsMatrixCard />

        <SystemPillarsCard />

        {/* Call To Action */}
        <div className="text-center pt-8 space-y-6">
          <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-100">
            Ready to explore QuantFlow in action?
          </h3>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href={isSignedIn ? "/dashboard" : "/sign-up"}
              className="group flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 px-8 py-3.5 text-xs font-bold text-white shadow-xl shadow-indigo-500/25 hover:from-indigo-500 hover:to-violet-500 transition-all"
            >
              <span>{isSignedIn ? "Launch Terminal Console" : "Get Started Free"}</span>
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <a
              href="https://github.com/devashishhaldar2006/QuantFlow"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 rounded-xl border border-slate-800 bg-slate-900/80 px-7 py-3.5 text-xs font-semibold text-slate-200 hover:bg-slate-800 transition-all"
            >
              <GithubLogo className="size-4 text-slate-300" />
              <span>QuantFlow Repository</span>
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 bg-[#02050E] py-8 text-center text-xs text-slate-500">
        <p>© {new Date().getFullYear()} QuantFlow Terminal — Engineered by Devashish Haldar.</p>
      </footer>
    </div>
  );
}
