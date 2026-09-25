import { auth } from "@clerk/nextjs/server";
import {
  Check,
  CreditCard,
  ShieldCheck,
  Zap,
  Sparkles,
  Lock,
} from "lucide-react";

import AnimatedPage, {
  AnimatedItem,
} from "@/components/common/AnimatedPage";
import PageHeader from "@/components/common/PageHeader";

import RazorpayCheckout from "@/features/billing/components/RazorpayCheckout";
import RazorpayScript from "@/features/billing/components/RazorpayScript";
import { getUserByClerkId } from "@/services/auth/userService";

const features = [
  "Unlimited C++ backtesting runs",
  "Institutional multi-asset strategies (MACD, RSI, Bollinger, ATR)",
  "Real-time slippage & transaction cost models",
  "High-frequency trade execution simulations",
  "Multi-asset batch portfolio optimization",
  "Custom algorithmic indicators & parameter sweeps",
  "CSV and institutional PDF analytics exports",
  "Priority quant server allocation",
];

export default async function BillingPage() {
  const { userId: clerkUserId } = await auth();

  let isPro = false;
  if (clerkUserId) {
    try {
      const user = await getUserByClerkId(clerkUserId);
      if (user?.plan === "PRO") {
        isPro = true;
      }
    } catch (err) {
      console.error("Failed to query user plan for billing page:", err);
    }
  }

  return (
    <AnimatedPage>
      <PageHeader
        title="Billing & Plans"
        description="Manage your institutional QuantFlow subscription and platform tiers."
        icon={CreditCard}
      />

      <RazorpayScript />

      <div className="w-full min-w-0 space-y-6">
        <AnimatedItem>
          <div className="grid w-full min-w-0 grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1.15fr)_minmax(320px,0.85fr)]">
            {/* Pro Plan Card */}
            <section className="relative w-full min-w-0 overflow-hidden rounded border border-zinc-200 bg-white p-7">
              <div className="w-full min-w-0">
                <div className="flex items-center justify-between">
                  <div className="inline-flex items-center gap-2 rounded border border-zinc-200 bg-zinc-50 px-3 py-1 text-xs font-mono font-bold text-zinc-900">
                    <Zap className="size-3.5 text-zinc-700" />
                    QUANTFLOW_PRO
                  </div>
                  {isPro && (
                    <span className="inline-flex items-center gap-1.5 rounded border border-emerald-200 bg-emerald-50 px-3 py-0.5 text-xs font-mono font-bold text-emerald-700">
                      <Check className="size-3.5" /> ACTIVE_PLAN
                    </span>
                  )}
                </div>

                <div className="mt-5 w-full min-w-0">
                  <h2 className="w-full text-2xl font-bold font-mono tracking-tight text-zinc-900 sm:text-3xl">
                    QuantFlow Pro Subscription
                  </h2>

                  <div className="mt-2 w-full max-w-none text-xs leading-relaxed text-zinc-600 font-sans">
                    Access our full low-latency C++ compilation engine, institutional strategy templates, and multi-asset optimization tools.
                  </div>
                </div>

                <div className="mt-7 flex flex-wrap items-baseline gap-2.5">
                  <div className="flex items-baseline gap-2">
                    <span className="font-mono text-5xl font-extrabold tracking-tight text-zinc-950 inline-block">
                      ₹9
                    </span>
                    <span className="text-sm font-mono text-zinc-500">
                      / month
                    </span>
                  </div>
                  <span className="rounded border border-zinc-200 bg-zinc-50 px-2.5 py-0.5 text-[11px] font-mono text-zinc-600">
                    Billed monthly
                  </span>
                </div>

                <div className="mt-7 w-full max-w-sm">
                  {isPro ? (
                    <div className="flex items-center gap-3 rounded border border-emerald-200 bg-emerald-50 px-5 py-3 text-xs font-mono font-semibold text-emerald-700">
                      <Sparkles className="size-4 text-emerald-600" />
                      You are currently on QuantFlow Pro
                    </div>
                  ) : (
                    <RazorpayCheckout />
                  )}
                </div>

                <div className="mt-6 flex items-center gap-2 text-xs text-zinc-500 font-sans">
                  <ShieldCheck className="size-4 shrink-0 text-emerald-600" />
                  <span>
                    256-bit SSL encrypted recurring payment via Razorpay. Cancel anytime.
                  </span>
                </div>
              </div>
            </section>

            {/* Features Included Card */}
            <section className="w-full min-w-0 rounded border border-zinc-200 bg-white p-7">
              <div className="w-full min-w-0">
                <div className="text-[10px] font-mono font-bold uppercase tracking-wider text-zinc-500">
                  INCLUDED_IN_PRO_TIER
                </div>

                <h3 className="mt-2 w-full text-xl font-bold font-mono text-zinc-900">
                  Institutional Quant Capabilities
                </h3>

                <div className="mt-6 space-y-3.5">
                  {features.map((feature) => (
                    <div
                      key={feature}
                      className="flex min-w-0 items-center gap-3"
                    >
                      <div className="flex size-5 shrink-0 items-center justify-center rounded border border-zinc-200 bg-zinc-50">
                        <Check className="size-3 text-zinc-900" />
                      </div>

                      <span className="min-w-0 text-xs font-medium text-zinc-700">
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="mt-7 rounded border border-zinc-200 bg-zinc-50 p-4 text-xs text-zinc-600">
                  <div className="flex items-center gap-2 font-mono font-bold text-zinc-900 mb-1">
                    <Lock className="size-3.5 text-zinc-700" />
                    Instant Subscription Activation
                  </div>
                  Once verified, your account tier upgrades automatically and unlocks unlimited algorithmic compilation runs across the platform.
                </div>
              </div>
            </section>
          </div>
        </AnimatedItem>
      </div>
    </AnimatedPage>
  );
}
