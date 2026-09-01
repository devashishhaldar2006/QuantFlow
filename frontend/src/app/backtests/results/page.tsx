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
      <div className="flex flex-col items-center justify-center p-16 text-center space-y-4">
        <div className="size-14 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
          <FlaskConical className="size-6" />
        </div>
        <div className="space-y-1">
          <h1 className="text-xl font-bold text-slate-100">No Backtest Results Found</h1>
          <p className="text-xs text-slate-400 max-w-sm">
            Execute a new quantitative backtest to view performance analytics, equity curves, and trade ledgers.
          </p>
        </div>
        <Link
          href="/backtests/new"
          className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-2.5 text-xs font-semibold text-white shadow-lg shadow-indigo-500/25 hover:bg-indigo-500 transition-all"
        >
          Launch New Backtest
        </Link>
      </div>
    );
  }

  return <BacktestResultsClient result={result} />;
}