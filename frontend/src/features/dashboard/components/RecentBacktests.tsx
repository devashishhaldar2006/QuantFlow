"use client";

import React from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { formatCurrency, formatSignedPercent, formatNumber, formatDateCompact } from "@/lib/format";
import type { PersistedBacktest } from "@/features/backtest/types";

type RecentBacktestsProps = {
  backtests: PersistedBacktest[];
};

function StatusBadge({ status }: { status: string }) {
  switch (status) {
    case "completed":
      return (
        <span className="inline-flex items-center gap-1 font-mono text-[10px] text-emerald-700 bg-emerald-50 border border-emerald-200 px-1.5 py-0.2 font-medium">
          EXECUTED
        </span>
      );
    case "running":
      return (
        <span className="inline-flex items-center gap-1 font-mono text-[10px] text-amber-700 bg-amber-50 border border-amber-200 px-1.5 py-0.2 font-medium">
          COMPILING
        </span>
      );
    case "failed":
      return (
        <span className="inline-flex items-center gap-1 font-mono text-[10px] text-red-700 bg-red-50 border border-red-200 px-1.5 py-0.2 font-medium">
          ABORTED
        </span>
      );
    default:
      return <span className="font-mono text-[10px] text-zinc-500">{status}</span>;
  }
}

export default function RecentBacktests({ backtests }: RecentBacktestsProps) {
  return (
    <div className="mt-5">
      <div className="mb-2 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h2 className="text-xs font-bold font-mono uppercase text-zinc-900 tracking-tight">
            RECENT_EXECUTIONS
          </h2>
          <span className="font-mono text-[10px] text-zinc-500 border border-zinc-200 bg-zinc-50 px-1.5 py-0.2">
            {backtests.length} TOTAL
          </span>
        </div>
        <Link
          href="/backtests"
          className="group inline-flex items-center gap-1 text-[11px] font-mono text-zinc-600 hover:text-black transition-colors"
        >
          VIEW_ALL_RECORDS
          <ArrowUpRight className="size-3 text-zinc-400 group-hover:text-black transition-transform" />
        </Link>
      </div>

      <div className="overflow-x-auto border border-zinc-200 bg-white">
        <table className="w-full min-w-[700px] text-xs text-left">
          <thead className="bg-zinc-50 font-mono text-[10px] uppercase text-zinc-500 border-b border-zinc-200">
            <tr>
              <th className="px-3.5 py-2 font-medium">STRATEGY_MODEL</th>
              <th className="px-3.5 py-2 text-right font-medium">ALLOCATION</th>
              <th className="px-3.5 py-2 text-right font-medium">NET_RETURN</th>
              <th className="px-3.5 py-2 text-right font-medium">SHARPE</th>
              <th className="px-3.5 py-2 text-right font-medium">TIMESTAMP</th>
              <th className="px-3.5 py-2 text-center font-medium">STATUS</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-100">
            {backtests.length === 0 ? (
              <tr>
                <td colSpan={6} className="py-8 text-center font-mono text-xs text-zinc-400 bg-white">
                  [ NO_EXECUTIONS_RECORDED ]
                </td>
              </tr>
            ) : (
              backtests.map((backtest) => (
                <tr
                  key={backtest.id}
                  className="transition-colors hover:bg-zinc-50"
                >
                  <td className="px-3.5 py-2 font-medium text-zinc-900">
                    <Link
                      href={`/backtests/${backtest.id}`}
                      className="hover:underline font-mono text-xs"
                    >
                      {backtest.strategy}
                    </Link>
                  </td>
                  <td className="px-3.5 py-2 text-right font-mono text-zinc-700">
                    {formatCurrency(backtest.initialCapital)}
                  </td>
                  <td
                    className={`px-3.5 py-2 text-right font-mono font-bold ${
                      backtest.totalReturnPercent >= 0 ? "text-emerald-600" : "text-red-600"
                    }`}
                  >
                    {formatSignedPercent(backtest.totalReturnPercent)}
                  </td>
                  <td className="px-3.5 py-2 text-right font-mono text-zinc-700">
                    {formatNumber(backtest.sharpeRatio)}
                  </td>
                  <td className="px-3.5 py-2 text-right font-mono text-zinc-400 text-[11px]">
                    {formatDateCompact(backtest.createdAt)}
                  </td>
                  <td className="px-3.5 py-2 text-center">
                    <StatusBadge status={backtest.status} />
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
