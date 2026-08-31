export type StrategyDefinition = {
  name: string;
  displayName: string;
  description: string;
  category:
    | "Trend"
    | "Momentum"
    | "Volatility"
    | "Passive";
  parameters: string[];
};

export type StrategyPerformance = {
  backtestCount: number;
  averageReturn: number;
  averageSharpe: number;
  bestReturn: number;
  bestDrawdown: number;
};

export type StrategyWithPerformance =
  StrategyDefinition & {
    performance: StrategyPerformance;
  };