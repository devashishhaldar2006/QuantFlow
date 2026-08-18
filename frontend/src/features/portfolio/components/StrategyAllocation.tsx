import type { PortfolioStrategy } from "@/services/portfolio/portfolioService";

type StrategyAllocationProps = {
  strategies: PortfolioStrategy[];
};

function formatCurrency(value: number) {
  return `₹${value.toLocaleString("en-IN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}

function formatPercent(value: number) {
  return `${value.toFixed(2)}%`;
}

export default function StrategyAllocation({
  strategies,
}: StrategyAllocationProps) {
  return (
    <section>
      <div className="mb-4">
        <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
          Strategy Breakdown
        </p>

        <h2 className="mt-1 text-lg font-semibold tracking-tight">
          Strategy Performance
        </h2>
      </div>

      <div className="overflow-x-auto border border-border bg-card">
        <table className="w-full min-w-[800px] text-sm">
          <thead>
            <tr className="border-b border-border bg-muted/30">
              <th className="px-4 py-3 text-left text-[10px] font-semibold uppercase tracking-[0.1em] text-muted-foreground">
                Strategy
              </th>

              <th className="px-4 py-3 text-right text-[10px] font-semibold uppercase tracking-[0.1em] text-muted-foreground">
                Backtests
              </th>

              <th className="px-4 py-3 text-right text-[10px] font-semibold uppercase tracking-[0.1em] text-muted-foreground">
                Capital
              </th>

              <th className="px-4 py-3 text-right text-[10px] font-semibold uppercase tracking-[0.1em] text-muted-foreground">
                Final Equity
              </th>

              <th className="px-4 py-3 text-right text-[10px] font-semibold uppercase tracking-[0.1em] text-muted-foreground">
                Net P&L
              </th>

              <th className="px-4 py-3 text-right text-[10px] font-semibold uppercase tracking-[0.1em] text-muted-foreground">
                Return
              </th>
            </tr>
          </thead>

          <tbody>
            {strategies.map((strategy) => (
              <tr
                key={strategy.strategy}
                className="border-b border-border/70 last:border-0 hover:bg-accent/30"
              >
                <td className="px-4 py-3 font-medium">
                  {strategy.strategy}
                </td>

                <td className="px-4 py-3 text-right font-financial text-xs">
                  {strategy.backtestCount}
                </td>

                <td className="px-4 py-3 text-right font-financial text-xs">
                  {formatCurrency(strategy.initialCapital)}
                </td>

                <td className="px-4 py-3 text-right font-financial text-xs">
                  {formatCurrency(strategy.finalEquity)}
                </td>

                <td
                  className={[
                    "px-4 py-3 text-right font-financial text-xs font-medium",
                    strategy.netProfit > 0
                      ? "text-profit"
                      : strategy.netProfit < 0
                        ? "text-loss"
                        : "",
                  ].join(" ")}
                >
                  {formatCurrency(strategy.netProfit)}
                </td>

                <td
                  className={[
                    "px-4 py-3 text-right font-financial text-xs font-medium",
                    strategy.returnPercent > 0
                      ? "text-profit"
                      : strategy.returnPercent < 0
                        ? "text-loss"
                        : "",
                  ].join(" ")}
                >
                  {formatPercent(strategy.returnPercent)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}