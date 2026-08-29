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

export async function getBacktestUsage(
  userId: string,
) {
  const date = getUtcDay();

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
}

export async function consumeFreeBacktest(
  userId: string,
): Promise<boolean> {
  const date = getUtcDay();

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
      /*
       * Another concurrent request may have created
       * the usage row between our findUnique() and
       * create().
       *
       * In that case, continue to the atomic UPDATE
       * below.
       */
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
}