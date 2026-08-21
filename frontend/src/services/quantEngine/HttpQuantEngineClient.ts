import axios from "axios";

import type { BacktestConfig } from "@/features/backtest/schema";
import type { BacktestResult } from "@/features/backtest/types";
import type { QuantEngineClient } from "./QuantEngineClient";
import type { QuantEngineStrategy } from "./types";

export class HttpQuantEngineClient
  implements QuantEngineClient
{
  private readonly baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  async runBacktest(
    config: BacktestConfig,
  ): Promise<BacktestResult> {
    try {
      const response = await axios.post<BacktestResult>(
        `${this.baseUrl}/backtest`,
        config,
      );

      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        throw new Error(
          error.response.data.error ??
            "QuantFlow engine failed to run backtest.",
        );
      }

      throw error;
    }
  }

  async getStrategies(): Promise<QuantEngineStrategy[]> {
    try {
      const response =
        await axios.get<QuantEngineStrategy[]>(
          `${this.baseUrl}/strategies`,
        );

      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        throw new Error(
          error.response.data.error ??
            "QuantFlow engine failed to fetch strategies.",
        );
      }

      throw error;
    }
  }
}