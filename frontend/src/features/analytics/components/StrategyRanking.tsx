import type { StrategyAnalytics } from "@/services/analytics/analyticsService";
import { formatPercent, formatNumber, formatSignedPercent } from "@/lib/format";

type StrategyRankingProps = {
  strategies: StrategyAnalytics[];
};

export default function StrategyRanking({ strategies }: StrategyRankingProps) {
  return (
    <section className="w-full">
      <div className="mb-4">
        <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-zinc-500">STRATEGY_ANALYSIS</span>
        <p className="mt-1 text-sm text-zinc-600">
          Your strategies ranked by average backtest return.
        </p>
      </div>

      <div className="overflow-x-auto rounded border border-zinc-200 bg-white">
        <table className="w-full min-w-[800px] text-sm">
          <thead className="bg-zinc-50/80 text-[11px] font-mono uppercase tracking-wider text-zinc-600 border-b border-zinc-200">
            <tr>
              <th className="px-4 py-3 text-left font-bold">Rank</th>
              <th className="px-4 py-3 text-left font-bold">Strategy</th>
              <th className="px-4 py-3 text-right font-bold">Backtests</th>
              <th className="px-4 py-3 text-right font-bold">Avg Return</th>
              <th className="px-4 py-3 text-right font-bold">Avg Sharpe</th>
              <th className="px-4 py-3 text-right font-bold">Best Return</th>
              <th className="px-4 py-3 text-right font-bold">Best Drawdown</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-200">
            {strategies.map((strategy, index) => (
              <tr key={strategy.strategy} className="transition-colors hover:bg-zinc-50/60">
                <td className="px-4 py-3 font-mono text-xs text-zinc-500">#{index + 1}</td>
                <td className="px-4 py-3 font-medium text-zinc-900">{strategy.strategy}</td>
                <td className="px-4 py-3 text-right font-mono text-zinc-600">{strategy.backtestCount}</td>
                <td className={`px-4 py-3 text-right font-mono font-semibold ${strategy.averageReturn >= 0 ? "text-emerald-600" : "text-red-600"}`}>
                  {formatSignedPercent(strategy.averageReturn)}
                </td>
                <td className={`px-4 py-3 text-right font-mono ${strategy.averageSharpe >= 1 ? "text-emerald-600 font-semibold" : strategy.averageSharpe < 0 ? "text-red-600 font-semibold" : "text-zinc-600"}`}>
                  {formatNumber(strategy.averageSharpe)}
                </td>
                <td className={`px-4 py-3 text-right font-mono font-semibold ${strategy.bestReturn >= 0 ? "text-emerald-600" : "text-red-600"}`}>
                  {formatSignedPercent(strategy.bestReturn)}
                </td>
                <td className="px-4 py-3 text-right font-mono text-zinc-600">
                  {strategy.bestMaxDrawdown > 0 ? "-" : ""}{formatPercent(strategy.bestMaxDrawdown)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}