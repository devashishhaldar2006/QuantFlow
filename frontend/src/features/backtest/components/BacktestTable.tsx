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
    <div className="overflow-x-auto rounded border border-zinc-200 bg-white">
      <table className="w-full min-w-[800px] text-xs text-left">
        <thead className="bg-zinc-50 font-mono text-[10px] uppercase font-bold text-zinc-500 border-b border-zinc-200 tracking-wider">
          <tr>
            <th className="px-4 py-3 font-semibold">MODEL / TIMESTAMP</th>
            <th className="px-4 py-3 text-right font-semibold">CAPITAL</th>
            <th className="px-4 py-3 text-right font-semibold">RETURN</th>
            <th className="px-4 py-3 text-right font-semibold">SHARPE</th>
            <th className="px-4 py-3 text-right font-semibold">MAX_DRAWDOWN</th>
            <th className="px-4 py-3 text-center font-semibold">STATE</th>
          </tr>
        </thead>
        <tbody>
          {backtests.length === 0 ? (
            <tr>
              <td colSpan={6} className="py-12 text-center text-xs font-mono text-zinc-400 bg-white">
                NO_EXECUTIONS_RECORDED
              </td>
            </tr>
          ) : (
            backtests.map((backtest) => (
              <tr
                key={backtest.id}
                className="border-b border-zinc-200 transition-colors hover:bg-zinc-50 last:border-0"
              >
                <td className="px-4 py-3 font-mono font-medium text-zinc-900">
                  <div className="flex flex-col gap-0.5">
                    <Link href={`/backtests/${backtest.id}`} className="hover:underline font-bold text-black transition-all">
                      {backtest.strategy}
                    </Link>
                    <span className="text-[10px] font-normal text-zinc-400">
                      {formatDateCompact(backtest.createdAt)}
                    </span>
                  </div>
                </td>
                <td className="px-4 py-3 text-right font-mono text-zinc-700">
                  {formatCurrency(backtest.initialCapital)}
                </td>
                <td className={`px-4 py-3 text-right font-mono font-semibold ${backtest.totalReturnPercent >= 0 ? 'text-emerald-600' : 'text-red-600'}`}>
                  {formatSignedPercent(backtest.totalReturnPercent)}
                </td>
                <td className="px-4 py-3 text-right font-mono text-zinc-700">
                  {formatNumber(backtest.sharpeRatio)}
                </td>
                <td className="px-4 py-3 text-right font-mono text-zinc-700">
                  {backtest.maximumDrawdown > 0 ? "-" : ""}
                  {formatNumber(backtest.maximumDrawdown)}%
                </td>
                <td className="px-4 py-3 flex justify-center items-center">
                  <StatusIcon status={backtest.status} />
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      <div className="flex items-center justify-between border-t border-zinc-200 bg-zinc-50/50 px-4 py-3 font-mono text-xs text-zinc-500">
        <p>
          {total === 0 ? "TOTAL: 0" : `SHOWING ${startIndex}–${endIndex} OF ${total}`}
        </p>

        <div className="flex items-center gap-2">
          {page > 1 ? (
            <Link
              href={getPageUrl(page - 1)}
              className="rounded border border-zinc-200 bg-white px-2.5 py-1 text-xs font-mono font-medium text-zinc-700 transition-colors hover:bg-zinc-50 hover:text-black"
            >
              PREV
            </Link>
          ) : (
            <span className="rounded border border-zinc-200/60 bg-zinc-100 px-2.5 py-1 text-xs font-mono font-medium text-zinc-400 cursor-not-allowed">
              PREV
            </span>
          )}

          <span className="text-xs font-mono text-zinc-600">
            {page} / {totalPages || 1}
          </span>

          {page < totalPages ? (
            <Link
              href={getPageUrl(page + 1)}
              className="rounded border border-zinc-200 bg-white px-2.5 py-1 text-xs font-mono font-medium text-zinc-700 transition-colors hover:bg-zinc-50 hover:text-black"
            >
              NEXT
            </Link>
          ) : (
            <span className="rounded border border-zinc-200/60 bg-zinc-100 px-2.5 py-1 text-xs font-mono font-medium text-zinc-400 cursor-not-allowed">
              NEXT
            </span>
          )}
        </div>
      </div>
    </div>
  );
}