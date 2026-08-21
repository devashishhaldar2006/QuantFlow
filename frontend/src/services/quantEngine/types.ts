import type { BacktestConfig } from "@/features/backtest/schema";

export type QuantEngineBacktestRequest = {
  config: BacktestConfig;
};

export type QuantEngineBacktestResponse = {
  jobId: string;
  status: "running" | "completed" | "failed";
};

export type QuantEngineBacktestResult = {
  initialCapital: number;
  finalEquity: number;
  netProfit: number;
  totalReturnPercent: number;

  totalTrades: number;
  winningTrades: number;
  losingTrades: number;
  winRatePercent: number;

  averageWin: number;
  averageLoss: number;

  largestWin: number;
  largestLoss: number;

  maximumDrawdown: number;
  profitFactor: number;
  expectancy: number;

  annualizedReturn: number;
  annualizedVolatility: number;
  sharpeRatio: number;
};

export type QuantEngineStrategy = {
  name: string;
  category: string;
  description: string;
  parameters: string[];
};