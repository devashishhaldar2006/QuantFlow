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
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-slate-800/80 pb-5 mb-6">
        <div className="flex items-center gap-3">
          <div className="flex size-10 items-center justify-center rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400">
            <TrendingUp className="size-5" />
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight text-slate-100">Strategy Analytics</h1>
            <p className="text-xs text-slate-400">
              Comparative return, Sharpe ratio, and drawdown benchmarks across strategy models.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {hasData && (
            <button
              type="button"
              onClick={() => exportAnalyticsCSV(analytics)}
              className="inline-flex h-9 items-center gap-1.5 rounded-lg border border-slate-700 bg-slate-900/80 px-3.5 text-xs font-semibold text-slate-300 transition hover:border-slate-600 hover:bg-slate-800 hover:text-white shadow-sm"
              title="Export Strategy Rankings as CSV"
            >
              <FileDown className="size-3.5 text-emerald-400" />
              Export CSV
            </button>
          )}

          <Link
            href="/backtests/new"
            className="inline-flex h-9 items-center gap-1.5 rounded-lg bg-indigo-600 px-4 text-xs font-semibold text-white shadow-lg shadow-indigo-500/25 transition hover:bg-indigo-500"
          >
            <Plus className="size-3.5" />
            New Backtest
          </Link>
        </div>
      </div>

      {!hasData ? (
        <AnimatedItem>
          <div className="glass-panel flex flex-col items-center justify-center py-24 rounded-2xl text-center">
            <div className="flex size-14 items-center justify-center rounded-full border border-slate-700/50 bg-slate-800/30 mb-4 shadow-inner">
              <BarChart2 className="size-6 text-slate-400" />
            </div>
            <h2 className="text-lg font-semibold text-slate-200">No Analytics Data</h2>
            <p className="mt-1.5 max-w-sm text-xs text-slate-500">
              Run at least one completed backtest to start comparing strategy performance and risk.
            </p>
            <Link
              href="/backtests/new"
              className="mt-5 inline-flex h-9 items-center gap-2 rounded-xl bg-indigo-600 px-5 text-xs font-semibold text-white shadow-lg shadow-indigo-500/25 hover:bg-indigo-500 transition-all"
            >
              Launch First Backtest
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