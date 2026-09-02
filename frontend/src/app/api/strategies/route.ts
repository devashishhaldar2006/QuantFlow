import { getStrategies } from "@/services/strategies/strategyService";

export async function GET() {
  try {
    const strategies = await getStrategies();
    return Response.json(strategies);
  } catch (error) {
    console.error("GET /api/strategies error:", error);
    return Response.json([], { status: 200 });
  }
}
