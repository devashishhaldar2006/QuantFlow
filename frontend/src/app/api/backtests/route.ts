import type { BacktestConfig } from "@/features/backtest/schema";

export async function createBacktest(config: BacktestConfig) {
  const response = await fetch("/api/backtests", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(config),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error ?? "Failed to create backtest");
  }

  return data;
}