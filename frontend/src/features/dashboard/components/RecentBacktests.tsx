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

import { backtests } from "@/features/backtest/mockData";

const recentBacktests = backtests.slice(0, 4);

export default function RecentBacktests() {
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
              <TableHead>Strategy</TableHead>
              <TableHead>Symbol</TableHead>
              <TableHead>Return</TableHead>
              <TableHead>Sharpe</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {recentBacktests.map((backtest) => (
              <TableRow key={backtest.id}>
                <TableCell className="font-medium">
                  {backtest.strategy}
                </TableCell>

                <TableCell>
                  {backtest.symbol}
                </TableCell>

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

              <TableCell>
                {backtest.sharpeRatio.toFixed(2)}
              </TableCell>

              <TableCell>
                <Badge variant="secondary">
                  {backtest.status}
                </Badge>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      </div>
    </div>
  );
}