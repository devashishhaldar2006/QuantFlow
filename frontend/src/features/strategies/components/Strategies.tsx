import { LineChart } from "lucide-react";
import type { StrategyWithPerformance } from "../types";
import AnimatedPage, { AnimatedItem } from "@/components/common/AnimatedPage";
import PageHeader from "@/components/common/PageHeader";
import StrategyCard from "./StrategyCard";

type StrategiesProps = {
  strategies: StrategyWithPerformance[];
};

export default function Strategies({ strategies }: StrategiesProps) {
  return (
    <AnimatedPage>
      <PageHeader
        title="Strategies"
        description="Explore available trading strategies and their historical backtest performance."
        icon={LineChart}
        action={{ label: "New Backtest", href: "/backtests/new" }}
      />

      <AnimatedItem>
        <div className="space-y-3">
          {strategies.length > 0 ? (
            strategies.map((strategy) => (
              <StrategyCard key={strategy.name} strategy={strategy} />
            ))
          ) : (
            <div className="rounded border border-zinc-200 bg-white p-12 flex flex-col items-center justify-center text-center">
              <div className="size-12 rounded border border-zinc-200 bg-zinc-50 flex items-center justify-center mb-3">
                <LineChart className="size-5 text-zinc-500" />
              </div>
              <h3 className="text-sm font-bold font-mono text-zinc-900 uppercase">ENGINE_OFFLINE</h3>
              <p className="mt-1 text-xs text-zinc-500 max-w-sm font-sans">
                The QuantFlow computation engine is currently unreachable. Start the backend engine to compile and backtest quantitative models.
              </p>
            </div>
          )}
        </div>
      </AnimatedItem>
    </AnimatedPage>
  );
}