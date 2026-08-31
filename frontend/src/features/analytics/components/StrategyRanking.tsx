import type { StrategyAnalytics } from "@/services/analytics/analyticsService";
import { formatPercent, formatNumber, formatSignedPercent } from "@/lib/format";

type StrategyRankingProps = {
  strategies: StrategyAnalytics[];
};

export default function StrategyRanking({ strategies }: StrategyRankingProps) {
  return (
    <section className="w-full">
      <div className="mb-4">
        <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-500">Strategy Analysis</span>
        <p className="mt-1 text-sm text-slate-400">
          Your strategies ranked by average backtest return.
        </p>
      </div>

      <div className="overflow-x-auto rounded-xl glass-panel">
        <table className="w-full min-w-[800px] text-sm">
          <thead className="bg-slate-900/40 backdrop-blur-md text-xs uppercase font-semibold text-slate-400 border-b border-slate-700/50">
            <tr>
              <th className="px-4 py-3 text-left font-semibold">Rank</th>
              <th className="px-4 py-3 text-left font-semibold">Strategy</th>
              <th className="px-4 py-3 text-right font-semibold">Backtests</th>
              <th className="px-4 py-3 text-right font-semibold">Avg Return</th>
              <th className="px-4 py-3 text-right font-semibold">Avg Sharpe</th>
              <th className="px-4 py-3 text-right font-semibold">Best Return</th>
              <th className="px-4 py-3 text-right font-semibold">Best Drawdown</th>
            </tr>
          </thead>
          <tbody>
            {strategies.map((strategy, index) => (
              <tr key={strategy.strategy} className="border-b border-slate-800 transition-colors last:border-0 hover:bg-slate-800/50">
                <td className="px-4 py-3 font-mono text-sm text-slate-500">#{index + 1}</td>
                <td className="px-4 py-3 font-medium text-slate-200">{strategy.strategy}</td>
                <td className="px-4 py-3 text-right font-mono text-slate-300">{strategy.backtestCount}</td>
                <td className={`px-4 py-3 text-right font-mono ${strategy.averageReturn >= 0 ? "text-profit" : "text-loss"}`}>
                  {formatSignedPercent(strategy.averageReturn)}
                </td>
                <td className={`px-4 py-3 text-right font-mono ${strategy.averageSharpe >= 1 ? "text-profit" : strategy.averageSharpe < 0 ? "text-loss" : "text-slate-300"}`}>
                  {formatNumber(strategy.averageSharpe)}
                </td>
                <td className={`px-4 py-3 text-right font-mono ${strategy.bestReturn >= 0 ? "text-profit" : "text-loss"}`}>
                  {formatSignedPercent(strategy.bestReturn)}
                </td>
                <td className="px-4 py-3 text-right font-mono text-slate-300">
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