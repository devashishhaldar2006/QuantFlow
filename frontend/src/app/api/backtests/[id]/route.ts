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
    const { id } = await context.params;

    const backtest = await getBacktestById(id);

    if (!backtest) {
      return Response.json(
        { error: "Backtest not found" },
        { status: 404 },
      );
    }

    return Response.json(backtest);
  } catch (error) {
    console.error("Failed to fetch backtest:", error);

    return Response.json(
      { error: "Failed to fetch backtest" },
      { status: 500 },
    );
  }
}