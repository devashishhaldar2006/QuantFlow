import { getPortfolioSummary } from "@/services/portfolio/portfolioService";
import Portfolio from "@/features/portfolio/components/Portfolio";
import { auth } from "@clerk/nextjs/server";

export default async function PortfolioPage() {
  await auth.protect();
  const portfolio = await getPortfolioSummary();

  return <Portfolio portfolio={portfolio} />;
}