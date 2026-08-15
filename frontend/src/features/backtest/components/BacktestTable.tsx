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

type BacktestTableProps = {
  backtests: BacktestSummary[];
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
};

export default function BacktestTable({
  backtests,
  page,
  pageSize,
  total,
  totalPages,
}: BacktestTableProps) {
  const searchParams = useSearchParams();

  const startIndex =
    total === 0 ? 0 : (page - 1) * pageSize + 1;

  const endIndex = Math.min(
    page * pageSize,
    total,
  );

  function getPageUrl(nextPage: number) {
    const params = new URLSearchParams(
      searchParams.toString(),
    );

    params.set("page", String(nextPage));

    return `/backtests?${params.toString()}`;
  }

  return (
    <div className="overflow-x-auto rounded-lg border bg-card">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Strategy</TableHead>
            <TableHead>Initial Capital</TableHead>
            <TableHead>Return</TableHead>
            <TableHead>Sharpe</TableHead>
            <TableHead>Drawdown</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {backtests.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={6}
                className="h-24 text-center text-muted-foreground"
              >
                No backtests found.
              </TableCell>
            </TableRow>
          ) : (
            backtests.map((backtest) => (
              <TableRow key={backtest.id}>
                <TableCell className="font-medium">
                  <Link
                    href={`/backtests/${backtest.id}`}
                    className="hover:underline"
                  >
                    {backtest.strategy}
                  </Link>
                </TableCell>

                <TableCell>
                  ₹{backtest.initialCapital.toFixed(2)}
                </TableCell>

                <TableCell
                  className={
                    backtest.totalReturnPercent >= 0
                      ? "font-medium text-emerald-500"
                      : "font-medium text-red-500"
                  }
                >
                  {backtest.totalReturnPercent >= 0
                    ? "+"
                    : ""}
                  {backtest.totalReturnPercent.toFixed(2)}%
                </TableCell>

                <TableCell>
                  {backtest.sharpeRatio.toFixed(2)}
                </TableCell>

                <TableCell>
                  {backtest.maximumDrawdown.toFixed(2)}%
                </TableCell>

                <TableCell>
                  <Badge variant="secondary">
                    {backtest.status}
                  </Badge>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>

      <div className="flex items-center justify-between border-t p-4">
        <p className="text-sm text-muted-foreground">
          {total === 0
            ? "No backtests"
            : `Showing ${startIndex}–${endIndex} of ${total} backtests`}
        </p>

        <div className="flex items-center gap-3">
          {page > 1 ? (
            <Link
              href={getPageUrl(page - 1)}
              className="rounded-md border px-3 py-2 text-sm font-medium hover:bg-accent"
            >
              Previous
            </Link>
          ) : (
            <span className="cursor-not-allowed rounded-md border px-3 py-2 text-sm text-muted-foreground">
              Previous
            </span>
          )}

          <span className="text-sm text-muted-foreground">
            Page {page} of {totalPages}
          </span>

          {page < totalPages ? (
            <Link
              href={getPageUrl(page + 1)}
              className="rounded-md border px-3 py-2 text-sm font-medium hover:bg-accent"
            >
              Next
            </Link>
          ) : (
            <span className="cursor-not-allowed rounded-md border px-3 py-2 text-sm text-muted-foreground">
              Next
            </span>
          )}
        </div>
      </div>
    </div>
  );
}