import "server-only";

import type { Plan } from "@/generated/prisma/enums";

export const FREE_BACKTEST_LIMIT = 5;

export type QuantFlowEntitlements = {
  plan: Plan;

  backtestsPerDay: number | null;

  canUseAdvancedStrategies: boolean;
  canBatchOptimize: boolean;
  canExportCsv: boolean;
  canExportJson: boolean;
  canUseCustomIndicators: boolean;
  canUseCustomCppEngine: boolean;
  canUseRawSql: boolean;
  canUseParquet: boolean;
  canUseApiAccess: boolean;
};

export function getEntitlements(
  plan: Plan,
): QuantFlowEntitlements {
  if (plan === "PRO") {
    return {
      plan: "PRO",

      backtestsPerDay: null,

      canUseAdvancedStrategies: true,
      canBatchOptimize: true,
      canExportCsv: true,
      canExportJson: true,
      canUseCustomIndicators: true,
      canUseCustomCppEngine: false,
      canUseRawSql: false,
      canUseParquet: false,
      canUseApiAccess: false,
    };
  }

  return {
    plan: "FREE",

    backtestsPerDay: FREE_BACKTEST_LIMIT,

    canUseAdvancedStrategies: false,
    canBatchOptimize: false,
    canExportCsv: false,
    canExportJson: false,
    canUseCustomIndicators: false,
    canUseCustomCppEngine: false,
    canUseRawSql: false,
    canUseParquet: false,
    canUseApiAccess: false,
  };
}