"use client";

import { User as UserIcon, CheckCircle2 } from "lucide-react";

type ProfileAccountCardProps = {
  displayName: string;
  primaryEmail: string;
  isEmailVerified: boolean;
  userId: string;
};

export default function ProfileAccountCard({
  displayName,
  primaryEmail,
  isEmailVerified,
  userId,
}: ProfileAccountCardProps) {
  return (
    <div className="glass-panel h-full rounded-2xl p-6 border border-white/10 space-y-5">
      <div className="flex items-center gap-3 border-b border-white/10 pb-4">
        <div className="flex size-10 items-center justify-center rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400">
          <UserIcon className="size-5" />
        </div>
        <div>
          <h3 className="text-base font-semibold text-slate-100">Account Details</h3>
          <p className="text-xs text-slate-500">Clerk Identity Details</p>
        </div>
      </div>

      <div className="space-y-4 text-sm">
        <div className="space-y-1">
          <span className="text-xs text-slate-500 font-medium uppercase tracking-wider">
            Full Name
          </span>
          <p className="font-semibold text-slate-200">{displayName}</p>
        </div>

        <div className="space-y-1">
          <span className="text-xs text-slate-500 font-medium uppercase tracking-wider">
            Primary Email
          </span>
          <div className="flex flex-wrap items-center justify-between gap-2">
            <p className="font-mono text-xs text-slate-300 break-all">
              {primaryEmail}
            </p>
            {isEmailVerified && (
              <span className="inline-flex shrink-0 items-center gap-1 text-[11px] font-semibold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-md">
                <CheckCircle2 className="size-3" />
                Verified
              </span>
            )}
          </div>
        </div>

        <div className="space-y-1">
          <span className="text-xs text-slate-500 font-medium uppercase tracking-wider">
            Account ID
          </span>
          <div className="flex items-center justify-between bg-white/[0.03] p-2.5 rounded-xl border border-white/5 font-mono text-xs text-slate-400">
            <span>{userId ? `QF-${userId.slice(-8).toUpperCase()}` : "Active"}</span>
            <span className="text-[10px] text-emerald-400 font-semibold uppercase tracking-wider">Standard</span>
          </div>
        </div>
      </div>
    </div>
  );
}
