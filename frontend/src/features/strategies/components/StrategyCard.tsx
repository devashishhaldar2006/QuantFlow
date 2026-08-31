"use client";

import Link from "next/link";
import { ArrowRight, Settings2 } from "lucide-react";
import type { StrategyWithPerformance } from "../types";
import { formatPercent, formatNumber } from "@/lib/format";

type StrategyCardProps = {
  strategy: StrategyWithPerformance;
};

export default function StrategyCard({ strategy }: StrategyCardProps) {
  const hasPerformance = strategy.performance.backtestCount > 0;

  return (
    <article className="group rounded-md border border-slate-700 bg-slate-900/50 transition-colors hover:border-slate-600 hover:bg-slate-900">
      <div className="p-5">
        {/* Header */}
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <h2 className="text-sm font-semibold text-slate-100 group-hover:text-indigo-400 transition-colors">
                {strategy.displayName}
              </h2>
              <span className="rounded px-1.5 py-0.5 text-[10px] font-medium uppercase tracking-wide border border-slate-700 text-slate-500">
                {strategy.category}
              </span>
              <span
                className={[
                  "rounded px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide",
                  hasPerformance
                    ? "bg-emerald-500/10 text-emerald-500"
                    : "bg-slate-800 text-slate-500",
                ].join(" ")}
              >
                {hasPerformance ? "Tested" : "Untested"}
              </span>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed">{strategy.description}</p>
          </div>
        </div>

        {/* Parameters */}
        {strategy.parameters.length > 0 && (
          <div className="mt-4 flex flex-wrap items-center gap-2">
            <div className="flex items-center gap-1.5 text-xs text-slate-500">
              <Settings2 className="size-3.5" />
              <span>Parameters:</span>
            </div>
            {strategy.parameters.map((parameter) => (
              <span
                key={parameter}
                className="rounded border border-slate-800 bg-slate-950 px-2 py-0.5 text-[10px] font-mono text-slate-400"
              >
                {parameter}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-4 divide-x divide-slate-800 border-t border-slate-800 bg-slate-900/30">
        <div className="px-4 py-3 text-center">
          <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-500">Tests</p>
          <p className="mt-1 font-mono text-sm font-medium text-slate-200">{strategy.performance.backtestCount}</p>
        </div>
        <div className="px-4 py-3 text-center">
          <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-500">Avg Return</p>
          <p className={`mt-1 font-mono text-sm font-medium ${strategy.performance.averageReturn > 0 ? "text-emerald-500" : strategy.performance.averageReturn < 0 ? "text-red-400" : "text-slate-300"}`}>
            {formatPercent(strategy.performance.averageReturn)}
          </p>
        </div>
        <div className="px-4 py-3 text-center">
          <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-500">Avg Sharpe</p>
          <p className="mt-1 font-mono text-sm font-medium text-slate-200">{formatNumber(strategy.performance.averageSharpe)}</p>
        </div>
        <div className="px-4 py-3 text-center">
          <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-500">Best</p>
          <p className={`mt-1 font-mono text-sm font-medium ${strategy.performance.bestReturn > 0 ? "text-emerald-500" : strategy.performance.bestReturn < 0 ? "text-red-400" : "text-slate-300"}`}>
            {formatPercent(strategy.performance.bestReturn)}
          </p>
        </div>
      </div>

      {/* Footer */}
      <div className="border-t border-slate-800 px-5 py-3">
        <Link
          href={`/backtests?strategy=${encodeURIComponent(strategy.name)}`}
          className="group/link inline-flex items-center gap-1.5 text-xs font-medium text-slate-400 transition-colors hover:text-slate-200"
        >
          View backtest results
          <ArrowRight className="size-3 transition-transform group-hover/link:translate-x-0.5" />
        </Link>
      </div>
    </article>
  );
}