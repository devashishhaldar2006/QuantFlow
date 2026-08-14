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

import type { PersistedBacktest } from "../types";

type BacktestTableProps = {
  backtests: PersistedBacktest[];
};

export default function BacktestTable({
  backtests,
}: BacktestTableProps) {
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
              <TableRow
                key={backtest.id}
                className="cursor-pointer hover:bg-muted/50"
              >
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
                  {backtest.totalReturnPercent >= 0 ? "+" : ""}
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
    </div>
  );
}