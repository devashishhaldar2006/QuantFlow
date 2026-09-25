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
        <div className="overflow-x-auto rounded border border-zinc-200 bg-white">
          <table className="w-full min-w-[900px] text-xs">
            <thead className="bg-zinc-50 text-[10px] uppercase font-bold font-mono text-zinc-500 border-b border-zinc-200">
              <tr>
                <th className="px-4 py-3 text-left font-semibold">TIME</th>
                <th className="px-4 py-3 text-left font-semibold">MODEL</th>
                <th className="px-4 py-3 text-left font-semibold">SIDE</th>
                <th className="px-4 py-3 text-right font-semibold">QUANTITY</th>
                <th className="px-4 py-3 text-right font-semibold">PRICE</th>
                <th className="px-4 py-3 text-right font-semibold">COMMISSION</th>
                <th className="px-4 py-3 text-right font-semibold">CASH_FLOW</th>
              </tr>
            </thead>
            <tbody>
              {activities.map((activity, index) => (
                <tr
                  key={`${activity.timestamp}-${activity.strategy}-${index}`}
                  className="border-b border-zinc-200 transition-colors last:border-0 hover:bg-zinc-50"
                >
                  <td className="whitespace-nowrap px-4 py-3 font-mono text-xs text-zinc-500">
                    {formatDate(activity.timestamp)}
                  </td>
                  <td className="px-4 py-3 text-xs font-mono font-medium text-zinc-900">
                    {activity.strategy}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={[
                        "inline-flex rounded px-1.5 py-0.2 font-mono text-[10px] font-bold uppercase tracking-wider border",
                        activity.side === "BUY"
                          ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                          : "bg-red-50 text-red-700 border-red-200",
                      ].join(" ")}
                    >
                      {activity.side}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right font-mono text-xs text-zinc-700">
                    {activity.quantity}
                  </td>
                  <td className="px-4 py-3 text-right font-mono text-xs text-zinc-700">
                    {formatCurrency(activity.executionPrice)}
                  </td>
                  <td className="px-4 py-3 text-right font-mono text-xs text-zinc-500">
                    {formatCurrency(activity.commission)}
                  </td>
                  <td
                    className={[
                      "px-4 py-3 text-right font-mono text-xs font-semibold",
                      activity.cashFlow >= 0
                        ? "text-emerald-600"
                        : "text-red-600",
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