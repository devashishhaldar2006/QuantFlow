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
    <section>
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
        <div className="overflow-x-auto rounded-lg border border-border bg-card">
          <table className="w-full min-w-[900px] text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/30">
                <th className="px-4 py-3 text-left text-[10px] font-semibold uppercase tracking-[0.1em] text-muted-foreground">
                  Time
                </th>

                <th className="px-4 py-3 text-left text-[10px] font-semibold uppercase tracking-[0.1em] text-muted-foreground">
                  Strategy
                </th>

                <th className="px-4 py-3 text-left text-[10px] font-semibold uppercase tracking-[0.1em] text-muted-foreground">
                  Side
                </th>

                <th className="px-4 py-3 text-right text-[10px] font-semibold uppercase tracking-[0.1em] text-muted-foreground">
                  Quantity
                </th>

                <th className="px-4 py-3 text-right text-[10px] font-semibold uppercase tracking-[0.1em] text-muted-foreground">
                  Price
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
              {activities.map((activity, index) => (
                <tr
                  key={`${activity.timestamp}-${activity.strategy}-${index}`}
                  className="border-b border-border/50 transition-colors last:border-0 hover:bg-[#1c2640]/30"
                >
                  <td className="whitespace-nowrap px-4 py-3 font-financial text-xs text-muted-foreground">
                    {formatDate(activity.timestamp)}
                  </td>

                  <td className="px-4 py-3 text-xs font-medium text-[#d8dfef]">
                    {activity.strategy}
                  </td>

                  <td className="px-4 py-3">
                    <span
                      className={[
                        "inline-flex rounded-md px-2 py-0.5 font-financial text-[10px] font-bold uppercase tracking-wider",
                        activity.side === "BUY"
                          ? "bg-[#56c79d]/10 text-[#56c79d]"
                          : "bg-[#d97b72]/10 text-[#d97b72]",
                      ].join(" ")}
                    >
                      {activity.side}
                    </span>
                  </td>

                  <td className="px-4 py-3 text-right font-financial text-xs">
                    {activity.quantity}
                  </td>

                  <td className="px-4 py-3 text-right font-financial text-xs">
                    {formatCurrency(activity.executionPrice)}
                  </td>

                  <td className="px-4 py-3 text-right font-financial text-xs text-muted-foreground">
                    {formatCurrency(activity.commission)}
                  </td>

                  <td
                    className={[
                      "px-4 py-3 text-right font-financial text-xs font-medium",
                      activity.cashFlow >= 0
                        ? "text-[#56c79d]"
                        : "text-[#d97b72]",
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