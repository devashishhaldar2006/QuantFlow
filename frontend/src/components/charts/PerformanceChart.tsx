"use client";

import type { EquityPoint } from "@/features/backtest/types";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

/**
 * PerformanceChart — Equity curve visualization.
 *
 * Renders an area chart with gradient fill for a premium look.
 * Handles edge cases: empty data, single point, flat equity.
 */

type PerformanceChartProps = {
  data: EquityPoint[];
  height?: number;
};

export default function PerformanceChart({
  data,
  height = 320,
}: PerformanceChartProps) {
  if (!data || data.length === 0) {
    return (
      <div
        className="flex items-center justify-center rounded-lg border border-border bg-card text-sm text-muted-foreground"
        style={{ height }}
      >
        No equity data available
      </div>
    );
  }

  // Calculate proper Y-axis domain with 2% padding
  const equityValues = data.map((d) => d.equity);
  const minEquity = Math.min(...equityValues);
  const maxEquity = Math.max(...equityValues);
  const range = maxEquity - minEquity;
  const padding = range > 0 ? range * 0.05 : maxEquity * 0.02;

  const yMin = Math.floor((minEquity - padding) / 100) * 100;
  const yMax = Math.ceil((maxEquity + padding) / 100) * 100;

  // Determine if overall performance is positive
  const isPositive = data.length >= 2 && data[data.length - 1].equity >= data[0].equity;
  const lineColor = isPositive ? "#56c79d" : "#d97b72";
  const gradientId = isPositive ? "equityGradientPositive" : "equityGradientNegative";

  return (
    <div style={{ height }}>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="equityGradientPositive" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#56c79d" stopOpacity={0.2} />
              <stop offset="100%" stopColor="#56c79d" stopOpacity={0.0} />
            </linearGradient>
            <linearGradient id="equityGradientNegative" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#d97b72" stopOpacity={0.2} />
              <stop offset="100%" stopColor="#d97b72" stopOpacity={0.0} />
            </linearGradient>
          </defs>

          <CartesianGrid
            strokeDasharray="3 3"
            stroke="#283148"
            strokeOpacity={0.5}
            vertical={false}
          />

          <XAxis
            dataKey="timestamp"
            tickFormatter={(value: string) => {
              const date = new Date(value);
              return date.toLocaleDateString("en-IN", {
                day: "2-digit",
                month: "short",
              });
            }}
            stroke="#7d8599"
            tick={{ fontSize: 10, fill: "#7d8599" }}
            tickLine={false}
            axisLine={{ stroke: "#283148" }}
          />

          <YAxis
            domain={[yMin, yMax]}
            tickFormatter={(value) => `₹${(value / 1000).toFixed(0)}k`}
            stroke="#7d8599"
            tick={{ fontSize: 10, fill: "#7d8599" }}
            tickLine={false}
            axisLine={false}
            width={60}
          />

          <Tooltip
            contentStyle={{
              backgroundColor: "#1c2640",
              border: "1px solid #283148",
              borderRadius: "6px",
              fontSize: "12px",
              color: "#d8dfef",
              boxShadow: "0 8px 24px rgba(0,0,0,0.4)",
            }}
            formatter={(value: any) => [
              `₹${value.toLocaleString("en-IN", { minimumFractionDigits: 2 })}`,
              "Equity",
            ]}
            labelFormatter={(label: any) => {
              const date = new Date(label);
              return date.toLocaleString("en-IN", {
                day: "2-digit",
                month: "short",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              });
            }}
          />

          <Area
            type="monotone"
            dataKey="equity"
            stroke={lineColor}
            strokeWidth={2}
            fill={`url(#${gradientId})`}
            dot={false}
            activeDot={{
              r: 4,
              fill: lineColor,
              stroke: "#141d30",
              strokeWidth: 2,
            }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}