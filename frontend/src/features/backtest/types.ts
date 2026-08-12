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

export type EquityPoint = {
  timestamp: string;
  equity: number;
};

export type TradeResult = {
  timestamp: string;
  side: "BUY" | "SELL";
  quantity: number;
  executionPrice: number;
  commission: number;
  cashFlow: number;
};

export type BacktestResult = {
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

  equityCurve: EquityPoint[];
  trades: TradeResult[];
};