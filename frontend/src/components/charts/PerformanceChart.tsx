"use client";

import React, { useState } from "react";
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
  height = 300,
}: PerformanceChartProps) {
  const [activeRange, setActiveRange] = useState<"ALL" | "1Y" | "6M">("ALL");

  if (!data || data.length === 0) {
    return (
      <div
        className="flex items-center justify-center border border-zinc-200 bg-zinc-50 text-xs font-mono text-zinc-400"
        style={{ height }}
      >
        [ NO_EQUITY_DATA ]
      </div>
    );
  }

  const equityValues = data.map((d) => d.equity);
  const minEquity = Math.min(...equityValues);
  const maxEquity = Math.max(...equityValues);
  const isNetPositive = equityValues[equityValues.length - 1] >= equityValues[0];
  const strokeColor = isNetPositive ? "#16A34A" : "#DC2626";
  const fillColor = isNetPositive ? "rgba(22, 163, 74, 0.08)" : "rgba(220, 38, 38, 0.08)";

  const range = maxEquity - minEquity;
  const padding = range > 0 ? range * 0.05 : maxEquity * 0.02;

  const yMin = Math.floor((minEquity - padding) / 100) * 100;
  const yMax = Math.ceil((maxEquity + padding) / 100) * 100;

  return (
    <div className="w-full flex flex-col space-y-2">
      {/* Precision Chart Controls Header */}
      <div className="flex items-center justify-between border-b border-zinc-200 pb-2 px-1 text-xs">
        <div className="flex items-center gap-3">
          <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-zinc-900">
            EQUITY_CURVE
          </span>
          <span className="inline-flex items-center gap-1.5 font-mono text-[10px] text-zinc-600 font-medium">
            <span className="size-1.5 rounded-full" style={{ backgroundColor: strokeColor }} />
            {isNetPositive ? "BULLISH_TREND" : "BEARISH_TREND"}
          </span>
        </div>

        <div className="flex items-center gap-1 font-mono">
          {(["ALL", "1Y", "6M"] as const).map((r) => (
            <button
              key={r}
              type="button"
              onClick={() => setActiveRange(r)}
              className={`px-2 py-0.5 text-[10px] border transition-colors ${
                activeRange === r
                  ? "bg-zinc-900 border-zinc-900 text-white font-bold"
                  : "bg-white border-zinc-200 text-zinc-600 hover:text-black hover:border-zinc-400"
              }`}
            >
              {r}
            </button>
          ))}
        </div>
      </div>

      <div style={{ height, width: "100%" }}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 10, left: -15, bottom: 0 }}>
            <defs>
              <linearGradient id="quantEquityGradWhite" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={strokeColor} stopOpacity={0.12} />
                <stop offset="100%" stopColor={strokeColor} stopOpacity={0} />
              </linearGradient>
            </defs>

            <CartesianGrid
              strokeDasharray="2 2"
              stroke="#E4E4E7"
              vertical={false}
            />

            <XAxis
              dataKey="timestamp"
              tickFormatter={(value: string) => {
                const date = new Date(value);
                return date.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                });
              }}
              stroke="#A1A1AA"
              tick={{ fontSize: 10, fill: "#71717A", fontFamily: "monospace" }}
              tickLine={false}
              axisLine={{ stroke: "#E4E4E7" }}
            />

            <YAxis
              domain={[yMin, yMax]}
              tickFormatter={(value) => `$${(value / 1000).toFixed(1)}k`}
              stroke="#A1A1AA"
              tick={{ fontSize: 10, fill: "#71717A", fontFamily: "monospace" }}
              tickLine={false}
              axisLine={false}
              width={50}
            />

            <Tooltip
              contentStyle={{
                backgroundColor: "#FFFFFF",
                border: "1px solid #18181B",
                borderRadius: "0px",
                fontSize: "11px",
                fontFamily: "monospace",
                color: "#09090B",
                boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                padding: "6px 10px",
              }}
              cursor={{ stroke: "#18181B", strokeWidth: 1, strokeDasharray: "2 2" }}
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              formatter={(value: any) => [
                formatCurrency(Number(value)),
                "NAV",
              ]}
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              labelFormatter={(label: any) => {
                const date = new Date(label);
                return `UTC ${date.toISOString().replace("T", " ").substring(0, 16)}`;
              }}
            />

            <Area
              type="monotone"
              dataKey="equity"
              stroke={strokeColor}
              strokeWidth={1.5}
              fill="url(#quantEquityGradWhite)"
              dot={false}
              isAnimationActive={true}
              animationDuration={600}
              activeDot={{
                r: 3,
                fill: strokeColor,
                stroke: "#FFFFFF",
                strokeWidth: 2,
              }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}