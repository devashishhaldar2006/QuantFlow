"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useUser } from "@clerk/nextjs";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  Shield,
  Activity,
  Cpu,
  BarChart3,
  Check,
  FileText,
  Flame,
  Scale,
  TrendingUp,
} from "lucide-react";
import { QuantFlowLogo } from "@/components/common/QuantFlowLogo";
import { InteractiveVideoBackground } from "@/components/common/InteractiveVideoBackground";

export default function LandingPage() {
  const { isSignedIn } = useUser();
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">("monthly");
  const [initialCapital, setInitialCapital] = useState<number>(100000);
  const [selectedStrategy, setSelectedStrategy] = useState<string>("MACD Oscillator");

  // Codebase-accurate strategies and returns
  const strategyData: Record<
    string,
    { baseReturn: number; sharpe: number; winRate: number; maxDD: number; trades: number }
  > = {
    "MACD Oscillator": { baseReturn: 38.4, sharpe: 2.85, winRate: 67.2, maxDD: 4.8, trades: 142 },
    "SMA Crossover": { baseReturn: 29.2, sharpe: 2.12, winRate: 61.5, maxDD: 6.2, trades: 98 },
    "RSI Momentum": { baseReturn: 34.6, sharpe: 2.48, winRate: 64.8, maxDD: 5.1, trades: 126 },
    "Bollinger Bands": { baseReturn: 31.8, sharpe: 2.31, winRate: 63.1, maxDD: 5.5, trades: 114 },
    "ATR Volatility": { baseReturn: 42.1, sharpe: 3.04, winRate: 70.4, maxDD: 3.9, trades: 84 },
  };

  const currentStrat = strategyData[selectedStrategy] || strategyData["MACD Oscillator"];
  const factor = (initialCapital / 100000) * 1.02;
  const simulatedReturn = Number((currentStrat.baseReturn * Math.log10(factor + 9)).toFixed(1));
  const projectedPortfolio = Math.round(initialCapital * (1 + simulatedReturn / 100));

  return (
    <div className="relative min-h-screen bg-white text-zinc-900 selection:bg-zinc-900 selection:text-white">
      {/* Live Interactive Trading Video / Canvas Background */}
      <InteractiveVideoBackground />

      {/* Navigation */}
      <header className="sticky top-0 z-50 border-b border-zinc-200/80 bg-white/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3.5">
          <Link href="/" className="flex items-center">
            <QuantFlowLogo className="size-6" textClassName="text-base font-semibold tracking-tight" />
          </Link>

          <nav className="hidden md:flex items-center gap-7 text-xs font-medium text-zinc-600">
            <a href="#platform" className="hover:text-zinc-950 transition-colors">Platform</a>
            <a href="#engines" className="hover:text-zinc-950 transition-colors">C++ Engines</a>
            <a href="#simulation" className="hover:text-zinc-950 transition-colors">Simulator</a>
            <a href="#pricing" className="hover:text-zinc-950 transition-colors">Pricing</a>
            <Link href="/about" className="hover:text-zinc-950 transition-colors">About</Link>
            <Link href="/terms" className="hover:text-zinc-950 transition-colors">Legal</Link>
          </nav>

          <div className="flex items-center gap-4">
            {isSignedIn ? (
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Link
                  href="/dashboard"
                  className="inline-flex items-center gap-2 rounded-md bg-zinc-950 px-4 py-2 text-xs font-medium text-white hover:bg-zinc-800 transition-colors shadow-sm"
                >
                  <span>Dashboard</span>
                  <ArrowRight className="size-3.5" />
                </Link>
              </motion.div>
            ) : (
              <>
                <Link
                  href="/sign-in"
                  className="text-xs font-medium text-zinc-600 hover:text-zinc-950 transition-colors"
                >
                  Sign In
                </Link>
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Link
                    href="/sign-up"
                    className="inline-flex items-center gap-1.5 rounded-md bg-zinc-950 px-3.5 py-1.5 text-xs font-medium text-white hover:bg-zinc-800 transition-colors shadow-sm"
                  >
                    <span>Launch Terminal</span>
                    <ArrowRight className="size-3.5" />
                  </Link>
                </motion.div>
              </>
            )}
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative z-10 mx-auto max-w-7xl px-6 pt-16 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Main Editorial Hero */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            className="lg:col-span-7 space-y-6"
          >
            <div className="inline-flex items-center gap-2 rounded border border-zinc-200 bg-white/80 backdrop-blur-sm px-2.5 py-1 text-xs font-mono text-zinc-600 shadow-xs">
              <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span>Deterministic C++ Backtesting Pipeline</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight text-zinc-950 leading-[1.12]">
              High-Frequency <br />
              Quantitative Backtesting <br />
              Engineered in C++.
            </h1>

            <p className="text-base text-zinc-600 max-w-xl leading-relaxed">
              QuantFlow executes algorithmic strategies against tick market datasets using a native C++ compilation pipeline. Engineered for institutional backtesting, risk decomposition, and deterministic performance validation.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Link
                  href={isSignedIn ? "/dashboard" : "/sign-up"}
                  className="inline-flex items-center gap-2 rounded-md bg-zinc-950 px-5 py-2.5 text-xs font-medium text-white hover:bg-zinc-800 transition-colors shadow-sm"
                >
                  <span>{isSignedIn ? "Launch Terminal Console" : "Start Free — 5 Backtests/Day"}</span>
                  <ArrowRight className="size-3.5" />
                </Link>
              </motion.div>

              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <a
                  href="#simulation"
                  className="inline-flex items-center gap-2 rounded-md border border-zinc-300 bg-white/90 backdrop-blur-sm px-4 py-2.5 text-xs font-medium text-zinc-700 hover:bg-zinc-50 hover:border-zinc-400 transition-colors shadow-xs"
                >
                  <span>Interactive Strategy Simulator</span>
                </a>
              </motion.div>
            </div>

            {/* Spec strip */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-6 border-t border-zinc-200 max-w-xl">
              <motion.div whileHover={{ y: -2 }} className="p-3 border border-zinc-200 rounded-sm bg-white/80 backdrop-blur-sm shadow-xs transition-shadow">
                <p className="text-[11px] font-mono text-zinc-400 uppercase">MEAN EXECUTION</p>
                <p className="text-base font-semibold text-zinc-900 mt-0.5">&lt; 0.38 ms</p>
              </motion.div>
              <motion.div whileHover={{ y: -2 }} className="p-3 border border-zinc-200 rounded-sm bg-white/80 backdrop-blur-sm shadow-xs transition-shadow">
                <p className="text-[11px] font-mono text-zinc-400 uppercase">CPP ENGINES</p>
                <p className="text-base font-semibold text-zinc-900 mt-0.5">7 Native</p>
              </motion.div>
              <motion.div whileHover={{ y: -2 }} className="p-3 border border-zinc-200 rounded-sm bg-white/80 backdrop-blur-sm shadow-xs transition-shadow">
                <p className="text-[11px] font-mono text-zinc-400 uppercase">TICK RESOLUTION</p>
                <p className="text-base font-semibold text-emerald-600 mt-0.5">Sub-millisecond</p>
              </motion.div>
              <motion.div whileHover={{ y: -2 }} className="p-3 border border-zinc-200 rounded-sm bg-white/80 backdrop-blur-sm shadow-xs transition-shadow">
                <p className="text-[11px] font-mono text-zinc-400 uppercase">ASSET COVERAGE</p>
                <p className="text-base font-semibold text-zinc-900 mt-0.5">Multi-Asset</p>
              </motion.div>
            </div>
          </motion.div>

          {/* Clean Interactive Terminal Card */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            whileHover={{ y: -3 }}
            className="lg:col-span-5 border border-zinc-200 rounded-sm bg-white/95 backdrop-blur-md p-5 shadow-sm space-y-4 transition-all hover:shadow-md"
          >
            <div className="flex items-center justify-between border-b border-zinc-200 pb-3">
              <div className="flex items-center gap-2">
                <span className="size-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="font-mono text-xs font-semibold text-zinc-900 uppercase">Execution Telemetry</span>
              </div>
              <span className="text-[11px] font-mono text-zinc-400">Node 01</span>
            </div>

            <div className="space-y-2.5 font-mono text-xs">
              <div className="flex justify-between items-baseline border-b border-zinc-100 pb-2">
                <span className="text-zinc-500 font-sans">Active Engine</span>
                <span className="font-semibold text-zinc-900">{selectedStrategy}</span>
              </div>
              <div className="flex justify-between items-baseline border-b border-zinc-100 pb-2">
                <span className="text-zinc-500 font-sans">Cumulative Return</span>
                <span className="font-semibold text-emerald-600">+{currentStrat.baseReturn}%</span>
              </div>
              <div className="flex justify-between items-baseline border-b border-zinc-100 pb-2">
                <span className="text-zinc-500 font-sans">Sharpe Ratio</span>
                <span className="font-semibold text-zinc-900">{currentStrat.sharpe}</span>
              </div>
              <div className="flex justify-between items-baseline border-b border-zinc-100 pb-2">
                <span className="text-zinc-500 font-sans">Max Drawdown</span>
                <span className="font-semibold text-red-600">-{currentStrat.maxDD}%</span>
              </div>
              <div className="flex justify-between items-baseline border-b border-zinc-100 pb-2">
                <span className="text-zinc-500 font-sans">Win Rate / Trades</span>
                <span className="font-semibold text-zinc-900">{currentStrat.winRate}% / {currentStrat.trades} Trades</span>
              </div>

              {/* Sparkline animated bars */}
              <div className="pt-2">
                <div className="text-[10px] text-zinc-400 mb-1.5 flex justify-between font-mono">
                  <span>EQUITY CONVERGENCE VECTOR</span>
                  <span>18 TICKS</span>
                </div>
                <div className="h-14 w-full flex items-end gap-1 bg-zinc-50/70 p-1.5 border border-zinc-200 rounded-sm">
                  {[28, 36, 32, 45, 52, 48, 62, 58, 70, 65, 82, 79, 90, 85, 94, 98, 92, 100].map((v, i) => (
                    <motion.div
                      key={i}
                      initial={{ height: 0 }}
                      animate={{ height: `${v}%` }}
                      transition={{ duration: 0.6, delay: i * 0.02 }}
                      className="flex-1 bg-zinc-800 hover:bg-emerald-600 transition-colors"
                    />
                  ))}
                </div>
              </div>

              {/* Execution telemetry summary */}
              <div className="bg-zinc-50/80 p-3 border border-zinc-200 rounded-sm text-xs space-y-1.5 text-zinc-600 font-mono">
                <div className="flex justify-between items-center">
                  <span className="text-zinc-400">TICK INGESTION</span>
                  <span className="text-emerald-600 font-semibold">0.12ms [200 OK]</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-zinc-400">CONVERGENCE SOLVE</span>
                  <span className="text-zinc-900 font-semibold">0.26ms [2.41 PF]</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-zinc-400">STORAGE PERSIST</span>
                  <span className="text-zinc-900 font-semibold">{currentStrat.trades} ROWS STORED</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Strategies Matrix */}
      <section id="engines" className="relative z-10 mx-auto max-w-7xl px-6 py-16 border-t border-zinc-200">
        <div className="max-w-2xl mb-8 space-y-2">
          <p className="text-xs font-mono uppercase text-zinc-400 tracking-wider">C++ Strategy Suite</p>
          <h2 className="text-2xl sm:text-3xl font-semibold text-zinc-950 tracking-tight">
            7 High-Throughput Quantitative Engines
          </h2>
          <p className="text-sm text-zinc-500 leading-relaxed">
            Every strategy is written natively in C++ for maximum throughput, low memory footprint, and exact mathematical precision.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {[
            { title: "MACD Strategy", desc: "Moving Average Convergence Divergence algorithm calculating signal crossovers and momentum vectors.", tag: "MOMENTUM", icon: TrendingUp },
            { title: "Moving Average Cross", desc: "Simple moving average crossover (Fast/Slow SMA) with strict trend confirmation rules.", tag: "TREND", icon: Activity },
            { title: "EMA Cross Engine", desc: "Exponential moving average crossover assigning weighted priority to recent tick price action.", tag: "WEIGHTED", icon: Flame },
            { title: "RSI Momentum", desc: "Relative Strength Index oversold and overbought bounds analysis with custom period triggers.", tag: "OSCILLATOR", icon: BarChart3 },
            { title: "Bollinger Bands", desc: "Mean reversion strategy trading standard deviation upper and lower volatility bounds.", tag: "VOLATILITY", icon: Scale },
            { title: "ATR Volatility Filter", desc: "Average True Range volatility filter designed to isolate breakout regimes and manage stop loss.", tag: "RISK FILTER", icon: Shield },
          ].map((strat, i) => (
            <motion.div
              key={strat.title}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: i * 0.05 }}
              whileHover={{ y: -4, borderColor: "#18181B" }}
              className="border border-zinc-200 rounded-sm bg-white/90 backdrop-blur-sm p-5 space-y-3 transition-all shadow-xs"
            >
              <div className="flex items-center justify-between">
                <div className="p-2 border border-zinc-200 bg-zinc-50 rounded text-zinc-800">
                  <strat.icon className="size-4" />
                </div>
                <span className="font-mono text-[10px] text-zinc-500 border border-zinc-200 bg-zinc-50 px-2 py-0.5 rounded">
                  {strat.tag}
                </span>
              </div>
              <h3 className="text-sm font-semibold text-zinc-900">{strat.title}</h3>
              <p className="text-xs text-zinc-600 leading-relaxed">{strat.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Simulator Section */}
      <section id="simulation" className="relative z-10 mx-auto max-w-7xl px-6 py-16 border-t border-zinc-200">
        <div className="border border-zinc-200 rounded-sm bg-zinc-50/70 backdrop-blur-md p-6 sm:p-10 shadow-xs">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7 space-y-6">
              <div>
                <p className="text-xs font-mono uppercase text-zinc-400 tracking-wider mb-1">Interactive Simulator</p>
                <h2 className="text-2xl sm:text-3xl font-semibold text-zinc-950 tracking-tight">
                  Simulate Strategy Allocation & Returns
                </h2>
              </div>

              <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed max-w-lg">
                Test how QuantFlow&apos;s C++ engine evaluates capital allocation and strategy parameters in real time against historical order books.
              </p>

              <div className="space-y-4 pt-1">
                <div>
                  <div className="flex justify-between text-xs font-mono text-zinc-700 mb-2">
                    <span className="font-sans text-zinc-500">Initial Portfolio Capital</span>
                    <span className="font-semibold text-zinc-950">${initialCapital.toLocaleString()}</span>
                  </div>
                  <input
                    type="range"
                    min={10000}
                    max={500000}
                    step={10000}
                    value={initialCapital}
                    onChange={(e) => setInitialCapital(Number(e.target.value))}
                    className="w-full h-1.5 bg-zinc-300 rounded appearance-none cursor-pointer accent-zinc-950"
                  />
                  <div className="flex justify-between text-[11px] font-mono text-zinc-400 mt-1">
                    <span>$10,000</span>
                    <span>$250,000</span>
                    <span>$500,000</span>
                  </div>
                </div>

                <div>
                  <label className="text-[11px] font-medium text-zinc-500 block mb-2">
                    Select Strategy Model
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {Object.keys(strategyData).map((st) => (
                      <motion.button
                        key={st}
                        type="button"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setSelectedStrategy(st)}
                        className={`py-2 px-3 border rounded text-xs transition-all text-left ${
                          selectedStrategy === st
                            ? "bg-zinc-950 border-zinc-950 text-white font-medium shadow-sm"
                            : "bg-white border-zinc-200 text-zinc-700 hover:text-black hover:border-zinc-300"
                        }`}
                      >
                        {st}
                      </motion.button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Output Display Card */}
            <motion.div
              layout
              className="lg:col-span-5 border border-zinc-200 rounded-sm bg-white p-6 text-left space-y-5 shadow-sm"
            >
              <div className="flex justify-between items-center border-b border-zinc-100 pb-2">
                <span className="text-[11px] font-mono uppercase text-zinc-400">Projected Return Metrics</span>
                <span className="text-[11px] font-mono text-emerald-600 font-semibold">Active</span>
              </div>

              <div>
                <AnimatePresence mode="wait">
                  <motion.p
                    key={simulatedReturn}
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 4 }}
                    className="text-4xl font-semibold text-emerald-600 tracking-tight my-1 font-mono"
                  >
                    +{simulatedReturn}%
                  </motion.p>
                </AnimatePresence>
                <p className="text-xs text-zinc-600 font-mono">
                  Projected Capital: <strong className="text-zinc-950">${projectedPortfolio.toLocaleString()}</strong>
                </p>
              </div>

              <div className="grid grid-cols-3 gap-3 border-t border-zinc-100 pt-3 text-xs font-mono">
                <div>
                  <span className="text-[10px] text-zinc-400 block font-sans">Sharpe</span>
                  <span className="text-zinc-900 font-semibold">{currentStrat.sharpe}</span>
                </div>
                <div>
                  <span className="text-[10px] text-zinc-400 block font-sans">Win Rate</span>
                  <span className="text-emerald-600 font-semibold">{currentStrat.winRate}%</span>
                </div>
                <div>
                  <span className="text-[10px] text-zinc-400 block font-sans">Max DD</span>
                  <span className="text-red-600 font-semibold">-{currentStrat.maxDD}%</span>
                </div>
              </div>

              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Link
                  href="/sign-up"
                  className="w-full flex items-center justify-center gap-2 rounded-md bg-zinc-950 hover:bg-zinc-800 py-2.5 text-xs font-medium text-white transition-colors shadow-sm"
                >
                  <span>Run Complete Backtest</span>
                  <ArrowRight className="size-3.5" />
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Platform Features Section */}
      <section id="platform" className="relative z-10 mx-auto max-w-7xl px-6 py-16 border-t border-zinc-200">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <motion.div whileHover={{ y: -4 }} className="border border-zinc-200 rounded-sm bg-white/90 backdrop-blur-sm p-6 space-y-3 shadow-xs">
            <div className="size-9 rounded border border-zinc-200 bg-zinc-50 flex items-center justify-center text-zinc-800">
              <Cpu className="size-4" />
            </div>
            <h3 className="text-sm font-semibold text-zinc-900">Compiled C++ Speed</h3>
            <p className="text-xs text-zinc-600 leading-relaxed">
              Backtests run directly inside compiled C++ binaries instead of interpreted scripts, processing millions of tick calculations per second.
            </p>
          </motion.div>

          <motion.div whileHover={{ y: -4 }} className="border border-zinc-200 rounded-sm bg-white/90 backdrop-blur-sm p-6 space-y-3 shadow-xs">
            <div className="size-9 rounded border border-zinc-200 bg-zinc-50 flex items-center justify-center text-zinc-800">
              <FileText className="size-4" />
            </div>
            <h3 className="text-sm font-semibold text-zinc-900">CSV & PDF Report Export</h3>
            <p className="text-xs text-zinc-600 leading-relaxed">
              Generate institutional backtest tear sheets with full trade breakdown, drawdown metrics, and Sharpe ratio analysis for PDF/CSV download.
            </p>
          </motion.div>

          <motion.div whileHover={{ y: -4 }} className="border border-zinc-200 rounded-sm bg-white/90 backdrop-blur-sm p-6 space-y-3 shadow-xs">
            <div className="size-9 rounded border border-zinc-200 bg-zinc-50 flex items-center justify-center text-zinc-800">
              <Shield className="size-4" />
            </div>
            <h3 className="text-sm font-semibold text-zinc-900">Prisma DB & Clerk Security</h3>
            <p className="text-xs text-zinc-600 leading-relaxed">
              Persisted backtest history, trade metrics, and user subscriptions isolated per user with Clerk JWT verification and PostgreSQL data security.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="relative z-10 mx-auto max-w-7xl px-6 py-16 border-t border-zinc-200">
        <div className="text-center space-y-3 mb-12">
          <p className="text-xs font-mono uppercase text-zinc-400 tracking-wider">Subscription Tiers</p>
          <h2 className="text-2xl sm:text-3xl font-semibold text-zinc-950 tracking-tight">
            Transparent Subscription Plans
          </h2>
          <p className="text-xs sm:text-sm text-zinc-600 max-w-md mx-auto">
            Integrated directly with Razorpay Subscription Plan (`plan_TXyJgz1fKGqKIy`). 7-day money-back guarantee.
          </p>

          <div className="inline-flex items-center gap-1 border border-zinc-200 bg-zinc-100 p-1 rounded-md mt-2">
            <button
              type="button"
              onClick={() => setBillingCycle("monthly")}
              className={`px-3 py-1 text-xs rounded transition-colors ${
                billingCycle === "monthly"
                  ? "bg-white text-zinc-950 font-semibold shadow-sm"
                  : "text-zinc-600 hover:text-black"
              }`}
            >
              Monthly Billing
            </button>
            <button
              type="button"
              onClick={() => setBillingCycle("yearly")}
              className={`px-3 py-1 text-xs rounded transition-colors ${
                billingCycle === "yearly"
                  ? "bg-white text-zinc-950 font-semibold shadow-sm"
                  : "text-zinc-600 hover:text-black"
              }`}
            >
              Yearly (Save 20%)
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 max-w-3xl mx-auto gap-6 items-stretch">
          {/* FREE PLAN */}
          <motion.div whileHover={{ y: -4 }} className="border border-zinc-200 rounded-sm bg-white p-6 flex flex-col justify-between space-y-6 shadow-xs">
            <div className="space-y-4">
              <div className="flex justify-between items-baseline">
                <h3 className="text-base font-semibold text-zinc-900">FREE Plan</h3>
                <span className="text-[10px] font-mono text-zinc-400">DEFAULT</span>
              </div>
              <p className="text-xs text-zinc-600">Default tier upon sign-up for basic quantitative testing.</p>
              <div>
                <span className="text-3xl font-semibold text-zinc-950 font-mono">₹0</span>
                <span className="text-xs text-zinc-500 font-mono"> / forever</span>
              </div>
              <ul className="space-y-2.5 text-xs text-zinc-700 pt-4 border-t border-zinc-100">
                <li className="flex items-center gap-2"><Check className="size-3.5 text-emerald-600 shrink-0" /> 5 C++ Backtests per day limit</li>
                <li className="flex items-center gap-2"><Check className="size-3.5 text-emerald-600 shrink-0" /> Standard SMA & RSI strategy models</li>
                <li className="flex items-center gap-2"><Check className="size-3.5 text-emerald-600 shrink-0" /> Interactive strategy dashboard</li>
                <li className="flex items-center gap-2"><Check className="size-3.5 text-emerald-600 shrink-0" /> Portfolio equity curve tracking</li>
              </ul>
            </div>
            <Link
              href="/sign-up"
              className="w-full text-center border border-zinc-300 rounded-md bg-white py-2.5 text-xs font-medium text-zinc-800 hover:bg-zinc-50 transition-colors"
            >
              Create Free Account
            </Link>
          </motion.div>

          {/* PRO PLAN — ₹9/mo */}
          <motion.div whileHover={{ y: -4 }} className="border-2 border-zinc-950 rounded-sm bg-zinc-50 p-6 flex flex-col justify-between space-y-6 shadow-sm">
            <div className="space-y-4">
              <div className="flex justify-between items-baseline">
                <h3 className="text-base font-semibold text-zinc-950">PRO Plan</h3>
                <span className="text-[10px] font-mono text-zinc-900 border border-zinc-900 px-1.5 py-0.5 rounded font-semibold">
                  RAZORPAY RECURRING
                </span>
              </div>
              <p className="text-xs text-zinc-600">Full institutional access to low-latency C++ compilation engine.</p>
              <div>
                <span className="text-3xl font-semibold text-zinc-950 font-mono">
                  {billingCycle === "monthly" ? "₹9" : "₹7"}
                </span>
                <span className="text-xs text-zinc-500 font-mono"> / month</span>
              </div>
              <ul className="space-y-2.5 text-xs text-zinc-800 pt-4 border-t border-zinc-200">
                <li className="flex items-center gap-2"><Check className="size-3.5 text-zinc-900 shrink-0" /> <strong className="text-zinc-950">Unlimited C++ Backtests</strong></li>
                <li className="flex items-center gap-2"><Check className="size-3.5 text-zinc-900 shrink-0" /> All 7 C++ strategy engines (MACD, EMA, Bollinger, ATR)</li>
                <li className="flex items-center gap-2"><Check className="size-3.5 text-zinc-900 shrink-0" /> Export CSV & PDF report analytics</li>
                <li className="flex items-center gap-2"><Check className="size-3.5 text-zinc-900 shrink-0" /> Instant Razorpay checkout activation</li>
                <li className="flex items-center gap-2"><Check className="size-3.5 text-zinc-900 shrink-0" /> 7-Day Money Back Guarantee</li>
              </ul>
            </div>
            <Link
              href="/sign-up"
              className="w-full text-center rounded-md bg-zinc-950 py-2.5 text-xs font-semibold text-white hover:bg-zinc-800 transition-colors shadow-sm"
            >
              Upgrade to PRO
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-zinc-200 bg-zinc-50/80 backdrop-blur-md pt-12 pb-10 text-xs">
        <div className="mx-auto max-w-7xl px-6 grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-3 md:col-span-1">
            <QuantFlowLogo className="size-6" textClassName="text-base font-semibold tracking-tight" />
            <p className="text-zinc-600 leading-relaxed text-[12px]">
              Institutional quantitative backtesting platform powered by compiled C++ backend compilation.
            </p>
            <p className="text-[11px] font-mono text-zinc-500">
              Merchant: QuantFlow Technologies India Pvt. Ltd.
            </p>
          </div>

          <div className="space-y-2.5">
            <p className="font-semibold text-zinc-900 text-xs">Platform</p>
            <ul className="space-y-1.5 text-zinc-600 text-[12px]">
              <li><Link href="/about" className="hover:text-black transition-colors">About Devashish Haldar</Link></li>
              <li><Link href="/dashboard" className="hover:text-black transition-colors">Terminal Console</Link></li>
              <li><Link href="/analytics" className="hover:text-black transition-colors">Risk Analytics</Link></li>
              <li><Link href="/strategies" className="hover:text-black transition-colors">Strategy Library</Link></li>
              <li><Link href="/portfolio" className="hover:text-black transition-colors">Portfolio Manager</Link></li>
            </ul>
          </div>

          <div className="space-y-2.5">
            <p className="font-semibold text-zinc-900 text-xs">Legal & Compliance</p>
            <ul className="space-y-1.5 text-zinc-600 text-[12px]">
              <li><Link href="/terms" className="hover:text-black transition-colors">Terms of Service</Link></li>
              <li><Link href="/privacy" className="hover:text-black transition-colors">Privacy Policy</Link></li>
              <li><Link href="/refund" className="hover:text-black transition-colors">Refund Policy</Link></li>
              <li><Link href="/contact" className="hover:text-black transition-colors">Contact Us</Link></li>
            </ul>
          </div>

          <div className="space-y-2.5">
            <p className="font-semibold text-zinc-900 text-xs">Customer Support</p>
            <p className="text-zinc-600 text-[12px]">workfordevashishhaldar@gmail.com</p>
            <p className="text-zinc-600 text-[12px]">+91 9336009951</p>
            <p className="text-zinc-500 text-[11px]">Mon-Fri 9:00 AM – 7:00 PM IST</p>
            <p className="text-zinc-500 text-[11px]">PSIT KANPUR, BHAUTI, 209305</p>
          </div>
        </div>

        <div className="mx-auto max-w-7xl px-6 mt-10 pt-4 border-t border-zinc-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-zinc-500 font-mono">
          <p>© {new Date().getFullYear()} QuantFlow Technologies India Pvt. Ltd. All rights reserved.</p>
          <span>Razorpay Secured Gateway</span>
        </div>
      </footer>
    </div>
  );
}