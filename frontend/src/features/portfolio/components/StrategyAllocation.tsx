import type { PortfolioStrategy } from "@/services/portfolio/portfolioService";
import SectionHeader from "@/components/common/SectionHeader";
import { formatCurrency, formatSignedPercent } from "@/lib/format";

type StrategyAllocationProps = {
  strategies: PortfolioStrategy[];
};

export default function StrategyAllocation({
  strategies,
}: StrategyAllocationProps) {
  return (
    <section>
      <SectionHeader
        eyebrow="Strategy Breakdown"
        title="Strategy Allocation & Performance"
        description="Compare how different strategies contribute to your overall portfolio."
      />

      <div className="overflow-x-auto rounded-lg border border-border bg-card">
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
                className="border-b border-border/50 transition-colors last:border-0 hover:bg-[#1c2640]/30"
              >
                <td className="px-4 py-3 font-medium text-[#d8dfef]">
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
                    strategy.netProfit >= 0
                      ? "text-[#56c79d]"
                      : "text-[#d97b72]",
                  ].join(" ")}
                >
                  {formatCurrency(strategy.netProfit)}
                </td>

                <td
                  className={[
                    "px-4 py-3 text-right font-financial text-xs font-medium",
                    strategy.returnPercent >= 0
                      ? "text-[#56c79d]"
                      : "text-[#d97b72]",
                  ].join(" ")}
                >
                  {formatSignedPercent(strategy.returnPercent)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}