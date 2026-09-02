import { BacktestConfig } from "@/features/backtest/schema";
import { BacktestResult } from "@/features/backtest/types";

export interface StrategyArchitectState {
  hypothesis: string;
  preferredAssetClass?: string;
  timeframe?: string;
  config: Partial<BacktestConfig>;
  validationErrors: string[];
  iterationCount: number;
  backtestResult?: BacktestResult | null;
  reflectionNotes?: string;
  isViable: boolean;
  strategyMemo?: string;
}

export interface RiskAuditMetric {
  name: string;
  score: number; // 0 to 100
  status: "OPTIMAL" | "MODERATE_RISK" | "CRITICAL_RISK";
  observation: string;
}

export interface RiskOfficerVerdict {
  overallHealthScore: number; // 0 to 100
  classification: "INSTITUTIONAL_GRADE" | "SPECULATIVE" | "OVERFITTED" | "EXCESSIVE_TAIL_RISK";
  summary: string;
  overfittingAnalysis: {
    score: number;
    luckConcentrationPercent: number;
    observations: string[];
  };
  regimeStressAnalysis: {
    score: number;
    stressTestSummary: string;
    vulnerableConditions: string[];
  };
  actionableRecommendations: string[];
  auditedAt: string;
}

export interface RiskOfficerState {
  backtestId: string;
  strategyName: string;
  initialCapital: number;
  finalEquity: number;
  netProfit: number;
  totalReturnPercent: number;
  sharpeRatio: number;
  maximumDrawdown: number;
  winRatePercent: number;
  profitFactor: number;
  totalTrades: number;
  winningTrades: number;
  losingTrades: number;
  averageWin: number;
  averageLoss: number;
  largestWin: number;
  largestLoss: number;
  // Audit outputs
  overfittingFindings?: {
    score: number;
    luckConcentrationPercent: number;
    observations: string[];
  };
  regimeFindings?: {
    score: number;
    stressTestSummary: string;
    vulnerableConditions: string[];
  };
  finalVerdict?: RiskOfficerVerdict;
}
