import { getBacktestSummaries } from "@/services/backtest/backtestService";
import Backtests from "@/features/backtest/components/Backtest";

type PageProps = {
  searchParams: Promise<{
    page?: string;
    search?: string;
    status?: string;
    strategy?: string;
  }>;
};

export default async function BacktestsPage({
  searchParams,
}: PageProps) {
  const params = await searchParams;

  const page = Math.max(
    1,
    Number(params.page) || 1,
  );

  const pageSize = 20;

  const search = params.search?.trim() || undefined;

  const status =
    params.status === "completed" ||
    params.status === "running" ||
    params.status === "failed"
      ? params.status
      : undefined;

  const strategy =
    params.strategy?.trim() || undefined;

  const result = await getBacktestSummaries(
    page,
    pageSize,
    search,
    status,
    strategy,
  );

  return (
    <Backtests
      backtests={result.data}
      page={result.page}
      pageSize={result.pageSize}
      total={result.total}
      totalPages={result.totalPages}
      search={search}
      status={status}
      strategy={strategy}
    />
  );
}