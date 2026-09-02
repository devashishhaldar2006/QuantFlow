import { Loader2 } from "lucide-react";

export default function BacktestsLoading() {
  return (
    <div className="space-y-6 animate-pulse p-6">
      {/* Page Header Skeleton */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-800">
        <div className="space-y-2">
          <div className="h-7 w-36 rounded-lg bg-slate-800/80" />
          <div className="h-4 w-72 rounded-md bg-slate-800/50" />
        </div>
        <div className="h-9 w-32 rounded-xl bg-slate-800/80" />
      </div>

      {/* Toolbar Filter Skeleton */}
      <div className="flex items-center gap-3">
        <div className="h-10 flex-1 max-w-sm rounded-xl bg-slate-800/60" />
        <div className="h-10 w-32 rounded-xl bg-slate-800/60" />
        <div className="h-10 w-32 rounded-xl bg-slate-800/60" />
      </div>

      {/* Table Skeleton */}
      <div className="rounded-xl border border-slate-800 bg-[#0B1120] overflow-hidden">
        <div className="h-11 bg-slate-900/80 border-b border-slate-800" />
        <div className="divide-y divide-slate-800/60 p-4 space-y-4">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="flex items-center justify-between pt-3">
              <div className="space-y-1.5 flex-1">
                <div className="h-4 w-48 rounded bg-slate-800" />
                <div className="h-3 w-28 rounded bg-slate-800/50" />
              </div>
              <div className="h-4 w-20 rounded bg-slate-800" />
              <div className="h-4 w-20 rounded bg-slate-800 ml-8" />
              <div className="h-6 w-16 rounded-full bg-slate-800 ml-8" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}