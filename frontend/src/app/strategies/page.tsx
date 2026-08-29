import { getStrategies } from "@/services/strategies/strategyService";
import Strategies from "@/features/strategies/components/Strategies";
import { auth } from "@clerk/nextjs/server";

export const dynamic = "force-dynamic";

export default async function StrategiesPage() {
  await auth.protect();
  const strategies = await getStrategies();

  return <Strategies strategies={strategies} />;
}