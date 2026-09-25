"use client";

import React from "react";
import { formatPercent, formatNumber } from "@/lib/format";
import type { PersistedBacktest } from "@/features/backtest/types";

type MetricsGridProps = {
  result: PersistedBacktest | null;
};

function MetricCard({
  label,
  value,
  sublabel,
  tone = "neutral",
}: {
  label: string;
  value: string | number;
  sublabel?: string;
  tone?: "positive" | "negative" | "neutral" | "warning";
}) {
  const getToneColor = () => {
    switch (tone) {
      case "positive":
        return "text-emerald-600";
      case "negative":
        return "text-red-600";
      case "warning":
        return "text-amber-600";
      default:
        return "text-zinc-950";
    }
  };

  return (
    <div className="flex flex-col justify-between border border-zinc-200 bg-white p-3 hover:border-zinc-900 transition-colors">
      <div className="flex items-center justify-between">
        <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-500 font-medium">
          {label}
        </span>
        {sublabel && (
          <span className="text-[9px] font-mono text-zinc-400">
            {sublabel}
          </span>
        )}
      </div>
      <div className="mt-1.5">
        <span className={`font-mono text-lg font-bold tabular-nums tracking-tight ${getToneColor()}`}>
          {value}
        </span>
      </div>
    </div>
  );
}

export default function MetricsGrid({ result }: MetricsGridProps) {
  if (!result) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="animate-pulse border border-zinc-200 bg-zinc-50 h-[60px]" />
        ))}
      </div>
    );
  }

  const isNetPositive = result.totalReturnPercent >= 0;

  const metrics = [
    {
      label: "TOTAL_RETURN",
      value: `${isNetPositive ? "+" : ""}${formatPercent(result.totalReturnPercent)}`,
      sublabel: "NAV_DELTA",
      tone: isNetPositive ? ("positive" as const) : ("negative" as const),
    },
    {
      label: "SHARPE_RATIO",
      value: formatNumber(result.sharpeRatio),
      sublabel: "RISK_ADJ",
      tone: result.sharpeRatio >= 1 ? ("positive" as const) : ("neutral" as const),
    },
    {
      label: "MAX_DRAWDOWN",
      value: `-${formatPercent(result.maximumDrawdown)}`,
      sublabel: "PEAK_TROUGH",
      tone: "negative" as const,
    },
    {
      label: "WIN_RATE",
      value: formatPercent(result.winRatePercent),
      sublabel: `${result.winningTrades}/${result.totalTrades} W`,
      tone: result.winRatePercent >= 50 ? ("positive" as const) : ("neutral" as const),
    },
    {
      label: "TOTAL_TRADES",
      value: result.totalTrades,
      sublabel: "EXECUTIONS",
      tone: "neutral" as const,
    },
    {
      label: "PROFIT_FACTOR",
      value: formatNumber(result.profitFactor),
      sublabel: "GROSS_RATIO",
      tone: result.profitFactor >= 1 ? ("positive" as const) : ("warning" as const),
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2">
      {metrics.map((metric, i) => (
        <MetricCard
          key={i}
          label={metric.label}
          value={metric.value}
          sublabel={metric.sublabel}
          tone={metric.tone}
        />
      ))}
    </div>
  );
}