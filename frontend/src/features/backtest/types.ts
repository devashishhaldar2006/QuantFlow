export type BacktestStatus =
  | "completed"
  | "running"
  | "failed";

export type Backtest = {
  id: string;
  strategy: string;
  symbol: string;
  timeframe: string;
  startDate: string;
  endDate: string;
  returnPercentage: number;
  sharpeRatio: number;
  maxDrawdown: number;
  status: BacktestStatus;
};