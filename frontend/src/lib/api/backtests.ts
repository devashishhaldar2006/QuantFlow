import axios from "axios";
import type { BacktestConfig } from "@/features/backtest/schema";

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