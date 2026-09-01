"use client";

import Link from "next/link";
import { ArrowLeft, FlaskConical, CalendarDays, ChevronRight, FileDown, Printer } from "lucide-react";

import type { PersistedBacktest } from "../types";
import AnimatedPage, { AnimatedItem } from "@/components/common/AnimatedPage";
import BacktestPerformance from "./BacktestPerformance";
import BacktestRiskMetrics from "./BacktestRiskMetrics";
import BacktestTradeHistory from "./BacktestTradeHistory";
import BacktestTradeStats from "./BacktestTradeStats";
import { formatDate } from "@/lib/format";
import { exportBacktestCSV, exportBacktestPDF } from "@/lib/exportUtils";

type BacktestDetailsProps = {
  backtest: PersistedBacktest;
};

const statusColors: Record<string, { dot: string; text: string }> = {
  completed: { dot: "bg-emerald-500", text: "text-emerald-500" },
  running: { dot: "bg-indigo-500", text: "text-indigo-400" },
  failed: { dot: "bg-red-500", text: "text-red-400" },
};

export default function BacktestDetails({ backtest }: BacktestDetailsProps) {
  const statusStyle = statusColors[backtest.status] ?? { dot: "bg-slate-500", text: "text-slate-400" };

  return (
    <AnimatedPage>
      {/* Page Header */}
      <div className="mb-8">
        {/* Breadcrumb */}
        <div className="mb-4 flex items-center gap-1.5 text-xs text-slate-500">
          <Link href="/backtests" className="transition-colors hover:text-slate-300">
            Backtests
          </Link>
          <ChevronRight className="size-3" />
          <span className="font-mono text-slate-400">#{backtest.id.slice(0, 8)}</span>
        </div>

        <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <div>
            <div className="flex flex-wrap items-center gap-3">
              <h1 className="text-2xl font-bold tracking-tight text-slate-100">
                {backtest.strategy}
              </h1>
              <div className="flex items-center gap-1.5">
                <span className={`size-2 rounded-full ${statusStyle.dot}`} />
                <span className={`text-xs font-medium capitalize ${statusStyle.text}`}>
                  {backtest.status}
                </span>
              </div>
            </div>

            <div className="mt-2 flex flex-wrap items-center gap-4 text-xs text-slate-500">
              <span className="flex items-center gap-1.5">
                <CalendarDays className="size-3.5" />
                {formatDate(backtest.createdAt)}
              </span>
              <span className="font-mono text-[10px] text-slate-600">
                ID: {backtest.id}
              </span>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => exportBacktestCSV(backtest)}
              className="inline-flex h-9 items-center gap-1.5 rounded-lg border border-slate-700 bg-slate-900/80 px-3 text-xs font-semibold text-slate-300 transition hover:border-slate-600 hover:bg-slate-800 hover:text-white shadow-sm"
              title="Export Full Backtest Data to CSV"
            >
              <FileDown className="size-3.5 text-emerald-400" />
              Export CSV
            </button>

            <button
              type="button"
              onClick={() => exportBacktestPDF(backtest)}
              className="inline-flex h-9 items-center gap-1.5 rounded-lg border border-indigo-500/30 bg-indigo-600/10 px-3 text-xs font-semibold text-indigo-300 transition hover:bg-indigo-600/20 hover:border-indigo-500/50 shadow-sm"
              title="Print / Download PDF Tear Sheet"
            >
              <Printer className="size-3.5 text-indigo-400" />
              Export PDF
            </button>

            <Link
              href="/backtests"
              className="inline-flex h-9 items-center gap-1.5 rounded-lg border border-slate-700 bg-slate-900 px-3.5 text-xs font-medium text-slate-300 transition-colors hover:bg-slate-800 hover:text-slate-100"
            >
              <ArrowLeft className="size-3.5" />
              All Backtests
            </Link>
            <Link
              href="/backtests/new"
              className="inline-flex h-9 items-center gap-1.5 rounded-lg bg-indigo-500 px-3.5 text-xs font-medium text-white transition-colors hover:bg-indigo-600 shadow-md shadow-indigo-500/20"
            >
              Run Again
            </Link>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="space-y-8">
        <AnimatedItem>
          <BacktestPerformance backtest={backtest} />
        </AnimatedItem>

        <div className="grid gap-6 xl:grid-cols-2">
          <AnimatedItem>
            <BacktestRiskMetrics backtest={backtest} />
          </AnimatedItem>
          <AnimatedItem>
            <BacktestTradeStats backtest={backtest} />
          </AnimatedItem>
        </div>

        <AnimatedItem>
          <BacktestTradeHistory backtest={backtest} />
        </AnimatedItem>
      </div>
    </AnimatedPage>
  );
}

export function BacktestNotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 text-center">
      <div className="flex size-14 items-center justify-center rounded-full border border-slate-700 bg-slate-900">
        <FlaskConical className="size-6 text-slate-500" />
      </div>
      <div>
        <h2 className="text-lg font-semibold text-slate-200">Backtest Not Found</h2>
        <p className="mt-1 text-sm text-slate-500">
          The requested backtest does not exist or is no longer available.
        </p>
      </div>
      <Link
        href="/backtests"
        className="inline-flex h-9 items-center gap-2 rounded-md border border-slate-700 bg-slate-900 px-4 text-sm font-medium text-slate-300 transition-colors hover:bg-slate-800 hover:text-slate-100"
      >
        <ArrowLeft className="size-4" />
        Back to Backtests
      </Link>
    </div>
  );
}