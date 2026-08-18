import { getPortfolioSummary } from "@/services/portfolio/portfolioService";
import Portfolio from "@/features/portfolio/components/Portfolio";

export default async function PortfolioPage() {
  const portfolio = await getPortfolioSummary();

  return <Portfolio portfolio={portfolio} />;
}