import { getCurrentUser } from "@/services/auth/currentUser";
import { getBacktests } from "@/services/backtest/backtestService";
import BacktestResultsClient from "./BacktestResultsClient";
import Link from "next/link";
import { FlaskConical } from "lucide-react";

export default async function BacktestResultsPage() {
  const user = await getCurrentUser();

  if (!user) {
    return null;
  }

  const backtests = await getBacktests(user.id);
  const result = backtests[0] ?? null;

  if (!result) {
    return (
      <div className="flex flex-col items-center justify-center py-24 rounded border border-zinc-200 bg-white p-8 text-center space-y-4 shadow-sm">
        <div className="size-14 rounded border border-zinc-900 bg-zinc-950 flex items-center justify-center text-white shadow-sm">
          <FlaskConical className="size-6 text-white" />
        </div>
        <div className="space-y-1">
          <h1 className="text-base font-bold font-mono tracking-tight text-zinc-950 uppercase">
            NO_BACKTEST_RESULTS_FOUND
          </h1>
          <p className="text-xs text-zinc-600 max-w-sm font-mono leading-relaxed">
            Execute a new quantitative backtest to view performance analytics, equity curves, and trade ledgers.
          </p>
        </div>
        <Link
          href="/backtests/new"
          className="inline-flex items-center gap-2 rounded bg-zinc-950 px-5 py-2.5 text-xs font-mono font-medium text-white hover:bg-zinc-800 transition-all shadow-sm"
        >
          LAUNCH_NEW_BACKTEST
        </Link>
      </div>
    );
  }

  return <BacktestResultsClient result={result} />;
}