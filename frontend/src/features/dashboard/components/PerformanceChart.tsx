"use client";

import type { EquityPoint } from "@/features/backtest/types";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

type PerformanceChartProps = {
  data: EquityPoint[];
};

export default function PerformanceChart({
  data,
}: PerformanceChartProps) {
  return (
    <div className="rounded-lg border bg-card p-6">
      <div className="mb-6">
        <h2 className="text-base font-semibold">
          Portfolio Performance
        </h2>

        <p className="text-sm text-muted-foreground">
          Portfolio value over time
        </p>
      </div>

      <div className="h-[320px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />

            <XAxis
              dataKey="timestamp"
              tickFormatter={(value: string) =>
                value.slice(11, 16)
              }
            />

            <YAxis 
              domain={['dataMin - (dataMin * 0.01)', 'dataMax + (dataMax * 0.01)']}
              tickFormatter={(value) => `₹${(value / 1000).toFixed(0)}k`}
            />

            <Tooltip
              formatter={(value) =>
                `₹${Number(value).toFixed(2)}`
              }
              labelFormatter={(label) =>
                `Time: ${label}`
              }
            />

            <Line
              type="monotone"
              dataKey="equity"
              stroke="#e4e4e7"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}