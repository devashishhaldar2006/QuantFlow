import "server-only";

import { prisma } from "@/lib/prisma";

export const FREE_BACKTEST_LIMIT = 5;

function getUtcDay(): Date {
  const now = new Date();

  return new Date(
    Date.UTC(
      now.getUTCFullYear(),
      now.getUTCMonth(),
      now.getUTCDate(),
    ),
  );
}

// In-memory daily counter fallback if PostgreSQL database is offline or unreachable
const memoryUsageStore = new Map<string, { count: number; dateStr: string }>();

export async function getBacktestUsage(
  userId: string,
) {
  const date = getUtcDay();
  const dateStr = date.toISOString().split("T")[0];

  try {
    const usage = await prisma.backtestUsage.findUnique({
      where: {
        userId_date: {
          userId,
          date,
        },
      },
    });

    const used = usage?.count ?? 0;

    return {
      used,
      limit: FREE_BACKTEST_LIMIT,
      remaining: Math.max(
        0,
        FREE_BACKTEST_LIMIT - used,
      ),
      date,
    };
  } catch (err) {
    console.warn("Prisma backtestUsage offline, using memory store fallback:", err);
    const existing = memoryUsageStore.get(userId);
    const used = (existing && existing.dateStr === dateStr) ? existing.count : 0;
    return {
      used,
      limit: FREE_BACKTEST_LIMIT,
      remaining: Math.max(0, FREE_BACKTEST_LIMIT - used),
      date,
    };
  }
}

export async function consumeFreeBacktest(
  userId: string,
): Promise<boolean> {
  const date = getUtcDay();
  const dateStr = date.toISOString().split("T")[0];

  try {
    const existingUsage =
      await prisma.backtestUsage.findUnique({
        where: {
          userId_date: {
            userId,
            date,
          },
        },
      });

    if (!existingUsage) {
      try {
        await prisma.backtestUsage.create({
          data: {
            userId,
            date,
            count: 1,
          },
        });

        return true;
      } catch (error) {
        if (
          !(
            error instanceof Error &&
            error.message.includes(
              "Unique constraint failed",
            )
          )
        ) {
          throw error;
        }
      }
    }

    const updatedRows = await prisma.$executeRaw`
      UPDATE "BacktestUsage"
      SET
        "count" = "count" + 1,
        "updatedAt" = NOW()
      WHERE
        "userId" = ${userId}
        AND "date" = ${date}
        AND "count" < ${FREE_BACKTEST_LIMIT}
    `;

    return updatedRows === 1;
  } catch (err) {
    console.warn("Prisma consumeFreeBacktest offline, falling back to memory store:", err);
    const existing = memoryUsageStore.get(userId);
    if (!existing || existing.dateStr !== dateStr) {
      memoryUsageStore.set(userId, { count: 1, dateStr });
      return true;
    }
    if (existing.count < FREE_BACKTEST_LIMIT) {
      existing.count += 1;
      return true;
    }
    return false;
  }
}