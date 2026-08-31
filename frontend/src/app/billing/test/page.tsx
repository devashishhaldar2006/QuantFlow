import { auth } from "@clerk/nextjs/server";
import {
  Check,
  CreditCard,
  ShieldCheck,
  Zap,
} from "lucide-react";

import AnimatedPage, {
  AnimatedItem,
} from "@/components/common/AnimatedPage";
import PageHeader from "@/components/common/PageHeader";

import RazorpayCheckout from "@/features/billing/components/RazorpayCheckout";
import RazorpayScript from "@/features/billing/components/RazorpayScript";

const features = [
  "Unlimited backtests",
  "Advanced strategies",
  "Batch optimization",
  "Custom indicators",
  "CSV and JSON exports",
];

export default async function BillingTestPage() {
  await auth.protect();

  return (
    <AnimatedPage>
      <PageHeader
        title="Billing & Plans"
        description="Upgrade your QuantFlow workspace with Pro features."
        icon={CreditCard}
      />

      <RazorpayScript />

      <div className="w-full min-w-0 space-y-6">
        <AnimatedItem>
          <div className="grid w-full min-w-0 grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1.15fr)_minmax(320px,0.85fr)]">
            {/* Pro Plan */}
            <section className="glass-panel w-full min-w-0 overflow-hidden rounded-2xl">
              <div className="w-full min-w-0 p-7">
                <div className="w-full min-w-0">
                  <div className="inline-flex items-center gap-2 rounded-full border border-indigo-500/20 bg-indigo-500/10 px-3 py-1 text-xs font-medium text-indigo-400">
                    <Zap className="size-3.5" />
                    PRO
                  </div>

                  <div className="mt-4 w-full min-w-0">
                    <h2 className="w-full text-2xl font-semibold tracking-tight text-slate-100">
                      QuantFlow Pro
                    </h2>

                    <div className="mt-2 w-full max-w-none text-sm leading-6 text-slate-400">
                      Unlock the full quantitative research
                      workflow with unlimited backtesting and
                      advanced strategy capabilities.
                    </div>
                  </div>

                  <div className="mt-8 flex items-baseline gap-2">
                    <span className="font-mono text-4xl font-bold tracking-tight text-slate-100">
                      ₹499
                    </span>

                    <span className="text-sm text-slate-500">
                      / month
                    </span>
                  </div>

                  <div className="mt-7 w-full max-w-sm">
                    <RazorpayCheckout />
                  </div>

                  <div className="mt-6 flex items-center gap-2 text-xs text-slate-500">
                    <ShieldCheck className="size-4 shrink-0 text-emerald-400" />

                    <span>
                      Secure subscription through Razorpay
                    </span>
                  </div>
                </div>
              </div>
            </section>

            {/* Features */}
            <section className="glass-panel w-full min-w-0 rounded-2xl p-7">
              <div className="w-full min-w-0">
                <div className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                  What&apos;s included
                </div>

                <h3 className="mt-3 w-full text-xl font-semibold text-slate-100">
                  Everything you need to research
                </h3>

                <div className="mt-7 space-y-4">
                  {features.map((feature) => (
                    <div
                      key={feature}
                      className="flex min-w-0 items-center gap-3"
                    >
                      <div className="flex size-6 shrink-0 items-center justify-center rounded-full bg-emerald-500/10">
                        <Check className="size-3.5 text-emerald-400" />
                      </div>

                      <span className="min-w-0 text-sm text-slate-300">
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="mt-8 rounded-xl border border-white/5 bg-white/[0.02] p-4">
                  <div className="text-xs leading-5 text-slate-500">
                    You&apos;re currently using the Free plan.
                    Your account will remain on Free until
                    the subscription is successfully activated.
                  </div>
                </div>
              </div>
            </section>
          </div>
        </AnimatedItem>

        {/* Test Mode Info */}
        <AnimatedItem>
          <div className="rounded-xl border border-amber-500/20 bg-amber-500/[0.04] p-4 text-xs text-amber-300 space-y-3">
            <div className="flex items-center gap-2 font-semibold text-amber-400">
              <div className="size-2 rounded-full bg-amber-400 animate-pulse" />
              Razorpay Test Mode (eMandate Form Credentials):
            </div>
            <p className="text-slate-300">
              On the <span className="font-semibold text-amber-300">HDFC Bank eMandate Form</span> currently open on your screen, enter these dummy test values to complete test payment:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-slate-300">
              <div className="rounded-lg bg-slate-900/80 p-3 border border-white/10 space-y-1.5 font-mono text-[11px]">
                <div className="text-emerald-400 font-sans font-semibold text-xs mb-1">Fill these 4 fields:</div>
                <div><span className="text-slate-400 font-sans">1. Account Number:</span> <code className="text-amber-300 font-semibold bg-slate-800 px-1 py-0.5 rounded">11214311214311</code></div>
                <div><span className="text-slate-400 font-sans">2. IFSC:</span> <code className="text-amber-300 font-semibold bg-slate-800 px-1 py-0.5 rounded">HDFC0000001</code></div>
                <div><span className="text-slate-400 font-sans">3. Holder Name:</span> <code className="text-amber-300 font-semibold bg-slate-800 px-1 py-0.5 rounded">Test User</code></div>
                <div><span className="text-slate-400 font-sans">4. Account Type:</span> <code className="text-amber-300 font-semibold bg-slate-800 px-1 py-0.5 rounded">Savings</code></div>
              </div>
              <div className="rounded-lg bg-slate-900/80 p-3 border border-white/10 space-y-1.5 text-[11px]">
                <div className="text-emerald-400 font-semibold text-xs mb-1">Final Step:</div>
                <p>Under <span className="font-semibold text-slate-100">Authenticate using</span>, click <span className="font-semibold text-indigo-400">Netbanking</span>.</p>
                <p>Click <span className="font-semibold text-emerald-400">Submit / Pay</span> → On the Razorpay test page that opens, click <span className="font-semibold text-emerald-400">Success</span>.</p>
              </div>
            </div>
          </div>
        </AnimatedItem>
      </div>
    </AnimatedPage>
  );
}