import type { BacktestConfig } from "@/features/backtest/schema";
import { HttpQuantEngineClient } from "../quantEngine/HttpQuantEngineClient";

const quantEngine = new HttpQuantEngineClient(
  process.env.QUANT_ENGINE_URL ?? "http://localhost:8080"
);

export async function createBacktest(
  config: BacktestConfig
) {
  const result = await quantEngine.runBacktest(config);

  return result;
}