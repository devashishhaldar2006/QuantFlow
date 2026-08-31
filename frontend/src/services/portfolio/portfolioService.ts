import { prisma } from "@/lib/prisma";

export type PortfolioStrategy = {
  strategy: string;
  backtestCount: number;
  initialCapital: number;
  finalEquity: number;
  netProfit: number;
  returnPercent: number;
};

export type PortfolioActivity = {
  timestamp: string;
  strategy: string;
  side: "BUY" | "SELL";
  quantity: number;
  executionPrice: number;
  commission: number;
  cashFlow: number;
};

export type PortfolioSummary = {
  totalBacktests: number;
  initialCapital: number;
  finalEquity: number;
  netProfit: number;
  returnPercent: number;
  strategies: PortfolioStrategy[];
  activities: PortfolioActivity[];
};

export async function getPortfolioSummary(): Promise<PortfolioSummary> {
  try {
    const backtests = await prisma.backtest.findMany({
      where: {
        status: "completed",
      },
      select: {
        strategy: true,
        initialCapital: true,
        finalEquity: true,
        netProfit: true,
        totalReturnPercent: true,
        createdAt: true,
        trades: {
          orderBy: {
            timestamp: "desc",
          },
          take: 10,
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    if (!backtests || backtests.length === 0) {
      return {
        totalBacktests: 0,
        initialCapital: 0,
        finalEquity: 0,
        netProfit: 0,
        returnPercent: 0,
        strategies: [],
        activities: [],
      };
    }

    const initialCapital = backtests.reduce(
      (sum, backtest) => sum + backtest.initialCapital,
      0,
    );

    const finalEquity = backtests.reduce(
      (sum, backtest) => sum + backtest.finalEquity,
      0,
    );

    const netProfit = backtests.reduce(
      (sum, backtest) => sum + backtest.netProfit,
      0,
    );

    const returnPercent =
      initialCapital > 0
        ? (netProfit / initialCapital) * 100
        : 0;

    const strategyMap = new Map<string, PortfolioStrategy>();

    for (const backtest of backtests) {
      const existing = strategyMap.get(backtest.strategy);

      if (!existing) {
        strategyMap.set(backtest.strategy, {
          strategy: backtest.strategy,
          backtestCount: 1,
          initialCapital: backtest.initialCapital,
          finalEquity: backtest.finalEquity,
          netProfit: backtest.netProfit,
          returnPercent: backtest.totalReturnPercent,
        });

        continue;
      }

      existing.backtestCount += 1;
      existing.initialCapital += backtest.initialCapital;
      existing.finalEquity += backtest.finalEquity;
      existing.netProfit += backtest.netProfit;
    }

    const strategies = Array.from(strategyMap.values()).map(
      (strategy) => ({
        ...strategy,
        returnPercent:
          strategy.initialCapital > 0
            ? (strategy.netProfit /
                strategy.initialCapital) *
              100
            : 0,
      }),
    );

    strategies.sort((a, b) => b.netProfit - a.netProfit);

    const activities: PortfolioActivity[] = backtests
      .flatMap((backtest) =>
        backtest.trades.map((trade) => ({
          timestamp: trade.timestamp.toISOString(),
          strategy: backtest.strategy,
          side: trade.side as "BUY" | "SELL",
          quantity: trade.quantity,
          executionPrice: trade.executionPrice,
          commission: trade.commission,
          cashFlow: trade.cashFlow,
        })),
      )
      .sort(
        (a, b) =>
          new Date(b.timestamp).getTime() -
          new Date(a.timestamp).getTime(),
      )
      .slice(0, 20);

    return {
      totalBacktests: backtests.length,
      initialCapital,
      finalEquity,
      netProfit,
      returnPercent,
      strategies,
      activities,
    };
  } catch (err) {
    console.error("getPortfolioSummary error:", err);
    return {
      totalBacktests: 0,
      initialCapital: 0,
      finalEquity: 0,
      netProfit: 0,
      returnPercent: 0,
      strategies: [],
      activities: [],
    };
  }
}