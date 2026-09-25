"use client";

import Link from "next/link";
import { BarChart2, TrendingUp, FileDown, Plus } from "lucide-react";
import type { AnalyticsSummary } from "@/services/analytics/analyticsService";
import AnimatedPage, { AnimatedItem } from "@/components/common/AnimatedPage";
import AnalyticsOverview from "./AnalyticsOverview";
import StrategyRanking from "./StrategyRanking";
import PerformanceComparison from "./PerformanceComparison";
import { exportAnalyticsCSV } from "@/lib/exportUtils";

type AnalyticsProps = {
  analytics: AnalyticsSummary;
};

export default function Analytics({ analytics }: AnalyticsProps) {
  const hasData = analytics.totalBacktests > 0;

  return (
    <AnimatedPage>
      {/* Header with Export Action */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-zinc-200 pb-5 mb-6">
        <div className="flex items-center gap-3">
          <div className="flex size-10 items-center justify-center rounded border border-zinc-200 bg-zinc-50 text-zinc-900">
            <TrendingUp className="size-5" />
          </div>
          <div>
            <h1 className="text-xl font-bold font-mono tracking-tight text-zinc-900">STRATEGY_ANALYTICS</h1>
            <p className="text-xs text-zinc-500 font-sans">
              Comparative return, Sharpe ratio, and drawdown benchmarks across strategy models.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {hasData && (
            <button
              type="button"
              onClick={() => exportAnalyticsCSV(analytics)}
              className="inline-flex h-8 items-center gap-1.5 rounded border border-zinc-200 bg-white px-3 text-xs font-mono font-medium text-zinc-700 transition hover:bg-zinc-50 hover:text-black shadow-none"
              title="Export Strategy Rankings as CSV"
            >
              <FileDown className="size-3.5 text-zinc-600" />
              EXPORT_CSV
            </button>
          )}

          <Link
            href="/backtests/new"
            className="inline-flex h-8 items-center gap-1.5 rounded bg-zinc-950 px-3.5 text-xs font-mono font-semibold text-white shadow-sm transition hover:bg-zinc-800"
          >
            <Plus className="size-3.5" />
            NEW_BACKTEST
          </Link>
        </div>
      </div>

      {!hasData ? (
        <AnimatedItem>
          <div className="flex flex-col items-center justify-center py-24 rounded border border-zinc-200 bg-white text-center shadow-sm">
            <div className="flex size-14 items-center justify-center rounded border border-zinc-900 bg-zinc-950 text-white mb-4 shadow-sm">
              <BarChart2 className="size-6 text-white" />
            </div>
            <h2 className="text-base font-bold font-mono tracking-tight text-zinc-950 uppercase">
              NO_ANALYTICS_DATA
            </h2>
            <p className="mt-1.5 max-w-sm text-xs text-zinc-600 font-mono leading-relaxed">
              Run at least one completed backtest to start comparing strategy performance and risk metrics.
            </p>
            <Link
              href="/backtests/new"
              className="mt-6 inline-flex h-9 items-center gap-2 rounded bg-zinc-950 px-5 text-xs font-mono font-medium text-white hover:bg-zinc-800 transition-all shadow-sm"
            >
              LAUNCH_FIRST_BACKTEST
            </Link>
          </div>
        </AnimatedItem>
      ) : (
        <div className="space-y-8">
          <AnimatedItem><AnalyticsOverview analytics={analytics} /></AnimatedItem>
          <AnimatedItem><StrategyRanking strategies={analytics.strategies} /></AnimatedItem>
          <AnimatedItem><PerformanceComparison strategies={analytics.strategies} /></AnimatedItem>
        </div>
      )}
    </AnimatedPage>
  );
}