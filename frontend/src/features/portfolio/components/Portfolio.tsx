"use client";

import Link from "next/link";
import { Folder, Briefcase, FileDown, Plus } from "lucide-react";
import type { PortfolioSummary } from "@/services/portfolio/portfolioService";
import AnimatedPage, { AnimatedItem } from "@/components/common/AnimatedPage";
import PortfolioOverview from "./PortfolioOverview";
import StrategyAllocation from "./StrategyAllocation";
import PortfolioActivity from "./PortfolioActivity";
import { exportPortfolioCSV } from "@/lib/exportUtils";

type PortfolioProps = {
  portfolio: PortfolioSummary;
};

export default function Portfolio({ portfolio }: PortfolioProps) {
  const hasData = portfolio.totalBacktests > 0;

  return (
    <AnimatedPage>
      {/* Header with Export Action */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-zinc-200 pb-5 mb-6">
        <div className="flex items-center gap-3">
          <div className="flex size-10 items-center justify-center rounded border border-zinc-200 bg-zinc-50 text-zinc-900">
            <Briefcase className="size-5" />
          </div>
          <div>
            <h1 className="text-xl font-bold font-mono tracking-tight text-zinc-900">PORTFOLIO_ANALYTICS</h1>
            <p className="text-xs text-zinc-500 font-sans">
              Consolidated capital allocation, strategy performance, and execution ledger.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {hasData && (
            <button
              type="button"
              onClick={() => exportPortfolioCSV(portfolio)}
              className="inline-flex h-8 items-center gap-1.5 rounded border border-zinc-200 bg-white px-3 text-xs font-mono font-medium text-zinc-700 transition hover:bg-zinc-50 hover:text-black shadow-none"
              title="Export Portfolio Analytics as CSV"
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
          <div className="flex flex-col items-center justify-center py-24 rounded border border-zinc-200 bg-white text-center">
            <div className="flex size-14 items-center justify-center rounded border border-zinc-200 bg-zinc-50 mb-4">
              <Folder className="size-6 text-zinc-500" />
            </div>
            <h2 className="text-lg font-bold font-mono text-zinc-900">NO_PORTFOLIO_DATA</h2>
            <p className="mt-1.5 max-w-sm text-xs text-zinc-600 font-sans">
              Execute a strategy backtest to populate your quantitative portfolio with return analytics and order ledgers.
            </p>
            <Link
              href="/backtests/new"
              className="mt-5 inline-flex h-9 items-center gap-2 rounded bg-zinc-950 px-5 text-xs font-mono font-medium text-white hover:bg-zinc-800 transition-all shadow-sm"
            >
              LAUNCH_FIRST_BACKTEST
            </Link>
          </div>
        </AnimatedItem>
      ) : (
        <div className="space-y-8">
          <AnimatedItem><PortfolioOverview portfolio={portfolio} /></AnimatedItem>
          <AnimatedItem><StrategyAllocation strategies={portfolio.strategies} /></AnimatedItem>
          <AnimatedItem><PortfolioActivity activities={portfolio.activities} /></AnimatedItem>
        </div>
      )}
    </AnimatedPage>
  );
}