import type { BacktestConfig } from "@/features/backtest/schema";
import type { BacktestResult } from "@/features/backtest/types";
import type { QuantEngineStrategy } from "./types";

export interface QuantEngineClient {
  runBacktest(
    config: BacktestConfig,
  ): Promise<BacktestResult>;

  getStrategies(): Promise<QuantEngineStrategy[]>;
}