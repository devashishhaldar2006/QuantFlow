import NewBacktest from "@/features/backtest/components/NewBacktest";
import { auth } from "@clerk/nextjs/server";

export default async function NewBacktestPage() {
  await auth.protect();
  return <NewBacktest />;
}