import { getBacktestById } from "@/services/backtest/backtestService";
import PerformanceChart from "@/features/dashboard/components/PerformanceChart";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

function Metric({ title, value }: { title: string; value: string | number }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
      </CardHeader>

      <CardContent>
        <p className="text-2xl font-semibold">{value}</p>
      </CardContent>
    </Card>
  );
}

type PageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function BacktestDetailsPage({ params }: PageProps) {
  const { id } = await params;

  const backtest = await getBacktestById(id);

  if (!backtest) {
    return (
      <div className="p-6">
        <h1 className="text-2xl font-semibold">Backtest Not Found</h1>

        <p className="text-muted-foreground">
          The requested backtest does not exist.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8 p-6">
      <div>
        <h1 className="text-2xl font-semibold">Backtest Details</h1>

        <p className="text-sm text-muted-foreground">
          Strategy: {backtest.strategy}
        </p>
      </div>

      <section>
        <h2 className="mb-4 text-lg font-semibold">Performance Summary</h2>

        <div className="grid gap-4 md:grid-cols-3">
          <Metric
            title="Initial Capital"
            value={`₹${backtest.initialCapital.toFixed(2)}`}
          />

          <Metric
            title="Final Equity"
            value={`₹${backtest.finalEquity.toFixed(2)}`}
          />

          <Metric
            title="Net Profit"
            value={`₹${backtest.netProfit.toFixed(2)}`}
          />

          <Metric
            title="Total Return"
            value={`${backtest.totalReturnPercent.toFixed(2)}%`}
          />

          <Metric
            title="Sharpe Ratio"
            value={backtest.sharpeRatio.toFixed(2)}
          />

          <Metric
            title="Maximum Drawdown"
            value={`${backtest.maximumDrawdown.toFixed(2)}%`}
          />
        </div>
      </section>

      <section>
        <PerformanceChart data={backtest.equityCurve} />
      </section>
      <section>
        <h2 className="mb-4 text-lg font-semibold">Trade Statistics</h2>

        <div className="grid gap-4 md:grid-cols-4">
          <Metric title="Total Trades" value={backtest.totalTrades} />

          <Metric title="Winning Trades" value={backtest.winningTrades} />

          <Metric title="Losing Trades" value={backtest.losingTrades} />

          <Metric
            title="Win Rate"
            value={`${backtest.winRatePercent.toFixed(2)}%`}
          />
        </div>
      </section>
      <section>
        <h2 className="mb-4 text-lg font-semibold">Risk & Statistics</h2>

        <div className="grid gap-4 md:grid-cols-4">
          <Metric
            title="Profit Factor"
            value={backtest.profitFactor.toFixed(2)}
          />

          <Metric title="Expectancy" value={backtest.expectancy.toFixed(2)} />

          <Metric
            title="Annualized Return"
            value={`${(backtest.annualizedReturn * 100).toFixed(2)}%`}
          />

          <Metric
            title="Volatility"
            value={`${(backtest.annualizedVolatility * 100).toFixed(2)}%`}
          />
        </div>
      </section>
      <section>
        <h2 className="mb-4 text-lg font-semibold">Trade Quality</h2>

        <div className="grid gap-4 md:grid-cols-4">
          <Metric title="Average Win" value={backtest.averageWin.toFixed(2)} />

          <Metric
            title="Average Loss"
            value={backtest.averageLoss.toFixed(2)}
          />

          <Metric title="Largest Win" value={backtest.largestWin.toFixed(2)} />

          <Metric
            title="Largest Loss"
            value={backtest.largestLoss.toFixed(2)}
          />
        </div>
      </section>
      <section>
        <h2 className="mb-4 text-lg font-semibold">Trade History</h2>

        <div className="overflow-x-auto rounded-lg border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Time</TableHead>
                <TableHead>Side</TableHead>
                <TableHead>Quantity</TableHead>
                <TableHead>Execution Price</TableHead>
                <TableHead>Commission</TableHead>
                <TableHead>Cash Flow</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {backtest.trades.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={6}
                    className="text-center text-muted-foreground"
                  >
                    No trades recorded.
                  </TableCell>
                </TableRow>
              ) : (
                backtest.trades.map((trade, index) => (
                  <TableRow key={`${trade.timestamp}-${index}`}>
                    <TableCell>{trade.timestamp}</TableCell>

                    <TableCell
                      className={
                        trade.side === "BUY"
                          ? "font-medium text-emerald-500"
                          : "font-medium text-red-500"
                      }
                    >
                      {trade.side}
                    </TableCell>

                    <TableCell>{trade.quantity}</TableCell>

                    <TableCell>{trade.executionPrice.toFixed(2)}</TableCell>

                    <TableCell>{trade.commission.toFixed(2)}</TableCell>

                    <TableCell
                      className={
                        trade.cashFlow >= 0
                          ? "text-emerald-500"
                          : "text-red-500"
                      }
                    >
                      {trade.cashFlow.toFixed(2)}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </section>
    </div>
  );
}
