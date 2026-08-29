import { auth } from "@clerk/nextjs/server";
import Dashboard from "@/features/dashboard/components/Dashboard";

export default async function DashboardPage() {
  await auth.protect();

  return <Dashboard />;
}