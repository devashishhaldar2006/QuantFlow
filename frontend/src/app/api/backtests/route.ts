import { backtestConfigSchema } from "@/features/backtest/schema";
import {
  createBacktest,
  getBacktests,
} from "@/services/backtest/backtestService";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const result = backtestConfigSchema.safeParse(body);

    if (!result.success) {
      return Response.json(
        {
          error: result.error.issues[0].message,
        },
        { status: 400 },
      );
    }

    const backtest = await createBacktest(result.data);

    return Response.json(backtest, {
      status: 201,
    });
  } catch (error) {
    console.error("Backtest creation failed:", error);
    return Response.json(
      {
        error: error instanceof Error ? error.message : "Internal server error",
      },
      {
        status:
          error instanceof Error && error.message.includes("Invalid")
            ? 400
            : 500,
      },
    );
  }
}

export async function GET() {
  try {
    const backtests = await getBacktests();

    return Response.json(backtests);
  } catch (error) {
    console.error("Failed to fetch backtests:", error);

    return Response.json(
      { error: "Failed to fetch backtests" },
      { status: 500 },
    );
  }
}