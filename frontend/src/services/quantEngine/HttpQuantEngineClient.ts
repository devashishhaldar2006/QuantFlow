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
        const data = error.response.data as { error?: string; detail?: string };
        const msg = data.detail ? `${data.error}: ${data.detail}` : (data.error ?? "QuantFlow engine returned an error.");
        throw new Error(msg);
      }

      if (axios.isAxiosError(error) && error.code) {
        throw new Error(`Cannot connect to C++ Quant Engine at ${this.baseUrl} (${error.code}).`);
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
      console.warn("QuantFlow Engine is unreachable or returned an error. Using fallback strategies.", error);
      return [];
    }
  }
}