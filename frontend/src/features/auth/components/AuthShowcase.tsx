"use client";

import {
  Cpu,
  BarChart3,
  Activity,
  Check,
} from "lucide-react";
import { QuantFlowLogo } from "@/components/common/QuantFlowLogo";

export default function AuthShowcase() {
  const metrics = [
    {
      label: "Engine Latency",
      value: "< 0.38 ms",
      description: "Compiled C++ Execution",
      icon: Cpu,
    },
    {
      label: "Data Throughput",
      value: "1.48M+ ticks/sec",
      description: "C++ Strategy Core",
      icon: Activity,
    },
    {
      label: "Strategy Engines",
      value: "7 Models",
      description: "MACD, RSI, EMA, Bollinger",
      icon: BarChart3,
    },
  ];

  const features = [
    "C++ High-Performance Backtesting Engine",
    "Institutional Risk Metrics (Sharpe, Max Drawdown, Sortino)",
    "HMAC SHA256 Secure Razorpay Payment Verification",
    "Real-time Portfolio Equity Curve Simulation",
  ];

  return (
    <div className="relative hidden w-full flex-col justify-between overflow-hidden bg-zinc-50 p-8 lg:flex lg:w-1/2 lg:p-12 border-r border-zinc-200">
      {/* Brand Header */}
      <div className="relative z-10 flex items-center justify-between">
        <QuantFlowLogo className="size-7" textClassName="text-lg font-semibold" />

        <div className="flex items-center gap-2 rounded border border-emerald-200 bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-700 font-mono">
          <span className="size-1.5 rounded-full bg-emerald-600 animate-pulse" />
          C++ Core Active
        </div>
      </div>

      {/* Main Copy */}
      <div className="relative z-10 my-auto space-y-8 py-10 max-w-lg">
        <div className="space-y-3">
          <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-zinc-950 leading-tight">
            Institutional Quantitative Terminal & C++ Engine
          </h2>
          <p className="text-sm text-zinc-600 leading-relaxed">
            Simulate high-frequency algorithmic strategies on tick-level market data with sub-millisecond execution speeds.
          </p>
        </div>

        {/* 3 Metric Cards */}
        <div className="grid grid-cols-3 gap-3">
          {metrics.map((m) => (
            <div
              key={m.label}
              className="rounded-sm border border-zinc-200 bg-white p-3.5 space-y-1.5 shadow-sm"
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono uppercase text-zinc-400 font-medium">
                  {m.label}
                </span>
                <m.icon className="size-3.5 text-zinc-700" />
              </div>
              <p className="text-sm font-semibold text-zinc-950 font-mono">
                {m.value}
              </p>
              <p className="text-[10px] text-zinc-500 leading-tight">
                {m.description}
              </p>
            </div>
          ))}
        </div>

        {/* Checklist */}
        <div className="rounded-sm border border-zinc-200 bg-white p-4 space-y-2.5 shadow-sm">
          <p className="text-xs font-semibold text-zinc-900 font-mono uppercase tracking-wider">
            Core Infrastructure Capabilities
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-zinc-600">
            {features.map((feat) => (
              <div key={feat} className="flex items-center gap-2">
                <Check className="size-3.5 text-emerald-600 shrink-0" />
                <span>{feat}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
