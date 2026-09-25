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
            <section className="w-full min-w-0 overflow-hidden rounded border border-zinc-200 bg-white">
              <div className="w-full min-w-0 p-7">
                <div className="w-full min-w-0">
                  <div className="inline-flex items-center gap-2 rounded border border-zinc-200 bg-zinc-50 px-3 py-1 text-xs font-mono font-bold text-zinc-900">
                    <Zap className="size-3.5 text-zinc-700" />
                    QUANTFLOW_PRO
                  </div>

                  <div className="mt-4 w-full min-w-0">
                    <h2 className="w-full text-2xl font-bold font-mono tracking-tight text-zinc-900">
                      QuantFlow Pro
                    </h2>

                    <div className="mt-2 w-full max-w-none text-xs leading-relaxed text-zinc-600 font-sans">
                      Unlock the full quantitative research
                      workflow with unlimited backtesting and
                      advanced strategy capabilities.
                    </div>
                  </div>

                  <div className="mt-7 flex items-baseline gap-2">
                    <span className="font-mono text-4xl font-extrabold tracking-tight text-zinc-950 inline-block pl-1 pt-1">
                      ₹9
                    </span>

                    <span className="text-xs font-mono text-zinc-500">
                      / month
                    </span>
                  </div>

                  <div className="mt-7 w-full max-w-sm">
                    <RazorpayCheckout />
                  </div>

                  <div className="mt-6 flex items-center gap-2 text-xs text-zinc-500 font-sans">
                    <ShieldCheck className="size-4 shrink-0 text-emerald-600" />

                    <span>
                      Secure subscription through Razorpay
                    </span>
                  </div>
                </div>
              </div>
            </section>

            {/* Features */}
            <section className="w-full min-w-0 rounded border border-zinc-200 bg-white p-7">
              <div className="w-full min-w-0">
                <div className="text-[10px] font-mono font-bold uppercase tracking-wider text-zinc-500">
                  WHAT&apos;S INCLUDED
                </div>

                <h3 className="mt-2 w-full text-xl font-bold font-mono text-zinc-900">
                  Everything you need to research
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
                  <div>
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
          <div className="rounded border border-zinc-200 bg-zinc-50 p-5 text-xs text-zinc-700 space-y-3">
            <div className="flex items-center gap-2 font-mono font-bold text-zinc-900">
              <div className="size-2 rounded-full bg-emerald-600 animate-pulse" />
              Razorpay Test Mode (eMandate Form Credentials):
            </div>
            <p className="text-zinc-600 font-sans">
              On the <span className="font-semibold text-zinc-900">HDFC Bank eMandate Form</span> currently open on your screen, enter these dummy test values to complete test payment:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-zinc-700">
              <div className="rounded border border-zinc-200 bg-white p-3 space-y-1.5 font-mono text-[11px]">
                <div className="text-zinc-900 font-bold text-xs mb-1">Fill these 4 fields:</div>
                <div><span className="text-zinc-500 font-sans">1. Account Number:</span> <code className="text-zinc-900 font-semibold bg-zinc-100 px-1 py-0.5 rounded">11214311214311</code></div>
                <div><span className="text-zinc-500 font-sans">2. IFSC:</span> <code className="text-zinc-900 font-semibold bg-zinc-100 px-1 py-0.5 rounded">HDFC0000001</code></div>
                <div><span className="text-zinc-500 font-sans">3. Holder Name:</span> <code className="text-zinc-900 font-semibold bg-zinc-100 px-1 py-0.5 rounded">Test User</code></div>
                <div><span className="text-zinc-500 font-sans">4. Account Type:</span> <code className="text-zinc-900 font-semibold bg-zinc-100 px-1 py-0.5 rounded">Savings</code></div>
              </div>
              <div className="rounded border border-zinc-200 bg-white p-3 space-y-1.5 text-[11px] font-sans">
                <div className="text-zinc-900 font-bold text-xs mb-1">Final Step:</div>
                <p>Under <span className="font-semibold text-zinc-900">Authenticate using</span>, click <span className="font-semibold text-zinc-900">Netbanking</span>.</p>
                <p>Click <span className="font-semibold text-zinc-900">Submit / Pay</span> → On the Razorpay test page that opens, click <span className="font-semibold text-emerald-600">Success</span>.</p>
              </div>
            </div>
          </div>
        </AnimatedItem>
      </div>
    </AnimatedPage>
  );
}