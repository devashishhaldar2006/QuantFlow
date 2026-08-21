import type { StrategyWithPerformance } from "../types";
import StrategyCard from "./StrategyCard";

type StrategiesProps = {
  strategies: StrategyWithPerformance[];
};

export default function Strategies({
  strategies,
}: StrategiesProps) {
  return (
    <div className="min-h-[calc(100vh-64px)]">
      <header className="border-b border-border">
        <div className="mx-auto max-w-7xl px-6 py-6">
          <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
            Strategy Engine
          </p>

          <h1 className="mt-1 text-2xl font-semibold tracking-tight">
            Strategies
          </h1>

          <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
            Explore the trading strategies available in the
            QuantFlow engine and review their historical
            backtest performance.
          </p>
        </div>
      </header>

      <main className="mx-auto max-w-7xl space-y-8 px-6 py-8">
        <section>
          <div className="mb-4">
            <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
              Strategy Library
            </p>

            <h2 className="mt-1 text-lg font-semibold tracking-tight">
              Available Strategies
            </h2>
          </div>

          <div className="space-y-4">
            {strategies.map((strategy) => (
              <StrategyCard
                key={strategy.name}
                strategy={strategy}
              />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}