import type { PersistedBacktest } from "../types";

type BacktestTradeHistoryProps = {
  backtest: PersistedBacktest;
};

function formatDate(value: string) {
  return new Date(value).toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function formatNumber(value: number) {
  return value.toLocaleString("en-IN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

export default function BacktestTradeHistory({
  backtest,
}: BacktestTradeHistoryProps) {
  return (
    <section>
      <div className="mb-4">
        <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
          Execution
        </p>

        <h2 className="mt-1 text-lg font-semibold tracking-tight">
          Trade History
        </h2>
      </div>

      <div className="overflow-x-auto border border-border bg-card">
        <table className="w-full min-w-[800px] text-sm">
          <thead>
            <tr className="border-b border-border bg-muted/30">
              <th className="px-4 py-3 text-left text-[10px] font-semibold uppercase tracking-[0.1em] text-muted-foreground">
                Time
              </th>

              <th className="px-4 py-3 text-left text-[10px] font-semibold uppercase tracking-[0.1em] text-muted-foreground">
                Side
              </th>

              <th className="px-4 py-3 text-right text-[10px] font-semibold uppercase tracking-[0.1em] text-muted-foreground">
                Quantity
              </th>

              <th className="px-4 py-3 text-right text-[10px] font-semibold uppercase tracking-[0.1em] text-muted-foreground">
                Execution Price
              </th>

              <th className="px-4 py-3 text-right text-[10px] font-semibold uppercase tracking-[0.1em] text-muted-foreground">
                Commission
              </th>

              <th className="px-4 py-3 text-right text-[10px] font-semibold uppercase tracking-[0.1em] text-muted-foreground">
                Cash Flow
              </th>
            </tr>
          </thead>

          <tbody>
            {backtest.trades.length === 0 ? (
              <tr>
                <td
                  colSpan={6}
                  className="px-4 py-12 text-center text-sm text-muted-foreground"
                >
                  No trades recorded for this backtest.
                </td>
              </tr>
            ) : (
              backtest.trades.map((trade, index) => (
                <tr
                  key={`${trade.timestamp}-${index}`}
                  className="border-b border-border/70 transition-colors last:border-0 hover:bg-accent/30"
                >
                  <td className="whitespace-nowrap px-4 py-3 font-financial text-xs text-muted-foreground">
                    {formatDate(trade.timestamp)}
                  </td>

                  <td className="px-4 py-3">
                    <span
                      className={
                        trade.side === "BUY"
                          ? "font-financial text-xs font-semibold text-profit"
                          : "font-financial text-xs font-semibold text-loss"
                      }
                    >
                      {trade.side}
                    </span>
                  </td>

                  <td className="px-4 py-3 text-right font-financial text-xs">
                    {trade.quantity}
                  </td>

                  <td className="px-4 py-3 text-right font-financial text-xs">
                    {formatNumber(trade.executionPrice)}
                  </td>

                  <td className="px-4 py-3 text-right font-financial text-xs text-muted-foreground">
                    {formatNumber(trade.commission)}
                  </td>

                  <td
                    className={[
                      "px-4 py-3 text-right font-financial text-xs font-medium",
                      trade.cashFlow >= 0
                        ? "text-profit"
                        : "text-loss",
                    ].join(" ")}
                  >
                    {formatNumber(trade.cashFlow)}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}