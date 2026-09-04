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
            <section className="glass-panel relative w-full min-w-0 overflow-hidden rounded-2xl border border-indigo-500/20 bg-[#090D1A]/80 shadow-2xl shadow-indigo-500/10">
              <div className="w-full min-w-0 p-7">
                <div className="w-full min-w-0">
                  <div className="flex items-center justify-between">
                    <div className="inline-flex items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-3.5 py-1 text-xs font-semibold text-indigo-400">
                      <Zap className="size-3.5" />
                      QUANTFLOW PRO
                    </div>
                    {isPro && (
                      <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-0.5 text-xs font-semibold text-emerald-400">
                        <Check className="size-3.5" /> Active Plan
                      </span>
                    )}
                  </div>

                  <div className="mt-5 w-full min-w-0">
                    <h2 className="w-full text-2xl font-bold tracking-tight text-white sm:text-3xl">
                      QuantFlow Pro Subscription
                    </h2>

                    <div className="mt-2 w-full max-w-none text-sm leading-6 text-slate-300">
                      Access our full low-latency C++ compilation engine, institutional strategy templates, and multi-asset optimization tools.
                    </div>
                  </div>

                  <div className="mt-8 flex items-baseline gap-2">
                    <span className="font-mono text-5xl font-black tracking-tight text-white">
                      ₹9
                    </span>
                    <span className="text-sm font-medium text-slate-400">
                      / month
                    </span>
                    <span className="ml-2 rounded-full border border-white/10 bg-white/5 px-2.5 py-0.5 text-[11px] font-semibold text-indigo-300">
                      Billed monthly
                    </span>
                  </div>

                  <div className="mt-7 w-full max-w-sm">
                    {isPro ? (
                      <div className="flex items-center gap-3 rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-5 py-3 text-sm font-semibold text-emerald-300">
                        <Sparkles className="size-4 text-emerald-400" />
                        You are currently on QuantFlow Pro
                      </div>
                    ) : (
                      <RazorpayCheckout />
                    )}
                  </div>

                  <div className="mt-6 flex items-center gap-2 text-xs text-slate-400">
                    <ShieldCheck className="size-4 shrink-0 text-emerald-400" />
                    <span>
                      256-bit SSL encrypted recurring payment via Razorpay. Cancel anytime.
                    </span>
                  </div>
                </div>
              </div>
            </section>

            {/* Features Included Card */}
            <section className="glass-panel w-full min-w-0 rounded-2xl border border-white/10 bg-slate-900/40 p-7">
              <div className="w-full min-w-0">
                <div className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
                  Included in Pro Tier
                </div>

                <h3 className="mt-3 w-full text-xl font-bold text-white">
                  Institutional Quant Capabilities
                </h3>

                <div className="mt-6 space-y-3.5">
                  {features.map((feature) => (
                    <div
                      key={feature}
                      className="flex min-w-0 items-center gap-3"
                    >
                      <div className="flex size-5 shrink-0 items-center justify-center rounded-full bg-indigo-500/10 border border-indigo-500/20">
                        <Check className="size-3 text-indigo-400" />
                      </div>

                      <span className="min-w-0 text-xs font-medium text-slate-200">
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="mt-7 rounded-xl border border-white/10 bg-white/[0.03] p-4 text-xs text-slate-400">
                  <div className="flex items-center gap-2 font-semibold text-slate-200 mb-1">
                    <Lock className="size-3.5 text-indigo-400" />
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
