import type { PortfolioActivity as Activity } from "@/services/portfolio/portfolioService";
import SectionHeader from "@/components/common/SectionHeader";
import EmptyState from "@/components/common/EmptyState";
import { formatDate, formatCurrency } from "@/lib/format";
import { History } from "lucide-react";

type PortfolioActivityProps = {
  activities: Activity[];
};

export default function PortfolioActivity({
  activities,
}: PortfolioActivityProps) {
  return (
    <section className="w-full">
      <SectionHeader
        eyebrow="Execution"
        title="Recent Activity"
        description="Latest trades executed across all your strategies."
      />

      {activities.length === 0 ? (
        <EmptyState
          icon={History}
          title="No Recent Activity"
          description="We couldn't find any recent trades across your portfolio. Run a backtest to see activity here."
        />
      ) : (
        <div className="overflow-x-auto rounded-xl glass-panel">
          <table className="w-full min-w-[900px] text-sm">
            <thead className="bg-slate-900/40 backdrop-blur-md text-xs uppercase font-semibold text-slate-400 border-b border-slate-700/50">
              <tr>
                <th className="px-4 py-3 text-left font-semibold">Time</th>
                <th className="px-4 py-3 text-left font-semibold">Strategy</th>
                <th className="px-4 py-3 text-left font-semibold">Side</th>
                <th className="px-4 py-3 text-right font-semibold">Quantity</th>
                <th className="px-4 py-3 text-right font-semibold">Price</th>
                <th className="px-4 py-3 text-right font-semibold">Commission</th>
                <th className="px-4 py-3 text-right font-semibold">Cash Flow</th>
              </tr>
            </thead>
            <tbody>
              {activities.map((activity, index) => (
                <tr
                  key={`${activity.timestamp}-${activity.strategy}-${index}`}
                  className="border-b border-slate-700/50 transition-colors last:border-0 hover:bg-slate-800/30"
                >
                  <td className="whitespace-nowrap px-4 py-3 font-mono text-xs text-slate-400">
                    {formatDate(activity.timestamp)}
                  </td>
                  <td className="px-4 py-3 text-xs font-medium text-slate-200">
                    {activity.strategy}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={[
                        "inline-flex rounded-md px-2 py-0.5 font-mono text-[10px] font-bold uppercase tracking-wider",
                        activity.side === "BUY"
                          ? "bg-emerald-500/10 text-emerald-400"
                          : "bg-red-500/10 text-red-400",
                      ].join(" ")}
                    >
                      {activity.side}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right font-mono text-xs text-slate-300">
                    {activity.quantity}
                  </td>
                  <td className="px-4 py-3 text-right font-mono text-xs text-slate-300">
                    {formatCurrency(activity.executionPrice)}
                  </td>
                  <td className="px-4 py-3 text-right font-mono text-xs text-slate-500">
                    {formatCurrency(activity.commission)}
                  </td>
                  <td
                    className={[
                      "px-4 py-3 text-right font-mono text-xs font-medium",
                      activity.cashFlow >= 0
                        ? "text-profit"
                        : "text-loss",
                    ].join(" ")}
                  >
                    {formatCurrency(activity.cashFlow)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}