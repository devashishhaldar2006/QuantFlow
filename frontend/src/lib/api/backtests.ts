import type { BacktestConfig } from "@/features/backtest/schema";

export async function createBacktest(config: BacktestConfig) {
  console.log("Creating backtest:", config);

  await new Promise((resolve) => {
    setTimeout(resolve, 1000);
  });

  return {
    id: `bt-${Date.now()}`,
    status: "running" as const,
  };
}