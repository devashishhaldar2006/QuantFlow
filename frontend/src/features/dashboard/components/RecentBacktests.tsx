"use client";

import Link from "next/link";
import { ArrowUpRight, CheckCircle2, Clock, XCircle } from "lucide-react";
import { formatCurrency, formatSignedPercent, formatNumber, formatDateCompact } from "@/lib/format";
import type { PersistedBacktest } from "@/features/backtest/types";

type RecentBacktestsProps = {
  backtests: PersistedBacktest[];
};

function StatusIcon({ status }: { status: string }) {
  switch (status) {
    case "completed":
      return <div className="flex items-center gap-1.5 text-slate-400"><CheckCircle2 className="size-3.5 text-emerald-500" /> Done</div>;
    case "running":
      return <div className="flex items-center gap-1.5 text-slate-400"><Clock className="size-3.5 text-indigo-500" /> Running</div>;
    case "failed":
      return <div className="flex items-center gap-1.5 text-slate-400"><XCircle className="size-3.5 text-red-500" /> Failed</div>;
    default:
      return <span className="text-slate-500">{status}</span>;
  }
}

export default function RecentBacktests({ backtests }: RecentBacktestsProps) {
  return (
    <div className="mt-8">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-slate-100 tracking-tight">Recent Backtests</h2>
        <Link
          href="/backtests"
          className="group inline-flex items-center gap-1 text-sm font-medium text-slate-400 transition-colors hover:text-slate-200"
        >
          View all
          <ArrowUpRight className="size-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </Link>
      </div>

      <div className="overflow-x-auto rounded-xl glass-panel">
        <table className="w-full min-w-[800px] text-sm text-left">
          <thead className="bg-slate-900/40 backdrop-blur-md text-xs uppercase font-semibold text-slate-400 border-b border-slate-700/50">
            <tr>
              <th className="px-4 py-3 font-semibold">Strategy</th>
              <th className="px-4 py-3 text-right font-semibold">Capital</th>
              <th className="px-4 py-3 text-right font-semibold">Return</th>
              <th className="px-4 py-3 text-right font-semibold">Sharpe</th>
              <th className="px-4 py-3 text-right font-semibold">Date</th>
              <th className="px-4 py-3 text-center font-semibold">Status</th>
            </tr>
          </thead>
          <tbody>
            {backtests.length === 0 ? (
              <tr>
                <td colSpan={6} className="py-12 text-center text-sm text-slate-500 bg-slate-900/20">
                  No backtests run yet. Create your first backtest to get started.
                </td>
              </tr>
            ) : (
              backtests.map((backtest) => (
                <tr
                  key={backtest.id}
                  className="border-b border-slate-800 transition-colors hover:bg-slate-800/50 last:border-0"
                >
                  <td className="px-4 py-3 font-medium text-slate-200">
                    <Link href={`/backtests/${backtest.id}`} className="hover:underline decoration-slate-500 underline-offset-2 transition-all">
                      {backtest.strategy}
                    </Link>
                  </td>
                  <td className="px-4 py-3 text-right font-mono text-slate-300">
                    {formatCurrency(backtest.initialCapital)}
                  </td>
                  <td className={`px-4 py-3 text-right font-mono ${backtest.totalReturnPercent >= 0 ? 'text-profit' : 'text-loss'}`}>
                    {formatSignedPercent(backtest.totalReturnPercent)}
                  </td>
                  <td className="px-4 py-3 text-right font-mono text-slate-300">
                    {formatNumber(backtest.sharpeRatio)}
                  </td>
                  <td className="px-4 py-3 text-right font-mono text-slate-400 text-xs">
                    {formatDateCompact(backtest.createdAt)}
                  </td>
                  <td className="px-4 py-3 flex justify-center">
                    <StatusIcon status={backtest.status} />
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
