import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import type { PersistedBacktest } from "@/features/backtest/types";

type MetricsGridProps = {
  result: PersistedBacktest | null;
};

type Metric = {
  label: string;
  value: string;
  change?: string;
};

function formatNumber(value: number, decimals = 2) {
  return value.toFixed(decimals);
}

export default function MetricsGrid({
  result,
}: MetricsGridProps) {
  const metrics: Metric[] = result
    ? [
        {
          label: "Portfolio Value",
          value: `₹${formatNumber(result.finalEquity)}`,
          change: `${formatNumber(result.totalReturnPercent)}%`,
        },
        {
          label: "Net Profit",
          value: `₹${formatNumber(result.netProfit)}`,
          change: `${formatNumber(result.totalReturnPercent)}%`,
        },
        {
          label: "Sharpe Ratio",
          value: formatNumber(result.sharpeRatio),
        },
        {
          label: "Max Drawdown",
          value: `-${formatNumber(result.maximumDrawdown)}%`,
        },
      ]
    : [
        {
          label: "Portfolio Value",
          value: "—",
        },
        {
          label: "Net Profit",
          value: "—",
        },
        {
          label: "Sharpe Ratio",
          value: "—",
        },
        {
          label: "Max Drawdown",
          value: "—",
        },
      ];

  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      {metrics.map((metric) => (
        <Card key={metric.label}>
          <CardHeader>
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {metric.label}
            </CardTitle>
          </CardHeader>

          <CardContent>
            <div className="text-2xl font-semibold tracking-tight">
              {metric.value}
            </div>

            {metric.change && (
              <p className="mt-1 text-xs text-muted-foreground">
                {metric.change}
              </p>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}