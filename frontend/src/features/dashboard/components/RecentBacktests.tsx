"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

import {
  formatCurrency,
  formatSignedPercent,
  formatNumber,
  formatDateCompact,
} from "@/lib/format";

import type { PersistedBacktest } from "@/features/backtest/types";

type RecentBacktestsProps = {
  backtests: PersistedBacktest[];
};

function StatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    completed:
      "border-[#56c79d]/20 bg-[#56c79d]/10 text-[#56c79d]",
    running:
      "border-[#7da2e0]/20 bg-[#7da2e0]/10 text-[#7da2e0]",
    failed:
      "border-[#d97b72]/20 bg-[#d97b72]/10 text-[#d97b72]",
  };

  return (
    <Badge
      variant="secondary"
      className={`rounded-md border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide ${styles[status] ?? ""}`}
    >
      {status}
    </Badge>
  );
}

export default function RecentBacktests({ backtests }: RecentBacktestsProps) {
  return (
    <div className="rounded-lg border border-border bg-card">
      <div className="flex items-center justify-between px-5 py-4">
        <div>
          <h2 className="text-sm font-semibold">Recent Backtests</h2>

          <p className="mt-0.5 text-xs text-muted-foreground">
            Your latest strategy performance results
          </p>
        </div>

        <Link
          href="/backtests"
          className="inline-flex items-center gap-1 rounded-md px-3 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
        >
          View all
          <ArrowUpRight className="size-3" />
        </Link>
      </div>

      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="border-border hover:bg-transparent">
              <TableHead className="text-[10px] font-semibold uppercase tracking-[0.08em] text-muted-foreground">
                Strategy
              </TableHead>
              <TableHead className="text-[10px] font-semibold uppercase tracking-[0.08em] text-muted-foreground">
                Capital
              </TableHead>
              <TableHead className="text-[10px] font-semibold uppercase tracking-[0.08em] text-muted-foreground">
                Return
              </TableHead>
              <TableHead className="text-[10px] font-semibold uppercase tracking-[0.08em] text-muted-foreground">
                Sharpe
              </TableHead>
              <TableHead className="text-[10px] font-semibold uppercase tracking-[0.08em] text-muted-foreground">
                Date
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
                  className="py-12 text-center text-sm text-muted-foreground"
                >
                  No backtests run yet. Create your first backtest to get started.
                </TableCell>
              </TableRow>
            ) : (
              backtests.map((backtest) => (
                <TableRow
                  key={backtest.id}
                  className="border-border/50 transition-colors hover:bg-accent/30"
                >
                  <TableCell className="font-medium">
                    <Link
                      href={`/backtests/${backtest.id}`}
                      className="transition-colors hover:text-[#7da2e0]"
                    >
                      {backtest.strategy}
                    </Link>
                  </TableCell>

                  <TableCell className="font-financial text-xs">
                    {formatCurrency(backtest.initialCapital)}
                  </TableCell>

                  <TableCell>
                    <span
                      className={[
                        "font-financial text-xs font-semibold",
                        backtest.totalReturnPercent >= 0
                          ? "text-[#56c79d]"
                          : "text-[#d97b72]",
                      ].join(" ")}
                    >
                      {formatSignedPercent(backtest.totalReturnPercent)}
                    </span>
                  </TableCell>

                  <TableCell className="font-financial text-xs">
                    {formatNumber(backtest.sharpeRatio)}
                  </TableCell>

                  <TableCell className="text-xs text-muted-foreground">
                    {formatDateCompact(backtest.createdAt)}
                  </TableCell>

                  <TableCell>
                    <StatusBadge status={backtest.status} />
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
