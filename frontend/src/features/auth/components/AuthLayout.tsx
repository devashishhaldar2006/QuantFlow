"use client";

import { ReactNode } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
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
    <div className="flex min-h-screen w-full bg-white text-zinc-900 selection:bg-zinc-900 selection:text-white">
      {/* Left Column Showcase (Desktop) */}
      <AuthShowcase />

      {/* Right Column Form Container */}
      <div className="relative flex w-full flex-col justify-between p-6 sm:p-10 lg:w-1/2 lg:p-12 overflow-hidden bg-white">
        {/* Top Bar Header */}
        <div className="relative z-10 flex items-center justify-between">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-md border border-zinc-200 bg-zinc-50 px-3.5 py-1.5 text-xs font-medium text-zinc-700 transition hover:bg-zinc-100 hover:text-zinc-950"
          >
            <ArrowLeft className="size-3.5" />
            Back to Home
          </Link>

          {/* Unified Brand Logo for Mobile */}
          <div className="flex items-center lg:hidden">
            <QuantFlowLogo className="size-6" textClassName="text-sm font-semibold" />
          </div>
        </div>

        {/* Center Form Wrapper */}
        <div className="relative z-10 my-auto flex w-full flex-col items-center justify-center py-6">
          <div className="w-full max-w-md space-y-6">
            <div className="text-center space-y-2">
              <div className="flex justify-center">
                <QuantFlowLogo className="size-8" withText={false} />
              </div>
              <h1 className="text-2xl font-semibold tracking-tight text-zinc-950 sm:text-3xl">
                {title}
              </h1>
              <p className="text-xs sm:text-sm text-zinc-500">{subtitle}</p>
            </div>

            {/* Form Target */}
            <div className="flex justify-center w-full">
              {children}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="relative z-10 flex items-center justify-end border-t border-zinc-200 pt-4 text-xs text-zinc-500 font-mono">
          <span>© {new Date().getFullYear()} QuantFlow</span>
        </div>
      </div>
    </div>
  );
}
