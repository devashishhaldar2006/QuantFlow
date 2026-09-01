import { prisma } from "@/lib/prisma";

export type StrategyAnalytics = {
  strategy: string;
  backtestCount: number;
  averageReturn: number;
  averageSharpe: number;
  bestReturn: number;
  bestMaxDrawdown: number;
};

export type AnalyticsSummary = {
  totalBacktests: number;
  averageReturn: number;
  bestReturn: number;
  averageSharpe: number;
  bestSharpe: number;
  bestMaxDrawdown: number;
  strategies: StrategyAnalytics[];
};

export async function getAnalyticsSummary(): Promise<AnalyticsSummary> {
  try {
    const backtests = await prisma.backtest.findMany({
      where: {
        status: "completed",
      },
      select: {
        strategy: true,
        totalReturnPercent: true,
        sharpeRatio: true,
        maximumDrawdown: true,
        totalTrades: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    if (!backtests || backtests.length === 0) {
      return {
        totalBacktests: 0,
        averageReturn: 0,
        bestReturn: 0,
        averageSharpe: 0,
        bestSharpe: 0,
        bestMaxDrawdown: 0,
        strategies: [],
      };
    }

  const totalReturn = backtests.reduce(
    (sum, backtest) => sum + backtest.totalReturnPercent,
    0,
  );

  const totalSharpe = backtests.reduce(
    (sum, backtest) => sum + backtest.sharpeRatio,
    0,
  );

  const bestReturn = Math.max(
    ...backtests.map(
      (backtest) => backtest.totalReturnPercent,
    ),
  );

  const bestSharpe = Math.max(
    ...backtests.map((backtest) => backtest.sharpeRatio),
  );

  // Zero-trade backtests have 0% drawdown because no positions
  // were opened. They should not be considered when determining
  // the best actual trading drawdown.
  const tradedBacktests = backtests.filter(
    (backtest) => backtest.totalTrades > 0,
  );

  const bestMaxDrawdown =
    tradedBacktests.length > 0
      ? Math.min(
          ...tradedBacktests.map(
            (backtest) => backtest.maximumDrawdown,
          ),
        )
      : 0;

  const strategyMap = new Map<string, StrategyAnalytics>();

  for (const backtest of backtests) {
    const existing = strategyMap.get(backtest.strategy);

    if (!existing) {
      strategyMap.set(backtest.strategy, {
        strategy: backtest.strategy,
        backtestCount: 1,
        averageReturn: backtest.totalReturnPercent,
        averageSharpe: backtest.sharpeRatio,
        bestReturn: backtest.totalReturnPercent,
        bestMaxDrawdown: backtest.maximumDrawdown,
      });

      continue;
    }

    existing.backtestCount += 1;

    existing.averageReturn += backtest.totalReturnPercent;
    existing.averageSharpe += backtest.sharpeRatio;

    existing.bestReturn = Math.max(
      existing.bestReturn,
      backtest.totalReturnPercent,
    );

    existing.bestMaxDrawdown = Math.min(
      existing.bestMaxDrawdown,
      backtest.maximumDrawdown,
    );
  }

  const strategies = Array.from(strategyMap.values()).map(
    (strategy) => ({
      ...strategy,
      averageReturn:
        strategy.averageReturn / strategy.backtestCount,
      averageSharpe:
        strategy.averageSharpe / strategy.backtestCount,
    }),
  );

  strategies.sort(
    (a, b) => b.averageReturn - a.averageReturn,
  );

    return {
      totalBacktests: backtests.length,
      averageReturn: totalReturn / backtests.length,
      bestReturn,
      averageSharpe: totalSharpe / backtests.length,
      bestSharpe,
      bestMaxDrawdown,
      strategies,
    };
  } catch (err) {
    console.error("getAnalyticsSummary error:", err);
    return {
      totalBacktests: 0,
      averageReturn: 0,
      bestReturn: 0,
      averageSharpe: 0,
      bestSharpe: 0,
      bestMaxDrawdown: 0,
      strategies: [],
    };
  }
}