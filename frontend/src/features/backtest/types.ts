export type BacktestStatus =
  | "completed"
  | "running"
  | "failed";

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

export type PersistedBacktest = {
  id: string;
  strategy: string;
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

  status: "completed" | "running" | "failed";
  createdAt: string;

  equityCurve: EquityPoint[];
  trades: TradeResult[];
};

export type BacktestSummary = {
  id: string;
  strategy: string;
  initialCapital: number;
  totalReturnPercent: number;
  sharpeRatio: number;
  maximumDrawdown: number;
  status: BacktestStatus;
  createdAt: string;
};
export type BacktestSummaryPage = {
  data: BacktestSummary[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
};