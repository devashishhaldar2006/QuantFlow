import axios from "axios";
import type { BacktestConfig } from "@/features/backtest/schema";
import type { QuantEngineClient } from "./QuantEngineClient";
import type { BacktestResult } from "@/features/backtest/types";

export class HttpQuantEngineClient
  implements QuantEngineClient
{
  private readonly baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  async runBacktest(
    config: BacktestConfig
  ): Promise<BacktestResult> {
    try {
      const response = await axios.post<BacktestResult>(
        `${this.baseUrl}/backtest`,
        config
      );

      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        throw new Error(
          error.response.data.error ??
            "QuantFlow engine failed to run backtest."
        );
      }

      throw error;
    }
  }
}