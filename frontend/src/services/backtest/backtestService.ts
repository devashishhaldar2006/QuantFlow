import type { BacktestConfig } from "@/features/backtest/schema";
import { HttpQuantEngineClient } from "../quantEngine/HttpQuantEngineClient";
import { prisma } from "@/lib/prisma";
import type {
  BacktestStatus,
  BacktestSummary,
  BacktestSummaryPage,
  PersistedBacktest,
} from "@/features/backtest/types";

const quantEngine = new HttpQuantEngineClient(
  process.env.QUANT_ENGINE_URL ?? "http://localhost:8080",
);

export async function createBacktest(
  config: BacktestConfig,
  userId: string,
) {
  const result = await quantEngine.runBacktest(config);

  const backtest = await prisma.$transaction(async (tx) => {
    const createdBacktest = await tx.backtest.create({
      data: {
        user: {
          connect: {
            id: userId,
          },
        },

        strategy: config.strategy,

        initialCapital: result.initialCapital,
        finalEquity: result.finalEquity,
        netProfit: result.netProfit,
        totalReturnPercent: result.totalReturnPercent,

        totalTrades: result.totalTrades,
        winningTrades: result.winningTrades,
        losingTrades: result.losingTrades,
        winRatePercent: result.winRatePercent,

        averageWin: result.averageWin,
        averageLoss: result.averageLoss,
        largestWin: result.largestWin,
        largestLoss: result.largestLoss,

        maximumDrawdown: result.maximumDrawdown,
        profitFactor: result.profitFactor,
        expectancy: result.expectancy,

        annualizedReturn: result.annualizedReturn,
        annualizedVolatility: result.annualizedVolatility,
        sharpeRatio: result.sharpeRatio,

        status: "completed",
      },
    });

    await tx.trade.createMany({
      data: result.trades.map((trade) => ({
        timestamp: new Date(trade.timestamp),
        side: trade.side,
        quantity: trade.quantity,
        executionPrice: trade.executionPrice,
        commission: trade.commission,
        cashFlow: trade.cashFlow,
        backtestId: createdBacktest.id,
      })),
    });

    await tx.equityPoint.createMany({
      data: result.equityCurve.map((point) => ({
        timestamp: new Date(point.timestamp),
        equity: point.equity,
        backtestId: createdBacktest.id,
      })),
    });

    return createdBacktest;
  });

  return {
    ...result,
    id: backtest.id,
  };
}

export async function getBacktests(
  userId: string,
): Promise<PersistedBacktest[]> {
  const backtests = await prisma.backtest.findMany({
    where: {
      userId,
    },

    orderBy: {
      createdAt: "desc",
    },

    include: {
      trades: true,
      equityCurve: true,
    },
  });

  return backtests.map((backtest) => ({
    ...backtest,

    status: backtest.status as PersistedBacktest["status"],

    createdAt: backtest.createdAt.toISOString(),

    trades: backtest.trades.map((trade) => ({
      timestamp: trade.timestamp.toISOString(),
      side: trade.side as "BUY" | "SELL",
      quantity: trade.quantity,
      executionPrice: trade.executionPrice,
      commission: trade.commission,
      cashFlow: trade.cashFlow,
    })),

    equityCurve: backtest.equityCurve.map((point) => ({
      timestamp: point.timestamp.toISOString(),
      equity: point.equity,
    })),
  }));
}

export async function getBacktestById(
  id: string,
  userId: string,
): Promise<PersistedBacktest | null> {
  const backtest = await prisma.backtest.findFirst({
    where: {
      id,
      userId,
    },

    include: {
      trades: true,
      equityCurve: true,
    },
  });

  if (!backtest) {
    return null;
  }

  return {
    ...backtest,

    status: backtest.status as PersistedBacktest["status"],

    createdAt: backtest.createdAt.toISOString(),

    trades: backtest.trades.map((trade) => ({
      timestamp: trade.timestamp.toISOString(),
      side: trade.side as "BUY" | "SELL",
      quantity: trade.quantity,
      executionPrice: trade.executionPrice,
      commission: trade.commission,
      cashFlow: trade.cashFlow,
    })),

    equityCurve: backtest.equityCurve.map((point) => ({
      timestamp: point.timestamp.toISOString(),
      equity: point.equity,
    })),
  };
}

export async function getBacktestSummaries(
  userId: string,
  page: number,
  pageSize: number,
  search?: string,
  status?: BacktestStatus,
  strategy?: string,
): Promise<BacktestSummaryPage> {
  const where = {
    userId,

    ...(search
      ? {
          strategy: {
            contains: search,
            mode: "insensitive" as const,
          },
        }
      : {}),

    ...(status
      ? {
          status,
        }
      : {}),

    ...(strategy
      ? {
          strategy,
        }
      : {}),
  };

  const [backtests, total] = await prisma.$transaction([
    prisma.backtest.findMany({
      where,

      orderBy: {
        createdAt: "desc",
      },

      skip: (page - 1) * pageSize,
      take: pageSize,

      select: {
        id: true,
        strategy: true,
        initialCapital: true,
        totalReturnPercent: true,
        sharpeRatio: true,
        maximumDrawdown: true,
        status: true,
        createdAt: true,
      },
    }),

    prisma.backtest.count({
      where,
    }),
  ]);

  const data = backtests.map((backtest) => ({
    ...backtest,

    status: backtest.status as BacktestSummary["status"],

    createdAt: backtest.createdAt.toISOString(),
  }));

  return {
    data,
    total,
    page,
    pageSize,
    totalPages: Math.ceil(total / pageSize),
  };
}