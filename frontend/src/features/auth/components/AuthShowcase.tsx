"use client";

import { motion } from "framer-motion";
import {
  Zap,
  ShieldCheck,
  Cpu,
  BarChart3,
  CheckCircle2,
  TrendingUp,
  Activity,
  Layers,
} from "lucide-react";

export default function AuthShowcase() {
  const metrics = [
    {
      label: "Engine Latency",
      value: "< 0.5 ms",
      description: "Compiled C++ Execution",
      icon: Cpu,
      color: "text-emerald-400",
    },
    {
      label: "Data Throughput",
      value: "1.48M+ ticks/sec",
      description: "C++ Strategy Core",
      icon: Activity,
      color: "text-indigo-400",
    },
    {
      label: "Strategy Engines",
      value: "7 Models",
      description: "MACD, RSI, EMA, Bollinger",
      icon: BarChart3,
      color: "text-amber-400",
    },
  ];

  const features = [
    "C++ High-Performance Backtesting Engine",
    "Institutional Risk Metrics (Sharpe, Max Drawdown, Sortino)",
    "HMAC SHA256 Secure Razorpay Payment Verification",
    "Real-time Portfolio Equity Curve Simulation",
  ];

  return (
    <div className="relative hidden w-full flex-col justify-between overflow-hidden bg-[#070D18] p-8 lg:flex lg:w-1/2 lg:p-12 border-r border-white/5">
      {/* Background Lighting & FX */}
      <motion.div
        animate={{ scale: [1, 1.2, 1], opacity: [0.15, 0.25, 0.15] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -left-20 -top-20 size-96 rounded-full bg-indigo-600/20 blur-3xl pointer-events-none"
      />
      <motion.div
        animate={{ scale: [1, 1.15, 1], opacity: [0.1, 0.2, 0.1] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="absolute -bottom-20 -right-20 size-96 rounded-full bg-emerald-600/15 blur-3xl pointer-events-none"
      />
      <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:24px_24px] opacity-20 pointer-events-none" />

      {/* Brand Header */}
      <div className="relative z-10 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex size-10 items-center justify-center rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-500 shadow-lg shadow-indigo-500/30">
            <Zap className="size-5 text-white fill-current" />
          </div>
          <div>
            <span className="text-xl font-extrabold tracking-tight text-white">
              Quant<span className="text-indigo-400">Flow</span>
            </span>
            <span className="ml-2.5 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-2.5 py-0.5 text-[10px] font-semibold text-indigo-400 uppercase tracking-wider">
              Terminal v2.4
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-400">
          <span className="relative flex size-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-50" />
            <span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
          </span>
          C++ Core Active
        </div>
      </div>

      {/* Hero Showcase Content */}
      <div className="relative z-10 my-auto space-y-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-4 max-w-lg"
        >
          <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl leading-tight">
            Institutional Quantitative Terminal & C++ Engine
          </h2>
          <p className="text-sm leading-relaxed text-slate-400">
            Simulate high-frequency algorithmic strategies on tick-level market data with sub-millisecond execution speeds.
          </p>
        </motion.div>

        {/* Technical Metrics Grid with Motion */}
        <div className="grid gap-4 sm:grid-cols-3">
          {metrics.map((m, idx) => {
            const Icon = m.icon;
            return (
              <motion.div
                key={m.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                whileHover={{ y: -4 }}
                className="glass-panel rounded-xl p-4 border border-white/10 bg-white/[0.03] backdrop-blur-xl transition hover:border-indigo-500/30"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-medium uppercase tracking-wider text-slate-400">
                    {m.label}
                  </span>
                  <Icon className={`size-4 ${m.color}`} />
                </div>
                <div className="mt-2 text-lg font-bold text-white">
                  {m.value}
                </div>
                <div className="mt-0.5 text-[11px] text-slate-400 truncate">
                  {m.description}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Feature List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="space-y-3 rounded-2xl border border-white/10 bg-white/[0.02] p-5 backdrop-blur-md"
        >
          <div className="text-xs font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-2">
            <Layers className="size-3.5 text-indigo-400" />
            Core Infrastructure Capabilities
          </div>
          <div className="grid gap-2.5 sm:grid-cols-2 pt-1">
            {features.map((feat) => (
              <div key={feat} className="flex items-start gap-2.5">
                <CheckCircle2 className="size-4 shrink-0 text-emerald-400 mt-0.5" />
                <span className="text-xs text-slate-300 leading-snug">{feat}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Footer Quote */}
      <div className="relative z-10 border-t border-white/5 pt-4 flex items-center justify-between text-xs text-slate-500">
        <div className="flex items-center gap-2">
          <ShieldCheck className="size-4 text-slate-400" />
          <span>Encrypted Session & HMAC Verified Integrity</span>
        </div>
        <div className="flex items-center gap-1 font-mono text-[11px] text-slate-600">
          <TrendingUp className="size-3 text-emerald-500" />
          <span>QuantFlow OS</span>
        </div>
      </div>
    </div>
  );
}
