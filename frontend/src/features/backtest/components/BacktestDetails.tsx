"use client";

import Link from "next/link";
import { ArrowLeft, FlaskConical, CalendarDays, ChevronRight, FileDown, Printer } from "lucide-react";

import type { PersistedBacktest } from "../types";
import AnimatedPage, { AnimatedItem } from "@/components/common/AnimatedPage";
import BacktestPerformance from "./BacktestPerformance";
import BacktestRiskMetrics from "./BacktestRiskMetrics";
import BacktestTradeHistory from "./BacktestTradeHistory";
import BacktestTradeStats from "./BacktestTradeStats";
import { RiskOfficerCard } from "@/features/ai/components/RiskOfficerCard";
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
      <div className="mb-6">
        {/* Breadcrumb */}
        <div className="mb-3 flex items-center gap-1.5 text-xs font-mono text-zinc-500">
          <Link href="/backtests" className="transition-colors hover:text-black">
            BACKTESTS
          </Link>
          <ChevronRight className="size-3 text-zinc-400" />
          <span className="font-mono text-zinc-800">#{backtest.id.slice(0, 8)}</span>
        </div>

        <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between border-b border-zinc-200 pb-5">
          <div>
            <div className="flex flex-wrap items-center gap-3">
              <h1 className="text-xl font-bold font-mono tracking-tight text-zinc-900">
                {backtest.strategy}
              </h1>
              <span className="font-mono text-[10px] font-bold px-1.5 py-0.5 border border-zinc-200 bg-zinc-50 uppercase text-zinc-800">
                {backtest.status}
              </span>
            </div>

            <div className="mt-2 flex flex-wrap items-center gap-4 text-xs font-mono text-zinc-500">
              <span className="flex items-center gap-1.5">
                <CalendarDays className="size-3.5 text-zinc-400" />
                {formatDate(backtest.createdAt)}
              </span>
              <span className="font-mono text-[10px] text-zinc-400">
                ID: {backtest.id}
              </span>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => exportBacktestCSV(backtest)}
              className="inline-flex h-8 items-center gap-1.5 rounded border border-zinc-200 bg-white px-3 text-xs font-mono font-medium text-zinc-700 transition hover:bg-zinc-50 hover:text-black shadow-none"
              title="Export Full Backtest Data to CSV"
            >
              <FileDown className="size-3.5 text-zinc-600" />
              EXPORT_CSV
            </button>

            <button
              type="button"
              onClick={() => exportBacktestPDF(backtest)}
              className="inline-flex h-8 items-center gap-1.5 rounded border border-zinc-200 bg-white px-3 text-xs font-mono font-medium text-zinc-700 transition hover:bg-zinc-50 hover:text-black shadow-none"
              title="Print / Download PDF Tear Sheet"
            >
              <Printer className="size-3.5 text-zinc-600" />
              EXPORT_PDF
            </button>

            <Link
              href="/backtests"
              className="inline-flex h-8 items-center gap-1.5 rounded border border-zinc-200 bg-white px-3 text-xs font-mono font-medium text-zinc-700 transition-colors hover:bg-zinc-50 hover:text-black"
            >
              <ArrowLeft className="size-3.5" />
              ALL_BACKTESTS
            </Link>
            <Link
              href="/backtests/new"
              className="inline-flex h-8 items-center gap-1.5 rounded bg-zinc-950 px-3.5 text-xs font-mono font-semibold text-white transition-colors hover:bg-zinc-800 shadow-none"
            >
              RUN_AGAIN
            </Link>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="space-y-8">
        {/* Autonomous Risk Officer Audit (LangGraph + Mistral) */}
        <AnimatedItem>
          <RiskOfficerCard backtestId={backtest.id} />
        </AnimatedItem>

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
    <div className="flex min-h-[50vh] flex-col items-center justify-center gap-4 text-center">
      <div className="flex size-12 items-center justify-center rounded border border-zinc-200 bg-zinc-50">
        <FlaskConical className="size-5 text-zinc-600" />
      </div>
      <div>
        <h2 className="text-sm font-bold font-mono text-zinc-900 uppercase">RECORD_NOT_FOUND</h2>
        <p className="mt-1 text-xs text-zinc-500 font-sans">
          The requested execution session does not exist or has expired from memory.
        </p>
      </div>
      <Link
        href="/backtests"
        className="inline-flex h-8 items-center gap-2 rounded border border-zinc-200 bg-white px-3 text-xs font-mono font-medium text-zinc-700 transition-colors hover:bg-zinc-50 hover:text-black"
      >
        <ArrowLeft className="size-3.5" />
        RETURN_TO_EXECUTIONS
      </Link>
    </div>
  );
}