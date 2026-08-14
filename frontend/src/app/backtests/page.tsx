import { getBacktests } from "@/services/backtest/backtestService";
import Backtests from "@/features/backtest/components/Backtest";

export default async function BacktestsPage() {
  const backtests = await getBacktests();

  return <Backtests backtests={backtests} />;
}