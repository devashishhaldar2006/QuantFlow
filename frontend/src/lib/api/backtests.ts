import axios from "axios";
import type { BacktestConfig } from "@/features/backtest/schema";
import type { PersistedBacktest } from "@/features/backtest/types";

export async function createBacktest(config: BacktestConfig) {
  try {
    const response = await axios.post("/api/backtests", config);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error || "Failed to create backtest");
    }
    throw error;
  }
}

export async function getBacktests(): Promise<PersistedBacktest[]> {
  try {
    const response = await axios.get<PersistedBacktest[]>("/api/backtests");
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error || "Failed to fetch backtests");
    }

    throw error;
  }
}
