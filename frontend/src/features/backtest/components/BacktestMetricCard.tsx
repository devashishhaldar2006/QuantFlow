/**
 * BacktestMetricCard — Data-dense metric display for backtest detail pages.
 *
 * Uses the same visual language as MetricCard but in a tighter
 * grid-cell format designed for the backtest detail's multi-metric grids.
 */

type BacktestMetricCardProps = {
  label: string;
  value: string | number;
  description?: string;
  positive?: boolean;
  negative?: boolean;
};

export default function BacktestMetricCard({
  label,
  value,
  description,
  positive = false,
  negative = false,
}: BacktestMetricCardProps) {
  const valueColor = positive
    ? "text-[#56c79d]"
    : negative
      ? "text-[#d97b72]"
      : "text-foreground";

  return (
    <div className="group border border-border bg-card p-5 transition-colors hover:bg-[#1c2640]/50">
      <p className="text-[10px] font-semibold uppercase tracking-[0.08em] text-muted-foreground">
        {label}
      </p>

      <p
        className={[
          "mt-3 font-financial text-2xl font-semibold tracking-tight transition-colors",
          valueColor,
        ].join(" ")}
      >
        {value}
      </p>

      {description ? (
        <p className="mt-1.5 text-xs text-muted-foreground">
          {description}
        </p>
      ) : null}
    </div>
  );
}