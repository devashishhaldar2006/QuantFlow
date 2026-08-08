"use client";
import type { PerformancePoint } from "../types";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const performanceData: PerformancePoint[] = [
  { date: "Jan", value: 100000 },
  { date: "Feb", value: 103500 },
  { date: "Mar", value: 101800 },
  { date: "Apr", value: 108200 },
  { date: "May", value: 112400 },
  { date: "Jun", value: 118700 },
  { date: "Jul", value: 124680 },
];

export default function PerformanceChart() {
  return (
    <div className="rounded-lg border bg-card p-6">
      <div className="mb-6">
        <h2 className="text-base font-semibold">Portfolio Performance</h2>

        <p className="text-sm text-muted-foreground">
          Portfolio value over time
        </p>
      </div>

      <div className="h-[320px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={performanceData}>
            <CartesianGrid strokeDasharray="3 3" />

            <XAxis dataKey="date" />

            <YAxis />

            <Tooltip />

            <Line type="monotone" dataKey="value" strokeWidth={2} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
