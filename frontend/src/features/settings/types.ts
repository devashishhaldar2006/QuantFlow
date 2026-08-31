export type EngineConfig = {
  strategy: string;
  csvFile: string;
  initialCash: number;
  commission: number;
  stopLossPercent: number;
  takeProfitPercent: number;
  slippage: number;
  shortMAPeriod: number;
  longMAPeriod: number;
  rsiPeriod: number;
  oversold: number;
  overbought: number;
  fastEMAPeriod: number;
  slowEMAPeriod: number;
  macdFastPeriod: number;
  macdSlowPeriod: number;
  macdSignalPeriod: number;
  bollingerPeriod: number;
  bollingerMultiplier: number;
  atrPeriod: number;
  minimumATR: number;
};

export const DEFAULT_CONFIG: EngineConfig = {
  strategy: "MovingAverageCross",
  csvFile: "data/sample.csv",
  initialCash: 10000,
  commission: 0.001,
  stopLossPercent: 0.05,
  takeProfitPercent: 0.10,
  slippage: 0.001,
  shortMAPeriod: 10,
  longMAPeriod: 20,
  rsiPeriod: 14,
  oversold: 30,
  overbought: 70,
  fastEMAPeriod: 10,
  slowEMAPeriod: 20,
  macdFastPeriod: 12,
  macdSlowPeriod: 26,
  macdSignalPeriod: 9,
  bollingerPeriod: 20,
  bollingerMultiplier: 2.0,
  atrPeriod: 14,
  minimumATR: 1.0,
};
