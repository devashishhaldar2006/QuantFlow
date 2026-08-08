import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type Metric = {
  label: string;
  value: string;
  change?: string;
};

const metrics: Metric[] = [
  {
    label: "Portfolio Value",
    value: "$124,680",
    change: "+8.42%",
  },
  {
    label: "Total Return",
    value: "+$18,420",
    change: "+17.32%",
  },
  {
    label: "Sharpe Ratio",
    value: "1.84",
  },
  {
    label: "Max Drawdown",
    value: "-7.21%",
  },
];

export default function MetricsGrid() {
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