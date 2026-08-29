import { getAnalyticsSummary } from "@/services/analytics/analyticsService";
import Analytics from "@/features/analytics/components/Analytics";
import { auth } from "@clerk/nextjs/server";

export default async function AnalyticsPage() {
  await auth.protect();
  const analytics = await getAnalyticsSummary();

  return <Analytics analytics={analytics} />;
}