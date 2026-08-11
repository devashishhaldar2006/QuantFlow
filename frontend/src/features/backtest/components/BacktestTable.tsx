import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Badge } from "@/components/ui/badge";

import type { Backtest } from "../types";

type BacktestTableProps = {
  backtests: Backtest[];
};

export default function BacktestTable({ backtests }: BacktestTableProps) {
  return (
    <div className="rounded-lg border bg-card overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Strategy</TableHead>
            <TableHead>Symbol</TableHead>
            <TableHead>Timeframe</TableHead>
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
                colSpan={7}
                className="h-24 text-center text-muted-foreground"
              >
                No backtests found.
              </TableCell>
            </TableRow>
          ) : (
            backtests.map((backtest) => (
              <TableRow key={backtest.id}>
                <TableCell className="font-medium">
                  {backtest.strategy}
                </TableCell>

                <TableCell>{backtest.symbol}</TableCell>

                <TableCell>{backtest.timeframe}</TableCell>

                <TableCell
                  className={
                    backtest.returnPercentage >= 0
                      ? "font-medium text-emerald-500"
                      : "font-medium text-red-500"
                  }
                >
                  {backtest.returnPercentage >= 0 ? "+" : ""}
                  {backtest.returnPercentage.toFixed(2)}%
                </TableCell>

                <TableCell>{backtest.sharpeRatio.toFixed(2)}</TableCell>

                <TableCell>{backtest.maxDrawdown.toFixed(2)}%</TableCell>

                <TableCell>
                  <Badge variant="secondary">{backtest.status}</Badge>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}
