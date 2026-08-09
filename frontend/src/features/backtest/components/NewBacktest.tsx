import PageHeader from "@/components/common/PageHeader";
import BacktestForm from "./BacktestForm";

export default function NewBacktest() {
  return (
    <div className="space-y-6 p-6">
      <PageHeader
        title="New Backtest"
        description="Configure and run a strategy against historical market data."
      />

      <BacktestForm />
    </div>
  );
}
