import { formatDate, formatNumber } from "@/lib/format";
import type { PersistedBacktest } from "../types";

type BacktestTradeHistoryProps = {
  backtest: PersistedBacktest;
};

export default function BacktestTradeHistory({ backtest }: BacktestTradeHistoryProps) {
  return (
    <section>
      <div className="mb-4">
        <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-zinc-500">TRADE_HISTORY_LOG</span>
        <p className="mt-1 text-sm text-zinc-600">
          {backtest.trades.length} trades executed during the backtest period.
        </p>
      </div>

      <div className="overflow-x-auto rounded border border-zinc-200 bg-white">
        <table className="w-full min-w-[700px] text-sm">
          <thead className="bg-zinc-50/80 text-[11px] font-mono uppercase tracking-wider text-zinc-600 border-b border-zinc-200">
            <tr>
              <th className="px-4 py-3 text-left font-bold">Time</th>
              <th className="px-4 py-3 text-left font-bold">Side</th>
              <th className="px-4 py-3 text-right font-bold">Qty</th>
              <th className="px-4 py-3 text-right font-bold">Execution Price</th>
              <th className="px-4 py-3 text-right font-bold">Commission</th>
              <th className="px-4 py-3 text-right font-bold">Cash Flow</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-200">
            {backtest.trades.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-4 py-12 text-center text-sm font-mono text-zinc-400">
                  NO_TRADES_RECORDED_FOR_THIS_BACKTEST
                </td>
              </tr>
            ) : (
              backtest.trades.map((trade, index) => (
                <tr
                  key={`${trade.timestamp}-${index}`}
                  className="transition-colors hover:bg-zinc-50/60"
                >
                  <td className="whitespace-nowrap px-4 py-3 font-mono text-xs text-zinc-600">
                    {formatDate(trade.timestamp)}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={[
                        "inline-flex items-center rounded border px-2 py-0.5 font-mono text-[10px] font-bold uppercase tracking-wider",
                        trade.side === "BUY"
                          ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                          : "border-red-200 bg-red-50 text-red-700",
                      ].join(" ")}
                    >
                      {trade.side}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right font-mono text-xs text-zinc-700">
                    {trade.quantity}
                  </td>
                  <td className="px-4 py-3 text-right font-mono text-xs text-zinc-700">
                    ₹{formatNumber(trade.executionPrice)}
                  </td>
                  <td className="px-4 py-3 text-right font-mono text-xs text-zinc-400">
                    ₹{formatNumber(trade.commission)}
                  </td>
                  <td
                    className={[
                      "px-4 py-3 text-right font-mono text-xs font-semibold",
                      trade.cashFlow >= 0 ? "text-emerald-600" : "text-red-600",
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