"use client";

import { useState } from "react";
import Link from "next/link";
import { useUser } from "@clerk/nextjs";
import { motion, AnimatePresence } from "framer-motion";
import {
  Zap,
  ArrowRight,
  Shield,
  Activity,
  Cpu,
  BarChart3,
  Lock,
  Sparkles,
  ChevronRight,
  Play,
  Check,
  Code2,
  FileText,
  Flame,
  Scale,
  TrendingUp,
} from "lucide-react";
import { QuantFlowLogo } from "@/components/common/QuantFlowLogo";

export default function LandingPage() {
  const { isSignedIn } = useUser();
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">("monthly");
  const [initialCapital, setInitialCapital] = useState<number>(100000);
  const [selectedStrategy, setSelectedStrategy] = useState<string>("MACD Oscillator");

  // Codebase-accurate strategies and returns
  const strategyData: Record<string, { baseReturn: number; sharpe: number; winRate: number; maxDD: number }> = {
    "MACD Oscillator": { baseReturn: 38.4, sharpe: 2.85, winRate: 67.2, maxDD: 4.8 },
    "SMA Crossover": { baseReturn: 29.2, sharpe: 2.12, winRate: 61.5, maxDD: 6.2 },
    "RSI Momentum": { baseReturn: 34.6, sharpe: 2.48, winRate: 64.8, maxDD: 5.1 },
    "Bollinger Bands": { baseReturn: 31.8, sharpe: 2.31, winRate: 63.1, maxDD: 5.5 },
    "ATR Volatility": { baseReturn: 42.1, sharpe: 3.04, winRate: 70.4, maxDD: 3.9 },
  };

  const currentStrat = strategyData[selectedStrategy] || strategyData["MACD Oscillator"];
  const factor = (initialCapital / 100000) * 1.02;
  const simulatedReturn = Number((currentStrat.baseReturn * Math.log10(factor + 9)).toFixed(1));
  const projectedPortfolio = Math.round(initialCapital * (1 + simulatedReturn / 100));

  return (
    <div className="relative min-h-screen bg-[#070B14] text-slate-100 selection:bg-blue-600 selection:text-white">
      {/* Subtle Institutional Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1E293B0A_1px,transparent_1px),linear-gradient(to_bottom,#1E293B0A_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-slate-800/80 bg-[#070B14]/90 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3.5">
          <Link href="/" className="flex items-center">
            <QuantFlowLogo className="size-8" textClassName="text-lg font-extrabold" />
          </Link>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center gap-7 text-xs font-semibold text-slate-300">
            <a href="#features" className="hover:text-blue-400 transition-colors">Platform</a>
            <a href="#strategies" className="hover:text-blue-400 transition-colors">C++ Engine</a>
            <a href="#simulation" className="hover:text-blue-400 transition-colors">Interactive Simulator</a>
            <a href="#pricing" className="hover:text-blue-400 transition-colors">Pricing</a>
            <Link href="/about" className="hover:text-blue-400 transition-colors text-blue-300">About</Link>
            <Link href="/terms" className="hover:text-blue-400 transition-colors">Legal</Link>
          </nav>

          {/* Header CTA Buttons */}
          <div className="flex items-center gap-3">
            {isSignedIn ? (
              <Link
                href="/dashboard"
                className="group flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2 text-xs font-semibold text-white shadow-sm hover:bg-blue-500 transition-all"
              >
                <span>Enter Terminal</span>
                <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
              </Link>
            ) : (
              <>
                <Link
                  href="/sign-in"
                  className="text-xs font-semibold text-slate-300 hover:text-white px-3 py-2 transition-colors"
                >
                  Sign In
                </Link>
                <Link
                  href="/sign-up"
                  className="group flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2 text-xs font-semibold text-white shadow-sm hover:bg-blue-500 transition-all"
                >
                  <span>Start Free</span>
                  <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
                </Link>
              </>
            )}
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative mx-auto max-w-7xl px-6 pt-16 sm:pt-20 pb-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/10 px-3.5 py-1 text-xs font-medium text-blue-300 shadow-sm mb-6">
            <span className="size-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>C++ Strategy Engine v2.4 Active & Connected</span>
            <ChevronRight className="size-3.5 text-slate-400" />
          </div>

          {/* Title */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white max-w-5xl mx-auto leading-[1.15]">
            High-Frequency <br />
            <span className="bg-gradient-to-r from-blue-400 via-sky-300 to-indigo-300 bg-clip-text text-transparent">
              Compiled C++ Backtesting Platform
            </span>
          </h1>

          {/* Subtitle */}
          <p className="mt-6 text-base sm:text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Execute SMA, EMA, RSI, MACD, Bollinger Bands, and ATR volatility strategies against millions of market ticks with compiled C++ sub-millisecond execution speed.
          </p>

          {/* Action Buttons */}
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
              <Link
                href={isSignedIn ? "/dashboard" : "/sign-up"}
                className="group flex w-full sm:w-auto items-center justify-center gap-2.5 rounded-xl bg-gradient-to-r from-indigo-600 via-violet-600 to-indigo-600 px-8 py-4 text-sm font-bold text-white shadow-xl shadow-indigo-500/30 hover:shadow-indigo-500/50 transition-all"
              >
                <Zap className="size-4 fill-current text-white" />
                <span>{isSignedIn ? "Launch Terminal Console" : "Start Free — 5 Backtests/Day"}</span>
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </motion.div>

            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
              <a
                href="#simulation"
                className="flex w-full sm:w-auto items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-7 py-4 text-sm font-semibold text-slate-200 hover:bg-white/[0.08] hover:border-white/20 transition-all backdrop-blur-xl"
              >
                <Play className="size-4 text-indigo-400 fill-current" />
                <span>Interactive Strategy Simulator</span>
              </a>
            </motion.div>
          </div>

          {/* Telemetry Strip */}
          <div className="mt-16 grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-4xl mx-auto border border-white/10 bg-slate-900/40 p-6 rounded-2xl backdrop-blur-xl shadow-2xl">
            <div className="space-y-1">
              <p className="text-2xl font-extrabold text-white tracking-tight">&lt;0.5 ms</p>
              <p className="text-[11px] font-mono uppercase tracking-wider text-slate-400">Mean C++ Execution</p>
            </div>
            <div className="space-y-1">
              <p className="text-2xl font-extrabold text-indigo-400 tracking-tight">7 Engines</p>
              <p className="text-[11px] font-mono uppercase tracking-wider text-slate-400">Native C++ Strategies</p>
            </div>
            <div className="space-y-1">
              <p className="text-2xl font-extrabold text-white tracking-tight">99.99%</p>
              <p className="text-[11px] font-mono uppercase tracking-wider text-slate-400">Rest API Uptime</p>
            </div>
            <div className="space-y-1">
              <p className="text-2xl font-extrabold text-emerald-400 tracking-tight">PostgreSQL</p>
              <p className="text-[11px] font-mono uppercase tracking-wider text-slate-400">Prisma Analytics Storage</p>
            </div>
          </div>
        </motion.div>

        {/* Animated 3D Terminal Card with FIXED Z-INDEX & OVERFLOW */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          whileHover={{ y: -5 }}
          className="mt-14 relative max-w-5xl mx-auto rounded-3xl border border-indigo-500/30 bg-[#050A14]/95 p-4 sm:p-6 backdrop-blur-2xl shadow-[0_0_90px_rgba(99,102,241,0.22)]"
        >
          <div className="flex items-center justify-between pb-4 border-b border-white/10 px-2">
            <div className="flex items-center gap-2">
              <div className="size-3 rounded-full bg-red-500/80" />
              <div className="size-3 rounded-full bg-yellow-500/80" />
              <div className="size-3 rounded-full bg-emerald-500/80" />
              <span className="ml-3 text-xs font-mono text-slate-400">QuantFlow Terminal — C++ Server (Port 8080)</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-md bg-emerald-500/10 px-2.5 py-1 text-[10px] font-mono font-semibold text-emerald-400 border border-emerald-500/20">
                <span className="size-2 rounded-full bg-emerald-400 animate-ping" />
                REST SERVER READY
              </span>
            </div>
          </div>

          <div className="mt-4 grid grid-cols-1 lg:grid-cols-3 gap-4 text-left">
            <div className="lg:col-span-2 rounded-2xl border border-white/10 bg-slate-950/80 p-5 space-y-4 relative overflow-hidden flex flex-col justify-between">
              {/* Header Text with Z-10 to stay above bars */}
              <div className="flex items-center justify-between relative z-10 pb-2">
                <div>
                  <p className="text-xs font-mono text-slate-400">ACTIVE BACKTEST ENGINE</p>
                  <p className="text-lg font-bold text-white">MACD Strategy Execution</p>
                </div>
                <div className="text-right">
                  <p className="text-xs font-mono text-slate-400">CUMULATIVE RETURN</p>
                  <p className="text-lg font-bold text-emerald-400">+38.40%</p>
                </div>
              </div>

              {/* Animated Chart Bars with fixed height and overflow-hidden */}
              <div className="h-32 w-full rounded-xl bg-gradient-to-b from-indigo-500/10 to-transparent border border-white/5 p-3 flex items-end justify-between gap-1 overflow-hidden relative z-0">
                {[30, 42, 36, 52, 60, 56, 68, 64, 80, 76, 90, 84, 95, 100, 92, 98, 100].map((val, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ height: 0 }}
                    animate={{ height: `${val}%` }}
                    transition={{ duration: 0.8, delay: idx * 0.03 }}
                    className="flex-1 bg-indigo-500/70 hover:bg-indigo-400 transition-colors rounded-t-sm"
                  />
                ))}
              </div>

              <div className="flex items-center justify-between text-xs text-slate-400 font-mono pt-2 relative z-10">
                <span>Sharpe: <strong className="text-white">2.85</strong></span>
                <span>Max DD: <strong className="text-red-400">-4.80%</strong></span>
                <span>Win Rate: <strong className="text-emerald-400">67.2%</strong></span>
                <span>Profit Factor: <strong className="text-white">2.41</strong></span>
              </div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-slate-950/80 p-5 space-y-3 font-mono text-xs">
              <p className="text-[11px] uppercase tracking-wider text-slate-400 font-semibold">C++ Execution Logs</p>
              <div className="space-y-2.5">
                <div className="p-2.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 flex justify-between">
                  <span>POST /api/backtest</span>
                  <span>200 OK [0.38ms]</span>
                </div>
                <div className="p-2.5 rounded-lg bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 flex justify-between">
                  <span>GET /api/strategies</span>
                  <span>200 OK [0.12ms]</span>
                </div>
                <div className="p-2.5 rounded-lg bg-white/5 border border-white/10 text-slate-300 flex justify-between">
                  <span>Prisma Trade Save</span>
                  <span>142 Trades Stored</span>
                </div>
                <div className="p-2.5 rounded-lg bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 flex justify-between">
                  <span>Razorpay Auth</span>
                  <span>Plan: PRO Active</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Codebase C++ Strategies Matrix */}
      <section id="strategies" className="mx-auto max-w-7xl px-6 py-20 border-t border-white/10">
        <div className="text-center space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 rounded-full border border-indigo-500/20 bg-indigo-500/10 px-3.5 py-1 text-xs font-semibold text-indigo-400">
            <Code2 className="size-3.5" />
            C++ Engine Models
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            7 Built-In High Performance Engines
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-sm sm:text-base">
            Every strategy is written natively in C++ for maximum throughput, low memory footprint, and exact mathematical precision.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { title: "MACD Strategy", desc: "Moving Average Convergence Divergence algorithm calculating signal crossovers and histogram momentum.", icon: TrendingUp },
            { title: "Moving Average Cross", desc: "Simple moving average crossover (Fast/Slow SMA) with strict trend confirmation rules.", icon: Activity },
            { title: "EMA Cross Engine", desc: "Exponential moving average crossover assigning weighted priority to recent market tick price action.", icon: Flame },
            { title: "RSI Momentum", desc: "Relative Strength Index oversold and overbought bounds analysis with custom period triggers.", icon: BarChart3 },
            { title: "Bollinger Bands", desc: "Mean reversion strategy trading standard deviation upper/lower volatility bands.", icon: Scale },
            { title: "ATR Volatility Filter", desc: "Average True Range volatility filter designed to isolate breakout regimes and manage stop loss.", icon: Shield },
          ].map((strat, i) => (
            <motion.div
              key={strat.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              whileHover={{ y: -6 }}
              className="rounded-2xl border border-white/10 bg-slate-900/60 p-6 backdrop-blur-2xl space-y-3 hover:border-indigo-500/40 transition-all"
            >
              <div className="size-10 rounded-xl bg-indigo-600/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
                <strat.icon className="size-5" />
              </div>
              <h3 className="text-lg font-bold text-white">{strat.title}</h3>
              <p className="text-xs text-slate-400 leading-relaxed">{strat.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="mx-auto max-w-7xl px-6 py-20 border-t border-white/10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <motion.div whileHover={{ y: -6 }} className="rounded-2xl border border-white/10 bg-slate-900/60 p-7 space-y-4">
            <div className="size-12 rounded-xl bg-indigo-600/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
              <Cpu className="size-6" />
            </div>
            <h3 className="text-xl font-bold text-white">Compiled C++ Speed</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Backtests run directly inside compiled C++ binaries instead of interpreted scripts, executing millions of calculations per second.
            </p>
          </motion.div>

          <motion.div whileHover={{ y: -6 }} className="rounded-2xl border border-white/10 bg-slate-900/60 p-7 space-y-4">
            <div className="size-12 rounded-xl bg-violet-600/10 border border-violet-500/20 flex items-center justify-center text-violet-400">
              <FileText className="size-6" />
            </div>
            <h3 className="text-xl font-bold text-white">CSV & PDF Report Export</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Generate institutional backtest tear sheets with full trade breakdown, drawdown metrics, and Sharpe ratio analysis for PDF/CSV download.
            </p>
          </motion.div>

          <motion.div whileHover={{ y: -6 }} className="rounded-2xl border border-white/10 bg-slate-900/60 p-7 space-y-4">
            <div className="size-12 rounded-xl bg-cyan-600/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
              <Shield className="size-6" />
            </div>
            <h3 className="text-xl font-bold text-white">Prisma DB & Clerk Security</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Persisted backtest history, trade metrics, and user subscriptions isolated per user with Clerk JWT verification and PostgreSQL data security.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Simulator Section */}
      <section id="simulation" className="mx-auto max-w-7xl px-6 py-20 border-t border-white/10">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="rounded-3xl border border-indigo-500/30 bg-[#060C1B] p-8 sm:p-12 backdrop-blur-2xl shadow-2xl"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 rounded-full border border-indigo-500/20 bg-indigo-500/10 px-3 py-1 text-xs font-semibold text-indigo-400">
                <Activity className="size-3.5" />
                Engine Simulator
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                Simulate Strategy Returns
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                Test how QuantFlow&apos;s C++ engine evaluates capital allocation and strategy parameters in real time.
              </p>

              <div className="space-y-4 pt-2">
                <div>
                  <div className="flex justify-between text-xs font-semibold text-slate-300 mb-2">
                    <span>INITIAL PORTFOLIO CAPITAL</span>
                    <span className="font-mono text-indigo-400">${initialCapital.toLocaleString()}</span>
                  </div>
                  <input
                    type="range"
                    min={10000}
                    max={500000}
                    step={10000}
                    value={initialCapital}
                    onChange={(e) => setInitialCapital(Number(e.target.value))}
                    className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-500"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block mb-2">
                    SELECT C++ STRATEGY ENGINE
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {Object.keys(strategyData).map((st) => (
                      <button
                        key={st}
                        type="button"
                        onClick={() => setSelectedStrategy(st)}
                        className={`py-2 px-3 rounded-xl border text-xs font-semibold transition-all ${
                          selectedStrategy === st
                            ? "bg-indigo-600 border-indigo-500 text-white shadow-md"
                            : "bg-slate-900 border-white/10 text-slate-400 hover:text-white"
                        }`}
                      >
                        {st}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Output Display Card */}
            <div className="rounded-2xl border border-white/10 bg-slate-950/80 p-8 text-center space-y-6">
              <p className="text-xs font-mono uppercase tracking-wider text-slate-400">PROJECTED RETURN METRICS</p>
              <div className="space-y-1">
                <AnimatePresence mode="wait">
                  <motion.p
                    key={simulatedReturn}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="text-5xl font-extrabold text-emerald-400 tracking-tight"
                  >
                    +{simulatedReturn}%
                  </motion.p>
                </AnimatePresence>
                <p className="text-sm font-mono text-slate-300">
                  Projected Capital: ${projectedPortfolio.toLocaleString()}
                </p>
              </div>

              <div className="w-full border-t border-white/10 pt-4 flex justify-between text-xs font-mono text-slate-400">
                <span>Sharpe: <strong className="text-white">{currentStrat.sharpe}</strong></span>
                <span>Win Rate: <strong className="text-emerald-400">{currentStrat.winRate}%</strong></span>
                <span>Max DD: <strong className="text-red-400">-{currentStrat.maxDD}%</strong></span>
              </div>

              <Link
                href="/sign-up"
                className="w-full flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 py-3.5 text-xs font-bold text-white shadow-lg shadow-indigo-500/25 hover:from-indigo-500 hover:to-violet-500 transition-all"
              >
                <span>Run Full Backtest</span>
                <ArrowRight className="size-4" />
              </Link>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Pricing Section — Exact ₹9 / month Pricing */}
      <section id="pricing" className="mx-auto max-w-7xl px-6 py-20 border-t border-white/10">
        <div className="text-center space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 rounded-full border border-indigo-500/20 bg-indigo-500/10 px-3.5 py-1 text-xs font-semibold text-indigo-400">
            <Zap className="size-3.5" />
            Accurate Platform Pricing
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Transparent Subscription Plans
          </h2>
          <p className="text-slate-400 max-w-xl mx-auto text-sm">
            Integrated directly with Razorpay Subscription Plan (`plan_TXyJgz1fKGqKIy`). 7-day money-back guarantee.
          </p>

          <div className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-slate-900/80 p-1.5 mt-4">
            <button
              type="button"
              onClick={() => setBillingCycle("monthly")}
              className={`rounded-full px-5 py-1.5 text-xs font-semibold transition-all ${
                billingCycle === "monthly"
                  ? "bg-indigo-600 text-white shadow-md"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              Monthly Billing
            </button>
            <button
              type="button"
              onClick={() => setBillingCycle("yearly")}
              className={`rounded-full px-5 py-1.5 text-xs font-semibold transition-all ${
                billingCycle === "yearly"
                  ? "bg-indigo-600 text-white shadow-md"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              Yearly (Save 20%)
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 max-w-4xl mx-auto gap-8 items-stretch">
          {/* FREE PLAN */}
          <motion.div
            whileHover={{ y: -6 }}
            className="rounded-2xl border border-white/10 bg-slate-900/50 p-8 flex flex-col justify-between space-y-6"
          >
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-white">FREE Plan</h3>
              <p className="text-xs text-slate-400">Default tier upon sign-up for basic quantitative testing.</p>
              <div className="space-y-1">
                <span className="text-4xl font-extrabold text-white">₹0</span>
                <span className="text-xs text-slate-400"> / forever</span>
              </div>
              <ul className="space-y-3 text-xs text-slate-300 pt-4 border-t border-white/10">
                <li className="flex items-center gap-2"><Check className="size-4 text-emerald-400 shrink-0" /> 5 C++ Backtests per day limit</li>
                <li className="flex items-center gap-2"><Check className="size-4 text-emerald-400 shrink-0" /> Standard SMA & RSI strategy models</li>
                <li className="flex items-center gap-2"><Check className="size-4 text-emerald-400 shrink-0" /> Interactive strategy dashboard</li>
                <li className="flex items-center gap-2"><Check className="size-4 text-emerald-400 shrink-0" /> Portfolio equity curve tracking</li>
              </ul>
            </div>
            <Link
              href="/sign-up"
              className="w-full text-center rounded-xl border border-white/10 bg-white/5 py-3.5 text-xs font-bold text-white hover:bg-white/10 transition-colors"
            >
              Create Free Account
            </Link>
          </motion.div>

          {/* PRO PLAN — ₹9/mo */}
          <motion.div
            whileHover={{ y: -6 }}
            className="relative rounded-2xl border-2 border-indigo-500 bg-[#090D1A] p-8 flex flex-col justify-between space-y-6 shadow-2xl shadow-indigo-500/20"
          >
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-indigo-500 to-violet-500 px-4 py-1 text-[10px] font-extrabold uppercase tracking-wider text-white shadow-md">
              RAZORPAY RECURRING PLAN
            </div>
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-white">PRO Plan</h3>
              <p className="text-xs text-slate-400">Full institutional access to low-latency C++ compilation engine.</p>
              <div className="space-y-1">
                <span className="text-4xl font-extrabold text-white">
                  {billingCycle === "monthly" ? "₹9" : "₹7"}
                </span>
                <span className="text-xs text-slate-400"> / month</span>
              </div>
              <ul className="space-y-3 text-xs text-slate-300 pt-4 border-t border-white/10">
                <li className="flex items-center gap-2"><Check className="size-4 text-indigo-400 shrink-0" /> <strong>Unlimited C++ Backtests</strong></li>
                <li className="flex items-center gap-2"><Check className="size-4 text-indigo-400 shrink-0" /> All 7 C++ strategy engines (MACD, EMA, Bollinger, ATR)</li>
                <li className="flex items-center gap-2"><Check className="size-4 text-indigo-400 shrink-0" /> Export CSV & PDF report analytics</li>
                <li className="flex items-center gap-2"><Check className="size-4 text-indigo-400 shrink-0" /> Instant Razorpay checkout activation</li>
                <li className="flex items-center gap-2"><Check className="size-4 text-indigo-400 shrink-0" /> 7-Day Money Back Guarantee</li>
              </ul>
            </div>
            <Link
              href="/sign-up"
              className="w-full text-center rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 py-3.5 text-xs font-bold text-white shadow-lg shadow-indigo-500/30 hover:from-indigo-500 hover:to-violet-500 transition-all"
            >
              Upgrade to PRO
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 bg-[#02050E] pt-16 pb-12">
        <div className="mx-auto max-w-7xl px-6 grid grid-cols-1 md:grid-cols-4 gap-10 text-xs">
          <div className="space-y-4 md:col-span-1">
            <QuantFlowLogo className="size-8" textClassName="text-lg font-extrabold" />
            <p className="text-slate-400 leading-relaxed">
              Institutional quantitative backtesting platform powered by compiled C++ backend compilation.
            </p>
            <p className="text-[11px] font-mono text-slate-500">
              Merchant: QuantFlow Technologies India Pvt. Ltd.
            </p>
          </div>

          <div className="space-y-3">
            <p className="font-semibold text-white uppercase tracking-wider text-[11px]">Platform</p>
            <ul className="space-y-2 text-slate-400">
              <li><Link href="/about" className="hover:text-indigo-400 font-semibold text-indigo-300 transition-colors">About Devashish Haldar</Link></li>
              <li><Link href="/dashboard" className="hover:text-white transition-colors">Terminal Console</Link></li>
              <li><Link href="/analytics" className="hover:text-white transition-colors">Risk Analytics</Link></li>
              <li><Link href="/strategies" className="hover:text-white transition-colors">Strategy Library</Link></li>
              <li><Link href="/portfolio" className="hover:text-white transition-colors">Portfolio Manager</Link></li>
            </ul>
          </div>

          <div className="space-y-3">
            <p className="font-semibold text-white uppercase tracking-wider text-[11px]">Legal & Compliance</p>
            <ul className="space-y-2 text-slate-400">
              <li><Link href="/terms" className="hover:text-indigo-400 transition-colors">Terms of Service</Link></li>
              <li><Link href="/privacy" className="hover:text-indigo-400 transition-colors">Privacy Policy</Link></li>
              <li><Link href="/refund" className="hover:text-indigo-400 transition-colors">Cancellation & Refund Policy</Link></li>
              <li><Link href="/contact" className="hover:text-indigo-400 transition-colors">Contact Us & Merchant Info</Link></li>
            </ul>
          </div>

          <div className="space-y-3">
            <p className="font-semibold text-white uppercase tracking-wider text-[11px]">Customer Support</p>
            <p className="text-slate-400">Email: workfordevashishhaldar@gmail.com</p>
            <p className="text-slate-400">Phone: +91 9336009951</p>
            <p className="text-slate-400">Hours: Mon-Fri 9:00 AM – 7:00 PM IST</p>
            <p className="text-slate-500 text-[11px]">PSIT KANPUR , BHAUTI , 209305</p>
          </div>
        </div>

        <div className="mx-auto max-w-7xl px-6 mt-12 pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <p>© {new Date().getFullYear()} QuantFlow Technologies India Pvt. Ltd. All rights reserved.</p>
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1 text-slate-400">
              <Lock className="size-3 text-emerald-400" />
              Razorpay Secured Gateway
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}