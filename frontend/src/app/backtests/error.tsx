"use client";

export default function BacktestsError({
  reset,
}: {
  reset: () => void;
}) {
  return (
    <div className="flex min-h-[400px] flex-col items-center justify-center gap-4 p-6 text-center">
      <div>
        <h2 className="text-xl font-semibold">
          Failed to load backtests
        </h2>

        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong while loading your backtests.
        </p>
      </div>

      <button
        onClick={reset}
        className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
      >
        Try again
      </button>
    </div>
  );
}