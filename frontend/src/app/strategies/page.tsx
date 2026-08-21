import { getStrategies } from "@/services/strategies/strategyService";
import Strategies from "@/features/strategies/components/Strategies";

export const dynamic = "force-dynamic";

export default async function StrategiesPage() {
  const strategies = await getStrategies();

  return <Strategies strategies={strategies} />;
}