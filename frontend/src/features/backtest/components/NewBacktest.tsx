import AnimatedPage, { AnimatedItem } from "@/components/common/AnimatedPage";
import PageHeader from "@/components/common/PageHeader";
import BacktestForm from "./BacktestForm";
import { FlaskConical } from "lucide-react";

export default function NewBacktest() {
  return (
    <AnimatedPage>
      <PageHeader
        title="New Backtest"
        description="Configure and run a strategy against historical market data."
        icon={FlaskConical}
      />

      <AnimatedItem>
        <div className="w-full max-w-4xl rounded-2xl glass-panel p-6">
          <BacktestForm />
        </div>
      </AnimatedItem>
    </AnimatedPage>
  );
}
