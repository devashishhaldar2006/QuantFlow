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
    <article className="group rounded border border-zinc-200 bg-white transition-all hover:border-zinc-900 shadow-sm">
      <div className="p-5">
        {/* Header */}
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <h2 className="text-sm font-bold font-mono text-zinc-950 group-hover:text-black transition-colors">
                {strategy.displayName}
              </h2>
              <span className="rounded px-2 py-0.5 text-[10px] font-mono font-bold uppercase tracking-wider border border-zinc-900 bg-zinc-950 text-white shadow-xs">
                {strategy.category}
              </span>
              <span
                className={[
                  "rounded px-2 py-0.5 text-[10px] font-mono font-bold uppercase tracking-wider border",
                  hasPerformance
                    ? "border-emerald-300 bg-emerald-50 text-emerald-800"
                    : "border-zinc-300 bg-zinc-100 text-zinc-700",
                ].join(" ")}
              >
                {hasPerformance ? "TESTED" : "UNTESTED"}
              </span>
            </div>
            <p className="text-xs text-zinc-600 leading-relaxed font-mono">{strategy.description}</p>
          </div>
        </div>

        {/* Parameters */}
        {strategy.parameters.length > 0 && (
          <div className="mt-3.5 flex flex-wrap items-center gap-2">
            <div className="flex items-center gap-1.5 text-[11px] font-mono font-bold text-zinc-900">
              <Settings2 className="size-3.5 text-zinc-900" />
              <span>PARAMETERS:</span>
            </div>
            {strategy.parameters.map((parameter) => (
              <span
                key={parameter}
                className="rounded border border-zinc-300 bg-zinc-50 px-2 py-0.5 text-[10px] font-mono font-medium text-zinc-900 hover:border-zinc-900 transition-colors"
              >
                {parameter}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-4 divide-x divide-zinc-200 border-t border-zinc-200 bg-zinc-50/70">
        <div className="px-4 py-2.5 text-center">
          <p className="text-[10px] font-bold font-mono uppercase tracking-wider text-zinc-500">TESTS</p>
          <p className="mt-0.5 font-mono text-xs font-bold text-zinc-950">{strategy.performance.backtestCount}</p>
        </div>
        <div className="px-4 py-2.5 text-center">
          <p className="text-[10px] font-bold font-mono uppercase tracking-wider text-zinc-500">AVG RETURN</p>
          <p className={`mt-0.5 font-mono text-xs font-bold ${strategy.performance.averageReturn > 0 ? "text-emerald-700" : strategy.performance.averageReturn < 0 ? "text-red-700" : "text-zinc-950"}`}>
            {formatPercent(strategy.performance.averageReturn)}
          </p>
        </div>
        <div className="px-4 py-2.5 text-center">
          <p className="text-[10px] font-bold font-mono uppercase tracking-wider text-zinc-500">AVG SHARPE</p>
          <p className="mt-0.5 font-mono text-xs font-bold text-zinc-950">{formatNumber(strategy.performance.averageSharpe)}</p>
        </div>
        <div className="px-4 py-2.5 text-center">
          <p className="text-[10px] font-bold font-mono uppercase tracking-wider text-zinc-500">BEST</p>
          <p className={`mt-0.5 font-mono text-xs font-bold ${strategy.performance.bestReturn > 0 ? "text-emerald-700" : strategy.performance.bestReturn < 0 ? "text-red-700" : "text-zinc-950"}`}>
            {formatPercent(strategy.performance.bestReturn)}
          </p>
        </div>
      </div>

      {/* Footer */}
      <div className="border-t border-zinc-200 px-5 py-2.5 bg-white">
        <Link
          href={`/backtests?strategy=${encodeURIComponent(strategy.name)}`}
          className="group/link inline-flex items-center gap-1.5 text-xs font-mono font-bold text-zinc-900 transition-colors hover:text-black"
        >
          <span>VIEW_BACKTEST_EXECUTIONS</span>
          <ArrowRight className="size-3.5 text-zinc-900 transition-transform group-hover/link:translate-x-1" />
        </Link>
      </div>
    </article>
  );
}