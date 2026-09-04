import Link from "next/link";
import { auth } from "@clerk/nextjs/server";
import { CheckCircle2, ArrowRight, ShieldCheck } from "lucide-react";
import AnimatedPage, { AnimatedItem } from "@/components/common/AnimatedPage";

import { getUserByClerkId } from "@/services/auth/userService";
export default async function BillingSuccessPage() {
  const { userId: clerkUserId } = await auth();
  let isPro = false;

  if (clerkUserId) {
    try {
      const user = await getUserByClerkId(clerkUserId);
      if (user?.plan === "PRO") {
        isPro = true;
      }
    } catch (err) {
      console.error("Failed to fetch user plan status on success page:", err);
    }
  }

  return (
    <AnimatedPage className="flex min-h-[75vh] w-full items-center justify-center p-4">
      <div className="w-full max-w-md min-w-0">
        <AnimatedItem>
          <div className="glass-panel w-full min-w-0 rounded-2xl p-8 text-center shadow-2xl space-y-6">
            <div className="mx-auto flex size-16 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <CheckCircle2 className="size-8" />
            </div>

            <div className="space-y-2">
              <h1 className="text-2xl font-bold tracking-tight text-slate-100 sm:text-3xl">
                Payment Successful!
              </h1>
              <p className="text-sm leading-relaxed text-slate-400">
                Thank you for upgrading to <span className="font-semibold text-indigo-400">QuantFlow Pro</span>. Your subscription is active now.
              </p>
            </div>

            <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4 text-left text-xs leading-relaxed text-slate-300 space-y-2">
              <div className="flex items-center gap-2 font-semibold text-slate-100">
                <ShieldCheck className="size-4 text-emerald-400" />
                Pro Capabilities Unlocked
              </div>
              <p className="text-slate-400">
                You now have full access to unlimited strategy backtesting, multi-asset batch optimization, and quantitative analytics.
              </p>
            </div>

            <div className="pt-2">
              <Link
                href="/dashboard"
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white shadow-lg transition hover:bg-indigo-500 active:scale-[0.99]"
              >
                Go to Dashboard
                <ArrowRight className="size-4" />
              </Link>
            </div>
          </div>
        </AnimatedItem>
      </div>
    </AnimatedPage>
  );
}
