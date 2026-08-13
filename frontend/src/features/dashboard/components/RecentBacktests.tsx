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

import type { PersistedBacktest } from "@/features/backtest/types";

type RecentBacktestsProps = {
  backtests: PersistedBacktest[];
};

function formatNumber(value: number, decimals = 2) {
  return value.toFixed(decimals);
}

export default function RecentBacktests({ backtests }: RecentBacktestsProps) {
  return (
    <div className="rounded-lg border bg-card">
      <div className="flex items-center justify-between p-6">
        <div>
          <h2 className="text-base font-semibold">Recent Backtests</h2>

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
            {backtests.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={5}
                  className="text-center text-muted-foreground"
                >
                  No backtests run yet.
                </TableCell>
              </TableRow>
            ) : (
              backtests.map((backtest) => (
                <TableRow key={backtest.id}>
                  <TableCell className="font-medium">
                    {backtest.strategy}
                  </TableCell>

                  <TableCell>
                    ₹{formatNumber(backtest.initialCapital)}
                  </TableCell>

                  <TableCell
                    className={
                      backtest.totalReturnPercent >= 0
                        ? "font-medium text-emerald-500"
                        : "font-medium text-red-500"
                    }
                  >
                    {backtest.totalReturnPercent >= 0 ? "+" : ""}
                    {formatNumber(backtest.totalReturnPercent)}%
                  </TableCell>

                  <TableCell>{formatNumber(backtest.sharpeRatio)}</TableCell>

                  <TableCell>
                    <Badge variant="secondary">{backtest.status}</Badge>
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
