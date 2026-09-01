import { getCurrentUser } from "@/services/auth/currentUser";
import { MarketDataService } from "@/services/data/marketDataService";
import { AssetClass, Timeframe } from "@/features/data/types";

export async function POST(request: Request) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return Response.json({ error: "Unauthorized access" }, { status: 401 });
    }

    const body = await request.json();
    const { symbol, name, assetClass, timeframe, provider } = body as {
      symbol: string;
      name: string;
      assetClass: AssetClass;
      timeframe: Timeframe;
      provider?: "YAHOO" | "BINANCE";
    };

    if (!symbol || !assetClass || !timeframe) {
      return Response.json(
        { error: "Missing required parameters: symbol, assetClass, and timeframe" },
        { status: 400 },
      );
    }

    const result = await MarketDataService.syncMarketDataset(user.id, {
      symbol,
      name: name || `${symbol} Market Feed`,
      assetClass,
      timeframe,
      provider,
    });

    if (!result.success) {
      return Response.json({ error: result.error || "Failed to sync market dataset" }, { status: 400 });
    }

    return Response.json({ success: true, result });
  } catch (error) {
    console.error("POST /api/datasets/sync error:", error);
    return Response.json({ error: "Internal server error syncing dataset" }, { status: 500 });
  }
}
