import type { PortfolioActivity as Activity } from "@/services/portfolio/portfolioService";

type PortfolioActivityProps = {
  activities: Activity[];
};

function formatDate(value: string) {
  return new Date(value).toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function formatNumber(value: number) {
  return value.toLocaleString("en-IN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

export default function PortfolioActivity({
  activities,
}: PortfolioActivityProps) {
  return (
    <section>
      <div className="mb-4">
        <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
          Execution
        </p>

        <h2 className="mt-1 text-lg font-semibold tracking-tight">
          Recent Activity
        </h2>
      </div>

      <div className="overflow-x-auto border border-border bg-card">
        {activities.length === 0 ? (
          <div className="px-4 py-12 text-center text-sm text-muted-foreground">
            No trades recorded across completed backtests.
          </div>
        ) : (
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
                  className="border-b border-border/70 last:border-0 hover:bg-accent/30"
                >
                  <td className="whitespace-nowrap px-4 py-3 font-financial text-xs text-muted-foreground">
                    {formatDate(activity.timestamp)}
                  </td>

                  <td className="px-4 py-3 text-xs font-medium">
                    {activity.strategy}
                  </td>

                  <td
                    className={[
                      "px-4 py-3 font-financial text-xs font-semibold",
                      activity.side === "BUY"
                        ? "text-profit"
                        : "text-loss",
                    ].join(" ")}
                  >
                    {activity.side}
                  </td>

                  <td className="px-4 py-3 text-right font-financial text-xs">
                    {activity.quantity}
                  </td>

                  <td className="px-4 py-3 text-right font-financial text-xs">
                    {formatNumber(activity.executionPrice)}
                  </td>

                  <td className="px-4 py-3 text-right font-financial text-xs text-muted-foreground">
                    {formatNumber(activity.commission)}
                  </td>

                  <td
                    className={[
                      "px-4 py-3 text-right font-financial text-xs font-medium",
                      activity.cashFlow >= 0
                        ? "text-profit"
                        : "text-loss",
                    ].join(" ")}
                  >
                    {formatNumber(activity.cashFlow)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </section>
  );
}