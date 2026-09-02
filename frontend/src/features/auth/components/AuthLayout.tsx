"use client";

import { ReactNode } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Shield } from "lucide-react";
import AuthShowcase from "./AuthShowcase";
import { QuantFlowLogo } from "@/components/common/QuantFlowLogo";

type AuthLayoutProps = {
  children: ReactNode;
  title: string;
  subtitle: string;
};

export default function AuthLayout({
  children,
  title,
  subtitle,
}: AuthLayoutProps) {
  return (
    <div className="flex min-h-screen w-full bg-[#050A12] text-slate-100 selection:bg-indigo-500 selection:text-white">
      {/* Left Column Showcase (Desktop) */}
      <AuthShowcase />

      {/* Right Column Form Container */}
      <div className="relative flex w-full flex-col justify-between p-6 sm:p-10 lg:w-1/2 lg:p-12 overflow-hidden">
        {/* Background glow for form */}
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute right-0 top-1/4 size-80 rounded-full bg-indigo-600/15 blur-3xl pointer-events-none"
        />

        {/* Top Bar Header */}
        <div className="relative z-10 flex items-center justify-between">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-3.5 py-1.5 text-xs font-semibold text-slate-300 transition hover:bg-white/[0.08] hover:text-white"
          >
            <ArrowLeft className="size-3.5" />
            Back to Home
          </Link>

          {/* Unified Brand Logo for Mobile */}
          <div className="flex items-center lg:hidden">
            <QuantFlowLogo className="size-7" textClassName="text-sm font-extrabold" />
          </div>
        </div>

        {/* Center Clerk Form Wrapper with Framer Motion */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="relative z-10 my-auto flex w-full flex-col items-center justify-center py-6"
        >
          <div className="w-full max-w-md space-y-6">
            <div className="text-center space-y-2.5">
              {/* Unified Brand Logo */}
              <div className="flex justify-center">
                <QuantFlowLogo className="size-12" withText={false} />
              </div>
              <h1 className="text-2xl font-extrabold tracking-tight text-white sm:text-3xl">
                {title}
              </h1>
              <p className="text-xs sm:text-sm text-slate-400">{subtitle}</p>
            </div>

            {/* Form Target */}
            <div className="flex justify-center w-full">
              {children}
            </div>
          </div>
        </motion.div>

        {/* Footer */}
        <div className="relative z-10 flex items-center justify-between border-t border-white/5 pt-4 text-xs text-slate-500">
          <div className="flex items-center gap-1.5">
            <Shield className="size-3.5 text-emerald-400" />
            <span>256-bit SSL Encrypted & Clerk Authenticated</span>
          </div>
          <span>© {new Date().getFullYear()} QuantFlow</span>
        </div>
      </div>
    </div>
  );
}
