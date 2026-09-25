import { Loader2 } from "lucide-react";

export default function Loading() {
  return (
    <div className="flex h-[80vh] w-full flex-col items-center justify-center space-y-4">
      <div className="relative flex items-center justify-center">
        <div className="absolute size-14 rounded-full border border-zinc-900/20 animate-ping" />
        <div className="size-12 rounded border border-zinc-900 bg-zinc-950 flex items-center justify-center shadow-sm">
          <Loader2 className="size-6 text-white animate-spin" />
        </div>
      </div>
      <div className="text-center space-y-1">
        <p className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-950">
          Loading QuantFlow Terminal
        </p>
        <p className="text-[11px] font-mono text-zinc-500">
          Synchronizing institutional data and market states…
        </p>
      </div>
    </div>
  );
}
