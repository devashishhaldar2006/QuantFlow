import { getCurrentUser } from "@/services/auth/currentUser";
import { getEntitlements } from "@/services/billing/entitlementService";
import { getBacktestUsage } from "@/services/usage/backtestUsageService";

export async function GET() {
  try {
    const user = await getCurrentUser();

    if (!user) {
      return Response.json(
        { error: "Unauthorized" },
        { status: 401 },
      );
    }

    const entitlements = getEntitlements(user.plan);

    if (entitlements.backtestsPerDay === null) {
      return Response.json({
        plan: user.plan,
        used: 0,
        limit: null,
        remaining: null,
        unlimited: true,
      });
    }

    const usage = await getBacktestUsage(user.id);

    return Response.json({
      plan: user.plan,
      used: usage.used,
      limit: usage.limit,
      remaining: usage.remaining,
      unlimited: false,
    });
  } catch (error) {
    console.error(
      "Failed to fetch backtest usage:",
      error,
    );

    return Response.json(
      {
        error: "Failed to fetch backtest usage",
      },
      { status: 500 },
    );
  }
}