import PageLayout from "@/components/layout/PageLayout";
import AnimatedPage, { AnimatedItem } from "@/components/common/AnimatedPage";
import BacktestForm from "./BacktestForm";

export default function NewBacktest() {
  return (
    <AnimatedPage>
      <PageLayout
        eyebrow="Simulation"
        title="New Backtest"
        description="Configure and run a strategy against historical market data."
      >
        <AnimatedItem>
          <BacktestForm />
        </AnimatedItem>
      </PageLayout>
    </AnimatedPage>
  );
}
