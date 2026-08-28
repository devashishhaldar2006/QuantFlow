import type { StrategyAnalytics } from "@/services/analytics/analyticsService";
import SectionHeader from "@/components/common/SectionHeader";
import { formatPercent, formatNumber, formatSignedPercent } from "@/lib/format";

type StrategyRankingProps = {
  strategies: StrategyAnalytics[];
};

export default function StrategyRanking({
  strategies,
}: StrategyRankingProps) {
  return (
    <section>
      <SectionHeader
        eyebrow="Strategy Analysis"
        title="Strategy Ranking"
        description="Your strategies ranked by average backtest return."
      />

      <div className="overflow-x-auto rounded-lg border border-border bg-card">
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
                className="border-b border-border/50 transition-colors last:border-0 hover:bg-[#1c2640]/30"
              >
                <td className="px-4 py-3 font-financial text-xs text-muted-foreground">
                  #{index + 1}
                </td>

                <td className="px-4 py-3 font-medium text-[#d8dfef]">
                  {strategy.strategy}
                </td>

                <td className="px-4 py-3 text-right font-financial text-xs">
                  {strategy.backtestCount}
                </td>

                <td
                  className={[
                    "px-4 py-3 text-right font-financial text-xs font-medium",
                    strategy.averageReturn >= 0
                      ? "text-[#56c79d]"
                      : "text-[#d97b72]",
                  ].join(" ")}
                >
                  {formatSignedPercent(strategy.averageReturn)}
                </td>

                <td
                  className={[
                    "px-4 py-3 text-right font-financial text-xs",
                    strategy.averageSharpe > 0
                      ? "text-[#56c79d]"
                      : strategy.averageSharpe < 0
                        ? "text-[#d97b72]"
                        : "",
                  ].join(" ")}
                >
                  {formatNumber(strategy.averageSharpe)}
                </td>

                <td className="px-4 py-3 text-right font-financial text-xs">
                  {formatSignedPercent(strategy.bestReturn)}
                </td>

                <td className="px-4 py-3 text-right font-financial text-xs">
                  {strategy.bestMaxDrawdown > 0 ? "-" : ""}
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