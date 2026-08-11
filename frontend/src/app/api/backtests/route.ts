import { backtestConfigSchema } from "@/features/backtest/schema";
import { createBacktest } from "@/services/backtest/backtestService";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const result = backtestConfigSchema.safeParse(body);

    if (!result.success) {
      return Response.json(
        {
          error: result.error.issues[0].message,
        },
        { status: 400 }
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
      { status: error instanceof Error && error.message.includes("Invalid") ? 400 : 500 }
    );
  }
}