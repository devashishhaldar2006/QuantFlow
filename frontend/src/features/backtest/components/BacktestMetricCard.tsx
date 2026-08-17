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
  return (
    <div className="border border-border bg-card p-5">
      <p className="text-xs font-medium uppercase tracking-[0.08em] text-muted-foreground">
        {label}
      </p>

      <p
        className={[
          "mt-3 font-financial text-2xl font-semibold tracking-tight",
          positive ? "text-profit" : "",
          negative ? "text-loss" : "",
        ].join(" ")}
      >
        {value}
      </p>

      {description ? (
        <p className="mt-1 text-xs text-muted-foreground">
          {description}
        </p>
      ) : null}
    </div>
  );
}