import { getCurrentUser } from "@/services/auth/currentUser";
import { getBacktestById } from "@/services/backtest/backtestService";
import { createRiskOfficerGraph } from "@/services/ai/agents/riskOfficerAgent";
import { z } from "zod";

const requestSchema = z.object({
  backtestId: z.string().min(1, "backtestId is required"),
});

export async function POST(request: Request) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const parsed = requestSchema.safeParse(body);
    if (!parsed.success) {
      return Response.json({ error: parsed.error.issues[0].message }, { status: 400 });
    }

    const backtest = await getBacktestById(parsed.data.backtestId, user.id);
    if (!backtest) {
      return Response.json({ error: "Backtest not found" }, { status: 404 });
    }

    const graph = createRiskOfficerGraph();

    // Execute the LangGraph Risk Officer Audit
    const result = await graph.invoke({
      backtestId: backtest.id,
      strategyName: backtest.strategy,
      initialCapital: backtest.initialCapital,
      finalEquity: backtest.finalEquity,
      netProfit: backtest.netProfit,
      totalReturnPercent: backtest.totalReturnPercent,
      sharpeRatio: backtest.sharpeRatio,
      maximumDrawdown: backtest.maximumDrawdown,
      winRatePercent: backtest.winRatePercent,
      profitFactor: backtest.profitFactor,
      totalTrades: backtest.totalTrades,
      winningTrades: backtest.winningTrades,
      losingTrades: backtest.losingTrades,
      averageWin: backtest.averageWin,
      averageLoss: backtest.averageLoss,
      largestWin: backtest.largestWin,
      largestLoss: backtest.largestLoss,
    });

    return Response.json({
      success: true,
      verdict: result.finalVerdict,
    });
  } catch (error: any) {
    console.error("Risk Officer API error:", error);
    return Response.json(
      {
        error: error?.message || "Failed to execute Risk Officer AI audit.",
      },
      { status: 500 },
    );
  }
}
