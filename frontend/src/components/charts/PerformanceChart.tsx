"use client";

import type { EquityPoint } from "@/features/backtest/types";
import { formatCurrency } from "@/lib/format";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

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
        className="flex items-center justify-center rounded-md border border-slate-700 bg-slate-900/50 text-sm text-slate-500"
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

  return (
    <div style={{ height, width: "100%" }}>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 8, right: 0, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="colorEquity" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#6366F1" stopOpacity={0.2} />
              <stop offset="100%" stopColor="#6366F1" stopOpacity={0} />
            </linearGradient>
          </defs>

          <CartesianGrid
            strokeDasharray="0"
            stroke="#334155"
            strokeOpacity={0.3}
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
            stroke="#64748B"
            tick={{ fontSize: 12, fill: "#64748B" }}
            tickLine={false}
            axisLine={{ stroke: "#334155", opacity: 0.3 }}
          />

          <YAxis
            domain={[yMin, yMax]}
            tickFormatter={(value) => `₹${(value / 1000).toFixed(0)}k`}
            stroke="#64748B"
            tick={{ fontSize: 12, fill: "#64748B" }}
            tickLine={false}
            axisLine={false}
            width={60}
          />

          <Tooltip
            contentStyle={{
              backgroundColor: "#0F1520",
              border: "1px solid #334155",
              borderRadius: "4px",
              fontSize: "13px",
              color: "#E7EDF7",
              boxShadow: "0 10px 15px rgba(0,0,0,0.35)",
            }}
            cursor={{ stroke: "#475569", strokeDasharray: "4" }}
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            formatter={(value: any) => [
              formatCurrency(Number(value)),
              "Equity",
            ]}
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
            stroke="#6366F1"
            strokeWidth={2}
            fill="url(#colorEquity)"
            dot={false}
            isAnimationActive={false}
            activeDot={{
              r: 4,
              fill: "#6366F1",
              stroke: "#0F1520",
              strokeWidth: 2,
            }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}