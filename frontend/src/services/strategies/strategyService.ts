import { prisma } from "@/lib/prisma";

import type {
  StrategyDefinition,
  StrategyWithPerformance,
} from "@/features/strategies/types";

import type { QuantEngineStrategy } from "@/services/quantEngine/types";
import { HttpQuantEngineClient } from "@/services/quantEngine/HttpQuantEngineClient";

function getEngineClient(): HttpQuantEngineClient {
  const url =
    process.env.QUANT_ENGINE_URL ||
    process.env.NEXT_PUBLIC_QUANT_ENGINE_URL ||
    "http://3.6.68.152:8080";
  return new HttpQuantEngineClient(url);
}

function toDisplayName(name: string) {
  switch (name) {
    case "MovingAverageCross":
      return "Moving Average Cross";

    case "EMACross":
      return "EMA Cross";

    case "Bollinger":
      return "Bollinger Bands";

    case "ATRFilter":
      return "ATR Filter";

    case "AlwaysHold":
      return "Always Hold";

    default:
      return name;
  }
}

function toCategory(
  category: string,
): StrategyDefinition["category"] {
  if (
    category === "Trend" ||
    category === "Momentum" ||
    category === "Volatility" ||
    category === "Passive"
  ) {
    return category;
  }

  return "Trend";
}

function toDefinition(
  strategy: QuantEngineStrategy,
): StrategyDefinition {
  return {
    name: strategy.name,
    displayName: toDisplayName(strategy.name),
    description: strategy.description,
    category: toCategory(strategy.category),
    parameters: strategy.parameters,
  };
}

export async function getStrategies(): Promise<
  StrategyWithPerformance[]
> {
  let engineStrategies: QuantEngineStrategy[] = [];
  let backtests: {
    strategy: string;
    totalReturnPercent: number;
    sharpeRatio: number;
    maximumDrawdown: number;
  }[] = [];

  try {
    const client = getEngineClient();
    const results = await Promise.all([
      client.getStrategies(),
      prisma.backtest.findMany({
        where: {
          status: "completed",
        },
        select: {
          strategy: true,
          totalReturnPercent: true,
          sharpeRatio: true,
          maximumDrawdown: true,
        },
      }),
    ]);
    engineStrategies = results[0];
    backtests = results[1];
  } catch (err) {
    console.error("getStrategies error:", err);
    try {
      const client = getEngineClient();
      engineStrategies = await client.getStrategies();
    } catch {
      engineStrategies = [];
    }
  }

  return engineStrategies.map((engineStrategy) => {
    const strategy = toDefinition(engineStrategy);

    const strategyBacktests = backtests.filter(
      (backtest) =>
        backtest.strategy === strategy.name,
    );

    if (strategyBacktests.length === 0) {
      return {
        ...strategy,

        performance: {
          backtestCount: 0,
          averageReturn: 0,
          averageSharpe: 0,
          bestReturn: 0,
          bestDrawdown: 0,
        },
      };
    }

    const averageReturn =
      strategyBacktests.reduce(
        (sum, backtest) =>
          sum + backtest.totalReturnPercent,
        0,
      ) / strategyBacktests.length;

    const averageSharpe =
      strategyBacktests.reduce(
        (sum, backtest) =>
          sum + backtest.sharpeRatio,
        0,
      ) / strategyBacktests.length;

    const bestReturn = Math.max(
      ...strategyBacktests.map(
        (backtest) =>
          backtest.totalReturnPercent,
      ),
    );

    const bestDrawdown = Math.min(
      ...strategyBacktests.map(
        (backtest) =>
          backtest.maximumDrawdown,
      ),
    );

    return {
      ...strategy,

      performance: {
        backtestCount: strategyBacktests.length,
        averageReturn,
        averageSharpe,
        bestReturn,
        bestDrawdown,
      },
    };
  });
}