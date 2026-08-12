"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

import type { BacktestResult } from "@/features/backtest/types";

type RecentBacktestsProps = {
  result: BacktestResult | null;
};

function formatNumber(value: number, decimals = 2) {
  return value.toFixed(decimals);
}

export default function RecentBacktests({
  result,
}: RecentBacktestsProps) {
  return (
    <div className="rounded-lg border bg-card">
      <div className="flex items-center justify-between p-6">
        <div>
          <h2 className="text-base font-semibold">
            Recent Backtests
          </h2>

          <p className="text-sm text-muted-foreground">
            Your latest strategy performance results.
          </p>
        </div>

        <Link
          href="/backtests"
          className="inline-flex h-8 items-center justify-center rounded-md px-3 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground"
        >
          View all
        </Link>
      </div>

      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Result</TableHead>
              <TableHead>Initial Capital</TableHead>
              <TableHead>Return</TableHead>
              <TableHead>Sharpe</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {!result ? (
              <TableRow>
                <TableCell
                  colSpan={5}
                  className="text-center text-muted-foreground"
                >
                  No backtests run yet.
                </TableCell>
              </TableRow>
            ) : (
              <TableRow>
                <TableCell className="font-medium">
                  Latest Backtest
                </TableCell>

                <TableCell>
                  ₹{formatNumber(result.initialCapital)}
                </TableCell>

                <TableCell
                  className={
                    result.totalReturnPercent >= 0
                      ? "font-medium text-emerald-500"
                      : "font-medium text-red-500"
                  }
                >
                  {result.totalReturnPercent >= 0 ? "+" : ""}
                  {formatNumber(result.totalReturnPercent)}%
                </TableCell>

                <TableCell>
                  {formatNumber(result.sharpeRatio)}
                </TableCell>

                <TableCell>
                  <Badge variant="secondary">
                    completed
                  </Badge>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}