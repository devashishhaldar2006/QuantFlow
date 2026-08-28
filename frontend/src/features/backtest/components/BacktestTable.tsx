"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { CheckCircle2, Clock, XCircle } from "lucide-react";
import type { BacktestSummary } from "../types";
import { formatCurrency, formatSignedPercent, formatNumber, formatDateCompact } from "@/lib/format";

type BacktestTableProps = {
  backtests: BacktestSummary[];
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
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

export default function BacktestTable({
  backtests,
  page,
  pageSize,
  total,
  totalPages,
}: BacktestTableProps) {
  const searchParams = useSearchParams();

  const startIndex = total === 0 ? 0 : (page - 1) * pageSize + 1;
  const endIndex = Math.min(page * pageSize, total);

  function getPageUrl(nextPage: number) {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", String(nextPage));
    return `/backtests?${params.toString()}`;
  }

  return (
    <div className="overflow-x-auto rounded-md border border-slate-700">
      <table className="w-full min-w-[800px] text-sm text-left">
        <thead className="bg-slate-900/50 text-xs uppercase font-semibold text-slate-400 border-b border-slate-700">
          <tr>
            <th className="px-4 py-3 font-semibold">Strategy</th>
            <th className="px-4 py-3 text-right font-semibold">Initial Capital</th>
            <th className="px-4 py-3 text-right font-semibold">Return</th>
            <th className="px-4 py-3 text-right font-semibold">Sharpe</th>
            <th className="px-4 py-3 text-right font-semibold">Drawdown</th>
            <th className="px-4 py-3 text-center font-semibold">Status</th>
          </tr>
        </thead>
        <tbody>
          {backtests.length === 0 ? (
            <tr>
              <td colSpan={6} className="py-12 text-center text-sm text-slate-500 bg-slate-900/20">
                No backtests found.
              </td>
            </tr>
          ) : (
            backtests.map((backtest) => (
              <tr
                key={backtest.id}
                className="border-b border-slate-800 transition-colors hover:bg-slate-800/50 last:border-0"
              >
                <td className="px-4 py-3 font-medium text-slate-200">
                  <div className="flex flex-col gap-0.5">
                    <Link href={`/backtests/${backtest.id}`} className="hover:underline decoration-slate-500 underline-offset-2 transition-all">
                      {backtest.strategy}
                    </Link>
                    <span className="text-[10px] font-normal text-slate-500">
                      {formatDateCompact(backtest.createdAt)}
                    </span>
                  </div>
                </td>
                <td className="px-4 py-3 text-right font-mono text-slate-300">
                  {formatCurrency(backtest.initialCapital)}
                </td>
                <td className={`px-4 py-3 text-right font-mono ${backtest.totalReturnPercent >= 0 ? 'text-emerald-500' : 'text-red-500'}`}>
                  {formatSignedPercent(backtest.totalReturnPercent)}
                </td>
                <td className="px-4 py-3 text-right font-mono text-slate-300">
                  {formatNumber(backtest.sharpeRatio)}
                </td>
                <td className="px-4 py-3 text-right font-mono text-slate-300">
                  {backtest.maximumDrawdown > 0 ? "-" : ""}
                  {formatNumber(backtest.maximumDrawdown)}%
                </td>
                <td className="px-4 py-3 flex justify-center">
                  <StatusIcon status={backtest.status} />
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      <div className="flex items-center justify-between border-t border-slate-700 bg-slate-900/30 p-4">
        <p className="text-sm text-slate-500">
          {total === 0 ? "No backtests" : `Showing ${startIndex}–${endIndex} of ${total}`}
        </p>

        <div className="flex items-center gap-3">
          {page > 1 ? (
            <Link
              href={getPageUrl(page - 1)}
              className="rounded border border-slate-700 bg-slate-800 px-3 py-1.5 text-xs font-medium text-slate-300 transition-colors hover:bg-slate-700 hover:text-slate-100"
            >
              Previous
            </Link>
          ) : (
            <span className="cursor-not-allowed rounded border border-slate-800 bg-slate-900 px-3 py-1.5 text-xs font-medium text-slate-600">
              Previous
            </span>
          )}

          <span className="text-xs font-medium text-slate-500">
            Page {page} of {totalPages}
          </span>

          {page < totalPages ? (
            <Link
              href={getPageUrl(page + 1)}
              className="rounded border border-slate-700 bg-slate-800 px-3 py-1.5 text-xs font-medium text-slate-300 transition-colors hover:bg-slate-700 hover:text-slate-100"
            >
              Next
            </Link>
          ) : (
            <span className="cursor-not-allowed rounded border border-slate-800 bg-slate-900 px-3 py-1.5 text-xs font-medium text-slate-600">
              Next
            </span>
          )}
        </div>
      </div>
    </div>
  );
}