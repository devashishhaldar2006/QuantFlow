"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Badge } from "@/components/ui/badge";

import type { BacktestSummary } from "../types";
import {
  formatCurrency,
  formatSignedPercent,
  formatNumber,
  formatDateCompact,
} from "@/lib/format";

type BacktestTableProps = {
  backtests: BacktestSummary[];
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
};

const statusStyles: Record<string, string> = {
  completed: "border-[#56c79d]/20 bg-[#56c79d]/10 text-[#56c79d]",
  running: "border-[#7da2e0]/20 bg-[#7da2e0]/10 text-[#7da2e0]",
  failed: "border-[#d97b72]/20 bg-[#d97b72]/10 text-[#d97b72]",
};

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
    <div className="overflow-x-auto rounded-lg border border-border bg-card">
      <Table>
        <TableHeader>
          <TableRow className="border-border hover:bg-transparent">
            <TableHead className="text-[10px] font-semibold uppercase tracking-[0.08em] text-muted-foreground">
              Strategy
            </TableHead>
            <TableHead className="text-[10px] font-semibold uppercase tracking-[0.08em] text-muted-foreground">
              Initial Capital
            </TableHead>
            <TableHead className="text-[10px] font-semibold uppercase tracking-[0.08em] text-muted-foreground">
              Return
            </TableHead>
            <TableHead className="text-[10px] font-semibold uppercase tracking-[0.08em] text-muted-foreground">
              Sharpe
            </TableHead>
            <TableHead className="text-[10px] font-semibold uppercase tracking-[0.08em] text-muted-foreground">
              Drawdown
            </TableHead>
            <TableHead className="text-[10px] font-semibold uppercase tracking-[0.08em] text-muted-foreground">
              Status
            </TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {backtests.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={6}
                className="h-32 text-center text-sm text-muted-foreground"
              >
                No backtests found.
              </TableCell>
            </TableRow>
          ) : (
            backtests.map((backtest) => (
              <TableRow
                key={backtest.id}
                className="border-border/50 transition-colors hover:bg-[#1c2640]/30"
              >
                <TableCell className="font-medium">
                  <Link
                    href={`/backtests/${backtest.id}`}
                    className="transition-colors hover:text-[#7da2e0]"
                  >
                    {backtest.strategy}
                  </Link>
                  <div className="mt-1 text-[10px] text-muted-foreground">
                    {formatDateCompact(backtest.createdAt)}
                  </div>
                </TableCell>

                <TableCell className="font-financial text-xs">
                  {formatCurrency(backtest.initialCapital)}
                </TableCell>

                <TableCell
                  className={[
                    "font-financial text-xs font-semibold",
                    backtest.totalReturnPercent >= 0
                      ? "text-[#56c79d]"
                      : "text-[#d97b72]",
                  ].join(" ")}
                >
                  {formatSignedPercent(backtest.totalReturnPercent)}
                </TableCell>

                <TableCell className="font-financial text-xs">
                  {formatNumber(backtest.sharpeRatio)}
                </TableCell>

                <TableCell className="font-financial text-xs">
                  {backtest.maximumDrawdown > 0 ? "-" : ""}
                  {formatNumber(backtest.maximumDrawdown)}%
                </TableCell>

                <TableCell>
                  <Badge
                    variant="secondary"
                    className={`rounded-md border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide ${statusStyles[backtest.status] ?? ""}`}
                  >
                    {backtest.status}
                  </Badge>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>

      <div className="flex items-center justify-between border-t border-border p-4">
        <p className="text-sm text-muted-foreground">
          {total === 0
            ? "No backtests"
            : `Showing ${startIndex}–${endIndex} of ${total} backtests`}
        </p>

        <div className="flex items-center gap-3">
          {page > 1 ? (
            <Link
              href={getPageUrl(page - 1)}
              className="rounded-md border border-border px-3 py-1.5 text-xs font-medium transition-colors hover:bg-accent hover:text-accent-foreground"
            >
              Previous
            </Link>
          ) : (
            <span className="cursor-not-allowed rounded-md border border-border/50 px-3 py-1.5 text-xs text-muted-foreground/50">
              Previous
            </span>
          )}

          <span className="text-xs text-muted-foreground">
            Page {page} of {totalPages}
          </span>

          {page < totalPages ? (
            <Link
              href={getPageUrl(page + 1)}
              className="rounded-md border border-border px-3 py-1.5 text-xs font-medium transition-colors hover:bg-accent hover:text-accent-foreground"
            >
              Next
            </Link>
          ) : (
            <span className="cursor-not-allowed rounded-md border border-border/50 px-3 py-1.5 text-xs text-muted-foreground/50">
              Next
            </span>
          )}
        </div>
      </div>
    </div>
  );
}