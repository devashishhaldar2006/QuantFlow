import type { BacktestConfig } from "@/features/backtest/schema";
import type { BacktestResult } from "@/features/backtest/types";

export interface QuantEngineClient {
  runBacktest(
    config: BacktestConfig
  ): Promise<BacktestResult>;
}