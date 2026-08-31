"use client";

import { useUser } from "@clerk/nextjs";
import Link from "next/link";
import { Shield, Crown, CreditCard, ExternalLink } from "lucide-react";
import AnimatedPage, { AnimatedItem } from "@/components/common/AnimatedPage";
import BacktestUsageCard from "@/features/backtest/components/BacktestUsageCard";
import ProfileHeader from "@/features/profile/components/ProfileHeader";
import ProfileAccountCard from "@/features/profile/components/ProfileAccountCard";
import ProfileSecurityCard from "@/features/profile/components/ProfileSecurityCard";

export default function ProfilePage() {
  const { isLoaded, isSignedIn, user } = useUser();

  if (!isLoaded) {
    return (
      <AnimatedPage className="flex min-h-[70vh] w-full items-center justify-center p-6">
        <div className="flex items-center gap-3 text-slate-400">
          <div className="size-6 animate-spin rounded-full border-2 border-indigo-500 border-t-transparent" />
          <span className="text-sm font-medium">Loading profile…</span>
        </div>
      </AnimatedPage>
    );
  }

  if (!isSignedIn || !user) {
    return (
      <AnimatedPage className="flex min-h-[70vh] w-full items-center justify-center p-6">
        <div className="glass-panel max-w-md text-center p-8 rounded-2xl space-y-4">
          <Shield className="mx-auto size-12 text-slate-500" />
          <h2 className="text-xl font-bold text-slate-100">Access Restricted</h2>
          <p className="text-sm text-slate-400">
            Please sign in to view and manage your QuantFlow profile settings.
          </p>
          <Link
            href="/sign-in"
            className="inline-flex w-full items-center justify-center rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-lg transition hover:bg-indigo-500"
          >
            Sign In to QuantFlow
          </Link>
        </div>
      </AnimatedPage>
    );
  }

  const displayName = user.fullName || user.username || "QuantFlow Trader";
  const primaryEmail = user.primaryEmailAddress?.emailAddress || "No email linked";
  const isEmailVerified = user.primaryEmailAddress?.verification?.status === "verified";

  return (
    <AnimatedPage className="w-full space-y-8 p-4 md:p-8">
      {/* Profile Banner */}
      <AnimatedItem>
        <ProfileHeader
          user={user}
          displayName={displayName}
          primaryEmail={primaryEmail}
        />
      </AnimatedItem>

      {/* Modular Profile Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Account Details */}
        <AnimatedItem>
          <ProfileAccountCard
            displayName={displayName}
            primaryEmail={primaryEmail}
            isEmailVerified={isEmailVerified}
            userId={user.id}
          />
        </AnimatedItem>

        {/* Plan & Billing */}
        <AnimatedItem>
          <div className="glass-panel h-full rounded-2xl p-6 border border-white/10 space-y-5 flex flex-col justify-between">
            <div className="space-y-5">
              <div className="flex items-center gap-3 border-b border-white/10 pb-4">
                <div className="flex size-10 items-center justify-center rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400">
                  <Crown className="size-5" />
                </div>
                <div>
                  <h3 className="text-base font-semibold text-slate-100">Subscription Status</h3>
                  <p className="text-xs text-slate-500">Plan Quota & Tier Access</p>
                </div>
              </div>

              <BacktestUsageCard />
            </div>

            <div className="pt-2">
              <Link
                href="/billing"
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-lg transition hover:bg-indigo-500"
              >
                <CreditCard className="size-4" />
                Manage Plan & Billing
                <ExternalLink className="size-3.5" />
              </Link>
            </div>
          </div>
        </AnimatedItem>

        {/* Security */}
        <AnimatedItem>
          <ProfileSecurityCard />
        </AnimatedItem>
      </div>
    </AnimatedPage>
  );
}
