import Link from "next/link";
import { Zap, ArrowLeft, ShieldCheck } from "lucide-react";

type LegalPageLayoutProps = {
  title: string;
  subtitle: string;
  lastUpdated: string;
  children: React.ReactNode;
};

export default function LegalPageLayout({
  title,
  subtitle,
  lastUpdated,
  children,
}: LegalPageLayoutProps) {
  return (
    <div className="min-h-screen bg-[#030712] text-slate-100 selection:bg-indigo-500 selection:text-white">
      {/* Top Navbar */}
      <header className="sticky top-0 z-50 border-b border-white/10 bg-[#050A12]/90 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="flex size-8 items-center justify-center rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-500 shadow-lg shadow-indigo-500/30">
              <Zap className="size-4 text-white fill-current" />
            </div>
            <span className="text-lg font-extrabold tracking-tight text-white">
              Quant<span className="text-indigo-400">Flow</span>
            </span>
          </Link>

          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="flex items-center gap-1.5 text-xs font-semibold text-slate-400 hover:text-white transition-colors"
            >
              <ArrowLeft className="size-3.5" />
              Back to Home
            </Link>
            <Link
              href="/sign-in"
              className="rounded-xl bg-indigo-600 px-4 py-2 text-xs font-bold text-white shadow-lg shadow-indigo-500/20 hover:bg-indigo-500 transition-all"
            >
              Terminal Login
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-4xl px-6 py-12 sm:py-16">
        <div className="space-y-4 text-center sm:text-left mb-10">
          <div className="inline-flex items-center gap-2 rounded-full border border-indigo-500/20 bg-indigo-500/10 px-3.5 py-1 text-xs font-semibold text-indigo-400">
            <ShieldCheck className="size-3.5" />
            Legal & Compliance Information
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            {title}
          </h1>
          <p className="text-sm text-slate-400 max-w-2xl">{subtitle}</p>
          <p className="text-xs font-mono text-slate-500">
            Last Updated: {lastUpdated}
          </p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-6 sm:p-10 backdrop-blur-2xl shadow-2xl space-y-8 text-slate-300 text-sm leading-relaxed">
          {children}
        </div>
      </main>

      {/* Legal Footer */}
      <footer className="border-t border-white/10 bg-[#040810] py-8">
        <div className="mx-auto max-w-7xl px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} QuantFlow Technologies. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link href="/terms" className="hover:text-slate-300">Terms of Service</Link>
            <Link href="/privacy" className="hover:text-slate-300">Privacy Policy</Link>
            <Link href="/refund" className="hover:text-slate-300">Refund Policy</Link>
            <Link href="/contact" className="hover:text-slate-300">Contact Us</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
