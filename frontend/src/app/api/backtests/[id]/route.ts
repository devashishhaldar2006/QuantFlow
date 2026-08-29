import { getCurrentUser } from "@/services/auth/currentUser";

import { getBacktestById } from "@/services/backtest/backtestService";

type RouteContext = {
  params: Promise<{
    id: string;
  }>;
};

export async function GET(
  _request: Request,
  context: RouteContext,
) {
  try {
    const user = await getCurrentUser();

    if (!user) {
      return Response.json(
        { error: "Unauthorized" },
        { status: 401 },
      );
    }

    const { id } = await context.params;

    const backtest = await getBacktestById(
      id,
      user.id,
    );

    if (!backtest) {
      return Response.json(
        { error: "Backtest not found" },
        { status: 404 },
      );
    }

    return Response.json(backtest);
  } catch (error) {
    console.error(
      "Failed to fetch backtest:",
      error,
    );

    return Response.json(
      {
        error: "Failed to fetch backtest",
      },
      { status: 500 },
    );
  }
}