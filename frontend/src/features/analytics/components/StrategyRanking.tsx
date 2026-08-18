import type { StrategyAnalytics } from "@/services/analytics/analyticsService";

type StrategyRankingProps = {
  strategies: StrategyAnalytics[];
};

function formatPercent(value: number) {
  return `${value.toFixed(2)}%`;
}

function formatNumber(value: number) {
  return value.toFixed(2);
}

export default function StrategyRanking({
  strategies,
}: StrategyRankingProps) {
  return (
    <section>
      <div className="mb-4">
        <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
          Strategy Analysis
        </p>

        <h2 className="mt-1 text-lg font-semibold tracking-tight">
          Strategy Ranking
        </h2>
      </div>

      <div className="overflow-x-auto border border-border bg-card">
        <table className="w-full min-w-[800px] text-sm">
          <thead>
            <tr className="border-b border-border bg-muted/30">
              <th className="px-4 py-3 text-left text-[10px] font-semibold uppercase tracking-[0.1em] text-muted-foreground">
                Rank
              </th>

              <th className="px-4 py-3 text-left text-[10px] font-semibold uppercase tracking-[0.1em] text-muted-foreground">
                Strategy
              </th>

              <th className="px-4 py-3 text-right text-[10px] font-semibold uppercase tracking-[0.1em] text-muted-foreground">
                Backtests
              </th>

              <th className="px-4 py-3 text-right text-[10px] font-semibold uppercase tracking-[0.1em] text-muted-foreground">
                Avg Return
              </th>

              <th className="px-4 py-3 text-right text-[10px] font-semibold uppercase tracking-[0.1em] text-muted-foreground">
                Avg Sharpe
              </th>

              <th className="px-4 py-3 text-right text-[10px] font-semibold uppercase tracking-[0.1em] text-muted-foreground">
                Best Return
              </th>

              <th className="px-4 py-3 text-right text-[10px] font-semibold uppercase tracking-[0.1em] text-muted-foreground">
                Best Drawdown
              </th>
            </tr>
          </thead>

          <tbody>
            {strategies.map((strategy, index) => (
              <tr
                key={strategy.strategy}
                className="border-b border-border/70 last:border-0 hover:bg-accent/30"
              >
                <td className="px-4 py-3 font-financial text-xs text-muted-foreground">
                  #{index + 1}
                </td>

                <td className="px-4 py-3 font-medium">
                  {strategy.strategy}
                </td>

                <td className="px-4 py-3 text-right font-financial text-xs">
                  {strategy.backtestCount}
                </td>

                <td
                  className={[
                    "px-4 py-3 text-right font-financial text-xs font-medium",
                    strategy.averageReturn > 0
                      ? "text-profit"
                      : strategy.averageReturn < 0
                        ? "text-loss"
                        : "",
                  ].join(" ")}
                >
                  {formatPercent(strategy.averageReturn)}
                </td>

                <td
                  className={[
                    "px-4 py-3 text-right font-financial text-xs",
                    strategy.averageSharpe > 0
                      ? "text-profit"
                      : strategy.averageSharpe < 0
                        ? "text-loss"
                        : "",
                  ].join(" ")}
                >
                  {formatNumber(strategy.averageSharpe)}
                </td>

                <td className="px-4 py-3 text-right font-financial text-xs">
                  {formatPercent(strategy.bestReturn)}
                </td>

                <td className="px-4 py-3 text-right font-financial text-xs">
                  {formatPercent(strategy.bestMaxDrawdown)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}