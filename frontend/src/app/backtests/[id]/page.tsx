import { getCurrentUser } from "@/services/auth/currentUser";

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
  const user = await getCurrentUser();

  if (!user) {
    return <BacktestNotFound />;
  }

  const { id } = await params;

  const backtest = await getBacktestById(
    id,
    user.id,
  );

  if (!backtest) {
    return <BacktestNotFound />;
  }

  return (
    <BacktestDetails
      backtest={backtest}
    />
  );
}