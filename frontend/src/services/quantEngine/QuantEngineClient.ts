import type { BacktestConfig } from "@/features/backtest/schema";
import type { QuantEngineBacktestResult } from "./types";

export interface QuantEngineClient {
  runBacktest(
    config: BacktestConfig
  ): Promise<QuantEngineBacktestResult>;
}