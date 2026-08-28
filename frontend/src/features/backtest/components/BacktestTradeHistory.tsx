import { formatDate, formatNumber } from "@/lib/format";
import type { PersistedBacktest } from "../types";

type BacktestTradeHistoryProps = {
  backtest: PersistedBacktest;
};

export default function BacktestTradeHistory({ backtest }: BacktestTradeHistoryProps) {
  return (
    <section>
      <div className="mb-4">
        <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-500">Trade History</span>
        <p className="mt-1 text-sm text-slate-400">
          {backtest.trades.length} trades executed during the backtest period.
        </p>
      </div>

      <div className="overflow-x-auto rounded-md border border-slate-700">
        <table className="w-full min-w-[700px] text-sm">
          <thead className="bg-slate-900/50 text-xs uppercase font-semibold text-slate-400 border-b border-slate-700">
            <tr>
              <th className="px-4 py-3 text-left font-semibold">Time</th>
              <th className="px-4 py-3 text-left font-semibold">Side</th>
              <th className="px-4 py-3 text-right font-semibold">Qty</th>
              <th className="px-4 py-3 text-right font-semibold">Execution Price</th>
              <th className="px-4 py-3 text-right font-semibold">Commission</th>
              <th className="px-4 py-3 text-right font-semibold">Cash Flow</th>
            </tr>
          </thead>
          <tbody>
            {backtest.trades.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-4 py-12 text-center text-sm text-slate-500">
                  No trades recorded for this backtest.
                </td>
              </tr>
            ) : (
              backtest.trades.map((trade, index) => (
                <tr
                  key={`${trade.timestamp}-${index}`}
                  className="border-b border-slate-800 transition-colors last:border-0 hover:bg-slate-800/50"
                >
                  <td className="whitespace-nowrap px-4 py-3 font-mono text-xs text-slate-400">
                    {formatDate(trade.timestamp)}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={[
                        "inline-flex items-center rounded px-2 py-0.5 font-mono text-[10px] font-bold uppercase tracking-wider",
                        trade.side === "BUY"
                          ? "bg-emerald-500/10 text-emerald-500"
                          : "bg-red-500/10 text-red-400",
                      ].join(" ")}
                    >
                      {trade.side}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right font-mono text-xs text-slate-300">
                    {trade.quantity}
                  </td>
                  <td className="px-4 py-3 text-right font-mono text-xs text-slate-300">
                    ₹{formatNumber(trade.executionPrice)}
                  </td>
                  <td className="px-4 py-3 text-right font-mono text-xs text-slate-500">
                    ₹{formatNumber(trade.commission)}
                  </td>
                  <td
                    className={[
                      "px-4 py-3 text-right font-mono text-xs font-medium",
                      trade.cashFlow >= 0 ? "text-emerald-500" : "text-red-400",
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