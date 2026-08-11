import type { BacktestResult } from "./types";

let latestBacktestResult: BacktestResult | null = null;

export function setLatestBacktestResult(
  result: BacktestResult
) {
  latestBacktestResult = result;
}

export function getLatestBacktestResult() {
  return latestBacktestResult;
}