import SectionHeader from "@/components/common/SectionHeader";
import { formatDate, formatNumber } from "@/lib/format";

import type { PersistedBacktest } from "../types";

type BacktestTradeHistoryProps = {
  backtest: PersistedBacktest;
};

export default function BacktestTradeHistory({
  backtest,
}: BacktestTradeHistoryProps) {
  return (
    <section>
      <SectionHeader
        eyebrow="Execution"
        title="Trade History"
        description={`${backtest.trades.length} trades executed during the backtest period.`}
      />

      <div className="overflow-x-auto rounded-lg border border-border bg-card">
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
                  className="px-4 py-16 text-center text-sm text-muted-foreground"
                >
                  No trades recorded for this backtest.
                </td>
              </tr>
            ) : (
              backtest.trades.map((trade, index) => (
                <tr
                  key={`${trade.timestamp}-${index}`}
                  className="border-b border-border/40 transition-colors last:border-0 hover:bg-[#1c2640]/30"
                >
                  <td className="whitespace-nowrap px-4 py-3 font-financial text-xs text-muted-foreground">
                    {formatDate(trade.timestamp)}
                  </td>

                  <td className="px-4 py-3">
                    <span
                      className={[
                        "inline-flex rounded-md px-2 py-0.5 font-financial text-[10px] font-bold uppercase tracking-wider",
                        trade.side === "BUY"
                          ? "bg-[#56c79d]/10 text-[#56c79d]"
                          : "bg-[#d97b72]/10 text-[#d97b72]",
                      ].join(" ")}
                    >
                      {trade.side}
                    </span>
                  </td>

                  <td className="px-4 py-3 text-right font-financial text-xs">
                    {trade.quantity}
                  </td>

                  <td className="px-4 py-3 text-right font-financial text-xs">
                    ₹{formatNumber(trade.executionPrice)}
                  </td>

                  <td className="px-4 py-3 text-right font-financial text-xs text-muted-foreground">
                    ₹{formatNumber(trade.commission)}
                  </td>

                  <td
                    className={[
                      "px-4 py-3 text-right font-financial text-xs font-medium",
                      trade.cashFlow >= 0
                        ? "text-[#56c79d]"
                        : "text-[#d97b72]",
                    ].join(" ")}
                  >
                    ₹{formatNumber(trade.cashFlow)}
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