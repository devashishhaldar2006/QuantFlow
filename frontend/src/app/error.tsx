"use client";

import { useEffect } from "react";
import { AlertCircle, RotateCcw } from "lucide-react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Global Error Caught:", error);
  }, [error]);

  return (
    <div className="flex h-[70vh] w-full flex-col items-center justify-center p-6 text-center">
      <div className="max-w-md w-full glass-panel border border-red-500/20 rounded-2xl p-8 space-y-5 bg-[#090D18]/90 backdrop-blur-2xl shadow-2xl">
        <div className="size-12 mx-auto rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-400">
          <AlertCircle className="size-6" />
        </div>
        <div className="space-y-2">
          <h2 className="text-base font-bold text-slate-100">Temporary Connection Issue</h2>
          <p className="text-xs text-slate-400 leading-relaxed">
            {error.message || "An unexpected error occurred while loading this view."}
          </p>
        </div>
        <button
          type="button"
          onClick={() => reset()}
          className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-2.5 text-xs font-semibold text-white shadow-lg shadow-indigo-500/20 transition-all hover:bg-indigo-500"
        >
          <RotateCcw className="size-3.5" />
          Retry Connection
        </button>
      </div>
    </div>
  );
}
