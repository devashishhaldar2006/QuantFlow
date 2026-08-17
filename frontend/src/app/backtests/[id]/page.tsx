import { getBacktestById } from "@/services/backtest/backtestService";

import {
  BacktestNotFound,
} from "@/features/backtest/components/BacktestDetails";

import BacktestDetails from "@/features/backtest/components/BacktestDetails";

type PageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function BacktestDetailsPage({
  params,
}: PageProps) {
  const { id } = await params;

  const backtest = await getBacktestById(id);

  if (!backtest) {
    return <BacktestNotFound />;
  }

  return <BacktestDetails backtest={backtest} />;
}