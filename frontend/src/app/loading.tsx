import { Loader2 } from "lucide-react";

export default function Loading() {
  return (
    <div className="flex h-[80vh] w-full flex-col items-center justify-center space-y-4">
      <div className="relative flex items-center justify-center">
        <div className="absolute size-14 rounded-full border-2 border-indigo-500/20 animate-ping" />
        <div className="size-12 rounded-2xl bg-indigo-600/10 border border-indigo-500/30 flex items-center justify-center backdrop-blur-xl shadow-xl shadow-indigo-500/10">
          <Loader2 className="size-6 text-indigo-400 animate-spin" />
        </div>
      </div>
      <div className="text-center space-y-1">
        <p className="text-xs font-mono font-semibold uppercase tracking-widest text-slate-300">
          Loading QuantFlow Terminal
        </p>
        <p className="text-[11px] text-slate-500">
          Synchronizing institutional data and market states…
        </p>
      </div>
    </div>
  );
}
