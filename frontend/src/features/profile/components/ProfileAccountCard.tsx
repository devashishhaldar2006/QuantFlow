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
          <div className="flex items-center justify-between">
            <p className="font-mono text-xs text-slate-300 truncate max-w-[200px]">
              {primaryEmail}
            </p>
            {isEmailVerified && (
              <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-400">
                <CheckCircle2 className="size-3" />
                Verified
              </span>
            )}
          </div>
        </div>

        <div className="space-y-1">
          <span className="text-xs text-slate-500 font-medium uppercase tracking-wider">
            Clerk User ID
          </span>
          <p className="font-mono text-[11px] text-slate-400 truncate bg-white/[0.03] p-2 rounded-lg border border-white/5">
            {userId}
          </p>
        </div>
      </div>
    </div>
  );
}
