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

type Backtest = {
  strategy: string;
  symbol: string;
  return: string;
  returnPositive: boolean;
  sharpe: string;
  status: "Completed" | "Running" | "Failed";
};

const recentBacktests: Backtest[] = [
  {
    strategy: "EMA Crossover",
    symbol: "NIFTY 50",
    return: "+14.82%",
    returnPositive: true,
    sharpe: "1.62",
    status: "Completed",
  },
  {
    strategy: "RSI Mean Reversion",
    symbol: "BANKNIFTY",
    return: "+9.41%",
    returnPositive: true,
    sharpe: "1.38",
    status: "Completed",
  },
  {
    strategy: "Bollinger Bands",
    symbol: "RELIANCE",
    return: "-2.17%",
    returnPositive: false,
    sharpe: "0.72",
    status: "Completed",
  },
  {
    strategy: "MACD Strategy",
    symbol: "TCS",
    return: "+11.63%",
    returnPositive: true,
    sharpe: "1.44",
    status: "Completed",
  },
];

export default function RecentBacktests() {
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
            <TableRow key={`${backtest.strategy}-${backtest.symbol}`}>
              <TableCell className="font-medium">{backtest.strategy}</TableCell>

              <TableCell>{backtest.symbol}</TableCell>

              <TableCell
                className={
                  backtest.returnPositive
                    ? "font-medium text-emerald-600"
                    : "font-medium text-red-600"
                }
              >
                {backtest.return}
              </TableCell>

              <TableCell>{backtest.sharpe}</TableCell>

              <TableCell>
                <Badge variant="secondary">{backtest.status}</Badge>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
