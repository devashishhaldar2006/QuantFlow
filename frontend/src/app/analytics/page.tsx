import { getAnalyticsSummary } from "@/services/analytics/analyticsService";
import Analytics from "@/features/analytics/components/Analytics";

export default async function AnalyticsPage() {
  const analytics = await getAnalyticsSummary();

  return <Analytics analytics={analytics} />;
}