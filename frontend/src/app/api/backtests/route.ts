import { getCurrentUser } from "@/services/auth/currentUser";

import { backtestConfigSchema } from "@/features/backtest/schema";

import {
  createBacktest,
  getBacktests,
} from "@/services/backtest/backtestService";

import { getEntitlements } from "@/services/billing/entitlementService";

import { consumeFreeBacktest } from "@/services/usage/backtestUsageService";

export async function POST(request: Request) {
  try {
    const user = await getCurrentUser();

    if (!user) {
      return Response.json(
        { error: "Unauthorized" },
        { status: 401 },
      );
    }

    const body = await request.json();

    const result =
      backtestConfigSchema.safeParse(body);

    if (!result.success) {
      return Response.json(
        {
          error:
            result.error.issues[0].message,
        },
        { status: 400 },
      );
    }

    const entitlements = getEntitlements(
      user.plan,
    );

    /*
     * Pro users have unlimited backtests.
     *
     * Free users must successfully consume
     * one daily quota slot before the
     * Quant Engine is called.
     */
    if (entitlements.backtestsPerDay !== null) {
      const allowed = await consumeFreeBacktest(
        user.id,
      );

      if (!allowed) {
        return Response.json(
          {
            error:
              "Daily backtest limit reached.",
            code: "BACKTEST_LIMIT_REACHED",
            limit:
              entitlements.backtestsPerDay,
          },
          { status: 429 },
        );
      }
    }

    const backtest = await createBacktest(
      result.data,
      user.id,
    );

    return Response.json(backtest, {
      status: 201,
    });
  } catch (error) {
    console.error(
      "Backtest creation failed:",
      error,
    );

    return Response.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Internal server error",
      },
      { status: 500 },
    );
  }
}

export async function GET() {
  try {
    const user = await getCurrentUser();

    if (!user) {
      return Response.json(
        { error: "Unauthorized" },
        { status: 401 },
      );
    }

    const backtests = await getBacktests(
      user.id,
    );

    return Response.json(backtests);
  } catch (error) {
    console.error(
      "Failed to fetch backtests:",
      error,
    );

    return Response.json(
      {
        error: "Failed to fetch backtests",
      },
      { status: 500 },
    );
  }
}