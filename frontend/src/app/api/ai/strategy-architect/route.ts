import { getCurrentUser } from "@/services/auth/currentUser";
import { createStrategyArchitectGraph } from "@/services/ai/agents/strategyArchitectAgent";
import { z } from "zod";

const requestSchema = z.object({
  hypothesis: z.string().min(5, "Hypothesis must be at least 5 characters long").max(1000),
  preferredAssetClass: z.string().optional(),
  timeframe: z.string().optional(),
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

    const graph = createStrategyArchitectGraph();

    // Run the LangGraph autonomous multi-step workflow
    const result = await graph.invoke(
      {
        hypothesis: parsed.data.hypothesis,
        preferredAssetClass: parsed.data.preferredAssetClass,
        timeframe: parsed.data.timeframe,
        config: {},
        validationErrors: [],
        iterationCount: 0,
        isViable: false,
      },
      {
        configurable: {
          userId: user.id,
        },
      },
    );

    return Response.json({
      success: true,
      config: result.config,
      backtestResult: result.backtestResult,
      strategyMemo: result.strategyMemo,
      reflectionNotes: result.reflectionNotes,
      iterationCount: result.iterationCount,
      validationErrors: result.validationErrors,
    });
  } catch (error: any) {
    console.error("Strategy Architect API error:", error);
    return Response.json(
      {
        error: error?.message || "Failed to execute Strategy Architect AI agent.",
      },
      { status: 500 },
    );
  }
}
